import Link from 'next/link'
import supabase from '@/lib/supabase'
import { calculateDistance } from '@/lib/distance'
import ZonasiSortForm from '@/components/ZonasiSortForm'

interface School {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  zoning_quota: number
  level: string
}

const PAGE_SIZE = 10

function getPeluang(distance: number): { label: string; bg: string; text: string } {
  if (distance <= 1) return { label: 'Sangat Tinggi', bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed' }
  if (distance <= 3) return { label: 'Tinggi', bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed' }
  if (distance <= 5) return { label: 'Sedang', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed' }
  return { label: 'Rendah', bg: 'bg-error-container', text: 'text-on-error-container' }
}

function buildPageUrl(base: Record<string, string>, page: number) {
  const usp = new URLSearchParams({ ...base, page: String(page) })
  return `/zonasi/hasil?${usp.toString()}`
}

export default async function ZonasiHasilPage({
  searchParams,
}: {
  searchParams: Promise<{ lat?: string; lon?: string; alamat?: string; jenjang?: string; sort?: string; page?: string }>
}) {
  const params = await searchParams
  const lat = Number(params.lat)
  const lon = Number(params.lon)
  const alamat = params.alamat || ''
  const jenjang = params.jenjang || ''
  const sort = params.sort || 'jarak-asc'
  const page = Math.max(1, Number(params.page) || 1)

  if (!params.lat || !params.lon || isNaN(lat) || isNaN(lon) || !jenjang) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-body-md text-body-md text-on-surface-variant">Lokasi belum dipilih.</p>
        <Link href="/zonasi" className="mt-4 inline-block cursor-pointer font-label-lg text-label-lg text-primary hover:underline">
          ← Pilih lokasi
        </Link>
      </section>
    )
  }

  const { data: schools, error } = await supabase
  .from('schools')
  .select('*')
  .eq('level', jenjang)
  .returns<School[]>()

  if (error) {
    return <p className="p-6 text-error">Error: {error.message}</p>
  }

  const withDistance =
    schools?.map((school) => ({
      ...school,
      distance: calculateDistance(lat, lon, school.latitude, school.longitude),
    })) ?? []

  const sorters: Record<string, (a: (typeof withDistance)[number], b: (typeof withDistance)[number]) => number> = {
    'jarak-asc': (a, b) => a.distance - b.distance,
    'jarak-desc': (a, b) => b.distance - a.distance,
    'kuota-desc': (a, b) => b.zoning_quota - a.zoning_quota,
    'kuota-asc': (a, b) => a.zoning_quota - b.zoning_quota,
  }

  const ranked = [...withDistance].sort(sorters[sort] ?? sorters['jarak-asc'])

  const totalPages = Math.max(1, Math.ceil(ranked.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = ranked.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const baseParams = { lat: params.lat!, lon: params.lon!, alamat, jenjang, sort }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/zonasi"
        className="inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Ubah lokasi
      </Link>

      <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-md md:text-headline-md">
        Hasil Simulasi Zonasi
      </h1>
      <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
        Jenjang: {jenjang} · Lokasi: {alamat}
      </p>

      <ZonasiSortForm lat={params.lat!} lon={params.lon!} alamat={alamat} jenjang={jenjang} sort={sort} />

      <ul className="mt-6 space-y-4">
        {paged.map((school) => {
          const peluang = getPeluang(school.distance)
          return (
            <li
              key={school.id}
              className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-title-md text-title-md text-on-surface">{school.name}</h2>
                <span className={`shrink-0 rounded-full ${peluang.bg} ${peluang.text} px-3 py-1 font-label-sm text-label-sm font-bold uppercase tracking-wide`}>
                  {peluang.label}
                </span>
              </div>
              <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                Jarak: {school.distance.toFixed(2)} km · Kuota zonasi: {school.zoning_quota}
              </p>
            </li>
          )
        })}
      </ul>

      {totalPages > 1 && (
        <nav aria-label="Navigasi halaman" className="mt-8 flex items-center justify-center gap-3">
          {currentPage > 1 && (
            <Link
              href={buildPageUrl(baseParams, currentPage - 1)}
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
              href={buildPageUrl(baseParams, currentPage + 1)}
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