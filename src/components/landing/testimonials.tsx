"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Stars } from "./stars";

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  tone: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ibu Ratna",
    role: "Ibu Rumah Tangga",
    initials: "R",
    tone: "bg-emerald-100 text-emerald-700",
    quote:
      "Layanan kilatnya benar-benar penyelamat! Sore pesan, malam sudah selesai — wanginya tahan lama dan pakaian terlipat seperti baru.",
  },
  {
    name: "Pak Dedi",
    role: "Karyawan Swasta",
    initials: "D",
    tone: "bg-lime-100 text-lime-700",
    quote:
      "Gratis antar-jemputnya sangat membantu karena saya sibuk kerja. Cucian selalu rapi, wangi, dan tidak bau apek sama sekali.",
  },
  {
    name: "Sarah",
    role: "Mahasiswa",
    initials: "S",
    tone: "bg-stone-200 text-stone-700",
    quote:
      "Sebagai anak kos, layanan kilat 6 jam ini worth it banget! Sepatu dan selimut pun berani saya titip karena hasilnya bersih maksimal.",
  },
];

/** 3 testimonial cards with 5-star ratings and initial avatars. */
export function Testimonials() {
  return (
    <section id="testimoni" className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimoni"
          title={
            <>
              Kata Mereka yang Sudah{" "}
              <span className="text-emerald-600">Coba Sendiri</span>
            </>
          }
          subtitle="2.500+ pelanggan mempercayakan cucian mereka pada Samara Green Laundry. Ini sebagian cerita mereka."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-3xl border border-stone-200/80 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-900/10"
            >
              <Quote
                className="size-8 text-emerald-200"
                strokeWidth={1.5}
                aria-hidden
              />
              <Stars className="mt-4" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-5">
                <Avatar className="size-11 border border-emerald-100">
                  <AvatarFallback
                    className={cn(
                      "text-sm font-extrabold",
                      t.tone
                    )}
                  >
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-emerald-950">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
