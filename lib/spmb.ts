export type Jenjang = 'SMP' | 'SMA' | 'SMK'

export interface JalurInfo {
  id: string
  name: string
  who: string
  quota: Partial<Record<Jenjang, string>>
}

export const JALUR_SPMB: JalurInfo[] = [
  {
    id: 'domisili',
    name: 'Domisili',
    who: 'Calon murid yang tinggal di wilayah penerimaan (rayon) yang ditetapkan pemerintah daerah.',
    quota: { SMP: 'min. 40%', SMA: 'min. 30%' },
  },
  {
    id: 'afirmasi',
    name: 'Afirmasi',
    who: 'Calon murid dari keluarga kurang mampu dan penyandang disabilitas.',
    quota: { SMP: 'min. 20%', SMA: 'min. 30%' },
  },
  {
    id: 'prestasi',
    name: 'Prestasi',
    who: 'Calon murid dengan prestasi akademik atau non-akademik.',
    quota: { SMP: 'min. 25%', SMA: 'min. 30%' },
  },
  {
    id: 'mutasi',
    name: 'Mutasi',
    who: 'Calon murid yang pindah karena pekerjaan orang tua/wali, termasuk anak guru.',
    quota: { SMP: 'maks. 5%', SMA: 'maks. 5%' },
  },
]
export interface DomisiliStatus {
  label: string
  bg: string
  text: string
}

export function getAreaTokens(address: string): Set<string> {
  const tokens = new Set<string>()
  for (const raw of address.split(',')) {
    const seg = raw
      .replace(/^\s*(kecamatan|kec\.|kelurahan|kel\.|desa)\s+/i, '')
      .trim()
      .toLowerCase()
    if (!seg || /\d/.test(seg)) continue
    if (/^(jl\.|jalan|gang|gg\.|rt|rw)/.test(seg)) continue
    if (/^(kabupaten|kab\.|kota|provinsi|jawa|daerah istimewa|indonesia)/.test(seg)) continue
    tokens.add(seg)
  }
  return tokens
}

export function getDomisiliStatus(userTokens: Set<string>, schoolTokens: Set<string>): DomisiliStatus {
  if (userTokens.size === 0 || schoolTokens.size === 0) {
    return { label: 'Perlu dicek', bg: 'bg-surface-container-high', text: 'text-on-surface-variant' }
  }
  const shared = [...userTokens].some((t) => schoolTokens.has(t))
  if (shared) {
    return { label: 'Kemungkinan dalam rayon', bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed' }
  }
  return { label: 'Kemungkinan luar rayon', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed' }
}