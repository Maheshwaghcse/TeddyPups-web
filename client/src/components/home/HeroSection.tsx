"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ArchPortrait {
  breed: string;
  src: string;
  fallbackSrc: string;
  bg: string;
}

const ARCH_PORTRAITS: ArchPortrait[] = [
  {
    breed: "Maltipoo",
    src: "/images/puppies/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.webp",
    fallbackSrc: "/images/puppies/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.webp",
    bg: "#e9d2b0",
  },
  {
    breed: "Toy Poodle",
    src: "/images/puppies/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.webp",
    fallbackSrc: "/images/puppies/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.webp",
    bg: "#f2d6ae",
  },
  {
    breed: "Shih Tzu",
    src: "/images/puppies/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
    fallbackSrc: "/images/puppies/b942a5_967bb346583b4146acb56607f5da5f21-mv2.webp",
    bg: "#f3c78e",
  },
  {
    breed: "Teddy",
    src: "",
    fallbackSrc: "",
    bg: "#f5dfb8",
  },
  {
    breed: "Pomeranian",
    src: "/images/puppies/b942a5_6a5617708d75408b8f73725080ed0149-mv2.webp",
    fallbackSrc: "/images/puppies/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.webp",
    bg: "#e9d2b0",
  },
  {
    breed: "Yorkshire",
    src: "/images/puppies/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.webp",
    fallbackSrc: "/images/puppies/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.webp",
    bg: "#f2d6ae",
  },
  {
    breed: "Maltese",
    src: "/images/puppies/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.webp",
    fallbackSrc: "/images/puppies/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.webp",
    bg: "#e9d2b0",
  },
];

function HeroArchImage({ item }: { item: ArchPortrait }) {
  const [imgSrc, setImgSrc] = useState(item.src);

  if (!item.src) {
    return <div className="w-full h-full" style={{ backgroundColor: item.bg }} />;
  }

  return (
    <Image
      src={imgSrc}
      alt={item.breed}
      fill
      sizes="(max-width: 768px) 130px, 210px"
      unoptimized
      onError={() => {
        if (item.fallbackSrc && imgSrc !== item.fallbackSrc) {
          setImgSrc(item.fallbackSrc);
        }
      }}
      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      priority
    />
  );
}

export function HeroSection() {
  const [activeArch, setActiveArch] = useState<number>(2);

  return (
    <section
      data-puppy-section="hero"
      className="relative bg-gradient-to-b from-[#fffdf8] via-[#fdf3df] to-[#fbe3b4] pt-2 sm:pt-3 overflow-hidden"
    >
      {/* Top Headline + Subcopy + Dual CTAs */}
      <div className="gutter max-w-[100rem] mx-auto text-center relative z-10">
        <span className="font-scrawl text-[#c2622b] text-[clamp(1.2rem,1.9vw,1.65rem)] block mb-0.5 -rotate-2">
          every puppy is family
        </span>

        <h1 className="font-plush text-[clamp(2.45rem,4.7vw,4.25rem)] leading-[1.03] tracking-[-0.02em] text-[#2a170e] max-w-[17ch] mx-auto">
          Premium teacup
          <br />
          puppies in Dubai
        </h1>

        <p className="mt-2.5 text-[clamp(0.95rem,1.15vw,1.14rem)] leading-[1.48] text-[#5a3a28] max-w-[50ch] mx-auto font-normal">
          Ethical breeders in Dubai &amp; Korea. Hand-delivered across the UAE
          with full health guarantees and lifetime support.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/puppies" className="btn-terracotta">
            Meet our puppies
          </Link>
          <a
            href={buildWhatsAppUrl(
              "Hi TeddyPups! I'd love to enquire about available puppies."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {/* 7 Arched Breed Windows + single center mascot slot */}
      <div className="mt-4 sm:mt-5 max-w-[115rem] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5 sm:gap-3.5 items-end">
          {ARCH_PORTRAITS.map((item, idx) => {
            if (idx === 3) {
              return (
                <div
                  key="center-mascot"
                  className="hidden sm:flex flex-col items-center justify-end pb-1 relative z-20"
                >
                  {/* Empty anchor — PuppyScrollJourney renders the single big puppy here */}
                  <div
                    data-puppy-hero-slot="true"
                    className="w-[152px] h-[130px] mx-auto"
                  />
                </div>
              );
            }

            const isPillVisible = activeArch === idx;

            return (
              <div
                key={item.breed}
                onMouseEnter={() => setActiveArch(idx)}
                className={`${idx > 2 ? "hidden sm:flex" : "flex"
                  } flex-col items-center group cursor-pointer`}
              >
                <span
                  className={`mb-1.5 px-3.5 py-0.5 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] font-plush text-[0.78rem] text-[#2a170e] shadow-[0_3px_0_#2a170e] transition-all duration-200 ${isPillVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                >
                  {item.breed}
                </span>

                <div
                  className="relative w-full h-[145px] sm:h-[168px] md:h-[188px] lg:h-[205px] rounded-t-full border-[2.5px] border-b-0 border-[#2a170e] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ backgroundColor: item.bg }}
                >
                  <HeroArchImage item={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline Scalloped Cloud Divider */}
      <div className="relative z-20 -mt-1 leading-[0]">
        <svg
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="block w-full h-[34px] sm:h-[44px]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="tpScallop"
              width="64"
              height="44"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0 H64 V18 A32 32 0 0 1 0 18 Z"
                fill="#faeccd"
              />
            </pattern>
          </defs>
          <rect width="1440" height="44" fill="url(#tpScallop)" />
        </svg>
      </div>

      {/* Inline Quilted Diamond Band */}
      <div className="relative z-10 leading-[0]">
        <svg
          viewBox="0 0 1440 46"
          preserveAspectRatio="none"
          className="block w-full h-[34px] sm:h-[46px]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="tpQuilt"
              width="46"
              height="46"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="46" height="46" fill="#f0c98c" />
              <path
                d="M0 0 V46 M0 0 H46"
                stroke="#dfa362"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="1440" height="46" fill="url(#tpQuilt)" />
        </svg>
      </div>
    </section>
  );
}