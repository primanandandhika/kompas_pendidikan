'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'

// Fix bug bawaan react-leaflet: ikon marker default sering gak muncul kalau di-bundle
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface Position {
  lat: number
  lon: number
}

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function RecenterMap({ position }: { position: Position | null }) {
  const map = useMapEvents({})
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lon], 15)
    }
  }, [position, map])
  return null
}

export default function MapPicker({
  position,
  onMapClick,
}: {
  position: Position | null
  onMapClick: (lat: number, lon: number) => void
}) {
  const defaultCenter: [number, number] = [-7.7178, 109.9455] // Purworejo

  return (
    <MapContainer center={position ? [position.lat, position.lon] : defaultCenter} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && <Marker position={[position.lat, position.lon]} />}
      <ClickHandler onMapClick={onMapClick} />
      <RecenterMap position={position} />
    </MapContainer>
  )
}