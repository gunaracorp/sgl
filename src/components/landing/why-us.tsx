"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  Droplets,
  Leaf,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    icon: Leaf,
    title: "100% Eco-Friendly",
    desc: "Deterjen nabati dan pewangi alami yang aman untuk kulit, keluarga, dan bumi kita.",
  },
  {
    icon: ShieldCheck,
    title: "100% Garansi Cuci Ulang",
    desc: "Tidak puas dengan hasilnya? Kami cuci ulang gratis — tanpa ribet, tanpa drama.",
  },
  {
    icon: Truck,
    title: "Gratis Antar-Jemput",
    desc: "Kurir kami siap menjemput cucian dan mengantarnya kembali ke depan pintu rumah Anda.",
  },
  {
    icon: Clock,
    title: "Proses Kilat 6 Jam",
    desc: "Pakaian bersih dan wangi kembali dalam 6 jam dengan layanan express kami.",
  },
];

/** Split layout: eco-wash image with floating badge + 4 feature items. */
export function WhyUs() {
  const reduced = useReducedMotion();

  return (
    <section id="keunggulan" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-3 rotate-1 rounded-[2.5rem] bg-gradient-to-br from-lime-200/60 to-emerald-200/60"
          />
          <Image
            src="/images/eco-wash.png"
            alt="Mesin cuci dengan deterjen eco-friendly dan daun eukaliptus di Samara Green Laundry"
            width={1152}
            height={864}
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 90vw, 100vw"
            className="relative h-auto w-full rounded-[2rem] object-cover shadow-xl shadow-emerald-950/10 ring-1 ring-emerald-900/10"
          />
          <motion.div
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white/90 px-4 py-3 shadow-lg shadow-emerald-950/10 backdrop-blur sm:left-8"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <Droplets className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-emerald-950">
                Deterjen Aman Kulit Sensitif
              </p>
              <p className="text-xs text-stone-500">
                Formula nabati tanpa fosfat
              </p>
            </div>
          </motion.div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Kenapa Samara?"
            title={
              <>
                Lebih dari Sekadar{" "}
                <span className="text-emerald-600">Laundry Biasa</span>
              </>
            }
            subtitle="Kami menggabungkan teknologi modern, bahan alami, dan pelayanan tulus — supaya Anda benar-benar bebas repot."
          />

          <ul className="mt-10 space-y-6">
            {FEATURES.map((feature, i) => (
              <li key={feature.title}>
                <Reveal delay={i * 0.1} className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <feature.icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold text-emerald-950">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">
                      {feature.desc}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
