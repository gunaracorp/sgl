import { FAQS, SITE, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

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
      priceRange: "Rp7.000 - Rp35.000",
      currenciesAccepted: "IDR",
      paymentAccepted: "Tunai, QRIS, Transfer Bank",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address,
        addressCountry: "ID",
      },
      areaServed: {
        "@type": "City",
        name: "Indonesia",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "07:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "08:00",
          closes: "18:00",
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
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Cuci Kering Setrika" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "7000",
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
              price: "25000",
              priceCurrency: "IDR",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Cuci Sepatu & Tas" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "30000",
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
