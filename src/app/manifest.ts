import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Di-generate otomatis menjadi /manifest.webmanifest saat build (PWA-ready). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: "Samara Laundry",
    description:
      "Layanan laundry premium ramah lingkungan. Cuci kilat 6 jam, gratis antar-jemput, deterjen eco-friendly.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#059669",
    lang: "id",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
