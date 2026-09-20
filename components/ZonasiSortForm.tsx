'use client'

export default function ZonasiSortForm({
  lat,
  lon,
  alamat,
  jenjang,
  sort,
}: {
  lat: string
  lon: string
  alamat: string
  jenjang: string
  sort: string
}) {
  return (
    <form method="get" action="/zonasi/hasil" className="mt-6 flex flex-wrap items-center gap-3">
      <input type="hidden" name="lat" value={lat} />
      <input type="hidden" name="lon" value={lon} />
      <input type="hidden" name="alamat" value={alamat} />
      <input type="hidden" name="jenjang" value={jenjang} />

      <label htmlFor="sort" className="font-label-lg text-label-lg text-on-surface">
        Urutkan:
      </label>
      <select
        id="sort"
        name="sort"
        defaultValue={sort}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="cursor-pointer rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none"
      >
        <option value="jarak-asc">Jarak: Terdekat</option>
        <option value="jarak-desc">Jarak: Terjauh</option>
        <option value="kuota-desc">Kuota: Terbanyak</option>
        <option value="kuota-asc">Kuota: Tersedikit</option>
      </select>
    </form>
  )
}