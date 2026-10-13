import Link from 'next/link'
import supabase from '@/lib/supabase'
import ChipList from '@/components/ChipList'
import { MINAT_CATEGORIES, STRENGTH_SCALE } from '@/lib/data/tes-jurusan'

interface Major {
  id: number
  name: string
  description: string
  traits: string
  careers: string | null
  skills: string | null
}

interface ProgramCategory {
  field_category: string
}

interface ScoredMajor extends Major {
  interestScore: number
  matchedTraits: string[]
}

const PAGE_SIZE = 10

function getValidScores(rawScores: string | string[] | undefined): number[] | null {
  if (typeof rawScores !== 'string') return null
  const scores = rawScores.split(',').map(Number)
  if (scores.length !== MINAT_CATEGORIES.length) return null
  if (scores.some((score) => !Number.isInteger(score) || score < 3 || score > 15)) return null
  return scores
}

function getValidStrengths(rawStrengths: string | string[] | undefined): number[] | null {
  if (typeof rawStrengths !== 'string') return null
  const strengths = rawStrengths.split(',').map(Number)
  if (strengths.length !== MINAT_CATEGORIES.length) return null
  if (strengths.some((score) => !Number.isInteger(score) || score < 1 || score > 5)) return null
  return strengths
}

export default async function JurusanHasilPage({
  searchParams,
}: {
  searchParams: Promise<{ scores?: string | string[]; strengths?: string | string[]; page?: string | string[] }>
}) {
  const params = await searchParams
  const rawScores = typeof params.scores === 'string' ? params.scores : undefined
  const rawStrengths = typeof params.strengths === 'string' ? params.strengths : undefined
  const scores = getValidScores(params.scores)
  const strengths = getValidStrengths(params.strengths)

  if (!scores) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <h1 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-md md:text-headline-md">
          Jawaban tes belum lengkap
        </h1>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Mulai tes minat untuk melihat ringkasan profil dan jurusan yang bisa kamu eksplorasi.
        </p>
        <Link href="/jurusan" className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 font-label-lg text-label-lg text-on-primary transition-colors hover:bg-primary-container">
          Mulai tes minat
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </section>
    )
  }

  const [{ data: majors, error }, { data: categories, error: categoriesError }] = await Promise.all([
    supabase.from('majors').select('*').returns<Major[]>(),
    supabase.from('university_programs').select('field_category').returns<ProgramCategory[]>(),
  ])

  if (error) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <h1 className="font-headline-sm text-headline-sm text-on-surface">Hasil belum bisa dimuat</h1>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Data jurusan sedang bermasalah. Coba lagi beberapa saat atau buka tesnya kembali.
        </p>
        <Link href="/jurusan" className="mt-4 inline-flex cursor-pointer font-label-lg text-label-lg text-primary hover:underline">
          ← Kembali ke tes minat
        </Link>
      </section>
    )
  }

  const interestByTag = new Map(
    MINAT_CATEGORIES.map((category, index) => [category.value, scores[index] / category.questions.length])
  )
  const profile = MINAT_CATEGORIES.map((category, index) => ({
    ...category,
    average: scores[index] / category.questions.length,
  })).sort((a, b) => b.average - a.average)

  const ranked: ScoredMajor[] = (majors ?? [])
    .map((major) => {
      const sourceTraits = major.traits.toLowerCase()
      const matchedTraits = MINAT_CATEGORIES.filter((category) => sourceTraits.includes(category.value))
      const interestScore = matchedTraits.length
        ? matchedTraits.reduce((total, category) => total + (interestByTag.get(category.value) ?? 0), 0) / matchedTraits.length
        : 0
      return {
        ...major,
        matchedTraits: matchedTraits.map((category) => category.label),
        interestScore,
      }
    })
    .filter((major) => major.matchedTraits.length > 0)
    .sort((a, b) => b.interestScore - a.interestScore || a.name.localeCompare(b.name, 'id'))

  const requestedPage = typeof params.page === 'string' ? Number(params.page) : 1
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const totalPages = Math.ceil(ranked.length / PAGE_SIZE)
  const currentPage = totalPages > 0 ? Math.min(page, totalPages) : 1
  const pagedMajors = ranked.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const availableCategories = new Set(
    categoriesError ? [] : (categories ?? []).map((item) => item.field_category.trim().toLowerCase())
  )

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/jurusan"
        className="inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
        Ulangi tes
      </Link>

      <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Ringkasan minat dan kekuatan yang kamu rasakan
      </h1>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Profil ini membantu memulai eksplorasi jurusan. Nilai kekuatan berasal dari penilaian dirimu sendiri, bukan tes kemampuan, rekomendasi jurusan di bawah diurutkan berdasarkan pola minat.
      </p>

      <section aria-labelledby="profile-heading" className="mt-6 rounded-3xl border border-outline-variant bg-surface-container-low p-5 md:p-6">
        <h2 id="profile-heading" className="font-title-md text-title-md text-on-surface">Pola minat dan refleksi kekuatan</h2>
        <ol className="mt-4 space-y-4">
          {profile.map((item, index) => (
            <li key={item.value}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">{item.label}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
                  {strengths && (
                    <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                      Kekuatan yang kamu rasakan: {STRENGTH_SCALE[strengths[index] - 1].label} ({strengths[index]} / 5)
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-label-lg text-label-lg text-primary">{item.average.toFixed(1)} / 5</span>
              </div>
              <div
                role="progressbar"
                aria-label={`Minat ${item.label}`}
                aria-valuenow={Math.round(item.average * 10) / 10}
                aria-valuemin={1}
                aria-valuemax={5}
                className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container-high"
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${(item.average / 5) * 100}%` }} />
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-outline-variant pt-4 font-body-sm text-body-sm text-on-surface-variant">
          Skor minat adalah rata-rata jawabanmu pada pernyataan minat. Nilai kekuatan adalah penilaian diri berdasarkan pengalamanmu; keduanya bukan ukuran bakat, nilai akademik, atau prediksi keberhasilan.
        </p>
        <div className="mt-4 rounded-2xl bg-surface-container-low p-4">
          <p className="font-label-lg text-label-lg text-on-surface">Cara membaca hasil</p>
          <ul className="mt-2 list-inside list-disc space-y-1 font-body-sm text-body-sm text-on-surface-variant">
            <li>Minat dan rasa yakin sama-sama tinggi? Cari mata kuliah dan kegiatan terkait untuk dicoba lebih lanjut.</li>
            <li>Minat tinggi tetapi belum yakin? Anggap sebagai area untuk dipelajari; rasa mampu bisa tumbuh lewat latihan dan dukungan.</li>
            <li>Rasa yakin tinggi tetapi minat rendah? Itu tetap kekuatanmu, tetapi kamu tidak harus memilih jurusan hanya karena sudah menguasainya.</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Jurusan untuk kamu eksplorasi</h2>
          <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
            Diurutkan menurut kekuatan minat pada topik yang ditandai terkait dengan tiap jurusan.
          </p>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">{ranked.length} rekomendasi</span>
      </div>

      {ranked.length > 0 ? (
        <ul className="mt-5 space-y-4">
          {pagedMajors.map((major) => (
            <li key={major.id} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-title-md text-title-md text-on-surface">{major.name}</h3>
                  <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{major.description}</p>
                </div>
                <span className="rounded-full bg-primary-fixed px-3 py-1 font-label-md text-label-md text-on-primary-fixed">
                  Minat terkait: {major.interestScore.toFixed(1)} / 5
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {major.matchedTraits.map((trait) => (
                  <span key={trait} className="rounded-full bg-tertiary-fixed px-2.5 py-1 font-label-sm text-label-sm text-on-tertiary-fixed">
                    {trait}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
                Rekomendasi ini muncul karena katalog menandai jurusan ini berkaitan dengan minat di atas.
              </p>
              <ChipList title="Prospek karier" csv={major.careers} className="bg-primary-fixed text-on-primary-fixed" />
              <ChipList title="Skill yang dibutuhkan" csv={major.skills} className="bg-surface-container-high text-on-surface" />

              {availableCategories.has(major.name.trim().toLowerCase()) && (
                <Link
                  href={`/jurusan/peluang?jurusan=${encodeURIComponent(major.name)}`}
                  className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-label-lg text-label-lg text-primary transition-colors hover:text-primary-container"
                >
                  Bandingkan peluang SNBT untuk jurusan ini
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 rounded-2xl border border-outline-variant bg-surface-container-low p-5 font-body-md text-body-md text-on-surface-variant">
          Belum ada jurusan di katalog yang ditandai dengan kelompok minat dari tes ini. Kamu tetap bisa melihat semua jurusan dan mencoba eksplorasi mandiri.
        </p>
      )}

      {totalPages > 1 && (
        <nav aria-label="Navigasi halaman rekomendasi jurusan" className="mt-6 flex items-center justify-center gap-3">
          {currentPage > 1 && (
            <Link
            href={`/jurusan/hasil?scores=${encodeURIComponent(rawScores ?? '')}${rawStrengths ? `&strengths=${encodeURIComponent(rawStrengths)}` : ''}&page=${currentPage - 1}`}
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
              href={`/jurusan/hasil?scores=${encodeURIComponent(rawScores ?? '')}${rawStrengths ? `&strengths=${encodeURIComponent(rawStrengths)}` : ''}&page=${currentPage + 1}`}
              className="cursor-pointer rounded-full border border-outline-variant px-4 py-2 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              Selanjutnya →
            </Link>
          )}
        </nav>
      )}

      <aside className="mt-6 rounded-2xl bg-surface-container-low p-4">
        <p className="font-label-lg text-label-lg text-on-surface">Langkah berikutnya</p>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
          Baca kurikulum dan persyaratan jurusan di situs kampus, coba proyek atau kegiatan terkait, lalu diskusikan pilihanmu dengan guru BK atau orang yang kamu percaya. Bandingkan juga jalur masuk kuliah sebelum menentukan rencana.
        </p>
        <Link href="/jalur" className="mt-3 inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-primary transition-colors hover:text-primary-container">
          Lihat perbandingan jalur masuk kuliah
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </aside>
    </section>
  )
}
