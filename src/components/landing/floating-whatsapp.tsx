"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { MessageCircle } from "lucide-react";

import { WA_DEFAULT_LINK } from "@/lib/site";

/** Floating WhatsApp bubble with pulsing ring; appears after slight scroll. */
export function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 320);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          key="floating-whatsapp"
          href={WA_DEFAULT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp Samara Green Laundry"
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50"
        >
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-30"
          />
          <span className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-900/40 transition-transform duration-300 group-hover:scale-110">
            <MessageCircle className="size-6" aria-hidden />
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-emerald-950 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
          >
            Chat Kami
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
