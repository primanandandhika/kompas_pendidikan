import supabase from '@/lib/supabase'
import Link from 'next/link'

export default async function BeasiswaDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: scholarship, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !scholarship) {
    return <div className="p-8">Beasiswa tidak ditemukan</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">{scholarship.name}</h1>
      <p className="mb-4">{scholarship.description}</p>

      <h2 className="font-semibold">Syarat:</h2>
      <p className="mb-4">{scholarship.requirements}</p>

      <Link
        href={scholarship.registration_link}
        target="_blank"
        className="inline-block bg-blue-500 text-white p-2 rounded"
      >
        Daftar Sekarang
      </Link>
    </div>
  )
}