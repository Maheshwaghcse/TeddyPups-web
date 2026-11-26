"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PuppyDoorCard } from "@/components/puppies/PuppyDoorCard";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import type { Puppy } from "@/lib/types";

interface MeetPupsSectionProps {
  puppies: Puppy[];
}

export function MeetPupsSection({ puppies }: MeetPupsSectionProps) {
  const featured = puppies.slice(0, 8);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [maxShift, setMaxShift] = useState(1400);

  useEffect(() => {
    const updateMetrics = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const vw = window.innerWidth;
      setMaxShift(Math.max(0, trackWidth - vw + 80));
    };

    const onScroll = () => {
      if (!pinRef.current || window.innerWidth < 1024) return;
      const rect = pinRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
      setProgress(scrolled / totalScrollable);
    };

    updateMetrics();
    onScroll();
    window.addEventListener("resize", updateMetrics, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", onScroll);
    };
  }, [featured.length]);

  const translateX = -progress * maxShift;

  return (
    <section className="relative bg-gradient-to-b from-[#fff1d8] to-[#fbe3b4]">
      {/* Desktop Pinned Horizontal Hallway (lg+) */}
      <div
        ref={pinRef}
        className="hidden lg:block relative"
        style={{ height: "calc(2200px + 100vh)" }}
      >
        <div className="sticky top-0 h-screen pt-[calc(var(--header-h)+clamp(1rem,3vh,2.5rem))] flex flex-col overflow-hidden">
          {/* Header Row */}
          <div className="gutter w-full max-w-[110rem] mx-auto flex items-end justify-between gap-8">
            <div>
              <h2 className="font-plush text-huge text-[#2a170e]">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[#5a3a28]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link href="/puppies" className="btn-terracotta shrink-0">
              See all available puppies
            </Link>
          </div>

          {/* Horizontal Door Track + Wooden Floorboard */}
          <div className="relative flex-1 mt-6">
            <div
              ref={trackRef}
              className="absolute left-0 bottom-[clamp(5rem,13vh,8rem)] flex items-end gap-[clamp(4.5rem,6vw,7rem)] pl-[34vw] pr-[12vw] will-change-transform"
              style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
            >
              {featured.map((puppy, idx) => {
                // Open doors progressively as the hallway scrolls across the focal zone
                const doorCenter = (idx + 0.35) / (featured.length + 0.4);
                const inFocus = Math.abs(progress - doorCenter) < 0.16;
                return (
                  <div key={puppy._id} className="w-[clamp(12rem,min(16vw,25vh),16.5rem)] shrink-0">
                    <PuppyDoorCard
                      puppy={{
                        ...puppy,
                        defaultDoorOpen: puppy.defaultDoorOpen || inFocus,
                      }}
                      showSill={false}
                    />
                  </div>
                );
              })}

              {/* Dashed "Meet them all" Finale Arch */}
              <div className="w-[clamp(12rem,min(16vw,25vh),16.5rem)] shrink-0">
                <Link
                  href="/puppies"
                  className="group flex aspect-[4/5.2] w-full items-center justify-center rounded-t-[999px] border-[3px] border-b-0 border-dashed border-[#2a170e] bg-transparent hover:bg-[#fffdf8]/45 transition-colors"
                >
                  <span className="font-plush text-[clamp(1.6rem,2.4vw,2.3rem)] leading-none text-center text-[#2a170e] underline decoration-[#c2622b] decoration-[0.08em] underline-offset-[0.18em] px-4 group-hover:text-[#a24a1a]">
                    Meet
                    <br />
                    them all
                  </span>
                </Link>
              </div>
            </div>

            {/* Walking Mascot on Floorboard */}
            <div
              className="pointer-events-none absolute left-[13vw] bottom-[calc(clamp(5rem,13vh,8rem)*0.5)] z-20"
              style={{ transform: `translateX(${progress * 26}px)` }}
            >
              <MascotPuppy pose="walking" className="w-28 h-28 xl:w-36 xl:h-32" animateFloat />
            </div>

            {/* Horizontal Wooden Floorboard Strip */}
            <div
              className="absolute inset-x-0 bottom-0 h-[clamp(5rem,13vh,8rem)] border-t-[3px] border-[#2a170e] shadow-[0_-12px_0_-6px_#f5d9a8]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(42,23,14,0.16), transparent 22%), repeating-linear-gradient(90deg, transparent 0 calc(11rem - 2px), rgba(42,23,14,0.12) calc(11rem - 2px) 11rem), linear-gradient(#e8b06a, #dc9a52)",
                backgroundPosition: `0 0, ${translateX}px 0, 0 0`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Clean Grid (< lg) */}
      <div className="lg:hidden pt-12 pb-14">
        <div className="gutter max-w-[110rem] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <h2 className="font-plush text-huge text-[#2a170e]">
                Meet the pups
              </h2>
              <p className="text-lede mt-2.5 text-[#5a3a28]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link href="/puppies" className="btn-terracotta shrink-0 self-start">
              See all available puppies
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 justify-items-center">
            {featured.map((puppy) => (
              <div key={puppy._id} className="w-full max-w-[260px]">
                <PuppyDoorCard puppy={puppy} showSill />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
