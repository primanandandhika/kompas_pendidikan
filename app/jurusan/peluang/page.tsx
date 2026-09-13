export default function PeluangJurusanPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kalkulator Peluang Jurusan</h1>
      <form action="/jurusan/peluang/hasil" method="get">
        <label className="block mb-2">
        Masukin perkiraan skor UTBK (SNBT) kamu:
        <input
          type="number"
          name="nilai"
          placeholder="Contoh: 620"
          className="border p-2 w-full mt-1"
        />
</label>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Cek Peluang
        </button>
      </form>
    </div>
  )
}