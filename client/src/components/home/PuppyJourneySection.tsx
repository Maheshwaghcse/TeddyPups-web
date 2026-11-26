"use client";

import { useEffect, useRef, useState } from "react";
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
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const num = Number(entry.target.getAttribute("data-step"));
            if (num) setActiveStep(num);
          }
        });
      },
      { rootMargin: "-38% 0px -42% 0px", threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#f7d18d] to-[#f0b866] py-[clamp(4.5rem,10vh,7rem)]">
      <div className="gutter max-w-[110rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[clamp(3rem,8vw,9rem)] items-start">
          {/* Left Column: Title + Scroll/Click-Activated 3-Step Concierge */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="font-plush text-huge text-[#2a170e]">
                Your puppy journey
              </h2>
              <p className="text-lede mt-5 text-[#5a3a28] max-w-[42ch]">
                A premium, step-by-step concierge experience. We make adoption
                simple, secure, and purely joyful.
              </p>
            </div>

            <div className="space-y-4 lg:space-y-0 mt-10">
              {JOURNEY_STEPS.map((step, index) => {
                const isActive = activeStep === step.number;
                const isDone = activeStep > step.number;
                return (
                  <button
                    key={step.number}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    data-step={step.number}
                    type="button"
                    onClick={() => setActiveStep(step.number)}
                    className={`w-full text-left flex items-start gap-5 group focus:outline-none lg:min-h-[26vh] transition-opacity duration-500 ${
                      isActive || isDone ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <span
                      className={`w-[3.8rem] h-[3.8rem] rounded-full border-[3px] border-[#2a170e] flex items-center justify-center font-plush text-[1.9rem] leading-none shrink-0 transition-all duration-450 ease-[cubic-bezier(.34,1.56,.64,1)] ${
                        isActive
                          ? "bg-[#a24a1a] text-[#fffdf8] scale-110"
                          : "bg-[#fffdf8] text-[#2a170e] group-hover:bg-[#fbe3b4]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-plush text-[clamp(1.6rem,2.3vw,2.3rem)] leading-[1.05] text-[#2a170e]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[1rem] leading-relaxed max-w-[40ch] text-[#5a3a28]">
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <Link href="/how-it-works" className="btn-outline-dark">
                How it works
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Interactive Tilted WhatsApp Phone Mockup */}
          <div className="lg:col-span-6 lg:sticky lg:top-[calc(var(--header-h)+5vh)] flex flex-col items-center relative">
            <div className="hidden lg:block absolute -left-8 xl:-left-12 -bottom-4 z-10 pointer-events-none">
              <MascotPuppy pose="sitting" className="w-36 h-32" animateFloat />
            </div>
            <WhatsAppPhoneMockup activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
