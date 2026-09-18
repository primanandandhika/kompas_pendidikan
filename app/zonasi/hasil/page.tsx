import Link from 'next/link'
import supabase from '@/lib/supabase'
import { geocodeAddress } from '@/lib/geocode'
import { calculateDistance } from '@/lib/distance'

interface School {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  zoning_quota: number
}

function getPeluang(distance: number): { label: string; bg: string; text: string } {
  if (distance <= 1) return { label: 'Sangat Tinggi', bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed' }
  if (distance <= 3) return { label: 'Tinggi', bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed' }
  if (distance <= 5) return { label: 'Sedang', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed' }
  return { label: 'Rendah', bg: 'bg-error-container', text: 'text-on-error-container' }
}

export default async function ZonasiHasilPage({
  searchParams,
}: {
  searchParams: Promise<{ alamat?: string }>
}) {
  const params = await searchParams
  const alamat = params.alamat

  if (!alamat) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-body-md text-body-md text-on-surface-variant">Alamat belum diisi.</p>
        <Link href="/zonasi" className="mt-4 inline-block cursor-pointer font-label-lg text-label-lg text-primary hover:underline">
          ← Coba isi alamat
        </Link>
      </section>
    )
  }

  const userLocation = await geocodeAddress(alamat)

  if (!userLocation) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-body-md text-body-md text-on-surface-variant">
          Alamat tidak ditemukan. Coba tulis lebih spesifik, misal tambahkan nama kecamatan.
        </p>
        <Link href="/zonasi" className="mt-4 inline-block cursor-pointer font-label-lg text-label-lg text-primary hover:underline">
          ← Coba lagi
        </Link>
      </section>
    )
  }

  const { data: schools, error } = await supabase.from('schools').select('*').returns<School[]>()

  if (error) {
    return <p className="p-6 text-error">Error: {error.message}</p>
  }

  const ranked = schools
    ?.map((school) => ({
      ...school,
      distance: calculateDistance(userLocation.latitude, userLocation.longitude, school.latitude, school.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/zonasi"
        className="inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Ubah alamat
      </Link>

      <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-md md:text-headline-md">
        Hasil Simulasi Zonasi
      </h1>
      <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Alamat: {alamat}</p>

      <ul className="mt-6 space-y-4">
        {ranked?.map((school) => {
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
    </section>
  )
}