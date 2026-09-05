"use client";

import { Quote } from "lucide-react";
import type { CSSProperties } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TESTIMONIAL_ROWS, type Testimonial } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Stars } from "./stars";

/** One testimonial card: stars, quote, avatar, name, area & time. */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="relative flex w-[300px] shrink-0 flex-col rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-900/10 sm:w-[350px]">
      <div className="flex items-center justify-between gap-2">
        <Stars rating={t.rating} />
        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
          {t.service}
        </span>
      </div>

      <Quote
        className="mt-4 size-7 text-emerald-200"
        strokeWidth={1.5}
        aria-hidden
      />
      <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">
        <Avatar className="size-10 border border-emerald-100">
          <AvatarFallback className={cn("text-xs font-extrabold", t.tone)}>
            {t.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-emerald-950">{t.name}</p>
          <p className="truncate text-xs text-stone-500">
            {t.area} · {t.time}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Satu baris marquee: konten diduplikasi 2× lalu dianimasikan -50%,
 * sehingga loop berjalan mulus tanpa putus. Berhenti saat di-hover.
 */
function TestimonialRow({
  items,
  reverse = false,
  duration,
}: {
  items: readonly Testimonial[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div
      className="marquee-mask relative mt-6 overflow-hidden"
      style={{ "--marquee-duration": duration } as CSSProperties}
    >
      <div
        className={cn(
          "flex w-max hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-5 pr-5" aria-hidden={copy === 1}>
            {items.map((t) => (
              <TestimonialCard key={`${copy}-${t.name}`} t={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Section "Testimoni": ringkasan rating + 3 baris marquee berjalan
 * (arah selang-seling, kecepatan berbeda) berisi 21 testimoni pelanggan.
 */
export function Testimonials() {
  const durations = ["58s", "74s", "66s"];

  return (
    <section
      id="testimoni"
      className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimoni"
          title={
            <>
              Kata Mereka yang Sudah{" "}
              <span className="text-emerald-600">Coba Sendiri</span>
            </>
          }
          subtitle="Ribuan pelanggan di Semarang mempercayakan cucian mereka pada Samara Green Laundry. Ini sebagian cerita asli mereka."
        />

        {/* Ringkasan rating */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 shadow-sm">
            <Stars />
            <span className="text-sm font-extrabold text-emerald-950">4,9 / 5</span>
            <span aria-hidden className="hidden h-4 w-px bg-stone-200 sm:block" />
            <span className="text-sm text-stone-600">
              dari <strong className="text-emerald-800">2.500+ ulasan</strong>{" "}
              pelanggan Semarang
            </span>
          </div>
        </div>
      </div>

      {/* 3 baris marquee — arah & kecepatan bervariasi */}
      <div className="mt-8">
        {TESTIMONIAL_ROWS.map((row, i) => (
          <TestimonialRow
            key={i}
            items={row}
            reverse={i % 2 === 1}
            duration={durations[i % durations.length]}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-stone-400">
        Arahkan kursor untuk menjeda — testimoni dari pelanggan outlet Semarang.
      </p>
    </section>
  );
}
