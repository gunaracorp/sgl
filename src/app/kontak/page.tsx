import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { Contact } from "@/components/landing/contact";
import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { OpenNowBadge } from "@/components/landing/open-now-badge";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";
import { Button } from "@/components/ui/button";
import {
  OUTLETS,
  outletMapsEmbedUrl,
  outletMapsUrl,
  outletTelLink,
  outletWaLink,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak & Lokasi — Samara Green Laundry Semarang | Hubungi Kami",
  description:
    "Hubungi Samara Green Laundry: WhatsApp 0821-3450-6007, 3 outlet di Pedurungan Semarang (Malangsari, Sendangguwo, Dempel) dengan maps, jam buka setiap hari, dan form pesan cepat.",
  alternates: { canonical: "/kontak/" },
  openGraph: {
    title: "Kontak Samara Green Laundry",
    description:
      "Chat WhatsApp, telepon, atau kunjungi 3 outlet kami di Kota Semarang — buka setiap hari dengan jam yang jelas per outlet.",
    url: `${SITE_URL}/kontak/`,
    type: "website",
  },
};

/** Halaman mandiri "Kontak" — form WhatsApp + semua outlet + maps. */
export default function KontakPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Hubungi Kami"
          crumb="Kontak"
          path="/kontak/"
          title={
            <>
              Kami <em className="not-italic text-lime-400">Siap</em> Membantu
              Cucianmu
            </>
          }
          description="Chat WhatsApp untuk pesan cepat, telepon outlet terdekat, atau kunjungi langsung — semua cara menghubungi kami ada di sini."
        />

        {/* Komponen kontak reuse — kartu info + form ke WhatsApp */}
        <Contact />

        {/* Semua outlet + maps */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Kunjungi Kami
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                3 Outlet,{" "}
                <span className="text-emerald-600">Semua Buka Setiap Hari</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {OUTLETS.map((outlet, i) => (
                <Reveal key={outlet.slug} delay={0.08 * i}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-background shadow-md">
                    <iframe
                      src={outletMapsEmbedUrl(outlet)}
                      title={`Peta lokasi outlet ${outlet.shortName} — ${outlet.streetAddress}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-44 w-full border-0"
                      allowFullScreen
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-emerald-950">
                          Outlet {outlet.shortName}
                        </h3>
                        <OpenNowBadge outlet={outlet} />
                      </div>
                      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-stone-500">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                        {outlet.addressLines.join(", ")}
                        {outlet.landmark ? ` — ${outlet.landmark}` : ""}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
                        <Clock className="size-4 shrink-0" aria-hidden />
                        {outlet.hoursDisplay} WIB
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <Button
                          asChild
                          size="sm"
                          className="h-11 rounded-full bg-emerald-600 px-4 text-xs font-bold hover:bg-emerald-700"
                        >
                          <a href={outletWaLink(outlet)} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="size-4" aria-hidden />
                            Chat
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="h-11 rounded-full border-emerald-200 px-4 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                        >
                          <a href={outletTelLink(outlet)}>
                            <Phone className="size-4" aria-hidden />
                            Telepon
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="ghost"
                          className="h-11 rounded-full px-3 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                        >
                          <a href={outletMapsUrl(outlet)} target="_blank" rel="noopener noreferrer">
                            <Navigation className="size-4" aria-hidden />
                            Rute
                          </a>
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
