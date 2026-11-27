"use client";

import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const BREED_CHIPS = ["Maltipoo", "Pomeranian", "Poodle", "Cavapoo", "Shih Tzu"];

interface WhatsAppPhoneMockupProps {
  activeStep?: number;
}

export function WhatsAppPhoneMockup({ activeStep = 1 }: WhatsAppPhoneMockupProps) {
  const [selectedBreed, setSelectedBreed] = useState<string>("Maltipoo");

  const greetingText = selectedBreed
    ? `Hi TeddyPups! I'd love to know more about your ${selectedBreed} puppies.`
    : "Hi TeddyPups! I'd love to know more about your puppies.";

  return (
    <div className="relative mx-auto w-full max-w-[23rem] rotate-[1.5deg]">
      {/* Smartphone Frame */}
      <div className="rounded-[2.7rem] border-[3px] border-[#2a170e] bg-[#2a170e] p-[0.55rem] shadow-[12px_16px_rgba(42,23,14,0.16)] overflow-hidden">
        {/* Top WhatsApp Contact Header */}
        <div className="bg-[#fffdf8] px-[0.9rem] py-[0.65rem] rounded-t-[2.1rem] rounded-b-[0.5rem] flex items-center gap-3">
          <MascotPuppy pose="head" className="w-10 h-10 shrink-0" />
          <div className="text-left">
            <p className="text-[0.98rem] font-bold leading-[1.15] text-[#2a170e]">
              TeddyPups U.A.E.
            </p>
            <p className="text-[0.78rem] font-medium text-[#5a3a28]">
              {activeStep === 2 ? "typing..." : "online"}
            </p>
          </div>
        </div>

        {/* Chat History Body */}
        <div className="paw-wallpaper-bg mt-[0.3rem] rounded-[0.5rem] px-[0.65rem] py-[0.9rem] min-h-[24rem] flex flex-col justify-end gap-2">
          {/* Step 1 Messages */}
          <div className="flex flex-col gap-2">
            {/* Outgoing User Bubble */}
            <div className="tp-msg-anim ml-auto max-w-[86%] rounded-[1.05rem] rounded-br-[0.25rem] border-2 border-[#2a170e] bg-[#f2be6b] px-3 py-2 text-[0.88rem] leading-[1.38] text-[#2a170e]">
              {greetingText}
            </div>

            {/* Incoming Team Bubble + Interactive Breed Chips */}
            <div className="tp-msg-anim mr-auto max-w-[92%] rounded-[1.05rem] rounded-bl-[0.25rem] border-2 border-[#2a170e] bg-[#fffdf8] px-3 py-2.5 text-[0.88rem] leading-[1.38] text-[#2a170e]">
              <p className="mb-2">
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
                      className={`px-2.5 py-0.5 min-h-[1.8rem] rounded-full text-[0.8rem] font-[650] border-[1.5px] border-[#2a170e] transition-colors ${active
                          ? "bg-[#a24a1a] text-[#fffdf8]"
                          : "bg-[#fbe3b4] text-[#2a170e] hover:bg-[#f2be6b]"
                        }`}
                    >
                      {breed}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 Real Photos Preview Bubble (Using your local .webp puppy photos) */}
            {activeStep >= 2 && (
              <div className="tp-msg-anim mr-auto max-w-[86%] rounded-[1.05rem] rounded-bl-[0.25rem] border-2 border-[#2a170e] bg-[#fffdf8] p-1.5 text-[0.82rem] text-[#2a170e]">
                <div className="grid grid-cols-2 gap-1 w-[11.5rem] mb-1.5">
                  <div className="relative aspect-square rounded-[0.6rem] overflow-hidden bg-[#fbe3b4]">
                    <Image
                      src="/images/puppies/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.webp"
                      alt="Maltipoo preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-[0.6rem] overflow-hidden bg-[#fbe3b4]">
                    <Image
                      src="/images/puppies/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.webp"
                      alt="Pomeranian preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="px-1.5 pb-1 leading-snug">
                  Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                </p>
              </div>
            )}

            {/* Step 3 Delivery Route Bubble */}
            {activeStep >= 3 && (
              <div className="tp-msg-anim mr-auto max-w-[86%] rounded-[1.05rem] rounded-bl-[0.25rem] border-2 border-[#2a170e] bg-[#fffdf8] px-3 py-2 text-[0.85rem] leading-[1.38] text-[#2a170e]">
                All vet certificates, permits &amp; door-to-door UAE delivery arranged for you.
              </div>
            )}

            {/* Animated Bouncing Typing Dots */}
            {activeStep < 3 && (
              <div className="mr-auto inline-flex items-center gap-1 rounded-[1.05rem] rounded-bl-[0.25rem] border-2 border-[#2a170e] bg-[#fffdf8] px-3.5 py-2.5">
                <span className="tp-typing-dot w-[0.45rem] h-[0.45rem] rounded-full bg-[#2a170e]" />
                <span className="tp-typing-dot w-[0.45rem] h-[0.45rem] rounded-full bg-[#2a170e]" />
                <span className="tp-typing-dot w-[0.45rem] h-[0.45rem] rounded-full bg-[#2a170e]" />
              </div>
            )}
          </div>
        </div>

        {/* Typing / Send Bar */}
        <a
          href={buildWhatsAppUrl(greetingText)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[0.3rem] flex items-center justify-between gap-2 rounded-t-[0.5rem] rounded-b-[2.1rem] bg-[#fffdf8] py-[0.45rem] pl-4 pr-[0.45rem] text-[0.9rem] font-semibold text-[#5a3a28] hover:text-[#2a170e] transition-colors group"
        >
          <span className="truncate">Say hello on WhatsApp</span>
          <span className="w-[2.4rem] h-[2.4rem] rounded-full bg-[#1f7a4d] text-white flex items-center justify-center shrink-0 group-hover:bg-[#17613c] transition-colors">
            <Send className="w-4 h-4" />
          </span>
        </a>
      </div>
    </div>
  );
}