export default function ZonasiPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Simulasi Zonasi PPDB
      </h1>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Masukin alamat kamu untuk melihat estimasi peluang diterima di sekolah-sekolah zonasi terdekat.
      </p>

      <form action="/zonasi/hasil" method="get" className="mt-8 space-y-4">
        <div>
          <label htmlFor="alamat" className="mb-1.5 block font-label-lg text-label-lg text-on-surface">
            Alamat Kamu
          </label>
          <input
            id="alamat"
            type="text"
            name="alamat"
            placeholder="Contoh: Alun-alun Purworejo"
            required
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-lg text-label-lg text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container hover:shadow-md"
        >
          Cek Peluang
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>
    </section>
  )
}