"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE, WA_DEFAULT_LINK } from "@/lib/site";
import { cn } from "@/lib/utils";

function BrandMark({ homeHref }: { homeHref: string }) {
  return (
    <a
      href={homeHref}
      className="flex items-center gap-2.5"
      aria-label={`${SITE.name} — kembali ke beranda`}
    >
      {/* Logo resmi Samara Green Laundry (emblem daun, PNG transparan) */}
      <Image
        src="/images/logo-leaf.png"
        alt=""
        width={48}
        height={48}
        className="size-10 shrink-0 object-contain drop-shadow-sm"
        aria-hidden
      />
      <span className="text-lg font-extrabold tracking-tight text-emerald-950">
        Samara <span className="text-emerald-600">Green</span> Laundry
      </span>
    </a>
  );
}

/** Sticky glass navbar; gains shadow/solid bg and shrinks on scroll. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Halaman mandiri ("/layanan" dst.) dipakai apa adanya;
  // anchor "#layanan" diarahkan ke beranda saat tidak di halaman utama.
  const resolveHref = (href: string) => {
    if (href.startsWith("/") || href.startsWith("http")) {
      return isHome && href === "/" ? "#beranda" : href;
    }
    return isHome ? href : `/${href}`;
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    /* Animasi masuk via CSS murni — bebas hydration mismatch (lihat globals.css) */
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300 animate-[slide-down_0.5s_ease-out_both] motion-reduce:animate-none",
        scrolled
          ? "border-emerald-900/10 bg-white/85 shadow-lg shadow-emerald-950/5 backdrop-blur-xl"
          : "border-transparent bg-white/60 backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-16" : "h-[4.5rem]"
        )}
      >
        <BrandMark homeHref={isHome ? "#beranda" : "/"} />

        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Navigasi utama"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden h-11 rounded-full px-5 shadow-md shadow-emerald-900/20 sm:inline-flex"
          >
            <a href={WA_DEFAULT_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden />
              Pesan via WhatsApp
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-xl border-emerald-900/10 bg-white/70 xl:hidden"
                aria-label="Buka menu navigasi"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] gap-0 border-emerald-900/10 p-0"
            >
              <SheetHeader className="border-b border-emerald-900/10 p-5 text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <Image
                    src="/images/logo-leaf.png"
                    alt=""
                    width={44}
                    height={44}
                    className="size-9 shrink-0 object-contain"
                    aria-hidden
                  />
                  <span className="text-base font-extrabold tracking-tight text-emerald-950">
                    Samara <span className="text-emerald-600">Green</span>{" "}
                    Laundry
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Menu navigasi {SITE.name}
                </SheetDescription>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 overflow-y-auto p-5"
                aria-label="Navigasi seluler"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={resolveHref(link.href)}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-semibold text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto p-5 pt-0">
                <Button asChild className="h-12 w-full rounded-xl text-base">
                  <a
                    href={WA_DEFAULT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle aria-hidden />
                    Pesan via WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
