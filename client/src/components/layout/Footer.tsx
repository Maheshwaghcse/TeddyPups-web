import Link from "next/link";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { SITE_CONTACT, buildWhatsAppUrl } from "@/lib/whatsapp";

const EXPLORE_LINKS = [
  { href: "/puppies?status=available", label: "Available puppies" },
  { href: "/puppies?status=gone-home", label: "Gone home" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/how-it-works#delivery-collection", label: "Delivery & collection" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#2D180D] text-[#EBD9C6] pt-16 pb-8 border-t border-[#4B2A18]/50 overflow-hidden">
      {/* Subtle Glowing Crescent Moon */}
      <div
        className="pointer-events-none absolute right-8 sm:right-20 top-12 opacity-90"
        aria-hidden="true"
      >
        <svg viewBox="0 0 60 60" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_12px_rgba(255,229,165,0.5)]">
          <path
            d="M36 8 A22 22 0 1 0 52 44 A17 17 0 1 1 36 8 Z"
            fill="#FFE6AC"
          />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Column 1: Brand & Basket Mascot */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-white tracking-tight">
              Home, at last.
            </h2>
            <p className="text-sm leading-relaxed text-[#D8C1AB] max-w-xs">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies,
              offering premium services and worldwide shipping.
            </p>
            <div className="pt-3">
              <MascotPuppy pose="basket" className="w-28 h-24" />
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#D99B52] tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#EBD9C6] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Say hello */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#D99B52] tracking-wide">
              Say hello
            </h3>
            <ul className="space-y-2 text-sm text-[#EBD9C6]">
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-semibold"
                >
                  WhatsApp {SITE_CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="text-[#D4BC9F]">{SITE_CONTACT.location}</li>
            </ul>

            <div className="pt-3 flex flex-wrap gap-2">
              {["Instagram", "TikTok", "Facebook"].map((network) => (
                <a
                  key={network}
                  href={`https://${network.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full border border-white/35 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {network}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#C7B09B]">
          <div className="flex items-center gap-2.5">
            <MascotPuppy pose="head" className="w-6 h-6" />
            <span>© 2026 TeddyPups U.A.E.</span>
            <Link href="/admin" className="ml-2 opacity-60 hover:opacity-100 underline">
              Admin
            </Link>
          </div>
          <p className="font-[family-name:var(--font-script)] text-lg text-[#D99B52]">
            every puppy is family
          </p>
        </div>
      </div>
    </footer>
  );
}

