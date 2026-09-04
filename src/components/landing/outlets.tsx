"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  OPEN_DAYS,
  OUTLETS,
  outletMapsEmbedUrl,
  outletMapsUrl,
  outletTelLink,
  outletWaLink,
  SITE,
  type Outlet,
} from "@/lib/site";
import { OpenNowBadge } from "./open-now-badge";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const SERVICE_CHIPS = ["Kiloan", "Satuan", "Cuci Setrika", "Antar Jemput"] as const;

/** One outlet card: name, address, services, hours, maps + detail links. */
function OutletCard({ outlet, delay }: { outlet: Outlet; delay: number }) {
  return (
    <motion.article
      variants={item}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300/60 hover:shadow-xl hover:shadow-emerald-900/10"
    >
      {/* soft gradient accent on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br from-emerald-100 to-lime-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-900/20">
          <Store className="size-6" aria-hidden />
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
          Outlet {SITE.city.replace("Kota ", "")}
        </span>
      </div>

      <h3 className="relative mt-5 text-lg font-extrabold leading-snug tracking-tight text-emerald-950">
        {outlet.name}
      </h3>

      <address className="relative mt-3 flex items-start gap-2.5 not-italic">
        <MapPin className="mt-0.5 size-4.5 shrink-0 text-emerald-600" aria-hidden />
        <span className="text-sm leading-relaxed text-stone-600">
          {outlet.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </address>

      {outlet.landmark ? (
        <p className="relative mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-800 ring-1 ring-lime-200">
          <MapPin className="size-3.5" aria-hidden />
          {outlet.landmark}
        </p>
      ) : null}

      <ul className="relative mt-4 flex flex-wrap gap-1.5" aria-label="Layanan di outlet ini">
        {SERVICE_CHIPS.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-semibold text-stone-600"
          >
            {chip}
          </li>
        ))}
      </ul>

      <p className="relative mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-medium text-stone-500">
        <span className="flex items-center gap-2">
          <Clock className="size-4 shrink-0 text-emerald-600" aria-hidden />
          <span>
            <strong className="font-bold text-stone-700">{outlet.hoursDisplay}</strong>
            {" "}· {OPEN_DAYS.replace(" (Senin – Minggu)", "")}
          </span>
        </span>
        <OpenNowBadge outlet={outlet} />
      </p>

      <a
        href={outletTelLink(outlet)}
        className="relative mt-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600"
        aria-label={`Telepon ${outlet.name} di ${outlet.phoneDisplay}`}
      >
        <Phone className="size-4 shrink-0 text-emerald-600" aria-hidden />
        {outlet.phoneDisplay}
      </a>

      <div className="relative mt-5 flex flex-wrap items-center gap-2 pt-1">
        <Button asChild size="sm" className="h-10 flex-1 rounded-full">
          <a
            href={outletMapsUrl(outlet)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Petunjuk arah ke ${outlet.name} di Google Maps`}
          >
            <Navigation aria-hidden />
            Petunjuk Arah
          </a>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="h-10 flex-1 rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
        >
          <a
            href={outletWaLink(outlet)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${outlet.name} di ${outlet.phoneDisplay}`}
          >
            <MessageCircle aria-hidden />
            Chat Outlet
          </a>
        </Button>
      </div>

      <a
        href={`/outlet/${outlet.slug}/`}
        className="relative mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600"
        aria-label={`Lihat halaman lengkap ${outlet.name}`}
      >
        Detail Outlet
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </a>
    </motion.article>
  );
}

/**
 * Section "Lokasi Outlet": kartu 3 outlet fisik + tab peta Google Maps.
 * Konten di-generate dari OUTLETS (src/lib/site.ts).
 */
export function Outlets() {
  return (
    <section
      id="lokasi"
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/50 to-white py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute -left-32 top-24 size-96 rounded-full bg-emerald-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-24 size-96 rounded-full bg-lime-200/30 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Lokasi Outlet"
          icon={MapPin}
          title={
            <>
              3 Outlet Siap Melayani di{" "}
              <span className="text-emerald-600">Kota Semarang</span>
            </>
          }
          subtitle="Mampir ke outlet terdekat, atau pesan antar-jemput gratis — semuanya di Kecamatan Pedurungan dan sekitarnya."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {OUTLETS.map((outlet) => (
            <OutletCard key={outlet.slug} outlet={outlet} delay={0} />
          ))}
        </motion.div>

        {/* Peta interaktif — tab per outlet, iframe hanya termuat saat tab aktif */}
        <Reveal delay={0.1} className="mt-14">
          <Tabs defaultValue={OUTLETS[0].slug} className="w-full">
            <TabsList className="mx-auto flex h-auto w-fit flex-wrap justify-center gap-1 rounded-2xl border border-emerald-900/10 bg-white p-1.5 shadow-sm">
              {OUTLETS.map((outlet) => (
                <TabsTrigger
                  key={outlet.slug}
                  value={outlet.slug}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold data-[state=active]:bg-emerald-600 data-[state=active]:text-white sm:px-6"
                >
                  <MapPin className="size-4" aria-hidden />
                  {outlet.shortName}
                </TabsTrigger>
              ))}
            </TabsList>
            {OUTLETS.map((outlet) => (
              <TabsContent key={outlet.slug} value={outlet.slug} className="mt-5">
                <div className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-lg shadow-emerald-900/10">
                  <iframe
                    src={outletMapsEmbedUrl(outlet)}
                    title={`Peta lokasi ${outlet.name}`}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[340px] w-full border-0 sm:h-[420px]"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
