import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Selamat Datang di Situs Kompas Pendidikan</h1>
      <div className="flex flex-col gap-4 max-w-xs">
        <Link href="/beasiswa" className="inline-block bg-blue-500 text-white p-3 rounded text-center">
          Cek Beasiswa
        </Link>
        <Link href="/zonasi" className="inline-block bg-blue-500 text-white p-3 rounded text-center">
          Simulasi Zonasi
        </Link>
        <Link href="/jurusan" className="inline-block bg-blue-500 text-white p-3 rounded text-center">
          Cocok Jurusan Apa
        </Link>
        <Link href="/jurusan/peluang" className="inline-block bg-blue-500 text-white p-3 rounded text-center">
          Kalkulator Peluang Jurusan
        </Link>
      </div>
    </section>
  )
}
