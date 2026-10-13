import Link from 'next/link'
import supabase from '@/lib/supabase'

interface Scholarship {
  id: number
  name: string
  description: string
  requirements: string
  registration_link: string
  education_level: string
}

interface BeasiswaSearchParams {
  jenjang?: string | string[]
  q?: string | string[]
  sort?: string | string[]
  page?: string | string[]
}

const PAGE_SIZE = 8

function getSingleParam(value: string | string[] | undefined): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function buildPageHref(page: number, params: { jenjang?: string; q?: string; sort: 'asc' | 'desc' }): string {
  const searchParams = new URLSearchParams()
  if (params.q) searchParams.set('q', params.q)
  if (params.jenjang) searchParams.set('jenjang', params.jenjang)
  if (params.sort !== 'asc') searchParams.set('sort', params.sort)
  searchParams.set('page', String(page))
  return `/beasiswa?${searchParams.toString()}`
}

export default async function BeasiswaPage({
  searchParams,
}: {
  searchParams: Promise<BeasiswaSearchParams>
}) {
  const params = await searchParams
  const rawJenjang = getSingleParam(params.jenjang)
  const jenjang = rawJenjang === 'SMA' || rawJenjang === 'Kuliah' ? rawJenjang : undefined
  const q = getSingleParam(params.q)?.trim() || undefined
  const sort = getSingleParam(params.sort) === 'desc' ? 'desc' : 'asc'
  const rawPage = Number(getSingleParam(params.page) ?? '1')
  const requestedPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1

  function createQuery() {
    let query = supabase.from('scholarships').select('*', { count: 'exact' })

    if (jenjang) {
      query = query.eq('education_level', jenjang)
    }

    if (q) {
      query = query.ilike('name', `%${q}%`)
    }

    return query.order('name', { ascending: sort === 'asc' })
  }

  let currentPage = requestedPage
  const initialResult = await createQuery()
    .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1)
    .returns<Scholarship[]>()

  if (initialResult.error) {
    return <p className="p-6 text-error">Error: {initialResult.error.message}</p>
  }

  let scholarships = initialResult.data
  const totalItems = initialResult.count ?? 0
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)
  if (totalPages > 0 && currentPage > totalPages) {
    currentPage = totalPages
    const result = await createQuery()
      .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1)
      .returns<Scholarship[]>()

    if (result.error) {
      return <p className="p-6 text-error">Error: {result.error.message}</p>
    }

    scholarships = result.data
  }

  const jenjangOptions = [
    { value: '', label: 'Semua Jenjang' },
    { value: 'SMA', label: 'SMA' },
    { value: 'Kuliah', label: 'Kuliah' },
  ]

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Daftar Beasiswa
      </h1>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Cari beasiswa yang sesuai jenjang pendidikanmu.
      </p>

      <form method="get" className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <label htmlFor="q" className="sr-only">
          Cari beasiswa
        </label>
        <input
          id="q"
          type="text"
          name="q"
          defaultValue={q || ''}
          placeholder="Cari nama beasiswa..."
          className="flex-1 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none"
        />

        <label htmlFor="jenjang" className="sr-only">
          Filter jenjang
        </label>
        <select
          id="jenjang"
          name="jenjang"
          defaultValue={jenjang || ''}
          className="cursor-pointer rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none"
        >
          {jenjangOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <label htmlFor="sort" className="sr-only">
          Urutkan
        </label>
        <select
          id="sort"
          name="sort"
          defaultValue={sort}
          className="cursor-pointer rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none"
        >
          <option value="asc">Nama A-Z</option>
          <option value="desc">Nama Z-A</option>
        </select>

        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 font-label-lg text-label-lg text-on-primary shadow-sm transition-colors duration-200 hover:bg-primary-container"
        >
          Cari
        </button>
      </form>

      {totalItems > 0 && (
        <p className="mt-5 font-body-sm text-body-sm text-on-surface-variant" aria-live="polite">
          Menampilkan {Math.min((currentPage - 1) * PAGE_SIZE + 1, totalItems)}–{Math.min(currentPage * PAGE_SIZE, totalItems)} dari {totalItems} beasiswa
        </p>
      )}

      <ul className="mt-8 space-y-4">
        {scholarships?.map((item) => (
          <li key={item.id}>
            <Link
              href={`/beasiswa/${item.id}`}
              className="group block cursor-pointer rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
            >
              <h2 className="font-title-md text-title-md text-on-surface transition-colors group-hover:text-primary">
                {item.name}
              </h2>
              <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{item.description}</p>
              <p className="mt-2 font-body-sm text-body-sm text-outline">Syarat: {item.requirements}</p>
            </Link>
          </li>
        ))}
      </ul>

      {scholarships?.length === 0 && (
        <p className="mt-8 font-body-md text-body-md text-on-surface-variant">
          Tidak ada beasiswa yang cocok dengan pencarianmu.
        </p>
      )}

      {totalPages > 1 && (
        <nav aria-label="Navigasi halaman beasiswa" className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {currentPage > 1 && (
            <Link
              href={buildPageHref(currentPage - 1, { jenjang, q, sort })}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-outline-variant px-4 py-2 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              ← Sebelumnya
            </Link>
          )}
          <span className="font-body-sm text-body-sm text-on-surface-variant" aria-current="page">
            Halaman {currentPage} dari {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={buildPageHref(currentPage + 1, { jenjang, q, sort })}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-outline-variant px-4 py-2 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              Selanjutnya →
            </Link>
          )}
        </nav>
      )}
    </section>
  )
}
