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

function getPeluang(distance: number): string {
  if (distance <= 1) return 'Sangat Tinggi'
  if (distance <= 3) return 'Tinggi'
  if (distance <= 5) return 'Sedang'
  return 'Rendah'
}

export default async function ZonasiHasilPage({
  searchParams,
}: {
  searchParams: Promise<{ alamat?: string }>
}) {
  const params = await searchParams
  const alamat = params.alamat

  if (!alamat) {
    return <div className="p-8">Alamat gak ditemukan, coba isi form dulu.</div>
  }

  const userLocation = await geocodeAddress(alamat)

  if (!userLocation) {
    return <div className="p-8">Alamat gak ketemu, coba tulis lebih spesifik (misal tambahin nama kecamatan/kota).</div>
  }

  const { data: schools, error } = await supabase.from('schools').select('*')

  if (error) {
    return <div className="p-8">Error: {error.message}</div>
  }

  const ranked = schools
    ?.map((school : School) => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        school.latitude,
        school.longitude
      )
      return { ...school, distance }
    })
    .sort((a, b) => a.distance - b.distance)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hasil Simulasi Zonasi</h1>
      <p className="mb-4">Alamat kamu: {alamat}</p>

      {ranked?.map((school) => (
        <div key={school.id} className="border p-4 mb-4 rounded">
          <h2 className="font-semibold">{school.name}</h2>
          <p>Jarak: {school.distance.toFixed(2)} km</p>
          <p>Kuota zonasi: {school.zoning_quota}</p>
          <p className="font-semibold">Peluang Diterima: {getPeluang(school.distance)}</p>
        </div>
      ))}
    </div>
  )
}