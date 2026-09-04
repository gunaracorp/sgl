"use client";

import { motion } from "framer-motion";
import { Check, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Plan = {
  name: string;
  desc: string;
  prefix?: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
  cta: string;
};

const PLANS: Plan[] = [
  {
    name: "Kiloan Reguler",
    desc: "Hemat untuk kebutuhan harian keluarga.",
    price: "Rp 7.000",
    unit: "/kg",
    features: [
      "Cuci + kering + setrika",
      "Selesai 2 hari kerja",
      "Deterjen eco-friendly",
      "Pewangi standar premium",
      "Gratis antar-jemput area terdekat",
    ],
    cta: "Pilih Reguler",
  },
  {
    name: "Kilat Express",
    desc: "Untuk yang butuh selesai hari ini.",
    price: "Rp 12.000",
    unit: "/kg",
    features: [
      "Cuci + kering + setrika",
      "Selesai hanya 6 jam",
      "Prioritas antrian pengerjaan",
      "Pewangi premium pilihan",
      "Gratis antar-jemput min. 3 kg",
      "Garansi cuci ulang 100%",
    ],
    featured: true,
    cta: "Pesan Kilat Express",
  },
  {
    name: "Premium Satuan",
    desc: "Perawatan khusus untuk item berharga.",
    prefix: "mulai",
    price: "Rp 25.000",
    unit: "/item",
    features: [
      "Dry clean & cuci satuan",
      "Press manual profesional",
      "Parfum premium tahan lama",
      "Perawatan khusus bahan delikat",
      "Garansi cuci ulang 100%",
    ],
    cta: "Pesan Premium",
  },
];

/** 3 pricing cards, middle one featured ("Paling Laris"). */
export function Pricing() {
  return (
    <section id="harga" className="py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Daftar Harga"
          title={
            <>
              Harga Transparan,{" "}
              <span className="text-emerald-600">Tanpa Biaya Tersembunyi</span>
            </>
          }
          subtitle="Bayar setelah cucian selesai — tunai, QRIS, atau transfer. Sesimpel itu."
        />

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8 transition-shadow duration-300",
                plan.featured
                  ? "border-emerald-600 bg-gradient-to-b from-emerald-600 to-emerald-700 text-white shadow-2xl shadow-emerald-900/30 lg:scale-[1.04]"
                  : "border-stone-200/80 bg-card shadow-sm hover:shadow-xl hover:shadow-emerald-900/10"
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-lime-400 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-950 shadow-lg">
                  ⭐ Paling Laris
                </span>
              ) : null}

              <h3
                className={cn(
                  "text-lg font-extrabold",
                  plan.featured ? "text-white" : "text-emerald-950"
                )}
              >
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  plan.featured ? "text-emerald-50/80" : "text-stone-500"
                )}
              >
                {plan.desc}
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                {plan.prefix ? (
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      plan.featured ? "text-emerald-50/80" : "text-stone-500"
                    )}
                  >
                    {plan.prefix}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "text-4xl font-extrabold tracking-tight sm:text-[2.75rem]",
                    plan.featured ? "text-white" : "text-emerald-950"
                  )}
                >
                  {plan.price}
                </span>
                <span
                  className={cn(
                    "text-sm font-bold",
                    plan.featured ? "text-emerald-100/80" : "text-stone-500"
                  )}
                >
                  {plan.unit}
                </span>
              </div>

              <ul
                className="mt-7 flex-1 space-y-3"
                aria-label={`Fitur paket ${plan.name}`}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                        plan.featured
                          ? "bg-lime-400 text-emerald-950"
                          : "bg-emerald-100 text-emerald-700"
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        plan.featured ? "text-emerald-50/90" : "text-stone-600"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  "mt-8 h-12 w-full rounded-full text-base font-bold",
                  plan.featured
                    ? "bg-white text-emerald-700 shadow-lg hover:bg-lime-50"
                    : "shadow-md shadow-emerald-900/10"
                )}
                variant={plan.featured ? "default" : "outline"}
              >
                <a
                  href={waLink(
                    `Halo Samara Green Laundry! Saya mau pesan paket ${plan.name} (${plan.prefix ? plan.prefix + " " : ""}${plan.price}${plan.unit}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-center text-sm font-semibold text-emerald-800">
            <Truck className="size-4 shrink-0 text-emerald-600" aria-hidden />
            Gratis antar-jemput min. 3 kg untuk semua paket.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
