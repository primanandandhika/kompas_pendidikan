export interface Feature {
  id: string
  href: string
  icon: string
  badge: string
  title: string
  description: string
  footer: string
  iconBg: string
  iconText: string
  badgeBg: string
  badgeText: string
  hoverText: string
}

export const features: Feature[] = [
  {
    id: 'beasiswa',
    href: '/beasiswa',
    icon: 'payments',
    badge: 'Pencarian Beasiswa',
    title: 'Cek Beasiswa',
    description: 'Temukan info beasiswa sesuai kriteria kamu, lengkap dengan syarat dan langkah pendaftarannya.',
    footer: 'Fokus wilayah Purworejo',
    iconBg: 'bg-secondary-fixed',
    iconText: 'text-on-secondary-fixed',
    badgeBg: 'bg-secondary-fixed',
    badgeText: 'text-on-secondary-fixed',
    hoverText: 'group-hover:text-secondary',
  },
  {
    id: 'zonasi',
    href: '/zonasi',
    icon: 'map',
    badge: 'SPMB',
    title: 'Simulasi SPMB',
    description: 'Cek estimasi posisi domisili kamu terhadap sekolah di wilayahmu, plus info empat jalur SPMB.',
    footer: 'Contoh: Purworejo',
    iconBg: 'bg-primary-fixed',
    iconText: 'text-on-primary-fixed',
    badgeBg: 'bg-primary-fixed',
    badgeText: 'text-on-primary-fixed',
    hoverText: 'group-hover:text-primary',
  },
  {
    id: 'jurusan',
    href: '/jurusan',
    icon: 'psychology',
    badge: 'Minat & Bakat',
    title: 'Cocok Jurusan Apa',
    description: 'Kuisioner singkat untuk membantu kamu menemukan jurusan kuliah yang sesuai minatmu.',
    footer: '~2 Menit Selesai',
    iconBg: 'bg-tertiary-fixed',
    iconText: 'text-on-tertiary-fixed',
    badgeBg: 'bg-tertiary-fixed',
    badgeText: 'text-on-tertiary-fixed',
    hoverText: 'group-hover:text-tertiary',
  },
  {
    id: 'kalkulator',
    href: '/jurusan/peluang',
    icon: 'calculate',
    badge: 'Jalur SNBT',
    title: 'Kalkulator Peluang Jurusan',
    description: 'Bandingkan perkiraan skor UTBK kamu dengan data historis beberapa universitas.',
    footer: 'Contoh: Informatika',
    iconBg: 'bg-surface-variant',
    iconText: 'text-primary',
    badgeBg: 'bg-surface-container-high',
    badgeText: 'text-primary',
    hoverText: 'group-hover:text-primary',
  },
  {
    id: 'jalur',
    href: '/jalur',
    icon: 'alt_route',
    badge: 'Jalur Kuliah',
    title: 'Jalur Masuk Kuliah',
    description: 'Bandingkan SNBP, SNBT, dan Mandiri: dasar seleksi, syarat, dan aturan penting sebelum memilih.',
    footer: 'Aturan SNPMB 2026',
    iconBg: 'bg-secondary-container',
    iconText: 'text-on-secondary-container',
    badgeBg: 'bg-secondary-container',
    badgeText: 'text-on-secondary-container',
    hoverText: 'group-hover:text-secondary',
  },
]