import type { Metadata } from "next";
import { Camera, MessageCircle, Sparkles } from "lucide-react";

import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { GalleryGrid } from "@/components/landing/gallery-grid";
import { Navbar } from "@/components/landing/navbar";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";
import { Button } from "@/components/ui/button";
import { SITE, SITE_URL, WA_DEFAULT_LINK } from "@/lib/site";
import { GALLERY_ITEMS, galleryImgPath } from "@/lib/gallery-data";

export const metadata: Metadata = {
  title:
    "Galeri Foto Samara Green Laundry — Outlet, Proses Cuci & Hasil Laundry Semarang",
  description:
    "Lihat galeri foto Samara Green Laundry: fasilitas outlet di Pedurungan Semarang, proses pencucian higienis, hasil lipatan rapi, cuci sepatu, dry cleaning, dan layanan antar-jemput.",
  keywords: [
    "galeri laundry semarang",
    "foto laundry samara green",
    "laundry pedurungan",
    "hasil laundry bersih",
  ],
  alternates: { canonical: "/galeri/" },
  openGraph: {
    title: "Galeri Samara Green Laundry",
    description:
      "Fasilitas outlet, proses cuci higienis, dan hasil laundry yang bikin cucian kembali wangi & rapi.",
    url: "/galeri/",
    type: "website",
    images: [
      {
        url: galleryImgPath(GALLERY_ITEMS[0]),
        width: 1152,
        height: 864,
        alt: GALLERY_ITEMS[0].alt,
      },
    ],
  },
};

/** JSON-LD ImageGallery — membantu Google memahami konten visual halaman. */
function GalleryJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${SITE_URL}/galeri/#gallery`,
    name: "Galeri Samara Green Laundry",
    description:
      "Kumpulan foto outlet, proses pencucian, dan hasil layanan Samara Green Laundry Semarang.",
    url: `${SITE_URL}/galeri/`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    image: GALLERY_ITEMS.slice(0, 9).map((item) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${galleryImgPath(item)}`,
      caption: item.caption,
      name: item.alt,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/** Halaman mandiri "Galeri" — foto outlet, proses, dan hasil layanan. */
export default function GaleriPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Galeri Foto"
          crumb="Galeri"
          path="/galeri/"
          title={
            <>
              Lihat Sendiri,{" "}
              <em className="not-italic text-lime-400">Bukan Sekadar Janji</em>
            </>
          }
          description="Fasilitas outlet kami, proses pengerjaan, dan hasil cucian — semua terekam apa adanya. Klik foto untuk memperbesar."
        />
        <GalleryJsonLd />

        {/* Galeri interaktif: filter + grid + lightbox */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <GalleryGrid />
          </div>
        </section>

        {/* Catatan foto & CTA */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
                  <Camera className="size-3.5" aria-hidden />
                  Transparan untuk Pelanggan
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                  Cucian Anda,{" "}
                  <span className="text-emerald-600">ditangani sungguh-sungguh</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-500">
                  Setiap cucian dikerjakan terpisah antar pelanggan, dicuci dengan
                  deterjen nabati eco-friendly, dan dikemas rapi sebelum diantar.
                  Mau lihat prosesnya langsung? Datang saja ke outlet terdekat —
                  pintu kami selalu terbuka.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Pencucian terpisah antar pelanggan — tidak bercampur",
                    "Deterjen nabati 100% eco-friendly, aman kulit sensitif",
                    "Lipatan presisi & kemasan bersih siap pakai",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-stone-600">
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-lime-500" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 text-center shadow-2xl shadow-emerald-950/25 sm:p-12">
                  <Camera className="mx-auto size-10 text-lime-400" aria-hidden />
                  <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                    Mau hasil seperti di foto?
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-emerald-100/80">
                    Pesan lewat WhatsApp — kurir kami jemput cucian Anda hari ini
                    juga (gratis ±5 km dari outlet).
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button
                      asChild
                      className="h-13 rounded-full bg-lime-400 px-8 text-base font-bold text-emerald-950 hover:bg-lime-300"
                    >
                      <a
                        href={WA_DEFAULT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle aria-hidden />
                        Pesan Sekarang
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-13 rounded-full border-white/30 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10"
                    >
                      <a href="/harga/">Lihat Daftar Harga</a>
                    </Button>
                  </div>
                  <p className="mt-5 text-xs text-emerald-100/50">
                    {SITE.name} · {SITE.city} · Buka setiap hari
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
