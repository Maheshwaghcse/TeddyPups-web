"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PuppyDoorCard } from "./PuppyDoorCard";
import type { Puppy } from "@/lib/types";

interface PuppyCatalogClientProps {
  initialPuppies: Puppy[];
  initialOrigin?: string;
  initialStatus?: string;
  initialBreed?: string;
}

const WHERE_TABS = [
  { value: "all", label: "Everywhere" },
  { value: "dubai", label: "Imported" },
  { value: "korea", label: "Korean Teacup" },
];

const BREED_TABS = [
  "Maltipoo",
  "Pomeranian",
  "Poodle",
  "Cavapoo",
  "Shih Tzu",
];

const GENDER_TABS = [
  { value: "boy", label: "Boys" },
  { value: "girl", label: "Girls" },
];

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
  "/images/puppies/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.webp",
];

const GONE_HOME_SHOWCASE = [
  {
    name: "Ace",
    slug: "lulu",
    image: "/images/puppies/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.webp",
  },
  {
    name: "Leo",
    slug: "mochi",
    image: "/images/puppies/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.webp",
  },
  {
    name: "Mia",
    slug: "lulu",
    image: "/images/puppies/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.webp",
  },
  {
    name: "Sadie",
    slug: "mochi",
    image: "/images/puppies/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.webp",
  },
  {
    name: "Pomeranian",
    slug: "lulu",
    image: "/images/puppies/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.webp",
  },
];

export function PuppyCatalogClient({
  initialPuppies,
  initialOrigin = "all",
  initialStatus = "all",
  initialBreed = "all",
}: PuppyCatalogClientProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [origin, setOrigin] = useState(initialOrigin);
  const [status, setStatus] = useState(initialStatus);
  const [breed, setBreed] = useState(initialBreed);
  const [gender, setGender] = useState<string>("all");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const parent = el.parentElement;
    if (parent) {
      Array.from(parent.children).forEach((child) => {
        if (child !== el && child instanceof HTMLElement) {
          const text = child.innerText || "";
          if (
            text.includes("Available & Featured Puppies") ||
            text.includes("meet your future best friend")
          ) {
            child.style.display = "none";
          }
        }
      });

      const pageSection = parent.parentElement;
      if (pageSection instanceof HTMLElement) {
        pageSection.style.background = "#FAF6EE";
        pageSection.style.paddingBottom = "0px";
      }
    }
  }, []);

  // Automatically replace any .svg placeholder images with your real .webp photos
  const hydratedPuppies = useMemo(() => {
    return initialPuppies.map((p, idx) => {
      const firstImg = p.images?.[0] ?? "";
      const needsWebp = !firstImg || firstImg.endsWith(".svg");
      return {
        ...p,
        images: needsWebp
          ? [PUPPY_WEBP_IMAGES[idx % PUPPY_WEBP_IMAGES.length]]
          : p.images,
      };
    });
  }, [initialPuppies]);

  const filtered = useMemo(() => {
    return hydratedPuppies.filter((p) => {
      if (status === "gone-home") {
        if (p.status !== "gone-home") return false;
      } else {
        if (p.status === "gone-home") return false;
      }

      if (origin === "dubai" && p.origin !== "dubai") return false;
      if (
        origin === "korea" &&
        p.origin !== "korea" &&
        !p.title.toLowerCase().includes("korean") &&
        !p.title.toLowerCase().includes("teacup")
      ) {
        return false;
      }

      if (breed !== "all") {
        const b = breed.toLowerCase();
        const matchBreed =
          p.breed.toLowerCase().includes(b) ||
          p.title.toLowerCase().includes(b);
        if (!matchBreed) return false;
      }

      if (gender !== "all") {
        if (!p.gender.toLowerCase().includes(gender.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [hydratedPuppies, origin, status, breed, gender]);

  // Populate the 5 "Already gone home" mini-portraits at the bottom using .webp photos
  const goneHomePups = useMemo(() => {
    const fromDb = initialPuppies.filter((p) => p.status === "gone-home");
    return GONE_HOME_SHOWCASE.map((item, idx) => {
      const dbMatch = fromDb[idx];
      const dbImg = dbMatch?.images?.[0];
      return {
        name: item.name,
        slug: dbMatch?.slug || item.slug,
        image: dbImg && !dbImg.endsWith(".svg") ? dbImg : item.image,
      };
    });
  }, [initialPuppies]);

  function updateQuery(nextOrigin: string, nextStatus: string, nextBreed: string) {
    const params = new URLSearchParams();
    if (nextOrigin !== "all") params.set("origin", nextOrigin);
    if (nextStatus !== "all") params.set("status", nextStatus);
    if (nextBreed !== "all") params.set("breed", nextBreed);
    const qs = params.toString();
    router.replace(`/puppies${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  return (
    <div ref={rootRef} className="space-y-10">
      {/* 1. Target Sketchbook Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-2">
        <div className="space-y-3 max-w-2xl">
          <p className="font-scrawl text-xl sm:text-[1.45rem] text-[#A24A1A]">
            from Teddy&apos;s sketchbook
          </p>

          <div className="relative inline-block">
            <svg
              viewBox="0 0 64 64"
              className="w-5 h-5 text-[#E5CFAF] absolute -top-2 right-[18%] rotate-12 pointer-events-none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>

            <h1 className="font-plush text-[clamp(3.1rem,6.4vw,5.2rem)] text-[#2A170E] leading-[0.95] tracking-tight">
              Available puppies
            </h1>

            <svg
              viewBox="0 0 520 22"
              className="w-full h-4 sm:h-5 mt-1 text-[#B65622]"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 14 C 95 4, 180 19, 275 11 C 365 4, 445 17, 516 11"
                stroke="currentColor"
                strokeWidth="6.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="pt-2 text-sm sm:text-[1.02rem] text-[#5A3A28] leading-relaxed max-w-lg">
            Every listing shows real photos of the actual puppy. Open a profile
            to see them all, then ask us about them on WhatsApp.
          </p>
        </div>

        {/* Right Circular "self-portrait" Badge */}
        <div className="flex flex-col items-center shrink-0 self-start md:self-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 border-[1.5px] border-[#2A170E]">
            <div className="w-full h-full rounded-full bg-[#F5E1B9] border-[1.5px] border-[#2A170E] flex items-center justify-center">
              <svg
                viewBox="0 0 120 120"
                className="w-24 h-24 sm:w-28 sm:h-28"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M78 78 C88 74, 95 66, 92 58 C89 52, 82 57, 81 63"
                  fill="#DFAC6C"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M42 64 C37 72, 38 86, 45 90 L75 90 C82 86, 82 70, 76 64 Z"
                  fill="#DFAC6C"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <rect
                  x="44"
                  y="78"
                  width="9"
                  height="15"
                  rx="4.5"
                  fill="#DFAC6C"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                />
                <rect
                  x="56"
                  y="78"
                  width="9"
                  height="15"
                  rx="4.5"
                  fill="#DFAC6C"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                />
                <ellipse
                  cx="73"
                  cy="88"
                  rx="7"
                  ry="5"
                  fill="#DFAC6C"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                />
                <path
                  d="M38 36 C28 38, 25 53, 33 59 C38 62, 43 56, 42 48"
                  fill="#C88D48"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M72 36 C82 38, 85 53, 77 59 C72 62, 67 56, 68 48"
                  fill="#C88D48"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <circle
                  cx="55"
                  cy="45"
                  r="18"
                  fill="#DFAC6C"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                />
                <path
                  d="M47 28 C50 22, 60 22, 63 28"
                  fill="#DFAC6C"
                  stroke="#2A170E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <circle cx="49" cy="43" r="2.2" fill="#2A170E" />
                <circle cx="61" cy="43" r="2.2" fill="#2A170E" />
                <ellipse cx="55" cy="48" rx="3" ry="2.2" fill="#2A170E" />
                <path
                  d="M53 52 C53 56, 57 56, 57 52"
                  fill="#E47A7A"
                  stroke="#2A170E"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>
          <span className="mt-2 font-scrawl text-base text-[#5A3A28]">
            self-portrait
          </span>
        </div>
      </div>

      {/* 2. Sketchbook Filter Box with Masking Tape */}
      <div className="relative rounded-[20px] bg-[#FFFEFA] border-2 border-[#2A170E] px-6 py-6 sm:px-9 sm:py-7 shadow-[2px_5px_0_rgba(42,23,14,0.08)] space-y-4">
        <span
          className="absolute -top-3.5 left-10 w-20 h-6 bg-[#EFE0C4]/90 rotate-[-4deg] rounded-[2px] shadow-2xs pointer-events-none"
          aria-hidden="true"
        />

        {/* Row 1: where */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-scrawl text-[1.1rem] text-[#5A3A28] w-24 shrink-0">
            where
          </span>
          <div className="flex flex-wrap gap-2.5">
            {WHERE_TABS.map((tab) => {
              const active = origin === tab.value && status !== "gone-home";
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setStatus("all");
                    setOrigin(tab.value);
                    if (tab.value === "all") {
                      setBreed("all");
                      setGender("all");
                      updateQuery("all", "all", "all");
                    } else {
                      updateQuery(tab.value, "all", breed);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-[0.84rem] font-bold border-[1.5px] border-[#2A170E] transition-colors cursor-pointer ${active
                      ? "bg-[#2A170E] text-[#FFFDF8]"
                      : "bg-[#FFFDF8] text-[#2A170E] hover:bg-[#F6E9D2]"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: breed */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-scrawl text-[1.1rem] text-[#5A3A28] w-24 shrink-0">
            breed
          </span>
          <div className="flex flex-wrap gap-2.5">
            {BREED_TABS.map((b) => {
              const active = breed.toLowerCase() === b.toLowerCase();
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    const nextBreed = active ? "all" : b;
                    setBreed(nextBreed);
                    updateQuery(origin, status, nextBreed);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-[0.84rem] font-bold border-[1.5px] border-[#2A170E] transition-colors cursor-pointer ${active
                      ? "bg-[#2A170E] text-[#FFFDF8]"
                      : "bg-[#FFFDF8] text-[#2A170E] hover:bg-[#F6E9D2]"
                    }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: boy or girl */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-scrawl text-[1.1rem] text-[#5A3A28] w-24 shrink-0">
            boy or girl
          </span>
          <div className="flex flex-wrap gap-2.5">
            {GENDER_TABS.map((g) => {
              const active = gender === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGender(active ? "all" : g.value)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-[0.84rem] font-bold border-[1.5px] border-[#2A170E] transition-colors cursor-pointer ${active
                      ? "bg-[#2A170E] text-[#FFFDF8]"
                      : "bg-[#FFFDF8] text-[#2A170E] hover:bg-[#F6E9D2]"
                    }`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Handwritten Results Count */}
      <div>
        <p className="font-scrawl text-[1.18rem] text-[#2A170E]">
          {filtered.length} {filtered.length === 1 ? "puppy" : "puppies"} looking
          for a home
        </p>
      </div>

      {/* 4. Circular Sketchbook Puppies Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-[#FFFEFA] border-2 border-[#2A170E] p-12 text-center space-y-4">
          <h3 className="font-plush text-2xl text-[#2A170E]">
            No puppies match these filters right now
          </h3>
          <p className="text-sm text-[#6D5242] max-w-md mx-auto">
            Try clearing your filters or message us on WhatsApp—we also source
            rare teacup breeds directly from Seoul on request.
          </p>
          <button
            type="button"
            onClick={() => {
              setOrigin("all");
              setStatus("all");
              setBreed("all");
              setGender("all");
              updateQuery("all", "all", "all");
            }}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#A24A1A] text-white font-bold text-sm border-2 border-[#2A170E] shadow-[0_3px_0_#2A170E] cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 pt-2">
          {filtered.map((puppy, idx) => (
            <div key={puppy._id} className={idx % 2 === 1 ? "lg:mt-5" : ""}>
              <PuppyDoorCard puppy={puppy} index={idx} />
            </div>
          ))}
        </div>
      )}

      {/* 5. "Already gone home" Full-Width Showcase Banner */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#F3DFB9] mt-20 pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 space-y-3">
            <h2 className="font-plush text-[2.6rem] sm:text-[3.1rem] leading-[0.95] text-[#2A170E]">
              Already
              <br />
              gone home
            </h2>
            <p className="text-sm font-medium text-[#5A3A28] pt-1">
              These puppies have found their families.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setStatus("gone-home");
                  setOrigin("all");
                  setBreed("all");
                  setGender("all");
                  window.scrollTo({ top: 260, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#A24A1A] hover:bg-[#8B3D14] text-[#FFFDF8] text-xs sm:text-sm font-bold border-2 border-[#2A170E] shadow-[0_3px_0_#2A170E] transition-all cursor-pointer"
              >
                See the puppies who&apos;ve gone home
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-6 items-center">
            {goneHomePups.map((pup, i) => (
              <Link
                key={`${pup.name}-${i}`}
                href={`/puppies/${pup.slug}`}
                className="group relative flex flex-col items-center text-center"
              >
                {i > 0 && (
                  <span
                    className="hidden sm:block absolute -left-4 top-1/2 -translate-y-4 text-[#A24A1A] text-xs font-bold select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {i % 2 === 1 ? "✦" : "♡"}
                  </span>
                )}

                <div className="relative w-28 h-28 sm:w-[118px] sm:h-[118px] rounded-full p-1.5 bg-[#F8E9CC] border-[1.5px] border-[#2A170E] flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={pup.image}
                      alt={pup.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#FFFDF8] border-[1.5px] border-[#2A170E] font-scrawl text-[0.76rem] text-[#2A170E] -rotate-3 shadow-2xs">
                    gone home <span className="text-[#A24A1A]">♥</span>
                  </span>
                </div>

                <span className="mt-3.5 font-plush text-[0.98rem] text-[#2A170E] group-hover:text-[#A24A1A] transition-colors">
                  {pup.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}