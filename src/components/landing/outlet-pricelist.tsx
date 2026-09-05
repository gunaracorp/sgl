import {
  BadgePercent,
  Bike,
  Hand,
  MessageCircle,
  Phone,
  Shirt,
  WashingMachine,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import {
  formatRp,
  getOutletPricelist,
  outletTelLink,
  outletWaLink,
  type Outlet,
} from "@/lib/site";

/**
 * Section "Daftar Harga" KHUSUS outlet — dirender hanya untuk outlet yang
 * punya data di OUTLET_PRICELISTS (src/lib/site.ts). Server component murni
 * (statis), animasi via Reveal. Anchor #harga untuk deep-link dari beranda.
 */

/** Baris harga kiloan: nama kiri — harga kanan, garis putus-putus di antara. */
function PriceRow({
  name,
  price,
  dark = false,
}: {
  name: string;
  price: string;
  dark?: boolean;
}) {
  return (
    <li
      className={`flex items-baseline justify-between gap-3 border-b border-dashed py-2.5 text-sm last:border-b-0 ${
        dark ? "border-white/15" : "border-stone-200"
      }`}
    >
      <span className={`font-semibold ${dark ? "text-emerald-50" : "text-stone-700"}`}>
        {name}
      </span>
      <span
        className={`whitespace-nowrap font-extrabold tabular-nums ${
          dark ? "text-lime-300" : "text-emerald-800"
        }`}
      >
        {price}
      </span>
    </li>
  );
}

export function OutletPricelist({ outlet }: { outlet: Outlet }) {
  const pl = getOutletPricelist(outlet.slug);
  if (!pl) return null;

  return (
    <section
      id="harga"
      aria-label={`Price list resmi ${outlet.name}`}
      className="relative scroll-mt-20 overflow-hidden bg-emerald-50/60 py-16 lg:py-20"
    >
      {/* dekorasi blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 size-96 rounded-full bg-lime-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 size-96 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm">
            <BadgePercent className="size-3.5" aria-hidden />
            Price List Resmi Outlet
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
            Daftar Harga <span className="text-emerald-600">{outlet.shortName}</span>
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            Harga resmi yang berlaku khusus di {outlet.name} — {outlet.streetAddress}.
            Sama seperti papan harga di outlet.
          </p>
        </Reveal>

        {/* Kiloan: Reguler + Express */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Reguler */}
          <Reveal>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"
                >
                  <WashingMachine className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-extrabold tracking-tight text-emerald-950">
                    Kiloan Reguler
                  </h3>
                  <p className="text-xs font-semibold text-stone-500">per kilo · /kg</p>
                </div>
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-500">
                  1 Hari Jadi
                </span>
              </div>
              <ul className="mt-4 flex-1" aria-label="Harga kiloan reguler per kg">
                {pl.reguler.map((item) => (
                  <PriceRow key={item.name} name={item.name} price={`${formatRp(item.price)}/kg`} />
                ))}
              </ul>
              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-semibold leading-relaxed text-emerald-900 ring-1 ring-emerald-100">
                {pl.regulerNote}
              </p>
            </div>
          </Reveal>

          {/* Express — kartu unggulan */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 p-6 text-white shadow-lg shadow-emerald-900/25 sm:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-lime-400/15 blur-3xl"
              />
              <div className="relative flex flex-wrap items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-lime-300/90 text-emerald-950"
                >
                  <Zap className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-extrabold tracking-tight">Kiloan Express</h3>
                  <p className="text-xs font-semibold text-emerald-100/75">per kilo · /kg</p>
                </div>
                <span className="rounded-full bg-lime-300 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-950">
                  5 Jam Jadi
                </span>
              </div>
              <ul className="relative mt-4 flex-1" aria-label="Harga kiloan express per kg">
                {pl.express.map((item) => (
                  <PriceRow key={item.name} name={item.name} price={`${formatRp(item.price)}/kg`} dark />
                ))}
              </ul>
              <p className="relative mt-4 rounded-2xl bg-white/10 px-4 py-3 text-xs font-semibold leading-relaxed text-emerald-50 ring-1 ring-white/15">
                {pl.expressNote}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Satuan + Self Service / Antar-jemput / CTA */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Tabel satuan */}
          <Reveal>
            <div className="h-full overflow-hidden rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"
                >
                  <Shirt className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-extrabold tracking-tight text-emerald-950">
                    Laundry Satuan
                  </h3>
                  <p className="text-xs font-semibold text-stone-500">per piece · ukuran kecil / besar</p>
                </div>
              </div>

              <table className="mt-5 w-full text-sm">
                <caption className="sr-only">
                  Harga laundry satuan di {outlet.name} — ukuran kecil dan besar
                </caption>
                <thead>
                  <tr className="border-b-2 border-emerald-100 text-left text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                    <th scope="col" className="pb-2.5">
                      Item
                    </th>
                    <th scope="col" className="pb-2.5 text-right">
                      Kecil
                    </th>
                    <th scope="col" className="pb-2.5 text-right">
                      Besar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-stone-200">
                  {pl.satuan.map((item) => (
                    <tr key={item.name}>
                      <th scope="row" className="py-2.5 text-left font-semibold text-stone-700">
                        {item.name}
                      </th>
                      <td className="py-2.5 text-right font-extrabold tabular-nums text-emerald-800">
                        {item.kecil ? (
                          formatRp(item.kecil)
                        ) : (
                          <span className="text-xs font-medium italic text-stone-400">Hubungi</span>
                        )}
                      </td>
                      <td className="py-2.5 text-right font-extrabold tabular-nums text-emerald-800">
                        {item.besar ? (
                          formatRp(item.besar)
                        ) : (
                          <span className="text-xs font-medium italic text-stone-400">outlet</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs leading-relaxed text-stone-400">
                *DLL (item lainnya) — hubungi outlet untuk penawaran harga.
              </p>
            </div>
          </Reveal>

          {/* Kolom kanan: Self Service + Gratis antar-jemput + CTA */}
          <div className="grid content-start gap-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"
                  >
                    <Hand className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-extrabold tracking-tight text-emerald-950">
                      Self Service
                    </h3>
                    <p className="text-xs font-semibold text-stone-500">per kilo · /kg</p>
                  </div>
                </div>
                <ul className="mt-4" aria-label="Harga self service per kg">
                  {pl.selfService.map((item) => (
                    <PriceRow key={item.name} name={item.name} price={`${formatRp(item.price)}/kg`} />
                  ))}
                </ul>
                <p className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-xs font-semibold leading-relaxed text-stone-600 ring-1 ring-stone-200">
                  {pl.selfServiceNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-lime-50 p-6 ring-1 ring-lime-200 sm:p-7">
                <h3 className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-lime-900">
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-2xl bg-lime-200/80 text-lime-800"
                  >
                    <Bike className="size-5" />
                  </span>
                  Antar-Jemput GRATIS!
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-lime-900/85">{pl.deliveryNote}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-7">
                <h3 className="text-lg font-extrabold tracking-tight text-emerald-950">
                  Mau langsung pesan?
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                  Chat atau telepon outlet {outlet.shortName} — kurir siap menjemput cucian Anda.
                </p>
                <div className="mt-4 grid gap-2">
                  <Button asChild className="h-11 w-full rounded-full">
                    <a
                      href={outletWaLink(outlet)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pesan via WhatsApp ke ${outlet.name}`}
                    >
                      <MessageCircle aria-hidden />
                      Pesan via WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    <a
                      href={outletTelLink(outlet)}
                      aria-label={`Telepon ${outlet.name} di ${outlet.phoneDisplay}`}
                    >
                      <Phone aria-hidden />
                      {outlet.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
