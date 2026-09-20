'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { searchAddressSuggestions, type AddressSuggestion } from '@/lib/geocode'
import { reverseGeocode } from '@/lib/reverseGeocode'

const MapPicker = dynamic(() => import('./MapPicker'), { ssr: false })

export default function AddressPicker({
  onSelect,
}: {
  onSelect: (data: { lat: number; lon: number; address: string }) => void
}) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (query.length < 3) {
      return
    }
    debounceRef.current = setTimeout(async () => {
      const results = await searchAddressSuggestions(query)
      setSuggestions(results)
      setShowSuggestions(true)
    }, 400)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const handleSelectSuggestion = (s: AddressSuggestion) => {
    setQuery(s.display_name)
    setPosition({ lat: s.lat, lon: s.lon })
    setShowSuggestions(false)
    onSelect({ lat: s.lat, lon: s.lon, address: s.display_name })
  }

  const handleMapClick = useCallback(
    async (lat: number, lon: number) => {
      setPosition({ lat, lon })
      const address = await reverseGeocode(lat, lon)
      const finalAddress = address || `${lat.toFixed(5)}, ${lon.toFixed(5)}`
      setQuery(finalAddress)
      setShowSuggestions(false)
      onSelect({ lat, lon, address: finalAddress })
    },
    [onSelect]
  )

  return (
    <div className="space-y-3">
      <div className="relative">
        <label htmlFor="alamat-search" className="mb-1.5 block font-label-lg text-label-lg text-on-surface">
          Cari Alamat
        </label>
        <input
          id="alamat-search"
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value
            setQuery(value)
            if (value.length < 3) {
              setSuggestions([])
              setShowSuggestions(false)
            }
          }}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Ketik nama jalan, kelurahan, atau kecamatan..."
          className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-lg">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleSelectSuggestion(s)}
                  className="w-full cursor-pointer px-4 py-2.5 text-left font-body-sm text-body-sm text-on-surface transition-colors hover:bg-surface-container"
                >
                  {s.display_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant">Atau klik langsung di peta:</p>

      <div className="h-72 w-full overflow-hidden rounded-2xl border border-outline-variant md:h-96">
        <MapPicker position={position} onMapClick={handleMapClick} />
      </div>

      <input type="hidden" name="lat" value={position?.lat ?? ''} readOnly />
      <input type="hidden" name="lon" value={position?.lon ?? ''} readOnly />
      <input type="hidden" name="alamat" value={query} readOnly />
    </div>
  )
}