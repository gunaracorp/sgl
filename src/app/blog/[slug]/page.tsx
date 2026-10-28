import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  Lightbulb,
  MessageCircle,
  Quote,
  Share2,
} from "lucide-react";

import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Reveal } from "@/components/landing/reveal";
import {
  BLOG_POSTS,
  blogImgPath,
  blogPostingJsonLd,
  getBlogPost,
  type BlogBlock,
} from "@/lib/blog-data";
import { SITE, SITE_URL, waLink } from "@/lib/site";

type Params = Promise<{ slug: string }>;

/** Pra-render halaman statis untuk setiap artikel saat `next build`. */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/** Metadata SEO per artikel: title, description, canonical, Open Graph. */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const title = `${post.title} | Blog Samara Green Laundry`;
  return {
    title,
    description: post.excerpt,
    keywords: [...post.keywords],
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      siteName: SITE.name,
      locale: "id_ID",
      type: "article",
      publishedTime: post.date,
      images: [
        { url: blogImgPath(post), width: 1200, height: 686, alt: post.imageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [blogImgPath(post)],
    },
  };
}

/** Render satu blok konten sesuai tipografi JWDS. */
function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-emerald-950">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-stone-600">
              <span
                aria-hidden
                className="mt-2 size-2 shrink-0 rounded-full bg-lime-400"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 space-y-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-stone-600">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-800 tabular-nums">
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="mt-8 rounded-2xl border-l-4 border-lime-400 bg-emerald-50 p-6">
          <Quote className="size-5 text-emerald-400" aria-hidden />
          <p className="mt-2 text-lg font-semibold italic leading-relaxed text-emerald-900">
            {block.text}
          </p>
        </blockquote>
      );
    case "tip":
      return (
        <aside className="mt-8 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-lime-50 p-6">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-lime-400 text-emerald-950">
              <Lightbulb className="size-4" aria-hidden />
            </span>
            <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-800">
              {block.title}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {block.text}
          </p>
        </aside>
      );
  }
}

/** Halaman detail artikel blog — konten, related post, dan CTA. */
export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const postUrl = `${SITE_URL}/blog/${post.slug}/`;
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Breadcrumb 3 tingkat: Beranda → Blog → Judul Artikel
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const shareUrl = waLink(
    `${post.title} — baca selengkapnya di blog Samara Green Laundry: ${postUrl}`
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostingJsonLd(post)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Hero artikel */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 size-72 rounded-full bg-lime-400/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-28 -left-16 size-80 rounded-full bg-emerald-500/15 blur-3xl"
          />
          <div className="relative mx-auto w-full max-w-4xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-emerald-100/70">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-lime-300"
                  >
                    Beranda
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li>
                  <Link
                    href="/blog/"
                    className="transition-colors hover:text-lime-300"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="font-bold text-lime-300">
                  <span className="line-clamp-1 max-w-[280px] sm:max-w-none">
                    {post.title}
                  </span>
                </li>
              </ol>
            </nav>

            <Reveal className="mt-8">
              <span className="inline-block rounded-full bg-emerald-800/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-lime-300 ring-1 ring-lime-400/30">
                {post.category}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-emerald-100/70">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden />
                  {post.displayDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden />
                  {post.readMinutes} menit baca
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Share2 className="size-4" aria-hidden />
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-lime-300 underline-offset-4 transition-colors hover:text-lime-200 hover:underline"
                  >
                    Bagikan via WhatsApp
                  </a>
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Gambar utama + isi artikel */}
        <article className="py-12 lg:py-16">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <figure className="overflow-hidden rounded-3xl shadow-xl">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={blogImgPath(post)}
                    alt={post.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10">
                {post.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </Reveal>

            {/* CTA penutup artikel */}
            <Reveal delay={0.08}>
              <div className="mt-14 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 text-center shadow-2xl shadow-emerald-950/25 sm:p-10">
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  Sibuk? Serahkan cucian Anda pada kami.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-emerald-100/80">
                  Antar-jemput gratis ±5 km, deterjen nabati eco-friendly, dan
                  hasil wangi siap pakai — dari outlet terdekat di {SITE.city}.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href={waLink(
                      `Halo Samara Green Laundry! Saya baru baca artikel "${post.title}". Saya mau pesan layanan laundry.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-lime-400 px-7 text-base font-bold text-emerald-950 transition-colors hover:bg-lime-300"
                  >
                    <MessageCircle aria-hidden />
                    Pesan via WhatsApp
                  </a>
                  <a
                    href="/harga/"
                    className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 text-base font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Lihat Harga
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Kembali ke daftar */}
            <div className="mt-12 text-center">
              <Link
                href="/blog/"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Kembali ke Daftar Artikel
              </Link>
            </div>
          </div>
        </article>

        {/* Artikel terkait */}
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
                Artikel <span className="text-emerald-600">Terkait</span>
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((rel, i) => (
                <Reveal key={rel.slug} delay={0.06 * i}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <Link
                      href={`/blog/${rel.slug}/`}
                      className="relative block aspect-[16/10] overflow-hidden"
                      aria-label={`Baca artikel: ${rel.title}`}
                    >
                      <Image
                        src={blogImgPath(rel)}
                        alt={rel.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="w-fit rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                        {rel.category}
                      </span>
                      <h3 className="mt-3 text-base font-bold leading-snug text-emerald-950">
                        <Link
                          href={`/blog/${rel.slug}/`}
                          className="transition-colors hover:text-emerald-600"
                        >
                          {rel.title}
                        </Link>
                      </h3>
                      <div className="mt-auto pt-4">
                        <Link
                          href={`/blog/${rel.slug}/`}
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
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
