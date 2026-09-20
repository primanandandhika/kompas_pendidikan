'use client'

import { useState } from 'react'
import AddressPicker from '@/components/AddressPicker'

export default function ZonasiPage() {
  const [selected, setSelected] = useState<{ lat: number; lon: number; address: string } | null>(null)

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Simulasi Zonasi PPDB
      </h1>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Pilih jenjang, cari alamat atau klik langsung di peta.
      </p>

      <form action="/zonasi/hasil" method="get" className="mt-8 space-y-6">
        <div>
          <label htmlFor="jenjang" className="mb-1.5 block font-label-lg text-label-lg text-on-surface">
            Jenjang Sekolah
          </label>
          <select
            id="jenjang"
            name="jenjang"
            required
            className="w-full cursor-pointer rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none"
          >
            <option value="">-- Pilih Jenjang --</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="SMK">SMK</option>
          </select>
        </div>

        <AddressPicker onSelect={setSelected} />

        <button
          type="submit"
          disabled={!selected}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-lg text-label-lg text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cek Peluang
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>
    </section>
  )
}