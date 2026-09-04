"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import { isOpenNow, type Outlet } from "@/lib/site";

/**
 * Badge status buka/tutup LIVE per outlet.
 * - "Buka Sekarang" (hijau, titik berdenyut) saat jam buka
 * - "Tutup · buka 07.00" saat di luar jam buka
 * Status dihitung di browser setelah mount (bebas hydration mismatch)
 * dan disegarkan otomatis setiap menit.
 */
export function OpenNowBadge({ outlet }: { outlet: Outlet }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow(outlet));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [outlet]);

  // Belum ter-hydrate → render placeholder dengan tinggi sama (anti layout shift)
  if (open === null) {
    return (
      <span
        aria-hidden
        className="inline-flex items-center gap-1.5 rounded-full bg-transparent px-3 py-1 text-[11px] font-bold"
      >
        <span className="size-2" />
      </span>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return open ? (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-lime-50 px-3 py-1 text-[11px] font-bold text-lime-800 ring-1 ring-lime-300"
      role="status"
      aria-label={`${outlet.name} sedang buka — tutup pukul ${pad(outlet.closeHour)}.00 WIB`}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
      </span>
      Buka Sekarang · tutup {pad(outlet.closeHour)}.00
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-[11px] font-bold text-stone-600 ring-1 ring-stone-300"
      role="status"
      aria-label={`${outlet.name} sedang tutup — buka besok pukul ${pad(outlet.openHour)}.00 WIB`}
    >
      <Clock className="size-3 text-amber-600" aria-hidden />
      Tutup · buka {pad(outlet.openHour)}.00
    </span>
  );
}
