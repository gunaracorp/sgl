/**
 * PUSAT KONFIGURASI WEBSITE SAMARA GREEN LAUNDRY
 * ------------------------------------------------
 * Ganti semua data bisnis di file ini — seluruh halaman
 * (navbar, hero, harga, kontak, footer, tombol WhatsApp)
 * otomatis ikut berubah. Tidak perlu edit file lain!
 */

/** Nomor WhatsApp format internasional TANPA tanda + (untuk link wa.me) */
export const WHATSAPP_NUMBER = "628134506007";

/**
 * ✅ DOMAIN AKTIF: sgl.web.id — domain resmi yang sudah dibeli & digunakan.
 * Digunakan untuk: canonical URL, sitemap.xml, robots.txt, Open Graph, dan Google Search Console.
 * Format: https://domainanda.com (TANPA garis miring di akhir).
 * Hanya ubah jika suatu saat pindah domain!
 */
export const SITE_URL = "https://sgl.web.id";

export const SITE = {
  name: "Samara Green Laundry",
  tagline: "Laundry Bersih, Segar & Ramah Lingkungan",
  /** Nomor kontak person — ditampilkan di website */
  phoneDisplay: "0821-3450-6007",
  /** Nomor internasional untuk link tel: */
  phoneIntl: "+628134506007",
  /** Alamat outlet utama (Malangsari) — ditampilkan di kontak & footer */
  address:
    "Jl. Malangsari No. 22, Tlogosari Kulon, Pedurungan, Kota Semarang, Jawa Tengah 50196",
  city: "Kota Semarang",
  region: "Jawa Tengah",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.+Malangsari+No.+22,+Tlogosari+Kulon,+Pedurungan,+Kota+Semarang,+Jawa+Tengah+50196",
  hours: [
    { day: "Outlet Malangsari — Tlogosari Kulon", time: "Setiap hari · 07.00 – 22.00" },
    { day: "Outlet Sendangguwo — Gemah", time: "Setiap hari · 08.00 – 20.00" },
    { day: "Outlet Dempel — Muktiharjo Kidul", time: "Setiap hari · 07.00 – 21.00" },
  ],
} as const;

/**
 * Data outlet fisik Samara Green Laundry — sumber tunggal untuk:
 * section "Lokasi Outlet" di homepage, halaman khusus /outlet/[slug]/,
 * sitemap.xml, dan JSON-LD LocalBusiness per outlet.
 */
/** Hari operasional semua outlet — buka setiap hari. */
export const OPEN_DAYS = "Setiap Hari (Senin – Minggu)";

/**
 * Keanggotaan asosiasi — badge kepercayaan yang tampil di hero,
 * section "Kenapa Samara?", footer, dan structured data (JSON-LD memberOf).
 */
export const ALDIN = {
  short: "ALDIN",
  name: "Asosiasi Laundry Digital Indonesia",
  label: "Anggota Resmi",
  desc: "Terdaftar sebagai anggota resmi Asosiasi Laundry Digital Indonesia — berkomitmen mengikuti standar operasional laundry digital yang profesional, aman, dan terpercaya.",
} as const;

export const OUTLETS = [
  {
    slug: "malangsari",
    name: "Samara Green Laundry Malangsari",
    shortName: "Malangsari",
    area: "Tlogosari Kulon",
    district: "Pedurungan",
    streetAddress: "Jl. Malangsari No. 22",
    postalCode: "50196",
    /** Nomor outlet — format tampilan & internasional (tel:/wa.me) */
    phoneDisplay: "0851-1754-1083",
    phoneIntl: "+6285117541083",
    /** Jam operasional outlet (WIB) — buka setiap hari */
    openHour: 7,
    closeHour: 22,
    hoursDisplay: "07.00 – 22.00",
    landmark: null,
    addressLines: [
      "Jl. Malangsari No. 22",
      "Kel. Tlogosari Kulon, Kec. Pedurungan",
      "Kota Semarang, Jawa Tengah 50196",
    ],
    description:
      "Samara Green Laundry Malangsari melayani laundry kiloan, laundry satuan, cuci setrika, dan laundry antar jemput di Tlogosari Kulon, Pedurungan, dan area sekitar Kota Semarang.",
    keywords: [
      "laundry tlogosari kulon",
      "laundry pedurungan semarang",
      "laundry kiloan semarang",
      "laundry antar jemput semarang",
    ],
    mapsQuery:
      "Jl. Malangsari No. 22, Tlogosari Kulon, Pedurungan, Kota Semarang, Jawa Tengah 50196",
  },
  {
    slug: "sendangguwo",
    name: "Samara Green Laundry Sendangguwo",
    shortName: "Sendangguwo",
    area: "Gemah",
    district: "Pedurungan",
    streetAddress: "Jl. Sendangguwo Selatan No. 24",
    postalCode: "50246",
    phoneDisplay: "0851-3747-3412",
    phoneIntl: "+6285137473412",
    openHour: 8,
    closeHour: 20,
    hoursDisplay: "08.00 – 20.00",
    landmark: null,
    addressLines: [
      "Jl. Sendangguwo Selatan No. 24",
      "Kel. Gemah, Kec. Pedurungan",
      "Kota Semarang, Jawa Tengah 50246",
    ],
    description:
      "Samara Green Laundry Sendangguwo melayani laundry kiloan, laundry satuan, cuci setrika, dan laundry antar jemput di Gemah, Sendangguwo, Pedurungan, dan area sekitar Kota Semarang.",
    keywords: [
      "laundry gemah semarang",
      "laundry sendangguwo",
      "laundry pedurungan semarang",
      "laundry antar jemput semarang",
    ],
    mapsQuery:
      "Jl. Sendangguwo Selatan No. 24, Gemah, Pedurungan, Kota Semarang, Jawa Tengah 50246",
  },
  {
    slug: "dempel",
    name: "Samara Green Laundry Dempel",
    shortName: "Dempel",
    area: "Muktiharjo Kidul",
    district: "Pedurungan",
    streetAddress: "Jl. Dempel Mukti Raya",
    postalCode: "50173",
    phoneDisplay: "0851-3747-3409",
    phoneIntl: "+6285137473409",
    openHour: 7,
    closeHour: 21,
    hoursDisplay: "07.00 – 21.00",
    landmark: "Depan SMP Walisongo",
    addressLines: [
      "Jl. Dempel Mukti Raya — Depan SMP Walisongo",
      "Kel. Muktiharjo Kidul, Kec. Pedurungan",
      "Kota Semarang, Jawa Tengah 50173",
    ],
    description:
      "Samara Green Laundry Dempel melayani laundry kiloan, laundry satuan, cuci setrika, dan laundry antar jemput di Dempel, Muktiharjo Kidul, Pedurungan, dan area sekitar Kota Semarang.",
    keywords: [
      "laundry dempel semarang",
      "laundry muktiharjo kidul",
      "laundry pedurungan semarang",
      "laundry antar jemput semarang",
    ],
    mapsQuery:
      "Jl. Dempel Mukti Raya, Muktiharjo Kidul, Pedurungan, Kota Semarang, Jawa Tengah 50173",
  },
] as const;

export type Outlet = (typeof OUTLETS)[number];

/** Format angka → "Rp 4.500" (pemisah ribuan titik, deterministik build-time). */
export function formatRp(value: number): string {
  return `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/**
 * PRICE LIST KHUSUS OUTLET — sumber tunggal harga resmi per outlet.
 * Sumber: papan harga asli di outlet (foto pricelist-sgl-malangsari.jpeg).
 * Tampil di halaman /outlet/[slug]/#harga + teaser di kartu outlet beranda.
 * Hanya outlet yang terdaftar di sini yang punya section price list sendiri.
 */
export type OutletPricelist = {
  /** Harga kiloan reguler (per kg) */
  reguler: readonly { name: string; price: number }[];
  regulerNote: string;
  /** Harga kiloan express (per kg) */
  express: readonly { name: string; price: number }[];
  expressNote: string;
  /** Harga satuan — kecil & besar (null = hubungi outlet) */
  satuan: readonly { name: string; kecil: number | null; besar: number | null }[];
  /** Harga self service / mandiri (per kg) */
  selfService: readonly { name: string; price: number }[];
  selfServiceNote: string;
  /** Catatan layanan antar-jemput outlet */
  deliveryNote: string;
};

export const OUTLET_PRICELISTS: Partial<Record<Outlet["slug"], OutletPricelist>> = {
  malangsari: {
    reguler: [
      { name: "Cuci Setrika", price: 6000 },
      { name: "Cuci Kering", price: 4500 },
      { name: "Setrika", price: 4500 },
      { name: "Cuci Lipat Press", price: 4900 },
    ],
    regulerNote: "Semua layanan reguler minimal 3 kg · selesai 1 hari",
    express: [
      { name: "Cuci Setrika", price: 10000 },
      { name: "Cuci Kering", price: 7000 },
      { name: "Setrika", price: 7000 },
      { name: "Cuci Lipat Press", price: 9000 },
    ],
    expressNote: "Semua layanan express minimal 3 kg · selesai 5 jam",
    satuan: [
      { name: "Seprei", kecil: 10000, besar: 14000 },
      { name: "Selimut", kecil: 11000, besar: 16000 },
      { name: "Bed Cover", kecil: 20000, besar: 30000 },
      { name: "Tas", kecil: 25000, besar: 40000 },
      { name: "Sepatu", kecil: 25000, besar: 40000 },
      { name: "Seragam", kecil: 10000, besar: 15000 },
      { name: "Boneka", kecil: 25000, besar: 50000 },
      { name: "Jas", kecil: 20000, besar: 30000 },
      { name: "Gorden", kecil: 15000, besar: 25000 },
      { name: "Karpet", kecil: 11000, besar: 20000 },
      { name: "Helm", kecil: 20000, besar: 30000 },
      { name: "DLL", kecil: null, besar: null },
    ],
    selfService: [
      { name: "Cuci", price: 1000 },
      { name: "Cuci Kering", price: 2500 },
    ],
    selfServiceNote: "Semua layanan self service minimal 5 kg · mandiri di outlet",
    deliveryNote: "Antar-jemput GRATIS (maks 2 km) — konfirmasi jadwal kurir lewat WhatsApp.",
  },
} as const;

/** Ambil price list khusus sebuah outlet — null jika outlet tidak punya. */
export function getOutletPricelist(slug: string): OutletPricelist | null {
  return OUTLET_PRICELISTS[slug as Outlet["slug"]] ?? null;
}

/** Cari outlet berdasarkan slug (untuk halaman /outlet/[slug]/). */
export function getOutlet(slug: string): Outlet | undefined {
  return OUTLETS.find((o) => o.slug === slug);
}

/** URL Google Maps (buka aplikasi/website Maps) untuk satu outlet. */
export function outletMapsUrl(outlet: Outlet): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(outlet.mapsQuery)}`;
}

/** URL embed Google Maps (iframe) untuk satu outlet — tanpa API key. */
export function outletMapsEmbedUrl(outlet: Outlet): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(outlet.mapsQuery)}&hl=id&output=embed`;
}

/** Link WhatsApp dengan pesan spesifik outlet — langsung ke NOMOR OUTLET tsb. */
export function outletWaLink(outlet: Outlet): string {
  const waNumber = outlet.phoneIntl.replace("+", "");
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo ${outlet.name}! Saya mau pesan laundry area ${outlet.area}, ${outlet.district}, Semarang.`
  )}`;
}

/** Link tel: untuk telepon langsung ke outlet. */
export function outletTelLink(outlet: Outlet): string {
  return `tel:${outlet.phoneIntl}`;
}

/**
 * Zona waktu resmi operasional seluruh outlet — Semarang = WIB
 * (Waktu Indonesia Barat, UTC+7). Semua perhitungan status
 * "Buka Sekarang" memakai jam WIB, apa pun timezone perangkat
 * pengunjung (mis. tamu dari Bali/WITA atau luar negeri tetap akurat).
 */
export const TIME_ZONE = "Asia/Jakarta";

/** Ambil jam & menit WIB dari objek Date — bebas dari timezone device. */
function wibHoursMinutes(now: Date): { hours: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const pick = (type: Intl.DateTimeFormatPart["type"]) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");
  return { hours: pick("hour") % 24, minutes: pick("minute") };
}

/** Apakah outlet sedang buka? (dihitung dengan jam WIB resmi — buka setiap hari) */
export function isOpenNow(outlet: Outlet, now: Date = new Date()): boolean {
  const { hours, minutes } = wibHoursMinutes(now);
  const t = hours + minutes / 60;
  return t >= outlet.openHour && t < outlet.closeHour;
}

/** Label jam buka format HH:00 untuk JSON-LD. */
export function outletHoursSpec(outlet: Outlet) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: `${pad(outlet.openHour)}:00`,
      closes: `${pad(outlet.closeHour)}:00`,
    },
  ];
}

/**
 * Navigasi utama — kini berupa HALAMAN MANDIRI (bukan lagi anchor satu halaman).
 * "/#lokasi" = kembali ke beranda lalu scroll ke daftar outlet.
 */
export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Harga", href: "/harga" },
  { label: "Outlet", href: "/#lokasi" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontak", href: "/kontak" },
] as const;

export const SERVICE_TITLES = [
  "Cuci Kering Setrika",
  "Cuci Kilat Express 6 Jam",
  "Dry Cleaning Premium",
  "Cuci Sepatu & Tas",
  "Bed Cover & Selimut",
  "Cuci Boneka & Stroller",
] as const;

/** Rentang harga untuk JSON-LD priceRange (layanan termurah – termahal). */
export const PRICE_RANGE = "Rp1.000 - Rp35.000";

/**
 * Paket hemat kiloan TANPA setrika — tampil di section "Harga"
 * dan ikut masuk ke OfferCatalog JSON-LD (rich snippet Google).
 */
export const BUDGET_PLANS = [
  {
    name: "Cuci Bersih",
    price: "Rp 1.000",
    unit: "/kg",
    value: "1000",
    desc: "Cuci bersih higienis + kering angin — paling hemat untuk cucian harian.",
  },
  {
    name: "Cuci Kering",
    price: "Rp 2.500",
    unit: "/kg",
    value: "2500",
    desc: "Cuci + pengeringan mesin — langsung siap pakai tanpa setrika.",
  },
  {
    name: "Cuci Kering Lipat",
    price: "Rp 4.500",
    unit: "/kg",
    value: "4500",
    desc: "Cuci + kering + dilipat rapi — tampung rapi tanpa perlu setrika.",
  },
] as const;

/**
 * Testimoni pelanggan — tampil sebagai 3 baris berjalan (marquee)
 * di section "Testimoni". Tambah/hapus/edit di sini, website otomatis ikut.
 * rating: 4–5 (bintang) · time: keterangan waktu relatif · service: chip layanan
 */
export const TESTIMONIALS = [
  // — Baris 1 —
  {
    name: "Ibu Ratna Dewi",
    initials: "RD",
    area: "Tlogosari Kulon, Semarang",
    rating: 5,
    time: "3 hari lalu",
    service: "Cuci Kering Setrika",
    tone: "bg-emerald-100 text-emerald-700",
    quote:
      "Langganan tiap minggu di outlet Tlogosari Kulon. Cucian dijemput pagi, besoknya sudah sampai rumah dalam keadaan lipat rapi dan wangi. Mulai 6.500-an dapat kualitas gini, worth it banget!",
  },
  {
    name: "Bagas Prasetyo",
    initials: "BP",
    area: "Gemah, Semarang",
    rating: 5,
    time: "1 minggu lalu",
    service: "Kilat Express",
    tone: "bg-lime-100 text-lime-700",
    quote:
      "Order kilat jam 8 pagi, jam 2 sore seragam sudah siap dipakai. Penyelamat banget buat anak kos yang segala sesuatunya dadakan.",
  },
  {
    name: "Ibu Sri Wahyuni",
    initials: "SW",
    area: "Muktiharjo Kidul, Semarang",
    rating: 5,
    time: "2 minggu lalu",
    service: "Bed Cover",
    tone: "bg-teal-100 text-teal-700",
    quote:
      "Bed cover king size yang tebal itu wangi dan lembut lagi. Alergi saya nggak kambuh setelah dipakai — tungaunya benar-benar mati.",
  },
  {
    name: "Andi Kurniawan",
    initials: "AK",
    area: "Pedurungan, Semarang",
    rating: 4,
    time: "1 bulan lalu",
    service: "Cuci Sepatu",
    tone: "bg-stone-200 text-stone-700",
    quote:
      "Sepatu putih balik bersih kayak baru keluar toko. Bintang 4 karena prosesnya 3 hari jadi agak nunggu, tapi hasilnya memuaskan kok.",
  },
  {
    name: "Nadia Putri",
    initials: "NP",
    area: "Sendangguwo, Semarang",
    rating: 5,
    time: "3 hari lalu",
    service: "Antar-Jemput",
    tone: "bg-emerald-100 text-emerald-700",
    quote:
      "Admin fast respon di WhatsApp, malam pun dibalas. Kurirnya juga ramah. Kulit saya sensitif tapi nggak gatal sama sekali — deterjennya memang beda.",
  },
  {
    name: "Rudi Hartono",
    initials: "RH",
    area: "Tlogosari Kulon, Semarang",
    rating: 5,
    time: "1 minggu lalu",
    service: "Paket Hemat",
    tone: "bg-lime-100 text-lime-700",
    quote:
      "Cuci kering cuma 2.500/kg, hasilnya bersih dan nggak bau apek. Buat seragam kerja harian paling cocok. Hemat banget!",
  },
  {
    name: "Ibu Endang S.",
    initials: "ES",
    area: "Dempel, Semarang",
    rating: 5,
    time: "2 bulan lalu",
    service: "Stroller",
    tone: "bg-teal-100 text-teal-700",
    quote:
      "Outletnya persis di depan SMP Walisongo jadi gampang sekali. Stroller si kecil dicuci sampai steril, paddingnya wangi. Tenang hati.",
  },
  // — Baris 2 —
  {
    name: "Fajar Nugroho",
    initials: "FN",
    area: "Tembalang, Semarang",
    rating: 5,
    time: "4 hari lalu",
    service: "Dry Cleaning",
    tone: "bg-emerald-100 text-emerald-700",
    quote:
      "Jas wisuda titip dry cleaning di sini. Baliknya premium banget — rapi, wanginya tahan lama. Recommended buat pakaian penting.",
  },
  {
    name: "Ibu Lestari",
    initials: "LS",
    area: "Gemah, Semarang",
    rating: 5,
    time: "1 bulan lalu",
    service: "Cuci Boneka",
    tone: "bg-stone-200 text-stone-700",
    quote:
      "Koleksi boneka anak saya ada 6, semuanya balik seperti baru dan wangi. Harganya masuk akal, hasilnya memuaskan. Pasti titip lagi.",
  },
  {
    name: "Yoga Saputra",
    initials: "YS",
    area: "Muktiharjo Kidul, Semarang",
    rating: 5,
    time: "2 minggu lalu",
    service: "Antar-Jemput",
    tone: "bg-lime-100 text-lime-700",
    quote:
      "Pulang kerja tiap malam, nggak mungkin nyuci sendiri. Tinggal chat, kurir jemput, dua hari kemudian sudah di depan pintu. Live saver!",
  },
  {
    name: "Ibu Kartika",
    initials: "KT",
    area: "Banyumanik, Semarang",
    rating: 4,
    time: "3 minggu lalu",
    service: "Cuci Kering Setrika",
    tone: "bg-teal-100 text-teal-700",
    quote:
      "Pertama coba karena rekomendasi tetangga. Sabtu kemarin agak penuh jadi pengerjaannya 3 hari. Tapi hasil lipatannya rapi banget, pasti balik lagi.",
  },
  {
    name: "Dwi Anggraeni",
    initials: "DA",
    area: "Pedurungan, Semarang",
    rating: 5,
    time: "5 hari lalu",
    service: "Sprei & Selimut",
    tone: "bg-emerald-100 text-emerald-700",
    quote:
      "Bayarnya bisa QRIS setelah cucian selesai, jadi tenang. Selimut hasilnya wangi banget sampai tercium dari pintu kamar.",
  },
  {
    name: "Rizky Maulana",
    initials: "RM",
    area: "Semarang Timur",
    rating: 5,
    time: "1 bulan lalu",
    service: "Cuci Sepatu",
    tone: "bg-lime-100 text-lime-700",
    quote:
      "Sneaker kulit favorit ditangani hati-hati, sampai solnya dibersihkan detail pakai sikat kecil. Sneakerheads wajib coba!",
  },
  {
    name: "Ibu Nur Aini",
    initials: "NA",
    area: "Tlogosari Kulon, Semarang",
    rating: 5,
    time: "1 minggu lalu",
    service: "Cuci Bersih",
    tone: "bg-teal-100 text-teal-700",
    quote:
      "Cuci bersih 1 ribu per kilo? Awalnya saya nggak percaya. Ternyata beneran ada, cucian sehari-hari jadi bersih dan wangi. Mantap!",
  },
  // — Baris 3 —
  {
    name: "Hendra Wijaya",
    initials: "HW",
    area: "Gemah, Semarang",
    rating: 5,
    time: "2 hari lalu",
    service: "Dry Cleaning",
    tone: "bg-stone-200 text-stone-700",
    quote:
      "Gaun pengantin adik saya dry cleaning di sini dan hasilnya sempurna. Bahan halus ditangani khusus, adminnya sabar menjelaskan prosesnya.",
  },
  {
    name: "Ibu Yuliana",
    initials: "YL",
    area: "Sendangguwo, Semarang",
    rating: 5,
    time: "3 minggu lalu",
    service: "Cuci Kering Setrika",
    tone: "bg-emerald-100 text-emerald-700",
    quote:
      "Sudah hampir 2 tahun langganan, belum pernah ada pakaian hilang atau tertukar. Amanah. Seragam sekolah anak-anak selalu dari sini.",
  },
  {
    name: "Anton Setiawan",
    initials: "AS",
    area: "Pedurungan, Semarang",
    rating: 5,
    time: "1 bulan lalu",
    service: "Sprei & Selimut",
    tone: "bg-lime-100 text-lime-700",
    quote:
      "Sprei 5 kamar kos rutin titip di sini. Selalu tepat waktu diantar, lipatannya seragam semua jadi enak dilihat. Langganan terus.",
  },
  {
    name: "Maya Kusuma",
    initials: "MK",
    area: "Muktiharjo Kidul, Semarang",
    rating: 5,
    time: "4 hari lalu",
    service: "Kilat Express",
    tone: "bg-teal-100 text-teal-700",
    quote:
      "Anak saya lomba besok pagi dan seragamnya belum dicuci. Kilat 6 jam menyelamatkan — putih bersih celah, wangi, tepat waktu!",
  },
  {
    name: "Ibu Fitri Handayani",
    initials: "FH",
    area: "Dempel, Semarang",
    rating: 5,
    time: "2 minggu lalu",
    service: "Cuci Tas",
    tone: "bg-stone-200 text-stone-700",
    quote:
      "Tas kulit suami kena jamur dan hampir dibuang. Ternyata masih bisa diselamatkan, jamurnya hilang total. Suka banget pelayanannya!",
  },
  {
    name: "Gilang Ramadhan",
    initials: "GR",
    area: "Tembalang, Semarang",
    rating: 5,
    time: "1 bulan lalu",
    service: "Paket Hemat",
    tone: "bg-emerald-100 text-emerald-700",
    quote:
      "Cuci kering lipat 4.500 paling cocok buat anak kos. Nggak perlu setrika sendiri, tinggal simpan di lemari. Hemat listrik pula.",
  },
  {
    name: "Ibu Retno Wulandari",
    initials: "RW",
    area: "Tlogosari Kulon, Semarang",
    rating: 5,
    time: "6 hari lalu",
    service: "Pakaian Bayi",
    tone: "bg-lime-100 text-lime-700",
    quote:
      "Cucian bayi saya dicuci terpisah dengan perlakuan khusus. Kurir dan adminnya ramah, sabar jawab pertanyaan ibu baru. Detail banget!",
  },
] as const;

/** Bungkus marquee: bagi testimoni jadi 3 baris @ 7 kartu. */
export const TESTIMONIAL_ROWS = [
  TESTIMONIALS.slice(0, 7),
  TESTIMONIALS.slice(7, 14),
  TESTIMONIALS.slice(14, 21),
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];

/**
 * Data FAQ terpusat — dipakai oleh section FAQ (tampilan) DAN
 * structured data FAQPage (JSON-LD) agar sesuai pedoman Google.
 */
export const FAQS = [
  {
    q: "Jam operasional Samara Green Laundry kapan saja?",
    a: "Kami buka SETIAP HARI, Senin–Minggu. Jam per outlet: Malangsari 07.00–22.00, Sendangguwo 08.00–20.00, dan Dempel 07.00–21.00 WIB. Untuk layanan Kilat Express, sebaiknya pesan maksimal 4 jam sebelum jam tutup outlet.",
  },
  {
    q: "Area mana saja yang tercakup layanan antar-jemput?",
    a: "Antar-jemput gratis untuk area sekitar outlet kami di Tlogosari Kulon (Malangsari), Sendangguwo/Gemah, dan Muktiharjo Kidul/Dempel — radius ±5 km. Di luar radius tersedia dengan biaya tambahan kecil — cukup konfirmasi lewat WhatsApp.",
  },
  {
    q: "Berapa lama proses pencucian sampai selesai?",
    a: "Layanan reguler selesai 2 hari kerja, layanan Kilat Express selesai hanya 6 jam. Untuk bed cover, sepatu, dan dry cleaning umumnya membutuhkan 2–3 hari kerja.",
  },
  {
    q: "Deterjen apa yang digunakan?",
    a: "Kami menggunakan deterjen nabati eco-friendly bebas fosfat dengan pewangi alami — aman untuk kulit sensitif dan bayi, sekaligus ramah lingkungan.",
  },
  {
    q: "Bagaimana cara pembayarannya?",
    a: "Kami menerima pembayaran Tunai, QRIS, dan Transfer Bank. Pembayaran dilakukan setelah cucian selesai — tanpa DP, tanpa biaya tersembunyi.",
  },
  {
    q: "Apakah ada layanan cuci darurat atau kilat?",
    a: "Ada! Layanan Kilat Express kami selesai dalam 6 jam dengan prioritas pengerjaan — cocok untuk kebutuhan mendesak seperti seragam kerja atau acara mendadak.",
  },
] as const;

/** Build a WhatsApp deep link with a properly URL-encoded prefilled message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_LINK: string = waLink(
  "Halo Samara Green Laundry! Saya mau pesan layanan laundry."
);

/** Link media sosial resmi Samara Green Laundry. */
export const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@samaragreenlaundry04",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
} as const;

/** Kredit desainer website — ditampilkan di footer. */
export const DESIGN_CREDIT = {
  company: "PT Digital Bisnis Manajemen",
  sites: [
    { label: "digiman.id", url: "https://digiman.id" },
    { label: "juraganwebsite.web.id", url: "https://juraganwebsite.web.id" },
  ],
} as const;
