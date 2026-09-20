export interface AddressSuggestion {
  display_name: string
  lat: number
  lon: number
}

export async function searchAddressSuggestions(query: string): Promise<AddressSuggestion[]> {
  if (!query || query.length < 3) return []

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=5&countrycodes=id`

  const res = await fetch(url, {
    headers: { 'User-Agent': 'KompasPendidikan/1.0' },
  })
  const data = await res.json()

  return data.map((item: { display_name: string; lat: string; lon: string }) => ({
    display_name: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
  }))
}