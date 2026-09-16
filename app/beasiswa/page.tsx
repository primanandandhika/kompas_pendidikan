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

export default async function BeasiswaPage({
  searchParams,
}: {
  searchParams: Promise<{ jenjang?: string }>
}) {
  const params = await searchParams
  let query = supabase.from('scholarships').select('*')

  if (params.jenjang) {
    query = query.eq('education_level', params.jenjang)
  }

  const { data: scholarships, error } = await query.returns<Scholarship[]>()

  if (error) {
    return <p className="p-6 text-error">Error: {error.message}</p>
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

      <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="jenjang" className="sr-only">
          Filter jenjang
        </label>
        <select
          id="jenjang"
          name="jenjang"
          defaultValue={params.jenjang || ''}
          className="cursor-pointer rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none"
        >
          {jenjangOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 font-label-lg text-label-lg text-on-primary shadow-sm transition-colors duration-200 hover:bg-primary-container"
        >
          Cari
        </button>
      </form>

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
          Belum ada beasiswa untuk jenjang ini.
        </p>
      )}
    </section>
  )
}