import { Facebook, Instagram, Leaf, MapPin, MessageCircle, Phone } from "lucide-react";

import { DESIGN_CREDIT, NAV_LINKS, SERVICE_TITLES, SITE, WA_DEFAULT_LINK } from "@/lib/site";

/** Dark forest-green footer, sticks to bottom via mt-auto on the root wrapper. */
export function Footer() {
  return (
    <footer className="mt-auto bg-emerald-950 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-16 text-emerald-100/70">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#beranda" className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-md">
                <Leaf className="size-5 text-white" aria-hidden />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Samara <span className="text-lime-400">Green</span> Laundry
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {SITE.tagline}. Cucian bersih dan wangi, bumi ikut tersenyum —
              karena kami pakai deterjen nabati 100% eco-friendly.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Samara Green Laundry"
                className="grid size-10 place-items-center rounded-full bg-emerald-900 text-emerald-100 transition-all hover:scale-110 hover:bg-emerald-800 hover:text-lime-300"
              >
                <Instagram className="size-4.5" aria-hidden />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Samara Green Laundry"
                className="grid size-10 place-items-center rounded-full bg-emerald-900 text-emerald-100 transition-all hover:scale-110 hover:bg-emerald-800 hover:text-lime-300"
              >
                <Facebook className="size-4.5" aria-hidden />
              </a>
              <a
                href={WA_DEFAULT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Samara Green Laundry"
                className="grid size-10 place-items-center rounded-full bg-emerald-900 text-emerald-100 transition-all hover:scale-110 hover:bg-emerald-800 hover:text-lime-300"
              >
                <MessageCircle className="size-4.5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Tautan cepat footer">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Tautan Cepat
            </h3>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-lime-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Layanan footer">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Layanan
            </h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICE_TITLES.map((service) => (
                <li key={service}>
                  <a
                    href="#layanan"
                    className="text-sm transition-colors hover:text-lime-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Kontak
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-4.5 shrink-0 text-lime-400"
                  aria-hidden
                />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 size-4.5 shrink-0 text-lime-400"
                  aria-hidden
                />
                <a
                  href={`tel:${SITE.phoneIntl}`}
                  className="transition-colors hover:text-lime-300"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle
                  className="mt-0.5 size-4.5 shrink-0 text-lime-400"
                  aria-hidden
                />
                <span>
                  Senin–Sabtu 07.00–21.00
                  <br />
                  Minggu 08.00–18.00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs sm:flex-row sm:text-left">
          <p>© 2025 {SITE.name}. Seluruh hak cipta dilindungi.</p>
          <p className="text-emerald-100/60">
            Design by{" "}
            <span className="font-semibold text-emerald-50">
              {DESIGN_CREDIT.company}
            </span>{" "}
            —{" "}
            {DESIGN_CREDIT.sites.map((site, index) => (
              <span key={site.url}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-lime-400 transition-colors hover:text-lime-300 hover:underline"
                >
                  {site.label}
                </a>
                {index < DESIGN_CREDIT.sites.length - 1 ? " & " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
