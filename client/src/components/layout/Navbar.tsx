"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
];

function NavPawIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="currentColor">
      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const showHem = !isHome || scrolled || mobileOpen;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-350 ${
        showHem ? "bg-[#fffdf8]" : "bg-[#fffdf8]/0"
      }`}
    >
      <div className="gutter max-w-[110rem] mx-auto h-[var(--header-h)] flex items-center gap-6 relative">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group rounded-full"
          onClick={() => setMobileOpen(false)}
        >
          <MascotPuppy
            pose="head"
            className="w-[2.6rem] h-[2.6rem] md:w-[3rem] md:h-[3rem] transition-transform duration-600 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-8"
          />
          <span className="font-plush text-[1.35rem] md:text-[1.4rem] leading-none text-[#2a170e]">
            TeddyPups
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex flex-1 justify-center" aria-label="Main Navigation">
          <ul className="flex items-center gap-[clamp(1.25rem,2.3vw,2.4rem)]">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative inline-flex items-center py-[0.55rem] px-[0.1rem] text-[1rem] font-[620] whitespace-nowrap transition-colors duration-250 ${
                      active
                        ? "text-[#a24a1a]"
                        : "text-[#2a170e] hover:text-[#8e3f15]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <NavPawIcon
                      className={`pointer-events-none absolute -bottom-[0.45rem] left-1/2 -translate-x-1/2 -rotate-[10deg] w-[0.8rem] h-[0.8rem] text-[#c2622b] transition-all duration-400 ease-[cubic-bezier(.34,1.56,.64,1)] ${
                        active
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-[0.4] group-hover:opacity-45 group-hover:scale-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 ml-auto">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp hidden md:inline-flex !min-h-[2.75rem] !py-[0.6rem] !px-[1.35rem] !text-[0.95rem]"
          >
            WhatsApp us
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex h-10 items-center gap-2 rounded-full border-2 border-[#2a170e] bg-[#fffdf8] px-4 text-[0.95rem] font-semibold text-[#2a170e] hover:bg-[#fbe3b4] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <>
                <NavPawIcon className="w-4 h-4 text-[#2a170e]" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scalloped Bottom Hem (visible when scrolled or on subpages) */}
      <svg
        aria-hidden="true"
        width="100%"
        height="14"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute left-0 top-[calc(100%-1px)] block transition-opacity duration-350 drop-shadow-[0_4px_4px_rgba(42,23,14,0.08)] ${
          showHem ? "opacity-100" : "opacity-0"
        }`}
      >
        <defs>
          <pattern id="tp-nav-hem" width="44" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0H44V2A22 11 0 0 1 0 2Z" fill="#fffdf8" />
            <path
              d="M0 2A22 11 0 0 0 44 2"
              fill="none"
              stroke="rgba(42, 23, 14, 0.14)"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tp-nav-hem)" />
      </svg>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-[#2a170e]/15 bg-[#f2be6b] px-6 py-7 space-y-2 shadow-xl">
          <p className="font-scrawl text-lg text-[#5a3a28] mb-3">where to, friend?</p>
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between py-2 font-plush text-[clamp(1.8rem,7vw,2.6rem)] leading-tight transition-colors ${
                  active ? "text-[#a24a1a]" : "text-[#2a170e] hover:text-[#a24a1a]"
                }`}
              >
                <span>{item.label}</span>
                {active && <NavPawIcon className="w-5 h-5 text-[#a24a1a]" />}
              </Link>
            );
          })}
          <div className="pt-4">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
