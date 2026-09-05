import { BadgeCheck, ShieldCheck } from "lucide-react";

import { ALDIN } from "@/lib/site";

/**
 * Badge keanggotaan ALDIN (Asosiasi Laundry Digital Indonesia).
 * - AldinPill  : chip kecil untuk hero / footer
 * - AldinCard  : kartu membership premium untuk section "Kenapa Samara?"
 * Keduanya murni presentasional — data dari konstanta ALDIN (src/lib/site.ts).
 */

/** Chip ringkas: ikon verifikasi + label Anggota Resmi + nama asosiasi. */
export function AldinPill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2.5 rounded-2xl border border-emerald-200 bg-white/80 py-2 pl-2.5 pr-4 shadow-sm backdrop-blur ${className}`}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
        <BadgeCheck className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[13px] font-extrabold text-emerald-950">
          {ALDIN.label} {ALDIN.short}
        </span>
        <span className="block truncate text-[11px] font-medium text-stone-500">
          {ALDIN.name}
        </span>
      </span>
    </span>
  );
}

/** Kartu membership premium — gradient hijau tua + emblem + shimmer sweep. */
export function AldinCard() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-6 text-white shadow-lg shadow-emerald-950/20 sm:p-7">
      {/* shimmer sweep */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      {/* glow dekoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-lime-400/15 blur-3xl"
      />

      <div className="relative flex items-start gap-4 sm:gap-5">
        {/* Emblem monogram ALDIN */}
        <span
          aria-hidden
          className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-lime-300 to-emerald-400 text-emerald-950 shadow-md sm:size-16"
        >
          <ShieldCheck className="size-7 sm:size-8" />
          <span className="absolute -bottom-1.5 -right-1.5 grid size-6 place-items-center rounded-full border-2 border-emerald-900 bg-emerald-950 text-lime-300">
            <BadgeCheck className="size-3.5" />
          </span>
        </span>

        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-lime-300">
            {ALDIN.label}
          </p>
          <h3 className="mt-1.5 text-base font-extrabold leading-snug tracking-tight sm:text-lg">
            {ALDIN.name}{" "}
            <span className="text-lime-300">({ALDIN.short})</span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/80">
            {ALDIN.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
