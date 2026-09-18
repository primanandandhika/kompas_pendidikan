import Link from 'next/link'
import supabase from '@/lib/supabase'

interface UniversityProgram {
  id: number
  university_name: string
  program_name: string
  min_score: number
  field_category: string
}

const PAGE_SIZE = 10
const ALL_JURUSAN = '__all__'

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
  searchParams: Promise<{ nilai?: string; jurusan?: string; page?: string }>
}) {
  const params = await searchParams
  const nilai = Number(params.nilai)
  const jurusan = params.jurusan
  const page = Math.max(1, Number(params.page) || 1)

  if (!params.nilai || isNaN(nilai) || !jurusan) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-body-md text-body-md text-on-surface-variant">Jurusan atau nilai belum diisi.</p>
        <Link href="/jurusan/peluang" className="mt-4 inline-block cursor-pointer font-label-lg text-label-lg text-primary hover:underline">
          ← Coba lagi
        </Link>
      </section>
    )
  }

  let programsQuery = supabase
    .from('university_programs')
    .select('*')

  if (jurusan !== ALL_JURUSAN) {
    programsQuery = programsQuery.eq('field_category', jurusan)
  }

  const { data: programs, error } = await programsQuery.returns<UniversityProgram[]>()

  if (error) {
    return <p className="p-6 text-error">Error: {error.message}</p>
  }

  const ranked =
    programs?.map((prog) => ({ ...prog, selisih: nilai - prog.min_score })).sort((a, b) => b.selisih - a.selisih) ?? []

  const totalPages = Math.max(1, Math.ceil(ranked.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = ranked.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/jurusan/peluang"
        className="inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Ubah pilihan
      </Link>

      <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-md md:text-headline-md">
        Peluang Kamu di {jurusan === ALL_JURUSAN ? 'Semua Jurusan' : `Jurusan ${jurusan}`}
      </h1>
      <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Skor kamu: {nilai}</p>

      <ul className="mt-6 space-y-4">
        {paged.map((prog) => {
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

      {totalPages > 1 && (
        <nav aria-label="Navigasi halaman" className="mt-8 flex items-center justify-center gap-3">
          {currentPage > 1 && (
            <Link
              href={`/jurusan/peluang/hasil?nilai=${nilai}&jurusan=${encodeURIComponent(jurusan)}&page=${currentPage - 1}`}
              className="cursor-pointer rounded-full border border-outline-variant px-4 py-2 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              ← Sebelumnya
            </Link>
          )}
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Halaman {currentPage} dari {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/jurusan/peluang/hasil?nilai=${nilai}&jurusan=${encodeURIComponent(jurusan)}&page=${currentPage + 1}`}
              className="cursor-pointer rounded-full border border-outline-variant px-4 py-2 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              Selanjutnya →
            </Link>
          )}
        </nav>
      )}
    </section>
  )
}