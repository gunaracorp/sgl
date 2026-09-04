"use client";

import { Headset, MessageCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WA_DEFAULT_LINK } from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const FAQS = [
  {
    q: "Jam operasional Samara Green Laundry kapan saja?",
    a: "Kami buka Senin–Sabtu pukul 07.00–21.00 WIB dan Minggu pukul 08.00–18.00 WIB. Untuk layanan kilat, sebaiknya pesan maksimal 4 jam sebelum jam tutup.",
  },
  {
    q: "Area mana saja yang tercakup layanan antar-jemput?",
    a: "Antar-jemput gratis untuk area terdekat sekitar Jl. Samara Indah dan radius 5 km. Di luar radius tersedia dengan biaya tambahan kecil — cukup konfirmasi lewat WhatsApp.",
  },
  {
    q: "Berapa lama proses pencucian sampai selesai?",
    a: "Layanan reguler selesai 2 hari kerja, layanan Kilat Express selesai hanya 6 jam. Untuk bed cover, sepatu, dan dry cleaning umumnya membutuhkan 2–3 hari kerja.",
  },
  {
    q: "Deterjen apa yang digunakan?",
    a: "Kami menggunakan deterjen nabati eco-friendly bebas fosfat dengan pewangi alami — aman untuk kulit sensitif dan bayi, sekaligus ramah lingkungan.",
  },
  {
    q: "Bagaimana cara pembayarannya?",
    a: "Kami menerima pembayaran Tunai, QRIS, dan Transfer Bank. Pembayaran dilakukan setelah cucian selesai — tanpa DP, tanpa biaya tersembunyi.",
  },
  {
    q: "Apakah ada layanan cuci darurat atau kilat?",
    a: "Ada! Layanan Kilat Express kami selesai dalam 6 jam dengan prioritas pengerjaan — cocok untuk kebutuhan mendesak seperti seragam kerja atau acara mendadak.",
  },
];

/** Two-column FAQ: heading + support card on the left, accordion on the right. */
export function Faq() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Pertanyaan yang{" "}
                <span className="text-emerald-600">Sering Ditanya</span>
              </>
            }
            subtitle="Semua yang perlu Anda tahu sebelum menitipkan cucian pada kami."
          />

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-7 text-white shadow-xl shadow-emerald-950/20">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-lime-300">
                <Headset className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold">
                Masih ada pertanyaan lain?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-emerald-100/70">
                Tim kami siap membalas chat Anda setiap hari selama jam
                operasional — tanya soal harga, jadwal, atau area antar-jemput.
              </p>
              <Button
                asChild
                className="mt-5 h-11 rounded-full bg-white text-emerald-800 hover:bg-lime-100"
              >
                <a
                  href={WA_DEFAULT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden />
                  Chat WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="mb-3 rounded-2xl border border-stone-200/80 bg-card px-5 shadow-sm transition-colors data-[state=open]:border-emerald-300 data-[state=open]:bg-emerald-50/50"
              >
                <AccordionTrigger className="py-5 text-left text-base font-bold text-emerald-950 hover:no-underline hover:text-emerald-700 [&>svg]:size-5 [&>svg]:text-emerald-600">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-stone-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
