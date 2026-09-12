import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Selamat Datang di Situs Kompas Pendidikan</h1>
      <Link href="/beasiswa" className="inline-block bg-blue-500 text-white p-3 rounded">Lihat Beasiswa</Link>
    </section>
  )
}
