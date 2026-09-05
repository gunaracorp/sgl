import type { MetadataRoute } from "next";

import { OUTLETS, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

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
    // Halaman khusus tiap outlet — penting untuk SEO lokal Semarang
    ...OUTLETS.map((outlet) => ({
      url: `${SITE_URL}/outlet/${outlet.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
