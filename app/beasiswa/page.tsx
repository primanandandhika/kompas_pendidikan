import supabase from "@/lib/supabase"
import Link from "next/link"

export default async function BeasiswaPage({ searchParams }: { searchParams: { jenjang?: string }}) {
    let query = supabase.from("scholarships").select("*")

    if (searchParams.jenjang) {
        query = query.eq("education_level", searchParams.jenjang)
    }

    const { data: scholarships, error } = await query

    if (error) {
        console.error(error)
        return <div>Error : {error.message}</div>
    }

    return (
        <section className="p-8">
            <Link href="/" className="text-blue-500 mb-4 inline-block">
                Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-4">Daftar Beasiswa</h1>

            <form className="mb-4 gap-3 flex" method="GET">
                <select name="jenjang" defaultValue={searchParams.jenjang || ''} className="px-4 py-2 border rounded cursor-pointer">
                    <option value="" className="px-4 py-2 bg-blue-500 text-white rounded">Semua</option>
                    <option value="SMA" className="px-4 py-2 bg-blue-500 text-white rounded">SMA</option>
                    <option value="Kuliah" className="px-4 py-2 bg-blue-500 text-white rounded">Kuliah</option>
                </select>
                <button type="submit" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded">Cari</button>
            </form>

            {scholarships.map(item => (
                <Link key={item.id} href={`/beasiswa/${item.id}`} className="block border p-4 mb-4 rounded hover:bg-gray-800">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p>Deskripsi: {item.description}</p>
                    <p>Jenjang: {item.requirements}</p>
                </Link>
            ))}
        </section>
    )
}