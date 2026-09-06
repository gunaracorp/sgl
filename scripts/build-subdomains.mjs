#!/usr/bin/env node
/**
 * ============================================================
 * GENERATOR LANDING PAGE SUBDOMAIN OUTLET — Samara Green Laundry
 * ============================================================
 * Membangun 3 landing page HTML mandiri (satu file, CSS+JS inline)
 * untuk subdomain per outlet:
 *   https://malangsari.sgl.web.id   → subdomain-sites/malangsari/index.html
 *   https://sendang.sgl.web.id      → subdomain-sites/sendang/index.html
 *   https://dempel.sgl.web.id       → subdomain-sites/dempel/index.html
 *
 * Cara pakai:  node scripts/build-subdomains.mjs
 * Output     : folder subdomain-sites/ + samara-green-laundry-subdomains.zip
 *
 * Gambar & font di-hotlink dari website pusat (sgl.web.id) sehingga
 * setiap halaman cukup 1 file index.html — tanpa upload gambar.
 * Semua angka penting (nomor WA, jam, harga) ada di bagian DATA di bawah.
 * ============================================================
 */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const MAIN = "https://sgl.web.id";
const img = (f) => `${MAIN}/images/${f}`;
const TIKTOK = "https://www.tiktok.com/@samaragreenlaundry04";
const ALDIN_NAME = "Asosiasi Laundry Digital Indonesia";

/* ═══════════════════════════ DATA OUTLET (EDIT DI SINI) ═══════════════════════════ */
const OUTLETS = [
  {
    slug: "malangsari",
    subdomain: "malangsari.sgl.web.id",
    name: "Samara Green Laundry Malangsari",
    shortName: "Malangsari",
    area: "Tlogosari Kulon",
    district: "Pedurungan",
    streetAddress: "Jl. Malangsari No. 22",
    addressLines: [
      "Jl. Malangsari No. 22",
      "Kel. Tlogosari Kulon, Kec. Pedurungan",
      "Kota Semarang, Jawa Tengah 50196",
    ],
    phoneDisplay: "0851-1754-1083",
    phoneIntl: "+6285117541083",
    open: 7,
    close: 22,
    hoursDisplay: "07.00 – 22.00",
    mapsQuery:
      "Jl. Malangsari No. 22, Tlogosari Kulon, Pedurungan, Kota Semarang, Jawa Tengah 50196",
    metaDesc:
      "Samara Green Laundry Malangsari — laundry kiloan, satuan, setrika & antar-jemput di Tlogosari Kulon, Pedurungan, Semarang. Buka setiap hari 07.00–22.00 WIB. Price list reguler mulai Rp4.500/kg, express 5 jam jadi. WhatsApp 0851-1754-1083.",
    headline: 'Laundry <em>Tlogosari Kulon</em> —<br/>Bersih, Segar, Bebas Repot.',
    heroSub:
      "Outlet pusat Samara Green Laundry di Jl. Malangsari No. 22. Cuci kilat express 5 jam, deterjen nabati eco-friendly, dan antar-jemput GRATIS maks 2 km — buka setiap hari pukul 07.00–22.00 WIB.",
    expressCard: "⚡ Express 5 Jam Jadi",
    priceMode: "full",
    priceRange: "Rp 1.000 - Rp 50.000",
    testimonials: [
      {
        name: "Ibu Ratna Dewi",
        initials: "RD",
        area: "Tlogosari Kulon",
        stars: 5,
        service: "Cuci Kering Setrika",
        quote:
          "Langganan tiap minggu di outlet Tlogosari Kulon. Cucian dijemput pagi, besoknya sudah sampai rumah dalam keadaan lipat rapi dan wangi. Mulai 6.500-an dapat kualitas gini, worth it banget!",
      },
      {
        name: "Rudi Hartono",
        initials: "RH",
        area: "Tlogosari Kulon",
        stars: 5,
        service: "Paket Hemat",
        quote:
          "Cuci kering cuma 4.500/kg di outlet Malangsari, hasilnya bersih dan nggak bau apek. Buat seragam kerja harian paling cocok. Hemat banget!",
      },
      {
        name: "Ibu Nur Aini",
        initials: "NA",
        area: "Tlogosari Kulon",
        stars: 5,
        service: "Cuci Bersih",
        quote:
          "Cuci bersih 1 ribu per kilo? Awalnya saya nggak percaya. Ternyata beneran ada, cucian sehari-hari jadi bersih dan wangi. Mantap!",
      },
    ],
  },
  {
    slug: "sendang",
    subdomain: "sendang.sgl.web.id",
    name: "Samara Green Laundry Sendangguwo",
    shortName: "Sendangguwo",
    area: "Gemah",
    district: "Pedurungan",
    streetAddress: "Jl. Sendangguwo Selatan No. 24",
    addressLines: [
      "Jl. Sendangguwo Selatan No. 24",
      "Kel. Gemah, Kec. Pedurungan",
      "Kota Semarang, Jawa Tengah 50246",
    ],
    phoneDisplay: "0851-3747-3412",
    phoneIntl: "+6285137473412",
    open: 8,
    close: 20,
    hoursDisplay: "08.00 – 20.00",
    mapsQuery:
      "Jl. Sendangguwo Selatan No. 24, Gemah, Pedurungan, Kota Semarang, Jawa Tengah 50246",
    metaDesc:
      "Samara Green Laundry Sendangguwo — laundry kiloan, satuan, setrika & antar-jemput di Gemah, Sendangguwo, Pedurungan, Semarang. Buka setiap hari 08.00–20.00 WIB. Harga mulai Rp1.000/kg. WhatsApp 0851-3747-3412.",
    headline: 'Laundry <em>Sendangguwo</em> &amp; Gemah —<br/>Kilat, Hemat, Terpercaya.',
    heroSub:
      "Outlet Samara Green Laundry di Jl. Sendangguwo Selatan No. 24. Deterjen nabati eco-friendly, kurir antar-jemput yang ramah, dan harga mulai Rp1.000/kg — buka setiap hari pukul 08.00–20.00 WIB.",
    expressCard: "⚡ Kilat Express 6 Jam",
    priceMode: "simple",
    priceRange: "Rp 1.000 - Rp 35.000",
    testimonials: [
      {
        name: "Nadia Putri",
        initials: "NP",
        area: "Sendangguwo",
        stars: 5,
        service: "Antar-Jemput",
        quote:
          "Admin fast respon di WhatsApp, malam pun dibalas. Kurirnya juga ramah. Kulit saya sensitif tapi nggak gatal sama sekali — deterjennya memang beda.",
      },
      {
        name: "Bagas Prasetyo",
        initials: "BP",
        area: "Gemah",
        stars: 5,
        service: "Kilat Express",
        quote:
          "Order kilat jam 8 pagi, jam 2 sore seragam sudah siap dipakai. Penyelamat banget buat anak kos yang segala sesuatunya dadakan.",
      },
      {
        name: "Ibu Lestari",
        initials: "LS",
        area: "Gemah",
        stars: 5,
        service: "Cuci Boneka",
        quote:
          "Koleksi boneka anak saya ada 6, semuanya balik seperti baru dan wangi. Harganya masuk akal, hasilnya memuaskan. Pasti titip lagi.",
      },
    ],
  },
  {
    slug: "dempel",
    subdomain: "dempel.sgl.web.id",
    name: "Samara Green Laundry Dempel",
    shortName: "Dempel",
    area: "Muktiharjo Kidul",
    district: "Pedurungan",
    streetAddress: "Jl. Dempel Mukti Raya",
    addressLines: [
      "Jl. Dempel Mukti Raya — Depan SMP Walisongo",
      "Kel. Muktiharjo Kidul, Kec. Pedurungan",
      "Kota Semarang, Jawa Tengah 50173",
    ],
    phoneDisplay: "0851-3747-3409",
    phoneIntl: "+6285137473409",
    open: 7,
    close: 21,
    hoursDisplay: "07.00 – 21.00",
    mapsQuery:
      "Jl. Dempel Mukti Raya, Muktiharjo Kidul, Pedurungan, Kota Semarang, Jawa Tengah 50173",
    metaDesc:
      "Samara Green Laundry Dempel — laundry kiloan, satuan, setrika & antar-jemput di Muktiharjo Kidul, Pedurungan, Semarang, persis di depan SMP Walisongo. Buka setiap hari 07.00–21.00 WIB. Harga mulai Rp1.000/kg. WhatsApp 0851-3747-3409.",
    headline: 'Laundry <em>Dempel</em> —<br/>Persis di Depan SMP Walisongo.',
    heroSub:
      "Outlet Samara Green Laundry di Jl. Dempel Mukti Raya, tepat di depan SMP Walisongo — gampang banget mampir. Deterjen nabati eco-friendly, antar-jemput gratis area terdekat, buka setiap hari 07.00–21.00 WIB.",
    expressCard: "⚡ Kilat Express 6 Jam",
    priceMode: "simple",
    priceRange: "Rp 1.000 - Rp 35.000",
    testimonials: [
      {
        name: "Ibu Endang S.",
        initials: "ES",
        area: "Dempel",
        stars: 5,
        service: "Stroller",
        quote:
          "Outletnya persis di depan SMP Walisongo jadi gampang sekali. Stroller si kecil dicuci sampai steril, paddingnya wangi. Tenang hati.",
      },
      {
        name: "Ibu Sri Wahyuni",
        initials: "SW",
        area: "Muktiharjo Kidul",
        stars: 5,
        service: "Bed Cover",
        quote:
          "Bed cover king size yang tebal itu wangi dan lembut lagi. Alergi saya nggak kambuh setelah dipakai — tungaunya benar-benar mati.",
      },
      {
        name: "Yoga Saputra",
        initials: "YS",
        area: "Muktiharjo Kidul",
        stars: 5,
        service: "Antar-Jemput",
        quote:
          "Pulang kerja tiap malam, nggak mungkin nyuci sendiri. Tinggal chat, kurir jemput, dua hari kemudian sudah di depan pintu. Live saver!",
      },
    ],
  },
];

/** Harga brand-level untuk mode "simple" (Sendangguwo & Dempel). */
const SIMPLE_PRICES = [
  { icon: "🫧", name: "Cuci Bersih", price: "Rp 1.000", unit: "/kg", desc: "Cuci higienis + kering angin — paling hemat untuk cucian harian.", feat: false },
  { icon: "💧", name: "Cuci Kering", price: "Rp 2.500", unit: "/kg", desc: "Cuci + pengeringan mesin — langsung siap pakai tanpa setrika.", feat: false },
  { icon: "👕", name: "Cuci Kering Lipat", price: "Rp 4.500", unit: "/kg", desc: "Cuci + kering + dilipat rapi — tampung rapi tanpa perlu setrika.", feat: false },
  { icon: "✨", name: "Cuci Kering Setrika", price: "mulai Rp 6.500", unit: "/kg", desc: "Komplit sampai rapi ter setrika — siap masuk lemari.", feat: true },
  { icon: "👟", name: "Cuci Sepatu & Tas", price: "mulai Rp 20.000", unit: "/pair", desc: "Perawatan detail — sol sampai jahitan dibersihkan.", feat: false },
  { icon: "🧥", name: "Dry Cleaning Premium", price: "mulai Rp 20.000", unit: "/item", desc: "Untuk bahan halus & pakaian spesial — jas, gaun, kebaya.", feat: false },
];

/** Price list lengkap Malangsari — identik dengan papan harga di outlet. */
const MALANGSARI_PRICES = {
  reguler: [
    ["Cuci Setrika", "Rp 6.000/kg"],
    ["Cuci Kering", "Rp 4.500/kg"],
    ["Setrika", "Rp 4.500/kg"],
    ["Cuci Lipat Press", "Rp 4.900/kg"],
  ],
  regulerNote: "Semua layanan reguler minimal 3 kg · selesai 1 hari",
  express: [
    ["Cuci Setrika", "Rp 10.000/kg"],
    ["Cuci Kering", "Rp 7.000/kg"],
    ["Setrika", "Rp 7.000/kg"],
    ["Cuci Lipat Press", "Rp 9.000/kg"],
  ],
  expressNote: "Semua layanan express minimal 3 kg · selesai 5 jam",
  satuan: [
    ["Seprei", "Rp 10.000", "Rp 14.000"],
    ["Selimut", "Rp 11.000", "Rp 16.000"],
    ["Bed Cover", "Rp 20.000", "Rp 30.000"],
    ["Tas", "Rp 25.000", "Rp 40.000"],
    ["Sepatu", "Rp 25.000", "Rp 40.000"],
    ["Seragam", "Rp 10.000", "Rp 15.000"],
    ["Boneka", "Rp 25.000", "Rp 50.000"],
    ["Jas", "Rp 20.000", "Rp 30.000"],
    ["Gorden", "Rp 15.000", "Rp 25.000"],
    ["Karpet", "Rp 11.000", "Rp 20.000"],
    ["Helm", "Rp 20.000", "Rp 30.000"],
    ["DLL", "Hubungi", "outlet"],
  ],
  selfService: [
    ["Cuci", "Rp 1.000/kg"],
    ["Cuci Kering", "Rp 2.500/kg"],
  ],
  selfServiceNote: "Semua layanan self service minimal 5 kg · mandiri di outlet",
};

const SERVICES = [
  ["👕", "Cuci Kering Setrika", "Paket komplit harian — dicuci, dikeringkan, disetrika rapi siap lemari."],
  ["⚡", "Cuci Kilat Express", "Butuh cepat? Prioritas pengerjaan — selesai dalam hitungan jam."],
  ["🧥", "Dry Cleaning Premium", "Perawatan khusus bahan halus: jas, gaun, kebaya, dan pakaian spesial."],
  ["👟", "Cuci Sepatu & Tas", "Sneakers, kulit, kanvas — dibersihkan detail sampai jahitan dan sol."],
  ["🛏️", "Bed Cover & Selimut", "Sprei, bed cover, selimut tebal — balik wangi, lembut, bebas tungau."],
  ["🧸", "Cuci Boneka & Stroller", "Amunisi si kecil dicuci higienis & steril — aman untuk kulit bayi."],
];

const pad = (n) => (n < 10 ? "0" : "") + n;
const wa = (o, msg) =>
  `https://wa.me/${o.phoneIntl.replace("+", "")}?text=${encodeURIComponent(msg)}`;

/* ═══ Aset tertanam base64 — halaman 100% mandiri (tampil walau situs utama maintenance) ═══ */
const LOGO_DATA = `data:image/png;base64,${(
  await sharp("public/images/logo-leaf.png")
    .resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ palette: true, quality: 90, compressionLevel: 9 })
    .toBuffer()
).toString("base64")}`;
const HERO_DATA = `data:image/jpeg;base64,${(
  await sharp("public/images/hero-laundry.png")
    .resize({ width: 880 })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer()
).toString("base64")}`;
const FAVICON_DATA = `data:image/png;base64,${(
  await sharp("public/images/icon-512.png")
    .resize(64, 64, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ palette: true, quality: 90 })
    .toBuffer()
).toString("base64")}`;
console.log(
  `aset tertanam — logo: ${(LOGO_DATA.length / 1024).toFixed(0)}KB, hero: ${(HERO_DATA.length / 1024).toFixed(0)}KB, favicon: ${(FAVICON_DATA.length / 1024).toFixed(0)}KB`
);

/* ═══════════════════════════ CSS (design system inline) ═══════════════════════════ */
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --g950:#022c22;--g900:#064e3b;--g800:#065f46;--g700:#047857;--g600:#059669;--g500:#10b981;
  --g100:#d1fae5;--g50:#ecfdf5;--l300:#bef264;--l200:#d9f99d;--l100:#ecfccb;--l50:#f7fee7;
  --l900:#365314;--l800:#3f6212;--ink:#1c1917;--mut:#57534e;--soft:#78716c;--line:#e7e5e4;
  --bg:#fbfcf9;--card:#ffffff;--rad:24px;--sh:0 10px 30px -12px rgba(2,44,34,.14);
  --sh-lg:0 24px 60px -24px rgba(2,44,34,.28);
}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
section[id],div[id]{scroll-margin-top:88px}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
.skip{position:absolute;left:-999px;top:0;background:var(--g900);color:#fff;padding:10px 16px;border-radius:0 0 12px 0;z-index:99}
.skip:focus{left:0}
/* ---------- header ---------- */
.site-head{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(6,78,59,.08);transition:box-shadow .3s}
.site-head.scrolled{box-shadow:0 8px 24px -16px rgba(2,44,34,.25)}
.head-in{display:flex;align-items:center;gap:18px;height:72px}
.brand{display:flex;align-items:center;gap:10px;min-width:0}
.brand img{width:42px;height:42px;border-radius:12px;object-fit:contain}
.brand-t{font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--g900);line-height:1.1}
.brand-t b{color:var(--g600)}
.brand-t small{display:block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--g600)}
.nav{display:flex;gap:26px;margin-left:auto}
.nav a{font-size:14.5px;font-weight:700;color:var(--mut);transition:color .2s}
.nav a:hover{color:var(--g700)}
.head-cta{white-space:nowrap}
.burger{display:none;margin-left:auto;width:46px;height:46px;border:1.5px solid var(--line);border-radius:14px;background:#fff;cursor:pointer;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.burger span{width:20px;height:2px;background:var(--g900);border-radius:2px;transition:.25s}
/* ---------- buttons & chips ---------- */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:48px;padding:0 24px;border-radius:999px;font-weight:800;font-size:15px;transition:transform .2s,box-shadow .2s,background .2s;cursor:pointer;border:0}
.btn svg{width:19px;height:19px;flex:none}
.btn-solid{background:linear-gradient(135deg,var(--g600),var(--g700));color:#fff;box-shadow:0 12px 26px -12px rgba(5,150,105,.55)}
.btn-solid:hover{transform:translateY(-2px);box-shadow:0 18px 32px -12px rgba(5,150,105,.6)}
.btn-outline{background:#fff;border:1.5px solid var(--g100);color:var(--g800)}
.btn-outline:hover{border-color:var(--g500);background:var(--g50)}
.btn-lg{min-height:54px;padding:0 30px;font-size:16px}
.pill{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;border:1px solid var(--g100);background:rgba(255,255,255,.8);font-size:12.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--g700)}
.pill svg{width:15px;height:15px}
/* ---------- badge live WIB ---------- */
.badge{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;font-size:12.5px;font-weight:800}
.badge-open{background:var(--l50);color:var(--l800);box-shadow:inset 0 0 0 1.5px var(--l200)}
.badge-open .dot{position:relative;width:9px;height:9px;border-radius:50%;background:var(--g600)}
.badge-open .dot::after{content:"";position:absolute;inset:-4px;border-radius:50%;background:var(--g500);opacity:.5;animation:ping 1.6s cubic-bezier(0,0,.2,1) infinite}
.badge-closed{background:#f5f5f4;color:var(--soft);box-shadow:inset 0 0 0 1.5px var(--line)}
@keyframes ping{75%,100%{transform:scale(2);opacity:0}}
/* ---------- hero ---------- */
.hero{position:relative;overflow:hidden;background:linear-gradient(180deg,#f6faf3 0%,var(--g50) 100%)}
.hero::before{content:"";position:absolute;width:520px;height:520px;border-radius:50%;background:var(--g100);filter:blur(110px);opacity:.55;top:-180px;left:-160px}
.hero::after{content:"";position:absolute;width:420px;height:420px;border-radius:50%;background:var(--l100);filter:blur(110px);opacity:.6;bottom:-160px;right:-120px}
.hero-grid{position:relative;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center;padding:64px 20px 84px}
h1{font-size:clamp(34px,4.6vw,54px);line-height:1.1;letter-spacing:-.03em;font-weight:800;color:var(--g950);margin:22px 0 0}
h1 em{font-style:normal;position:relative;white-space:nowrap}
h1 em::after{content:"";position:absolute;left:-4px;right:-4px;bottom:4px;height:.42em;background:var(--l300);border-radius:6px;z-index:-1;transform:rotate(-1deg)}
@media (max-width:640px){h1 em{white-space:normal;overflow-wrap:anywhere}h1 em::after{height:.32em}}
.lead{margin-top:20px;font-size:17px;color:var(--mut);max-width:34em}
.badge-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:24px}
.hours{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--mut)}
.cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:30px}
.trust-row{display:flex;flex-wrap:wrap;gap:12px 22px;margin-top:30px}
.aldin{display:inline-flex;align-items:center;gap:9px;background:#fff;border:1px solid var(--g100);border-radius:16px;padding:9px 15px;font-size:12.5px;font-weight:800;color:var(--g900);box-shadow:0 6px 18px -10px rgba(2,44,34,.2)}
.aldin svg{width:20px;height:20px;color:var(--g600);flex:none}
.rate{display:inline-flex;align-items:center;gap:8px;font-size:13.5px;font-weight:700;color:var(--mut)}
.rate b{color:var(--l800);letter-spacing:2px}
.hero-visual{position:relative}
.hero-visual>img{border-radius:34px;box-shadow:var(--sh-lg);border:1px solid rgba(6,78,59,.12)}
.float-card{position:absolute;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.7);border-radius:18px;padding:13px 18px;font-size:14px;font-weight:800;color:var(--g950);box-shadow:var(--sh);animation:float 5.5s ease-in-out infinite}
.float-card small{display:block;font-size:11.5px;font-weight:600;color:var(--soft)}
.fc1{top:22px;left:-14px}
.fc2{bottom:-16px;right:-8px;animation-delay:1.4s}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
/* ---------- sections ---------- */
.sec{padding:84px 0}
.sec-head{max-width:620px;margin:0 auto 52px;text-align:center}
.sec-head h2{font-size:clamp(26px,3.4vw,38px);letter-spacing:-.025em;font-weight:800;color:var(--g950);margin-top:16px}
.sec-head h2 span{color:var(--g600)}
.sec-head p{margin-top:14px;color:var(--mut);font-size:16px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.card{background:var(--card);border:1px solid rgba(6,78,59,.09);border-radius:var(--rad);padding:28px;box-shadow:var(--sh)}
/* services */
.svc{transition:transform .25s,box-shadow .25s}
.svc:hover{transform:translateY(-5px);box-shadow:var(--sh-lg)}
.svc-ico{display:grid;place-items:center;width:56px;height:56px;border-radius:18px;background:var(--g50);border:1px solid var(--g100);font-size:26px}
.svc h3{font-size:17.5px;font-weight:800;color:var(--g950);margin-top:18px;letter-spacing:-.01em}
.svc p{margin-top:9px;font-size:14px;color:var(--mut)}
.svc a{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:13.5px;font-weight:800;color:var(--g700)}
.svc a:hover{color:var(--g600)}
/* stats */
.stats{background:linear-gradient(135deg,var(--g950),var(--g900));border-radius:32px;padding:44px 30px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px;text-align:center;box-shadow:var(--sh-lg)}
.stats b{display:block;font-size:clamp(26px,3vw,36px);font-weight:800;color:var(--l300);letter-spacing:-.02em}
.stats span{display:block;margin-top:6px;font-size:13px;font-weight:700;color:#a7f3d0;opacity:.85}
/* pricing */
.price-sec{background:linear-gradient(180deg,#fff,var(--g50))}
.pcard{position:relative;overflow:hidden}
.pcard.feat{background:linear-gradient(150deg,var(--g700),var(--g950));border:0;color:#fff;box-shadow:var(--sh-lg)}
.pcard.feat .pname,.pcard.feat .pval{color:#fff}
.pcard.feat .prow{border-color:rgba(255,255,255,.16)}
.pcard.feat .prow b{color:var(--l300)}
.ptag{position:absolute;top:20px;right:20px;padding:6px 13px;border-radius:999px;font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;background:var(--l300);color:var(--g950)}
.pcard:not(.feat) .ptag{background:#f5f5f4;color:var(--soft)}
.pico{display:grid;place-items:center;width:52px;height:52px;border-radius:16px;background:var(--g50);border:1px solid var(--g100);font-size:24px}
.pcard.feat .pico{background:rgba(190,242,100,.16);border-color:rgba(190,242,100,.3)}
.pname{font-size:18px;font-weight:800;color:var(--g950)}
.punit{font-size:12.5px;font-weight:700;color:var(--soft)}
.pcard.feat .punit{color:#a7f3d0}
.phead{display:flex;align-items:center;gap:15px}
.prows{margin-top:20px}
.prow{display:flex;justify-content:space-between;gap:14px;align-items:baseline;padding:12px 0;border-bottom:1.5px dashed var(--line);font-size:14.5px}
.prow:last-child{border-bottom:0}
.prow span{font-weight:600;color:var(--mut)}
.prow b{font-weight:800;color:var(--g800);white-space:nowrap}
.pnote{margin-top:16px;padding:12px 16px;border-radius:14px;font-size:12.5px;font-weight:700;line-height:1.55}
.pnote-g{background:var(--g50);color:var(--g900);box-shadow:inset 0 0 0 1.5px var(--g100)}
.pcard.feat .pnote-g{background:rgba(255,255,255,.09);color:#d1fae5;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.16)}
.ptable{width:100%;border-collapse:collapse;margin-top:20px;font-size:14.5px}
.ptable th{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--soft);text-align:right;padding-bottom:10px;border-bottom:2px solid var(--g100)}
.ptable th:first-child{text-align:left}
.ptable td{padding:11px 0;border-bottom:1.5px dashed var(--line);text-align:right;font-weight:800;color:var(--g800);white-space:nowrap}
.ptable td:first-child{text-align:left;font-weight:600;color:var(--mut)}
.ptable tr:last-child td{border-bottom:0}
.ptable tr.mut td{color:var(--soft);font-weight:500;font-style:italic;font-size:13px}
.pside{display:grid;gap:22px;align-content:start}
.free-del{background:var(--l50);border:1.5px solid var(--l200);border-radius:var(--rad);padding:26px}
.free-del h3{display:flex;align-items:center;gap:12px;font-size:18px;font-weight:800;color:var(--l900)}
.free-del h3 i{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:var(--l200);font-style:normal;font-size:22px}
.free-del p{margin-top:12px;font-size:14px;color:var(--l900);font-weight:600}
.price-caution{max-width:620px;margin:34px auto 0;text-align:center;font-size:13px;color:var(--soft)}
/* location */
.loc-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:26px;align-items:stretch}
.loc-info h3{font-size:22px;font-weight:800;color:var(--g950);letter-spacing:-.01em}
.loc-row{display:flex;gap:12px;margin-top:18px;font-size:14.5px;color:var(--mut)}
.loc-row svg{width:20px;height:20px;color:var(--g600);flex:none;margin-top:2px}
.loc-row b{color:var(--ink)}
.loc-phone{display:inline-flex;font-size:22px;font-weight:800;color:var(--g700);margin-top:4px}
.loc-phone:hover{color:var(--g600)}
.loc-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.map-box{border-radius:var(--rad);overflow:hidden;border:1px solid rgba(6,78,59,.12);box-shadow:var(--sh-lg);min-height:360px}
.map-box iframe{width:100%;height:100%;min-height:360px;border:0}
/* testimonials */
.testi-sec{background:linear-gradient(180deg,var(--g50),#fff)}
.tcard .quote-mark{font-size:34px;line-height:1;color:var(--l300);font-weight:800;font-family:Georgia,serif}
.tcard blockquote{margin-top:10px;font-size:14.5px;color:var(--mut)}
.stars{color:#f59e0b;letter-spacing:2px;font-size:15px}
.tmeta{display:flex;align-items:center;gap:13px;margin-top:20px;border-top:1.5px dashed var(--line);padding-top:18px}
.avatar{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--g100),var(--l100));color:var(--g800);font-weight:800;font-size:14px}
.tmeta b{display:block;font-size:14.5px;color:var(--g950)}
.tmeta span{font-size:12.5px;color:var(--soft);font-weight:600}
.tchip{margin-left:auto;padding:6px 12px;border-radius:999px;background:var(--g50);border:1px solid var(--g100);font-size:11.5px;font-weight:800;color:var(--g700);white-space:nowrap}
/* faq */
details.faq{background:#fff;border:1.5px solid rgba(6,78,59,.1);border-radius:20px;padding:0 24px;margin-bottom:14px;transition:border-color .2s}
details.faq[open]{border-color:var(--g500);box-shadow:var(--sh)}
details.faq summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;font-size:15.5px;font-weight:800;color:var(--g950);cursor:pointer}
details.faq summary::-webkit-details-marker{display:none}
.fq-ico{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:10px;background:var(--g50);color:var(--g700);font-size:18px;font-weight:800;transition:transform .25s}
details.faq[open] .fq-ico{transform:rotate(45deg);background:var(--g600);color:#fff}
.faq-body{padding:0 0 22px;font-size:14.5px;color:var(--mut)}
/* cta banner */
.cta-banner{position:relative;overflow:hidden;background:linear-gradient(140deg,var(--g700),var(--g950));border-radius:36px;padding:clamp(40px,6vw,72px);text-align:center;color:#fff;box-shadow:var(--sh-lg)}
.cta-banner::before{content:"";position:absolute;width:340px;height:340px;border-radius:50%;background:rgba(190,242,100,.14);filter:blur(70px);top:-120px;right:-80px}
.cta-banner h2{position:relative;font-size:clamp(26px,3.6vw,40px);font-weight:800;letter-spacing:-.02em}
.cta-banner p{position:relative;margin:16px auto 0;max-width:34em;color:#d1fae5;font-size:16px}
.cta-banner .cta-row{position:relative;justify-content:center}
.btn-lime{background:var(--l300);color:var(--g950);box-shadow:0 14px 30px -12px rgba(190,242,100,.5)}
.btn-lime:hover{transform:translateY(-2px)}
/* footer */
footer{background:var(--g950);color:#a7f3d0;margin-top:0}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:40px;padding:64px 0 40px}
.foot-brand img{width:46px;height:46px;border-radius:12px;background:#fff;padding:5px;object-fit:contain}
.foot-brand p{margin-top:16px;font-size:13.5px;max-width:30em}
.aldin-foot{display:inline-flex;align-items:center;gap:8px;margin-top:18px;padding:8px 14px;border-radius:12px;background:rgba(255,255,255,.07);font-size:12px;font-weight:800;color:var(--l300)}
footer h4{font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#fff;margin-bottom:18px}
.foot-links{list-style:none;display:grid;gap:11px;font-size:14px}
.foot-links a:hover{color:#fff}
.foot-links small{display:block;font-size:11.5px;opacity:.7}
.foot-bottom{border-top:1px solid rgba(255,255,255,.1);padding:22px 0;display:flex;flex-wrap:wrap;gap:10px 24px;justify-content:space-between;font-size:12.5px}
.foot-bottom a{color:var(--l300);font-weight:700}
/* floating wa */
.fab{position:fixed;right:18px;bottom:18px;z-index:60;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:#22c55e;color:#fff;box-shadow:0 16px 34px -10px rgba(34,197,94,.65);transition:transform .2s}
.fab:hover{transform:scale(1.08)}
.fab svg{width:29px;height:29px}
.fab::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #22c55e;animation:ping 2s cubic-bezier(0,0,.2,1) infinite}
/* reveal */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
.d1{transition-delay:.12s}.d2{transition-delay:.24s}.d3{transition-delay:.36s}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.reveal{opacity:1;transform:none}}
/* ---------- responsive ---------- */
@media (max-width:960px){
  .hero-grid{grid-template-columns:1fr;gap:44px;padding:48px 20px 72px}
  .grid-3{grid-template-columns:repeat(2,1fr)}
  .loc-grid,.grid-2{grid-template-columns:1fr}
  .stats{grid-template-columns:repeat(2,1fr);gap:28px}
  .foot-grid{grid-template-columns:1fr 1fr}
  .nav{position:absolute;top:72px;left:0;right:0;flex-direction:column;gap:0;background:#fff;border-bottom:1px solid var(--line);padding:10px 20px 16px;display:none;box-shadow:var(--sh)}
  .nav.open{display:flex}
  .nav a{padding:13px 4px;border-bottom:1px dashed var(--line);font-size:15px}
  .nav a:last-child{border-bottom:0}
  .burger{display:flex}
  .head-cta{display:none}
}
@media (max-width:640px){
  .sec{padding:64px 0}
  .grid-3{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr;gap:32px}
  .fc1{left:-4px}.fc2{right:-4px}
  .fab{width:54px;height:54px;bottom:14px;right:14px}
}
`;

/* ═══════════════════════════ helpers ═══════════════════════════ */
const WA_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.87-9.9 9.87Zm8.42-18.29A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.47-8.41Z"/></svg>';
const PIN_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
const SHIELD_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/></svg>';
const CLOCK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
const PHONE_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>';
const NAV_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>';
const stars5 = (n) => "★".repeat(n) + "☆".repeat(5 - n);

function faqFor(o) {
  const others = OUTLETS.filter((x) => x.slug !== o.slug)
    .map((x) => `<a href="https://${x.subdomain}/">${x.shortName}</a>`)
    .join(" · ");
  return [
    [
      "Jam operasional outlet ini kapan saja?",
      `Outlet ${o.shortName} buka SETIAP HARI, Senin–Minggu, pukul ${o.hoursDisplay} WIB (Waktu Indonesia Barat). Status buka/tutup realtime bisa kamu lihat di bagian atas halaman ini.`,
    ],
    [
      "Apakah ada layanan antar-jemput?",
      `Ada! Antar-jemput GRATIS untuk area sekitar ${o.area} dan ${o.district}.${o.slug === "malangsari" ? " Khusus outlet Malangsari radius gratis maks 2 km." : ""} Cukup chat WhatsApp, kurir kami yang jemput dan antar cucianmu.`,
    ],
    [
      "Berapa harga layanannya?",
      o.slug === "malangsari"
        ? `Price list resmi outlet Malangsari: kiloan reguler mulai Rp4.500/kg (cuci kering), cuci setrika Rp6.000/kg, dan express 5 jam mulai Rp7.000/kg. Price list lengkap ada di bagian <a href="#harga">Price List</a> halaman ini.`
        : `Harga mulai Rp1.000/kg untuk cuci bersih. Karena promo tiap outlet bisa berbeda, konfirmasi harga terbaru langsung via WhatsApp ${o.phoneDisplay} — fast respon kok.`,
    ],
    [
      "Deterjennya aman untuk kulit sensitif?",
      "Aman! Kami memakai deterjen nabati eco-friendly bebas fosfat dengan pewangi alami — ramah untuk kulit sensitif, bayi, dan lingkungan.",
    ],
    [
      "Bagaimana cara pembayarannya?",
      "Pembayaran bisa Tunai, QRIS, atau Transfer Bank — dilakukan SETELAH cucian selesai. Tanpa DP, tanpa biaya tersembunyi.",
    ],
    [
      "Ada outlet Samara lain di Semarang?",
      `Ada! Jaringan kami: outlet ${others} — dan website pusat di <a href="${MAIN}">sgl.web.id</a>. Semua outlet buka setiap hari.`,
    ],
  ];
}

function priceSection(o) {
  if (o.priceMode === "full") {
    const P = MALANGSARI_PRICES;
    const rows = (arr) =>
      arr.map(([n, p]) => `<div class="prow"><span>${n}</span><b>${p}</b></div>`).join("");
    const satuanRows = P.satuan
      .map(
        ([n, k, b]) =>
          `<tr${n === "DLL" ? ' class="mut"' : ""}><td>${n}</td><td>${k}</td><td>${b}</td></tr>`
      )
      .join("");
    return `
    <div class="grid-2 reveal">
      <div class="card pcard">
        <span class="ptag">1 Hari Jadi</span>
        <div class="phead"><span class="pico">🫧</span><div><div class="pname">Kiloan Reguler</div><div class="punit">per kilo · /kg</div></div></div>
        <div class="prows">${rows(P.reguler)}</div>
        <p class="pnote pnote-g">${P.regulerNote}</p>
      </div>
      <div class="card pcard feat">
        <span class="ptag">⚡ 5 Jam Jadi</span>
        <div class="phead"><span class="pico">⚡</span><div><div class="pname">Kiloan Express</div><div class="punit">per kilo · /kg</div></div></div>
        <div class="prows">${rows(P.express)}</div>
        <p class="pnote pnote-g">${P.expressNote}</p>
      </div>
    </div>
    <div class="grid-2 reveal d1" style="margin-top:22px;grid-template-columns:1.35fr 1fr">
      <div class="card">
        <div class="phead"><span class="pico">👕</span><div><div class="pname">Laundry Satuan</div><div class="punit">per piece · kecil / besar</div></div></div>
        <table class="ptable">
          <caption class="sr-only" style="position:absolute;left:-9999px">Harga laundry satuan ${o.name}</caption>
          <thead><tr><th scope="col">Item</th><th scope="col">Kecil</th><th scope="col">Besar</th></tr></thead>
          <tbody>${satuanRows}</tbody>
        </table>
        <p style="margin-top:14px;font-size:12.5px;color:var(--soft)">*DLL (item lainnya) — hubungi outlet untuk penawaran harga.</p>
      </div>
      <div class="pside">
        <div class="card">
          <div class="phead"><span class="pico">🙌</span><div><div class="pname">Self Service</div><div class="punit">per kilo · /kg</div></div></div>
          <div class="prows">${rows(P.selfService)}</div>
          <p class="pnote pnote-g">${P.selfServiceNote}</p>
        </div>
        <div class="free-del">
          <h3><i>🛵</i> Antar-Jemput GRATIS!</h3>
          <p>Khusus radius maks 2 km dari outlet ${o.shortName} — konfirmasi jadwal kurir lewat WhatsApp.</p>
        </div>
        <a class="btn btn-solid btn-lg" style="width:100%" href="${wa(o, `Halo ${o.name}! Saya mau pesan laundry area ${o.area}, ${o.district}.`)}" target="_blank" rel="noopener">${WA_SVG} Pesan via WhatsApp</a>
      </div>
    </div>
    <p class="price-caution">Harga sesuai papan price list resmi di outlet ${o.shortName} & dapat berubah sewaktu-waktu — konfirmasi item khusus via WhatsApp.</p>`;
  }
  // simple mode
  const cards = SIMPLE_PRICES.map(
    (p) => `
    <div class="card pcard${p.feat ? " feat" : ""}">
      ${p.feat ? '<span class="ptag">Paling Laris</span>' : ""}
      <div class="phead"><span class="pico">${p.icon}</span><div><div class="pname">${p.name}</div><div class="punit">${p.unit}</div></div></div>
      <div class="prows"><div class="prow"><span>Harga</span><b>${p.price}${p.unit}</b></div></div>
      <p class="pnote pnote-g">${p.desc}</p>
    </div>`
  ).join("");
  return `
  <div class="grid-3 reveal">${cards}</div>
  <p class="price-caution reveal d1">Harga brand Samara Green Laundry — promo & harga final outlet ${o.shortName} bisa lebih spesial 😊 konfirmasi via WhatsApp · Gratis antar-jemput area terdekat.</p>
  <div style="text-align:center;margin-top:26px" class="reveal d2"><a class="btn btn-solid btn-lg" href="${wa(o, `Halo ${o.name}! Saya mau tanya harga & pesan laundry area ${o.area}, ${o.district}.`)}" target="_blank" rel="noopener">${WA_SVG} Tanya Harga via WhatsApp</a></div>`;
}

/* ═══════════════════════════ page template ═══════════════════════════ */
function pageHTML(o) {
  const url = `https://${o.subdomain}/`;
  const waDefault = wa(o, `Halo ${o.name}! Saya mau pesan laundry area ${o.area}, ${o.district}, Semarang.`);
  const faq = faqFor(o);
  const others = OUTLETS.filter((x) => x.slug !== o.slug);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "DryCleaningOrLaundry"],
        "@id": `${url}#outlet`,
        name: o.name,
        description: o.metaDesc,
        url,
        telephone: o.phoneIntl,
        image: `${MAIN}/og-image.jpg`,
        logo: `${MAIN}/images/icon-512.png`,
        priceRange: o.priceRange,
        currenciesAccepted: "IDR",
        paymentAccepted: "Tunai, QRIS, Transfer Bank",
        address: {
          "@type": "PostalAddress",
          streetAddress: o.streetAddress,
          addressLocality: "Semarang",
          addressRegion: "Jawa Tengah",
          addressCountry: "ID",
        },
        areaServed: [o.area, o.district, "Semarang"].map((n) => ({ "@type": "Place", name: n })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: `${pad(o.open)}:00`,
            closes: `${pad(o.close)}:00`,
          },
        ],
        sameAs: [TIKTOK],
        parentOrganization: { "@type": "Organization", name: "Samara Green Laundry", url: `${MAIN}/` },
        memberOf: { "@type": "Organization", name: ALDIN_NAME, alternateName: "ALDIN" },
      },
      { "@type": "WebSite", name: `${o.name} — Laundry ${o.area} Semarang`, url },
    ],
  });

  const servicesHTML = SERVICES.map(
    ([ico, name, desc], i) => `
    <div class="card svc reveal${i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : ""}">
      <span class="svc-ico" aria-hidden="true">${ico}</span>
      <h3>${name}</h3>
      <p>${desc}</p>
      <a href="${wa(o, `Halo ${o.name}! Saya mau pesan ${name} area ${o.area}.`)}" target="_blank" rel="noopener">Pesan ${name.split(" ")[0].toLowerCase()} →</a>
    </div>`
  ).join("");

  const testiHTML = o.testimonials
    .map(
      (t, i) => `
    <figure class="card tcard reveal${i === 1 ? " d1" : i === 2 ? " d2" : ""}">
      <div class="quote-mark" aria-hidden="true">"</div>
      <div class="stars" aria-label="Rating ${t.stars} dari 5 bintang">${stars5(t.stars)}</div>
      <blockquote>${t.quote}</blockquote>
      <figcaption class="tmeta">
        <span class="avatar" aria-hidden="true">${t.initials}</span>
        <span><b>${t.name}</b><span>${t.area}, Semarang</span></span>
        <span class="tchip">${t.service}</span>
      </figcaption>
    </figure>`
    )
    .join("");

  const faqHTML = faq
    .map(
      ([q, a], i) =>
        `<details class="faq reveal${i === 1 ? " d1" : ""}"${i === 0 ? " open" : ""}><summary>${q}<span class="fq-ico" aria-hidden="true">+</span></summary><div class="faq-body">${a}</div></details>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Laundry ${o.area} ${o.district} Semarang — ${o.name} · Buka Setiap Hari</title>
<meta name="description" content="${o.metaDesc}"/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="${url}"/>
<meta name="theme-color" content="#059669"/>
<meta name="geo.region" content="ID-JT"/>
<meta name="geo.placename" content="Semarang, Jawa Tengah"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="id_ID"/>
<meta property="og:site_name" content="Samara Green Laundry"/>
<meta property="og:title" content="Laundry ${o.area} Semarang — ${o.name}"/>
<meta property="og:description" content="${o.metaDesc}"/>
<meta property="og:url" content="${url}"/>
<meta property="og:image" content="${MAIN}/og-image.jpg"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Laundry ${o.area} Semarang — ${o.name}"/>
<meta name="twitter:description" content="${o.metaDesc}"/>
<link rel="icon" type="image/png" href="${FAVICON_DATA}"/>
<link rel="apple-touch-icon" href="${img("apple-touch-icon.png")}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>${CSS}</style>
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<a class="skip" href="#beranda">Langsung ke konten</a>

<header class="site-head" id="siteHead">
  <div class="wrap head-in">
    <a class="brand" href="/" aria-label="Beranda ${o.name}">
      <img src="${LOGO_DATA}" alt="Logo Samara Green Laundry" width="42" height="42"/>
      <span class="brand-t">Samara<b>Green</b>Laundry<small>Outlet ${o.shortName}</small></span>
    </a>
    <nav class="nav" id="nav" aria-label="Navigasi utama">
      <a href="#layanan">Layanan</a>
      <a href="#harga">Price List</a>
      <a href="#lokasi">Lokasi</a>
      <a href="#testimoni">Testimoni</a>
      <a href="#faq">FAQ</a>
    </nav>
    <a class="btn btn-solid head-cta" href="${waDefault}" target="_blank" rel="noopener">${WA_SVG}Pesan via WhatsApp</a>
    <button class="burger" id="burger" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
  </div>
</header>

<main id="beranda">
  <!-- HERO -->
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="reveal">
        <span class="pill">${PIN_SVG} Outlet ${o.district} · Kota Semarang</span>
        <h1>${o.headline}</h1>
        <p class="lead">${o.heroSub}</p>
        <div class="badge-row">
          <span class="badge badge-closed jsbadge" data-open="${o.open}" data-close="${o.close}" role="status">Memuat status outlet…</span>
          <span class="hours">${CLOCK_SVG} ${o.hoursDisplay} WIB · Setiap Hari</span>
        </div>
        <div class="cta-row">
          <a class="btn btn-solid btn-lg" href="${waDefault}" target="_blank" rel="noopener">${WA_SVG} WhatsApp ${o.phoneDisplay}</a>
          <a class="btn btn-outline btn-lg" href="#harga">Lihat Price List</a>
        </div>
        <div class="trust-row">
          <span class="aldin">${SHIELD_SVG} Anggota Resmi ALDIN · ${ALDIN_NAME}</span>
          <span class="rate"><b>★★★★★</b> 4,9/5 · 2.500+ pelanggan puas</span>
        </div>
      </div>
      <div class="hero-visual reveal d1">
        <img src="${HERO_DATA}" alt="Interior outlet ${o.name} — laundry modern bersih dan wangi" width="880" height="503" fetchpriority="high"/>
        <div class="float-card fc1">${o.expressCard}</div>
        <div class="float-card fc2">🌿 100% Deterjen Eco-Friendly<small>Aman untuk kulit sensitif &amp; bayi</small></div>
      </div>
    </div>
  </section>

  <!-- LAYANAN -->
  <section class="sec" id="layanan">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="pill">Layanan Kami</span>
        <h2>Semua Kebutuhan Cuci di <span>${o.shortName}</span></h2>
        <p>Satu outlet, semua solusi — dari cucian harian sampai perlakuan khusus barang favoritmu.</p>
      </div>
      <div class="grid-3">${servicesHTML}</div>
    </div>
  </section>

  <!-- STATS -->
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="stats reveal">
        <div><b>3</b><span>Outlet di Semarang</span></div>
        <div><b>2.500+</b><span>Pelanggan Puas</span></div>
        <div><b>4,9/5</b><span>Rating Rata-rata</span></div>
        <div><b>7 Hari</b><span>Buka Setiap Minggu</span></div>
      </div>
    </div>
  </section>

  <!-- PRICE LIST -->
  <section class="sec price-sec" id="harga">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="pill">Price List Resmi</span>
        <h2>Daftar Harga Outlet <span>${o.shortName}</span></h2>
        <p>${o.slug === "malangsari" ? "Sama persis dengan papan price list di outlet Jl. Malangsari No. 22." : "Harga bersahabat untuk kualitas premium — konfirmasi promo berjalan via WhatsApp."}</p>
      </div>
      ${priceSection(o)}
    </div>
  </section>

  <!-- LOKASI -->
  <section class="sec" id="lokasi">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="pill">Lokasi Outlet</span>
        <h2>Mampir ke <span>${o.shortName}</span></h2>
        <p>${o.streetAddress} — ${o.addressLines[2]}</p>
      </div>
      <div class="loc-grid">
        <div class="card loc-info reveal">
          <h3>${o.name}</h3>
          <div class="loc-row">${PIN_SVG}<span><b>Alamat</b><br/>${o.addressLines.join("<br/>")}</span></div>
          <div class="loc-row">${CLOCK_SVG}<span><b>Jam Buka</b><br/>${o.hoursDisplay} WIB · Setiap Hari (Senin–Minggu)</span></div>
          <div class="loc-row">${PHONE_SVG}<span><b>Telepon / WhatsApp Outlet</b><br/><a class="loc-phone" href="tel:${o.phoneIntl}">${o.phoneDisplay}</a></span></div>
          <div class="loc-btns">
            <a class="btn btn-solid" href="${waDefault}" target="_blank" rel="noopener">${WA_SVG} Chat Outlet</a>
            <a class="btn btn-outline" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapsQuery)}" target="_blank" rel="noopener">${NAV_SVG} Petunjuk Arah</a>
          </div>
        </div>
        <div class="map-box reveal d1">
          <iframe src="https://www.google.com/maps?q=${encodeURIComponent(o.mapsQuery)}&hl=id&output=embed" title="Peta lokasi ${o.name}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONI -->
  <section class="sec testi-sec" id="testimoni">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="pill">Testimoni</span>
        <h2>Kata Pelanggan di <span>${o.area}</span></h2>
        <p>Dipercaya ribuan keluarga di ${o.district} dan sekitarnya.</p>
      </div>
      <div class="grid-3">${testiHTML}</div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="sec" id="faq">
    <div class="wrap" style="max-width:780px">
      <div class="sec-head reveal">
        <span class="pill">FAQ</span>
        <h2>Sering <span>Ditanyakan</span></h2>
      </div>
      ${faqHTML}
    </div>
  </section>

  <!-- CTA -->
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="cta-banner reveal">
        <h2>Siap cucianmu kami jemput hari ini? 🧺</h2>
        <p>Chat WhatsApp outlet ${o.shortName} sekarang — kurir siap datang, cucian balik wangi, rapi, dan tepat waktu.</p>
        <div class="cta-row">
          <a class="btn btn-lime btn-lg" href="${waDefault}" target="_blank" rel="noopener">${WA_SVG} Pesan via WhatsApp</a>
          <a class="btn btn-outline btn-lg" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.35)" href="tel:${o.phoneIntl}">${PHONE_SVG} Telepon ${o.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="${LOGO_DATA}" alt="Logo Samara Green Laundry" width="46" height="46" loading="lazy"/>
        <p><b style="color:#fff">${o.name}</b> — bagian dari jaringan Samara Green Laundry, laundry premium ramah lingkungan dengan deterjen nabati eco-friendly. Buka setiap hari ${o.hoursDisplay} WIB.</p>
        <span class="aldin-foot">${SHIELD_SVG} Anggota Resmi ${ALDIN_NAME}</span>
      </div>
      <div>
        <h4>Navigasi</h4>
        <ul class="foot-links">
          <li><a href="#layanan">Layanan</a></li>
          <li><a href="#harga">Price List</a></li>
          <li><a href="#lokasi">Lokasi &amp; Peta</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="${TIKTOK}" target="_blank" rel="noopener">TikTok @samaragreenlaundry04</a></li>
        </ul>
      </div>
      <div>
        <h4>Jaringan Samara Green</h4>
        <ul class="foot-links">
          <li><a href="${MAIN}/">🏠 Website Pusat <small>sgl.web.id — semua outlet &amp; info lengkap</small></a></li>
          ${others.map((x) => `<li><a href="https://${x.subdomain}/">🏪 Outlet ${x.shortName} <small>${x.subdomain}</small></a></li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span id="yr">2025</span> ${o.name}. All rights reserved.</span>
      <span>Website by <a href="https://digiman.id" target="_blank" rel="noopener">PT Digital Bisnis Manajemen</a> · <a href="https://juraganwebsite.web.id" target="_blank" rel="noopener">juraganwebsite.web.id</a></span>
    </div>
  </div>
</footer>

<a class="fab" href="${waDefault}" target="_blank" rel="noopener" aria-label="Chat WhatsApp ${o.name}">${WA_SVG}</a>

<script>
(function(){
  /* tahun berjalan */
  var yr=document.getElementById('yr');
  if(yr){yr.textContent=String(new Date().getFullYear());}
  /* bayangan header saat scroll */
  var head=document.getElementById('siteHead');
  window.addEventListener('scroll',function(){
    if(head){head.className=window.scrollY>10?'site-head scrolled':'site-head';}
  },{passive:true});
  /* menu mobile */
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  if(b&&n){
    b.addEventListener('click',function(){
      var open=n.classList.toggle('open');
      b.setAttribute('aria-expanded',open?'true':'false');
      b.setAttribute('aria-label',open?'Tutup menu navigasi':'Buka menu navigasi');
    });
    n.addEventListener('click',function(e){
      if(e.target&&e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded','false');}
    });
  }
  /* badge buka/tutup REALTIME — selalu pakai jam WIB (Asia/Jakarta, UTC+7) */
  function pad(v){return (v<10?'0':'')+v;}
  function updBadges(){
    var p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
    var g=function(t){for(var i=0;i<p.length;i++){if(p[i].type===t){return Number(p[i].value);}}return 0;};
    var h=(g('hour'))%24;
    var els=document.querySelectorAll('.jsbadge');
    for(var i=0;i<els.length;i++){
      var el=els[i];
      var o=Number(el.getAttribute('data-open')),c=Number(el.getAttribute('data-close'));
      var open=h>=o&&h<c;
      el.className='badge jsbadge '+(open?'badge-open':'badge-closed');
      el.innerHTML=open?'<span class="dot"></span>Buka Sekarang · tutup '+pad(c)+'.00 WIB':'🕒 Tutup · buka '+pad(o)+'.00 WIB';
    }
  }
  updBadges();
  setInterval(updBadges,60000);
  /* animasi reveal saat scroll */
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
      });
    },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e);});
  }else{
    els.forEach(function(e){e.classList.add('in');});
  }
})();
</script>
</body>
</html>`;
}

/* ═══════════════════════════ build ═══════════════════════════ */
const ROOT = "subdomain-sites";
const HTACCESS = (o) => `# Samara Green Laundry — outlet ${o.shortName} (${o.subdomain})
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
</IfModule>
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType text/html "access plus 1 hour"
</IfModule>`;

const ROBOTS = `User-agent: *
Allow: /
Sitemap: ${MAIN}/sitemap.xml`;

const PANDUAN = `============================================================
 PANDUAN UPLOAD SUBDOMAIN OUTLET — Samara Green Laundry
============================================================
Isi paket ini:
  malangsari/   → untuk https://malangsari.sgl.web.id
  sendang/      → untuk https://sendang.sgl.web.id
  dempel/       → untuk https://dempel.sgl.web.id
  (tiap folder berisi index.html + robots.txt + .htaccess)

LANGKAH DI cPanel (hosting sgl.web.id):
 1. Login cPanel → menu "Domains" (atau "Subdomains").
 2. Create New Domain → isi:
      malangsari.sgl.web.id   → Document Root: public_html/malangsari
    Ulangi untuk:
      sendang.sgl.web.id      → Document Root: public_html/sendang
      dempel.sgl.web.id       → Document Root: public_html/dempel
    (DNS otomatis karena satu akun hosting — tunggu 5–30 menit).
 3. File Manager → buka public_html/malangsari → upload SELURUH ISI
    folder "malangsari/" dari paket ini (index.html, robots.txt, .htaccess).
    Ulangi untuk sendang/ dan dempel/.
 4. Selesai! Tes di browser:
      https://malangsari.sgl.web.id
      https://sendang.sgl.web.id
      https://dempel.sgl.web.id
 5. HTTPS (AutoSSL): cPanel biasanya menerbitkan sertifikat otomatis
    dalam 1–24 jam. .htaccess bawaan sudah memaksa http → https.

 CATATAN PINTAR:
 • Logo, favicon & foto hero TERTANAM di dalam file index.html (base64) —
   halaman tampil sempurna walau website pusat sedang maintenance.
 • Badge "Buka Sekarang" dihitung pakai jam WIB resmi (Asia/Jakarta)
   di device pengunjung — akurat dari mana pun pengunjung membuka.
 • Tombol WhatsApp langsung ke nomor outlet masing-masing:
   Malangsari 0851-1754-1083 · Sendangguwo 0851-3747-3412 · Dempel 0851-3747-3409
 • Google Business Profile tiap outlet → isi kolom "Website" dengan
   subdomain outletnya (SEO lokal melesat!).
 • Setelah live, tambahkan 3 subdomain ke Google Search Console.
 • Edit teks/harga: cukup edit file index.html (cari angkanya, ganti),
   atau minta regenerasi dari project utama:
   node scripts/build-subdomains.mjs
============================================================
`;

rmSync(ROOT, { recursive: true, force: true });
for (const o of OUTLETS) {
  const dir = `${ROOT}/${o.slug}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, pageHTML(o));
  writeFileSync(`${dir}/robots.txt`, ROBOTS);
  writeFileSync(`${dir}/.htaccess`, HTACCESS(o));
  console.log(`✓ ${o.subdomain.padEnd(24)} → ${dir}/index.html`);
}
writeFileSync(`${ROOT}/PANDUAN-UPLOAD.txt`, PANDUAN);

rmSync("samara-green-laundry-subdomains.zip", { force: true });
execSync(`cd ${ROOT} && zip -qr ../samara-green-laundry-subdomains.zip .`, { stdio: "inherit" });
console.log("✓ samara-green-laundry-subdomains.zip dibuat");
