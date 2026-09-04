import type { NextConfig } from "next";

/**
 * KONFIGURASI SAMARA GREEN LAUNDRY
 * ---------------------------------
 * `output: "export"` → hasil build berupa file HTML/CSS/JS statis di folder `out/`
 * yang bisa di-upload ke shared hosting mana pun (cPanel/Apache/Nginx), tanpa Node.js.
 *
 * Jika website di-deploy di dalam SUB-FOLDER (mis. https://domainanda.com/laundry/),
 * tambahkan baris berikut (sesuaikan nama foldernya):
 *   basePath: "/laundry",
 *   assetPrefix: "/laundry",
 */
const nextConfig: NextConfig = {
  // Build artifacts terpisah (opsional): set BUILD_DIST_DIR saat build
  // agar tidak mengganggu folder .next milik `next dev` yang sedang jalan.
  distDir: process.env.BUILD_DIST_DIR || ".next",
  output: "export",
  trailingSlash: true,
  images: {
    // Wajib untuk static export: gambar disajikan apa adanya (tanpa optimasi server).
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
