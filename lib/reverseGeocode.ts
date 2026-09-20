export async function reverseGeocode(lat: number, lon: number): Promise<string | undefined> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`

  const res = await fetch(url, {
    headers: { 'User-Agent': 'KompasPendidikan/1.0' },
  })
  const data = await res.json()

  return data.display_name
}