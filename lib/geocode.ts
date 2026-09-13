export async function geocodeAddress(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'KompasPendidikan/1.0',
    },
  })

  const data = await res.json()

  if (data.length === 0) {
    return null
  }

  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  }
}