"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Puppy } from "@/lib/types";

interface PuppyDoorCardProps {
  puppy: Puppy;
  index?: number;
  highlightTitle?: boolean;
  showSill?: boolean;
}

const PASTEL_PALETTES = [
  "#F3DCB3", // Warm apricot cream
  "#DDE8F2", // Soft sky blue
  "#F4E2BE", // Butter cream
  "#F2DEC2", // Warm sand
  "#F5DCE0", // Soft blush pink
];

const FALLBACK_WEBP_IMAGES = [
  "/images/puppies/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.webp",
  "/images/puppies/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.webp",
  "/images/puppies/b942a5_967bb346583b4146acb56607f5da5f21-mv2.webp",
  "/images/puppies/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.webp",
  "/images/puppies/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.webp",
  "/images/puppies/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.webp",
  "/images/puppies/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.webp",
  "/images/puppies/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.webp",
];

function getVariantIndex(seed: string, fallback = 0): number {
  if (!seed) return fallback % PASTEL_PALETTES.length;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % PASTEL_PALETTES.length;
}

export function PuppyDoorCard({
  puppy,
  index = 0,
  highlightTitle = false,
}: PuppyDoorCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(Boolean(puppy.defaultDoorOpen));

  const fallbackImg = FALLBACK_WEBP_IMAGES[index % FALLBACK_WEBP_IMAGES.length];
  const primaryImg =
    puppy.images?.[0] && !puppy.images[0].endsWith(".svg")
      ? puppy.images[0]
      : fallbackImg;

  const [imgSrc, setImgSrc] = useState<string>(primaryImg);

  useEffect(() => {
    setImgSrc(
      puppy.images?.[0] && !puppy.images[0].endsWith(".svg")
        ? puppy.images[0]
        : fallbackImg
    );
  }, [puppy.images, fallbackImg]);

  // Scroll-triggered circular peephole iris reveal
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          setRevealed(true);
        } else if (!entry.isIntersecting) {
          setRevealed(false);
        }
      },
      { threshold: [0, 0.45, 0.75], rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isOpen = hovered || revealed || Boolean(puppy.defaultDoorOpen);
  const variant =
    index !== undefined ? index % 5 : getVariantIndex(puppy._id || puppy.slug);
  const pastelBg = PASTEL_PALETTES[variant % PASTEL_PALETTES.length];
  const doodleSet = variant % 4;

  // Format metadata with middle dots (e.g. "Maltipoo · boy · 3 months")
  const metaParts = [
    puppy.name &&
      puppy.title.toLowerCase() === puppy.name.toLowerCase() &&
      puppy.breed
      ? puppy.breed
      : null,
    puppy.gender,
    puppy.ageLabel,
  ].filter(Boolean);

  const statusBadge =
    puppy.status === "available"
      ? "Available"
      : puppy.status === "reserved"
        ? "Reserved"
        : "Gone Home";

  return (
    <Link
      ref={cardRef}
      href={`/puppies/${puppy.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center text-center focus:outline-none select-none"
    >
      {/* Circular Sketchbook Frame */}
      <div className="relative w-full max-w-[248px] aspect-square flex items-center justify-center">
        {/* Hand-drawn Outer Sketch Arcs & Doodles SVG */}
        <svg
          viewBox="0 0 260 260"
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          {doodleSet === 0 && (
            <>
              <path
                d="M 24 102 A 112 112 0 0 1 182 26"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M 238 148 A 112 112 0 0 1 88 238"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Small terracotta paw top-left */}
              <g
                transform="translate(8, 34) rotate(-22) scale(0.24)"
                fill="#D99B58"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </g>
              {/* Small terracotta swirl on left */}
              <path
                d="M 4 138 C 2 132, 10 128, 13 134 C 16 140, 6 146, 2 139 C -2 131, 8 122, 16 128"
                stroke="#C56E38"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}

          {doodleSet === 1 && (
            <>
              <path
                d="M 38 66 A 112 112 0 0 1 206 42"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M 228 108 A 112 112 0 0 1 118 242"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* 3 whisker dashes top-left */}
              <path
                d="M 8 68 L 17 65 M 6 75 L 16 74 M 9 82 L 17 83"
                stroke="#C56E38"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Tiny dark paw on right */}
              <g
                transform="translate(242, 114) rotate(18) scale(0.22)"
                fill="#4A2E1B"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </g>
            </>
          )}

          {doodleSet === 2 && (
            <>
              <path
                d="M 28 84 A 112 112 0 0 1 190 24"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M 236 122 A 112 112 0 0 1 76 234"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* 3 dots top-left */}
              <circle cx="52" cy="14" r="2.2" fill="#2A170E" />
              <circle cx="62" cy="10" r="1.7" fill="#2A170E" />
              <circle cx="59" cy="20" r="1.5" fill="#2A170E" />
              {/* 4-point sparkle + dashes on right */}
              <path
                d="M 250 120 Q 250 130 240 130 Q 250 130 250 140 Q 250 130 260 130 Q 250 130 250 120 Z"
                fill="#D4844A"
              />
              <path
                d="M 244 156 L 253 153 M 245 163 L 255 162 M 244 170 L 252 171"
                stroke="#C56E38"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}

          {doodleSet === 3 && (
            <>
              <path
                d="M 42 52 A 112 112 0 0 1 218 68"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M 232 138 A 112 112 0 0 1 92 238"
                stroke="#2A170E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* 3 dots top-left */}
              <circle cx="26" cy="48" r="2.2" fill="#2A170E" />
              <circle cx="35" cy="43" r="1.7" fill="#2A170E" />
              <circle cx="33" cy="53" r="1.5" fill="#2A170E" />
            </>
          )}
        </svg>

        {/* Tilted Status Pill Badge (Top-Right) */}
        {puppy.status === "available" && (
          <span className="absolute right-2 top-3 z-30 rotate-[8deg] px-3.5 py-0.5 rounded-full text-[0.92rem] font-scrawl bg-[#FFFDF8] text-[#2A170E] border-[1.5px] border-[#2A170E] shadow-[1px_2px_0_rgba(42,23,14,0.18)] transition-transform duration-300 group-hover:scale-105">
            {statusBadge}
          </span>
        )}

        {/* Pastel Offset Backdrop Circle */}
        <div
          className="relative w-[86%] h-[86%] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ backgroundColor: pastelBg }}
        >
          {/* Inner Circular Portrait with Peephole Iris Reveal */}
          <div
            className="relative w-[91%] h-[91%] rounded-full overflow-hidden transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              clipPath: isOpen
                ? "circle(50% at 50% 50%)"
                : "circle(14% at 50% 50%)",
            }}
          >
            <Image
              src={imgSrc}
              alt={`${puppy.title} — ${puppy.breed}`}
              fill
              sizes="260px"
              unoptimized
              onError={() => {
                if (imgSrc !== fallbackImg) {
                  setImgSrc(fallbackImg);
                } else {
                  setImgSrc("/images/puppies/maltipoo-cream.svg");
                }
              }}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>

          {/* "▶ video" Pill Badge (Bottom-Left) */}
          {puppy.hasVideo && isOpen && (
            <span className="absolute bottom-3.5 left-3.5 z-30 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2A170E]/85 text-[#FFFDF8] text-[11px] font-semibold tracking-tight backdrop-blur-xs">
              <span className="text-[9px] leading-none">▶</span> video
            </span>
          )}
        </div>
      </div>

      {/* Title & Metadata BELOW the Circle */}
      <div className="mt-3 px-2 max-w-[240px]">
        <h3
          className={`font-plush text-[1.4rem] sm:text-[1.55rem] leading-[1.08] transition-colors duration-200 ${highlightTitle || hovered
            ? "text-[#A24A1A]"
            : "text-[#2A170E] group-hover:text-[#A24A1A]"
            }`}
        >
          {puppy.title}
        </h3>
        <p className="mt-1 text-[0.82rem] font-medium text-[#5A3A28] leading-snug">
          {metaParts.join(" · ")}
        </p>
      </div>
    </Link>
  );
}