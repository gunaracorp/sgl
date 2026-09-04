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
 * ⚠️ PENTING UNTUK SEO: ganti dengan domain asli website Anda!
 * Digunakan untuk: canonical URL, sitemap.xml, robots.txt, Open Graph, dan Google Search Console.
 * Format: https://www.domainanda.com (TANPA garis miring di akhir)
 */
export const SITE_URL = "https://samaragreenlaundry.com";

export const SITE = {
  name: "Samara Green Laundry",
  tagline: "Laundry Bersih, Segar & Ramah Lingkungan",
  /** Nomor kontak person — ditampilkan di website */
  phoneDisplay: "0821-3450-6007",
  /** Nomor internasional untuk link tel: */
  phoneIntl: "+628134506007",
  address: "Jl. Samara Indah No. 88, Indonesia",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.+Samara+Indah+No.+88+Indonesia",
  hours: [
    { day: "Senin – Sabtu", time: "07.00 – 21.00 WIB" },
    { day: "Minggu", time: "08.00 – 18.00 WIB" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Harga", href: "#harga" },
  { label: "Cara Pesan", href: "#cara-pesan" },
  { label: "Testimoni", href: "#testimoni" },
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
