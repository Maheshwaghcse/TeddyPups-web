"use client";

import { useState } from "react";
import Link from "next/link";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { WhatsAppPhoneMockup } from "./WhatsAppPhoneMockup";

const JOURNEY_STEPS = [
  {
    number: 1,
    title: "Choose your breed",
    description:
      "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    number: 2,
    title: "Get photos & details",
    description:
      "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
  },
  {
    number: 3,
    title: "Secure & safe delivery",
    description:
      "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
  },
];

export function PuppyJourneySection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative bg-gradient-to-b from-[#EBBF82] to-[#E5B36E] py-16 sm:py-24">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Title + Interactive 3-Step Concierge */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#361D10] tracking-tight">
                Your puppy journey
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5C3A22] max-w-md leading-relaxed">
                A premium, step-by-step concierge experience. We make adoption
                simple, secure, and purely joyful.
              </p>
            </div>

            <div className="space-y-6">
              {JOURNEY_STEPS.map((step) => {
                const isActive = activeStep === step.number;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(step.number)}
                    className="w-full text-left flex items-start gap-4 group focus:outline-none"
                  >
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#9E4B1D] text-white shadow-sm"
                          : "bg-[#FAF0DC]/70 text-[#7A5437] border border-[#C69966] group-hover:bg-[#FAF0DC]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="transition-opacity">
                      <h3
                        className={`font-[family-name:var(--font-display)] text-xl sm:text-2xl font-black transition-colors ${
                          isActive ? "text-[#361D10]" : "text-[#6D472B]/80"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm leading-relaxed max-w-md ${
                          isActive ? "text-[#4A2B18]" : "text-[#6D472B]/75"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <Link href="/how-it-works" className="btn-outline-dark text-sm">
                How it works
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Interactive WhatsApp Phone Mockup */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 flex flex-col items-center">
            <div className="hidden lg:block self-start -mb-6 ml-6 z-10">
              <MascotPuppy pose="sitting" className="w-20 h-20" animateFloat />
            </div>
            <WhatsAppPhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

