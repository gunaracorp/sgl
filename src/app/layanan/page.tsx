import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  Droplets,
  MapPinned,
  MessageCircle,
  Store,
} from "lucide-react";

import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services-data";
import { waLink, WA_DEFAULT_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Layanan Laundry Semarang — Kiloan, Express 6 Jam, Dry Cleaning | Samara Green Laundry",
  description:
    "Semua layanan Samara Green Laundry: cuci kering setrika, kilat express 6 jam, dry cleaning premium, cuci sepatu & tas, bed cover, hingga boneka & stroller. Antar-jemput gratis ±5 km.",
  alternates: { canonical: "/layanan/" },
  openGraph: {
    title: "Layanan Samara Green Laundry",
    description:
      "Cuci kiloan, express 6 jam, dry cleaning premium, sepatu & tas, bed cover, boneka & stroller — semua dengan deterjen nabati eco-friendly.",
    url: `/layanan/`,
    type: "website",
  },
};

const EXTRA_SERVICES = [
  {
    icon: Clock,
    title: "Kilat Express 6 Jam",
    desc: "Seragam kerja perlu besok pagi? Pesan maksimal 4 jam sebelum jam tutup outlet — prioritas dikerjakan lebih dulu.",
  },
  {
    icon: Store,
    title: "Self Service (Mandi Bola)",
    desc: "Suka mencuci sendiri? Mesin cuci & pengering mandiri tersedia di outlet — Rp 1.000/kg cuci, Rp 2.500/kg kering.",
  },
  {
    icon: MapPinned,
    title: "Antar-Jemput Gratis",
    desc: "Area sekitar outlet (±5 km) kami jemput dan antar tanpa biaya. Di luar radius? Konfirmasi saja via WhatsApp.",
  },
];

/** Halaman mandiri "Layanan" — katalog lengkap + CTA WhatsApp per layanan. */
export default function LayananPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Layanan Kami"
          crumb="Layanan"
          path="/layanan/"
          title={
            <>
              Semua Kebutuhan Cuci,{" "}
              <em className="not-italic text-lime-400">Satu Outlet</em>
            </>
          }
          description="Dari cucian harian keluarga sampai jas premium — ditangani tim berpengalaman dengan deterjen nabati eco-friendly. Pilih layanan, chat langsung ke WhatsApp."
        />

        {/* Katalog layanan utama */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => (
                <Reveal key={service.title} delay={0.06 * i}>
                  <article
                    className={`flex h-full flex-col rounded-3xl border p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      service.featured
                        ? "border-emerald-600/30 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                          service.featured
                            ? "bg-white/10 text-lime-300"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <service.icon className="size-6" aria-hidden />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold tabular-nums ${
                          service.featured
                            ? "bg-lime-400 text-emerald-950"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {service.price}
                      </span>
                    </div>
                    <h2
                      className={`mt-4 text-lg font-bold ${
                        service.featured ? "text-white" : "text-emerald-950"
                      }`}
                    >
                      {service.title}
                    </h2>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        service.featured ? "text-emerald-100/85" : "text-stone-500"
                      }`}
                    >
                      {service.desc}
                    </p>
                    <div className="mt-auto pt-5">
                      <a
                        href={waLink(
                          `Halo Samara Green Laundry! Saya mau pesan layanan ${service.title}. Boleh info lebih lanjut?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-bold transition-colors ${
                          service.featured
                            ? "text-lime-300 hover:text-lime-200"
                            : "text-emerald-700 hover:text-emerald-600"
                        }`}
                      >
                        <MessageCircle className="size-4" aria-hidden />
                        Pesan Layanan Ini
                        <ArrowRight className="size-4" aria-hidden />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Layanan pendukung */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Kemudahan Tambahan
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Ada Lagi yang Bikin{" "}
                <span className="text-emerald-600">Hidup Lebih Mudah</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {EXTRA_SERVICES.map((extra, i) => (
                <Reveal key={extra.title} delay={0.08 * i}>
                  <article className="h-full rounded-3xl border border-stone-200 bg-background p-6 shadow-md">
                    <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <extra.icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-emerald-950">
                      {extra.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">
                      {extra.desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA harga */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <Reveal className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 text-center shadow-2xl shadow-emerald-950/25 sm:p-12">
            <Droplets className="mx-auto size-10 text-lime-400" aria-hidden />
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Harga jelas,{" "}
              <em className="not-italic text-lime-400">tanpa biaya tersembunyi.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-emerald-100/80">
              Lihat daftar harga lengkap semua outlet — atau langsung tanya
              lewat WhatsApp, kami balas cepat.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="h-13 rounded-full bg-lime-400 px-8 text-base font-bold text-emerald-950 hover:bg-lime-300"
              >
                <a href="/harga/">Lihat Daftar Harga</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-full border-white/30 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10"
              >
                <a href={WA_DEFAULT_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden />
                  Chat WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
