"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Puppy } from "@/lib/types";

interface PuppyDetailClientProps {
  puppy: Puppy;
  related: Puppy[];
}

// All 15 real .webp puppy photos from your public/images/puppies folder
const PUPPY_WEBP_IMAGES = [
  "/images/puppies/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.webp",
  "/images/puppies/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.webp",
  "/images/puppies/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp",
  "/images/puppies/b942a5_6a5617708d75408b8f73725080ed0149-mv2.webp",
  "/images/puppies/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.webp",
  "/images/puppies/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.webp",
  "/images/puppies/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.webp",
  "/images/puppies/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.webp",
  "/images/puppies/b942a5_967bb346583b4146acb56607f5da5f21-mv2.webp",
  "/images/puppies/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.webp",
  "/images/puppies/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.webp",
  "/images/puppies/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.webp",
  "/images/puppies/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.webp",
  "/images/puppies/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.webp",
];

function getSeedIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % PUPPY_WEBP_IMAGES.length;
}

function resolveWebpImage(img: string | undefined, seed: string): string {
  if (img && !img.endsWith(".svg")) {
    return img;
  }
  return PUPPY_WEBP_IMAGES[getSeedIndex(seed)];
}

const WAY_HOME_STEPS = [
  {
    num: "1",
    title: "Reserve your puppy",
    desc: "Tell us which puppy has captured your heart.",
  },
  {
    num: "2",
    title: "Personalized consultation",
    desc: "We finalize details with you and share updates on your puppy's journey.",
  },
  {
    num: "3",
    title: "Import and arrival",
    desc: "We manage health checks, travel arrangements, and documentation.",
  },
  {
    num: "4",
    title: "Welcome home",
    desc: "We help your new puppy settle in and ensure a smooth transition into your home.",
  },
];

export function PuppyDetailClient({ puppy, related }: PuppyDetailClientProps) {
  // Build a 2-photo .webp gallery for this puppy so "1 / 2" and both thumbnails show real photos
  const gallery = useMemo(() => {
    const validRealImages = (puppy.images ?? []).filter(
      (img) => img && !img.endsWith(".svg")
    );
    if (validRealImages.length >= 2) {
      return validRealImages;
    }
    const baseIdx = getSeedIndex(puppy.slug || puppy._id || puppy.title);
    const first =
      validRealImages[0] ?? PUPPY_WEBP_IMAGES[baseIdx % PUPPY_WEBP_IMAGES.length];
    const second =
      PUPPY_WEBP_IMAGES[(baseIdx + 1) % PUPPY_WEBP_IMAGES.length];
    return [first, second];
  }, [puppy]);

  const [activeIndex, setActiveIndex] = useState(0);
  const displayName = puppy.title || puppy.name || puppy.breed;

  // Inquiry form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState(
    `Hi! I'd love to know more about ${displayName}.`
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const prevPup = related[0] ?? {
    slug: "shih-tzu-girl",
    title: "Shih Tzu",
    images: [PUPPY_WEBP_IMAGES[3]],
  };

  const nextPup =
    related[1] ??
    related[0] ?? {
      slug: "max",
      title: "Maltipoo",
      images: [PUPPY_WEBP_IMAGES[0]],
    };

  const prevPupImage = resolveWebpImage(
    prevPup.images?.[0],
    prevPup.slug || prevPup.title || "prev"
  );

  const nextPupImage = resolveWebpImage(
    nextPup.images?.[0],
    nextPup.slug || nextPup.title || "next"
  );

  function handlePrevImage() {
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }

  function handleNextImage() {
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  }

  async function handleEnquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          Emirate: area.trim() || undefined,
          inquiryType: "puppy-enquiry",
          puppyId: puppy._id,
          puppySlug: puppy.slug,
          preferredBreed: puppy.breed,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Could not send enquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const statusLabel =
    puppy.status === "available"
      ? "Available"
      : puppy.status === "reserved"
        ? "Reserved"
        : "Gone Home";

  const genderLabel =
    puppy.gender?.toLowerCase() === "boy"
      ? "Boy"
      : puppy.gender?.toLowerCase() === "girl"
        ? "Girl"
        : puppy.gender;

  const whereLabel =
    puppy.origin === "dubai" ? "In Dubai showroom" : "Imported for you";

  return (
    <div className="relative bg-[#F6EFE4] pt-8 pb-20 overflow-hidden">
      {/* Top-Left Terracotta Bookmark Ribbon */}
      <div
        className="hidden sm:block absolute top-0 left-3 w-3.5 h-9 bg-[#B55420]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Breadcrumb + Section 1 Header */}
        <div className="space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-[0.83rem] font-medium">
            <Link
              href="/puppies"
              className="text-[#A24A1A] underline decoration-dashed underline-offset-4 hover:text-[#7B3610]"
            >
              Available puppies
            </Link>
            <span className="text-[#8C735B]">/</span>
            <span className="text-[#4A3322]">{displayName}</span>
          </nav>

          {/* (1) hello, it's me */}
          <div className="relative flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full border-[1.6px] border-[#A24A1A] text-[#A24A1A] font-scrawl text-sm inline-flex items-center justify-center leading-none">
              1
            </span>
            <span className="font-scrawl text-xl text-[#A24A1A]">
              hello, it&apos;s me
            </span>

            {/* Subtle Watermark Paw */}
            <svg
              viewBox="0 0 64 64"
              className="w-4 h-4 text-[#E3D2BC] absolute left-[57%] top-1 rotate-12 pointer-events-none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </div>

          {/* Main 2-Column Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Triple-Stacked Photo Frame + Thumbnails */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative pr-2.5 pb-2.5">
                {/* Back Stacked Sheet 2 */}
                <div
                  className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[22px] border-[1.8px] border-[#2A170E] bg-[#FFFDF9]"
                  aria-hidden="true"
                />
                {/* Back Stacked Sheet 1 */}
                <div
                  className="absolute inset-0 translate-x-1.25 translate-y-1.25 rounded-[22px] border-[1.8px] border-[#2A170E] bg-[#FFFDF9]"
                  aria-hidden="true"
                />

                {/* Main Photo Container */}
                <div className="relative aspect-[4/4.3] w-full rounded-[22px] overflow-hidden border-2 border-[#2A170E] bg-[#EDE2D0]">
                  <Image
                    src={gallery[activeIndex]}
                    alt={`${displayName} photo ${activeIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Bottom Controls Overlay (<, 1/2, >) */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between z-10">
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                      className="w-9 h-9 rounded-full bg-[#FFFDF8] border-[1.5px] border-[#2A170E] flex items-center justify-center text-[#2A170E] hover:bg-[#F5E7CE] transition-colors cursor-pointer shadow-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="px-3 py-1 rounded-full bg-[#2A170E]/80 text-[#FFFDF8] text-xs font-bold tracking-wide backdrop-blur-xs">
                      {activeIndex + 1} / {gallery.length}
                    </span>

                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next image"
                      className="w-9 h-9 rounded-full bg-[#FFFDF8] border-[1.5px] border-[#2A170E] flex items-center justify-center text-[#2A170E] hover:bg-[#F5E7CE] transition-colors cursor-pointer shadow-xs"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 pt-1">
                {gallery.map((img, i) => {
                  const isSelected = activeIndex === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`relative w-20 h-20 rounded-[14px] overflow-hidden border-2 transition-all cursor-pointer ${isSelected
                        ? "border-[#B55420] shadow-xs"
                        : "border-[#D6C3AA] opacity-80 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={img}
                        alt={`${displayName} thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Info Tag Card + Card (2) What Comes With This Pup */}
            <div className="lg:col-span-5 space-y-7 lg:mt-6">
              {/* CARD 1: Main Puppy Tag Card */}
              <div className="relative rounded-[24px] bg-[#FFFEFA] border-2 border-[#2A170E] p-2 shadow-[0_4px_0_rgba(42,23,14,0.08)]">
                {/* Top-Left Brass Rivet Circle */}
                <span
                  className="absolute -top-3.5 left-5 w-7 h-7 rounded-full bg-[#F5DEAF] border-2 border-[#2A170E] flex items-center justify-center z-20"
                  aria-hidden="true"
                >
                  <span className="w-3 h-[2px] bg-[#2A170E] rounded-full" />
                </span>

                {/* Top-Right Peeking Teddy Puppy SVG */}
                <svg
                  viewBox="0 0 90 64"
                  className="w-16 h-12 absolute -top-9 right-6 z-20 pointer-events-none"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Floppy Ears */}
                  <path
                    d="M22 26 C12 28, 11 44, 19 48 C24 50, 27 44, 26 36"
                    fill="#C98A4B"
                    stroke="#2A170E"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M68 26 C78 28, 79 44, 71 48 C66 50, 63 44, 64 36"
                    fill="#C98A4B"
                    stroke="#2A170E"
                    strokeWidth="2.4"
                  />
                  {/* Curly Head */}
                  <path
                    d="M24 44 C20 26, 30 14, 45 14 C60 14, 70 26, 66 44 Z"
                    fill="#E3B171"
                    stroke="#2A170E"
                    strokeWidth="2.4"
                  />
                  {/* Top Fluffy Curls */}
                  <path
                    d="M36 15 C39 9, 51 9, 54 15"
                    fill="#E3B171"
                    stroke="#2A170E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  {/* Eyes & Nose */}
                  <circle cx="38" cy="30" r="2.3" fill="#2A170E" />
                  <circle cx="52" cy="30" r="2.3" fill="#2A170E" />
                  <ellipse cx="45" cy="35" rx="3.2" ry="2.3" fill="#2A170E" />
                  {/* Little Paws resting on border */}
                  <ellipse
                    cx="32"
                    cy="46"
                    rx="6.5"
                    ry="4.5"
                    fill="#E3B171"
                    stroke="#2A170E"
                    strokeWidth="2.4"
                  />
                  <ellipse
                    cx="58"
                    cy="46"
                    rx="6.5"
                    ry="4.5"
                    fill="#E3B171"
                    stroke="#2A170E"
                    strokeWidth="2.4"
                  />
                </svg>

                {/* Inner Dashed Container */}
                <div className="rounded-[18px] border border-dashed border-[#D8C5AC] px-6 py-6 sm:px-7 sm:py-7 space-y-6">
                  {/* Status Pill */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7E3BA] text-[#8E3F15] text-xs font-bold">
                      <svg
                        viewBox="0 0 64 64"
                        className="w-3.5 h-3.5 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                      {statusLabel}
                    </span>
                  </div>

                  {/* Double Plush Headings */}
                  <div className="space-y-3">
                    <h1 className="font-plush text-4xl sm:text-[2.75rem] text-[#2A170E] leading-none">
                      {displayName}
                    </h1>
                    <p className="font-plush text-3xl sm:text-[2.5rem] text-[#3B2112] leading-none -rotate-1 origin-left">
                      {puppy.breed || displayName}
                    </p>
                  </div>

                  {/* 2x2 Key Specs Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-1">
                    <div>
                      <p className="font-scrawl text-sm text-[#7A5C43]">Breed</p>
                      <p className="text-sm font-bold text-[#2A170E] mt-0.5">
                        {puppy.breed}
                      </p>
                    </div>
                    <div>
                      <p className="font-scrawl text-sm text-[#7A5C43]">
                        Boy or girl
                      </p>
                      <p className="text-sm font-bold text-[#2A170E] mt-0.5">
                        {genderLabel}
                      </p>
                    </div>
                    <div>
                      <p className="font-scrawl text-sm text-[#7A5C43]">Age</p>
                      <p className="text-sm font-bold text-[#2A170E] mt-0.5">
                        {puppy.ageLabel}
                      </p>
                    </div>
                    <div>
                      <p className="font-scrawl text-sm text-[#7A5C43]">Where</p>
                      <p className="text-sm font-bold text-[#2A170E] mt-0.5">
                        {whereLabel}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5 pt-1">
                    <a
                      href={buildWhatsAppUrl(
                        `Hi TeddyPups! I'd love to know more about ${displayName} (${puppy.breed}, ${puppy.ageLabel}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 px-5 rounded-full bg-[#1E6B41] hover:bg-[#175634] text-white text-xs sm:text-sm font-bold border-2 border-[#2A170E] shadow-[0_2px_0_#2A170E] transition-colors"
                    >
                      Ask about this puppy on WhatsApp
                    </a>

                    <a
                      href="#ask-about-puppy"
                      className="flex items-center justify-center w-full py-3 px-5 rounded-full bg-[#FFFEFA] hover:bg-[#F7EFE2] text-[#2A170E] text-xs sm:text-sm font-bold border-[1.8px] border-[#2A170E] transition-colors"
                    >
                      Send an enquiry
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 2: (2) what comes with this puppy */}
              <div className="relative rounded-[24px] bg-[#FCF4E3] border-2 border-[#2A170E] p-6 sm:p-7 -rotate-[0.7deg] shadow-[2px_4px_0_rgba(42,23,14,0.08)]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full border-[1.6px] border-[#A24A1A] text-[#A24A1A] font-scrawl text-sm inline-flex items-center justify-center leading-none">
                      2
                    </span>
                    <span className="font-scrawl text-lg text-[#A24A1A]">
                      what comes with this {displayName}
                    </span>
                  </div>

                  <h2 className="font-plush text-xl sm:text-[1.35rem] text-[#2A170E]">
                    Every Teddy Pup comes
                  </h2>

                  <ul className="space-y-2.5 pt-1">
                    {[
                      "Vaccinated",
                      "Dewormed",
                      "Verified health certificate from licensed vets",
                      "Thoroughly checked before joining your family",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-[0.84rem] font-medium text-[#3A2314]"
                      >
                        <Check className="w-4 h-4 text-[#B55420] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: (3) the way home — Coming home from abroad */}
        <section className="pt-4 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full border-[1.6px] border-[#A24A1A] text-[#A24A1A] font-scrawl text-sm inline-flex items-center justify-center leading-none">
                3
              </span>
              <span className="font-scrawl text-xl text-[#A24A1A]">
                the way home
              </span>
            </div>

            <h2 className="font-plush text-3xl sm:text-[2.75rem] text-[#2A170E] leading-tight">
              Coming home from abroad
            </h2>
          </div>

          {/* 4-Step Horizontal Process with Paw Trails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WAY_HOME_STEPS.map((step, idx) => (
              <div key={step.num} className="space-y-3">
                {/* Number Circle + Paw Print Trail */}
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-[#FFFDF8] border-2 border-[#2A170E] font-plush text-lg text-[#2A170E] flex items-center justify-center shrink-0 shadow-[1px_2px_0_#2A170E]">
                    {step.num}
                  </span>

                  {/* Trail of tiny terracotta paws between steps */}
                  {idx < 3 && (
                    <div
                      className="hidden lg:flex items-center justify-between flex-1 px-1 text-[#D59B6A]"
                      aria-hidden="true"
                    >
                      {Array.from({ length: 11 }).map((_, pIdx) => (
                        <svg
                          key={pIdx}
                          viewBox="0 0 64 64"
                          className={`w-2.5 h-2.5 fill-current ${pIdx % 2 === 0
                            ? "-translate-y-0.5 rotate-[75deg]"
                            : "translate-y-0.5 rotate-[95deg]"
                            }`}
                        >
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="font-plush text-lg text-[#2A170E] pt-1">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-[0.83rem] text-[#5A3A28] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: (4) dear TeddyPups... — Ask about this puppy */}
        <section
          id="ask-about-puppy"
          className="relative rounded-[26px] bg-[#FFFEFA] border-2 border-[#2A170E] p-7 sm:p-10 shadow-[0_4px_0_rgba(42,23,14,0.08)]"
        >
          {/* Tilted Paw Postage Stamp on Top-Right Corner */}
          <div
            className="absolute -top-5 right-8 w-16 h-16 rounded-md bg-[#F4DFB8] border-2 border-[#B55420] rotate-[8deg] p-1 shadow-xs flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-full h-full border border-dashed border-[#B55420]/70 rounded-xs flex items-center justify-center">
              <svg
                viewBox="0 0 64 64"
                className="w-6 h-6 text-[#8C3F14] fill-current"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Heading Column */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border-[1.6px] border-[#A24A1A] text-[#A24A1A] font-scrawl text-sm inline-flex items-center justify-center leading-none">
                  4
                </span>
                <span className="font-scrawl text-lg text-[#A24A1A]">
                  dear TeddyPups...
                </span>
              </div>

              <h2 className="font-plush text-3xl sm:text-[2.5rem] leading-[1.02] text-[#2A170E]">
                Ask about
                <br />
                this puppy
              </h2>

              <p className="text-xs sm:text-[0.84rem] text-[#5A3A28] leading-relaxed pt-1">
                Leave your details and our team will get back to you promptly —
                or message us on WhatsApp for the quickest reply.
              </p>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="rounded-2xl bg-[#F7EFE2] border border-[#2A170E] p-8 text-center space-y-3">
                  <h3 className="font-plush text-2xl text-[#2A170E]">
                    Thank you! We&apos;ve received your enquiry.
                  </h3>
                  <p className="text-sm text-[#5A3A28]">
                    Our team will reach out to you shortly on WhatsApp or phone
                    about {displayName}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2A170E] mb-1.5">
                        Your name <span className="text-[#B55420]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-[#B8A38B] bg-[#FFFEFA] px-3.5 py-2.5 text-sm text-[#2A170E] focus:outline-none focus:border-[#2A170E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2A170E] mb-1.5">
                        Phone or WhatsApp{" "}
                        <span className="text-[#B55420]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#B8A38B] bg-[#FFFEFA] px-3.5 py-2.5 text-sm text-[#2A170E] focus:outline-none focus:border-[#2A170E]"
                      />
                      <p className="mt-1 text-[11px] text-[#7A5C43]">
                        With country code, e.g. +971 50 123 4567
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2A170E] mb-1.5">
                        Email{" "}
                        <span className="font-normal text-[#7A5C43]">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#B8A38B] bg-[#FFFEFA] px-3.5 py-2.5 text-sm text-[#2A170E] focus:outline-none focus:border-[#2A170E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2A170E] mb-1.5">
                        Your area{" "}
                        <span className="font-normal text-[#7A5C43]">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full rounded-xl border border-[#B8A38B] bg-[#FFFEFA] px-3.5 py-2.5 text-sm text-[#2A170E] focus:outline-none focus:border-[#2A170E]"
                      />
                      <p className="mt-1 text-[11px] text-[#7A5C43]">
                        e.g. Dubai Marina
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A170E] mb-1.5">
                      Message{" "}
                      <span className="font-normal text-[#7A5C43]">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-[#B8A38B] bg-[#FFFEFA] px-3.5 py-2.5 text-sm text-[#2A170E] focus:outline-none focus:border-[#2A170E]"
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-semibold text-red-600">{error}</p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#A24A1A] hover:bg-[#8B3D14] text-white text-xs sm:text-sm font-bold border-2 border-[#2A170E] shadow-[0_3px_0_#2A170E] transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? "Sending..." : "Send enquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION: Previous pup / Next pup Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Previous Pup Card */}
          <Link
            href={`/puppies/${prevPup.slug}`}
            className="group rounded-[22px] bg-[#FFFEFA] border-2 border-[#2A170E] p-4 flex items-center gap-4 hover:bg-[#FAF1E2] transition-colors"
          >
            <div className="relative w-14 h-16 rounded-t-full rounded-b-md overflow-hidden border-[1.8px] border-[#2A170E] bg-[#EDE2D0] shrink-0">
              <Image
                src={prevPupImage}
                alt={prevPup.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="font-scrawl text-xs text-[#7A5C43]">Previous pup</p>
              <p className="font-plush text-xl text-[#2A170E] group-hover:text-[#A24A1A] transition-colors">
                {prevPup.title}
              </p>
            </div>
          </Link>

          {/* Next Pup Card */}
          <Link
            href={`/puppies/${nextPup.slug}`}
            className="group rounded-[22px] bg-[#FFFEFA] border-2 border-[#2A170E] p-4 flex items-center justify-end gap-4 text-right hover:bg-[#FAF1E2] transition-colors"
          >
            <div>
              <p className="font-scrawl text-xs text-[#7A5C43]">Next pup</p>
              <p className="font-plush text-xl text-[#2A170E] group-hover:text-[#A24A1A] transition-colors">
                {nextPup.title}
              </p>
            </div>
            <div className="relative w-14 h-16 rounded-t-full rounded-b-md overflow-hidden border-[1.8px] border-[#2A170E] bg-[#EDE2D0] shrink-0">
              <Image
                src={nextPupImage}
                alt={nextPup.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}