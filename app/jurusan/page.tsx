export default function JurusanPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cocok Jurusan Apa?</h1>
      <form action="/jurusan/hasil" method="get">
        <p className="mb-2">Pilih yang sesuai sama kamu (boleh lebih dari satu):</p>
        <label className="block mb-1 cursor-pointer">
          <input type="checkbox" name="traits" value="logika" /> Suka logika & problem solving
        </label>
        <label className="block mb-1 cursor-pointer">
          <input type="checkbox" name="traits" value="ngoding" /> Suka ngoding/komputer
        </label>
        <label className="block mb-1 cursor-pointer">
          <input type="checkbox" name="traits" value="menggambar" /> Suka menggambar/visual
        </label>
        <label className="block mb-1 cursor-pointer">
          <input type="checkbox" name="traits" value="kreatif" /> Suka hal-hal kreatif
        </label>
        <button type="submit" className="cursor-pointer mt-4 bg-blue-500 text-white p-2 rounded">
          Lihat Hasil
        </button>
      </form>
    </div>
  )
}