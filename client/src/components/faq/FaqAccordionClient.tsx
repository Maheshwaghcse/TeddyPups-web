"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { FaqItem } from "@/lib/types";

interface FaqAccordionClientProps {
  faqs: FaqItem[];
}

const CATEGORIES = [
  { value: "all", label: "All questions" },
  { value: "health", label: "Health & Vet Checks" },
  { value: "adoption", label: "Adoption" },
  { value: "import", label: "Korea Import" },
  { value: "visiting", label: "Dubai Showroom" },
  { value: "delivery", label: "Delivery" },
];

export function FaqAccordionClient({ faqs }: FaqAccordionClientProps) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?._id ?? null);

  const filtered = useMemo(() => {
    return faqs.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (
          !item.question.toLowerCase().includes(q) &&
          !item.answer.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [faqs, category, search]);

  return (
    <div className="space-y-8">
      {/* Search + Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#C7B09B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (vaccination, Dubai, import...)"
            className="w-full rounded-full bg-white/10 border border-white/25 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#C7B09B] focus:outline-none focus:ring-2 focus:ring-[#EBBF82]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const active = category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                  active
                    ? "bg-[#EBBF82] text-[#331C10] border-[#EBBF82]"
                    : "bg-white/5 text-[#EAD9C6] border-white/25 hover:bg-white/12"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5 max-w-3xl mx-auto">
        {filtered.map((item) => {
          const isOpen = openId === item._id;
          return (
            <div
              key={item._id}
              className="rounded-2xl bg-[#432515]/80 border border-white/15 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item._id)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/5 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-black text-white flex items-start gap-2.5">
                  <span className="text-[#E6B366] text-base leading-7 shrink-0" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#EBBF82] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pl-12 text-sm text-[#DFCBB5] leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-[#D8C1AB] py-8">
            No matching questions found. Ask us directly on WhatsApp!
          </p>
        )}
      </div>
    </div>
  );
}

