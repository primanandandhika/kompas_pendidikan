# Kompas Pendidikan

Navigasi pendidikan untuk siswa SMA kelas akhir: temukan jurusan yang sesuai minat, bandingkan jalur masuk kuliah, cek estimasi peluang diterima, dan cari beasiswa. Data awal difokuskan di **Kabupaten Purworejo**.

- **Demo:** https://kompaspendidikan.vercel.app
- **Dibuat untuk:** Lomba Joints x Inspire Hackathon FMIPA UGM, subtema **Education**
- **Status:** prototipe fungsional. Hasil yang ditampilkan adalah **simulasi/estimasi**, bukan keputusan atau prediksi resmi.

---

## Masalah

Siswa kelas akhir sering kesulitan menentukan jurusan, memilih jalur pendidikan, dan merencanakan karier sesuai minat dan kemampuan. Informasinya tersebar, aturan seleksi berubah dari tahun ke tahun (misalnya SPMB menggantikan PPDB, dan TKA menjadi syarat SNBP 2026), dan banyak keputusan diambil tanpa gambaran peluang yang realistis.

## Pengguna sasaran

- **Utama:** siswa SMA kelas 12 (dan orang tuanya) yang sedang merencanakan langkah setelah lulus.
- **Pelengkap:** calon murid SMP/SMA/SMK dan orang tua yang ingin memahami SPMB.

## Kaitan dengan subtema Education

| Kebutuhan pada subtema | Fitur di Kompas Pendidikan |
|---|---|
| Mengeksplorasi jurusan sesuai minat dan refleksi kekuatan diri | Kuis eksplorasi minat dan kekuatan yang dirasakan, dengan rekomendasi jurusan berdasarkan tag minat katalog |
| Memilih jalur pendidikan | Jalur Masuk Kuliah (SNBP, SNBT, Mandiri) |
| Merencanakan karier | Prospek karier dan skill per jurusan |
| Menyesuaikan dengan kemampuan | Kalkulator Peluang SNBT + Strategi 3 Pilihan |
| Akses pembiayaan | Cek Beasiswa |

## Fitur

| Fitur | Halaman | Deskripsi |
|---|---|---|
| Eksplorasi Jurusan | `/jurusan` | Jawab 16 pernyataan skala 1–5: 12 tentang aktivitas yang diminati dan 4 refleksi kekuatan yang dirasakan. Hasil merangkum empat kelompok minat; rekomendasi jurusan katalog diurutkan berdasarkan tag minat dan dilengkapi karier serta skill. Refleksi kekuatan adalah penilaian diri, bukan asesmen kemampuan atau psikologi. |
| Jalur Masuk Kuliah | `/jalur` | Perbandingan SNBP, SNBT, dan Mandiri: dasar seleksi, syarat, dan aturan penting. |
| Kalkulator Peluang | `/jurusan/peluang` | Bandingkan perkiraan skor UTBK dengan skor minimum historis per kampus dan program studi, lengkap dengan Strategi 3 Pilihan (ambisius, realistis, aman). |
| Cek Beasiswa | `/beasiswa` | Cari, saring berdasarkan jenjang, dan urutkan daftar beasiswa; tiap beasiswa punya halaman detail dan tautan pendaftaran. |
| Simulasi SPMB | `/zonasi` | Pilih jenjang (SMP/SMA/SMK), cari alamat atau klik peta, lihat estimasi status rayon domisili terhadap sekolah, serta info empat jalur SPMB. |

> Rute `/zonasi` dipertahankan agar tautan lama tetap berfungsi. Secara istilah, zonasi sudah diganti menjadi **jalur domisili** dalam SPMB.

## Cara membaca hasil (penting)

Semua hasil adalah estimasi dari data yang tersimpan di aplikasi ini.

**Peluang SNBT.** Selisih = skor kamu dikurangi skor minimum historis program studi.

| Selisih | Label |
|---|---|
| ≥ +30 | Tinggi |
| 0 sampai < +30 | Sedang |
| −30 sampai < 0 | Rendah |
| < −30 | Sangat Rendah |

Ambang ±30 adalah aturan sederhana dari tim, bukan standar resmi. **Strategi 3 Pilihan** memakai pembagian yang sama: *Aman* (≥ +30), *Realistis* (0 sampai < +30), *Ambisius* (−30 sampai < 0).

**Status rayon SPMB.** Dicocokkan dari kesamaan nama wilayah (desa/kelurahan/kecamatan) pada alamat pengguna dan alamat sekolah. Label *Kemungkinan dalam rayon* atau *Kemungkinan luar rayon* hanyalah indikasi. Penetapan rayon resmi mengikuti keputusan pemerintah daerah. Jarak ditampilkan sebagai informasi tambahan, bukan penentu.

**Eksplorasi jurusan.** Skor minat adalah rata-rata jawaban 1–5 pada tiga pernyataan per kelompok. Satu refleksi tambahan per kelompok mencatat kekuatan yang dirasakan siswa berdasarkan pengalaman mereka sendiri. Urutan jurusan memakai skor minat pada topik yang ditandai terkait pada data jurusan; penilaian kekuatan tidak dipakai sebagai ukuran kemampuan objektif. Ini alat eksplorasi, bukan asesmen psikologi, ukuran bakat, atau prediksi keberhasilan kuliah.

## Sumber data dan status

Sumber kebijakan di bawah ini adalah sumber primer pemerintah. Sumber tersebut menjelaskan aturan umum, tetapi tidak memverifikasi otomatis isi setiap baris di database aplikasi. Untuk data beasiswa, sekolah, dan program studi, asal data dan tanggal verifikasi perlu dicatat per entri; database prototipe saat ini belum memiliki kolom sumber/tanggal tersebut. Karena itu data tersebut jangan dianggap sudah seluruhnya terverifikasi.

| Data | Isi saat ini | Sumber | Status | Diperbarui |
|---|---|---|---|---|
| Beasiswa (`scholarships`) | Entri dan cakupan mengikuti isi tabel Supabase; jumlah tidak dicatat di repo | Tiap beasiswa harus ditautkan ke laman resmi penyelenggara. Untuk KIP Kuliah, gunakan [portal resmi KIP Kuliah](https://kip-kuliah.kemdiktisaintek.go.id/) dan [panduan/FAQ resmi](https://kip-kuliah.kemdiktisaintek.go.id/panduan). | Sumber per entri belum tersimpan di skema database. Verifikasi syarat dan tenggat di penyelenggara sebelum mendaftar. | Belum tercatat per entri |
| Sekolah (`schools`) | Entri sekolah Purworejo di Supabase; jumlah tidak dicatat di repo | [Referensi Data Pendidikan Kemendikdasmen — DIKDAS](https://referensi.data.kemdikbud.go.id/pendidikan/dikdas/030600/2) dan [DIKMEN](https://referensi.data.kemdikbud.go.id/pendidikan/dikmen/030600/2) untuk identitas/alamat sekolah. Koordinat dan alamat yang telah dikoreksi manual perlu diperiksa terhadap sumbernya masing-masing. | Direktori resmi untuk referensi sekolah; database aplikasi merupakan subset dan belum menyimpan rujukan per sekolah. Kuota di tabel sekolah adalah input aplikasi/estimasi, bukan kuota resmi yang dijamin. | Belum tercatat per entri |
| Kebijakan dan kuota jalur SPMB | Empat jalur: domisili, afirmasi, prestasi, mutasi | [Abstrak Permendikdasmen No. 3 Tahun 2025 di JDIH](https://jdih.kemendikdasmen.go.id/sjdih/siperpu/dokumen/abstraksi/Abs_Permendikdasmen_No_3_Tahun_2025.pdf), [kebijakan SPMB Kemendikdasmen TA 2026/2027](https://pdm.kemendikdasmen.go.id/spmb), dan [FAQ SPMB 2026](https://pdm.kemendikdasmen.go.id/faq-spmb-2026). | Acuan nasional; pelaksanaan, wilayah penerimaan, dan petunjuk teknis perlu dicek di pemerintah daerah/sekolah. Angka kuota pada simulasi harus dibaca bersama aturan jenjang dan juknis setempat. | Aturan yang dirujuk: 2025 dan TA 2026/2027; periksa pembaruan resmi sebelum digunakan |
| Program studi dan skor minimum (`university_programs`) | Entri program dan angka mengikuti isi Supabase; jumlah serta tahun data tidak dicatat di repo | Belum ada rujukan sumber yang tersimpan per program di repo. Gunakan data historis resmi dari PTN terkait bila tersedia dan cantumkan tahun/metodenya; jangan menganggap `min_score` sebagai ambang resmi SNPMB. | Data pembanding/estimasi aplikasi. SNPMB tidak menetapkan satu skor minimum kelulusan yang berlaku umum untuk tiap prodi. | Belum tercatat per entri |
| Rekomendasi jurusan (`majors`) | Deskripsi, minat, karier, dan skill berasal dari tabel Supabase; jumlah tidak dicatat di repo | Kurasi aplikasi; tidak ada sumber rujukan per jurusan yang tercatat di repo. Validasi uraian prodi melalui laman resmi perguruan tinggi dan prospek pekerjaan melalui sumber resmi ketenagakerjaan sebelum mengklaimnya sebagai data terverifikasi. | Saran eksplorasi awal, bukan asesmen psikologi atau rekomendasi akademik profesional. | Belum tercatat per entri |
| Jalur masuk kuliah 2026 | SNBP, SNBT, dan Mandiri | [Laman resmi SNPMB](https://snpmb.id/), [Informasi Umum SNBP](https://snpmb.id/snbp/informasi-umum), [FAQ SNPMB](https://snpmb.id/faq), dan [Unduhan/panduan SNPMB](https://snpmb.id/unduhan). | Acuan seleksi 2026. Syarat, jadwal, dan aturan dapat berubah pada tahun berikutnya. | Diperiksa 13 Oktober 2026 |
| Peta dan geocoding | Peta OpenStreetMap; pencarian alamat memakai Nominatim | [Kebijakan penggunaan Nominatim](https://operations.osmfoundation.org/policies/nominatim/) dan [hak cipta/atribusi OpenStreetMap](https://www.openstreetmap.org/copyright). | Layanan pihak ketiga; patuhi batas penggunaan dan tampilkan atribusi peta. | Periksa kebijakan layanan sebelum deployment/pemakaian skala besar |

### Catatan verifikasi

- Halaman [Informasi Umum SNBP 2026](https://snpmb.id/snbp/informasi-umum) menyebut rapor dan prestasi sebagai dasar seleksi serta nilai TKA sebagai ketentuan SNBP 2026. Persyaratan tahun lain harus mengikuti pengumuman resmi tahun tersebut.
- Untuk jenjang SMP di Purworejo, rujuk [informasi Dindikbud tentang Juknis SPMB 2026/2027](https://dindikbud.purworejokab.go.id/dindikbud-purworejo-gelar-deklarasi-komitmen-bersama-dan-penandatanganan-pakta-integritas-spmb-2026) dan Keputusan Bupati Purworejo Nomor 100.3.3.2/281/2026. Untuk SMA/SMK, cek [portal SPMB Provinsi Jawa Tengah](https://spmb.jatengprov.go.id/) dan petunjuk teknis provinsi. Permendikdasmen adalah dasar nasional, bukan pengganti juknis daerah.
- Tidak ada satu sumber resmi yang membuktikan seluruh isi database beasiswa atau skor minimum. Saat data diperbarui, simpan URL sumber, tanggal akses, tahun ajaran/seleksi, dan catatan verifikasi bersama tiap entri.

## Batasan

- Bukan prediksi atau keputusan resmi. Selalu cek informasi resmi sebelum mendaftar.
- Data masih terbatas dan terpusat di Purworejo. Aturan SPMB (rayon, kuota) dapat berbeda tiap daerah dan tiap sekolah.
- Kalkulator peluang hanya untuk jalur SNBT (skor UTBK). SNBP (rapor dan TKA) belum dihitung.
- Jalur politeknik dan sekolah kedinasan belum tercakup.
- Pencarian alamat memakai layanan publik Nominatim (OpenStreetMap) yang memiliki batas pemakaian. Untuk pemakaian skala besar perlu penyedia geocoding sendiri.
- Aturan seleksi berubah tiap tahun. Halaman jalur mengacu pada SNPMB 2026.

## Demo singkat (±3 menit)

Persona: siswa kelas 12 di Purworejo yang suka ngoding, belum yakin jurusan, dan belum tahu jalur mana yang cocok.

1. **Eksplorasi Jurusan** (`/jurusan`): jawab 16 pernyataan untuk melihat pola minat, refleksi kekuatan diri, dan rekomendasi jurusan beserta prospek karier dan skill.
2. **Jalur Masuk Kuliah** (`/jalur`): pahami perbedaan SNBP, SNBT, dan Mandiri.
3. **Kalkulator Peluang** (`/jurusan/peluang`): pilih jurusan, masukkan perkiraan skor UTBK, lihat Strategi 3 Pilihan.
4. **Cek Beasiswa** (`/beasiswa`): cari beasiswa untuk jenjang Kuliah.
5. *(Opsional)* **Simulasi SPMB** (`/zonasi`): untuk adik atau calon murid, pilih jenjang, cari alamat atau klik peta.

## Teknologi

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4 dengan token desain dari `tailwind.config.ts`
- Supabase (PostgreSQL) untuk data
- Leaflet, react-leaflet, dan peta OpenStreetMap; Nominatim untuk pencarian alamat
- Dihosting di Vercel

## Menjalankan secara lokal

```bash
npm install
```

Buat berkas `.env.local` di root proyek:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=isi_anon_key
```

Tanpa tanda kutip dan tanpa garis miring di akhir URL. Lalu:

```bash
npm run dev
```

Buka http://localhost:3000. Setelah mengubah `.env.local`, restart server.

## Struktur database (ringkas)

Setiap tabel perlu kebijakan baca (RLS `select`) untuk publik agar data bisa diambil.

| Tabel | Kolom utama |
|---|---|
| `scholarships` | `id`, `name`, `description`, `requirements`, `registration_link`, `education_level` |
| `schools` | `id`, `name`, `address`, `latitude`, `longitude`, `zoning_quota`, `level` (`SMP`/`SMA`/`SMK`) |
| `majors` | `id`, `name`, `description`, `traits`, `careers`, `skills` |
| `university_programs` | `id`, `university_name`, `program_name`, `min_score`, `field_category` |

`zoning_quota` adalah nama kolom lama yang dipakai sebagai kuota domisili (estimasi).

## Struktur folder

```
app/
  page.tsx                 landing page
  beasiswa/                daftar dan detail beasiswa
  jurusan/                 kuisioner minat, hasil, dan kalkulator peluang
  jalur/                   perbandingan jalur masuk kuliah
  zonasi/                  simulasi SPMB (pilih jenjang dan lokasi, hasil)
components/                Header, Footer, HeroSection, FeaturesSection, AddressPicker, MapPicker, dll.
lib/                       supabase.ts, geocode.ts, reverseGeocode.ts, distance.ts, spmb.ts
lib/data/                  data statis (daftar fitur, jalur masuk)
```

## Privasi

Aplikasi tidak menyimpan input pengguna ke database. Alamat dan skor hanya ada di parameter URL. Alamat yang diketik atau dipilih di peta dikirim ke layanan Nominatim (OpenStreetMap) untuk pencarian dan reverse geocoding.

## Rencana pengembangan

- Menambah data beasiswa, sekolah, dan program studi dengan sumber yang tercatat
- Menampilkan sumber dan tanggal data langsung di halaman hasil
- Menghitung jalur SNBP dan menambah jalur politeknik/kedinasan
- Memperluas cakupan wilayah di luar Purworejo

## Tim

1. Akhmad Nur Faozan
2. Hanif Abdurrahman
3. Jibril Mohammad Shaheen
4. Primananda Andhika
Asal: Universitas Sebelas Maret

## Lisensi dan atribusi

Data peta © kontributor OpenStreetMap.
