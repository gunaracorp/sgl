import {
  BUDGET_PLANS,
  FAQS,
  OUTLETS,
  outletHoursSpec,
  PRICE_RANGE,
  SITE,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/site";

/**
 * JSON-LD Structured Data — "bahasa" yang dibaca mesin pencari (Google, Bing)
 * agar website muncul sebagai RICH SNIPPET: rating bintang, jam buka, FAQ,
 * dan informasi bisnis langsung di hasil pencarian.
 *
 * Terdiri dari 3 schema (mengikuti pedoman schema.org):
 * 1. DryCleaningOrLaundry (LocalBusiness) — profil bisnis lokal
 * 2. WebSite — identitas situs
 * 3. FAQPage — daftar pertanyaan yang sama dengan yang tampil di halaman
 */
export function JsonLd() {
  const graph = [
    {
      "@type": ["LocalBusiness", "DryCleaningOrLaundry"],
      "@id": `${SITE_URL}/#business`,
      name: SITE.name,
      alternateName: "Samara Laundry",
      description: `${SITE.tagline}. Cuci kilat 6 jam, gratis antar-jemput, deterjen nabati eco-friendly yang aman untuk kulit sensitif.`,
      url: SITE_URL,
      telephone: SITE.phoneIntl,
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/favicon.svg`,
      priceRange: PRICE_RANGE,
      currenciesAccepted: "IDR",
      paymentAccepted: "Tunai, QRIS, Transfer Bank",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Malangsari No. 22, Tlogosari Kulon",
        addressLocality: "Semarang",
        addressRegion: "Jawa Tengah",
        postalCode: "50196",
        addressCountry: "ID",
      },
      department: OUTLETS.map((outlet) => ({
        "@id": `${SITE_URL}/outlet/${outlet.slug}/#outlet`,
      })),
      areaServed: [
        { "@type": "City", name: "Semarang" },
        { "@type": "AdministrativeArea", name: "Kecamatan Pedurungan" },
        { "@type": "AdministrativeArea", name: "Kabupaten Semarang" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "22:00",
        },
      ],
      sameAs: Object.values(SOCIAL_LINKS),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "2500",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Laundry",
        itemListElement: [
          // Paket hemat kiloan tanpa setrika (Cuci Bersih / Kering / Lipat)
          ...BUDGET_PLANS.map((plan) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: plan.name },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: plan.value,
              priceCurrency: "IDR",
              unitText: "kg",
            },
          })),
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Cuci Kering Setrika" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "6500",
              priceCurrency: "IDR",
              unitText: "kg",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cuci Kilat Express 6 Jam",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "12000",
              priceCurrency: "IDR",
              unitText: "kg",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Dry Cleaning Premium",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "20000",
              priceCurrency: "IDR",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Cuci Sepatu & Tas" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "20000",
              priceCurrency: "IDR",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Bed Cover & Selimut" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "35000",
              priceCurrency: "IDR",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cuci Boneka & Stroller",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "25000",
              priceCurrency: "IDR",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      description: SITE.tagline,
      inLanguage: "id-ID",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE.name} — ${SITE.tagline}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: "id-ID",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    ...OUTLETS.map((outlet) => ({
      "@type": ["LocalBusiness", "DryCleaningOrLaundry"],
      "@id": `${SITE_URL}/outlet/${outlet.slug}/#outlet`,
      name: outlet.name,
      parentOrganization: { "@id": `${SITE_URL}/#business` },
      description: outlet.description,
      url: `${SITE_URL}/outlet/${outlet.slug}/`,
      telephone: outlet.phoneIntl,
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/favicon.svg`,
      priceRange: PRICE_RANGE,
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
    })),
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
