import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samara Green Laundry — Laundry Bersih, Segar & Ramah Lingkungan",
  description:
    "Layanan laundry premium ramah lingkungan di Indonesia. Cuci kilat 6 jam, gratis antar-jemput, deterjen eco-friendly aman untuk kulit sensitif. Pesan mudah via WhatsApp!",
  keywords: [
    "laundry",
    "laundry kilat",
    "laundry eco friendly",
    "antar jemput",
    "laundry premium",
    "laundry Indonesia",
    "dry cleaning",
    "cuci sepatu",
  ],
  authors: [{ name: "Samara Green Laundry" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Samara Green Laundry — Laundry Bersih, Segar & Ramah Lingkungan",
    description:
      "Cuci kilat 6 jam, gratis antar-jemput, deterjen eco-friendly. Pesan mudah via WhatsApp!",
    siteName: "Samara Green Laundry",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samara Green Laundry",
    description:
      "Laundry Bersih, Segar & Ramah Lingkungan — pesan mudah via WhatsApp.",
  },
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
