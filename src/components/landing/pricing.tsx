"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Droplets,
  Layers,
  Sparkles,
  Truck,
  WashingMachine,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUDGET_PLANS, waLink } from "@/lib/site";
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
  icon: LucideIcon;
};

const PLANS: Plan[] = [
  {
    name: "Kiloan Reguler",
    desc: "Cuci kering + setrika untuk kebutuhan harian keluarga.",
    prefix: "mulai dari",
    price: "Rp 6.500",
    unit: "/kg",
    features: [
      "Cuci + kering + setrika",
      "Selesai 2 hari kerja",
      "Deterjen eco-friendly",
      "Pewangi standar premium",
      "Gratis antar-jemput area terdekat",
    ],
    cta: "Pesan Reguler",
    icon: WashingMachine,
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
    icon: Zap,
  },
  {
    name: "Premium Satuan",
    desc: "Perawatan khusus untuk item berharga.",
    prefix: "mulai dari",
    price: "Rp 20.000",
    unit: "/item",
    features: [
      "Dry clean & cuci satuan",
      "Press manual profesional",
      "Parfum premium tahan lama",
      "Perawatan khusus bahan delikat",
      "Garansi cuci ulang 100%",
    ],
    cta: "Pesan Premium",
    icon: Sparkles,
  },
];

/** 3 pricing cards (middle one featured "Paling Laris") + strip Paket Hemat. */
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
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
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

                {/* Header: ikon + nama */}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-2xl",
                      plan.featured
                        ? "bg-lime-400 text-emerald-950 shadow-md shadow-emerald-900/20"
                        : "bg-emerald-100 text-emerald-700"
                    )}
                  >
                    <Icon className="size-5.5" aria-hidden />
                  </span>
                  <h3
                    className={cn(
                      "text-lg font-extrabold leading-tight",
                      plan.featured ? "text-white" : "text-emerald-950"
                    )}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    plan.featured ? "text-emerald-50/80" : "text-stone-500"
                  )}
                >
                  {plan.desc}
                </p>

                {/* Harga: badge "mulai dari" rapi di atas angka */}
                <div className="mt-6">
                  {plan.prefix ? (
                    <span
                      className={cn(
                        "mb-2 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                        plan.featured
                          ? "bg-white/15 text-lime-300"
                          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70"
                      )}
                    >
                      {plan.prefix}
                    </span>
                  ) : null}
                  <div className="flex items-baseline gap-1.5">
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
                            : "bg-emerald-600 text-white"
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
                    "mt-8 h-12 w-full rounded-full text-base font-bold transition-colors duration-300",
                    plan.featured
                      ? "bg-white text-emerald-700 shadow-lg hover:bg-lime-50"
                      : "bg-emerald-600 text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-700 hover:shadow-lg"
                  )}
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
            );
          })}
        </div>

        {/* Paket hemat: layanan kiloan tanpa setrika (dari BUDGET_PLANS) */}
        <Reveal className="mt-12">
          <div className="rounded-3xl border border-emerald-900/10 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-sm sm:p-8">
            <h3 className="text-center text-xl font-extrabold tracking-tight text-emerald-950 sm:text-2xl">
              Paket Hemat Kiloan{" "}
              <span className="text-emerald-600">— Tanpa Setrika</span>
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-stone-600">
              Butuh cucian bersih dengan biaya paling ekonomis? Pilihan pintar
              untuk cucian harian:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {BUDGET_PLANS.map((plan, i) => {
                const Icons: LucideIcon[] = [Droplets, WashingMachine, Layers];
                const Icon = Icons[i % Icons.length];
                return (
                  <div
                    key={plan.name}
                    className="group flex flex-col rounded-2xl border border-dashed border-emerald-300 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-md"
                  >
                    <span className="mx-auto grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon className="size-5.5" aria-hidden />
                    </span>
                    <h4 className="mt-3 font-extrabold text-emerald-950">
                      {plan.name}
                    </h4>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-stone-500">
                      {plan.desc}
                    </p>
                    <div className="mt-3 flex items-baseline justify-center gap-0.5">
                      <span className="text-2xl font-extrabold tracking-tight text-emerald-700 sm:text-[1.7rem]">
                        {plan.price}
                      </span>
                      <span className="text-sm font-bold text-stone-500">
                        {plan.unit}
                      </span>
                    </div>
                    <a
                      href={waLink(
                        `Halo Samara Green Laundry! Saya mau pesan paket hemat ${plan.name} (${plan.price}${plan.unit}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-bold text-emerald-700 transition-all duration-300 group-hover:gap-2 hover:text-emerald-600"
                      aria-label={`Pesan paket hemat ${plan.name} via WhatsApp`}
                    >
                      Pesan Hemat
                      <ArrowRight className="size-4" aria-hidden />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

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
