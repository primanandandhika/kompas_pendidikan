export interface JalurMasuk {
  id: string
  name: string
  basis: string
  syarat: string[]
  catatan: string
  sumberUrl: string
  sumberLabel: string
}

export const JALUR_MASUK: JalurMasuk[] = [
  {
    id: 'snbp',
    name: 'SNBP',
    basis: 'Nilai rapor seluruh mata pelajaran berbobot minimal 50%. Komponen lain berbobot paling banyak 50% dan dapat mencakup nilai mata pelajaran pendukung, prestasi, dan/atau portofolio. Komposisinya ditetapkan masing-masing PTN.',
    syarat: [
      'Siswa termasuk peserta eligible dan datanya diisikan sekolah ke PDSS',
      'Memiliki akun SNPMB Siswa dan nilai TKA Kemdikdasmen sesuai ketentuan 2026',
      'Periksa syarat program studi di PTN tujuan; prodi seni atau olahraga dapat meminta portofolio',
    ],
    catatan: 'Untuk seleksi 2026, lulusan SNBP tahun 2024, 2025, atau 2026 tidak dapat mendaftar SNBT. Lulusan SNBP 2026 juga tidak dapat mendaftar seleksi Mandiri di PTN pada tahun 2026.',
    sumberUrl: 'https://www.snpmb.id/snbp/informasi-umum',
    sumberLabel: 'Aturan resmi SNBP 2026',
  },
  {
    id: 'snbt',
    name: 'SNBT',
    basis: 'Skor UTBK, ditambah portofolio untuk prodi tertentu seperti seni atau olahraga.',
    syarat: [
      'Memiliki akun SNPMB Siswa dan memenuhi ketentuan peserta 2026',
      'Mendaftar dan mengikuti UTBK; hasil UTBK hanya berlaku untuk seleksi tahun 2026',
      'Mengunggah portofolio jika memilih program studi seni atau olahraga yang mensyaratkannya',
      'TKA bukan komponen seleksi UTBK-SNBT 2026',
    ],
    catatan: 'Kalkulator Peluang di aplikasi ini hanya memberi estimasi untuk SNBT dan tidak mewakili hasil seleksi resmi.',
    sumberUrl: 'https://www.snpmb.id/utbk-snbt/informasi-umum',
    sumberLabel: 'Aturan resmi UTBK-SNBT 2026',
  },
  {
    id: 'mandiri',
    name: 'Seleksi Mandiri',
    basis: 'Kriteria dan mekanisme seleksi ditetapkan oleh masing-masing PTN.',
    syarat: [
      'Periksa jadwal, persyaratan, mekanisme seleksi, dan biaya di laman admisi resmi PTN tujuan',
      'Cek apakah nilai UTBK, ujian mandiri, rapor, atau prestasi digunakan oleh PTN tersebut',
      'Pastikan ketentuan seleksi Mandiri tidak bertentangan dengan status kelulusan SNBP pada tahun yang sama',
    ],
    catatan: 'Informasi Mandiri tidak terpusat di satu laman. Cocokkan detail langsung dengan pengumuman PTN dan cek beasiswa yang tersedia.',
    sumberUrl: 'https://www.snpmb.id/faq',
    sumberLabel: 'FAQ resmi SNPMB tentang jalur Mandiri',
  },
]
