import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/site";
import { Reveal } from "./reveal";

type PageHeroProps = {
  /** Chip label kecil di atas judul */
  eyebrow: string;
  /** Judul H1 — gunakan <em className="text-lime-400 not-italic">…</em> untuk highlight lime */
  title: ReactNode;
  description: string;
  /** Nama halaman untuk breadcrumb, mis. "Tentang Kami" */
  crumb: string;
  /** Path canonical untuk JSON-LD breadcrumb, mis. "/tentang/" */
  path: string;
};

/**
 * Hero banner untuk halaman mandiri — gradien emerald gelap sesuai JWDS
 * (pola "Hero Split + Trust Badge" versi halaman dalam) + breadcrumb
 * aksesibel + JSON-LD BreadcrumbList otomatis.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumb,
  path,
}: PageHeroProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: crumb, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Ornamen cahaya — konsisten dengan hero beranda */}
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-72 rounded-full bg-lime-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-28 -left-16 size-80 rounded-full bg-emerald-500/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs font-medium text-emerald-100/70">
            <li>
              <a href="/" className="transition-colors hover:text-lime-300">
                Beranda
              </a>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-bold text-lime-300">
              {crumb}
            </li>
          </ol>
        </nav>

        <Reveal className="mt-6 max-w-3xl">
          <span className="inline-block rounded-full bg-emerald-800/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-lime-300 ring-1 ring-lime-400/30">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-emerald-100/80 sm:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
