"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PolaroidCard } from "./PolaroidCard";
import type { HappyFamily } from "@/lib/types";

interface HappyFamiliesClientProps {
  families: HappyFamily[];
}

export function HappyFamiliesClient({ families }: HappyFamiliesClientProps) {
  const [selectedBreed, setSelectedBreed] = useState("all");

  const breeds = useMemo(() => {
    const set = new Set(families.map((f) => f.puppyBreed));
    return ["all", ...Array.from(set)];
  }, [families]);

  const filtered = useMemo(() => {
    if (selectedBreed === "all") return families;
    return families.filter((f) => f.puppyBreed === selectedBreed);
  }, [families, selectedBreed]);

  const quotes = useMemo(
    () => families.filter((f) => Boolean(f.testimonialQuote)),
    [families]
  );

  return (
    <div className="space-y-12">
      {/* Breed Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {breeds.map((b) => {
          const active = selectedBreed === b;
          return (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBreed(b)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                active
                  ? "bg-white text-[#361D10] border-white"
                  : "bg-[#6E3618] text-[#F5DEC7] border-[#9E5B34] hover:bg-[#7E3F1C]"
              }`}
            >
              {b === "all" ? "Every happy family" : b}
            </button>
          );
        })}
      </div>

      {/* Polaroid Wall */}
      <div className="wood-siding-bg rounded-3xl border-2 border-[#3A1B0C] p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filtered.map((family) => (
            <PolaroidCard key={family._id} family={family} />
          ))}
        </div>
      </div>

      {/* Client Testimonials */}
      {quotes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((item) => (
            <blockquote
              key={item._id}
              className="rounded-2xl bg-white text-[#361D10] p-6 border-2 border-[#3A1B0C] shadow-md flex flex-col justify-between gap-4"
            >
              <p className="text-sm leading-relaxed text-[#4A2B18]">
                &ldquo;{item.testimonialQuote}&rdquo;
              </p>
              <footer className="flex items-center justify-between text-xs font-extrabold text-[#9E4B1D]">
                <span>{item.clientName || item.location}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0DC] text-[#4A2B18]">
                  {item.puppyBreed}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      <div className="text-center pt-4">
        <Link href="/puppies" className="btn-terracotta text-sm sm:text-base">
          Browse available puppies
        </Link>
      </div>
    </div>
  );
}

