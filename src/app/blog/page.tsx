import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Clock, Leaf } from "lucide-react";

import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { PageHero } from "@/components/landing/page-hero";
import { Reveal } from "@/components/landing/reveal";
import { BLOG_POSTS, blogImgPath } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Blog Tips Laundry Samara Green Laundry — Panduan Merawat Pakaian & Gaya Hidup Hijau",
  description:
    "Kumpulan artikel tips laundry: cara melipat pakaian, menghilangkan noda membandel, rahasia pakaian wangi tahan lama, dan kenapa deterjen nabati lebih sehat untuk keluarga.",
  keywords: [
    "blog laundry",
    "tips laundry",
    "cara mencuci",
    "merawat pakaian",
    "laundry semarang",
  ],
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog Tips Laundry — Samara Green Laundry",
    description:
      "Panduan praktis merawat pakaian dari tim laundry profesional Semarang.",
    url: "/blog/",
    type: "website",
  },
};

/** JSON-LD Blog — daftar artikel untuk rich result Google. */
function BlogJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog/#blog`,
    name: "Blog Tips Laundry — Samara Green Laundry",
    description:
      "Panduan praktis merawat pakaian, menghilangkan noda, dan gaya hidup laundry ramah lingkungan.",
    url: `${SITE_URL}/blog/`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}/`,
      datePublished: post.date,
      image: `${SITE_URL}${blogImgPath(post)}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/** Halaman mandiri "Blog" — daftar artikel tips laundry. */
export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Blog & Tips"
          crumb="Blog"
          path="/blog/"
          title={
            <>
              Tips Laundry dari{" "}
              <em className="not-italic text-lime-400">Yang Ngolah Ribuan Kilo</em>
            </>
          }
          description="Panduan praktis merawat pakaian, mengalahkan noda membandel, dan mencuci lebih ramah lingkungan — ditulis tim yang tiap hari menangani cucian pelanggan."
        />
        <BlogJsonLd />

        {/* Artikel unggulan (terbaru) */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
                    <Image
                      src={blogImgPath(featured)}
                      alt={featured.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3.5 py-1.5 text-xs font-bold text-emerald-950 shadow-md">
                      Artikel Terbaru
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-stone-400">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-800">
                        {featured.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" aria-hidden />
                        {featured.displayDate}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" aria-hidden />
                        {featured.readMinutes} menit baca
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
                      <Link
                        href={`/blog/${featured.slug}/`}
                        className="transition-colors hover:text-emerald-600"
                      >
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-500 sm:text-base">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/blog/${featured.slug}/`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-900 px-6 py-2.5 text-sm font-bold text-lime-300 shadow-md transition-all hover:gap-3 hover:bg-emerald-800"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* Grid artikel lainnya */}
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
                <BookOpen className="size-3.5" aria-hidden />
                Semua Artikel
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Bacaan Ringan,{" "}
                <span className="text-emerald-600">Bermanfaat Langsung</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={0.06 * i}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="relative block aspect-[16/10] overflow-hidden"
                      aria-label={`Baca artikel: ${post.title}`}
                    >
                      <Image
                        src={blogImgPath(post)}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-stone-400">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-bold text-emerald-800">
                          {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" aria-hidden />
                          {post.readMinutes} mnt
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-3" aria-hidden />
                          {post.displayDate}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold leading-snug text-emerald-950">
                        <Link
                          href={`/blog/${post.slug}/`}
                          className="transition-colors hover:text-emerald-600"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-500">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4">
                        <Link
                          href={`/blog/${post.slug}/`}
                          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600"
                        >
                          Baca Artikel
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Banner eco-friendly */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 text-center shadow-2xl shadow-emerald-950/25 sm:p-12">
            <Leaf className="mx-auto size-10 text-lime-400" aria-hidden />
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Sibuk? Serahkan cucian pada{" "}
              <em className="not-italic text-lime-400">ahlinya.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-emerald-100/80">
              Semua artikel di atas sudah kami praktikkan setiap hari — dengan
              deterjen nabati dan proses higienis di ketiga outlet kami.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/layanan/"
                className="inline-flex min-h-11 items-center rounded-full bg-lime-400 px-8 text-base font-bold text-emerald-950 transition-colors hover:bg-lime-300"
              >
                Lihat Layanan Kami
              </a>
              <a
                href="/outlet/malangsari/"
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-8 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                Kunjungi Outlet
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
