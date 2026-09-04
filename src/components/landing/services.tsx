"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  BedDouble,
  Footprints,
  Shirt,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  price: string;
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    icon: Shirt,
    title: "Cuci Kering Setrika",
    desc: "Cuci, kering, dan setrika rapi dengan perawatan lembut untuk pakaian sehari-hari keluarga.",
    price: "Rp 7.000/kg",
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
    price: "mulai Rp 25.000",
  },
  {
    icon: Footprints,
    title: "Cuci Sepatu & Tas",
    desc: "Deep cleaning sepatu dan tas favoritmu dengan sikat lembut serta pengeringan suhu ruang.",
    price: "mulai Rp 30.000",
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

/** 6 service cards in a responsive grid; first card is the featured one. */
export function Services() {
  return (
    <section id="layanan" className="py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Layanan Kami"
          title={
            <>
              Pilih Layanan Sesuai{" "}
              <span className="text-emerald-600">Kebutuhanmu</span>
            </>
          }
          subtitle="Dari cuci kilat sampai perawatan premium — semuanya dikerjakan higienis dengan deterjen ramah lingkungan."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -6 }}
              className={cn(
                "group relative flex flex-col rounded-3xl border p-6 transition-shadow duration-300",
                service.featured
                  ? "border-emerald-600 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-900/25"
                  : "border-stone-200/80 bg-card shadow-sm hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
              )}
            >
              {service.featured ? (
                <Badge className="absolute -top-3 right-6 rounded-full bg-lime-400 px-3 py-1 text-xs font-extrabold text-emerald-950 shadow">
                  Terpopuler
                </Badge>
              ) : null}

              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl",
                  service.featured
                    ? "bg-white/15 text-lime-300"
                    : "bg-emerald-50 text-emerald-600"
                )}
              >
                <service.icon className="size-6" aria-hidden />
              </span>

              <h3
                className={cn(
                  "mt-5 text-lg font-bold",
                  service.featured ? "text-white" : "text-emerald-950"
                )}
              >
                {service.title}
              </h3>
              <p
                className={cn(
                  "mt-2 flex-1 text-sm leading-relaxed",
                  service.featured ? "text-emerald-50/85" : "text-stone-600"
                )}
              >
                {service.desc}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-extrabold",
                    service.featured
                      ? "bg-white/15 text-lime-300"
                      : "bg-emerald-50 text-emerald-700"
                  )}
                >
                  {service.price}
                </span>
                <a
                  href={waLink(
                    `Halo Samara Green Laundry! Saya mau pesan layanan ${service.title} (${service.price}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-bold transition-all duration-300 group-hover:gap-2",
                    service.featured
                      ? "text-lime-300 hover:text-lime-200"
                      : "text-emerald-700 hover:text-emerald-600"
                  )}
                >
                  Pesan
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
