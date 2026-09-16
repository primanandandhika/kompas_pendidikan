import Link from 'next/link'
import supabase from '@/lib/supabase'

interface Scholarship {
  id: number
  name: string
  description: string
  requirements: string
  registration_link: string
  education_level: string
}

export default async function BeasiswaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: scholarship, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('id', id)
    .single<Scholarship>()

  if (error || !scholarship) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-body-md text-body-md text-on-surface-variant">Beasiswa tidak ditemukan.</p>
        <Link href="/beasiswa" className="mt-4 inline-block cursor-pointer font-label-lg text-label-lg text-primary hover:underline">
          ← Kembali ke daftar beasiswa
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/beasiswa"
        className="inline-flex cursor-pointer items-center gap-1 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Kembali
      </Link>

      <article className="mt-6 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:p-8">
        <span className="inline-block rounded-full bg-secondary-fixed px-3 py-1 font-label-sm text-label-sm font-bold uppercase text-on-secondary-fixed">
          {scholarship.education_level}
        </span>

        <h1 className="mt-4 font-headline-sm text-headline-sm text-on-surface md:font-headline-md md:text-headline-md">
          {scholarship.name}
        </h1>
        <p className="mt-3 font-body-md text-body-md text-on-surface-variant">{scholarship.description}</p>

        <div className="mt-6 border-t border-outline-variant pt-6">
          <h2 className="font-title-md text-title-md text-on-surface">Syarat Pendaftaran</h2>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{scholarship.requirements}</p>
        </div>

        <a
          href={scholarship.registration_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-secondary px-6 py-3 font-label-lg text-label-lg text-on-secondary shadow-sm transition-all duration-200 hover:bg-secondary/90 hover:shadow-md"
        >
          Daftar Sekarang
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </article>
    </section>
  )
}