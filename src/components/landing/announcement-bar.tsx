"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import { WA_DEFAULT_LINK } from "@/lib/site";

/** Dark green top bar with shimmer sweep + closeable. */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden bg-emerald-950 text-white"
          role="region"
          aria-label="Pengumuman"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="animate-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-12 py-2.5 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-medium sm:text-sm">
              🌱 <span className="font-bold">Gratis Antar-Jemput</span> area
              terdekat — sekarang!
            </p>
            <a
              href={WA_DEFAULT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-lime-300 transition-colors hover:bg-white/20 hover:text-lime-200 sm:inline-flex"
            >
              Pesan Sekarang
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup pengumuman"
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" aria-hidden />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
