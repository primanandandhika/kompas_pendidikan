import Link from 'next/link'
import { JALUR_MASUK } from '@/lib/data/jalur'

export default function JalurPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Jalur Masuk Kuliah
      </h1>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Bandingkan jalur masuk PTN, persyaratan utama, dan langkah yang perlu kamu cek sebelum mendaftar.
      </p>
      <p className="mt-4 rounded-xl border border-outline-variant bg-surface-container-low p-4 font-body-sm text-body-sm text-on-surface-variant">
        Ringkasan ini mengacu pada ketentuan seleksi 2026. Persyaratan dapat berubah setiap tahun; pastikan kamu memeriksa pengumuman resmi SNPMB dan PTN tujuan.
      </p>

      <ul className="mt-8 space-y-4">
        {JALUR_MASUK.map((j) => (
          <li
            key={j.id}
            className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h2 className="font-title-md text-title-md text-on-surface">{j.name}</h2>
            <h3 className="mt-4 font-label-lg text-label-lg text-on-surface">Dasar seleksi</h3>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{j.basis}</p>

            <h3 className="mt-4 font-label-lg text-label-lg text-on-surface">Syarat dan langkah utama</h3>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 font-body-sm text-body-sm text-on-surface-variant">
              {j.syarat.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <p className="mt-4 rounded-xl bg-surface-container-low p-3 font-body-sm text-body-sm text-on-surface-variant">
              {j.catatan}
            </p>
            <a
              href={j.sumberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-label-lg text-label-lg text-primary transition-colors hover:text-on-surface"
            >
              {j.sumberLabel}
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">open_in_new</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/jurusan/peluang"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-label-lg text-label-lg text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container hover:shadow-md"
        >
          Cek peluang SNBT
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
        <a
          href="https://portal.snpmb.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-outline-variant px-5 py-2.5 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
        >
          Buka portal SNPMB
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">open_in_new</span>
        </a>
        <Link
          href="/beasiswa"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-outline-variant px-5 py-2.5 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
        >
          Cari beasiswa
        </Link>
      </div>

    </section>
  )
}
