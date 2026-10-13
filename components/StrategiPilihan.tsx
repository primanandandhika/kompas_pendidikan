interface Item {
  id: number
  university_name: string
  program_name: string
  min_score: number
  selisih: number
}

export default function StrategiPilihan({ items }: { items: Item[] }) {
  const ambisius = items
    .filter((i) => i.selisih < 0 && i.selisih >= -30)
    .sort((a, b) => b.selisih - a.selisih)
    .slice(0, 2)
  const realistis = items
    .filter((i) => i.selisih >= 0 && i.selisih < 30)
    .sort((a, b) => b.min_score - a.min_score)
    .slice(0, 2)
  const aman = items
    .filter((i) => i.selisih >= 30)
    .sort((a, b) => b.min_score - a.min_score)
    .slice(0, 2)

  const groups = [
    { title: 'Ambisius', desc: 'Skor kamu sedikit di bawah batas. Masih mungkin, tapi butuh usaha lebih.', list: ambisius, badge: 'bg-error-container text-on-error-container' },
    { title: 'Realistis', desc: 'Skor kamu sekitar batas. Peluangnya seimbang.', list: realistis, badge: 'bg-secondary-fixed text-on-secondary-fixed' },
    { title: 'Aman', desc: 'Skor kamu di atas batas dengan jarak cukup nyaman.', list: aman, badge: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  ]

  return (
    <section aria-labelledby="strategi-heading" className="mt-8">
      <h2 id="strategi-heading" className="font-headline-sm text-headline-sm text-on-surface">
        Strategi 3 Pilihan
      </h2>
      <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
        Kombinasikan pilihan yang ambisius dengan yang lebih aman. Ini estimasi dari data historis, bukan jaminan.
      </p>

      <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {groups.map((g) => (
          <li key={g.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4">
            <span className={`inline-block rounded-full px-2.5 py-1 font-label-sm text-label-sm font-bold uppercase ${g.badge}`}>
              {g.title}
            </span>
            <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{g.desc}</p>
            {g.list.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {g.list.map((i) => (
                  <li key={i.id} className="font-body-md text-body-md text-on-surface">
                    {i.university_name}
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">
                      {i.program_name} · min. {i.min_score}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 font-body-sm text-body-sm text-outline">Belum ada yang masuk kategori ini.</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}