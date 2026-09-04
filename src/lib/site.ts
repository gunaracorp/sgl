export const SITE = {
  name: "Samara Green Laundry",
  tagline: "Laundry Bersih, Segar & Ramah Lingkungan",
  phoneDisplay: "0813-4754-7944",
  phoneIntl: "+6281347547944",
  address: "Jl. Samara Indah No. 88, Indonesia",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.+Samara+Indah+No.+88+Indonesia",
  hours: [
    { day: "Senin – Sabtu", time: "07.00 – 21.00 WIB" },
    { day: "Minggu", time: "08.00 – 18.00 WIB" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Harga", href: "#harga" },
  { label: "Cara Pesan", href: "#cara-pesan" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#kontak" },
] as const;

export const SERVICE_TITLES = [
  "Cuci Kering Setrika",
  "Cuci Kilat Express 6 Jam",
  "Dry Cleaning Premium",
  "Cuci Sepatu & Tas",
  "Bed Cover & Selimut",
  "Cuci Boneka & Stroller",
] as const;

/** Build a WhatsApp deep link with a properly URL-encoded prefilled message. */
export function waLink(message: string): string {
  return `https://wa.me/6281347547944?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_LINK: string = waLink(
  "Halo Samara Green Laundry! Saya mau pesan layanan laundry."
);
