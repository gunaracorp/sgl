<div align="center">

# 🌿 Samara Green Laundry — Website

### *Laundry Bersih, Segar & Ramah Lingkungan*

Website company profile laundry **premium, modern, dan full animasi** — siap deploy ke **shared hosting mana pun** (cPanel/Apache) tanpa ribet!

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer&logoColor=white)
![Static HTML](https://img.shields.io/badge/Export-100%25_Statis-success?style=for-the-badge)

**📞 Kontak Person: [0821-3450-6007](https://wa.me/628134506007)** · 💬 Semua tombol order langsung terhubung ke WhatsApp · 🎵 TikTok: [@samaragreenlaundry04](https://www.tiktok.com/@samaragreenlaundry04)

</div>

---

## 📖 Daftar Isi

- [✨ Fitur Unggulan](#-fitur-unggulan)
- [🏗️ Teknologi](#️-teknologi)
- [📂 Struktur Proyek](#-struktur-proyek)
- [🚀 Menjalankan di Komputer Lokal](#-menjalankan-di-komputer-lokal)
- [🌐 DEPLOY KE SHARED HOSTING (cPanel)](#-deploy-ke-shared-hosting-cpanel) ⭐ **PALING PENTING**
  - [Cara 1 — Upload ZIP via File Manager (paling mudah)](#cara-1--upload-zip-via-file-manager-cpanel-paling-mudah)
  - [Cara 2 — Upload via FTP (FileZilla)](#cara-2--upload-via-ftp-filezilla)
  - [Deploy ke Sub-Folder](#deploy-ke-sub-folder-misal-domaincomlaundry)
- [🛠️ Panduan Kustomisasi](#️-panduan-kustomisasi)
- [🔍 SEO & Optimasi](#-seo--optimasi)
- [❓ Troubleshooting](#-troubleshooting)
- [🏆 Kredit](#-kredit)

---

## ✨ Fitur Unggulan

| Fitur | Keterangan |
|---|---|
| 🎬 **Full Animasi** | Scroll reveal, count-up statistik, floating badge, hover effects — dibangun dengan Framer Motion |
| 📱 **100% Responsif** | Tampil sempurna di HP, tablet, dan desktop (mobile-first) |
| 💬 **Integrasi WhatsApp** | 17+ titik tombol order → chat otomatis dengan pesan terisi ke nomor **0821-3450-6007** |
| 🧩 **14 Section Lengkap** | Hero, layanan, harga, cara pesan, testimoni, FAQ, kontak, dan lainnya |
| 🚀 **Super Ringan** | Hasil build berupa HTML/CSS/JS statis — loading kilat di hosting murah sekalipun |
| 🔍 **SEO Friendly** | Meta tag lengkap, struktur heading benar, semantic HTML, favicon kustom |
| ♿ **Aksesibilitas** | ARIA label, navigasi keyboard, kontras warna standar WCAG |
| 🎨 **Tema Eco-Green** | Palet hijau emerald + cream yang segar dan premium |

### 📄 Section Website

```
🏷️ Announcement Bar   →  Buka setiap hari + antar-jemput gratis
🧭 Navbar Sticky      →  Menu glass-blur + CTA WhatsApp
🦸 Hero               →  Headline animasi + badge Anggota Resmi ALDIN
📊 Statistik          →  12.000+ cucian, rating 4.9 (count-up)
🧺 Layanan            →  6 kartu layanan + harga
🌱 Keunggulan         →  Eco-friendly, garansi, antar-jemput + kartu membership ALDIN
📦 Cara Pesan         →  4 langkah mudah
💰 Harga              →  3 paket + strip Paket Hemat (mulai Rp 1.000/kg)
💬 Testimoni          →  21 ulasan pelanggan (3 baris marquee)
📍 Lokasi Outlet      →  3 outlet + peta Google + jam & nomor per outlet
❓ FAQ                →  6 pertanyaan umum (accordion)
📣 CTA Banner         →  Ajakan pesan sekarang
📞 Kontak             →  Alamat, direktori nomor outlet, form → WhatsApp
🦶 Footer             →  Link lengkap + direktori telepon outlet + badge ALDIN
💚 Tombol WA Floating →  Selalu siap di pojok layar
```

---

## 🏗️ Teknologi

- **[Next.js 16](https://nextjs.org)** (App Router) — di-export menjadi **HTML statis murni**
- **[TypeScript 5](https://www.typescriptlang.org)** — kode aman & mudah dirawat
- **[Tailwind CSS 4](https://tailwindcss.com)** + **[shadcn/ui](https://ui.shadcn.com)** — komponen UI premium
- **[Framer Motion 12](https://www.framer.com/motion/)** — animasi buttery-smooth
- **[Lucide Icons](https://lucide.dev)** — ikon modern 4000+

> 💡 **Kenapa statis?** Website statis = tidak butuh Node.js, tidak butuh database, tidak butuh VPS. Cukup upload ke shared hosting biasa (seperti hosting Rp 20 ribuan sekalipun) dan langsung ONLINE. Aman, cepat, dan murah! 💸

---

## 📂 Struktur Proyek

```
samara-green-laundry/
├── 📁 public/                  # Aset statis (ikut ter-copy ke hasil build)
│   ├── images/                 # Gambar website (hero, layanan, dll)
│   ├── favicon.svg             # Ikon tab browser (daun hijau 🌿)
│   └── .htaccess               # Konfigurasi Apache (cache + kompresi)
│
├── 📁 src/
│   ├── lib/
│   │   └── site.ts             # ⭐ PUSAT DATA — ganti nomor WA, alamat,
│   │                           #    jam buka, kredit, semua di sini!
│   ├── app/
│   │   ├── layout.tsx          # Metadata SEO + font
│   │   ├── page.tsx            # Halaman utama (rangkuman semua section)
│   │   └── globals.css         # Tema warna + style global
│   └── components/
│       ├── ui/                 # Komponen shadcn/ui
│       └── landing/            # 🎯 17 komponen section website
│           ├── navbar.tsx          ├── services.tsx
│           ├── hero.tsx            ├── pricing.tsx
│           ├── stats.tsx           ├── testimonials.tsx
│           ├── why-us.tsx          ├── faq.tsx
│           ├── how-it-works.tsx    ├── contact.tsx
│           ├── cta-banner.tsx      ├── footer.tsx
│           └── floating-whatsapp.tsx
│
├── next.config.ts              # ⚙️ Konfigurasi static export
├── package.json                # Dependencies + scripts
└── README.md                   # 📖 File ini
```

---

## 🚀 Menjalankan di Komputer Lokal

> **Prasyarat:** [Node.js 18+](https://nodejs.org) (atau [Bun](https://bun.sh)) sudah terinstall.

```bash
# 1️⃣ Masuk ke folder proyek
cd samara-green-laundry

# 2️⃣ Install dependencies (pilih salah satu)
npm install          # dengan npm
# bun install        # dengan bun (lebih cepat)

# 3️⃣ Jalankan mode development
npm run dev
# buka http://localhost:3000 di browser 🎉
```

---

## 🌐 DEPLOY KE SHARED HOSTING (cPanel)

> ⭐ **Inilah keunggulan utama website ini.** Hasil build adalah **file statis murni** — persis seperti website HTML biasa. Tidak perlu Node.js, tidak perlu konfigurasi khusus. Kalau Anda bisa upload foto ke hosting, Anda bisa meng-online-kan website ini!

### Cara 1 — Upload ZIP via File Manager cPanel (paling mudah) 🏆

**Langkah A — Build di komputer Anda** (sekali saja):

```bash
# Build + buat file ZIP siap upload dalam 1 perintah:
npm run deploy
```

Perintah ini akan menghasilkan file **`samara-green-laundry-website.zip`** di folder proyek. Isinya adalah website lengkap Anda (`index.html`, `next/`, `images/`, `.htaccess`, dll).

**Langkah B — Upload ke hosting:**

1. 🔑 Login ke **cPanel** hosting Anda → buka **File Manager**
2. 📁 Masuk ke folder **`public_html`** (folder utama domain Anda)
3. 🗑️ *(Opsional)* Hapus file bawaan hosting seperti `default.html` / `index.php` bawaan
4. ⬆️ Klik **Upload** → pilih file **`samara-green-laundry-website.zip`**
5. 📦 Kembali ke File Manager → klik kanan file ZIP → **Extract**
6. 🧹 Pastikan hasil extract **langsung di dalam `public_html`** (bukan di dalam folder baru), sehingga `public_html/index.html` ada. Jika masih berada di dalam sub-folder, pindahkan seluruh isinya ke `public_html`
7. 🌍 Buka domain Anda → **WEBSITE ONLINE!** 🎉

```
Struktur akhir public_html yang BENAR:

public_html/
├── index.html          ← WAJIB ada di sini
├── .htaccess           ← WAJIB ada di sini (file tersembunyi — aktifkan "Show Hidden Files")
├── 404.html
├── favicon.svg
├── images/
├── next/
└── _next/
```

### Cara 2 — Upload via FTP (FileZilla)

1. Buka **FileZilla** → isi Host (`ftp://domainanda.com`), Username & Password FTP (dari cPanel → FTP Accounts)
2. Build dulu di komputer: `npm run build` → hasilnya ada di folder **`out/`**
3. Di panel kiri (komputer lokal), masuk ke folder **`out/`**
4. Di panel kanan (server), masuk ke **`public_html`**
5. **Drag & drop SEMUA isi folder `out/`** ke `public_html`
6. Selesai! ✅

### Deploy ke Sub-Folder (misal `domain.com/laundry`)

Ingin website berada di dalam sub-folder, bukan domain utama?

1. Buka file **`next.config.ts`**, tambahkan 2 baris ini:

```ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/laundry",      // ← tambahkan ini
  assetPrefix: "/laundry",   // ← dan ini (sesuaikan nama folder)
  images: { unoptimized: true },
  // ...
};
```

2. Build ulang: `npm run deploy`
3. Upload hasil ZIP lalu extract ke dalam `public_html/laundry/`
4. Selesai — website live di `https://domainanda.com/laundry` ✅

> ⚠️ **Penting:** setelah deploy ke sub-folder, semua link internal otomatis menyesuaikan. Jangan lupa build ulang setiap kali mengubah konfigurasi.

---

## 🛠️ Panduan Kustomisasi

Semua data bisnis **terpusat di satu file** — tidak perlu ngopas kode di banyak tempat!

### 🌐 Domain Website (SEO) — ✅ SUDAH AKTIF

📁 **File: `src/lib/site.ts`** → baris paling atas:

```ts
// ✅ Domain resmi Samara Green Laundry (sudah dibeli & aktif)
export const SITE_URL = "https://sgl.web.id";
```

Konstanta ini otomatis dipakai untuk: **canonical URL, sitemap.xml, robots.txt, Open Graph, dan struktur data Google**. Domain `sgl.web.id` sudah terpasang di seluruh sistem — **tidak perlu diubah lagi**, kecuali suatu saat pindah domain (lalu jalankan ulang `npm run deploy`).

### 📇 Ganti Nomor WhatsApp / Kontak Person

📁 **File: `src/lib/site.ts`**

```ts
// Nomor WA format internasional TANPA tanda + dan TANPA spasi/nol depan
export const WHATSAPP_NUMBER = "628134506007";

export const SITE = {
  // ...
  phoneDisplay: "0821-3450-6007",   // ← tampilan di layar
  phoneIntl: "+628134506007",       // ← untuk tombol telepon
};
```

> 💡 Rumus konversi: `0821-3450-6007` → buang `0` depan, ganti `62` → `628134506007`

### 📱 Ganti Link Media Sosial (TikTok, Instagram, Facebook)

📁 **File: `src/lib/site.ts`** → objek `SOCIAL_LINKS` (ikon otomatis tampil di footer & section kontak):

```ts
export const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@samaragreenlaundry04",
  instagram: "https://instagram.com",     // ← ganti dengan akun asli
  facebook: "https://facebook.com",       // ← ganti dengan akun asli
};
```

### 🏪 Ganti Alamat, Jam Buka, Tagline

Masih di file yang sama — **`src/lib/site.ts`**:

```ts
export const SITE = {
  name: "Samara Green Laundry",
  tagline: "Laundry Bersih, Segar & Ramah Lingkungan",
  address: "Jl. Malangsari No. 22, Tlogosari Kulon, Pedurungan, Semarang",
  mapsUrl: "https://...",                          // ← link Google Maps
  hours: [                                         // ← jam per outlet (tampil di Kontak)
    { day: "Outlet Malangsari — Tlogosari Kulon", time: "Setiap hari · 07.00 – 22.00" },
    { day: "Outlet Sendangguwo — Gemah", time: "Setiap hari · 08.00 – 20.00" },
    { day: "Outlet Dempel — Muktiharjo Kidul", time: "Setiap hari · 07.00 – 21.00" },
  ],
};
```

> 💡 **Nomor telepon & jam per outlet** diatur di `OUTLETS` (file yang sama):
> `phoneDisplay` / `phoneIntl` / `hoursDisplay` / `openHour` / `closeHour` —
> otomatis dipakai di kartu outlet, halaman /outlet/, JSON-LD, dan badge
> "Buka Sekarang" yang live di browser.

> 🕐 **Zona waktu** — Semarang = **WIB (Waktu Indonesia Barat, UTC+7)**.
> Badge "Buka Sekarang" SELALU dihitung dengan jam WIB resmi (`TIME_ZONE =
> "Asia/Jakarta"` di `src/lib/site.ts`), apa pun timezone perangkat
> pengunjung — tamu dari Bali (WITA), Papua (WIT), atau luar negeri tetap
> melihat status buka/tutup yang akurat.

### 💰 Ganti Harga & Layanan

| Yang diganti | File |
|---|---|
| Judul layanan (footer & navbar) | `src/lib/site.ts` → `SERVICE_TITLES` |
| Kartu layanan + harga | `src/components/landing/services.tsx` |
| Paket harga lengkap | `src/components/landing/pricing.tsx` |
| Pertanyaan FAQ | `src/components/landing/faq.tsx` |
| Testimoni pelanggan (21 ulasan) | `src/lib/site.ts` → konstanta `TESTIMONIALS` — tampil otomatis sebagai 3 baris berjalan (marquee) di section testimoni |
| Badge keanggotaan ALDIN | `src/lib/site.ts` → konstanta `ALDIN` — tampil otomatis di hero, section Keunggulan, footer & JSON-LD (memberOf) |

### 🖼️ Ganti Gambar

Letakkan foto asli bisnis Anda (foto outlet, kurir, hasil cucian) ke `public/images/` dengan **nama file yang sama**:

| File | Dipakai di |
|---|---|
| `hero-laundry.png` | Section hero (utama) |
| `eco-wash.png` | Section keunggulan |
| `delivery.png` | Section CTA banner |
| `folded-clothes.png` | Section testimoni/CTA |
| `logo-leaf.png` | **Logo resmi** — emblem daun (navbar, menu mobile, footer, favicon) |
| `logo-full.png` | **Logo resmi** lengkap (daun + wordmark) — cadangan/cetak |
| `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` | Favicon & ikon PWA (tab browser, layar utama HP) |

> 💡 Ukuran ideal: `hero-laundry.png` 1344×768 px, lainnya persegi/landscape. Format JPG juga bisa (jangan lupa ganti ekstensi di komponen terkait).
> 🏷️ **Ganti logo**: timpa `logo-leaf.png` dkk. dengan logo Anda (PNG transparan), atau jalankan ulang `node scripts/process-logo.mjs` setelah menaruh `upload/samara-green-laundry-logo.jpg` baru — semua ikon & og-image ikut terbuat otomatis.

### 🎨 Ganti Warna Tema

📁 **File: `src/app/globals.css`** — ubah token warna `--primary` dan variabel emerald lainnya.

### 🏆 Ganti Kredit Desainer

📁 **File: `src/lib/site.ts`** → objek `DESIGN_CREDIT` (otomatis tampil di footer).

### 🔄 Setelah Edit Kode — Wajib Build Ulang!

```bash
npm run deploy     # build + zip siap upload
```

Lalu upload ulang ZIP ke `public_html` (langkah yang sama seperti di atas). **Selesai.**

---

## 🔍 SEO & Optimasi (FULL OPTIMIZED)

Website ini sudah dilengkapi **paket SEO lengkap level profesional** — aktif otomatis sejak build:

### ✅ Yang Sudah Terpasang

| Fitur SEO | Fungsi |
|---|---|
| 🧩 **JSON-LD Structured Data** | `DryCleaningOrLaundry` (profil bisnis), `WebSite`, `WebPage`, `FAQPage` — membuat website tampil sebagai **rich snippet** di Google: bintang ⭐ 4.9, jam buka, harga layanan, dan FAQ langsung di hasil pencarian! |
| 🗺️ **sitemap.xml** | Peta halaman untuk mesin pencari (di-generate otomatis saat build) |
| 🤖 **robots.txt** | Mengizinkan semua bot + mengarahkan ke sitemap |
| 🔗 **Canonical URL** | Mencegah duplikat konten di mata Google |
| 🖼️ **Open Graph + Twitter Card + OG Image** | Saat link dibagikan ke WhatsApp/Facebook/X, muncul preview premium dengan foto, nama brand, nomor WA, dan rating |
| 📱 **Manifest PWA** | Website bisa di-"install" seperti aplikasi di HP pelanggan |
| 🏷️ **Meta lengkap** | Title, description, 13 keyword laundry, `robots: index,follow`, `max-image-preview:large`, tema warna hijau |
| 🧱 **Semantic HTML** | `header`, `main`, `section`, `nav`, `footer`, heading hierarchy benar, alt text semua gambar |
| ⚡ **Performa** | HTML statis murni + `.htaccess` (Gzip + caching) = skor PageSpeed tinggi |

### 🚀 Checklist Aktivasi Setelah Website Online (PENTING!)

Agar Google **cepat mendeteksi** website Anda, lakukan 10 menit berikut:

1. ✅ **Domain `sgl.web.id` sudah aktif di seluruh sistem** (canonical, sitemap, robots, JSON-LD) — cukup upload isi `out/` ke `public_html` domain tersebut
2. **Pasang SSL/HTTPS** — di cPanel cari "SSL/TLS Status" → pilih `sgl.web.id` → Run AutoSSL (gratis Let's Encrypt). Lalu buka tanda komentar baris HTTPS di `.htaccess` dan upload ulang
3. **Daftarkan ke [Google Search Console](https://search.google.com/search-console)** → verifikasi kepemilikan (pilih metode "HTML tag" → kopi kode verifikasi → beri tahu kami untuk dipasang, atau pakai metode upload file) → klik **"Mulai Pengindeksan"** → masukkan domain Anda
4. **Submit sitemap** — di Search Console menu **Sitemap** → isi `sitemap.xml` → Submit
5. **Buat [Google Business Profile](https://business.google.com)** (gratis!) — WAJIB untuk bisnis lokal: website Anda bisa muncul di **Google Maps** + hasil pencarian "laundry terdekat"
6. **Bagikan link website** ke WhatsApp Status & media sosial — kunjungan awal mempercepat indeks

> 💡 Hasilnya? Dalam 1–7 hari biasanya website sudah terindeks Google. Dengan structured data yang terpasang, potensi tampil sebagai rich snippet dengan bintang & FAQ sangat besar — persis seperti website laundry besar!

### 🛠️ Verifikasi SEO (Opsional)

Setelah online, tes website Anda di:
- **[Google Rich Results Test](https://search.google.com/test/rich-results)** → harus mendeteksi *Local Business* + *FAQ*
- **[Meta Tag Checker](https://metatags.io)** → preview tampilan saat link dibagikan
- **[PageSpeed Insights](https://pagespeed.web.dev)** → cek skor kecepatan

---

## ❓ Troubleshooting

| Masalah | Penyebab | Solusi |
|---|---|---|
| ❌ Halaman putih / 404 setelah upload | File ter-extract di dalam sub-folder | Pastikan `index.html` langsung di `public_html`, bukan `public_html/namafolder/` |
| ❌ File `.htaccess` tidak terlihat | File tersembunyi | File Manager → **Settings** → centang **Show Hidden Files (dotfiles)** |
| ❌ Tombol WhatsApp tidak jalan | Format nomor salah | Pastikan `WHATSAPP_NUMBER = "628134506007"` — tanpa `+`, tanpa spasi, tanpa `0` di depan |
| ❌ Perubahan kode tidak muncul | Lupa build ulang | Jalankan `npm run deploy` lalu upload ulang ZIP |
| ❌ Gambar tidak tampil | Folder `images/` tidak ikut ter-upload | Upload ulang, pastikan folder `images/` ada di `public_html` |
| ❌ Error saat `npm run build` | Dependencies belum lengkap | Jalankan `npm install` terlebih dahulu |
| ❌ Perubahan belum terlihat di browser | Cache browser | Tekan **Ctrl + F5** (hard refresh) |

---

## 🏆 Kredit

<div align="center">

### Design by **PT Digital Bisnis Manajemen**

🌐 [digiman.id](https://digiman.id) &nbsp;·&nbsp; 🕸️ [juraganwebsite.web.id](https://juraganwebsite.web.id)

**Samara Green Laundry** — 📞 Kontak Person: [0821-3450-6007](https://wa.me/628134506007?text=Halo%20Samara%20Green%20Laundry!) · 🎵 [TikTok @samaragreenlaundry04](https://www.tiktok.com/@samaragreenlaundry04)

*Dibangun dengan Next.js, TypeScript, Tailwind CSS & Framer Motion* 💚

</div>

---

<div align="center">

**⭐ Website ini siap online hari ini juga — selamat berbisnis! 🌿**

</div>
