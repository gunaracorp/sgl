import type { Metadata } from "next";
import { BadgePercent, CreditCard, MessageCircle, Phone, Wallet } from "lucide-react";

import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { OpenNowBadge } from "@/components/landing/open-now-badge";
import { PageHero } from "@/components/landing/page-hero";
import { OutletPricelist } from "@/components/landing/outlet-pricelist";
import { Reveal } from "@/components/landing/reveal";
import { Button } from "@/components/ui/button";
import {
  BUDGET_PLANS,
  OUTLETS,
  outletTelLink,
  outletWaLink,
  SITE_URL,
  WA_DEFAULT_LINK,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Daftar Harga Laundry Semarang 2025 — Mulai Rp 1.000/kg | Samara Green Laundry",
  description:
    "Price list resmi Samara Green Laundry: cuci bersih Rp 1.000/kg, cuci kering Rp 2.500/kg, express 5 jam, harga satuan & self service. Price list lengkap outlet Malangsari + harga brand semua outlet.",
  alternates: { canonical: "/harga/" },
  openGraph: {
    title: "Daftar Harga Samara Green Laundry",
    description:
      "Harga jujur tanpa biaya tersembunyi — reguler mulai Rp 4.500/kg di outlet Malangsari, express selesai 5 jam, self service Rp 1.000/kg.",
    url: `${SITE_URL}/harga/`,
    type: "website",
  },
};

/** Harga brand — berlaku di outlet selain yang punya price list khusus. */
const BRAND_PRICES = [
  "Cuci Bersih — Rp 1.000/kg",
  "Cuci Kering — Rp 2.500/kg",
  "Cuci Kering Lipat — Rp 4.500/kg",
  "Cuci Kering Setrika — mulai Rp 6.500/kg",
  "Cuci Sepatu — mulai Rp 20.000",
  "Dry Cleaning — mulai Rp 20.000",
];

const PAYMENTS = [
  { icon: Wallet, label: "Tunai" },
  { icon: BadgePercent, label: "QRIS" },
  { icon: CreditCard, label: "Transfer Bank" },
];

/** Halaman mandiri "Harga" — price list brand + price list resmi per outlet. */
export default function HargaPage() {
  const otherOutlets = OUTLETS.filter(
    (outlet) => outlet.slug !== "malangsari"
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Price List Resmi"
          crumb="Daftar Harga"
          path="/harga/"
          title={
            <>
              Harga <em className="not-italic text-lime-400">Jujur</em>, Tanpa
              Biaya Tersembunyi
            </>
          }
          description="Bayar setelah cucian selesai — tanpa DP. Harga brand berlaku di semua outlet; outlet Malangsari punya papan harga resmi yang lebih lengkap."
        />

        {/* Paket kiloan brand */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Paket Kiloan Hemat
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Mulai dari{" "}
                <span className="text-emerald-600">Rp 1.000/kg</span> saja
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {BUDGET_PLANS.map((plan, i) => (
                <Reveal key={plan.name} delay={0.08 * i}>
                  <article className="h-full rounded-3xl border border-stone-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-lg font-bold text-emerald-950">
                      {plan.name}
                    </h3>
                    <p className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tabular-nums text-emerald-700">
                        {plan.price}
                      </span>
                      <span className="text-sm font-semibold text-stone-400">
                        {plan.unit}
                      </span>
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-500">
                      {plan.desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Metode pembayaran */}
            <Reveal delay={0.2}>
              <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-6 py-4">
                <span className="text-sm font-bold text-emerald-900">
                  Bayar setelah jadi via:
                </span>
                {PAYMENTS.map((payment) => (
                  <span
                    key={payment.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-800 ring-1 ring-emerald-100"
                  >
                    <payment.icon className="size-3.5" aria-hidden />
                    {payment.label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Price list resmi outlet Malangsari (komponen reuse dari halaman outlet) */}
        <OutletPricelist outlet={OUTLETS[0]} />

        {/* Harga di outlet lain */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Outlet Lainnya
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Harga Brand di{" "}
                <span className="text-emerald-600">Sendangguwo & Dempel</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-500">
                Kedua outlet ini memakai harga brand di bawah — konfirmasi
                detail item spesial lewat WhatsApp outlet masing-masing.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {otherOutlets.map((outlet, i) => (
                <Reveal key={outlet.slug} delay={0.1 * i}>
                  <article className="flex h-full flex-col rounded-3xl border border-stone-200 bg-background p-6 shadow-md sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-emerald-950">
                          Outlet {outlet.shortName}
                        </h3>
                        <p className="mt-1 text-sm text-stone-500">
                          {outlet.area} · {outlet.hoursDisplay} WIB
                        </p>
                      </div>
                      <OpenNowBadge outlet={outlet} />
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {BRAND_PRICES.map((price) => (
                        <li
                          key={price}
                          className="flex items-center justify-between gap-3 border-b border-dashed border-stone-200 pb-2.5 text-sm"
                        >
                          <span className="font-semibold text-stone-700">
                            {price.split(" — ")[0]}
                          </span>
                          <span className="shrink-0 font-bold tabular-nums text-emerald-800">
                            {price.split(" — ")[1]}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      <Button
                        asChild
                        size="sm"
                        className="h-11 rounded-full bg-emerald-600 px-5 text-xs font-bold hover:bg-emerald-700"
                      >
                        <a href={outletWaLink(outlet)} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="size-4" aria-hidden />
                          Tanya Harga
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-11 rounded-full border-emerald-200 px-5 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                      >
                        <a href={outletTelLink(outlet)}>
                          <Phone className="size-4" aria-hidden />
                          {outlet.phoneDisplay}
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="h-11 rounded-full px-4 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                      >
                        <a href={`/outlet/${outlet.slug}/`}>Halaman Outlet →</a>
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
