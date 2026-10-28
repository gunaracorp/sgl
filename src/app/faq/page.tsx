import type { Metadata } from "next";
import { Clock, MessageCircle, Phone } from "lucide-react";

import { Faq } from "@/components/landing/faq";
import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";
import { FAQS, OUTLETS, SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Pertanyaan Seputar Laundry | Samara Green Laundry Semarang",
  description:
    "Jawaban lengkap: jam operasional 3 outlet, area antar-jemput gratis, lama pengerjaan, deterjen nabati, metode pembayaran (Tunai/QRIS/Transfer), dan layanan kilat express 6 jam.",
  alternates: { canonical: "/faq/" },
  openGraph: {
    title: "Pertanyaan yang Sering Ditanyakan — Samara Green Laundry",
    description:
      "Semua yang perlu Anda tahu sebelum menitipkan cucian pada kami: jam buka, antar-jemput, durasi, deterjen, pembayaran.",
    url: `${SITE_URL}/faq/`,
    type: "website",
  },
};

/** JSON-LD FAQPage — sesuai pedoman rich result Google. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

/** Halaman mandiri "FAQ" — pusat bantuan pelanggan. */
export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Pusat Bantuan"
          crumb="FAQ"
          path="/faq/"
          title={
            <>
              Ada yang Bisa Kami{" "}
              <em className="not-italic text-lime-400">Bantu?</em>
            </>
          }
          description="Kumpulan jawaban untuk pertanyaan yang paling sering masuk ke WhatsApp kami — dari jam buka sampai metode pembayaran."
        />

        {/* Komponen FAQ reuse — daftar pertanyaan + kartu dukungan */}
        <Faq />

        {/* Kontak cepat per outlet */}
        <section className="bg-white pb-20 lg:pb-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Tanya Langsung
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Jawaban Tidak Ada di Sini?{" "}
                <span className="text-emerald-600">Chat Aja.</span>
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {OUTLETS.map((outlet, i) => (
                <Reveal key={outlet.slug} delay={0.08 * i}>
                  <article className="flex h-full flex-col gap-3 rounded-3xl border border-stone-200 bg-background p-6 shadow-md">
                    <h3 className="text-lg font-bold text-emerald-950">
                      Outlet {outlet.shortName}
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="size-4 shrink-0 text-emerald-600" aria-hidden />
                      {outlet.hoursDisplay} WIB · Setiap Hari
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      <a
                        href={`https://wa.me/${outlet.phoneIntl.replace("+", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-600 px-4 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                      >
                        <MessageCircle className="size-4" aria-hidden />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${outlet.phoneIntl}`}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-emerald-200 px-4 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-50"
                      >
                        <Phone className="size-4" aria-hidden />
                        {outlet.phoneDisplay}
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-stone-500">
              Atau hubungi kontak pusat {SITE.phoneDisplay} — kami siap membantu
              setiap hari.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
