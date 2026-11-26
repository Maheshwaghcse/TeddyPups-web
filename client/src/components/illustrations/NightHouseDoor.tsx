"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MascotPuppy } from "./MascotPuppy";

/** Warmly lit timber house doorway that swings open on scroll/hover to welcome you inside. */
export function NightHouseDoor() {
  const ref = useRef<HTMLDivElement>(null);
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDoorOpen(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setDoorOpen(true)}
      className="relative mx-auto w-[min(100%,44rem)] h-[clamp(21rem,44vh,28rem)] mt-[clamp(2.5rem,6vh,4rem)]"
    >
      {/* Timber House Facade */}
      <div
        className="absolute inset-x-[6%] top-0 bottom-[2.2rem] rounded-t-[1.4rem] border-[3px] border-b-0 border-[#2a170e]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 30px, rgba(0,0,0,0.14) 30px 32px), linear-gradient(#5c3622, #4a2a19)",
        }}
        aria-hidden="true"
      />

      {/* Porch Step */}
      <div
        className="absolute inset-x-0 bottom-0 h-[2.4rem] rounded-t-[0.6rem] border-[3px] border-[#2a170e] bg-[#3a2114]"
        aria-hidden="true"
      />

      {/* Left Potted Shrub */}
      <div
        className="hidden sm:block absolute bottom-[2.2rem] left-[calc(50%-clamp(9.5rem,16vw,12.5rem))] w-[clamp(3.4rem,6vw,4.6rem)] aspect-[1/1.5]"
        style={{
          background:
            "radial-gradient(ellipse 34% 30% at 30% 30%, #5f8f4a 96%, transparent 100%), radial-gradient(ellipse 34% 30% at 70% 26%, #6fa356 96%, transparent 100%), radial-gradient(ellipse 30% 34% at 50% 14%, #7bb060 96%, transparent 100%), linear-gradient(transparent 52%, #c2622b 52%)",
          clipPath: "polygon(0 0, 100% 0, 100% 52%, 88% 100%, 12% 100%, 0 52%)",
        }}
        aria-hidden="true"
      />

      {/* Right Potted Shrub */}
      <div
        className="hidden sm:block absolute bottom-[2.2rem] right-[calc(50%-clamp(9.5rem,16vw,12.5rem))] w-[clamp(3.4rem,6vw,4.6rem)] aspect-[1/1.5]"
        style={{
          background:
            "radial-gradient(ellipse 34% 30% at 30% 30%, #5f8f4a 96%, transparent 100%), radial-gradient(ellipse 34% 30% at 70% 26%, #6fa356 96%, transparent 100%), radial-gradient(ellipse 30% 34% at 50% 14%, #7bb060 96%, transparent 100%), linear-gradient(transparent 52%, #c2622b 52%)",
          clipPath: "polygon(0 0, 100% 0, 100% 52%, 88% 100%, 12% 100%, 0 52%)",
        }}
        aria-hidden="true"
      />

      {/* Glowing Porch Lantern */}
      <div
        className="absolute bottom-[calc(2.2rem+clamp(8.5rem,15vw,11.5rem))] left-[calc(50%+clamp(6.5rem,11vw,8.5rem))] w-[1.9rem] h-[2.6rem] rounded-[0.5rem_0.5rem_1rem_1rem] border-[3px] border-[#2a170e] bg-[#ffd27f] shadow-[0_0_46px_22px_rgba(255,205,110,0.4)]"
        aria-hidden="true"
      />

      {/* Arched Doorway with Warm Glowing Interior & Swinging Door */}
      <div
        className="absolute bottom-[2.2rem] left-1/2 -translate-x-1/2 w-[clamp(8.5rem,15vw,11.5rem)] aspect-[1/1.62] rounded-t-[999px] border-[3px] border-b-0 border-[#2a170e] shadow-[0_0_0_7px_#b2733f,0_0_0_10px_#2a170e,0_0_60px_18px_rgba(255,205,120,0.35)] z-10"
        style={{ perspective: "1000px", perspectiveOrigin: "0px center" }}
      >
        {/* Warm Interior + Puppy waiting inside */}
        <div
          className="absolute inset-0 rounded-t-[999px] overflow-hidden"
          style={{
            background: "radial-gradient(circle at 50% 70%, #ffe4a8, #e9a95a)",
          }}
        >
          <Image
            src="/images/puppies/maltipoo-cream.svg"
            alt="Puppy waiting inside"
            fill
            className="object-cover"
          />
        </div>

        {/* Swinging Wooden Door Panel */}
        <div
          className="absolute -inset-[3px] bottom-0 rounded-t-[999px] border-[3px] border-b-0 border-[#2a170e] origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(0.3,1.25,0.5,1)] delay-200"
          style={{
            backgroundColor: "#a24a1a",
            backgroundImage:
              "linear-gradient(90deg, transparent calc(50% - 1.5px), rgba(42,23,14,0.35) calc(50% - 1.5px) calc(50% + 1.5px), transparent calc(50% + 1.5px))",
            transform: doorOpen ? "rotateY(-102deg)" : "rotateY(0deg)",
          }}
          aria-hidden="true"
        >
          {/* Peephole Window */}
          <span className="absolute top-[14%] left-1/2 -translate-x-1/2 w-[34%] aspect-square rounded-full border-[3px] border-[#2a170e] bg-[#ffd98f]" />
          {/* Brass Doorknob */}
          <span className="absolute top-[58%] right-[12%] w-3.5 h-3.5 rounded-full border-[2.5px] border-[#2a170e] bg-[#f2be6b]" />
        </div>
      </div>

      {/* Welcome Home Mat */}
      <div
        className="absolute bottom-[0.25rem] left-1/2 -translate-x-1/2 z-20 w-[clamp(10rem,16vw,13rem)] h-[1.9rem] rounded-[0.45rem] border-[3px] border-[#2a170e] font-scrawl text-[0.95rem] leading-[1.55rem] text-[#2a170e] text-center"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #f2be6b 0 0.6rem, #e7a957 0.6rem 1.2rem)",
        }}
      >
        welcome home
      </div>

      {/* Single Greeting Mascot Puppy beside Porch */}
      <div className="absolute bottom-[0.4rem] left-0 sm:left-[calc(50%-clamp(15rem,24vw,19rem))] z-20 pointer-events-none">
        <MascotPuppy pose="walking" className="w-28 h-24 sm:w-36 sm:h-32" animateFloat />
      </div>
    </div>
  );
}
