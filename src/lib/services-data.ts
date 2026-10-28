import {
  Baby,
  BedDouble,
  Footprints,
  Shirt,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * DATA LAYANAN UTAMA — sumber tunggal katalog layanan.
 * Dipakai bersama oleh:
 * - section "Layanan" di beranda (src/components/landing/services.tsx)
 * - halaman mandiri /layanan (src/app/layanan/page.tsx)
 *
 * Modul biasa (bukan "use client") agar bisa diimpor oleh
 * server component DAN client component sekaligus.
 */
export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  price: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    icon: Shirt,
    title: "Cuci Kering Setrika",
    desc: "Cuci, kering, dan setrika rapi dengan perawatan lembut untuk pakaian sehari-hari keluarga.",
    price: "mulai Rp 6.500/kg",
    featured: true,
  },
  {
    icon: Zap,
    title: "Cuci Kilat Express 6 Jam",
    desc: "Butuh cepat? Selesai hanya dalam 6 jam dengan hasil yang tetap segar dan wangi.",
    price: "Rp 12.000/kg",
  },
  {
    icon: Sparkles,
    title: "Dry Cleaning Premium",
    desc: "Perawatan khusus jas, gaun, dan bahan delikat dengan teknologi solvent ramah lingkungan.",
    price: "mulai Rp 20.000",
  },
  {
    icon: Footprints,
    title: "Cuci Sepatu & Tas",
    desc: "Deep cleaning sepatu dan tas favoritmu dengan sikat lembut serta pengeringan suhu ruang.",
    price: "mulai Rp 20.000",
  },
  {
    icon: BedDouble,
    title: "Bed Cover & Selimut",
    desc: "Menghilangkan tungau dan bakteri, kembali lembut, ringan, dan wangi seperti baru.",
    price: "mulai Rp 35.000",
  },
  {
    icon: Baby,
    title: "Cuci Boneka & Stroller",
    desc: "Sterilisasi higienis untuk boneka dan stroller si kecil — aman langsung disentuh.",
    price: "mulai Rp 25.000",
  },
];
