# 🌿 JWDS v1.0 — Juragan Website Design Standard

> **Standar design resmi jaringan website PT Digital Bisnis Manajemen**
> (digiman.id & juraganwebsite.web.id)
>
> **Website percontohan / referensi emas:** Samara Green Laundry — [sgl.web.id](https://sgl.web.id)
> **Status:** ✅ v1.0 terverifikasi di produksi · Lighthouse-ready · SEO-ready · cPanel-ready

---

## 📖 Daftar Isi

1. [Filosofi Standar](#1-filosofi-standar)
2. [Token Design](#2-token-design)
3. [Komponen Wajib Landing Page](#3-komponen-wajib-landing-page)
4. [Gerak & Animasi](#4-gerak--animasi)
5. [Standar SEO & Structured Data](#5-standar-seo--structured-data)
6. [Standar Infrastruktur & Deploy](#6-standar-infrastruktur--deploy)
7. [Panel Kendali & Role Activation](#7-panel-kendali--role-activation)
8. [Checklist Peluncuran (wajib 15 titik)](#8-checklist-peluncuran)
9. [Cara Mereplikasi ke 95 Website](#9-cara-mereplikasi-ke-95-website)

---

## 1. Filosofi Standar

Setiap website jaringan **wajib** memenuhi 4 prinsip:

| Prinsip | Arti | Bukti di SGL |
|---|---|---|
| **Percaya dalam 5 detik** | Pengunjung langsung paham bisnis, lokasi, cara hubungi | Hero + badge ALDIN + badge Buka/Tutup WIB real-time |
| **Satu ketukan = chat** | Setiap section berakhir di WhatsApp/telepon | 12+ titik CTA `wa.me` dengan deep-link per layanan |
| **Buktinya data, bukan klaim** | Harga, jam, alamat = data asli, terstruktur | JSON-LD `@graph` lengkap + price list resmi |
| **Cepat di mana pun** | Tampil mulus di HP murah & internet lambat | Static export, gambar teroptimasi, zero layout shift |

**Skala warna diarahkan ke rasa bisnis klien:**
SGL = hijau alam (emerald–lime). Bisnis lain ganti palet (mis. kopi = amber–stone),
**tapi struktur token & komponen tidak boleh berubah.**

---

## 2. Token Design

### 2.1 Palet Warna (SGL — pola "hijau alam")

| Token | Hex | Peran |
|---|---|---|
| `emerald-950` | `#022c22` | Footer & section gelap premium |
| `emerald-900` | `#064e3b` | Kartu gelap, gradien CTA, hover |
| `emerald-800` | `#065f46` | Stop tengah gradien CTA |
| `emerald-700` | `#047857` | Teks aksen di latar terang |
| `emerald-600` | `#059669` | **PRIMARY** — tombol, badge, ikon |
| `emerald-100` | `#d1fae5` | Chip & pill latar terang |
| `emerald-50` | `#ecfdf5` | Latar section selang-seling |
| `lime-400` | `#a3e635` | **AKSEN** — highlight di latar gelap |
| `lime-300` | `#bef264` | Aksen hover di latar gelap |
| `lime-50` | `#f7fee7` | Pill teaser, highlight lembut |
| `stone-500` | `#78716c` | Teks sekunder |
| `stone-200` | `#e7e5e4` | Border kartu |
| cream | `#FCFBF7` | Latar dasar halaman (warm cream) |

**Aturan:** 1 warna PRIMARY + 1 warna AKSEN + netral. Dilarang >2 warna jenuh
dalam satu layar. Gradien hanya `900→600` atau `950→800` (gelap ke sedang).

### 2.2 Tipografi

- **Font:** Plus Jakarta Sans (Google Fonts, `display=swap`)
- Skala: `display 4xl–6xl/800` · `h2 3xl–4xl/800` · `h3 xl/700` · `body base/400`
  `small sm stone-500` · `eyebrow xs/800 uppercase tracking-widest`
- Angka harga **wajib** `tabular-nums` agar rapi vertikal.

### 2.3 Bentuk, Jarak, Bayangan

| Token | Nilai | Catatan |
|---|---|---|
| Radius kartu | `rounded-3xl` (24px) | Kartu besar selalu |
| Radius pill/tombol | `rounded-full` | Semua tombol & badge |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | Wajib sama semua section |
| Ritme section | `py-20 lg:py-28` | Selang: cream → white → cream |
| Padding kartu | `p-6`, gap grid `gap-6` | Konsisten, jangan campur |
| Bayangan | `shadow-md` kartu · `shadow-lg` hover · `shadow-2xl` floating | |
| Sentuhan | Target interaktif **min. 44px** | Wajib untuk mobile |

---

## 3. Komponen Wajib Landing Page

Urutan section standar (11 blok — sesuai SGL):

| # | Section | Pola | Detail teknis |
|---|---|---|---|
| 1 | Announcement bar | Strip tipis atas | Info promo/jam, `text-xs font-bold` |
| 2 | Navbar | Sticky glass + menu mobile | `backdrop-blur`, logo kiri, CTA kanan |
| 3 | Hero | Split + trust badge | H1 1× saja, highlight kata kunci pakai aksen |
| 4 | Stats | Strip angka | 3–4 metrik, animasi count-up |
| 5 | Layanan | Grid kartu 2×3 | CTA `wa.me` **deep-link per layanan** |
| 6 | Keunggulan | Grid ikon | Ikon lucide dalam `rounded-2xl` emerald |
| 7 | Cara pesan | Timeline 1-2-3 | Badge angka `rounded-full`, garis dashed |
| 8 | Harga | Kartu + baris dashed | Pemisah harga `border-dashed`, `tabular-nums` |
| 9 | Testimoni | Kartu + bintang | Bintang aksen, avatar inisial |
| 10 | Lokasi/Outlet | Kartu + **badge live** | Buka/Tutup WIB real-time + maps embed |
| 11 | FAQ | `details/summary` native | Aksesibel, tanpa JS |
| 12 | CTA banner + Kontak + Footer | Penutup | Footer 4 kolom `emerald-950`, sticky `mt-auto` |

**Badge "Buka Sekarang" (wajib untuk bisnis offline):**
hitung jam dengan `Intl.DateTimeFormat(…, {timeZone: "Asia/Jakarta"})` —
**jangan** `new Date().getHours()` (ikut jam device pengunjung = salah).
Lihat `src/lib/site.ts → isOpenNow()` sebagai referensi resmi.

---

## 4. Gerak & Animasi

- **Reveal:** fade + slide-up 24px, `0.6s easeOut`, sekali (`once: true`, margin `-60px`).
- **Stagger:** antar kartu dalam grid `delay 0.08–0.15s`.
- **Hover:** `scale-105` / `-translate-y-1` + `shadow-lg`, `300ms`.
- **Wajib hormati `prefers-reduced-motion`** (komponen `Reveal` sudah menangani).
- Dilarang animasi > 1s atau parallax berat — HP klien mid-range.

---

## 5. Standar SEO & Structured Data

Wajib di setiap website (template: `src/components/landing/json-ld.tsx`):

1. **`@graph` JSON-LD berisi:**
   - `LocalBusiness` / sub-tipe spesifik (SGL: `DryCleaningOrLaundry`) + `department` per cabang
   - `openingHoursSpecification` **per cabang** (jam asli, bukan copy-paste)
   - `telephone` **per cabang** (format `+62…`)
   - `priceRange` dihitung dari data harga nyata
   - Keanggotaan asosiasi (SGL: `memberOf` ALDIN)
   - `FAQPage` bila ada FAQ · `WebSite` · `BreadcrumbList`
2. **Meta:** `title` ≤ 60 char · description 150–160 char · canonical · OG + Twitter card · geo meta untuk bisnis lokal
3. **`robots.txt` + `sitemap.xml`** otomatis dari data outlet (lihat `scripts/prepare-out.mjs`)
4. **Pola hub & spoke** untuk bisnis multi-cabang: domain utama = hub,
   tiap cabang = subdomain dengan konten **unik per area** (anti duplicate content) + cross-link.
   Referensi generator: `scripts/build-subdomains.mjs`.

---

## 6. Standar Infrastruktur & Deploy

| Item | Standar |
|---|---|
| Framework | Next.js 16 App Router, TypeScript strict, `output: "export"` |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) + lucide-react |
| Animasi | framer-motion (1 komponen `Reveal` reusable) |
| Konfigurasi | **1 file data tunggal** (`src/lib/site.ts`) — ganti data bisnis cukup di situ |
| Build | `npm run deploy` → `out/` + ZIP siap upload |
| Hosting | cPanel shared hosting: ZIP → `public_html/`, AutoSSL wajib aktif |
| Subdomain | folder mandiri per cabang: `index.html` + `robots.txt` + `.htaccess` (force HTTPS + gzip) |
| Gambar | WebP/teroptimasi, `images.unoptimized`, logo + hero ter-embed untuk halaman mandiri |

---

## 7. Panel Kendali & Role Activation

**"Super sakti" namun aman:** 100% client-side (localStorage), tidak menyentuh
file server → tidak menambah risiko keamanan hosting, aman untuk static export.

### Cara membuka (3 pintu rahasia)
1. Tambah `#panel` atau `#aktivas` di URL
2. Tekan **Shift + P** di halaman
3. **Ketuk 5× cepat** logo di footer

### Role & kode aktivasi (RAHASIA — jangan disebar ke publik/klien)

| Role | Kode | Kewenangan |
|---|---|---|
| 👑 **Pemilik** | `RAJA-95` | Semua kemampuan + manajer banner promo + ekspor CSV leads + log audit + salin JSON |
| 🎨 **Desainer** | `JWDS-95` | **Mode Percontohan**: anotasi pola JWDS di atas halaman live + palet klik-salin-hex + statistik leads |
| 🧺 **Staf** | `STAF-95` | Statistik leads WhatsApp per section + banner promo |

### Kemampuan detail
- **Pelacak leads** — setiap klik `wa.me` tercatat per section (Hero, Harga,
  Outlet, dst.), klik `tel:` tercatat terpisah. Data tersimpan di perangkat
  yang dipakai, bisa diekspor CSV (pemilik).
- **Banner promo** — teks promo tampil di atas halaman untuk SEMUA pengunjung,
  diaktifkan/diedit dari panel. Cara promosi tanpa perlu build ulang.
- **Mode Percontohan** — setiap section diberi garis + label `◆ JWDS · pola`
  (hover = token). Ini "kaca pembesar" design standard untuk melatih tim
  dan memeriksa apakah website baru sudah mengikuti standar.

> **Batas jujur:** role ini client-side (per perangkat). Untuk kendali lintas
> perangkat/database (multi-admin, leads tersimpan server), jalankan modul
> full-stack NextAuth + Prisma — jalur upgrade tersedia tanpa mengubah design.

---

## 8. Checklist Peluncuran

Sebelum website jaringan dinyatakan GO-LIVE, wajib lolos 15 titik:

- [ ] Data bisnis 100% dari 1 file konfigurasi (tanpa teks hardcode di komponen)
- [ ] Palet = 1 primary + 1 aksen + netral; kontras AA (4.5:1) teks vs latar
- [ ] Semua tombol & link target sentuh ≥ 44px
- [ ] Sticky footer benar (tidak melayang di halaman pendek, tidak menutupi konten)
- [ ] Hero punya 1 H1 + badge kepercayaan (asosiasi/izin/resmi)
- [ ] Setiap section berakhir atau mengandung CTA WhatsApp/telepon
- [ ] Badge Buka/Tutup memakai zona waktu `Asia/Jakarta`
- [ ] Harga ditampilkan (minimal "mulai Rp …") — transparan
- [ ] JSON-LD `@graph` lengkap & lolos `JSON.parse` + Rich Results Test
- [ ] Canonical, OG, sitemap, robots.txt benar
- [ ] Semua gambar punya alt deskriptif; ikon dekoratif `aria-hidden`
- [ ] Lulus lint + build produksi tanpa error
- [ ] Uji manual: desktop 1280 + mobile 390, tanpa overflow horizontal
- [ ] Modal/panel internal tidak terlihat oleh pengunjung biasa
- [ ] Kredit footer resmi: "PT Digital Bisnis Manajemen — digiman.id & juraganwebsite.web.id"

---

## 9. Cara Mereplikasi ke 95 Website

```
1. CLONE  → salin struktur proyek SGL (design system = sudah included)
2. GANTI  → src/lib/site.ts (data bisnis) + palet di globals.css (ganti rasa warna)
3. CEK    → jalankan Mode Percontohan (kode JWDS-95) — semua section wajib
            berlabel pola JWDS yang sesuai
4. UJI    → checklist 15 titik di atas
5. DEPLOY → npm run deploy → upload ZIP ke cPanel → subdomain cabang bila perlu
```

**Rujukan visual:** buka `design-standard/index.html` — styleguide mandiri
(bisa di-host di mana saja, mis. `standar.juraganwebsite.web.id`).

---

*JWDS v1.0 · Dirumuskan dari website percontohan Samara Green Laundry (sgl.web.id) ·
PT Digital Bisnis Manajemen — digiman.id & juraganwebsite.web.id*
