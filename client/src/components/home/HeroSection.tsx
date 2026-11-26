import Image from "next/image";
import Link from "next/link";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { ScallopedDivider } from "@/components/illustrations/ScallopedDivider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const HERO_ARCHES = [
  { src: "/images/puppies/cavapoo-copper.svg", label: "Cavapoo", tilt: "-5deg", heightClass: "h-[92px] sm:h-[160px] lg:h-[200px]", hideMobile: true },
  { src: "/images/puppies/pomeranian-orange.svg", label: "Max", tilt: "3deg", heightClass: "h-[95px] sm:h-[195px] lg:h-[246px]", hideMobile: false },
  { src: "/images/puppies/pomeranian-white.svg", label: "Pomeranian", tilt: "-2.5deg", heightClass: "h-[86px] sm:h-[162px] lg:h-[200px]", hideMobile: false },
  { isMascot: true, label: "arf!", tilt: "0deg", heightClass: "h-[104px] sm:h-[180px] lg:h-[224px]", hideMobile: false },
  { src: "/images/puppies/shihtzu-bicolor.svg", label: "Shih Tzu", tilt: "2.5deg", heightClass: "h-[90px] sm:h-[170px] lg:h-[214px]", hideMobile: false },
  { src: "/images/puppies/maltipoo-cream.svg", label: "Korean Teacup Maltipoo", tilt: "-3deg", heightClass: "h-[96px] sm:h-[193px] lg:h-[250px]", hideMobile: false },
  { src: "/images/puppies/poodle-chocolate.svg", label: "Toy Poodle", tilt: "4.5deg", heightClass: "h-[86px] sm:h-[155px] lg:h-[192px]", hideMobile: true },
];

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#fffdf8] to-[#fff1d8] pt-10 sm:pt-14 overflow-x-clip">
      {/* Warm Sunrise Radial Glow */}
      <span
        aria-hidden="true"
        className="tp-hero-sun pointer-events-none absolute top-[4%] left-1/2 w-[min(86vw,58rem)] aspect-square rounded-full"
      />

      <div className="gutter max-w-[110rem] mx-auto text-center relative z-10">
        {/* Script Eyebrow + Hand-Drawn Wavy Underline */}
        <div className="inline-flex flex-col items-center relative mb-2">
          <span className="font-scrawl text-[clamp(1.15rem,1.7vw,1.5rem)] text-[#8e3f15]">
            every puppy is family
          </span>
          <svg viewBox="0 0 220 24" preserveAspectRatio="none" className="w-full h-3 -mt-0.5 text-[#c2622b]" aria-hidden="true">
            <path
              d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Display Headline */}
        <h1 className="font-plush text-[clamp(2.6rem,min(9.2vw,11vh),8.4rem)] text-[#2a170e] max-w-[15ch] mx-auto mt-[clamp(0.45rem,1.4vh,1rem)]">
          Premium teacup
          <br />
          puppies in Dubai
        </h1>

        <p className="mt-[clamp(0.9rem,2.2vh,1.4rem)] text-[clamp(1.05rem,1.25vw,1.28rem)] leading-[1.5] text-[#5a3a28] max-w-[46ch] mx-auto">
          Meet your new best friend in our Dubai showroom, or order a rare
          miniature breed from trusted breeders worldwide.
        </p>

        {/* Dual Pill CTAs */}
        <div className="mt-[clamp(1.1rem,3vh,2rem)] flex flex-wrap items-center justify-center gap-3">
          <Link href="/puppies" className="btn-terracotta">
            View available puppies
          </Link>
          <a
            href={buildWhatsAppUrl("Hi TeddyPups! I'd love to enquire about your teacup puppies.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark"
          >
            Enquire on WhatsApp
          </a>
        </div>

        {/* 7 Arched Puppy Showcase Windows tucked behind Scalloped Cloud Edge */}
        <div className="mt-10 sm:mt-12 grid grid-cols-5 lg:grid-cols-7 gap-2.5 sm:gap-4 items-end max-w-[82rem] mx-auto relative z-10 -mb-6 sm:-mb-8">
          {HERO_ARCHES.map((arch, idx) => (
            <div
              key={idx}
              style={{ "--arch-i": idx } as React.CSSProperties}
              className={`tp-arch-enter relative flex flex-col items-center ${
                arch.hideMobile ? "hidden lg:flex" : "flex"
              }`}
            >
              {arch.isMascot ? (
                <div className="group relative w-full h-[120px] sm:h-[168px] lg:h-[195px] flex items-end justify-center z-20 -mb-1">
                  {/* Speech bubble on hover */}
                  <span
                    className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-350 ease-[cubic-bezier(.34,1.56,.64,1)] px-3 py-0.5 rounded-full border-2 border-[#2a170e] bg-[#fffdf8] font-scrawl text-sm text-[#2a170e] shadow-[2px_3px_rgba(42,23,14,0.18)] whitespace-nowrap z-30"
                    aria-hidden="true"
                  >
                    {arch.label}
                  </span>
                  <MascotPuppy
                    pose="peek"
                    className="w-24 h-24 sm:w-36 sm:h-32 lg:w-44 lg:h-36 transition-transform duration-350 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-2"
                    animateFloat
                  />
                </div>
              ) : (
                <Link
                  href={`/puppies?breed=${encodeURIComponent(arch.label)}`}
                  style={{ transform: `rotate(${arch.tilt})` }}
                  className={`group relative w-full ${arch.heightClass} flex items-end`}
                >
                  {/* Pop-up name pill on hover */}
                  <span
                    className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-350 ease-[cubic-bezier(.34,1.56,.64,1)] z-30 px-3 py-0.5 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] font-scrawl text-[0.85rem] sm:text-[0.95rem] text-[#2a170e] shadow-[2px_3px_rgba(42,23,14,0.18)] whitespace-nowrap"
                  >
                    {arch.label}
                  </span>

                  <span className="relative w-full h-full rounded-t-[999px] overflow-hidden border-[3px] border-b-0 border-[#2a170e] bg-[#fbe3b4] shadow-[inset_0_0_0_6px_#fffdf8] transition-transform duration-450 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-[12%]">
                    <Image
                      src={arch.src!}
                      alt={arch.label}
                      fill
                      className="object-cover transition-transform duration-450 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                    />
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scalloped Cloud Divider + Quilted Diamond Band (foreground over arch bases) */}
      <div className="relative z-20">
        <ScallopedDivider fillColor="#fff1d8" strokeColor="#2a170e" />
        <div className="diamond-quilt-bg h-[clamp(4.5rem,12vh,8rem)]" />
      </div>
    </section>
  );
}
