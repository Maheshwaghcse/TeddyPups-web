"use client";

import { useState } from "react";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WayMode = "dubai" | "imported";

interface StepCardItem {
  step: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: "search-heart" | "heart" | "puppy" | "truck" | "chat" | "video" | "plane";
}

const DUBAI_STEPS: StepCardItem[] = [
  {
    step: "Step 1",
    title: "Explore our puppies",
    description:
      "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.",
    iconBg: "#FBE3B4",
    iconColor: "#A24A1A",
    icon: "search-heart",
  },
  {
    step: "Step 2",
    title: "Choose your puppy",
    description:
      "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.",
    iconBg: "#F9D8C9",
    iconColor: "#A24A1A",
    icon: "heart",
  },
  {
    step: "Step 3",
    title: "Meet before you choose",
    description: "Spend time bonding before making your decision.",
    iconBg: "#DCEAF7",
    iconColor: "#2C5E8A",
    icon: "puppy",
  },
  {
    step: "Step 4",
    title: "Pick-up or delivery",
    description:
      "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.",
    iconBg: "#DFEFD7",
    iconColor: "#2E6F40",
    icon: "truck",
  },
];

const IMPORTED_STEPS: StepCardItem[] = [
  {
    step: "Step 1",
    title: "Tell us your dream puppy",
    description:
      "Share your preferred breed, size, gender, or color with our team on WhatsApp or through our enquiry form.",
    iconBg: "#FBE3B4",
    iconColor: "#A24A1A",
    icon: "chat",
  },
  {
    step: "Step 2",
    title: "Photos, videos & vet check",
    description:
      "We send recent photos, live videos, and full veterinary health and vaccination details before you make your decision.",
    iconBg: "#F9D8C9",
    iconColor: "#A24A1A",
    icon: "video",
  },
  {
    step: "Step 3",
    title: "Flight & export preparation",
    description:
      "We handle all export permits, microchipping, health certificates, and climate-controlled flight arrangements.",
    iconBg: "#DCEAF7",
    iconColor: "#2C5E8A",
    icon: "plane",
  },
  {
    step: "Step 4",
    title: "Safe arrival in Dubai",
    description:
      "Your puppy lands safely in Dubai and is delivered comfortably to your doorstep or ready for collection.",
    iconBg: "#DFEFD7",
    iconColor: "#2E6F40",
    icon: "truck",
  },
];

function StepIcon({
  type,
  color,
}: {
  type: StepCardItem["icon"];
  color: string;
}) {
  switch (type) {
    case "search-heart":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.2" y2="16.2" />
          <path d="M11 13.5s-2.5-1.6-2.5-3.1c0-.8.6-1.4 1.4-1.4.5 0 .9.3 1.1.7.2-.4.6-.7 1.1-.7.8 0 1.4.6 1.4 1.4 0 1.5-2.5 3.1-2.5 3.1z" />
        </svg>
      );
    case "heart":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20.5s-7-4.35-7-9.6A4.15 4.15 0 0 1 9.2 6.7c1.25 0 2.25.6 2.8 1.55.55-.95 1.55-1.55 2.8-1.55A4.15 4.15 0 0 1 19 10.9c0 5.25-7 9.6-7 9.6z" />
        </svg>
      );
    case "puppy":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9c-1.8 0-3 1.5-3 3.5S4.2 16 6 15" />
          <path d="M18 9c1.8 0 3 1.5 3 3.5S19.8 16 18 15" />
          <circle cx="12" cy="13" r="6" />
          <circle cx="9.8" cy="12" r="0.8" fill={color} />
          <circle cx="14.2" cy="12" r="0.8" fill={color} />
          <path d="M10.8 14.5c.7.6 1.7.6 2.4 0" />
        </svg>
      );
    case "truck":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="12" height="9" rx="1.5" />
          <path d="M14 10h4l3 3v3h-7v-6z" />
          <circle cx="6.5" cy="17.5" r="1.8" />
          <circle cx="17.5" cy="17.5" r="1.8" />
        </svg>
      );
    case "chat":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6.5A8 8 0 1 1 21 12z" />
        </svg>
      );
    case "video":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2.5" y="6" width="13" height="12" rx="2" />
          <path d="m15.5 10 5-3v10l-5-3v-4z" />
        </svg>
      );
    case "plane":
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      );
  }
}

export default function HowItWorksPage() {
  const [mode, setMode] = useState<WayMode>("dubai");
  const activeSteps = mode === "dubai" ? DUBAI_STEPS : IMPORTED_STEPS;

  return (
    <div
      className="relative overflow-hidden text-[#2a170e]"
      style={{
        background:
          "linear-gradient(180deg, #FFFDF8 0%, #FFF4DE 24%, #FCE5B8 58%, #F6CC84 85%, #F2BE6B 100%)",
      }}
    >
      {/* =================================================================
          HERO & NUMBERED ANCHOR PILLS
          ================================================================= */}
      <section className="gutter max-w-[1280px] mx-auto pt-12 sm:pt-16 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-plush text-[clamp(3.4rem,8vw,6.8rem)] text-[#2a170e] leading-[0.92]">
              How it works
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#5a3a28] text-base sm:text-[1.15rem] leading-[1.6] max-w-md lg:ml-auto">
              Whether you choose to visit us locally or order a premium breed
              from overseas, TeddyPups is here to make the experience
              unforgettable.
            </p>
          </div>
        </div>

        {/* 4 Anchor Pills */}
        <nav
          aria-label="Page sections"
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-8 sm:mt-10"
        >
          {[
            { num: "1", label: "Two ways home", href: "#two-ways" },
            { num: "2", label: "Our premium puppy promise", href: "#promise" },
            {
              num: "3",
              label: "Delivery & collection",
              href: "#delivery-collection",
            },
            { num: "4", label: "Why choose us", href: "#why-choose-us" },
          ].map((pill) => (
            <a
              key={pill.num}
              href={pill.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fffdf8] border-[1.75px] border-[#2a170e] text-xs sm:text-sm font-semibold text-[#2a170e] shadow-[0_2px_0_#2a170e] hover:-translate-y-0.5 hover:bg-[#fff8ea] transition-transform"
            >
              <span className="font-scrawl text-[#a24a1a] font-bold">
                {pill.num}
              </span>
              <span>{pill.label}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* =================================================================
          SECTION 1: TWO WAYS HOME
          ================================================================= */}
      <section
        id="two-ways"
        className="gutter max-w-[1280px] mx-auto pt-8 sm:pt-12 pb-16 sm:pb-24 scroll-mt-24"
      >
        {/* Top Row: Title + Segmented Toggle + Sitting Puppy Mascot */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="font-scrawl text-[#a24a1a] text-lg sm:text-xl mb-1">
              choose your way
            </p>
            <h2 className="font-plush text-[clamp(2.25rem,4.6vw,3.85rem)] text-[#2a170e]">
              Two ways home
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 self-start lg:self-auto">
            {/* Pill Toggle */}
            <div
              role="tablist"
              aria-label="Adoption method"
              className="inline-grid grid-cols-2 p-1.5 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] shadow-[0_5px_0_#2a170e]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === "dubai"}
                onClick={() => setMode("dubai")}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-center transition-all ${mode === "dubai"
                    ? "bg-[#a24a1a] text-[#fffdf8] shadow-sm"
                    : "bg-transparent text-[#2a170e] hover:bg-[#fff1d8]"
                  }`}
              >
                <span className="block font-plush-text font-bold text-base sm:text-lg leading-tight">
                  In Dubai
                </span>
                <span
                  className={`block text-[11px] sm:text-xs leading-tight mt-0.5 ${mode === "dubai" ? "text-[#fbe3b4]" : "text-[#5a3a28]"
                    }`}
                >
                  meet in person
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={mode === "imported"}
                onClick={() => setMode("imported")}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-center transition-all ${mode === "imported"
                    ? "bg-[#a24a1a] text-[#fffdf8] shadow-sm"
                    : "bg-transparent text-[#2a170e] hover:bg-[#fff1d8]"
                  }`}
              >
                <span className="block font-plush-text font-bold text-base sm:text-lg leading-tight">
                  Imported
                </span>
                <span
                  className={`block text-[11px] sm:text-xs leading-tight mt-0.5 ${mode === "imported" ? "text-[#fbe3b4]" : "text-[#5a3a28]"
                    }`}
                >
                  order upon request
                </span>
              </button>
            </div>

            {/* Sitting TeddyPup Mascot SVG */}
            <svg
              className="hidden sm:block w-20 h-20 shrink-0 tp-mascot-breathe"
              viewBox="0 0 120 115"
              fill="none"
              aria-hidden="true"
            >
              {/* Soft ground shadow */}
              <ellipse
                cx="60"
                cy="104"
                rx="38"
                ry="6"
                fill="#2a170e"
                fillOpacity="0.12"
              />
              {/* Tail */}
              <path
                d="M28 76c-9-3-13-12-8-18 4-5 12-2 14 4"
                fill="#E4A85B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Body */}
              <path
                d="M34 65c-4 10-4 24 2 32h38c5-7 5-22-2-32-7-9-31-9-38 0Z"
                fill="#E4A85B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Front & Back Paws */}
              <ellipse
                cx="36"
                cy="96"
                rx="9"
                ry="5.5"
                fill="#F2C57C"
                stroke="#2A170E"
                strokeWidth="3"
              />
              <ellipse
                cx="54"
                cy="98"
                rx="7.5"
                ry="5"
                fill="#F2C57C"
                stroke="#2A170E"
                strokeWidth="3"
              />
              <ellipse
                cx="70"
                cy="98"
                rx="7.5"
                ry="5"
                fill="#F2C57C"
                stroke="#2A170E"
                strokeWidth="3"
              />
              {/* Red Collar */}
              <path
                d="M46 62c8 4 20 4 28 0"
                stroke="#C84B31"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle
                cx="61"
                cy="66"
                r="3.5"
                fill="#F2BE6B"
                stroke="#2A170E"
                strokeWidth="2"
              />
              {/* Left Ear */}
              <path
                d="M44 30c-9 2-14 14-10 24 3 7 10 7 13 1"
                fill="#C9823B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Right Ear */}
              <path
                d="M78 30c9 2 14 14 10 24-3 7-10 7-13 1"
                fill="#C9823B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Fluffy Head */}
              <path
                d="M44 34c-4-7 4-15 11-12 4-5 13-5 16 0 8-3 15 5 11 12 6 6 5 17-2 22-6 5-28 5-34 0-7-5-8-16-2-22Z"
                fill="#F2C57C"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Eyes */}
              <circle cx="54" cy="43" r="2.7" fill="#2A170E" />
              <circle cx="69" cy="43" r="2.7" fill="#2A170E" />
              <circle cx="53.2" cy="42" r="0.9" fill="#FFFDF8" />
              <circle cx="68.2" cy="42" r="0.9" fill="#FFFDF8" />
              {/* Nose & Smile */}
              <ellipse cx="61.5" cy="48.5" rx="3.2" ry="2.3" fill="#2A170E" />
              <path
                d="M58 52.5c1.8 2 5.2 2 7 0"
                stroke="#2A170E"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Middle Row: Description + Tilted Downtown Dubai Skyline Postcard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-14">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-plush text-[clamp(1.85rem,3.4vw,2.85rem)] text-[#2a170e]">
              {mode === "dubai"
                ? "Meet your puppy in person"
                : "Imported from trusted breeders"}
            </h3>
            <p className="text-[#5a3a28] text-base sm:text-[1.08rem] leading-[1.65] max-w-xl">
              {mode === "dubai"
                ? "Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks."
                : "Looking for a specific breed, teacup size, or coat color from Korea? We work closely with ethical overseas breeders and share full photos, videos, and vet certificates before handling every detail of your puppy's safe flight to Dubai."}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div
              className="relative overflow-hidden rounded-[22px] border-2 border-[#2a170e] shadow-[0_7px_0_#2a170e] rotate-[1.1deg] aspect-[16/9] max-w-[560px] lg:ml-auto"
              style={{
                background:
                  "linear-gradient(135deg, #FFF7E4 0%, #FDE6B6 55%, #F7CE82 100%)",
              }}
            >
              {/* Top-left handwritten caption */}
              <span className="absolute top-5 left-6 font-scrawl text-[#a24a1a] text-sm sm:text-base z-10">
                {mode === "dubai" ? "Downtown Dubai" : "Seoul to Dubai"}
              </span>

              {/* Warm Golden Sun */}
              <div
                className="absolute right-[16%] top-[20%] w-20 h-20 sm:w-24 sm:h-24 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, #F2BE6B 0%, #F2BE6B 68%, rgba(242,190,107,0.25) 100%)",
                }}
              />

              {/* Architectural Line Art Skyline SVG */}
              <svg
                className="absolute inset-x-0 bottom-0 w-full h-[78%]"
                viewBox="0 0 560 220"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Left buildings */}
                <rect
                  x="38"
                  y="128"
                  width="32"
                  height="92"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                />
                <rect
                  x="70"
                  y="98"
                  width="34"
                  height="122"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                />
                <rect
                  x="118"
                  y="144"
                  width="28"
                  height="76"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                />
                {/* Mid-left tower */}
                <path
                  d="M208 220V136h26v84"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                />
                {/* Burj Khalifa centerpiece */}
                <path
                  d="M276 220V116h8V78h7V42h5V16h3v26h5v36h7v38h8v104"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Right towers */}
                <rect
                  x="358"
                  y="108"
                  width="34"
                  height="112"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                />
                <line
                  x1="375"
                  y1="108"
                  x2="375"
                  y2="220"
                  stroke="#5A3A28"
                  strokeWidth="3"
                />
                <rect
                  x="412"
                  y="152"
                  width="32"
                  height="68"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                />
                <rect
                  x="462"
                  y="122"
                  width="36"
                  height="98"
                  stroke="#5A3A28"
                  strokeWidth="3.5"
                />
                <line
                  x1="474"
                  y1="122"
                  x2="474"
                  y2="220"
                  stroke="#5A3A28"
                  strokeWidth="2.5"
                />
                <line
                  x1="486"
                  y1="122"
                  x2="486"
                  y2="220"
                  stroke="#5A3A28"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Row: 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {activeSteps.map((item) => (
            <div
              key={item.step}
              className="rounded-[20px] bg-[#fffdf8] border-2 border-[#2a170e] p-6 sm:p-7 shadow-[0_6px_0_#2a170e] flex flex-col justify-start transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: item.iconBg }}
              >
                <StepIcon type={item.icon} color={item.iconColor} />
              </div>

              <span className="font-scrawl text-[#a24a1a] text-sm font-semibold mb-1">
                {item.step}
              </span>

              <h4 className="font-plush-text font-bold text-xl text-[#2a170e] mb-2.5 leading-snug">
                {item.title}
              </h4>

              <p className="text-[#5a3a28] text-sm sm:text-[0.94rem] leading-[1.6]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================
          SECTION 2: OUR PREMIUM PUPPY PROMISE (Passport Card)
          ================================================================= */}
      <section
        id="promise"
        className="gutter max-w-[1280px] mx-auto pb-20 sm:pb-28 scroll-mt-24"
      >
        <div className="passport-paper-bg rounded-[26px] border-2 border-[#2a170e] shadow-[0_7px_0_#2a170e] p-7 sm:p-12 lg:p-14 -rotate-[0.35deg]">
          <div className="max-w-xl mb-10 sm:mb-12">
            <p className="font-scrawl text-[#a24a1a] text-lg sm:text-xl mb-1.5">
              puppy passport
            </p>
            <h2 className="font-plush text-[clamp(2.35rem,4.8vw,4.1rem)] text-[#2a170e] leading-[0.94]">
              Our premium
              <span className="block">puppy promise</span>
            </h2>
          </div>

          {/* 3 Rubber Stamps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 items-start pt-2">
            {/* Stamp 1: Circular Terracotta Stamp */}
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-[#b55826]/70 p-1.5 -rotate-[6deg] flex items-center justify-center mb-5 bg-[#fff8ea]/60">
                <div className="w-full h-full rounded-full border-[1.5px] border-dashed border-[#b55826]/65 flex flex-col items-center justify-center px-4 text-[#a24a1a]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-1.5"
                  >
                    <path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
                    <path d="M8 12h2l1.5-2.5L13 14l1.5-2H16" />
                  </svg>
                  <span className="font-plush-text font-bold text-xs sm:text-[13px] leading-tight">
                    Hand-selected
                    <br />
                    breeders
                  </span>
                </div>
              </div>
              <p className="text-[#5a3a28] text-xs sm:text-sm leading-relaxed max-w-[240px]">
                We work only with breeders who uphold the highest ethical and
                health standards.
              </p>
            </div>

            {/* Stamp 2: Rectangular Green Passport Stamp */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-28 sm:w-44 sm:h-32 rounded-xl border-2 border-[#1f7a4d]/75 p-1.5 rotate-[4deg] flex items-center justify-center mb-5 bg-[#fff8ea]/60 mt-2 sm:mt-4">
                <div className="w-full h-full rounded-lg border-[1.5px] border-dashed border-[#1f7a4d]/65 flex flex-col items-center justify-center px-3 text-[#1f7a4d]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-1"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                  <span className="font-plush-text font-bold text-xs sm:text-[13px] leading-tight">
                    Full
                    <br />
                    transparency
                  </span>
                </div>
              </div>
              <p className="text-[#5a3a28] text-xs sm:text-sm leading-relaxed max-w-[250px]">
                Photos, videos, and health certificates are shared before your
                puppy travels.
              </p>
            </div>

            {/* Stamp 3: Oval Cocoa Stamp */}
            <div className="flex flex-col items-center text-center">
              <div className="w-44 h-32 sm:w-48 sm:h-34 rounded-[50%] border-2 border-[#6e4730]/75 p-1.5 -rotate-[5deg] flex items-center justify-center mb-5 bg-[#fff8ea]/60 mt-1 sm:mt-2">
                <div className="w-full h-full rounded-[50%] border-[1.5px] border-dashed border-[#6e4730]/65 flex flex-col items-center justify-center px-4 text-[#5a3a28]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-1"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <circle cx="9" cy="10" r="0.8" fill="currentColor" />
                    <circle cx="12" cy="10" r="0.8" fill="currentColor" />
                    <circle cx="15" cy="10" r="0.8" fill="currentColor" />
                  </svg>
                  <span className="font-plush-text font-bold text-xs sm:text-[13px] leading-tight">
                    Safe, stress-
                    <br />
                    free delivery
                  </span>
                </div>
              </div>
              <p className="text-[#5a3a28] text-xs sm:text-sm leading-relaxed max-w-[260px]">
                We handle every detail of the import process, so your puppy
                arrives happy, healthy, and ready to love you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 3: DELIVERY & COLLECTION
          ================================================================= */}
      <section
        id="delivery-collection"
        className="gutter max-w-[1280px] mx-auto pb-20 sm:pb-28 scroll-mt-24"
      >
        <div id="delivery" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading + 2x2 Feature Grid */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-plush text-[clamp(2.6rem,5.2vw,4.4rem)] text-[#2a170e] leading-[0.92]">
                Delivery &amp;
                <span className="block">collection</span>
              </h2>
              <p className="text-[#5a3a28] text-base sm:text-[1.1rem] leading-[1.6] max-w-lg">
                From a same-day visit in Downtown Dubai to a flight from Korea,
                every puppy travels comfortably and arrives safely.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 pt-2">
              <div>
                <h3 className="font-plush-text font-bold text-lg text-[#2a170e] mb-2 leading-snug">
                  Take your puppy home the same day
                </h3>
                <p className="text-[#5a3a28] text-sm leading-[1.65]">
                  Local puppies are available immediately — visit, fall in love,
                  and go home together.
                </p>
              </div>

              <div>
                <h3 className="font-plush-text font-bold text-lg text-[#2a170e] mb-2 leading-snug">
                  Delivery within Dubai
                </h3>
                <p className="text-[#5a3a28] text-sm leading-[1.65]">
                  Prefer to stay home? We deliver your puppy to your door within
                  Dubai, safely and comfortably.
                </p>
              </div>

              <div>
                <h3 className="font-plush-text font-bold text-lg text-[#2a170e] mb-2 leading-snug">
                  Safe international cargo
                </h3>
                <p className="text-[#5a3a28] text-sm leading-[1.65]">
                  We handle all the paperwork and ensure comfortable travel so
                  your puppy arrives happy and stress-free.
                </p>
              </div>

              <div>
                <h3 className="font-plush-text font-bold text-lg text-[#2a170e] mb-2 leading-snug">
                  Worldwide delivery
                </h3>
                <p className="text-[#5a3a28] text-sm leading-[1.65]">
                  We safely deliver puppies to loving homes all around the
                  world. Our trusted international cargo partners ensure your
                  new furry friend travels comfortably and arrives safely, no
                  matter the distance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Korea -> Dubai Flight Path & Skyline Illustration */}
          <div className="lg:col-span-6">
            <div className="relative w-full max-w-[580px] mx-auto lg:ml-auto pt-6">
              <svg
                viewBox="0 0 580 340"
                fill="none"
                className="w-full h-auto overflow-visible"
                aria-label="Flight route from Korea to Dubai"
              >
                {/* Faint Skyline Silhouette along bottom baseline */}
                <g stroke="#B88E5A" strokeWidth="3" strokeOpacity="0.45">
                  <line x1="20" y1="300" x2="560" y2="300" />
                  <rect x="64" y="220" width="32" height="80" />
                  <rect x="96" y="192" width="34" height="108" />
                  <rect x="144" y="240" width="28" height="60" />
                  <rect x="228" y="228" width="28" height="72" />
                  {/* Burj Khalifa */}
                  <path d="M294 300v-96h8v-38h7v-34h5v-26h3v26h5v34h7v38h8v96" />
                  <rect x="378" y="200" width="34" height="100" />
                  <line x1="395" y1="200" x2="395" y2="300" />
                  <rect x="430" y="246" width="30" height="54" />
                  <rect x="478" y="216" width="36" height="84" />
                </g>

                {/* Curved Dashed Flight Arc */}
                <path
                  d="M42 260 C 155 110, 415 110, 534 238"
                  stroke="#A24A1A"
                  strokeWidth="2.8"
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                />

                {/* Korea Origin Point + Label */}
                <circle cx="42" cy="260" r="4.5" fill="#A24A1A" />
                <text
                  x="42"
                  y="285"
                  textAnchor="middle"
                  fill="#5A3A28"
                  className="font-scrawl text-[15px]"
                >
                  Korea
                </text>

                {/* Dubai Destination Point + Label */}
                <circle cx="534" cy="238" r="4.5" fill="#A24A1A" />
                <text
                  x="534"
                  y="264"
                  textAnchor="middle"
                  fill="#5A3A28"
                  className="font-scrawl text-[15px]"
                >
                  Dubai
                </text>

                {/* Illustrated Airplane */}
                <g className="tp-plane-bob" style={{ transformOrigin: "235px 135px" }}>
                  {/* Top Wing */}
                  <path
                    d="M210 126 L176 98 L198 92 L242 116 Z"
                    fill="#C2622B"
                    stroke="#2A170E"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Tail Fin */}
                  <path
                    d="M164 134 L144 114 L162 110 L180 126 Z"
                    fill="#C2622B"
                    stroke="#2A170E"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Fuselage Body */}
                  <path
                    d="M158 140 C154 130, 168 118, 192 112 L272 92 C292 87, 306 95, 306 105 C306 116, 292 126, 270 132 L182 150 C168 153, 160 147, 158 140 Z"
                    fill="#FFFDF8"
                    stroke="#2A170E"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  {/* Bottom Wing */}
                  <path
                    d="M226 134 L252 174 L274 166 L258 126 Z"
                    fill="#C2622B"
                    stroke="#2A170E"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 4: WHY CHOOSE US
          ================================================================= */}
      <section
        id="why-choose-us"
        className="gutter max-w-[1280px] mx-auto pb-20 sm:pb-24 scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-plush text-[clamp(2.6rem,5.2vw,4.4rem)] text-[#2a170e] leading-[0.92]">
              Why
              <span className="block">choose us</span>
            </h2>
            <p className="text-[#5a3a28] text-base sm:text-[1.06rem] leading-[1.68] max-w-md">
              We&apos;re here to help you find a new family member. From the
              moment you visit our site to the joyful day your puppy arrives at
              your door, we&apos;re with you every step of the way. Our mission
              is to make the entire adoption process smooth, transparent, and
              full of love.
            </p>
          </div>

          {/* Right Column: 3 Stacked Trust Pillars */}
          <div className="lg:col-span-7 space-y-8">
            {/* Item 1: International cargo */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center text-[#a24a1a] mt-0.5">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-plush-text font-bold text-xl sm:text-[1.35rem] text-[#2a170e] mb-1.5">
                  International cargo
                </h3>
                <p className="text-[#5a3a28] text-sm sm:text-[0.96rem] leading-[1.65]">
                  We safely deliver puppies to loving homes all around the
                  world. Our trusted international cargo partners ensure your
                  new furry friend travels comfortably and arrives safely, no
                  matter the distance.
                </p>
              </div>
            </div>

            {/* Item 2: Support 24/7 */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center text-[#a24a1a] mt-0.5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="8.5" cy="10" r="1" fill="currentColor" />
                  <circle cx="12" cy="10" r="1" fill="currentColor" />
                  <circle cx="15.5" cy="10" r="1" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="font-plush-text font-bold text-xl sm:text-[1.35rem] text-[#2a170e] mb-1.5">
                  Support 24/7
                </h3>
                <p className="text-[#5a3a28] text-sm sm:text-[0.96rem] leading-[1.65]">
                  Our team is available 24/7 to answer your questions and assist
                  you through every step of the adoption process. From choosing
                  your puppy to post-delivery support — we&apos;re just a
                  message away.
                </p>
              </div>
            </div>

            {/* Item 3: Health guarantee */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center text-[#a24a1a] mt-0.5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
                  <path d="M8 12h2l1.5-2.5L13 14l1.5-2H16" />
                </svg>
              </div>
              <div>
                <h3 className="font-plush-text font-bold text-xl sm:text-[1.35rem] text-[#2a170e] mb-1.5">
                  Health guarantee
                </h3>
                <p className="text-[#5a3a28] text-sm sm:text-[0.96rem] leading-[1.65]">
                  All our puppies come with a verified health certificate from
                  licensed vets. We ensure every puppy is vaccinated, dewormed,
                  and thoroughly checked before joining your family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SECTION 5: BOTTOM CTA CARD ("Unique and high quality puppies")
          ================================================================= */}
      <section className="gutter max-w-[1280px] mx-auto pb-24 sm:pb-32">
        <div className="rounded-[24px] bg-[#fffdf8] border-2 border-[#2a170e] shadow-[0_7px_0_#2a170e] p-8 sm:p-12 lg:px-14 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <h2 className="font-plush text-[clamp(2rem,3.8vw,3.2rem)] text-[#2a170e] leading-[0.98]">
              Unique and high quality puppies
            </h2>
            <p className="text-[#5a3a28] text-base sm:text-[1.06rem] leading-[1.65] max-w-2xl">
              When you choose TeddyPups, you can trust that you&apos;re getting
              a puppy of the highest quality. We also provide guidance and
              support to new pet owners, offering advice on training, nutrition,
              and general care to ensure a smooth transition for you and your
              new furry friend.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={buildWhatsAppUrl(
                  "Hi TeddyPups! I'd love to learn more about your available puppies."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm sm:text-base"
              >
                Ask us on WhatsApp
              </a>
              <Link
                href="/puppies"
                className="btn-outline-dark text-sm sm:text-base"
              >
                See available puppies
              </Link>
            </div>
          </div>

          {/* Playful Running TeddyPup Illustration */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <svg
              className="w-40 h-36 sm:w-44 sm:h-40 tp-mascot-breathe"
              viewBox="0 0 160 135"
              fill="none"
              aria-hidden="true"
            >
              {/* Soft ground shadow */}
              <ellipse
                cx="86"
                cy="120"
                rx="48"
                ry="6.5"
                fill="#2A170E"
                fillOpacity="0.1"
              />
              {/* Fluffy Pom Tail */}
              <path
                d="M118 66c6-9 18-8 20 2 3 9-6 16-15 12"
                fill="#F2C57C"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Back Legs */}
              <path
                d="M104 92l12 16c3 4-3 9-7 5l-13-13"
                fill="#D99548"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M114 86l16 12c4 3 0 9-5 6l-16-10"
                fill="#E4A85B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Body */}
              <path
                d="M58 72c16-8 46-6 58 6 7 8 4 20-8 22-18 3-40 2-52-5-8-5-6-18 2-23Z"
                fill="#E4A85B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Front Legs */}
              <path
                d="M54 90l-12 14c-4 4 2 10 6 6l14-14"
                fill="#D99548"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M66 94l-6 16c-2 5 5 8 8 3l7-16"
                fill="#F2C57C"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Collar */}
              <path
                d="M52 68c5 7 15 11 24 8"
                stroke="#C84B31"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Left Ear */}
              <path
                d="M36 38c-10 3-15 15-10 25 3 6 10 6 13 0"
                fill="#C9823B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Right Ear */}
              <path
                d="M72 38c10 3 15 15 10 25-3 6-10 6-13 0"
                fill="#C9823B"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Fluffy Head */}
              <path
                d="M36 42c-4-8 4-16 12-13 4-5 13-5 17 0 8-3 15 5 11 13 6 6 5 18-2 23-7 5-30 5-36 0-7-5-8-17-2-23Z"
                fill="#F2C57C"
                stroke="#2A170E"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Eyes */}
              <circle cx="46" cy="51" r="2.7" fill="#2A170E" />
              <circle cx="62" cy="51" r="2.7" fill="#2A170E" />
              <circle cx="45.2" cy="50" r="0.9" fill="#FFFDF8" />
              <circle cx="61.2" cy="50" r="0.9" fill="#FFFDF8" />
              {/* Nose & Smile */}
              <ellipse cx="54" cy="56.5" rx="3.2" ry="2.3" fill="#2A170E" />
              <path
                d="M50.5 60.5c1.8 2 5.2 2 7 0"
                stroke="#2A170E"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* =================================================================
          WAVY NIGHT-SKY TRANSITION INTO FOOTER
          ================================================================= */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            fill="#2f1a10"
            d="M0,28 C320,68 640,-6 980,28 C1210,50 1350,22 1440,12 L1440,64 L0,64 Z"
          />
        </svg>
      </div>
    </div>
  );
}