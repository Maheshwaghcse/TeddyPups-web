"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF0DC]/95 backdrop-blur-md border-b border-[#E5D2B4] shadow-[0_4px_18px_rgba(54,29,16,0.06)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          onClick={() => setMobileOpen(false)}
        >
          <MascotPuppy
            pose="head"
            className="w-10 h-10 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-[family-name:var(--font-display)] text-xl sm:text-[22px] font-black tracking-tight text-[#361D10]">
            TeddyPups
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[14.5px] font-semibold transition-colors py-1 ${
                  active
                    ? "text-[#9E4B1D]"
                    : "text-[#4B2C1B] hover:text-[#9E4B1D]"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 text-[10px] leading-none text-[#9E4B1D]"
                    aria-hidden="true"
                  >
                    🐾
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-xs sm:text-sm !py-2.5 !px-4 sm:!px-5"
          >
            WhatsApp us
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#4B2C1B]/30 text-[#361D10] hover:bg-[#EFE0C5] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E5D2B4] bg-[#FAF0DC] px-5 py-5 space-y-2 shadow-lg">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  active
                    ? "bg-[#9E4B1D]/12 text-[#9E4B1D]"
                    : "text-[#361D10] hover:bg-[#EFE0C5]"
                }`}
              >
                <span>{item.label}</span>
                {active && <span aria-hidden="true">🐾</span>}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

