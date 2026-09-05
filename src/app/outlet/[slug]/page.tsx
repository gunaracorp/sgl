import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Leaf,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { OpenNowBadge } from "@/components/landing/open-now-badge";
import { OutletPricelist } from "@/components/landing/outlet-pricelist";
import { Reveal } from "@/components/landing/reveal";
import {
  formatRp,
  getOutlet,
  getOutletPricelist,
  OPEN_DAYS,
  OUTLETS,
  outletHoursSpec,
  outletMapsEmbedUrl,
  outletMapsUrl,
  outletTelLink,
  outletWaLink,
  PRICE_RANGE,
  SERVICE_TITLES,
  SITE,
  SITE_URL,
} from "@/lib/site";

type Params = Promise<{ slug: string }>;

/** Pra-render halaman statis untuk setiap outlet saat `next build`. */
export function generateStaticParams() {
  return OUTLETS.map((outlet) => ({ slug: outlet.slug }));
}

/** Metadata SEO lokal per outlet: title, description, canonical, Open Graph. */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const outlet = getOutlet(slug);
  if (!outlet) return {};

  const title = `Laundry ${outlet.area} ${outlet.district} Semarang — ${outlet.name}`;
  let description = `${outlet.description} Buka setiap hari ${outlet.hoursDisplay} WIB. Telepon/WhatsApp ${outlet.phoneDisplay}.`;

  // Outlet dengan price list khusus → sebut harga termurah di snippet Google
  const plMeta = getOutletPricelist(outlet.slug);
  if (plMeta) {
    const mulai = Math.min(...plMeta.reguler.map((r) => r.price));
    description += ` Price list resmi outlet: reguler mulai ${formatRp(mulai)}/kg, express 5 jam jadi.`;
  }

  return {
    title,
    description,
    keywords: [...outlet.keywords, "samara green laundry", SITE.city, "laundry terdekat"],
    alternates: {
      canonical: `/outlet/${outlet.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `/outlet/${outlet.slug}/`,
      siteName: SITE.name,
      locale: "id_ID",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: outlet.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

/** JSON-LD LocalBusiness untuk outlet ini + Breadcrumb — dibaca mesin pencari. */
function OutletJsonLd({ slug }: { slug: string }) {
  const outlet = getOutlet(slug);
  if (!outlet) return null;

  const outletUrl = `${SITE_URL}/outlet/${outlet.slug}/`;

  // Outlet dengan price list khusus → priceRange akurat dari data harga asli
  const pl = getOutletPricelist(outlet.slug);
  let priceRange = PRICE_RANGE;
  if (pl) {
    const nums = [...pl.reguler, ...pl.selfService].map((r) => r.price);
    pl.satuan.forEach((s) => {
      if (s.kecil !== null) nums.push(s.kecil);
      if (s.besar !== null) nums.push(s.besar);
    });
    priceRange = `${formatRp(Math.min(...nums))} - ${formatRp(Math.max(...nums))}`;
  }

  const graph = [
    {
      "@type": ["LocalBusiness", "DryCleaningOrLaundry"],
      "@id": `${outletUrl}#outlet`,
      name: outlet.name,
      parentOrganization: { "@id": `${SITE_URL}/#business` },
      description: outlet.description,
      url: outletUrl,
      telephone: outlet.phoneIntl,
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/images/icon-512.png`,
      priceRange,
      currenciesAccepted: "IDR",
      paymentAccepted: "Tunai, QRIS, Transfer Bank",
      address: {
        "@type": "PostalAddress",
        streetAddress: outlet.streetAddress,
        addressLocality: "Semarang",
        addressRegion: "Jawa Tengah",
        postalCode: outlet.postalCode,
        addressCountry: "ID",
      },
      areaServed: [outlet.area, outlet.district, "Semarang"].map((name) => ({
        "@type": "Place",
        name,
      })),
      openingHoursSpecification: outletHoursSpec(outlet),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${outletUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lokasi Outlet",
          item: `${SITE_URL}/#lokasi`,
        },
        { "@type": "ListItem", position: 3, name: outlet.name, item: outletUrl },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

export default async function OutletPage({ params }: { params: Params }) {
  const { slug } = await params;
  const outlet = getOutlet(slug);
  if (!outlet) notFound();

  const others = OUTLETS.filter((o) => o.slug !== outlet.slug);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <OutletJsonLd slug={outlet.slug} />
      <Navbar />

      <main className="flex-1">
        {/* Hero outlet */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 to-white pb-14 pt-12 lg:pb-20 lg:pt-16">
          <div
            aria-hidden
            className="absolute -right-32 top-0 size-96 rounded-full bg-lime-200/40 blur-3xl"
          />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone-500">
                <li>
                  <a href="/" className="inline-flex items-center gap-1 transition-colors hover:text-emerald-700">
                    <ArrowLeft className="size-3.5" aria-hidden />
                    Beranda
                  </a>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <a href="/#lokasi" className="transition-colors hover:text-emerald-700">
                    Lokasi Outlet
                  </a>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-semibold text-emerald-800">
                  {outlet.shortName}
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <MapPin className="size-3.5" aria-hidden />
                  Outlet {outlet.district} · {SITE.city}
                </span>
                <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-emerald-950 sm:text-4xl lg:text-[2.6rem]">
                  {outlet.name}
                </h1>
                <address className="mt-5 flex items-start gap-2.5 not-italic">
                  <MapPin className="mt-1 size-5 shrink-0 text-emerald-600" aria-hidden />
                  <span className="text-base leading-relaxed text-stone-600">
                    {outlet.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>

                {/* Status buka + jam + telepon outlet */}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <OpenNowBadge outlet={outlet} />
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600">
                    <Clock className="size-4 text-emerald-600" aria-hidden />
                    {outlet.hoursDisplay} WIB · {OPEN_DAYS}
                  </span>
                  <a
                    href={outletTelLink(outlet)}
                    className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-600"
                    aria-label={`Telepon ${outlet.name} di ${outlet.phoneDisplay}`}
                  >
                    <Phone className="size-4 text-emerald-600" aria-hidden />
                    {outlet.phoneDisplay}
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="h-12 rounded-full px-6 shadow-md shadow-emerald-900/20">
                    <a href={outletWaLink(outlet)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle aria-hidden />
                      Pesan via WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full border-emerald-200 px-6 text-emerald-700 hover:bg-emerald-50"
                  >
                    <a
                      href={outletMapsUrl(outlet)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation aria-hidden />
                      Petunjuk Arah
                    </a>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-xl shadow-emerald-900/10">
                  <iframe
                    src={outletMapsEmbedUrl(outlet)}
                    title={`Peta lokasi ${outlet.name}`}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[300px] w-full border-0 sm:h-[360px]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Info + layanan */}
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <Reveal className="lg:col-span-2">
                <div className="h-full rounded-3xl border border-emerald-900/10 bg-card p-7 shadow-sm sm:p-9">
                  <h2 className="text-2xl font-extrabold tracking-tight text-emerald-950">
                    Layanan Laundry di {outlet.shortName}
                  </h2>
                  <p className="mt-4 leading-relaxed text-stone-600">
                    {outlet.description} Tim kurir kami siap menjemput cucian
                    Anda tanpa biaya antar-jemput, mencuci dengan deterjen nabati
                    eco-friendly yang aman untuk kulit sensitif, lalu mengantar
                    kembali dengan rapi dan wangi.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Daftar layanan">
                    {SERVICE_TITLES.map((service) => (
                      <li
                        key={service}
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm font-semibold text-emerald-800"
                      >
                        <Sparkles className="size-3.5 text-emerald-600" aria-hidden />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-2xl bg-lime-50 p-4 text-sm leading-relaxed text-lime-900 ring-1 ring-lime-200">
                    <Leaf className="mr-1.5 inline size-4 -translate-y-0.5" aria-hidden />
                    Area terdekat seperti <strong>{outlet.area}</strong>,{" "}
                    <strong>{outlet.district}</strong>, dan sekitarnya mendapat
                    layanan antar-jemput gratis — cukup pesan lewat WhatsApp.
                  </p>
                </div>
              </Reveal>

              <div className="grid content-start gap-6">
                <Reveal delay={0.1}>
                  <div className="rounded-3xl border border-emerald-900/10 bg-card p-7 shadow-sm">
                    <h2 className="flex items-center gap-2 text-lg font-extrabold text-emerald-950">
                      <Clock className="size-5 text-emerald-600" aria-hidden />
                      Jam Buka
                    </h2>
                    <div className="mt-4 space-y-2.5">
                      <div className="flex items-center justify-between border-b border-dashed border-stone-200 pb-2.5 text-sm">
                        <span className="font-medium text-stone-600">{OPEN_DAYS}</span>
                        <span className="font-bold text-emerald-950">{outlet.hoursDisplay}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <OpenNowBadge outlet={outlet} />
                    </div>
                    <p className="mt-3 text-xs text-stone-400">
                      *Waktu Indonesia Barat (WIB) — termasuk akhir pekan
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="rounded-3xl border border-emerald-900/10 bg-card p-7 shadow-sm">
                    <h2 className="flex items-center gap-2 text-lg font-extrabold text-emerald-950">
                      <Phone className="size-5 text-emerald-600" aria-hidden />
                      Kontak Outlet
                    </h2>
                    <a
                      href={outletTelLink(outlet)}
                      className="mt-3 block text-xl font-extrabold text-emerald-700 transition-colors hover:text-emerald-600"
                    >
                      {outlet.phoneDisplay}
                    </a>
                    <p className="mt-1 text-xs font-medium text-stone-500">
                      Telepon atau WhatsApp langsung ke outlet {outlet.shortName}
                    </p>
                    <div className="mt-4 grid gap-2">
                      <Button asChild className="h-11 w-full rounded-full">
                        <a href={outletWaLink(outlet)} target="_blank" rel="noopener noreferrer">
                          <MessageCircle aria-hidden />
                          Chat Outlet Ini
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
                          Telepon Outlet
                        </a>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Price list khusus outlet (hanya outlet dengan data di OUTLET_PRICELISTS) */}
        <OutletPricelist outlet={outlet} />

        {/* Outlet lain */}
        <section className="bg-gradient-to-b from-white to-emerald-50/60 py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
                Outlet Lainnya di Semarang
              </h2>
              <p className="mt-3 text-stone-600">
                Pilih outlet yang paling dekat dengan rumah atau tempat kerja Anda.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {others.map((other, index) => (
                <Reveal key={other.slug} delay={index * 0.1}>
                  <article
                    className="group flex h-full items-start justify-between gap-4 rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-xl hover:shadow-emerald-900/10"
                  >
                    <div>
                      <a
                        href={`/outlet/${other.slug}/`}
                        className="block"
                        aria-label={`Lihat halaman ${other.name}`}
                      >
                        <h3 className="text-lg font-extrabold text-emerald-950">
                          {other.name}
                        </h3>
                        <p className="mt-2 flex items-start gap-2 text-sm text-stone-600">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                          {other.addressLines.join(", ")}
                        </p>
                      </a>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-stone-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5 text-emerald-600" aria-hidden />
                          {other.hoursDisplay} · Setiap hari
                        </span>
                        <a
                          href={outletTelLink(other)}
                          className="inline-flex items-center gap-1.5 text-emerald-700 transition-colors hover:text-emerald-600"
                          aria-label={`Telepon ${other.name} di ${other.phoneDisplay}`}
                        >
                          <Phone className="size-3.5 text-emerald-600" aria-hidden />
                          {other.phoneDisplay}
                        </a>
                      </p>
                    </div>
                    <a
                      href={`/outlet/${other.slug}/`}
                      aria-hidden
                      tabIndex={-1}
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-all group-hover:bg-emerald-600 group-hover:text-white"
                    >
                      <ArrowRight className="size-5" aria-hidden />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10 text-center">
              <a
                href="/#lokasi"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Lihat semua lokasi &amp; peta di beranda
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
