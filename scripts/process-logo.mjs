/**
 * Proses logo resmi Samara Green Laundry → aset web siap pakai.
 *
 * Input : upload/samara-green-laundry-logo.jpg (640x640, latar putih)
 * Output (public/images/):
 *  - logo-leaf.png        → emblem daun saja, latar TRANSPARAN (512px)
 *  - logo-full.png        → logo lengkap (daun + wordmark), transparan
 *  - icon-192.png         → PWA/favicon 192 (transparan)
 *  - icon-512.png         → PWA/favicon 512 (transparan)
 *  - apple-touch-icon.png → 180px, latar putih (kebutuhan iOS)
 *
 * Jalankan: node scripts/process-logo.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "upload/samara-green-laundry-logo.jpg";
const OUT = "public/images";

/** Ubah piksel mendekati putih menjadi transparan (faloff halus di 215–245). */
function whiteToTransparent(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const whiteness = Math.min(r, g, b);
    let alpha = 255;
    if (whiteness >= 245) alpha = 0;
    else if (whiteness > 215) alpha = Math.round(255 * (1 - (whiteness - 215) / 30));
    data[i + 3] = alpha;
  }
  return data;
}

/** Bounding box piksel non-transparan (setelah alpha diterapkan). */
function bbox(data, w, h) {
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return maxX < 0 ? null : { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const img = sharp(SRC);
const { width, height } = await img.metadata();
const raw = await img.ensureAlpha().raw().toBuffer();
const rgba = whiteToTransparent(new Uint8Array(raw));
const base = sharp(rgba, { raw: { width, height, channels: 4 } });

await mkdir(OUT, { recursive: true });

// ── 1. Bounding box SEMUA konten → logo-full.png ────────────────────────────
const fullBox = bbox(rgba, width, height);
const fullPadded = {
  left: Math.max(0, fullBox.left - 6),
  top: Math.max(0, fullBox.top - 6),
  width: Math.min(width, fullBox.width + 12),
  height: Math.min(height, fullBox.height + 12),
};
await sharp(rgba, { raw: { width, height, channels: 4 } })
  .extract(fullPadded)
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile(`${OUT}/logo-full.png`);
console.log("✔ logo-full.png", fullPadded.width + "x" + fullPadded.height);

// ── 2. Bounding box DAUN (hanya 65% atas gambar) → logo-leaf.png ────────────
const leafLimitY = Math.round(height * 0.65);
const leafRegion = { w: width, h: leafLimitY };
let minX = width, minY = height, maxX = -1, maxY = -1;
for (let y = 0; y < leafRegion.h; y++) {
  for (let x = 0; x < leafRegion.w; x++) {
    if (rgba[(y * width + x) * 4 + 3] > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const leafBox = {
  left: Math.max(0, minX - 6),
  top: Math.max(0, minY - 6),
  width: Math.min(width - Math.max(0, minX - 6), maxX - minX + 13),
  height: Math.min(leafLimitY - Math.max(0, minY - 6), maxY - minY + 13),
};
const leafBuf = await sharp(rgba, { raw: { width, height, channels: 4 } })
  .extract(leafBox)
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toBuffer();

// Simpan sebagai persegi 512 dengan contain (transparan di sekeliling)
await sharp({
  create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: await sharp(leafBuf).resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer() }])
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile(`${OUT}/logo-leaf.png`);
console.log("✔ logo-leaf.png 512x512 (crop", leafBox.width + "x" + leafBox.height + ")");

// ── 3. Ikon PWA 192 & 512 (transparan) ──────────────────────────────────────
for (const size of [192, 512]) {
  await sharp(leafBuf)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ palette: true, quality: 90, compressionLevel: 9 })
    .toFile(`${OUT}/icon-${size}.png`);
  console.log(`✔ icon-${size}.png`);
}

// ── 4. Apple touch icon 180 (latar putih solid) ─────────────────────────────
await sharp({
  create: { width: 180, height: 180, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
})
  .composite([
    {
      input: await sharp(leafBuf)
        .resize(150, 150, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ palette: true, quality: 90, compressionLevel: 9 })
        .toBuffer(),
      top: 15,
      left: 15,
    },
  ])
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile(`${OUT}/apple-touch-icon.png`);
console.log("✔ apple-touch-icon.png");

console.log("\nSelesai! Semua aset logo ada di", OUT);
