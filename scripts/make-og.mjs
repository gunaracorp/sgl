#!/usr/bin/env node
/**
 * make-og.mjs — Membuat og-image.jpg (1200x630) untuk Open Graph / Twitter Card:
 * gambar yang tampil saat link website dibagikan ke WhatsApp, Facebook, X, dll.
 *
 * Base: foto interior laundry (hero) + overlay gradient hijau + teks brand.
 * Jalankan: node scripts/make-og.mjs  (sudah otomatis? tidak perlu tiap build —
 * gambar disimpan permanen di public/og-image.jpg)
 */
import sharp from "sharp";

const W = 1200;
const H = 630;

const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.35" stop-color="#022c22" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#022c22" stop-opacity="0.94"/>
    </linearGradient>
    <linearGradient id="pill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#059669"/>
      <stop offset="1" stop-color="#10b981"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#shade)"/>

  <!-- Brand badge kiri-atas -->
  <rect x="52" y="52" width="72" height="72" rx="20" fill="url(#pill)"/>
  <path d="M70 108 C62 96 66 78 82 72 C96 66 106 60 114 52 C118 62 120 70 118 82 C114 100 94 112 78 110 Z"
        fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Headline -->
  <text x="52" y="452" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="66" fill="#ffffff">Samara Green Laundry</text>
  <text x="52" y="508" font-family="DejaVu Sans, Arial, sans-serif" font-size="30" fill="#a7f3d0">Laundry Bersih, Segar &amp; Ramah Lingkungan</text>

  <!-- Pill WhatsApp -->
  <rect x="52" y="536" width="452" height="56" rx="28" fill="url(#pill)"/>
  <circle cx="86" cy="564" r="14" fill="none" stroke="#ffffff" stroke-width="4"/>
  <path d="M80 558 c6 -6 14 0 11 8 l3 4 -5 1 c-6 -1 -10 -8 -9 -13 Z" fill="#ffffff"/>
  <text x="112" y="574" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="26" fill="#ffffff">Pesan: 0821-3450-6007</text>

  <!-- Rating kanan-bawah -->
  <text x="1148" y="574" text-anchor="end" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="26" fill="#fde047">★ 4.9 / 5  ·  2.500+ pelanggan</text>
</svg>`;

await sharp("public/images/hero-laundry.png")
  .resize(W, H, { fit: "cover", position: "attention" })
  .composite([{ input: Buffer.from(overlaySvg) }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("✅ public/og-image.jpg dibuat (1200x630) — siap dipakai Open Graph & Twitter Card");
