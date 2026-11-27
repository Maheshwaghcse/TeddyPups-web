"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const CTA_PUPPY_PHOTOS = [
  "/images/puppies/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.webp",
  "/images/puppies/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.webp",
  "/images/puppies/b942a5_967bb346583b4146acb56607f5da5f21-mv2.webp",
  "/images/puppies/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.webp",
];

export function FinalCtaSection() {
  const doorRef = useRef<HTMLDivElement | null>(null);
  const [doorOpen, setDoorOpen] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const el = doorRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDoorOpen(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isOpen = doorOpen || hovered;

  return (
    <section
      data-puppy-section="final-cta"
      className="relative bg-gradient-to-b from-[#2f1a10] to-[#24130b] text-[#fffdf8] pt-[clamp(4.5rem,10vh,7rem)] pb-[clamp(5rem,11vh,8rem)] text-center overflow-hidden"
    >
      <div className="gutter max-w-[110rem] mx-auto relative z-10">
        <h2 className="font-plush text-huge text-[#fffdf8] max-w-[15ch] mx-auto">
          Ready to meet your
          <br />
          new best friend?
        </h2>

        <p className="mt-5 text-[clamp(1.05rem,1.3vw,1.3rem)] leading-[1.55] text-[#fffdf8]/80 max-w-[52ch] mx-auto">
          Bring home a healthy, happy teacup or designer puppy with expert guidance
          every step of the way. We help you find the right match and ensure a
          smooth, safe delivery across the UAE.
        </p>

        {/* Illuminated Night House Entryway with Opening Door & Puppy Photo */}
        <div
          ref={doorRef}
          data-puppy-cta-door="true"
          className="relative mt-9 sm:mt-11 mx-auto w-full max-w-[360px] flex flex-col items-center select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setDoorOpen((prev) => !prev)}
        >
          {/* Warm golden radial glow spilling from the open doorway */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-full opacity-80 blur-2xl transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(circle, rgba(247,209,141,0.45) 0%, rgba(194,98,43,0.18) 52%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Roof Gable + Stars SVG */}
          <svg
            viewBox="0 0 340 86"
            className="w-full h-16 -mb-3 pointer-events-none relative z-20"
            aria-hidden="true"
          >
            {/* Twinkling stars */}
            <path
              d="M44 26 L47 34 L55 37 L47 40 L44 48 L41 40 L33 37 L41 34 Z"
              fill="#f7d18d"
              opacity="0.9"
            />
            <path
              d="M296 20 L298 26 L304 28 L298 30 L296 36 L294 30 L288 28 L294 26 Z"
              fill="#f7d18d"
              opacity="0.85"
            />
            <circle cx="82" cy="18" r="2.2" fill="#fffdf8" opacity="0.65" />
            <circle cx="258" cy="14" r="2" fill="#fffdf8" opacity="0.65" />

            {/* Cozy pitched roof */}
            <path
              d="M48 78 L170 16 L292 78 Z"
              fill="#59270c"
              stroke="#1b0e08"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M36 80 L170 10 L304 80"
              fill="none"
              stroke="#c2622b"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Arched Doorway Frame + Puppy Photo Inside */}
          <div
            className="relative z-10 w-[216px] sm:w-[238px] h-[272px] sm:h-[298px]"
            style={{ perspective: "1100px" }}
          >
            {/* Outer wooden arch trim */}
            <div className="relative w-full h-full rounded-t-full rounded-b-[16px] p-[10px] bg-gradient-to-b from-[#e8b974] to-[#c2622b] border-[3.5px] border-[#1b0e08] shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
              {/* Illuminated interior arch with the Puppy Photo */}
              <div className="relative w-full h-full rounded-t-full rounded-b-[10px] overflow-hidden bg-gradient-to-b from-[#fff5d6] via-[#fbe3b4] to-[#e5b268] border-[3px] border-[#2a170e] shadow-[inset_0_0_28px_rgba(194,98,43,0.35)]">
                {/* Warm overhead porch light glow */}
                <div
                  className="pointer-events-none absolute inset-x-6 top-2 h-16 rounded-full opacity-85 blur-md z-10"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,253,248,0.95) 0%, rgba(251,227,180,0) 72%)",
                  }}
                />

                {/* Real Puppy Photo inside the doorway */}
                <Image
                  src={CTA_PUPPY_PHOTOS[photoIndex]}
                  alt="Adorable teacup puppy ready to meet you"
                  fill
                  sizes="250px"
                  unoptimized
                  priority
                  onError={() => {
                    setPhotoIndex((prev) =>
                      prev + 1 < CTA_PUPPY_PHOTOS.length ? prev + 1 : prev
                    );
                  }}
                  className="object-cover object-center transition-transform duration-700 ease-out"
                  style={{
                    transform: isOpen ? "scale(1.04)" : "scale(0.95)",
                  }}
                />

                {/* Soft bottom vignette inside doorway */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#2a170e]/45 to-transparent" />
              </div>

              {/* 3D Swinging Wooden Door */}
              <div
                className="absolute inset-[10px] rounded-t-full rounded-b-[10px] border-[3px] border-[#1b0e08] bg-gradient-to-b from-[#8c4319] via-[#733512] to-[#59270c] shadow-2xl transition-transform duration-700 ease-out cursor-pointer"
                style={{
                  transformOrigin: "left center",
                  transform: isOpen ? "rotateY(-115deg)" : "rotateY(-24deg)",
                  transformStyle: "preserve-3d",
                }}
                title="Click to toggle door"
              >
                {/* Wood plank groove lines */}
                <div className="absolute inset-0 rounded-t-full overflow-hidden opacity-30 pointer-events-none flex justify-evenly">
                  <span className="w-[2px] h-full bg-[#1b0e08]" />
                  <span className="w-[2px] h-full bg-[#1b0e08]" />
                  <span className="w-[2px] h-full bg-[#1b0e08]" />
                </div>

                {/* Heart peep window in the wooden door */}
                <div className="mx-auto mt-10 w-12 h-12 rounded-full border-[2.5px] border-[#1b0e08] bg-[#fbe3b4]/90 shadow-inner flex items-center justify-center">
                  <span className="text-[#c2622b] text-lg leading-none">♥</span>
                </div>

                {/* Brass doorknob */}
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#f7d18d] border-[2px] border-[#1b0e08] shadow" />
              </div>
            </div>
          </div>

          {/* Doorstep steps */}
          <div className="relative z-20 -mt-1.5 w-[252px] sm:w-[276px] h-5 rounded-full bg-[#8c4319] border-[3px] border-[#1b0e08] shadow-[0_8px_18px_rgba(0,0,0,0.45)]" />
          <div className="relative z-10 -mt-1 w-[212px] sm:w-[234px] h-3.5 rounded-full bg-[#c2622b] border-[2.5px] border-[#1b0e08]" />
        </div>

        <div className="pt-[clamp(2rem,4vh,2.75rem)] flex flex-wrap items-center justify-center gap-3">
          <a
            href={buildWhatsAppUrl("Hi TeddyPups! I'm ready to meet my new best friend.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            Enquire on WhatsApp
          </a>
          <Link href="/contact" className="btn-outline-light">
            Visit &amp; contact
          </Link>
        </div>
      </div>
    </section>
  );
}