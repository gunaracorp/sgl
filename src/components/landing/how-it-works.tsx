"use client";

import { motion, type Variants } from "framer-motion";
import {
  MessageCircle,
  PackageCheck,
  Truck,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "./section-heading";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

type Step = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    icon: MessageCircle,
    title: "Chat WhatsApp",
    desc: "Klik tombol WhatsApp dan kirim pesan — tim kami membalas dalam hitungan menit.",
  },
  {
    icon: Truck,
    title: "Kurir Jemput Cucian",
    desc: "Atur jadwal, kurir kami datang ke rumah Anda tanpa biaya antar-jemput.",
  },
  {
    icon: WashingMachine,
    title: "Proses Higienis & Steril",
    desc: "Cucian dipisah per kategori dan dicuci dengan deterjen eco-friendly bersuhu terkontrol.",
  },
  {
    icon: PackageCheck,
    title: "Antar Kembali Segar & Wangi",
    desc: "Pakaian terlipat rapi dan disegarkan, diantar kembali ke Anda tepat waktu.",
  },
];

/** Dark green section: 4 numbered steps with dashed connector line. */
export function HowItWorks() {
  return (
    <section
      id="cara-pesan"
      className="relative overflow-hidden bg-emerald-950 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-transparent to-emerald-900/40"
      />
      <div
        aria-hidden
        className="absolute -right-32 top-0 size-96 rounded-full bg-emerald-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-32 bottom-0 size-96 rounded-full bg-lime-500/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Cara Pesan"
          title={
            <>
              Pesan dalam 4 Langkah{" "}
              <span className="text-lime-300">Mudah</span>
            </>
          }
          subtitle="Tanpa antri, tanpa ribet — memesan laundry semudah chat teman."
        />

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-16 grid gap-12 md:grid-cols-4 md:gap-8"
        >
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-9 hidden border-t-2 border-dashed border-emerald-500/30 md:block"
          />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              variants={item}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative">
                <span className="grid size-18 place-items-center rounded-3xl bg-emerald-800/70 ring-1 ring-emerald-500/30 backdrop-blur">
                  <step.icon className="size-8 text-lime-300" aria-hidden />
                </span>
                <span className="absolute -right-2.5 -top-2.5 grid size-7 place-items-center rounded-full bg-lime-400 text-xs font-extrabold text-emerald-950 shadow">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold text-white sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-emerald-100/60">
                {step.desc}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
