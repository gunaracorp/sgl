import type { MetadataRoute } from "next";

import { BLOG_POSTS } from "@/lib/blog-data";
import { OUTLETS, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Halaman mandiri website — urutan prioritas SEO. */
const STATIC_PAGES = [
  { path: "/tentang/", priority: 0.7 },
  { path: "/layanan/", priority: 0.9 },
  { path: "/harga/", priority: 0.9 },
  { path: "/galeri/", priority: 0.6 },
  { path: "/blog/", priority: 0.8 },
  { path: "/faq/", priority: 0.6 },
  { path: "/kontak/", priority: 0.8 },
] as const;

/** Di-generate otomatis menjadi /sitemap.xml saat build. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Halaman mandiri — masing-masing topik punya URL sendiri (rapi & SEO-friendly)
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    // Halaman khusus tiap outlet — penting untuk SEO lokal Semarang
    ...OUTLETS.map((outlet) => ({
      url: `${SITE_URL}/outlet/${outlet.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Artikel blog — update berkala
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
