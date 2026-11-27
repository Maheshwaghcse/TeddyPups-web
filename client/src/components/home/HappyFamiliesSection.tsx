
import Link from "next/link";
import { PolaroidCard } from "@/components/families/PolaroidCard";
import type { HappyFamily } from "@/lib/types";

const LOCAL_FAMILY_IMAGES = [
  "/images/families/27b888_4af83a5cffb44045bcab615b0cbc237c-mv2.webp",
  "/images/families/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.webp",
  "/images/families/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.webp",
  "/images/families/27b888_89af9713331443c3b9f4b72a83d646e3-mv2.webp",
  "/images/families/27b888_96b9eb6428164f41b124137673bc865c-mv2.webp",
  "/images/families/27b888_522e394293a845bcae93adec46bf499c-mv2.webp",
  "/images/families/27b888_927dffc200a44f9dafcb953b765beec0-mv2.webp",
  "/images/families/27b888_3594e056bf964a7a839a1bd5ac0c859e-mv2.webp",
];

interface HappyFamiliesSectionProps {
  families: HappyFamily[];
}

export function HappyFamiliesSection({ families }: HappyFamiliesSectionProps) {
  const featuredPolaroids = families.slice(0, 8).map((family, idx) => {
    const localImg = LOCAL_FAMILY_IMAGES[idx % LOCAL_FAMILY_IMAGES.length];
    const currentUrl = (family as unknown as { imageUrl?: string }).imageUrl;
    const needsLocalWebp = !currentUrl || currentUrl.endsWith(".svg");
    return {
      ...family,
      ...(needsLocalWebp ? { imageUrl: localImg, image: localImg } : {}),
    };
  });

  const testimonial =
    families.find((f) => f.clientName?.includes("Sarah")) ??
    families.find((f) => Boolean(f.testimonialQuote)) ?? {
      testimonialQuote:
        "TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.",
      clientName: "Sarah M., Dubai, UAE",
    };

  return (
    <section
      data-puppy-section="happy-families"
      className="relative bg-gradient-to-b from-[#a65a30] to-[#4d2b19] pt-[clamp(3rem,7vh,5rem)] text-[#fffdf8] overflow-x-clip"
    >
      <div className="gutter max-w-[110rem] mx-auto">
        {/* Header + Speech Bubble Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-12">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-plush text-huge text-[#fffdf8]">
              Happy families
              <br />
              &amp; puppies
            </h2>
            <p className="text-lede text-[#fffdf8]/80 max-w-[50ch]">
              We are truly honored to see our puppies become cherished members
              of loving families. These heartwarming moments have been shared by
              our valued clients who welcomed a Teddy Pup into their homes and
              hearts.
            </p>
          </div>

          <div className="lg:col-span-6 lg:justify-self-end w-full max-w-[34rem] relative">
            {/* White Speech Bubble Quote */}
            <blockquote className="relative bg-[#fffdf8] text-[#2a170e] rounded-[1.8rem_1.8rem_1.8rem_0.5rem] p-5 sm:p-6 shadow-[8px_10px_rgba(20,10,5,0.22)] border-[3px] border-[#2a170e] rotate-[1.2deg]">
              <p className="font-plush-text text-[clamp(1.02rem,1.25vw,1.2rem)] leading-[1.5] text-[#2a170e]">
                &ldquo;{testimonial.testimonialQuote}&rdquo;
              </p>
              <footer className="mt-3 font-scrawl text-base text-[#8e3f15]">
                {testimonial.clientName}
              </footer>
              <span
                className="hidden sm:block absolute -bottom-[1rem] left-9 w-6 h-6 bg-[#fffdf8] border-r-[3px] border-b-[3px] border-[#2a170e] rotate-45"
                aria-hidden="true"
              />
            </blockquote>
          </div>
        </div>
      </div>

      {/* Wooden Siding Polaroid Wall */}
      <div className="relative mt-[clamp(2.5rem,6vh,4rem)] mx-3 sm:mx-6 lg:mx-12 max-w-[104rem] 2xl:mx-auto">
        {/* Top Wooden Cornice Eave */}
        <div
          className="h-7 -mx-3 rounded-[0.55rem] border-[3px] border-[#2a170e] relative z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 18px, rgba(42,23,14,0.35) 18px 21px), linear-gradient(#5a301b, #5a301b)",
            backgroundSize: "100% 0.55rem, 100% 100%",
            backgroundPosition: "0 100%, 0 0",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />

        <div className="wood-siding-bg border-x-[3px] border-[#2a170e] px-4 sm:px-8 lg:px-11 pt-8 sm:pt-10 pb-0 relative -mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 lg:gap-[clamp(1.4rem,2.6vw,2.8rem)] items-start">
            {featuredPolaroids.map((family) => (
              <div
                key={family._id}
                className="lg:[&:nth-child(4n+2)]:mt-5 lg:[&:nth-child(4n+3)]:mt-5"
              >
                <PolaroidCard family={family} />
              </div>
            ))}
          </div>

          {/* Bottom Porch Street Lamp + Center Wooden Door + CTA */}
          <div className="mt-10 min-h-[clamp(10rem,18vw,13rem)] flex flex-col sm:flex-row items-center justify-center relative pt-4">
            {/* Mini Street Lamp */}
            <div
              className="hidden sm:flex flex-col items-center absolute left-[7%] bottom-0"
              aria-hidden="true"
            >
              <div className="w-9 h-8 rounded-[0.6rem_0.6rem_1.1rem_1.1rem] bg-[#ffd27f] border-[3px] border-[#2a170e] shadow-[0_0_44px_20px_rgba(255,205,110,0.45)] -mb-0.5 z-10" />
              <div className="w-2.5 h-[clamp(8rem,13vw,11.5rem)] bg-[#3b2215] border-x-[3px] border-[#2a170e]" />
            </div>

            {/* Center Decorative Wooden Door */}
            <div
              className="hidden sm:block w-[clamp(5.5rem,8vw,7.5rem)] h-[clamp(8.5rem,12vw,11rem)] rounded-t-[999px] bg-[#a24a1a] shadow-[0_0_0_6px_#b2733f,0_0_0_9px_#2a170e] self-end relative"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent calc(50% - 1.5px), rgba(42,23,14,0.4) calc(50% - 1.5px) calc(50% + 1.5px), transparent calc(50% + 1.5px))",
              }}
              aria-hidden="true"
            />

            <Link
              href="/happy-families"
              className="btn-terracotta sm:absolute sm:bottom-6 sm:right-[clamp(0.5rem,4vw,4rem)] mb-6 sm:mb-0 z-10"
            >
              See every happy family
            </Link>
          </div>
        </div>
      </div>

      {/* Transition Dark Street Pavement */}
      <div
        className="w-full h-[clamp(1.6rem,3vw,2.4rem)] border-t-[3px] border-[#2a170e]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 calc(6rem - 2px), rgba(255,255,255,0.07) calc(6rem - 2px) 6rem)",
          backgroundColor: "#3a2114",
        }}
        aria-hidden="true"
      />
    </section>
  );
}