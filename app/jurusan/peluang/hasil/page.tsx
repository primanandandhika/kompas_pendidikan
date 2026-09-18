import Link from 'next/link'
import supabase from '@/lib/supabase'

interface UniversityProgram {
  id: number
  university_name: string
  program_name: string
  min_score: number
  field_category: string
}

function getPeluang(nilai: number, minScore: number): { label: string; bg: string; text: string } {
  const selisih = nilai - minScore
  if (selisih >= 30) return { label: 'Tinggi', bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed' }
  if (selisih >= 0) return { label: 'Sedang', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed' }
  if (selisih >= -30) return { label: 'Rendah', bg: 'bg-error-container', text: 'text-on-error-container' }
  return { label: 'Sangat Rendah', bg: 'bg-error-container', text: 'text-on-error-container' }
}

export default async function PeluangHasilPage({
  searchParams,
}: {
  searchParams: Promise<{ nilai?: string }>
}) {
  const params = await searchParams
  const nilai = Number(params.nilai)

  if (!params.nilai || isNaN(nilai)) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-body-md text-body-md text-on-surface-variant">Nilai belum valid.</p>
        <Link href="/jurusan/peluang" className="mt-4 inline-block cursor-pointer font-label-lg text-label-lg text-primary hover:underline">
          ← Coba lagi
        </Link>
      </section>
    )
  }

  const { data: programs, error } = await supabase
    .from('university_programs')
    .select('*')
    .returns<UniversityProgram[]>()

  if (error) {
    return <p className="p-6 text-error">Error: {error.message}</p>
  }

  const sortedPrograms = [...(programs ?? [])].sort((a, b) => {
    const peluangA = nilai - a.min_score
    const peluangB = nilai - b.min_score
    return peluangB - peluangA
  })

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/jurusan/peluang"
        className="inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Ubah nilai
      </Link>

      <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-md md:text-headline-md">
        Peluang Kamu di Beberapa Universitas
      </h1>
      <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Skor kamu: {nilai}</p>
      <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">Urutan berdasarkan peluang diterima tertinggi.</p>

      <ul className="mt-6 space-y-4">
        {sortedPrograms.map((prog) => {
          const peluang = getPeluang(nilai, prog.min_score)
          return (
            <li
              key={prog.id}
              className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-title-md text-title-md text-on-surface">
                  {prog.university_name} — {prog.program_name}
                </h2>
                <span className={`shrink-0 rounded-full ${peluang.bg} ${peluang.text} px-3 py-1 font-label-sm text-label-sm font-bold uppercase tracking-wide`}>
                  {peluang.label}
                </span>
              </div>
              <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                Perkiraan skor minimal: {prog.min_score}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}