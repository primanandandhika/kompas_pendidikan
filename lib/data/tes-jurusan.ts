export interface MinatCategory {
  value: string
  label: string
  icon: string
  description: string
  questions: string[]
}

export const MINAT_CATEGORIES: MinatCategory[] = [
  {
    value: 'logika',
    label: 'Analisis & pemecahan masalah',
    icon: 'psychology',
    description: 'Mencari pola, memahami sebab-akibat, dan menyusun langkah penyelesaian.',
    questions: [
      'Saya menikmati tantangan yang perlu dipecahkan langkah demi langkah.',
      'Saya penasaran mencari pola atau alasan di balik suatu kejadian.',
      'Saat menghadapi masalah, saya suka membandingkan beberapa cara untuk menyelesaikannya.',
    ],
  },
  {
    value: 'coding',
    label: 'Teknologi & komputasi',
    icon: 'code',
    description: 'Memahami cara kerja teknologi dan membuat solusi digital.',
    questions: [
      'Saya tertarik mencari tahu cara kerja aplikasi, komputer, atau teknologi lain.',
      'Saya menikmati mencoba fitur atau alat digital untuk melihat apa yang bisa dibuat.',
      'Saya tertarik membuat sesuatu yang bisa digunakan orang melalui teknologi.',
    ],
  },
  {
    value: 'menggambar',
    label: 'Visual & desain',
    icon: 'palette',
    description: 'Menyampaikan gagasan melalui bentuk, warna, tata letak, atau gambar.',
    questions: [
      'Saya menikmati menyampaikan gagasan melalui gambar, bentuk, atau tampilan visual.',
      'Saya memperhatikan perpaduan warna, kerapian, dan tata letak di sekitar saya.',
      'Saya suka membuat atau mengubah tampilan agar lebih jelas dan menarik.',
    ],
  },
  {
    value: 'kreatif',
    label: 'Kreasi & ide baru',
    icon: 'lightbulb',
    description: 'Mencoba pendekatan berbeda dan mengembangkan gagasan menjadi karya.',
    questions: [
      'Saya sering tertarik memikirkan cara baru untuk melakukan sesuatu.',
      'Saya menikmati mengembangkan ide menjadi karya, cerita, atau kegiatan nyata.',
      'Saya senang bereksperimen dan memperbaiki ide berdasarkan hasilnya.',
    ],
  },
]

export const MINAT_SCALE = [
  { value: 1, label: 'Tidak menggambarkan saya' },
  { value: 2, label: 'Kurang menggambarkan saya' },
  { value: 3, label: 'Kadang menggambarkan saya' },
  { value: 4, label: 'Cukup menggambarkan saya' },
  { value: 5, label: 'Sangat menggambarkan saya' },
] as const
