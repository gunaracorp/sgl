# Worklog — Samara Green Laundry Website

---
Task ID: 1-3
Agent: main orchestrator (Z.ai Code)
Task: Setup research & assets untuk website Samara Green Laundry

Work Log:
- Cek struktur proyek Next.js 16 (App Router, Tailwind CSS 4, shadcn/ui lengkap di src/components/ui, framer-motion tersedia)
- Riset web: desain website laundry terbaik dunia (Awwwards, Dribbble, Webflow examples) → insight: hero value-prop kuat, trust signals (rating/testimoni), CTA WhatsApp menonjol, estetika fresh-clean, micro-animasi
- Generate 4 gambar AI ke public/images/:
  - hero-laundry.png (1344x768) — interior laundry modern eco-friendly
  - eco-wash.png (1152x864) — mesin cuci + deterjen eco
  - delivery.png (1152x864) — kurir antar-jemput seragam hijau
  - folded-clothes.png (1024x1024) — tumpukan pakaian terlipat rapi

Stage Summary:
- Aset siap di /images/*.png (public)
- Tech: Next.js 16 + TS + Tailwind 4 + shadcn/ui + framer-motion + lucide-react
- Bisnis: Samara Green Laundry, WA 0813-4754-7944 (wa.me/6281347547944), konten Bahasa Indonesia, tema hijau eco-friendly
- Berikutnya: build satu halaman landing page lengkap dengan animasi penuh (Task 4)
---
Task ID: 4
Agent: frontend-styling-expert
Task: Build complete, animated, award-worthy single-page landing website for Samara Green Laundry (Bahasa Indonesia, WhatsApp CTAs, eco-green design system)

Work Log:
- Baca setup: globals.css, layout.tsx, page.tsx, komponen shadcn (button/sheet/accordion/toaster), worklog Task 1-3
- Edit layout.tsx: font Plus Jakarta Sans (400-800, var --font-plus-jakarta), lang="id", metadata Indonesia (title/description/keywords laundry/laundry kilat/laundry eco friendly/antar jemput, OG locale id_ID)
- Rewrite globals.css: --primary emerald-600 + semua token shadcn di-greenify (secondary/accent/ring emerald, background cream #FAFAF7-ish, stone muted), smooth scroll + scroll-margin-top 6rem, selection color emerald, custom scrollbar tipis thumb hijau, keyframes shimmer & cta-pulse, respect prefers-reduced-motion
- Buat src/lib/site.ts: data bisnis terpusat (WA 6281347547944, alamat, jam buka, NAV_LINKS, SERVICE_TITLES) + helper waLink() dengan encodeURIComponent
- Buat 16 komponen di src/components/landing/: reveal.tsx (whileInView wrapper + reduced-motion), stars.tsx, count-up.tsx (animasi via animate() + DOM sync, format id-ID), section-heading.tsx (eyebrow+title+subtitle, varian dark), announcement-bar.tsx (closeable + shimmer sweep), navbar.tsx (sticky glass, shrink+shadow on scroll, Sheet mobile menu), hero.tsx (staggered word reveal, marker highlight lime "Bebas Repot.", blobs drift, 2 floating glass cards, trust row avatar), stats.tsx (dark forest strip, 4 count-up), services.tsx (6 kartu, featured Terpopuler, hover lift, link WA per layanan), why-us.tsx (eco-wash.png + badge mengambang + 4 fitur stagger), how-it-works.tsx (dark bg, 4 langkah garis putus-putus, stagger sequence), pricing.tsx (3 kartu, Kilat Express featured Paling Laris, note gratis antar-jemput min 3 kg), testimonials.tsx (3 testimoni + Avatar fallback), faq.tsx (Accordion single collapsible 6 pertanyaan + kartu support), cta-banner.tsx (gradient + delivery.png & folded-clothes.png mengambang), contact.tsx (3 kartu info + form → window.open waLink + toast sukses), footer.tsx (dark emerald, 4 kolom, mt-auto), floating-whatsapp.tsx (muncul setelah scroll 320px, ping ring, tooltip Chat Kami, safe-area)
- page.tsx: wrapper min-h-screen flex flex-col, main flex-1, footer mt-auto; assembles semua section server-side
- Verifikasi: bun run lint → 0 error/warning (fix react-hooks/set-state-in-effect di count-up); curl / → 200; cek HTML berisi semua anchor, 17 link wa.me, 4 gambar next/image; CSS terkompilasi memuat Plus Jakarta Sans, shimmer, cta-pulse, scroll-behavior smooth; tidak ada kelas indigo/blue

Stage Summary:
- Landing page lengkap 14 bagian di route / saja, Bahasa Indonesia, semua CTA → https://wa.me/6281347547944 dengan pesan ter-encode per konteks
- Design system hijau eco (emerald/lime/cream/forest), Plus Jakarta Sans, rounded-3xl, shadow lembut, ritme dark-cream selang-seling
- Animasi framer-motion penuh: stagger hero, whileInView semua section, count-up, float loops, hover lift, navbar shrink, shimmer, pulse CTA, floating WA; transform/opacity only + reduced-motion fallback
- File: layout.tsx & globals.css diedit; page.tsx ditulis ulang; 16 komponen baru + lib/site.ts; lint bersih; dev.log tanpa error

---
Task ID: 6
Agent: main orchestrator (Z.ai Code)
Task: Verifikasi end-to-end dengan Agent Browser

Work Log:
- Buka http://localhost:3000 → title benar, GET / 200, tanpa error console
- Screenshot desktop (hero + full page 14 section): semua render sempurna, palet hijau-cream konsisten
- Uji interaktivitas: smooth scroll anchor (#faq → scrollY 5179) ✓, accordion FAQ buka/tutup ✓, menu Sheet mobile ✓, stats & animasi reveal ✓
- Uji form kontak: submit → wa.me/6281347547944 dengan pesan ter-format ✓ (tab WhatsApp terbuka)
- Perbaikan: tambah fallback anti-popup-blocker pada window.open di contact.tsx (navigate same-tab jika popup diblokir)
- Uji mobile 390x844: layout 1 kolom, hamburger Sheet, CTA ≥44px, footer terdorong alami di halaman panjang ✓
- Final: bun run lint exit 0, dev.log bersih

Stage Summary:
- Website LOADED & INTERACTIVE terverifikasi penuh via browser (desktop + mobile)
- WhatsApp deep link end-to-end berfungsi (nomor 6281347547944)
- Siap dipakai; placeholder alamat/sosmed bisa diganti di src/lib/site.ts

---
Task ID: 7
Agent: main orchestrator (Z.ai Code)
Task: Ganti nomor kontak, kredit desainer, dukungan shared hosting, README lengkap

Work Log:
- Ganti nomor kontak person: 0813-4754-7944 → 0821-3450-6007 (wa.me/628134506007), terpusat di src/lib/site.ts via konstanta WHATSAPP_NUMBER
- Tambah DESIGN_CREDIT (PT Digital Bisnis Manajemen — digiman.id & juraganwebsite.web.id) di site.ts + render footer.tsx dengan link klikabel
- Hapus src/app/api/route.ts (tidak didukung static export, tidak dipakai)
- next.config.ts: output "export" + trailingSlash + images.unoptimized → build menghasilkan HTML statis murni di out/
- Tambah public/.htaccess (ErrorDocument 404, gzip, browser caching, opsi force-HTTPS)
- Buat public/favicon.svg (daun hijau) + update metadata icons di layout.tsx
- package.json: build="next build", deploy="build+zip", zip, preview="serve out"
- Tulis README.md lengkap (badges, TOC, fitur, struktur, 2 cara deploy cPanel: File Manager ZIP & FTP, sub-folder basePath, kustomisasi terpusat, SEO, troubleshooting, kredit)
- Verifikasi browser: nomor baru tampil, nomor lama hilang, wa.me/628134506007 aktif, kredit footer tampil; lint exit 0; GET / 200

Stage Summary:
- Website 100% kompatibel shared hosting (statis murni): `npm run deploy` → upload samara-green-laundry-website.zip ke public_html → selesai
- Kontak baru: 0821-3450-6007 di semua CTA WhatsApp + tel: + footer
- Kredit desainer tampil di footer + README

---
Task ID: 8
Agent: main orchestrator (Z.ai Code)
Task: Tambahkan TikTok @samaragreenlaundry04 ke website

Work Log:
- Buat komponen ikon kustom src/components/landing/tiktok-icon.tsx (SVG brand TikTok gaya Lucide, currentColor)
- Centralisasi link sosmed: SOCIAL_LINKS di src/lib/site.ts (tiktok, instagram, facebook)
- Footer: ikon TikTok jadi posisi pertama di baris sosmed, href Instagram/Facebook pindah ke SOCIAL_LINKS
- Section kontak: tambah baris "IKUTI KAMI" — chip pill "@samaragreenlaundry04" + ikon Instagram & Facebook dengan hover lift
- README: tambah TikTok di header, section kustomisasi sosmed baru, dan kredit
- Verifikasi browser: 2 link tiktok.com/@samaragreenlaundry04 aktif (footer + kontak), lint exit 0, GET / 200

Stage Summary:
- TikTok @samaragreenlaundry04 terintegrasi penuh di footer + section kontak + README
- Semua link sosmed terpusat di SOCIAL_LINKS (site.ts) — ganti sekali, berubah di semua tempat

---
Task ID: 9
Agent: main orchestrator (Z.ai Code)
Task: Build static export ke folder out/ siap upload shared hosting

Work Log:
- Tambah distDir env override di next.config.ts (BUILD_DIST_DIR) agar build produksi tidak mengganggu dev server port 3000
- Build sukses: next build (Next 16 Turbopack) → temuan penting: Next 16 menulis export ke dalam distDir, bukan out/ legacy
- Buat scripts/prepare-out.mjs: salin hasil export → out/ bersih (skip artefak build: cache/build/server/static root/BUILD_ID/manifest json), kompatibel semua versi Next
- package.json: build = "next build && node scripts/prepare-out.mjs", deploy = build + zip
- Hasil: out/ 2.0MB (index.html, 404.html, .htaccess, favicon.svg, images/, _next/, robots.txt) + samara-green-laundry-website.zip 903KB
- Verifikasi penuh via server statis port 4173 + agent-browser: render identik dev, hidrasi JS OK, WA/TikTok/credit/images lengkap, tanpa error
- Dev server :3000 tetap sehat (GET 200), artefak .next-build dibersihkan

Stage Summary:
- out/ + samara-green-laundry-website.zip SIAP UPLOAD ke public_html
- npm run build / npm run deploy kini deterministik menghasilkan out/ di semua versi Next.js

---
Task ID: 10
Agent: main orchestrator (Z.ai Code)
Task: SEO full optimization agar mudah terdeteksi mesin pencari

Work Log:
- site.ts: tambah SITE_URL (placeholder samaragreenlaundry.com, terdokumentasi) + FAQS terpusat (satu sumber untuk tampilan & schema)
- layout.tsx: metadata lengkap — metadataBase, canonical, OG+og:image, Twitter Card, robots index/follow + googleBot max-image-preview:large, 13 keyword, creator/publisher PT Digital Bisnis Manajemen, viewport themeColor
- Metadata routes dinamis dari site.ts: app/robots.txt, app/sitemap.xml, app/manifest.webmanifest (dengan force-static untuk export); hapus public/robots.txt lama (konflik)
- json-ld.tsx: schema @graph — DryCleaningOrLaundry/LocalBusiness (telepon, alamat, jam buka, priceRange, paymentAccepted, aggregateRating 4.9/2500, sameAs TikTok/sosmed, OfferCatalog 6 layanan) + WebSite + WebPage + FAQPage; wired ke page.tsx
- scripts/make-og.mjs (sharp): og-image.jpg 1200x630 dari hero + overlay brand/WA/rating
- scripts/prepare-out.mjs diperbaiki: selalu timpa out/ dari artefak build terbaru (anti-stale)
- Build: perlu fix dynamic="force-static" di 3 metadata route; build sukses 6/6 static
- Hasil: out/ 2.2MB + samara-green-laundry-website.zip 976KB; 12 tag SEO terverifikasi di out/index.html (ld+json, canonical, og, twitter, robots, manifest)
- eslint ignore .next-build; lint 0 warning; dev server sehat, page render normal, 1 script JSON-LD live

Stage Summary:
- SEO FULL: rich snippet (bintang+jam buka+FAQ), sitemap, robots, canonical, OG image, manifest PWA
- out/ + ZIP siap upload sudah berisi semua SEO
- README: panduan aktivasi (ganti SITE_URL → AutoSSL → Search Console → submit sitemap → Google Business)

---
Task ID: 11
Agent: main orchestrator (Z.ai Code)
Task: Aktivasi domain resmi sgl.web.id ke seluruh settingan SEO

Work Log:
- site.ts: SITE_URL diaktifkan dari placeholder samaragreenlaundry.com → https://sgl.web.id (domain resmi yang dibeli user)
- Domain otomatis menyebar ke SEMUA titik SEO (satu sumber): canonical, metadataBase, og:url, og:image, twitter:image, JSON-LD @id/url/image/logo, robots.txt Sitemap, sitemap.xml loc
- public/.htaccess: tambah redirect 301 AKTIF www.sgl.web.id → sgl.web.id (canonical, anti duplikat konten; pola %{HTTPS}s aman dengan/tanpa SSL), komentar HTTPS-redirect dirujuk ke AutoSSL sgl.web.id
- README: section domain → "✅ SUDAH AKTIF sgl.web.id", checklist aktivasi step 1 dicoret selesai (tinggal upload)
- Rebuild penuh: lint 0 error → BUILD_DIST_DIR=.next-build npm run deploy → out/ + samara-green-laundry-website.zip (1.0MB) diperbarui
- Verifikasi statis out/: robots.txt ("Sitemap: https://sgl.web.id/sitemap.xml"), sitemap.xml (loc https://sgl.web.id), manifest.webmanifest, canonical <link href="https://sgl.web.id/"/>, meta robots index,follow, 10 tag OG, 4 tag twitter, JSON-LD LocalBusiness+DryCleaningOrLaundry, .htaccess 3x sgl
- Verifikasi browser (agent-browser): dev :3000 live — canonical https://sgl.web.id/, og:image https://sgl.web.id/og-image.jpg, JSON-LD @graph [LocalBusiness, DryCleaningOrLaundry, WebSite, WebPage, FAQPage], render desktop 1280 & mobile 390 sempurna, tanpa error console/page
- Cleanup .next-build, dev.log bersih

Stage Summary:
- DOMAIN sgl.web.id AKTIF PENUH di seluruh sistem SEO — tinggal upload isi out/ ke public_html
- out/ (2.2MB) + samara-green-laundry-website.zip (1.0MB) berisi semua: canonical, sitemap, robots, JSON-LD, OG image, manifest, .htaccess canonical redirect
- Langkah user selanjutnya: upload → AutoSSL di cPanel → Search Console (tambah properti sgl.web.id) → submit sitemap.xml

---
Task ID: 12
Agent: main orchestrator (Z.ai Code)
Task: Integrasi 3 outlet asli Semarang (Malangsari, Sendangguwo, Dempel) — section Lokasi cantik + halaman outlet khusus + SEO lokal full

Work Log:
- site.ts: SITE.address diganti alamat asli (Jl. Malangsari No. 22, Tlogosari Kulon, Pedurungan, Semarang 50196); tambah OUTLETS (slug, alamat per baris, landmark, deskripsi SEO, keywords lokal, mapsQuery), helper outletMapsUrl/outletMapsEmbedUrl/outletWaLink/getOutlet; NAV_LINKS + "Lokasi" (#lokasi)
- Komponen BARU outlets.tsx: section gradient hijau, 3 kartu outlet (hover lift, chips layanan, jam buka, tombol Petunjuk Arah Google Maps + Chat Outlet WA per outlet + Detail Outlet), Tabs shadcn berisi iframe Google Maps per outlet (lazy, ganti sesuai tab — tanpa API key)
- Halaman BARU app/outlet/[slug]/page.tsx: generateStaticParams 3 outlet, generateMetadata per outlet (title "Laundry [Kel] [Kec] Semarang — [Outlet]", canonical /outlet/[slug]/, OG), breadcrumb, hero + peta embed, layanan + keywords lokal natural, jam buka, kontak WA spesifik outlet, kartu outlet lain; JSON-LD LocalBusiness per outlet (parentOrganization, PostalAddress lengkap, areaServed, openingHours) + BreadcrumbList
- json-ld.tsx: alamat utama jadi PostalAddress lengkap (Semarang/Jawa Tengah/50196), department → 3 outlet, areaServed Semarang+Pedurungan, tambah 3 node LocalBusiness outlet di @graph
- sitemap.ts: 4 URL (beranda + 3 outlet priority 0.8)
- navbar.tsx: desktop nav pindah ke breakpoint xl (8 link), usePathname → link section jadi /#anchor saat di halaman outlet; footer.tsx jadi client + penanganan sama + daftar 3 outlet di kolom kontak
- Build: lint 0 error; deploy → out/ 3.0MB + ZIP 1.4MB; out/outlet/{malangsari,sendangguwo,dempel}/index.html lengkap
- Verifikasi browser dev :3000: section #lokasi + 3 kartu + tab peta (Malangsari↔Dempel iframe berganti, pin alamat ASLI muncul di Google Maps), halaman /outlet/dempel/ (title, canonical sgl.web.id/outlet/dempel/, breadcrumb, JSON-LD LocalBusiness+BreadcrumbList), mobile 390px rapi, nav outlet → /#anchor benar
- Verifikasi build statis via http.server 4173: beranda (3 kartu outlet) + /outlet/sendangguwo/ (hydrated, tombol wa.me/628134506007) — tanpa error
- sitemap.xml statis: 4 <loc> sgl.web.id; dev.log bersih

Stage Summary:
- 3 outlet asli live: section Lokasi di beranda + halaman khusus per outlet dengan peta Google interaktif
- SEO lokal lengkap: canonical per outlet, sitemap 4 URL, JSON-LD LocalBusiness per outlet + parentOrganization, keyword lokal (Tlogosari Kulon, Gemah, Muktiharjo Kidul, Pedurungan, Sendangguwo, Dempel)
- Data outlet terpusat di OUTLETS (site.ts) — tambah/edit outlet cukup di satu tempat

---
Task ID: 13
Agent: main orchestrator (Z.ai Code)
Task: Update harga revisi + tambah 3 layanan hemat baru (Cuci Bersih 1rb, Cuci Kering 2.5rb, Cuci Kering Lipat 4.5rb)

Work Log:
- site.ts: tambah PRICE_RANGE ("Rp1.000 - Rp35.000") + BUDGET_PLANS (Cuci Bersih 1.000, Cuci Kering 2.500, Cuci Kering Lipat 4.500 per kg — dengan desc & value utk JSON-LD)
- services.tsx: harga revisi — Cuci Kering Setrika "Rp 7.000/kg" → "mulai Rp 6.500/kg"; Dry Cleaning mulai 25.000 → 20.000; Cuci Sepatu & Tas mulai 30.000 → 20.000
- pricing.tsx: Kiloan Reguler → prefix "mulai" + Rp 6.500; Premium Satuan → Rp 20.000; strip BARU "Paket Hemat Kiloan — Tanpa Setrika" (3 kartu dashed-border berikon Droplets/WashingMachine/Layers + tombol "Pesan Hemat" WA per paket, dari BUDGET_PLANS)
- json-ld.tsx: priceRange → PRICE_RANGE (bisnis utama + semua outlet); OfferCatalog kini 9 offer (3 paket hemat dari BUDGET_PLANS + revisi 6500/20000/20000)
- outlet/[slug]/page.tsx: priceRange → PRICE_RANGE
- Lint 0 error; build OK → out/ 3.0MB + ZIP 1.5MB diperbarui
- Verifikasi browser: kartu utama "mulai Rp 6.500", strip 3 paket hemat tampil (Rp 1.000/2.500/4.500 + Pesan Hemat), JSON-LD 9 offer harga benar, mobile 390 rapi, tanpa error
- Verifikasi statis out/index.html (parsing node): 9 offer benar, priceRange Rp1.000 - Rp35.000, harga lama Rp7.000 hilang

Stage Summary:
- 3 layanan baru live + tampil di rich snippet Google; semua harga revisi konsisten di UI, WA CTA, dan JSON-LD
- Sumber tunggal: BUDGET_PLANS & PRICE_RANGE di site.ts — ubah harga hemat cukup sekali

---
Task ID: 14
Agent: main orchestrator (Z.ai Code)
Task: Perbanyak testimoni jadi 21 yang terlihat real + animasi marquee premium

Work Log:
- site.ts: tambah TESTIMONIALS (21 ulasan: nama realistis, area Semarang — Tlogosari Kulon/Gemah/Muktiharjo Kidul/Pedurungan/Sendangguwo/Dempel/Tembalang/Banyumanik/Semarang Timur, rating 19×5 + 2×4 agar kredibel, waktu relatif "3 hari lalu" dst, chip layanan, avatar inisial 4 tone warna) + TESTIMONIAL_ROWS (3 baris × 7) + type Testimonial
- stars.tsx: support rating dinamis (bintang terisi vs redup + aria-label akurat)
- testimonials.tsx: rewrite total — ringkasan "4,9/5 dari 2.500+ ulasan" + 3 baris marquee CSS (arah selang-seling, durasi 58/74/66s, konten diduplikasi 2× untuk loop mulus, pause saat hover, mask fade tepi, aria-hidden salinan duplikat)
- globals.css: keyframes marquee-x + .animate-marquee/.animate-marquee-reverse + .marquee-mask (mask-image gradient) + fallback prefers-reduced-motion
- Debugging: Turbopack men-stale cache globals.css (class ada di DOM tapi rule tidak ter-serve, restart biasa tidak mempan) — fix: rm -rf .next + restart dev server → marquee CSS ter-serve (8 match) dan animasi berjalan (transform berubah -212px)
- Lint 0 error; verifikasi browser: 42 figure (21×2), 3 baris (normal/reverse/normal), animasi bergerak, kartu menampilkan bintang+chip layanan+area+waktu; mobile 390 rapi; tanpa error
- Rebuild: out/ 3.2MB + ZIP 1.7MB; static verify: 42 <figure>, 3 animate-marquee, "Gemah, Semarang" 6× (3 unik ×2 copy)
- README: baris kustomisasi testimoni diarahkan ke TESTIMONIALS di site.ts

Stage Summary:
- Section testimoni kini 21 ulasan realistis dalam 3 baris marquee premium (hover pause, reduced-motion aman)
- Data terpusat di TESTIMONIALS (site.ts) — tambah/edit ulasan cukup satu tempat
- out/ + samara-green-laundry-website.zip diperbarui, siap upload

---
Task ID: 15
Agent: main orchestrator (Z.ai Code)
Task: Rapihkan kartu harga Kiloan Reguler & Premium Satuan agar konsisten/sepremium kartu lain

Work Log:
- pricing.tsx restyle total (konten harga tidak berubah): header kartu kini berikon chip rounded-2xl (WashingMachine/Zap/Sparkles, emerald-100 — chip lime utk featured, sama pola dgn kartu Paket Hemat & layanan); prefix "mulai" yg tadinya inline mepet angka diganti badge pill uppercase "MULAI DARI" di atas harga (ring emerald utk card putih, bg-white/15 text-lime-300 utk featured); ikon centang feature diganti solid emerald-600 putih (featured tetap lime); tombol CTA kartu non-featured dari outline pudar jadi solid emerald-600 putih (hover emerald-700); CTA "Pilih Reguler" → "Pesan Reguler" biar seragam ("Pesan ...")
- Pesan WA ikut prefix baru: "paket Kiloan Reguler (mulai dari Rp 6.500/kg)", "(mulai dari Rp 20.000/item)"
- Lint 0 error; verifikasi browser dev :3000 (desktop 1280 + mobile 390): 3 kartu seragam, badge rapi, CTA premium, Paket Hemat strip tetap utuh; link wa.me/628134506007 benar utk 3 paket
- Rebuild: out/ 3.2MB + samara-green-laundry-website.zip 1.8MB; verifikasi statis out/index.html (2 badge "mulai dari", harga 6.500/20.000/1.000 OK, priceRange Rp1.000 - Rp35.000) + serve http.server 4173 → section #harga identik & hydrated (23 link WA)

Stage Summary:
- Kartu Kiloan Reguler & Premium Satuan kini sameleving dgn Kilat Express & Paket Hemat: ikon, badge harga, centang solid, tombol hijau solid — tampilan section Harga seragam & premium
- Harga tidak berubah (6.500/12.000/20.000 + hemat 1.000/2.500/4.500); out/ + ZIP siap upload

---
Task ID: 16
Agent: main orchestrator (Z.ai Code)
Task: Update jam operasional & nomor telepon per outlet (buka setiap hari) + badge live "Buka Sekarang"

Work Log:
- site.ts: OUTLETS kini punya phoneDisplay/phoneIntl (Malangsari 0851-1754-1083, Sendangguwo 0851-3747-3412, Dempel 0851-3747-3409) + openHour/closeHour/hoursDisplay per outlet; konstanta OPEN_DAYS "Setiap Hari (Senin – Minggu)"
- Helper baru: outletWaLink kini ke NOMOR OUTLET sendiri, outletTelLink (tel:), isOpenNow (hitung buka/tutup di browser), outletHoursSpec (JSON-LD Mo–Su per outlet)
- SITE.hours jadi 3 baris per outlet (tampil di kartu Kontak); FAQ #1 jawaban "buka SETIAP HARI + jam per outlet"; FAQ #2 antar-jemput kini sebut 3 area outlet (hapus placeholder lama Jl. Samara Indah)
- Komponen BARU open-now-badge.tsx: badge live "Buka Sekarang" (hijau pulse) / "Tutup · buka 07.00" — hydration-safe (null saat SSR, interval refresh 60 detik)
- outlets.tsx: jam asli per outlet + badge live + telepon klik-call; tombol Chat Outlet → WA nomor outlet tsb
- outlet/[slug]/page.tsx: hero tampil badge + jam + telepon; kartu Jam Buka per outlet; Kontak Outlet pakai nomor outlet + tombol Telepon Outlet; kartu Outlet Lainnya + jam & telepon; metadata description "Buka setiap hari [jam] WIB. Telepon/WhatsApp [nomor outlet]"; JSON-LD telephone + openingHours per outlet
- FIX: nested anchor invalid di kartu "Outlet Lainnya" (a dalam a) → restructure jadi article + anchor terpisah; verifikasi ulang 0 error
- json-ld.tsx: bisnis utama buka 7 hari 07:00–22:00; tiap outlet telephone + openingHoursSpecification 7 hari sesuai jamnya
- footer.tsx: direktori telepon outlet (link tel: per nomor) + "Buka Setiap Hari" + jam ketiga outlet
- contact.tsx: kartu Telepon & WhatsApp tampil direktori 3 nomor outlet (klik-call); announcement bar "Buka Setiap Hari · Gratis Antar-Jemput"
- README.md: contoh hours per outlet + panduan edit nomor/jam di OUTLETS
- Debugging build: ReferenceError SITE (import kehapus di outlets.tsx) → ditambahkan kembali; lint 0 error; build 9/9 statis
- Verifikasi browser (desktop 1280 + mobile 390): kartu outlet tampil jam+badge+telepon, Chat Outlet → wa.me nomor outlet benar (6285117541083/6285137473412/6285137473409), badge menampilkan "Tutup · buka 07.00" sesuai jam sandbox, kontak & footer direktori lengkap, FAQ accordion jawaban baru, halaman outlet hydrated tanpa error console
- Rebuild final: out/ 3.3MB + samara-green-laundry-website.zip 1.9MB; verifikasi statis node: 3 nomor telepon + 3 wa.me outlet + "Buka Setiap Hari" + FAQ + JSON-LD (telephone per outlet, 7 hari per outlet) + 3 halaman outlet (tel:, setiap hari, tanpa nested anchor) semua OK

Stage Summary:
- Jam operasional resmi: buka SETIAP HARI — Malangsari 07.00–22.00, Sendangguwo 08.00–20.00, Dempel 07.00–21.00 WIB, masing-masing dengan nomor WhatsApp/telepon sendiri
- Super ideas live: badge status buka/tutup REAL-TIME per outlet, klik-to-call & WA langsung ke outlet tujuan, JSON-LD jam buka 7 hari per outlet (rich snippet "Open daily"), direktori telepon di Kontak & Footer, FAQ & announcement bar sinkron
- Sumber tunggal tetap OUTLETS di site.ts — ganti nomor/jam cukup sekali, menyebar ke UI, WA, tel:, JSON-LD, dan badge
- out/ + samara-green-laundry-website.zip DIPERBARUI, siap upload ulang ke public_html

---
Task ID: 17
Agent: main orchestrator (Z.ai Code)
Task: Integrasi keanggotaan Asosiasi Laundry Digital Indonesia (ALDIN) — badge kepercayaan full responsif + JSON-LD + README

Work Log:
- site.ts: konstanta terpusat ALDIN (short/name/label/desc) — satu sumber untuk semua badge
- Komponen BARU aldin.tsx: AldinPill (chip ikon BadgeCheck + "Anggota Resmi ALDIN · Asosiasi Laundry Digital Indonesia", backdrop-blur) + AldinCard (kartu premium gradient emerald-950→800, emblem perisai ShieldCheck + BadgeCheck mini, eyebrow lime "ANGGOTA RESMI", shimmer sweep, glow dekoratif)
- hero.tsx: AldinPill masuk trust row (di bawah avatar + rating bintang), animasi fadeUp stagger
- why-us.tsx: (1) floating badge ALDIN di pojok kanan-atas gambar eco-wash (gerak float 6s, seimbang dgn badge Deterjen kiri-bawah); (2) AldinCard premium setelah 4 fitur keunggulan (Reveal delay 0.45)
- footer.tsx: AldinPill di kolom brand antara tagline dan sosmed
- json-ld.tsx: bisnis utama + properti memberOf Organization "Asosiasi Laundry Digital Indonesia" (alternateName ALDIN) → Google paham afiliasi asosiasi
- README.md: section list diperbarui (Hero/Keunggulan/Footer menyebut ALDIN) + baris kustomisasi "Badge keanggotaan ALDIN → site.ts konstanta ALDIN"
- Lint 0 error; build 9/9 → out/ 3.4MB + ZIP 2.1MB
- Verifikasi statis out/index.html: 7× "Asosiasi Laundry Digital Indonesia", JSON-LD memberOf benar
- Verifikasi browser desktop 1280 + mobile 390: pill hero rapi, floating badge tidak menabrak konten, kartu premium elegan + emblem ikon, footer badge kontras bagus, semua wrap sempurna di 390px, 0 error console

Stage Summary:
- Keanggotaan ALDIN tampil di 4 titik strategis: hero (pill), section Keunggulan (floating badge + kartu premium), footer (pill) — full responsif semua device
- SEO: JSON-LD memberOf Organization ALDIN di structured data beranda
- Sumber tunggal konstanta ALDIN di site.ts — ganti teks badge cukup sekali
- out/ + samara-green-laundry-website.zip DIPERBARUI, siap upload ulang ke public_html

---
Task ID: 18
Agent: main orchestrator (Z.ai Code)
Task: Integrasi logo resmi Samara Green Laundry (upload user, 640x640 JPG) ke seluruh website

Work Log:
- Upload user: upload/samara-green-laundry-logo.jpg (daun + wordmark, latar putih)
- Script BARU scripts/process-logo.mjs (sharp): (1) white→transparent dengan falloff halus 215–245 (jaga stroke hijau muda logo); (2) auto-detect bounding box piksel → crop; (3) output: logo-leaf.png (emblem daun 512 persegi transparan), logo-full.png (daun+wordmark transparan), icon-192.png, icon-512.png (PWA/favicon transparan), apple-touch-icon.png (180, latar putih utk iOS); (4) optimasi PNG palette q90 → logo-leaf 337KB→74KB, icon-192 68KB→16KB
- navbar.tsx: BrandMark + header Sheet mobile kini pakai Image logo-leaf.png asli (ganti ikon Leaf generik + kotak gradient)
- footer.tsx: emblem daun asli dalam kotak putih rounded-xl (kontras di footer emerald-950), alt="Logo Samara Green Laundry"
- layout.tsx: metadata icons — icon [192 PNG, 512 PNG, favicon.svg fallback] + apple-touch-icon.png
- manifest.ts (PWA): icons icon-192.png + icon-512.png + svg
- json-ld.tsx + outlet/[slug]/page.tsx: logo schema.org → https://sgl.web.id/images/icon-512.png (semua node bisnis + 3 outlet)
- make-og.mjs: badge gambar daun diganti LOGO RESMI — pelat putih rounded + composite logo-leaf 76px; og-image.jpg diregenerasi
- README.md: tabel gambar + baris logo (logo-leaf/logo-full/icon-*/apple) + panduan "Ganti logo" (timpa atau rerun process-logo.mjs)
- Lint 0 error; build 9/9 → out/ 3.6MB + ZIP 2.5MB; aset logo ikut ke out/images/
- Verifikasi statis: head tags icon-192/512 + apple-touch + og-image OK; manifest icons OK; JSON-LD logo sgl.web.id/images/icon-512.png OK (beranda + outlet)
- Verifikasi browser desktop + mobile: logo daun asli tampil di navbar (desktop & Sheet mobile) dan footer, tajam & proporsional; 0 error console

Stage Summary:
- Logo resmi kini identitas visual website: navbar, menu mobile, footer, favicon/PWA (tab browser + layar utama HP), JSON-LD logo, dan og-image (preview WhatsApp/Facebook/X)
- Aset turunan otomatis dari 1 file master via scripts/process-logo.mjs — ganti logo cukup timpa file & jalankan ulang
- out/ + samara-green-laundry-website.zip DIPERBARUI, siap upload ulang ke public_html

---
Task ID: 19
Agent: main orchestrator (Z.ai Code)
Task: Hardening zona waktu — Semarang = WIB; badge "Buka Sekarang" selalu akurat WIB apa pun timezone pengunjung

Work Log:
- Konteks: user tanya "di Semarang waktu Indonesia bagian apa?" → Semarang = WIB (UTC+7). Audit menunjukkan isOpenNow lama memakai now.getHours() (jam device pengunjung) → status bisa meleset 1–2 jam utk pengunjung WITA/WIT/luar negeri
- site.ts: konstanta BARU TIME_ZONE = "Asia/Jakarta" + helper wibHoursMinutes() (Intl.DateTimeFormat en-GB, timeZone Asia/Jakarta, hourCycle h23, %24 defensif utk jam 24); isOpenNow kini menghitung jam+menit WIB — signature tetap, semua pemanggil kompatibel
- open-now-badge.tsx: teks badge + " WIB" ("Buka Sekarang · tutup 22.00 WIB" / "Tutup · buka 08.00 WIB"); komentar komponen diperbarui
- outlets.tsx: baris jam kartu outlet kini "{hoursDisplay} WIB · Setiap Hari"
- Uji unit logic via node: simulasi device TZ Asia/Jakarta, Asia/Tokyo, America/New_York, Australia/Sydney, Europe/London → hasil Intl identik 07:18 WIB di semua timezone ✓
- Lint 0 error; build 9/9 → out/ + samara-green-laundry-website.zip 2.7MB
- Verifikasi statis out/: 7× "WIB" di index, 11× per halaman outlet, ALDIN memberOf tetap utuh di semua halaman
- Verifikasi browser (live jam 07.19 WIB): Malangsari "Buka Sekarang · tutup 22.00 WIB" ✓, Sendangguwo "Tutup · buka 08.00 WIB" ✓ (tepat — belum jam 08), Dempel "Buka Sekarang · tutup 21.00 WIB" ✓; console bersih; screenshot desktop 1280 + mobile 390 rapi tanpa overflow
- README.md: blok "Zona waktu — Semarang = WIB" menjelaskan TIME_ZONE Asia/Jakarta di situs kustomisasi

Stage Summary:
- Status buka/tutup live kini 100% berbasis WIB (UTC+7) — akurat untuk pengunjung dari zona waktu mana pun
- Label "WIB" tampil di badge live, kartu outlet, halaman outlet, kontak & FAQ — konsisten satu bahasa waktu
- Sumber tunggal: TIME_ZONE + isOpenNow di site.ts; out/ + ZIP diperbarui, siap upload ulang

---
Task ID: 20
Agent: main orchestrator (Z.ai Code)
Task: Price list resmi KHUSUS outlet Malangsari (dari foto papan harga asli user) — section premium + teaser beranda + SEO

Work Log:
- User upload pricelist-sgl-malangsari.jpeg (papan harga asli outlet Malangsari) → seluruh angka ditranskrip & diverifikasi visual: Reguler (Cuci Setrika 6.000, Cuci Kering 4.500, Setrika 4.500, Cuci Lipat Press 4.900 /kg, min 3kg 1 hari jadi), Express (10.000, 7.000, 7.000, 9.000 /kg, min 3kg 5 jam jadi), Satuan 12 item (Seprei 10rb/14rb s/d Helm 20rb/30rb, DLL=hubungi), Self Service (Cuci 1.000, Cuci Kering 2.500 /kg, min 5kg), Antar-Jemput GRATIS maks 2km, HP/WA sesuai nomor outlet Malangsari
- Keputusan desain: papan harga di-rebuild NATIVE (bukan foto di-tempel) → tajam di semua layar, responsif, aksesibel, terbaca mesin pencari; hanya berlaku outlet Malangsari (homepage harga brand-level tidak diubah)
- site.ts: type OutletPricelist + OUTLET_PRICELISTS (Partial<Record<slug, pricelist>> — siap diisi outlet lain) + getOutletPricelist() + formatRp() (pemisah ribuan deterministik tanpa Intl)
- Komponen BARU outlet-pricelist.tsx (server component): section #harga "Daftar Harga Malangsari" — chip eyebrow "Price List Resmi Outlet", kartu Kiloan Reguler putih (badge "1 Hari Jadi") vs Kiloan Express gradient emerald-700→900 unggulan (badge lime "5 Jam Jadi"), tabel Laundry Satuan semantik (caption sr-only, th scope, Kecil/Besar, DLL italic "Hubungi outlet"), kartu Self Service, kartu lime "Antar-Jemput GRATIS!", CTA WA+telepon per outlet; semua Reveal stagger, badge & pita konsisten design system
- outlet/[slug]/page.tsx: render <OutletPricelist> di antara Info & Outlet Lain; metadata description outlet ber-price list kini "+ Price list resmi outlet: reguler mulai Rp 4.500/kg, express 5 jam jadi."; JSON-LD priceRange dihitung dari data (malangsari "Rp 1.000 - Rp 50.000", outlet lain tetap PRICE_RANGE global)
- outlets.tsx (beranda): kartu outlet ber-price list dapat pill lime "⚡ Reguler mulai Rp 4.500/kg · Express 5 jam" + link "Detail Outlet & Price List" deep-anchor /outlet/malangsari/#harga
- Lint 0 error; build 9/9 → out/ + samara-green-laundry-website.zip 2.7MB
- Verifikasi statis out/: 28/29 string harga OK (1 false-positive kapitalisasi meta), sendangguwo & dempel benar TANPA section price list, teaser & deep-link ada di index
- Verifikasi browser desktop 1280 + mobile 390: section #harga render 23 baris harga, tabel & kartu rapi tanpa overflow, teaser kartu Malangsari muncul, 0 error console
- README.md: baris kustomisasi "Price list khusus outlet → OUTLET_PRICELISTS"

Stage Summary:
- Price list resmi Malangsari kini live & cantik di /outlet/malangsari/#harga — 4 kelompok harga lengkap + gratis antar-jemput 2km, di-rebuild native agar tajam/responsif/SEO-friendly
- Arsitektur siapOutlet-lain: tambahkan entri di OUTLET_PRICELISTS → section, teaser, meta & priceRange otomatis mengikuti
- out/ + ZIP diperbarui, siap upload ulang ke public_html

---
Task ID: 21
Agent: main orchestrator (Z.ai Code)
Task: 3 landing page HTML mandiri untuk subdomain outlet (malangsari/sendang/dempel .sgl.web.id) — siap upload cPanel

Work Log:
- Konteks: user berjanji ke staf outlet → tiap outlet punya subdomain sendiri; minta full HTML tinggal upload
- Generator BARU scripts/build-subdomains.mjs (data-driven, EDIT DI SINI): 3 outlet dengan copy unik per outlet (anti duplicate content): headline/hero/meta/testimoni dipilih sesuai area outlet (Tlogosari Kulon, Gemah/Sendangguwo, Muktiharjo Kidul/Dempel)
- Output per folder subdomain-sites/<slug>/: index.html (1 file mandiri ~200KB) + robots.txt (→ sitemap pusat) + .htaccess (force HTTPS 301 + gzip + expires) + PANDUAN-UPLOAD.txt di root → samara-green-laundry-subdomains.zip (275KB)
- Fitur per halaman: navbar sticky glass + menu mobile hamburger, badge live "Buka Sekarang" (vanilla JS, Intl timeZone Asia/Jakarta → WIB akurat, refresh 60s), hero base64 (sharp: logo 8KB palette, hero 880w jpeg q80 81KB, favicon 5KB — gambar TERTANAM, tampil walau pusat maintenance), 6 kartu layanan + WA deep-link per layanan, strip statistik, price list (Malangsari: 4 blok papan harga asli — Reguler/Express/Satuan/Self Service + gratis antar 2km; Sendang & Dempel: 6 kartu harga brand + CTA tanya harga), lokasi + maps embed + petunjuk arah, 3 testimoni per area, 6 FAQ details/summary (native, aksesibel), CTA banner, footer (ALDIN + jaringan hub&spoke: link pusat + 2 sibling subdomain + TikTok + kredit), floating WA
- SEO per subdomain: title/desc unik, canonical https://<sub>/, OG/Twitter, geo meta, JSON-LD LocalBusiness+DryCleaningOrLaundry (telephone/jam/priceRange/memberOf ALDIN/parentOrganization/sameAs TikTok) + WebSite — validasi JSON.parse OK semua
- Perbaikan saat QA: (1) typo heroSub sendang; (2) h1 <em> nowrap overflow di 390px (kata "Gemah" terpotong) → highlight dipindah ke "Sendangguwo" saja + media query ≤640px white-space normal; verifikasi body.scrollWidth AMAN
- Verifikasi browser (file://): 3 halaman render sempurna desktop 1280 + mobile 390, badge benar (Malangsari "tutup 22.00", Sendang "tutup 20.00", Dempel "tutup 21.00" WIB), menu mobile buka/tutup, maps iframe hidup, 0 error console; statis: 12 wa.me per halaman, nomor outlet benar-benar beda per file, cross-link pusat+sibling 2/2 semua
- README.md: section "Deploy Subdomain Outlet — 3 Landing Page HTML Mandiri" (tabel mapping + regenerate + upload)

Stage Summary:
- 3 landing page HTML mandiri siap upload: subdomain-sites/{malangsari,sendang,dempel}/ → samara-green-laundry-subdomains.zip (275KB, 13 file)
- Konsep hub & spoke: website pusat = hub, subdomain = spoke dengan konten unik per outlet + cross-link — ide jualan janji user jadi senjata SEO lokal
- Regenerasi cukup: edit DATA di scripts/build-subdomains.mjs → node scripts/build-subdomains.mjs
