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

const FOOTER_STARS = [
  { left: "6%", top: "18%", size: 13, delay: "0s" },
  { left: "14%", top: "42%", size: 8, delay: "0.4s" },
  { left: "23%", top: "12%", size: 10, delay: "0.8s" },
  { left: "31%", top: "30%", size: 7, delay: "1.2s" },
  { left: "44%", top: "9%", size: 11, delay: "1.6s" },
  { left: "52%", top: "36%", size: 8, delay: "2.0s" },
  { left: "63%", top: "15%", size: 10, delay: "2.4s" },
  { left: "71%", top: "40%", size: 7, delay: "2.8s" },
  { left: "92%", top: "33%", size: 9, delay: "3.2s" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#24130b] text-[#fffdf8] pt-20 md:pt-28 pb-10">
      {/* Gentle Curved Hill Top Edge */}
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-[calc(100%-1px)] left-0 w-full h-[clamp(2.5rem,5vw,5rem)] fill-[#24130b] block"
        aria-hidden="true"
      >
        <path d="M0,70 Q720,0 1440,70 L1440,70 L0,70 Z" />
      </svg>

      {/* Subtle Twinkling Stars & Crescent Moon */}
      <div
        className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden"
        aria-hidden="true"
      >
        {FOOTER_STARS.map((star, idx) => (
          <svg
            key={idx}
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-[#f2be6b]"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              animationDelay: star.delay,
            }}
          >
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
        ))}

        {/* Crescent Moon */}
        <span
          className="tp-crescent-moon absolute top-[10%] right-[9%] w-[clamp(2.6rem,4vw,3.6rem)] aspect-square rounded-full -rotate-[18deg] bg-[#fbe3b4]"
        />
      </div>

      <div className="gutter relative max-w-[110rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-x-12 md:gap-y-6 pb-10">
          {/* Column 1: Brand & Basket Mascot */}
          <div className="md:col-span-5 space-y-5">
            <h2 className="font-plush text-big text-[#fbe3b4]">
              Home, at last.
            </h2>
            <p className="text-base leading-relaxed text-[#fffdf8]/80 max-w-md">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies,
              offering premium services and worldwide shipping.
            </p>
            <div className="pt-2">
              <MascotPuppy pose="basket" className="w-52 h-44 sm:w-64 sm:h-48 -ml-6 sm:-ml-10" />
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="md:col-span-3 md:col-start-7 space-y-4">
            <h3 className="font-scrawl text-lg text-[#f2be6b]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-base">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#fffdf8]/90 hover:text-[#f2be6b] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Say hello */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-scrawl text-lg text-[#f2be6b]">
              Say hello
            </h3>
            <ul className="space-y-2.5 text-base text-[#fffdf8]/90">
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f2be6b] transition-colors font-semibold"
                >
                  WhatsApp {SITE_CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="hover:text-[#f2be6b] transition-colors"
                >
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="text-[#fffdf8]/80">{SITE_CONTACT.location}</li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-3">
              {["Instagram", "TikTok", "Facebook"].map((network) => (
                <a
                  key={network}
                  href={`https://${network.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full border-2 border-[#fffdf8]/30 text-sm font-semibold text-[#fffdf8] hover:border-[#f2be6b] hover:text-[#f2be6b] transition-colors"
                >
                  {network}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-[#fffdf8]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-[#fffdf8]/60">
          <div className="flex items-center gap-3">
            <MascotPuppy pose="head" className="w-9 h-9" />
            <span>© 2026 TeddyPups U.A.E.</span>
            <Link href="/admin" className="ml-2 opacity-60 hover:opacity-100 underline">
              Admin
            </Link>
          </div>
          <p className="font-scrawl text-base text-[#f2be6b]/80">
            every puppy is family
          </p>
        </div>
      </div>
    </footer>
  );
}
