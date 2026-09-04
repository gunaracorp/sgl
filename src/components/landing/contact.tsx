"use client";

import { useState } from "react";
import { Clock, Facebook, Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { OUTLETS, SITE, SOCIAL_LINKS, waLink, WA_DEFAULT_LINK } from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { TikTokIcon } from "./tiktok-icon";

/** Contact info cards + mini form that forwards the message to WhatsApp. */
export function Contact() {
  const { toast } = useToast();
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [pesan, setPesan] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nama.trim() || !pesan.trim()) {
      toast({
        title: "Lengkapi dulu ya",
        description: "Mohon isi nama dan pesan Anda sebelum mengirim.",
        variant: "destructive",
      });
      return;
    }

    const message = `Halo Samara Green Laundry! Saya ${nama.trim()}${
      hp.trim() ? ` (${hp.trim()})` : ""
    }. ${pesan.trim()}`;

    const url = waLink(message);
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    // Fallback: if the browser blocks pop-ups, navigate in the same tab so the
    // user still reaches WhatsApp.
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      window.location.href = url;
    }

    toast({
      title: "Mengarahkan ke WhatsApp…",
      description:
        "Pesan Anda dibuka di aplikasi WhatsApp. Sampai jumpa di chat!",
    });

    setNama("");
    setHp("");
    setPesan("");
  }

  return (
    <section id="kontak" className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hubungi Kami"
          title={
            <>
              Kunjungi atau Chat Kami{" "}
              <span className="text-emerald-600">Kapan Saja</span>
            </>
          }
          subtitle="Datang langsung ke outlet, telepon, atau chat — semua pertanyaan kami layani dengan senang hati."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-stone-200/80 bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-900/10">
              <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <MapPin className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold text-emerald-950">
                Alamat Outlet
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                {SITE.address}
              </p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600"
              >
                Lihat di Google Maps →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-stone-200/80 bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-900/10">
              <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Clock className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold text-emerald-950">
                Jam Buka
              </h3>
              <div className="mt-3 flex-1 space-y-2.5">
                {SITE.hours.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between border-b border-dashed border-stone-200 pb-2.5 text-sm last:border-none last:pb-0"
                  >
                    <span className="font-medium text-stone-600">{row.day}</span>
                    <span className="font-bold text-emerald-950">
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-stone-400">
                *Waktu Indonesia Barat (WIB) — jam berbeda tiap outlet
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex h-full flex-col rounded-3xl border border-stone-200/80 bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-900/10">
              <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Phone className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold text-emerald-950">
                Telepon &amp; WhatsApp
              </h3>
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="mt-2 text-xl font-extrabold tracking-tight text-emerald-700 transition-colors hover:text-emerald-600"
              >
                {SITE.phoneDisplay}
              </a>
              {/* Nomor langsung tiap outlet */}
              <div className="mt-3 flex-1 space-y-1.5">
                {OUTLETS.map((outlet) => (
                  <a
                    key={outlet.slug}
                    href={`tel:${outlet.phoneIntl}`}
                    className="flex items-center justify-between gap-2 rounded-xl border border-stone-200/80 bg-stone-50/60 px-3 py-2 text-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                    aria-label={`Telepon outlet ${outlet.shortName} di ${outlet.phoneDisplay}`}
                  >
                    <span className="font-semibold text-stone-700">
                      Outlet {outlet.shortName}
                    </span>
                    <span className="font-bold text-emerald-700">
                      {outlet.phoneDisplay}
                    </span>
                  </a>
                ))}
              </div>
              <Button asChild className="mt-4 h-11 w-fit rounded-full">
                <a
                  href={WA_DEFAULT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle aria-hidden />
                  Chat Sekarang
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-8">
          <div className="grid gap-10 rounded-3xl border border-stone-200/80 bg-card p-8 shadow-sm sm:p-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-emerald-950">
                Kirim Pesan Cepat
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Isi form di samping — pesan Anda otomatis diteruskan ke WhatsApp
                kami. Tanpa akun, tanpa ribet.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
                </span>
                Dibalas kurang dari 5 menit di jam kerja
              </p>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Ikuti Kami
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                  >
                    <TikTokIcon className="size-4 text-emerald-600" />
                    @samaragreenlaundry04
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Samara Green Laundry"
                    className="grid size-11 place-items-center rounded-full border border-stone-200 bg-white text-emerald-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                  >
                    <Instagram className="size-4.5" aria-hidden />
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Samara Green Laundry"
                    className="grid size-11 place-items-center rounded-full border border-stone-200 bg-white text-emerald-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                  >
                    <Facebook className="size-4.5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="contact-nama">Nama Lengkap</Label>
                <Input
                  id="contact-nama"
                  name="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Anda"
                  required
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-hp">No. HP (opsional)</Label>
                <Input
                  id="contact-hp"
                  name="hp"
                  type="tel"
                  inputMode="tel"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  placeholder="0812xxxxxxx"
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="contact-pesan">Pesan</Label>
                <Textarea
                  id="contact-pesan"
                  name="pesan"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Contoh: Saya mau pesan layanan kilat 6 jam untuk 4 kg cucian, dijemput sore ini ya."
                  rows={4}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="h-13 w-full rounded-xl text-base font-bold sm:w-auto sm:px-8"
                >
                  <Send aria-hidden />
                  Kirim via WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
