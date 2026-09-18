const traits = [
  { value: 'logika', label: 'Suka logika & problem solving', icon: 'psychology' },
  { value: 'coding', label: 'Suka ngoding/komputer', icon: 'code' },
  { value: 'menggambar', label: 'Suka menggambar/visual', icon: 'palette' },
  { value: 'kreatif', label: 'Suka hal-hal kreatif', icon: 'lightbulb' },
]

export default function JurusanPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
        Cocok Jurusan Apa?
      </h1>
      <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
        Pilih yang paling menggambarkan kamu, boleh lebih dari satu.
      </p>

      <form action="/jurusan/hasil" method="get" className="mt-8">
        <fieldset className="space-y-3">
          <legend className="sr-only">Pilih minat kamu</legend>
          {traits.map((trait) => (
            <label
              key={trait.value}
              className="peer-checked:border-primary peer-checked:bg-surface-container-high group flex cursor-pointer items-center gap-3 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 transition-colors duration-200 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-surface-container-high"
            >
              <input type="checkbox" name="traits" value={trait.value} className="peer sr-only" />
              <span className="material-symbols-outlined text-[22px] text-primary">{trait.icon}</span>
              <span className="font-body-md text-body-md text-on-surface">{trait.label}</span>
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-label-lg text-label-lg text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container hover:shadow-md"
        >
          Lihat Hasil
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>
    </section>
  )
}