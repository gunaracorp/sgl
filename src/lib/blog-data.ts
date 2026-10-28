/**
 * PUSAT DATA BLOG — halaman /blog/ dan /blog/[slug]/
 * ---------------------------------------------------
 * Blog sederhana berbasis data (static export friendly — tanpa CMS):
 * tambah artikel baru = tambah objek di BLOG_POSTS, jalankan build,
 * semua URL artikel ter-render otomatis ke HTML statis.
 *
 * Konten disusun sebagai "blok" terstruktur (bukan markdown) agar
 * rendering aman tanpa dependency tambahan & bebas XSS.
 * Tipografi konten mengikuti JWDS v1.0.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "tip"; title: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Tanggal terbit ISO (YYYY-MM-DD) — dipakai JSON-LD datePublished */
  date: string;
  /** Tanggal tampil format Indonesia */
  displayDate: string;
  readMinutes: number;
  category: string;
  /** Nama file di /public/images/blog/ tanpa ekstensi */
  image: string;
  imageAlt: string;
  keywords: string[];
  blocks: readonly BlogBlock[];
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "rahasia-pakaian-wangi-tahan-lama",
    title: "Rahasia Pakaian Wangi Tahan Lama ala Laundry Profesional",
    excerpt:
      "Kenapa cucian laundry bisa wangi sampai berhari-hari, sementara cuci sendiri di rumah cepat apek? Ini 6 rahasianya — mulai dari takaran deterjen sampai cara menyimpan.",
    date: "2025-06-18",
    displayDate: "18 Juni 2025",
    readMinutes: 5,
    category: "Tips & Trik",
    image: "pakaian-wangi-tahan-lama",
    imageAlt:
      "Ibu tersenyum mencium handuk bersih hasil laundry yang wangi tahan lama",
    keywords: [
      "pakaian wangi tahan lama",
      "cucian wangi",
      "tips laundry",
      "laundry semarang",
    ],
    blocks: [
      {
        type: "p",
        text: "Ada rasa senang tersendiri saat cucian kembali dari laundry: wangi segar yang bertahan berhari-hari, bukan sekadar harum deterjen yang hilang begitu dipakai. Kabar baiknya, rahasia ini bukan milik eksklusif laundry — Anda bisa menerapkannya di rumah.",
      },
      {
        type: "h2",
        text: "1. Jangan biarkan cucian menginap di keranjang",
      },
      {
        type: "p",
        text: "Bakteri mulai berkembang hanya dalam beberapa jam setelah keringat dan kelembapan mengendap di serat kain. Semakin lama cucian menginap, semakin dalam bau apek menempel — dan pewangi sekuat apa pun hanya menutupinya, bukan menghilangkannya. Cuci maksimal 1–2 hari setelah dipakai.",
      },
      {
        type: "h2",
        text: "2. Takaran deterjen: tepat, bukan banyak",
      },
      {
        type: "p",
        text: "Mitos umum: deterjen lebih banyak = lebih bersih. Faktanya, kelebihan deterjen justru tidak sempat dibilas sempurna, mengendap di serat, dan menjadi tempat bau menempel. Gunakan takaran sesuai petunjuk untuk volume air mesin Anda.",
      },
      {
        type: "tip",
        title: "Aturan praktis",
        text: "Untuk mesin 7 kg, cukup 1–1,5 takar deterjen cair. Jika cucian hanya setengah kapasitas, kurangi setengah takarannya.",
      },
      {
        type: "h2",
        text: "3. Bilas dua kali untuk cucian bau",
      },
      {
        type: "p",
        text: "Seragam olahraga, kaos kerja, dan handuk paling diuntungkan siklus extra rinse. Sisa kotoran dan deterjen yang terbawa ke tahap kering adalah penyebab utama cucian cepat apek.",
      },
      {
        type: "h2",
        text: "4. Keringkan sampai benar-benar kering",
      },
      {
        type: "ul",
        items: [
          "Jemur di tempat berangin, bukan hanya yang terkena matahari — angin yang mengeringkan serat dari dalam.",
          "Balik pakaian ke sisi dalam agar warna tidak cepat pudar.",
          "Jangan menumpuk cucian setengah kering; kelembapan terperangkap = bau apek.",
        ],
      },
      {
        type: "h2",
        text: "5. Lipat saat masih hangat, simpan dengan benar",
      },
      {
        type: "p",
        text: "Pakaian yang disetrika saat sedikit lembap akan membentuk lipatan tajam dan aroma segar yang menetap lebih lama. Simpan di lemari tidak terlalu padat — serat butuh ruang bernapas.",
      },
      {
        type: "quote",
        text: "Pewangi hanya pelengkap. Wangi yang tahan lama lahir dari cucian yang benar-benar bersih dan kering sempurna.",
      },
      {
        type: "h2",
        text: "6. Atau… serahkan saja ke kami",
      },
      {
        type: "p",
        text: "Di Samara Green Laundry, setiap cucian melewati pencucian terpisah antar pelanggan, deterjen nabati eco-friendly, pengeringan suhu terkontrol, dan lipatan presisi. Itulah kenapa cucian kembali wangi sampai berhari-hari. Coba sekali — dan rasakan bedanya.",
      },
    ],
  },
  {
    slug: "menghilangkan-noda-membandel",
    title: "7 Noda Membandel dan Cara Menghilangkannya di Rumah",
    excerpt:
      "Noda kecap, kopi, darah, sampai tinta pulpen memang menjengkelkan. Kuncinya satu: perlakuan yang benar sesuai jenis nodanya — dan cepat. Panduan lengkap untuk keluarga Indonesia.",
    date: "2025-06-10",
    displayDate: "10 Juni 2025",
    readMinutes: 6,
    category: "Tips & Trik",
    image: "menghilangkan-noda",
    imageAlt:
      "Noda pada kemeja putih sedang dirawat dengan tetes deterjen lembut sebelum dicuci",
    keywords: [
      "menghilangkan noda pakaian",
      "noda kecap",
      "cara cuci noda kopi",
      "tips mencuci",
    ],
    blocks: [
      {
        type: "p",
        text: "Aturan emas menghilangkan noda: makin cepat ditangani, makin besar peluang hilang total. Noda yang dibiarkan mengering akan 'mengunci' diri ke dalam serat. Sebelum Anda panik menggosok — jangan. Menggosok hanya menyebarkan noda dan merusak serat. Teruskan dengan cara berikut.",
      },
      {
        type: "h2",
        text: "1. Kecap & saus — air hangat + sabun cuci piring",
      },
      {
        type: "p",
        text: "Balik kain, alirkan air hangat dari sisi belakang noda agar kotoran terdorong keluar, bukan masuk. Lalu oleskan sedikit sabun cuci piring dan tepuk-tepuk dengan jari. Cuci seperti biasa.",
      },
      {
        type: "h2",
        text: "2. Kopi & teh — campuran cuka putih",
      },
      {
        type: "p",
        text: "Basahi noda dengan campuran satu bagian cuka putih dan dua bagian air, diamkan 15 menit, lalu cuci normal. Untuk noda tua, ulangi dua kali sebelum mencuci.",
      },
      {
        type: "h2",
        text: "3. Darah — air dingin SAJA",
      },
      {
        type: "tip",
        title: "Kesalahan paling umum",
        text: "Jangan pernah pakai air hangat untuk noda darah! Panas membuat protein darah menggumpal dan menempel permanen. Air dingin + sabun, tepuk perlahan.",
      },
      {
        type: "h2",
        text: "4. Minyak & lemak — bedak penyerap",
      },
      {
        type: "p",
        text: "Taburkan bedok talkum atau tepung maizena pada noda minyak segar untuk menyerap lemak selama 15–20 menit. Sikat sisa bedak, oleskan deterjen cair langsung, lalu cuci dengan air hangat.",
      },
      {
        type: "h2",
        text: "5. Tinta pulpen — alkohol 70%",
      },
      {
        type: "p",
        text: "Letakkan tisu di bawah kain, tepuk noda dengan kapas yang dibasahi alkohol. Ganti tisu sesuai tinta yang terangkat. Uji dulu di jahitan dalam — beberapa bahan sensitif alkohol.",
      },
      {
        type: "h2",
        text: "6. Keringat & kotak kuning di kerah",
      },
      {
        type: "ol",
        items: [
          "Campur baking soda dengan sedikit air hingga jadi pasta.",
          "Oleskan pada kerah dan ketiak, diamkan 30 menit.",
          "Gosok lembut dengan sikat gigi, lalu cuci normal.",
        ],
      },
      {
        type: "h2",
        text: "7. Noda jamur — sinar matahari adalah teman",
      },
      {
        type: "p",
        text: "Cuci dengan air hangat dan deterjen, lalu jemur langsung di bawah matahari penuh. Sinar UV adalah pembunuh jamur alami. Simpan pakaian benar-benar kering sebelum dimasukkan ke lemari.",
      },
      {
        type: "quote",
        text: "Sudah dicoba semua cara tapi nodanya masih berani bertahan? Serahkan ke tim kami — noda membandel itu spesialisasi kami.",
      },
      {
        type: "p",
        text: "Untuk noda yang menolak pergi, layanan cuci satuan dan dry cleaning kami memakai perlakuan khusus per jenis kain dan noda. Chat WhatsApp kami, kirim foto nodanya, dan kami sampaikan estimasi perawatannya — gratis, tanpa komitmen.",
      },
    ],
  },
  {
    slug: "deterjen-nabati-lebih-sehat",
    title: "Kenapa Deterjen Nabati Lebih Sehat untuk Keluarga Anda?",
    excerpt:
      "Kulit anak gatal setelah pakai baju baru dicuci? Mungkin bukan bajunya — tapi sisa deterjen kimia yang menempel. Ini bedanya deterjen nabati dan kenapa kami memilihnya sejak hari pertama.",
    date: "2025-06-02",
    displayDate: "2 Juni 2025",
    readMinutes: 4,
    category: "Gaya Hidup Hijau",
    image: "deterjen-nabati",
    imageAlt:
      "Botol deterjen nabati ramah lingkungan dikelilingi daun hijau segar",
    keywords: [
      "deterjen nabati",
      "deterjen eco friendly",
      "laundry ramah lingkungan",
      "laundry alergi",
    ],
    blocks: [
      {
        type: "p",
        text: "Pakaian bersentuhan dengan kulit kita 24 jam sehari. Apa pun yang tersisa di serat kain setelah pencucian — deterjen, pewangi sintetis, pelembut kimia — akan terus bersentuhan dengan kulit itu. Untuk keluarga dengan kulit sensitif, pilihan deterjen bukan soal aroma, tapi soal kesehatan.",
      },
      {
        type: "h2",
        text: "Apa itu deterjen nabati?",
      },
      {
        type: "p",
        text: "Deterjen nabati memakai bahan aktif dari tumbuhan — umumnya turunan minyak kelapa atau lerak — alih-alih bahan petrokimia. Daya bersihnya sama efektif untuk cucian harian, tetapi residunya jauh lebih lembut bagi kulit dan lebih mudah terurai di lingkungan.",
      },
      {
        type: "h2",
        text: "Tiga alasan kami memilihnya",
      },
      {
        type: "ol",
        items: [
          "Aman untuk kulit sensitif & bayi — bebas fosfat, bebas pewarna sintetis, risiko iritasi jauh lebih rendah.",
          "Ramah lingkungan — air limbah laundry kembali ke lingkungan; bahan nabati terurai alami dalam hitungan hari, bukan tahun.",
          "Wangi alami yang tidak 'menampar' — aroma segar yang halus, bukan semprotan parfum pekat yang justru memicu alergi.",
        ],
      },
      {
        type: "tip",
        title: "Ciri cucian residu deterjen berlebih",
        text: "Pakaian terasa licin janggal walau sudah kering, muncul bintik putih pada bahan gelap, atau kulit terasa gatal saat berkeringat. Itu tanda deterjen tidak terbilas sempurna.",
      },
      {
        type: "h2",
        text: "Komitmen hijau Samara Green Laundry",
      },
      {
        type: "p",
        text: "Nama kami memang mengandung kata 'Green' — dan itu bukan sekadar branding. Deterjen nabati 100% eco-friendly kami pakai di semua layanan, dari cuci kiloan hemat sampai dry cleaning premium, di ketiga outlet. Bersih untuk pakaian Anda, lembut untuk kulit keluarga, dan ramah untuk bumi Semarang.",
      },
      {
        type: "quote",
        text: "Cucian bersih dan wangi, bumi ikut tersenyum — itu standar kerja kami, bukan slogan.",
      },
    ],
  },
  {
    slug: "cara-melipat-pakaian-agar-tahan-lama",
    title: "5 Cara Melipat Pakaian agar Awet & Hemat Tempat",
    excerpt:
      "Lipatan yang benar membuat pakaian bebas kerutan leher, hem tetap lurus, dan lemari terasa dua kali lebih lega. Inilah teknik lipat yang kami pakai setiap hari di outlet.",
    date: "2025-05-24",
    displayDate: "24 Mei 2025",
    readMinutes: 4,
    category: "Tips & Trik",
    image: "cara-melipat-pakaian",
    imageAlt:
      "Pakaian kemeja dan kaos yang dilipat rapi berbaris di atas meja terang",
    keywords: [
      "cara melipat pakaian",
      "melipat baju rapi",
      "hemat ruang lemari",
      "tips merapikan lemari",
    ],
    blocks: [
      {
        type: "p",
        text: "Melipat terdengar sepele — tapi beda lipatan bisa berarti beda umur pakaian. Lipatan asal menumbuhkan kerutan membandel, merenggangkan leher kaos, dan memboroskan ruang lemari. Ini lima teknik yang kami pakai setiap hari mengerjakan ribuan kilo cucian.",
      },
      {
        type: "h2",
        text: "1. Kaos: lipat tiga bagian",
      },
      {
        type: "ol",
        items: [
          "Letakkan kaos menghadap ke bawah (sisi depan menempel meja).",
          "Rapikan bagian bahu dengan menarik jahitan sedikit ke luar.",
          "Lipat kedua sisi ke dalam, lalu gulung atau lipat dua dari bawah ke kerah.",
        ],
      },
      {
        type: "p",
        text: "Hasilnya: paket padat yang bisa disimpan berdiri (filing system) sehingga semua kaos terlihat sekaligus tanpa harus menumpuk.",
      },
      {
        type: "h2",
        text: "2. Kemeja: ikuti lipatan bawaan",
      },
      {
        type: "p",
        text: "Lipat punggung ke belakang, geser lengan ke bawah sejajar badan, lalu lipat dua di bawah dada. Kerah tetap berdiri — jangan pernah ditekuk. Simpan paling atas dalam tumpukan.",
      },
      {
        type: "h2",
        text: "3. Celana: garis tetap lurus",
      },
      {
        type: "p",
        text: "Jentikkan kedua ujung kaki celana hingga bertemu, luruskan jahitan samping, lalu lipat dua atau tiga sesuai panjang. Untuk celana bahan formal, ikuti garis press yang sudah ada.",
      },
      {
        type: "tip",
        title: "Trik profesional",
        text: "Selipkan selembar kertas tipis atau kain perca di lipatan celana bahan untuk mencegah kerutan tajam saat ditumpuk.",
      },
      {
        type: "h2",
        text: "4. Handuk & sprei: gulung, jangan tumpuk",
      },
      {
        type: "p",
        text: "Bahan tebal seperti handuk dan bed cover paling efisien digulung. Hemat ruang, mudah diambil satu-satu, dan tidak menumbuhkan lipatan membandel.",
      },
      {
        type: "h2",
        text: "5. Aturan paling penting: lipat saat bersih & kering",
      },
      {
        type: "p",
        text: "Pakaian lembap yang dilipat akan mengembangkan bau apek dalam 1–2 hari. Pastikan benar-benar kering — terutama bagian tebal seperti pinggiran elastis — sebelum disimpan.",
      },
      {
        type: "quote",
        text: "Ingin cucian datang dalam lipatan presisi tanpa repot? Paket Cuci Kering Lipat kami mulai Rp 4.500/kg — rapi langsung ke lemari.",
      },
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** URL gambar thumbnail artikel. */
export function blogImgPath(post: BlogPost): string {
  return `/images/blog/${post.image}.jpg`;
}

/** BlogPosting JSON-LD untuk satu artikel — sesuai pedoman Google. */
export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://sgl.web.id/images/blog/${post.image}.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Samara Green Laundry",
      url: "https://sgl.web.id/",
    },
    publisher: {
      "@type": "Organization",
      name: "Samara Green Laundry",
      logo: {
        "@type": "ImageObject",
        url: "https://sgl.web.id/images/icon-512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sgl.web.id/blog/${post.slug}/`,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "id-ID",
  };
}
