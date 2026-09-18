'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const rotatingWords = ['Beasiswa', 'Zonasi PPDB', 'Jurusan Kuliah', 'Peluang Masuk Kampus']

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = rotatingWords[wordIndex]

    if (!isDeleting && displayedText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayedText === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setDisplayedText((prev) => (isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)))
      },
      isDeleting ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, wordIndex])

  return (
    <section className="relative w-full px-4 py-12 md:px-6 md:py-16 lg:px-12 lg:py-24">
      <div className="relative z-10 mx-auto max-w-3xl text-center lg:max-w-4xl">
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

        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant md:text-headline-sm">
          Bantu kamu cari{' '}
          <span className="font-semibold text-primary">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </p>

        <p className="mt-4 font-body-md text-body-md text-on-surface-variant md:font-body-lg md:text-body-lg">
          Navigasi lengkap untuk menemukan beasiswa, simulasi zonasi PPDB, hingga kalkulator peluang lolos jurusan impianmu.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="#layanan-inti"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-lg text-label-lg text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg"
          >
            Lihat Semua Layanan
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}