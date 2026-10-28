/**
 * ═══════════════════════════════════════════════════════════════════
 *  JWDS v1.0 — JURAGAN WEBSITE DESIGN STANDARD
 * ═══════════════════════════════════════════════════════════════════
 *  Standar design resmi (percontohan) untuk seluruh jaringan website
 *  PT Digital Bisnis Manajemen — digiman.id & juraganwebsite.web.id.
 *
 *  Website referensi / percontohan: Samara Green Laundry (sgl.web.id)
 *
 *  File ini adalah SUMBER TUNGGAL (single source of truth) untuk:
 *  1. Mode Percontohan (designer mode) di Panel Kendali — anotasi
 *     section + palet warna + copy hex langsung dari halaman live.
 *  2. Konfigurasi Role Activation Panel Kendali (pemilik/desainer/staf).
 *  3. Dokumentasi lengkap: lihat DESIGN-SYSTEM.md di root repo.
 *  4. Styleguide visual mandiri: design-standard/index.html
 * ═══════════════════════════════════════════════════════════════════
 */

/* ───────────────────────────────────────────────
 * 1. PALET WARNA (brand emerald–lime–stone–cream)
 * ─────────────────────────────────────────────── */

export type JwdsColor = {
  /** Nama token, mis. "emerald-600" */
  token: string;
  /** Kode hex untuk copy cepat & styleguide */
  hex: string;
  /** Peran warna dalam sistem design */
  role: string;
};

/** Palet inti JWDS — pola "hijau alam" yang dipakai SGL. */
export const JWDS_COLORS: readonly JwdsColor[] = [
  { token: "emerald-950", hex: "#022c22", role: "Footer / section gelap premium" },
  { token: "emerald-900", hex: "#064e3b", role: "Kartu gelap, gradien CTA, hover gelap" },
  { token: "emerald-800", hex: "#065f46", role: "Gradien CTA (stop tengah)" },
  { token: "emerald-700", hex: "#047857", role: "Teks aksen pada latar terang" },
  { token: "emerald-600", hex: "#059669", role: "PRIMARY — tombol, badge, ikon" },
  { token: "emerald-100", hex: "#d1fae5", role: "Chip/pill latar terang" },
  { token: "emerald-50", hex: "#ecfdf5", role: "Latar section selang-seling" },
  { token: "lime-400", hex: "#a3e635", role: "AKSEN — highlight teks di latar gelap" },
  { token: "lime-300", hex: "#bef264", role: "Aksen hover di latar gelap" },
  { token: "lime-50", hex: "#f7fee7", role: "Pill teaser harga, highlight lembut" },
  { token: "stone-500", hex: "#78716c", role: "Teks sekunder / muted" },
  { token: "stone-200", hex: "#e7e5e4", role: "Border kartu, garis pemisah" },
  { token: "cream #FCFBF7", hex: "#FCFBF7", role: "Latar dasar halaman (warm cream)" },
] as const;

/* ───────────────────────────────────────────────
 * 2. TIPOGRAFI
 * ─────────────────────────────────────────────── */

export type JwdsTypeStep = {
  token: string;
  cls: string;
  usage: string;
};

export const JWDS_TYPE: readonly JwdsTypeStep[] = [
  { token: "display", cls: "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight", usage: "Judul hero" },
  { token: "h2", cls: "text-3xl sm:text-4xl font-extrabold tracking-tight", usage: "Judul section" },
  { token: "h3", cls: "text-xl font-bold", usage: "Judul kartu" },
  { token: "body", cls: "text-base leading-relaxed", usage: "Paragraf isi" },
  { token: "small", cls: "text-sm text-stone-500", usage: "Keterangan sekunder" },
  { token: "eyebrow", cls: "text-xs font-bold uppercase tracking-widest", usage: "Chip label di atas judul" },
] as const;

/** Font keluarga JWDS: Plus Jakarta Sans (fallback: system-ui). */
export const JWDS_FONT = "Plus Jakarta Sans";

/* ───────────────────────────────────────────────
 * 3. BENTUK, JARAK & BAYANGAN
 * ─────────────────────────────────────────────── */

export const JWDS_SHAPE = {
  /** Kartu besar selalu rounded-3xl, pill/tombol rounded-full */
  cardRadius: "rounded-3xl (24px)",
  pillRadius: "rounded-full",
  /** Kontainer maksimum + gutter responsif */
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  /** Ritme vertikal antar-section */
  sectionPadding: "py-20 lg:py-28",
  cardPadding: "p-6 (konten kartu) · gap-6 (grid)",
  shadow: "shadow-md (kartu) · shadow-lg (hover) · shadow-2xl (floating CTA)",
  touchTarget: "min 44px untuk semua elemen interaktif",
} as const;

/* ───────────────────────────────────────────────
 * 4. GERAK (MOTION)
 * ─────────────────────────────────────────────── */

export const JWDS_MOTION = {
  reveal: "fade + slide-up 24px, durasi 0.6s easeOut, sekali saat masuk viewport (margin -60px)",
  stagger: "delay 0.08–0.15s antar kartu dalam satu grid",
  hover: "scale-105 / -translate-y-1 + shadow-lg, transition 300ms",
  respect: "wajib hormati prefers-reduced-motion",
} as const;

/* ───────────────────────────────────────────────
 * 5. PETA POLA SECTION (untuk Mode Percontohan)
 * ───────────────────────────────────────────────
 *  Setiap section halaman dipetakan ke pola JWDS.
 *  Mode Percontohan membaca atribut id section lalu
 *  menampilkan anotasi pola ini langsung di halaman.
 */

export type JwdsPattern = {
  id: string;
  pattern: string;
  tokens: string;
};

export const JWDS_SECTION_PATTERNS: readonly JwdsPattern[] = [
  { id: "beranda", pattern: "Hero Split + Trust Badge", tokens: "emerald-950→900 gradien · lime-400 highlight · display type" },
  { id: "keunggulan", pattern: "Feature Grid 2×3", tokens: "bg-white · rounded-3xl · ikon emerald-600 · Reveal stagger" },
  { id: "layanan", pattern: "Service Cards + Deep-link WA", tokens: "kartu putih shadow-md · hover -translate-y-1 · CTA wa.me per layanan" },
  { id: "cara-pesan", pattern: "Step Timeline 1-2-3", tokens: "badge angka emerald-600 rounded-full · garis dashed" },
  { id: "harga", pattern: "Price Cards + Dashed Rows", tokens: "tabular-nums · border-dashed pemisah · badge pill harga" },
  { id: "testimoni", pattern: "Social Proof Cards + Stars", tokens: "bintang lime-400 · avatar inisial rounded-full" },
  { id: "lokasi", pattern: "Outlet Cards + Live Badge", tokens: "badge Buka/Tutup WIB real-time · maps embed · tel + wa link" },
  { id: "faq", pattern: "Accordion Native", tokens: "details/summary aksesibel · chevron rotate" },
  { id: "kontak", pattern: "Form + Info Split", tokens: "input rounded-xl ring-emerald · label semantik" },
  { id: "footer", pattern: "Footer 4 Kolom + Kredit", tokens: "bg-emerald-950 · mt-auto sticky · kredit PT DBM" },
] as const;

/* ───────────────────────────────────────────────
 * 6. ROLE ACTIVATION — PANEL KENDALI
 * ───────────────────────────────────────────────
 *  Sistem aktivasi berbasis kode rahasia. Kode HANYA
 *  diketahui tim internal (jangan disebar ke publik).
 */

export type JwdsRole = "pemilik" | "desainer" | "staf";

export type JwdsRoleConfig = {
  role: JwdsRole;
  /** Kode aktivasi — diketik di Panel Kendali */
  code: string;
  label: string;
  emoji: string;
  tagline: string;
  /** Daftar kemampuan yang terbuka untuk role ini */
  powers: string[];
  /** Masa aktif sesi (hari) */
  sessionDays: number;
};

export const JWDS_ROLES: readonly JwdsRoleConfig[] = [
  {
    role: "pemilik",
    code: "RAJA-95",
    label: "Pemilik",
    emoji: "👑",
    tagline: "Kendali penuh jaringan",
    powers: [
      "Semua kemampuan Staf & Desainer",
      "Manajer banner promo (tulis + tampil/sembunyi)",
      "Ekspor leads WhatsApp ke CSV",
      "Log audit aktivasi role",
      "Salin data bisnis JSON",
    ],
    sessionDays: 7,
  },
  {
    role: "desainer",
    code: "JWDS-95",
    label: "Desainer",
    emoji: "🎨",
    tagline: "Mode Percontohan JWDS",
    powers: [
      "Mode Percontohan: anotasi pola JWDS di atas halaman live",
      "Palet warna resmi + salin hex 1 klik",
      "Peta pola section (hero, grid, price, dst.)",
      "Statistik klik WhatsApp",
    ],
    sessionDays: 7,
  },
  {
    role: "staf",
    code: "STAF-95",
    label: "Staf",
    emoji: "🧺",
    tagline: "Monitor leads outlet",
    powers: [
      "Statistik klik WhatsApp per section",
      "Tampilkan/sembunyikan banner promo",
    ],
    sessionDays: 7,
  },
] as const;

export function resolveJwdsRole(code: string): JwdsRoleConfig | null {
  const normalized = code.trim().toUpperCase();
  return JWDS_ROLES.find((r) => r.code === normalized) ?? null;
}
