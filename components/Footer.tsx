import Link from 'next/link'

export default function Footer() {
  const toolLinks = [
    { href: '/jurusan/peluang', label: 'Kalkulator Peluang Jurusan' },
    { href: '/zonasi', label: 'Simulasi Zonasi PPDB' },
    { href: '/jurusan', label: 'Tes Minat & Bakat Jurusan' },
    { href: '/beasiswa', label: 'Pencocokan Beasiswa' },
  ]

  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div className="space-y-3">
            <h2 className="font-headline-sm text-headline-sm text-primary">Kompas Pendidikan</h2>
            <p className="font-body-md text-body-md max-w-md">
              Navigasi pendidikan dari milih sekolah sampai milih jurusan kuliah, dalam satu tempat.
            </p>
          </div>

          <nav aria-label="Tautan alat & simulasi">
            <h3 className="font-headline-sm text-[16px] leading-6 text-on-surface mb-3">Alat & Simulasi</h3>
            <ul className="space-y-2.5 font-body-md text-body-md">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-container">
          <p className="font-body-sm text-body-sm">© 2026 Kompas Pendidikan.</p>
        </div>
      </div>
    </footer>
  )
}