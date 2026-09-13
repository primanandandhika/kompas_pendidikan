import supabase from "@/lib/supabase"

export default async function HasilPage({ searchParams }: { searchParams: Promise<{ traits?: string | string[]}> }  ) {
  const params = await searchParams
  const selected = params.traits ? Array.isArray(params.traits) ? params.traits : [params.traits] : []
  const { data: majors, error } = await supabase
    .from("majors")
    .select("*")

    if(error) {
        return <div>Error : {error.message}</div>
    }

    const ranked = majors?.map(item => {
        const matchCount = selected.filter(trait => item.traits.toLowerCase().includes(trait.toLocaleLowerCase())).length
        return { ...item, matchCount }
    })
    .filter((major) => major.matchCount > 0)
    .sort((a, b) => (b.matchCount - a.matchCount))

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Rekomendasi Jurusan Buat Kamu</h1>
      {ranked?.map((major) => (
        <div key={major.id} className="border p-4 mb-4 rounded">
          <h2 className="font-semibold">{major.name}</h2>
          <p>{major.description}</p>
        </div>
      ))}
    </div>
  )
}   