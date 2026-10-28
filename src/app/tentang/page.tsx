import type { Metadata } from "next";
import {
  Droplets,
  Leaf,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { AldinCard } from "@/components/landing/aldin";
import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { OpenNowBadge } from "@/components/landing/open-now-badge";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";
import { Stats } from "@/components/landing/stats";
import { Button } from "@/components/ui/button";
import {
  ALDIN,
  OUTLETS,
  outletWaLink,
  SITE,
  SITE_URL,
  WA_DEFAULT_LINK,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami — Samara Green Laundry | Laundry Eco-Friendly Semarang",
  description:
    "Kenali Samara Green Laundry: laundry ramah lingkungan dengan deterjen nabati, 3 outlet di Semarang, dan anggota resmi ALDIN. Bersih, segar, dan bumi ikut tersenyum.",
  alternates: { canonical: "/tentang/" },
  openGraph: {
    title: "Tentang Samara Green Laundry",
    description:
      "Laundry eco-friendly dengan deterjen nabati 100% — 3 outlet di Kota Semarang, anggota resmi Asosiasi Laundry Digital Indonesia.",
    url: `${SITE_URL}/tentang/`,
    type: "website",
  },
};

type Value = { icon: LucideIcon; title: string; desc: string };

const VALUES: Value[] = [
  {
    icon: Leaf,
    title: "Deterjen Nabati 100%",
    desc: "Bebas fosfat, berbahan tumbuhan, aman untuk kulit sensitif & bayi — limbah yang keluar pun ramah lingkungan.",
  },
  {
    icon: Droplets,
    title: "Hemat Air & Energi",
    desc: "Mesin front-loading efisiensi tinggi: air dan listrik jauh lebih hemat dibanding cuci konvensional.",
  },
  {
    icon: ShieldCheck,
    title: `Standar ${ALDIN.short}`,
    desc: ALDIN.desc,
  },
  {
    icon: Truck,
    title: "Antar-Jemput Gratis",
    desc: "Kurir kami menjemput & mengantar cucian gratis di radius sekitar outlet (±5 km) — cukup chat jadwalnya.",
  },
];

/** Halaman mandiri "Tentang Kami" — profil, misi, nilai, jangkauan outlet. */
export default function TentangPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Profil Kami"
          crumb="Tentang Kami"
          path="/tentang/"
          title={
            <>
              Bersih yang Baik untuk{" "}
              <em className="not-italic text-lime-400">Pakaian</em> &{" "}
              <em className="not-italic text-lime-400">Bumi</em>
            </>
          }
          description={`${SITE.name} adalah laundry premium ramah lingkungan di Kota Semarang — menggabungkan teknologi modern, deterjen nabati, dan pelayanan hangat khas keluarga.`}
        />

        {/* Cerita + keanggotaan ALDIN */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-8">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Cerita Kami
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Berawal dari satu outlet, tumbuh bersama{" "}
                <span className="text-emerald-600">warga Semarang</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600">
                <p>
                  Samara Green Laundry lahir dari keyakinan sederhana: cucian
                  bersih tidak boleh mengorbankan kesehatan kulit maupun
                  kelestarian bumi. Karena itu sejak hari pertama kami memakai{" "}
                  <strong className="font-bold text-emerald-800">
                    deterjen nabati eco-friendly
                  </strong>{" "}
                  — bukan sekadar slogan, tapi standar operasional di semua
                  outlet kami.
                </p>
                <p>
                  Kini tiga outlet kami melayani warga Pedurungan dan
                  sekitarnya — Tlogosari Kulon, Sendangguwo/Gemah, dan
                  Muktiharjo Kidul — dibuka setiap hari dengan layanan kiloan,
                  satuan, express 6 jam, hingga dry cleaning premium.
                </p>
                <p>
                  Setiap pelanggan adalah tetangga kami sendiri. Itulah
                  mengapa kami menjaga kualitas seperti menjaga nama baik
                  keluarga: teliti, jujur, dan selalu bisa dihubungi.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <AldinCard />
            </Reveal>
          </div>
        </section>

        <Stats />

        {/* Nilai yang kami pegang */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Nilai Kami
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                4 Janji di Balik Setiap Cucian
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-500">
                Prinsip yang membuat pelanggan kembali — dan merekomendasikan
                kami ke tetangganya.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value, i) => (
                <Reveal key={value.title} delay={0.08 * i}>
                  <article className="h-full rounded-3xl border border-stone-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <value.icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-emerald-950">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">
                      {value.desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Jangkauan outlet */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Jangkauan Kami
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                3 Outlet, <span className="text-emerald-600">Satu Standar</span>{" "}
                Kualitas
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {OUTLETS.map((outlet, i) => (
                <Reveal key={outlet.slug} delay={0.08 * i}>
                  <article className="flex h-full flex-col rounded-3xl border border-stone-200 bg-background p-6 shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-emerald-950">
                        Outlet {outlet.shortName}
                      </h3>
                      <OpenNowBadge outlet={outlet} />
                    </div>
                    <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-stone-500">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                      {outlet.addressLines.join(", ")}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-emerald-800">
                      {outlet.hoursDisplay} WIB · Setiap Hari
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      <Button
                        asChild
                        size="sm"
                        className="h-10 rounded-full bg-emerald-600 px-4 text-xs font-bold hover:bg-emerald-700"
                      >
                        <a href={outletWaLink(outlet)} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="size-4" aria-hidden />
                          Chat Outlet
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-10 rounded-full border-emerald-200 px-4 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                      >
                        <a href={`/outlet/${outlet.slug}/`}>Halaman Outlet</a>
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <Reveal className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 text-center shadow-2xl shadow-emerald-950/25 sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Kenalan lebih dekat?{" "}
              <em className="not-italic text-lime-400">Chat kami langsung.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-emerald-100/80">
              Tanya-tanya dulu boleh banget — tim kami balas cepat setiap hari
              selama jam operasional outlet.
            </p>
            <Button
              asChild
              className="mt-8 h-13 rounded-full bg-lime-400 px-8 text-base font-bold text-emerald-950 hover:bg-lime-300"
            >
              <a href={WA_DEFAULT_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden />
                Hubungi via WhatsApp
              </a>
            </Button>
          </Reveal>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
