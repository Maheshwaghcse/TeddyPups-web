"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DoorOpen, Search } from "lucide-react";
import { PuppyDoorCard } from "./PuppyDoorCard";
import type { Puppy } from "@/lib/types";

interface PuppyCatalogClientProps {
  initialPuppies: Puppy[];
  initialOrigin?: string;
  initialStatus?: string;
  initialBreed?: string;
}

const ORIGIN_TABS = [
  { value: "all", label: "All puppies" },
  { value: "dubai", label: "In Dubai Showroom" },
  { value: "korea", label: "Imported from Korea" },
];

const STATUS_TABS = [
  { value: "all", label: "All statuses" },
  { value: "available", label: "Available" },
  { value: "gone-home", label: "Gone home" },
];

export function PuppyCatalogClient({
  initialPuppies,
  initialOrigin = "all",
  initialStatus = "all",
  initialBreed = "all",
}: PuppyCatalogClientProps) {
  const router = useRouter();
  const [origin, setOrigin] = useState(initialOrigin);
  const [status, setStatus] = useState(initialStatus);
  const [breed, setBreed] = useState(initialBreed);
  const [search, setSearch] = useState("");
  const [revealAllDoors, setRevealAllDoors] = useState(true);

  const uniqueBreeds = useMemo(() => {
    const set = new Set(initialPuppies.map((p) => p.breed));
    return ["all", ...Array.from(set).sort()];
  }, [initialPuppies]);

  const filtered = useMemo(() => {
    return initialPuppies.filter((p) => {
      if (origin !== "all" && p.origin !== origin) return false;
      if (status !== "all" && p.status !== status) return false;
      if (breed !== "all" && p.breed.toLowerCase() !== breed.toLowerCase()) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${p.title} ${p.name ?? ""} ${p.breed} ${p.color}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [initialPuppies, origin, status, breed, search]);

  function updateQuery(nextOrigin: string, nextStatus: string, nextBreed: string) {
    const params = new URLSearchParams();
    if (nextOrigin !== "all") params.set("origin", nextOrigin);
    if (nextStatus !== "all") params.set("status", nextStatus);
    if (nextBreed !== "all") params.set("breed", nextBreed);
    const qs = params.toString();
    router.replace(`/puppies${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  return (
    <div className="space-y-10">
      {/* Interactive Filter Panel */}
      <div className="rounded-3xl bg-[#FFF9ED] border-2 border-[#DFC7A3] p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Origin Tabs */}
          <div className="flex flex-wrap gap-2">
            {ORIGIN_TABS.map((tab) => {
              const active = origin === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setOrigin(tab.value);
                    updateQuery(tab.value, status, breed);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                    active
                      ? "bg-[#9E4B1D] text-white border-[#9E4B1D]"
                      : "bg-white text-[#4A2B18] border-[#D8C09E] hover:bg-[#F5E7CE]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search & Door Peek Toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8A654A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search breed, name, color..."
                className="w-full sm:w-64 rounded-full border border-[#D8C09E] bg-white pl-9 pr-4 py-2 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
              />
            </div>

            <button
              type="button"
              onClick={() => setRevealAllDoors((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#4A2B18]/40 bg-white text-xs font-bold text-[#361D10] hover:bg-[#F4E4C6] transition-colors cursor-pointer"
            >
              <DoorOpen className="w-4 h-4 text-[#9E4B1D]" />
              {revealAllDoors ? "Close wooden doors" : "Open all doors"}
            </button>
          </div>
        </div>

        {/* Breed & Status Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#EAD8BB]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#7A5437] mr-1">Breed:</span>
            {uniqueBreeds.map((b) => {
              const active = breed.toLowerCase() === b.toLowerCase();
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setBreed(b);
                    updateQuery(origin, status, b);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? "bg-[#361D10] text-white"
                      : "bg-[#F4E6CE] text-[#4A2B18] hover:bg-[#E7D0AC]"
                  }`}
                >
                  {b === "all" ? "All breeds" : b}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {STATUS_TABS.map((s) => {
              const active = status === s.value;
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    setStatus(s.value);
                    updateQuery(origin, s.value, breed);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? "bg-[#1B7F4B] text-white border-[#1B7F4B]"
                      : "bg-white text-[#4A2B18] border-[#D8C09E]"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#6D5242]">
          Showing <span className="text-[#361D10] font-extrabold">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "puppy" : "puppies"}
        </p>
      </div>

      {/* Puppies Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-[#FFF9ED] border border-[#DFC7A3] p-12 text-center space-y-4">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#361D10]">
            No puppies match these filters right now
          </h3>
          <p className="text-sm text-[#6D5242] max-w-md mx-auto">
            Try clearing your filters or message us on WhatsApp—we also source rare
            teacup breeds directly from Seoul on request.
          </p>
          <button
            type="button"
            onClick={() => {
              setOrigin("all");
              setStatus("all");
              setBreed("all");
              setSearch("");
              updateQuery("all", "all", "all");
            }}
            className="btn-terracotta text-sm cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((puppy) => (
            <PuppyDoorCard
              key={puppy._id}
              puppy={{
                ...puppy,
                defaultDoorOpen: revealAllDoors ? true : puppy.defaultDoorOpen,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

