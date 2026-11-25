"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Puppy } from "@/lib/types";

interface PuppyDoorCardProps {
  puppy: Puppy;
  highlightTitle?: boolean;
}

/**
 * Iconic TeddyPups arched wooden door card.
 * Closed doors show a paw emblem & brass knob and swing open on hover/focus
 * to reveal the puppy portrait underneath.
 */
export function PuppyDoorCard({ puppy, highlightTitle = false }: PuppyDoorCardProps) {
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
      className="group flex flex-col items-center text-center focus:outline-none"
    >
      {/* Title & Metadata above door */}
      <div className="mb-3 min-h-[54px] flex flex-col justify-end">
        <h3
          className={`font-[family-name:var(--font-display)] text-lg sm:text-xl font-black leading-tight transition-colors ${
            highlightTitle || hovered ? "text-[#9E4B1D]" : "text-[#361D10]"
          }`}
        >
          {puppy.title}
        </h3>
        <p className="mt-1 text-xs text-[#6D5242] leading-snug">
          {metaParts.join(", ")}
        </p>
      </div>

      {/* Arched Door Frame */}
      <div className="relative w-full max-w-[185px] aspect-[3/3.6]">
        {/* Tilted Status Pill Badge */}
        <span
          className={`absolute -right-2 top-5 z-30 rotate-6 px-3 py-0.5 rounded-full text-[11px] font-bold border-2 shadow-xs transition-transform duration-200 group-hover:scale-105 ${
            puppy.status === "available"
              ? "bg-white text-[#361D10] border-[#361D10]"
              : puppy.status === "reserved"
              ? "bg-[#FCE8C8] text-[#7B3610] border-[#7B3610]"
              : "bg-[#EFE6DC] text-[#5C4436] border-[#5C4436]"
          }`}
        >
          {statusBadge}
        </span>

        {/* Outer Arch Mask */}
        <div
          className="relative w-full h-full rounded-t-[999px] rounded-b-sm overflow-hidden border-[2.5px] border-[#361D10] bg-[#FAF0DC] shadow-sm"
          style={{ perspective: "900px" }}
        >
          {/* Puppy Portrait Revealed Inside */}
          <Image
            src={puppy.images[0] ?? "/images/puppies/maltipoo-cream.svg"}
            alt={`${puppy.title} — ${puppy.breed}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Swinging Wooden Door Panel */}
          <div
            className="absolute inset-0 origin-left transition-transform duration-500 ease-out flex flex-col items-center justify-center border-r-2 border-[#361D10]/50"
            style={{
              backgroundColor: puppy.doorColor || "#C97538",
              transform: isOpen ? "rotateY(-72deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Inner Door Panel Groove */}
            <div className="w-[82%] h-[86%] rounded-t-[999px] border border-white/25 flex flex-col items-center justify-center relative">
              {/* Subtle Paw Emblem */}
              <span className="text-white/40 text-2xl select-none -mt-6" aria-hidden="true">
                🐾
              </span>
              {/* Brass Doorknob */}
              <span
                className="absolute right-3 top-1/2 w-2.5 h-2.5 rounded-full bg-[#F2C86B] border border-[#5B3218] shadow-xs"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

