"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Leaf, MessageCircle, Zap } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WA_DEFAULT_LINK } from "@/lib/site";
import { Stars } from "./stars";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const LINE_1 = ["Pakaian", "Bersih", "&", "Segar,"];

const AVATARS = [
  { initials: "RA", tone: "bg-emerald-100 text-emerald-700" },
  { initials: "DS", tone: "bg-lime-100 text-lime-700" },
  { initials: "SA", tone: "bg-stone-200 text-stone-700" },
  { initials: "BR", tone: "bg-emerald-600 text-white" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const float = (duration: number, delay = 0) => ({
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  });

  return (
    <section id="beranda" className="relative overflow-hidden">
      {/* Decorative gradient blobs (slow drift, transform/opacity only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 size-[28rem] rounded-full bg-emerald-200/40 blur-3xl"
        animate={reduced ? undefined : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={float(18)}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 size-[22rem] rounded-full bg-lime-300/30 blur-3xl"
        animate={reduced ? undefined : { x: [0, -35, 15, 0], y: [0, 25, -15, 0] }}
        transition={float(22)}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 size-72 rounded-full bg-emerald-100/50 blur-3xl"
        animate={reduced ? undefined : { x: [0, 20, -30, 0] }}
        transition={float(26)}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-28 lg:pt-20">
        {/* Left: copy */}
        <motion.div
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur sm:text-sm"
          >
            ✨ Laundry Premium Ramah Lingkungan #1
          </motion.span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-emerald-950 sm:text-5xl xl:text-6xl">
            <span className="block">
              {LINE_1.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariant}
                  className="mr-[0.28em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span variants={wordVariant} className="mt-2 inline-block">
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute -inset-x-3 inset-y-1 -rotate-1 rounded-xl bg-lime-300/80"
                />
                <span className="relative italic text-emerald-800">
                  Bebas Repot.
                </span>
              </span>
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base leading-relaxed text-stone-600 sm:text-lg"
          >
            Layanan laundry kilat 6 jam dengan deterjen eco-friendly — dijemput
            dan diantar langsung ke rumah Anda. Cukup duduk manis, kami yang
            urus semuanya.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              className="btn-pulse h-13 rounded-full px-7 text-base shadow-lg shadow-emerald-900/25"
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
              className="h-13 rounded-full border-emerald-700/30 bg-white/60 px-7 text-base text-emerald-800 backdrop-blur hover:bg-emerald-50 hover:text-emerald-800"
            >
              <a href="#harga">Lihat Harga</a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <div className="flex -space-x-3">
              {AVATARS.map((avatar) => (
                <span
                  key={avatar.initials}
                  className={cn(
                    "grid size-11 place-items-center rounded-full border-2 border-white text-xs font-extrabold shadow-sm",
                    avatar.tone
                  )}
                >
                  {avatar.initials}
                </span>
              ))}
              <span className="grid size-11 place-items-center rounded-full border-2 border-white bg-white text-[10px] font-extrabold text-emerald-700 shadow-sm">
                2.5rb+
              </span>
            </div>
            <div>
              <Stars />
              <p className="mt-1 text-sm font-medium text-stone-600">
                4.9/5 dari 2.500+ pelanggan puas
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: image + floating glass cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-3 -rotate-2 rounded-[2.75rem] bg-gradient-to-br from-emerald-200/70 via-lime-200/50 to-emerald-100/60"
          />
          <motion.div
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={float(6)}
            className="relative"
          >
            <Image
              src="/images/hero-laundry.png"
              alt="Interior laundry modern Samara Green Laundry dengan tumpukan handuk bersih terlipat rapi"
              width={1344}
              height={768}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-[2.5rem] object-cover shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-900/10"
            />
          </motion.div>

          <motion.div
            animate={reduced ? undefined : { y: [0, -9, 0] }}
            transition={float(5, 0.6)}
            className="absolute -left-3 top-8 sm:-left-8"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg shadow-emerald-950/10 backdrop-blur-md">
              <span className="grid size-10 place-items-center rounded-xl bg-lime-100 text-lime-600">
                <Zap className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  ⚡ Selesai 6 Jam
                </p>
                <p className="text-xs text-stone-500">Laundry Kilat Express</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={reduced ? undefined : { y: [0, 10, 0] }}
            transition={float(6.5, 0.3)}
            className="absolute -bottom-5 right-2 sm:-right-6"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg shadow-emerald-950/10 backdrop-blur-md">
              <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Leaf className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  🌿 100% Deterjen Eco-Friendly
                </p>
                <p className="text-xs text-stone-500">
                  Aman untuk kulit sensitif
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
