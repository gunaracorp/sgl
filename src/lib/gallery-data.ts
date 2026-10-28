/**
 * PUSAT DATA GALERI — halaman /galeri/
 * -------------------------------------
 * Semua foto tersimpan di /public/images/gallery/ (JPG terkompresi,
 * rasio 4:3, lebar 1152–1200px). Tambah/edit/hapus entri di sini,
 * halaman galeri otomatis ikut (termasuk filter kategori).
 *
 * Ganti foto AI dengan foto outlet asli kapan saja:
 * cukup timpa file dengan nama sama lalu perbarui `alt` & `caption`.
 */

export type GalleryCategory = "outlet" | "proses" | "layanan";

export type GalleryItem = {
  /** Nama file di /public/images/gallery/ tanpa ekstensi */
  src: string;
  /** Teks alternatif SEO — deskripsi foto untuk pembaca layar & Google */
  alt: string;
  /** Keterangan pendek yang tampil di bawah foto */
  caption: string;
  /** Kategori untuk filter galeri */
  category: GalleryCategory;
};

export const GALLERY_CATEGORIES: readonly {
  id: GalleryCategory | "semua";
  label: string;
}[] = [
  { id: "semua", label: "Semua Foto" },
  { id: "outlet", label: "Outlet & Fasilitas" },
  { id: "proses", label: "Proses Cuci" },
  { id: "layanan", label: "Layanan Khusus" },
];

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    src: "outlet-storefront",
    alt: "Depan outlet Samara Green Laundry dengan fasad hijau segar di Semarang",
    caption: "Outlet Malangsari — Tlogosari Kulon, buka setiap hari 07.00–22.00 WIB",
    category: "outlet",
  },
  {
    src: "washing-machines",
    alt: "Deretan mesin cuci modern bersih di dalam fasilitas laundry Samara Green Laundry",
    caption: "Mesin cuci kapasitas besar — higienis, tidak bercampur antar pelanggan",
    category: "outlet",
  },
  {
    src: "steam-ironing",
    alt: "Setrika uap profesional menyetrika kemeja putih bersih",
    caption: "Setrika uap profesional — hasil rapi bebas lipatan membandel",
    category: "proses",
  },
  {
    src: "folding-service",
    alt: "Tumpukan pakaian bersih yang dilipat rapi oleh tim Samara Green Laundry",
    caption: "Lipatan presisi — cucian kembali siap disimpan langsung ke lemari",
    category: "proses",
  },
  {
    src: "eco-detergent",
    alt: "Deterjen nabati ramah lingkungan dengan daun hijau segar",
    caption: "Deterjen nabati 100% eco-friendly — aman untuk kulit sensitif & bayi",
    category: "proses",
  },
  {
    src: "delivery-courier",
    alt: "Kurir antar jemput laundry Samara Green Laundry mengantar cucian bersih",
    caption: "Kurir antar-jemput gratis radius ±5 km dari setiap outlet",
    category: "layanan",
  },
  {
    src: "sneaker-care",
    alt: "Sepatu sneakers putih yang dibersihkan dengan sikat khusus hingga bersih sempurna",
    caption: "Cuci sepatu — sol sampai celah dijilat detail, seperti keluar toko",
    category: "layanan",
  },
  {
    src: "dry-cleaning",
    alt: "Jas dan gaun formal hasil dry cleaning premium yang tergantung rapi",
    caption: "Dry cleaning premium untuk jas, gaun, dan bahan halus",
    category: "layanan",
  },
  {
    src: "bedcover-fresh",
    alt: "Bed cover dan bantal hasil cuci Samara Green Laundry yang rapi dan wangi",
    caption: "Bed cover king size kembali wangi, lembut, dan bebas tungau",
    category: "layanan",
  },
] as const;

export function galleryImgPath(item: GalleryItem): string {
  return `/images/gallery/${item.src}.jpg`;
}
