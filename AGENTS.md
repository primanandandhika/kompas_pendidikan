# AGENTS.md

Panduan untuk AI coding agent yang bekerja di repo **Kompas Pendidikan**. Baca seluruhnya sebelum mengubah kode.

## Ringkasan proyek

Web app navigasi pendidikan untuk **siswa SMA kelas akhir** (jurusan, jalur masuk kuliah, peluang SNBT, beasiswa), dengan pelengkap simulasi SPMB. Data awal fokus di Kabupaten Purworejo. Dibuat untuk lomba inovasi teknologi Dies Natalis FMIPA UGM, subtema Education. Demo: https://kompaspendidikan.vercel.app

Prinsip produk: **jujur dan bisa dipertanggungjawabkan**. Hasil adalah estimasi, bukan keputusan resmi.

## Stack

- Next.js 16 (App Router), React, TypeScript
- Tailwind CSS v4, token desain di `tailwind.config.ts`, dimuat lewat `@config` di `app/globals.css`
- Supabase (PostgreSQL) lewat `@supabase/supabase-js`
- Leaflet + react-leaflet + OpenStreetMap; Nominatim untuk geocoding
- Deploy: Vercel

## Perintah

```bash
npm run dev      # development
npm run lint     # wajib bersih sebelum selesai
npm run build    # wajib berhasil sebelum selesai
```

## Struktur penting

```
app/            route (page.tsx per folder)
components/     komponen UI bersama
lib/            supabase.ts, geocode.ts, reverseGeocode.ts, distance.ts, spmb.ts
lib/data/       data statis (features.ts, jalur.ts)
```

Rute `/zonasi` sengaja dipertahankan (isinya simulasi SPMB). Kolom `schools.zoning_quota` juga nama lama untuk kuota domisili (estimasi). Jangan diubah tanpa persetujuan.

## Konvensi kode

**Umum**
- TypeScript ketat. **Dilarang memakai `any`.** Buat `interface` untuk data dari database dan beri tipe pada query (`.returns<Tipe[]>()` atau `.single<Tipe>()`).
- Nama variabel, fungsi, tabel, dan kolom database memakai **bahasa Inggris**. Teks yang tampil ke pengguna memakai **bahasa Indonesia**.
- Supabase client adalah **default export**. Impor selalu:
  ```ts
  import supabase from '@/lib/supabase'
  ```
  Jangan memakai `import { supabase }`.
- Hapus `console.log` debug sebelum selesai.

**Next.js 16**
- `params` dan `searchParams` di page adalah **Promise**. Selalu `await` dulu sebelum dipakai.
- Server component adalah default. Pakai `'use client'` hanya jika butuh state, effect, atau event handler (misalnya `onChange`). Pisahkan bagian interaktif ke komponen client kecil, jangan menjadikan seluruh page client.
- Komponen Leaflet dimuat dengan `next/dynamic` dan `ssr: false`.
- Navigasi internal pakai `next/link`. Tautan ke situs luar pakai `<a target="_blank" rel="noopener noreferrer">`.
- Font lewat `next/font/google` (variabel `--font-plus-jakarta-sans` dan `--font-inter`). Jangan menambah `<link>` font manual. Pengecualian: Material Symbols (font ikon) yang dimuat lewat `<link>` di `app/layout.tsx`.
- Filter, sort, dan pagination memakai form `method="get"` dan query string, sehingga hasil bisa dibagikan lewat URL.

**Tailwind v4**
- Di `app/globals.css`, baris `@config "../tailwind.config.ts";` harus berada **di atas** `@import "tailwindcss";`.
- Gunakan **token desain** (misalnya `bg-primary`, `text-on-surface-variant`, `font-body-md`, `text-headline-sm`). Jangan memakai warna bawaan Tailwind seperti `bg-blue-500` atau `text-gray-600`.
- **Nama class harus tertulis utuh.** Jangan menyusun class dari variabel (`bg-${color}-fixed` tidak akan ter-generate saat build). Simpan class lengkap di data atau objek.
- Tema hanya terang (`color-scheme: light`). Jangan menambah blok dark mode bawaan boilerplate.

**HTML semantik dan aksesibilitas**
- Pakai tag sesuai fungsi: `header`, `nav`, `main`, `section`, `article`, `ul`/`li`, `h1`..`h3` berurutan. Hindari tumpukan `div`.
- Aksi yang pindah alamat adalah `a`/`Link`. Aksi yang menjalankan sesuatu di halaman yang sama (submit, toggle) adalah `button`.
- Setiap input punya `label` (boleh `sr-only`). Elemen dekoratif diberi `aria-hidden="true"`.

**Responsif dan interaksi**
- **Mobile-first**: class tanpa prefix untuk mobile, lalu `md:` dan `lg:` untuk layar lebih besar.
- Semua elemen yang bisa diklik punya `cursor-pointer`, state `hover:`, dan `transition-*`. Input punya state `focus:`.

## Konvensi konten dan data

- **Jangan mengarang data.** Jangan membuat beasiswa, sekolah, skor minimum, atau angka statistik fiktif. Jika menambah data, sertakan sumbernya. Jika belum terverifikasi, tandai jelas sebagai contoh/estimasi.
- Jangan menulis klaim berlebihan di UI (misalnya jumlah pengguna, cakupan nasional, "presisi satelit").
- Pakai istilah yang benar: **SPMB** (bukan PPDB) dan **jalur domisili** (bukan zonasi) pada teks yang tampil ke pengguna. Aturan SNPMB yang ditampilkan mengacu pada tahun 2026 dan harus diberi catatan untuk cek sumber resmi.
- Setiap hasil estimasi harus bisa dijelaskan (kenapa labelnya "Tinggi", "Kemungkinan dalam rayon", dan seterusnya) dan diberi catatan bahwa itu bukan keputusan resmi.
- Tangani kasus kosong dan gagal: data kosong, pencarian tanpa hasil, parameter URL tidak valid, dan error dari Supabase harus menampilkan pesan yang jelas, bukan halaman kosong.

## Database (Supabase)

Tabel: `scholarships`, `schools`, `majors`, `university_programs`. Setiap tabel yang dibaca dari aplikasi membutuhkan **policy RLS `select` untuk publik**. Jika query mengembalikan data kosong padahal tabel terisi, cek RLS lebih dulu.

- **Jangan menjalankan atau mengusulkan perintah destruktif** (`DROP`, `TRUNCATE`, `DELETE` tanpa `WHERE`) tanpa persetujuan eksplisit.
- Perubahan skema (tabel atau kolom baru) ditulis sebagai **SQL di dalam jawaban/PR** agar pemilik proyek menjalankannya sendiri di SQL Editor. Jangan mengasumsikan skema sudah berubah.
- Untuk data banyak, gunakan impor CSV atau SQL, bukan input satu per satu.
- Proyek Supabase tier gratis bisa otomatis ter-pause saat lama tidak aktif. Error `TypeError: fetch failed` sering berarti ini.

## Layanan eksternal

- Nominatim publik: maksimal 1 request per detik untuk seluruh pengguna, wajib identitas aplikasi, dan menurut ringkasan kebijakan yang kami temukan tidak mendukung autocomplete. Pertahankan debounce di `AddressPicker`, jangan menambah pemanggilan baru, dan pertimbangkan penyedia lain jika trafik tumbuh.
- Atribusi OpenStreetMap harus tetap tampil di peta.

## Keamanan

- Jangan melakukan commit pada `.env*` atau menulis key di kode. Hanya `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` yang dipakai di sisi klien. Jangan pernah memakai `service_role` di kode aplikasi.
- Jangan menyimpan data pribadi pengguna tanpa persetujuan pemilik proyek. Saat ini input hanya berada di parameter URL.

## Cara bekerja

- Kerjakan sesuai permintaan. Jangan menambah fitur, dependency, atau refactor di luar cakupan. Tanyakan dulu sebelum menambah dependency atau mengubah skema.
- Ikuti pola file yang sudah ada (struktur page, gaya komponen, nama token) sebelum membuat pola baru.
- Jelaskan perubahan secara ringkas: file apa yang berubah dan kenapa.

## Definisi selesai

- [ ] `npm run lint` bersih
- [ ] `npm run build` berhasil
- [ ] Tidak ada `any`, `console.log` sisa, atau warna di luar token
- [ ] Halaman yang diubah dicek di lebar mobile (±375px) lalu desktop
- [ ] Kasus kosong dan error ditangani
- [ ] Teks UI berbahasa Indonesia dan tidak mengandung klaim yang tidak bisa dibuktikan