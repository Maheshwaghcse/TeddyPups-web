"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Puppy } from "@/lib/types";

interface PuppyDoorCardProps {
  puppy: Puppy;
  highlightTitle?: boolean;
  showSill?: boolean;
}

/**
 * Iconic TeddyPups arched wooden door card.
 * Closed doors show a crisp paw peephole & brass knob and swing open with spring
 * overshoot on hover/focus or scroll reveal to reveal the puppy portrait underneath.
 */
export function PuppyDoorCard({
  puppy,
  highlightTitle = false,
  showSill = true,
}: PuppyDoorCardProps) {
  const [hovered, setHovered] = useState(false);
  const isOpen = hovered || Boolean(puppy.defaultDoorOpen);

  const metaParts = [
    puppy.name && puppy.name.toLowerCase() !== puppy.breed.toLowerCase()
      ? puppy.breed
      : null,
    puppy.gender,
    puppy.ageLabel,
    puppy.hasVideo ? "with video" : null,
  ].filter(Boolean);

  const statusBadge =
    puppy.status === "available"
      ? "Available"
      : puppy.status === "reserved"
      ? "Reserved"
      : "Gone Home";

  return (
    <Link
      href={`/puppies/${puppy.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center text-center focus:outline-none rounded-2xl"
    >
      {/* Title & Metadata above door */}
      <div className="mb-3 min-h-[58px] flex flex-col justify-end">
        <h3
          className={`font-plush text-[clamp(1.4rem,2vw,1.95rem)] leading-none transition-colors duration-250 ${
            highlightTitle || hovered
              ? "text-[#a24a1a]"
              : "text-[#2a170e] group-hover:text-[#a24a1a]"
          }`}
        >
          {puppy.title}
        </h3>
        <p className="mt-1.5 text-[0.9rem] font-semibold text-[#5a3a28] leading-snug">
          {metaParts.join(", ")}
        </p>
      </div>

      {/* Arched Door Frame */}
      <div className="relative w-full max-w-[225px] aspect-[4/5.2]">
        {/* Tilted Status Pill Badge */}
        <span
          className={`absolute -right-[0.7rem] top-[16%] z-30 rotate-[7deg] px-[0.65rem] py-[0.05rem] rounded-full text-[0.88rem] font-scrawl border-2 shadow-[2px_3px_rgba(42,23,14,0.2)] transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-105 ${
            puppy.status === "available"
              ? "bg-[#fffdf8] text-[#2a170e] border-[#2a170e]"
              : puppy.status === "reserved"
              ? "bg-[#fbe3b4] text-[#8e3f15] border-[#8e3f15]"
              : "bg-[#f3e5d0] text-[#5a3a28] border-[#5a3a28]"
          }`}
        >
          {statusBadge}
        </span>

        {/* Outer Arch Mask */}
        <div
          className="relative w-full h-full rounded-t-[999px] overflow-hidden border-[3px] border-b-0 border-[#2a170e] bg-[#3b2215]"
          style={{ perspective: "700px", perspectiveOrigin: "0px center" }}
        >
          {/* Puppy Portrait Revealed Inside */}
          <Image
            src={puppy.images[0] ?? "/images/puppies/maltipoo-cream.svg"}
            alt={`${puppy.title} — ${puppy.breed}`}
            fill
            className="object-cover transition-transform duration-450 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: isOpen ? "scale(1.04)" : "scale(1)" }}
          />

          {/* Swinging Wooden Door Panel */}
          <div
            className="tp-door-wood absolute inset-0 origin-left flex flex-col items-center justify-center rounded-t-[999px] border-r-2 border-[#2a170e]/45"
            style={{
              backgroundColor: puppy.doorColor || "#a24a1a",
              transform: isOpen ? "rotateY(-78deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Inner Door Panel Groove */}
            <div className="w-[72%] h-[79%] rounded-t-[999px] rounded-b-[0.5rem] border-[2.5px] border-[#fffdf8]/28 flex flex-col items-center justify-center relative">
              {/* Crisp Paw Silhouette Peephole */}
              <svg
                viewBox="0 0 64 64"
                className="w-[30%] text-[#fffdf8]/45 -mt-12 select-none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
              {/* Brass Doorknob */}
              <span
                className="absolute right-[10%] top-[56%] w-3.5 h-3.5 rounded-full bg-[#f2be6b] border-[2.5px] border-[#2a170e]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Wooden Threshold Sill (shown in Grid view, hidden on Pinned Floorboard) */}
        {showSill && (
          <span
            className="block absolute -bottom-2 -left-2 -right-2 h-[0.6rem] rounded-[0.35rem] border-[3px] border-[#2a170e] bg-[#dc9a52] pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
    </Link>
  );
}
