import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-surface px-4 py-12 md:px-6 md:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3.5 py-1.5 text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-label-md text-label-md font-semibold uppercase tracking-wide">
            Navigasi Pendidikan Terpadu
          </span>
        </span>

        <h1 className="mt-5 font-display-mobile text-display-mobile text-on-surface tracking-tight md:font-display md:text-display">
          Selamat Datang di{' '}
          <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
            Kompas Pendidikan
          </span> 
        </h1>

        <p className="mt-4 font-body-md text-body-md text-on-surface-variant md:font-body-lg md:text-body-lg">
          Navigasi lengkap untuk menemukan beasiswa, simulasi zonasi PPDB, hingga kalkulator peluang lolos jurusan impianmu.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="#layanan-inti"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-lg text-label-lg text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg cursor-pointer"
          >
            Lihat Semua Layanan
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}