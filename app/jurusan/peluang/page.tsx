import supabase from '@/lib/supabase'

export default async function PeluangJurusanPage() {
  const { data } = await supabase.from('university_programs').select('field_category')
  const categories = Array.from(new Set(data?.map((d) => d.field_category) ?? []))

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Kalkulator Peluang Jurusan
      </h1>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Pilih jurusan dan masukin perkiraan skor UTBK (SNBT) kamu.
      </p>

      <form action="/jurusan/peluang/hasil" method="get" className="mt-8 space-y-4">
        <div>
          <label htmlFor="jurusan" className="mb-1.5 block font-label-lg text-label-lg text-on-surface">
            Pilih Jurusan
          </label>
          <select
            id="jurusan"
            name="jurusan"
            required
            className="w-full cursor-pointer rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none"
          >
            <option value="">-- Pilih Jurusan --</option>
            <option value="__all__">Semua Jurusan</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="nilai" className="mb-1.5 block font-label-lg text-label-lg text-on-surface">
            Perkiraan Skor UTBK
          </label>
          <input
            id="nilai"
            type="number"
            name="nilai"
            placeholder="Contoh: 620"
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