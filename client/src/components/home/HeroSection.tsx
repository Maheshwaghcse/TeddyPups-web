import Image from "next/image";
import Link from "next/link";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { ScallopedDivider } from "@/components/illustrations/ScallopedDivider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const HERO_ARCHES = [
  { src: "/images/puppies/cavapoo-copper.svg", label: "Cavapoo", hideMobile: true },
  { src: "/images/puppies/pomeranian-orange.svg", label: "Pomeranian", hideMobile: false },
  { src: "/images/puppies/pomeranian-white.svg", label: "Teacup Pom", hideMobile: false },
  { isMascot: true, label: "TeddyPups", hideMobile: false },
  { src: "/images/puppies/shihtzu-bicolor.svg", label: "Shih Tzu", badge: "Shih Tzu", hideMobile: false },
  { src: "/images/puppies/maltipoo-cream.svg", label: "Maltipoo", hideMobile: false },
  { src: "/images/puppies/poodle-chocolate.svg", label: "Toy Poodle", hideMobile: true },
];

export function HeroSection() {
  return (
    <section className="relative bg-[#FAF0DC] pt-10 sm:pt-14 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 text-center">
        {/* Script Eyebrow + Curved Swoosh */}
        <div className="inline-flex flex-col items-center mb-3">
          <span className="font-[family-name:var(--font-script)] text-2xl sm:text-[26px] font-bold text-[#9E4B1D]">
            every puppy is family
          </span>
          <svg viewBox="0 0 180 12" className="w-36 h-3 -mt-1" aria-hidden="true">
            <path
              d="M6 8 Q90 1 174 8"
              fill="none"
              stroke="#D99B52"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Display Headline */}
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl lg:text-[64px] font-black text-[#361D10] leading-[1.03] tracking-tight max-w-3xl mx-auto">
          Premium teacup
          <br />
          puppies in Dubai
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#6D5242] max-w-xl mx-auto leading-relaxed">
          Meet your new best friend in our Dubai showroom, or order a rare
          miniature breed from trusted breeders worldwide.
        </p>

        {/* Dual Pill CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <Link href="/puppies" className="btn-terracotta text-sm sm:text-[15px]">
            View available puppies
          </Link>
          <a
            href={buildWhatsAppUrl("Hi TeddyPups! I'd love to enquire about your teacup puppies.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark text-sm sm:text-[15px]"
          >
            Enquire on WhatsApp
          </a>
        </div>

        {/* 7 Arched Puppy Showcase Windows */}
        <div className="mt-12 sm:mt-14 grid grid-cols-5 lg:grid-cols-7 gap-2.5 sm:gap-4 items-end max-w-[1140px] mx-auto">
          {HERO_ARCHES.map((arch, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col items-center ${
                arch.hideMobile ? "hidden lg:flex" : "flex"
              }`}
            >
              {arch.badge && (
                <span className="mb-2 px-3 py-0.5 rounded-full bg-white border border-[#361D10] text-[11px] font-bold text-[#361D10] shadow-xs">
                  {arch.badge}
                </span>
              )}

              {arch.isMascot ? (
                <div className="relative w-full h-[120px] sm:h-[155px] flex items-end justify-center z-10 -mb-3">
                  <MascotPuppy
                    pose="peek"
                    className="w-24 h-24 sm:w-32 sm:h-32"
                    animateFloat
                  />
                </div>
              ) : (
                <Link
                  href={`/puppies?breed=${encodeURIComponent(arch.label)}`}
                  className="group relative w-full aspect-[4/4.3] rounded-t-[999px] overflow-hidden border-2 border-[#361D10] bg-[#EEDAC0] shadow-sm transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <Image
                    src={arch.src!}
                    alt={arch.label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scalloped Cloud Divider + Quilted Diamond Band */}
      <div className="-mt-4 relative z-20">
        <ScallopedDivider fillColor="#FBF2DF" strokeColor="#C8B08F" />
        <div className="diamond-quilt-bg h-14 sm:h-16 border-b border-[#EAD6B8]" />
      </div>
    </section>
  );
}

