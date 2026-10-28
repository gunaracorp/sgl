"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  galleryImgPath,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery-data";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/**
 * Grid galeri + filter kategori + lightbox keyboard-accessible.
 * Kategori "semua" menampilkan seluruh foto.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory | "semua">("semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo<readonly GalleryItem[]>(
    () =>
      active === "semua"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === active),
    [active]
  );

  // Tutup lightbox & navigasi via keyboard (ESC / panah)
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i === null ? null : (i + 1) % filtered.length
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + filtered.length) % filtered.length
        );
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, filtered.length]);

  // Kunci scroll body saat lightbox terbuka
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  const openLightbox = useCallback((item: GalleryItem) => {
    setLightboxIndex(filtered.indexOf(item));
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length
      ),
    [filtered.length]
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  const current =
    lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* Filter kategori */}
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter galeri berdasarkan kategori"
      >
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setActive(cat.id);
              setLightboxIndex(null);
            }}
            aria-pressed={active === cat.id}
            className={cn(
              "min-h-11 rounded-full px-5 py-2 text-sm font-bold transition-all duration-300",
              active === cat.id
                ? "bg-emerald-900 text-lime-300 shadow-lg shadow-emerald-900/20"
                : "border border-stone-200 bg-white text-stone-600 hover:border-emerald-300 hover:text-emerald-700"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid foto */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <Reveal key={item.src} delay={0.05 * (i % 6)}>
            <figure className="group relative h-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <button
                type="button"
                onClick={() => openLightbox(item)}
                className="block w-full cursor-zoom-in text-left"
                aria-label={`Perbesar foto: ${item.alt}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={galleryImgPath(item)}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay saat hover */}
                  <span className="absolute inset-0 flex items-center justify-center bg-emerald-950/0 opacity-0 transition-all duration-300 group-hover:bg-emerald-950/40 group-hover:opacity-100">
                    <span className="grid size-12 place-items-center rounded-full bg-lime-400 text-emerald-950 shadow-lg">
                      <Expand className="size-5" aria-hidden />
                    </span>
                  </span>
                </div>
              </button>
              <figcaption className="p-4">
                <p className="text-sm font-semibold leading-snug text-emerald-950">
                  {item.caption}
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  {GALLERY_CATEGORIES.find((c) => c.id === item.category)
                    ?.label}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-emerald-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto galeri: ${current.alt}`}
          onClick={closeLightbox}
        >
          {/* Tombol tutup */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Tutup galeri"
          >
            <X className="size-5" aria-hidden />
          </button>

          {/* Navigasi kiri */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>

          {/* Navigasi kanan */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>

          {/* Gambar aktif */}
          <figure
            className="flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={galleryImgPath(current)}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-4 max-w-xl text-center text-sm text-emerald-100/90">
              {current.caption}
            </figcaption>
            <p className="mt-1 text-xs tabular-nums text-emerald-100/50">
              {lightboxIndex! + 1} / {filtered.length}
            </p>
          </figure>
        </div>
      )}
    </>
  );
}
