#!/usr/bin/env node
/**
 * prepare-out.mjs — Menyatukan hasil static export ke folder `out/`.
 *
 * Latar belakang:
 * - Next.js ≤ 15 : `next build` + output:"export" menghasilkan folder `out/` langsung.
 * - Next.js 16+  : hasil export ditulis ke dalam distDir (.next) bercampur artefak build.
 *
 * Script ini memastikan TERSERAH versi Next.js, folder `out/` selalu berisi
 * file statis yang bersih & siap upload ke shared hosting.
 *
 * Dipanggil otomatis oleh `npm run build` / `npm run deploy`.
 * Bisa juga manual: BUILD_DIST_DIR=.next-build node scripts/prepare-out.mjs
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();

// 1️⃣ Tentukan sumber hasil export — PRIORITASKAN hasil build TERBARU
//    (folder out/ lama akan ditimpa agar tidak ada file basi/stale)
let source;
if (process.env.BUILD_DIST_DIR && existsSync(join(cwd, process.env.BUILD_DIST_DIR, "index.html"))) {
  source = join(cwd, process.env.BUILD_DIST_DIR);
} else if (existsSync(join(cwd, ".next", "index.html"))) {
  source = join(cwd, ".next");
} else if (existsSync(join(cwd, "out", "index.html"))) {
  console.log("ℹ️  Tidak menemukan artefak build baru — memakai out/ yang sudah ada.");
  process.exit(0);
} else {
  console.error("❌ Tidak menemukan hasil export. Jalankan `next build` dulu (pastikan output: \"export\" di next.config.ts).");
  process.exit(1);
}

// 2️⃣ Salin ke out/ — buang artefak build yang tidak dibutuhkan hosting
const DEST = join(cwd, "out");
rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

// Artefak build internal Next.js yang TIDAK perlu di-upload:
const EXCLUDED_DIRS = new Set([
  "cache",        // cache build turbopack/webpack
  "build",        // chunk server (turbopack)
  "server",       // artefak server-side
  "standalone",   // output standalone (jika ada)
  "static",       // static/ di ROOT distDir (aset server, bukan milik browser — yang browser ada di _next/static)
  "types",        // tipe TypeScript hasil build
  "debug",
]);
const EXCLUDED_FILES = new Set(["BUILD_ID", "prerender-manifest.json", "routes-manifest.json", "server-reference-manifest.json"]);

let copied = 0;
let skipped = 0;

for (const entry of readdirSync(source)) {
  const srcPath = join(source, entry);
  if (statSync(srcPath).isDirectory()) {
    if (EXCLUDED_DIRS.has(entry)) {
      skipped++;
      continue;
    }
  } else if (EXCLUDED_FILES.has(entry) || (entry.endsWith(".json") && entry.includes("manifest"))) {
    skipped++;
    continue;
  }
  cpSync(srcPath, join(DEST, entry), { recursive: true });
  copied++;
}

// 3️⃣ Laporan
if (!existsSync(join(DEST, "index.html"))) {
  console.error("❌ out/index.html tidak ditemukan setelah penyalinan — cek manual:", source);
  process.exit(1);
}

console.log(`✅ Folder out/ siap!  (${copied} item disalin, ${skipped} artefak build dilewati)`);
console.log("   Sumber   :", source);
console.log("   Tujuan   :", DEST);
console.log("   Berikutnya: upload seluruh isi out/ ke public_html hosting Anda 🚀");
