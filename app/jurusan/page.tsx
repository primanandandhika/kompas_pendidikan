import TesJurusan from '@/components/TesJurusan'

export default function JurusanPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm text-on-primary-fixed">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">psychology</span>
        Eksplorasi minat
      </span>
      <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Kenali minatmu, temukan jurusan untuk dieksplorasi
      </h1>
      <p className="mt-2 max-w-2xl font-body-md text-body-md text-on-surface-variant">
        Jawab 16 pernyataan tentang aktivitas yang kamu minati dan kekuatan yang kamu rasakan. Hasilnya membantu
        kamu mengeksplorasi jurusan, lalu menelusuri jalur kuliah dan karier yang terkait.
      </p>

      <div className="mt-5 rounded-2xl border border-outline-variant bg-surface-container-low p-4">
        <p className="font-label-lg text-label-lg text-on-surface">Sebelum mulai</p>
        <ul className="mt-2 list-inside list-disc space-y-1 font-body-sm text-body-sm text-on-surface-variant">
          <li>Tidak ada jawaban benar atau salah. Pilih sesuai dirimu, bukan ekspektasi orang lain.</li>
          <li>Bagian kekuatan adalah penilaian dirimu sendiri, bukan tes kemampuan akademik atau tes bakat.</li>
          <li>Jawabanmu tidak disimpan ke database; hasil dikirim lewat URL agar bisa dibuka kembali.</li>
          <li>Gunakan hasil sebagai bahan diskusi dengan guru BK dan untuk mencoba kegiatan yang kamu minati.</li>
        </ul>
      </div>

      <TesJurusan />
    </section>
  )
}
