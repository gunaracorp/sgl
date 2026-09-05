"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE, WA_DEFAULT_LINK } from "@/lib/site";
import { Reveal } from "./reveal";

/** Gradient green CTA banner with decorative circles + delivery imagery. */
export function CtaBanner() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Ajakan memesan sekarang"
      className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
    >
      <Reveal className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 shadow-2xl shadow-emerald-900/30">
        <div
          aria-hidden
          className="absolute -right-20 -top-24 size-72 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -left-16 size-56 rounded-full bg-lime-300/20"
        />
        <div
          aria-hidden
          className="absolute right-1/3 top-1/2 size-24 rounded-full bg-lime-300/25"
        />

        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:p-16">
          <div>
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Siap Pakaian Anda Bersih &amp; Wangi Hari Ini?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-emerald-50/85 sm:text-lg">
              Klik tombol di bawah — kurir kami siap menjemput cucian Anda hari
              ini juga. Gratis antar-jemput area terdekat!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="btn-pulse h-13 rounded-full bg-white px-7 text-base font-bold text-emerald-700 shadow-xl hover:bg-lime-50"
              >
                <a
                  href={WA_DEFAULT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden />
                  Pesan via WhatsApp
                </a>
              </Button>
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-lg font-extrabold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="size-5" aria-hidden />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="relative hidden h-72 sm:block">
            <motion.div
              animate={
                reduced ? undefined : { y: [0, -8, 0], rotate: [1.5, 0, 1.5] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-[85%]"
            >
              <Image
                src="/images/delivery.png"
                alt="Kurir Samara Green Laundry berseragam hijau membawa tas cucian siap diantar"
                width={1152}
                height={864}
                sizes="(min-width: 1024px) 30vw, 40vw"
                className="h-full w-full rounded-3xl object-cover shadow-2xl ring-4 ring-white/20"
              />
            </motion.div>
            <motion.div
              animate={
                reduced ? undefined : { y: [0, 8, 0], rotate: [-8, -4, -8] }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-6 left-0 size-36 lg:size-40"
            >
              <Image
                src="/images/folded-clothes.png"
                alt="Tumpukan pakaian bersih terlipat rapi dengan bunga lavender"
                width={1024}
                height={1024}
                sizes="160px"
                className="h-full w-full rounded-2xl border-4 border-white object-cover shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
