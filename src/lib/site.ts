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
    { day: "Senin – Sabtu", time: "07.00 – 21.00 WIB" },
    { day: "Minggu", time: "08.00 – 18.00 WIB" },
  ],
} as const;

/**
 * Data outlet fisik Samara Green Laundry — sumber tunggal untuk:
 * section "Lokasi Outlet" di homepage, halaman khusus /outlet/[slug]/,
 * sitemap.xml, dan JSON-LD LocalBusiness per outlet.
 */
export const OUTLETS = [
  {
    slug: "malangsari",
    name: "Samara Green Laundry Malangsari",
    shortName: "Malangsari",
    area: "Tlogosari Kulon",
    district: "Pedurungan",
    streetAddress: "Jl. Malangsari No. 22",
    postalCode: "50196",
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

/** Link WhatsApp dengan pesan spesifik outlet. */
export function outletWaLink(outlet: Outlet): string {
  return waLink(
    `Halo ${outlet.name}! Saya mau pesan laundry area ${outlet.area}, ${outlet.district}, Semarang.`
  );
}

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Harga", href: "#harga" },
  { label: "Cara Pesan", href: "#cara-pesan" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Lokasi", href: "#lokasi" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#kontak" },
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
 * Data FAQ terpusat — dipakai oleh section FAQ (tampilan) DAN
 * structured data FAQPage (JSON-LD) agar sesuai pedoman Google.
 */
export const FAQS = [
  {
    q: "Jam operasional Samara Green Laundry kapan saja?",
    a: "Kami buka Senin–Sabtu pukul 07.00–21.00 WIB dan Minggu pukul 08.00–18.00 WIB. Untuk layanan kilat, sebaiknya pesan maksimal 4 jam sebelum jam tutup.",
  },
  {
    q: "Area mana saja yang tercakup layanan antar-jemput?",
    a: "Antar-jemput gratis untuk area terdekat sekitar Jl. Samara Indah dan radius 5 km. Di luar radius tersedia dengan biaya tambahan kecil — cukup konfirmasi lewat WhatsApp.",
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
