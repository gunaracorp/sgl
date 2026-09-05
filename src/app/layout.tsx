import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE, SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const TITLE = "Samara Green Laundry — Laundry Bersih, Segar & Ramah Lingkungan";
const DESCRIPTION =
  "Layanan laundry premium ramah lingkungan di Indonesia. Cuci kilat 6 jam, gratis antar-jemput, deterjen eco-friendly aman untuk kulit sensitif. Pesan mudah via WhatsApp 0821-3450-6007!";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "laundry",
    "laundry kilat",
    "laundry express 6 jam",
    "laundry eco friendly",
    "laundry antar jemput",
    "laundry premium",
    "laundry terdekat",
    "laundry Indonesia",
    "dry cleaning",
    "cuci sepatu",
    "cuci bed cover",
    "laundry samara",
    "samara green laundry",
  ],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: "PT Digital Bisnis Manajemen",
  publisher: "PT Digital Bisnis Manajemen — digiman.id & juraganwebsite.web.id",
  applicationName: SITE.name,
  category: "Laundry Service",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description:
      "Cuci kilat 6 jam, gratis antar-jemput, deterjen eco-friendly. Pesan mudah via WhatsApp!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samara Green Laundry — Laundry Bersih, Segar & Ramah Lingkungan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Laundry Bersih, Segar & Ramah Lingkungan — cuci kilat 6 jam, gratis antar-jemput. Pesan via WhatsApp!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  icons: {
    icon: [
      {
        url: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
