import Link from 'next/link'
import supabase from '@/lib/supabase'

interface Major {
  id: number
  name: string
  description: string
  traits: string
}

export default async function JurusanHasilPage({
  searchParams,
}: {
  searchParams: Promise<{ traits?: string | string[] }>
}) {
  const params = await searchParams
  const selected = params.traits ? (Array.isArray(params.traits) ? params.traits : [params.traits]) : []

  const { data: majors, error } = await supabase.from('majors').select('*').returns<Major[]>()

  if (error) {
    return <p className="p-6 text-error">Error: {error.message}</p>
  }

  const ranked = majors
  ?.map((major) => {
    const matchedTraits = selected.filter((trait) => major.traits.toLowerCase().includes(trait.toLowerCase()))
    return { ...major, matchCount: matchedTraits.length, matchedTraits }
  })
  .filter((major) => major.matchCount > 0)
  .sort((a, b) => b.matchCount - a.matchCount)

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/jurusan"
        className="inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Kembali
      </Link>

      <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-md md:text-headline-md">
        Rekomendasi Jurusan Buat Kamu
      </h1>

      <ul className="mt-6 space-y-4">
        {ranked?.map((major) => (
          <li
            key={major.id}
            className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h2 className="font-title-md text-title-md text-on-surface">{major.name}</h2>
            <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{major.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {major.matchedTraits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full bg-tertiary-fixed px-2.5 py-1 font-label-sm text-label-sm capitalize text-on-tertiary-fixed"
                >
                  {trait}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {ranked?.length === 0 && (
        <p className="mt-8 font-body-md text-body-md text-on-surface-variant">
          Belum ada jurusan yang cocok dari pilihanmu, coba centang lebih banyak minat.
        </p>
      )}
    </section>
  )
}