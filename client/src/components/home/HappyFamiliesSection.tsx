import Link from "next/link";
import { SkylineSunset } from "@/components/illustrations/SkylineSunset";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { PolaroidCard } from "@/components/families/PolaroidCard";
import type { HappyFamily } from "@/lib/types";

interface HappyFamiliesSectionProps {
  families: HappyFamily[];
}

export function HappyFamiliesSection({ families }: HappyFamiliesSectionProps) {
  const featuredPolaroids = families.slice(0, 8);
  const testimonial =
    families.find((f) => Boolean(f.testimonialQuote)) ?? {
      testimonialQuote:
        "TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.",
      clientName: "Sarah M., Dubai, UAE",
    };

  return (
    <section className="relative bg-[#C88147]">
      {/* Dubai Skyline Sunset Divider */}
      <SkylineSunset />

      {/* Warm Terracotta Body */}
      <div className="bg-gradient-to-b from-[#9B5326] to-[#87431A] pt-10 sm:pt-14 pb-16 sm:pb-20 text-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header + Speech Bubble Testimonial */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">
                Happy families
                <br />
                &amp; puppies
              </h2>
              <p className="text-sm sm:text-base text-[#F6DFC9] leading-relaxed max-w-lg">
                We are truly honored to see our puppies become cherished members
                of loving families. These heartwarming moments have been shared by
                our valued clients who welcomed a Teddy Pup into their homes and
                hearts.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="hidden sm:block absolute -left-14 -top-6 z-10">
                <MascotPuppy pose="walking" className="w-20 h-20" animateFloat />
              </div>

              {/* White Speech Bubble Quote */}
              <blockquote className="relative bg-white text-[#361D10] rounded-2xl p-6 sm:p-7 shadow-[0_18px_36px_rgba(32,12,4,0.3)] border-2 border-[#472716]">
                <p className="text-xs sm:text-sm leading-relaxed text-[#4A2B18]">
                  &ldquo;{testimonial.testimonialQuote}&rdquo;
                </p>
                <footer className="mt-3 text-xs sm:text-sm font-extrabold text-[#361D10]">
                  — {testimonial.clientName}
                </footer>
                <span
                  className="hidden sm:block absolute -bottom-3 left-10 w-6 h-6 bg-white border-r-2 border-b-2 border-[#472716] rotate-45"
                  aria-hidden="true"
                />
              </blockquote>
            </div>
          </div>

          {/* Wooden Siding Polaroid Wall */}
          <div className="relative wood-siding-bg rounded-2xl border-2 border-[#3A1B0C] p-5 sm:p-8 lg:p-10 shadow-[0_24px_48px_rgba(24,10,3,0.45)] overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {featuredPolaroids.map((family) => (
                <PolaroidCard key={family._id} family={family} />
              ))}
            </div>

            {/* Bottom Porch Light + Center Wooden Door + CTA */}
            <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 relative">
              {/* Mini Porch Light */}
              <div className="hidden sm:flex flex-col items-center ml-4 opacity-90" aria-hidden="true">
                <div className="w-6 h-8 rounded-b-lg bg-[#FFE6A1] border-2 border-[#3A1B0C] shadow-[0_0_24px_rgba(255,224,140,0.65)]" />
                <div className="w-1.5 h-10 bg-[#3A1B0C]" />
              </div>

              {/* Center Decorative Wooden Door */}
              <div
                className="w-24 h-24 rounded-t-[999px] bg-[#9E4B1D] border-2 border-[#3A1B0C] mx-auto -mb-10 hidden sm:flex items-center justify-center relative shadow-inner"
                aria-hidden="true"
              >
                <div className="w-1 h-full bg-[#3A1B0C]/40" />
              </div>

              <Link href="/happy-families" className="btn-terracotta text-sm z-10 sm:ml-auto">
                See every happy family
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Floorboard Edge */}
      <div
        className="w-full h-6 bg-[#472514] border-t border-[#2E160A]"
        aria-hidden="true"
      />
    </section>
  );
}

