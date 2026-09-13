import supabase from '@/lib/supabase'

interface UniversityProgram {
  id: number
  university_name: string
  program_name: string
  min_score: number
  field_category: string
}

function getPeluang(nilai: number, minScore: number): string {
  const selisih = nilai - minScore
  if (selisih >= 30) return 'Tinggi'
  if (selisih >= 0) return 'Sedang'
  if (selisih >= -30) return 'Rendah'
  return 'Sangat Rendah'
}

export default async function PeluangHasilPage({
  searchParams,
}: {
  searchParams: Promise<{ nilai?: string }>
}) {
  const params = await searchParams
  const nilai = Number(params.nilai)

  if (!params.nilai || isNaN(nilai)) {
    return <div className="p-8">Nilai gak valid, coba isi form dulu.</div>
  }

  const { data: programs, error } = await supabase
    .from('university_programs')
    .select('*')
    .eq('field_category', 'Informatika')
    .returns<UniversityProgram[]>()

  if (error) {
    return <div className="p-8">Error: {error.message}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Peluang Kamu di Jurusan Informatika</h1>
      <p className="mb-4">Nilai kamu: {nilai}</p>

      {programs?.map((prog) => (
        <div key={prog.id} className="border p-4 mb-4 rounded">
          <h2 className="font-semibold">{prog.university_name} — {prog.program_name}</h2>
          <p>Perkiraan nilai minimal: {prog.min_score}</p>
          <p className="font-semibold">Peluang: {getPeluang(nilai, prog.min_score)}</p>
        </div>
      ))}
    </div>
  )
}