"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const BREED_CHIPS = ["Maltipoo", "Pomeranian", "Poodle", "Cavapoo", "Shih Tzu"];

export function WhatsAppPhoneMockup() {
  const [selectedBreed, setSelectedBreed] = useState<string>("Maltipoo");

  const greetingText = selectedBreed
    ? `Hi TeddyPups! I'd love to know more about your ${selectedBreed} puppies.`
    : "Hi TeddyPups! I'd love to know more about your puppies.";

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      {/* Smartphone Frame */}
      <div className="rounded-[34px] border-[5px] border-[#361D10] bg-[#FAF0DC] shadow-[0_24px_48px_rgba(45,22,9,0.22)] overflow-hidden">
        {/* Top Notch & WhatsApp Contact Header */}
        <div className="bg-[#FDF8EE] px-4 pt-3 pb-3 border-b border-[#E5D2B4] flex items-center gap-3">
          <MascotPuppy pose="head" className="w-9 h-9 shrink-0" />
          <div className="text-left">
            <p className="text-xs font-extrabold text-[#361D10]">TeddyPups U.A.E.</p>
            <p className="text-[11px] font-semibold text-[#1B7F4B]">online</p>
          </div>
        </div>

        {/* Chat History Body */}
        <div className="paw-wallpaper-bg p-4 space-y-3 min-h-[260px] flex flex-col justify-between">
          <div className="space-y-3">
            {/* Outgoing User Bubble */}
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-xs bg-[#EBBF82] px-3.5 py-2.5 text-xs text-[#361D10] font-medium shadow-xs">
              {greetingText}
            </div>

            {/* Incoming Team Bubble + Interactive Breed Chips */}
            <div className="mr-auto max-w-[92%] rounded-2xl rounded-tl-xs bg-white px-3.5 py-3 text-xs text-[#4A2B18] shadow-xs border border-[#E7D4B9]">
              <p className="leading-relaxed mb-2.5">
                Select your preferred breed or tell us what you&apos;re looking for.
                We&apos;ll guide you based on availability and your lifestyle.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {BREED_CHIPS.map((breed) => {
                  const active = selectedBreed === breed;
                  return (
                    <button
                      key={breed}
                      type="button"
                      onClick={() => setSelectedBreed(breed)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        active
                          ? "bg-[#9E4B1D] text-white border-[#9E4B1D]"
                          : "bg-[#FAF0DC] text-[#4A2B18] border-[#D8BE9A] hover:bg-[#F2DFBE]"
                      }`}
                    >
                      {breed}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Typing / Send Bar */}
          <a
            href={buildWhatsAppUrl(greetingText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-between gap-2 rounded-full bg-white border border-[#DEC8A8] px-3.5 py-2 text-xs text-[#6D5242] hover:border-[#1B7F4B] transition-colors group"
          >
            <span className="truncate font-medium">Say hello on WhatsApp</span>
            <span className="w-7 h-7 rounded-full bg-[#1B7F4B] text-white flex items-center justify-center shrink-0 group-hover:bg-[#14633A] transition-colors">
              <Send className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

