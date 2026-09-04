"use client";

import { motion } from "framer-motion";

import { CountUp } from "./count-up";

type Stat = {
  end: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const STATS: Stat[] = [
  { end: 12000, suffix: "+", label: "Cucian Selesai" },
  { end: 2500, suffix: "+", label: "Pelanggan Puas" },
  { end: 4.9, suffix: "", label: "Rating Google", decimals: 1 },
  { end: 5, suffix: "+", label: "Tahun Melayani" },
];

/** Dark forest-green stats strip with animated count-up numbers. */
export function Stats() {
  return (
    <section
      aria-label="Statistik Samara Green Laundry"
      className="relative overflow-hidden bg-emerald-950"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900"
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-72 rounded-full bg-lime-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 size-72 rounded-full bg-emerald-500/15 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-16">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              <CountUp
                end={stat.end}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
              />
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-100/60 sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
