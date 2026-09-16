'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Beranda' },
    { href: '/beasiswa', label: 'Beasiswa' },
    { href: '/zonasi', label: 'Zonasi PPDB' },
    { href: '/jurusan', label: 'Tes Jurusan' },
    { href: '/jurusan/peluang', label: 'Kalkulator Peluang' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-sm">
      <div className="h-16 md:h-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-headline-sm text-headline-sm text-primary tracking-tight">
          Kompas Pendidikan
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container transition-colors duration-200 text-on-surface cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="material-symbols-outlined text-[22px] transition-transform duration-200" style={{ transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav aria-label="Navigasi mobile" className="lg:hidden border-t border-surface-container bg-surface">
          <ul className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2.5 font-label-lg text-label-lg text-on-surface-variant"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}