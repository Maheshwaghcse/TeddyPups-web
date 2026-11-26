import { Globe, HeartHandshake, MessageCircleHeart, Plane } from "lucide-react";
import { MascotPuppy } from "./MascotPuppy";

/** Open leather-bound "Puppy Passport" trust spread with 4 official-style ink stamps. */
export function PassportBook() {
  return (
    <div className="relative mx-auto max-w-[72rem] md:-rotate-[1.2deg] drop-shadow-[10px_14px_rgba(42,23,14,0.18)]">
      {/* Leather Cover Frame */}
      <div
        className="rounded-[1.7rem] border-[3px] border-[#2a170e] p-3 sm:p-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(#a24a1a, #a24a1a)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          {/* Left Page */}
          <div className="passport-paper-bg relative rounded-t-[1.1rem] md:rounded-l-[1.1rem] md:rounded-tr-none border-[3px] border-b-[1.5px] md:border-b-[3px] md:border-r-[1.5px] border-[#2a170e] p-[clamp(1.6rem,4vw,3.2rem)] flex flex-col justify-between min-h-[280px] md:min-h-[420px] md:shadow-[inset_-26px_0_30px_-24px_rgba(42,23,14,0.35)]">
            <div>
              <p className="font-scrawl text-[1.15rem] text-[#8e3f15] mb-1.5">
                puppy passport
              </p>
              <h2 className="font-plush text-[clamp(2.2rem,4.2vw,3.9rem)] text-[#2a170e] max-w-[12ch]">
                Why
                <br />
                families trust
                <br />
                TeddyPups
              </h2>
            </div>

            <div className="mt-8 flex items-end justify-end md:absolute md:-right-6 md:bottom-2 z-20">
              <MascotPuppy pose="sitting" className="w-32 h-28 sm:w-40 sm:h-36" animateFloat />
            </div>
          </div>

          {/* Right Page: 4 Ink Passport Stamps */}
          <div className="passport-paper-bg rounded-b-[1.1rem] md:rounded-r-[1.1rem] md:rounded-bl-none border-[3px] border-t-[1.5px] md:border-t-[3px] md:border-l-[1.5px] border-[#2a170e] p-[clamp(1.6rem,4vw,3.2rem)] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 items-start md:shadow-[inset_26px_0_30px_-24px_rgba(42,23,14,0.3)]">
            {/* Stamp 1: Round Dashed */}
            <div className="flex flex-col items-center text-center">
              <div
                className="tp-stamp-ink relative w-[clamp(8rem,11vw,10rem)] aspect-square rounded-full border-[3px] border-[#a24a1a] text-[#a24a1a] flex flex-col items-center justify-center p-3 rotate-[-4deg]"
                style={{ "--stamp-tilt": "-4deg" } as React.CSSProperties}
              >
                <span className="pointer-events-none absolute inset-[5px] rounded-full border-[1.5px] border-dashed border-current" aria-hidden="true" />
                <HeartHandshake className="w-7 h-7 mb-1" />
                <span className="font-plush text-[1.05rem] leading-[1.05]">
                  Vet-checked
                  <br />&amp; healthy
                </span>
              </div>
              <p className="mt-3.5 text-[0.92rem] leading-[1.45] text-[#5a3a28] max-w-[26ch]">
                Every puppy comes vaccinated, dewormed, and with a verified health certificate.
              </p>
            </div>

            {/* Stamp 2: Rectangular Ticket */}
            <div className="flex flex-col items-center text-center">
              <div
                className="tp-stamp-ink relative w-[clamp(9rem,12vw,11rem)] aspect-[1.3/1] rounded-[0.7rem] border-[3px] border-[#1f7a4d] text-[#1f7a4d] flex flex-col items-center justify-center p-3 rotate-[-3deg]"
                style={{ "--stamp-tilt": "-3deg" } as React.CSSProperties}
              >
                <span className="pointer-events-none absolute inset-[5px] rounded-[0.45rem] border-[1.5px] border-dashed border-current" aria-hidden="true" />
                <Plane className="w-6 h-6 mb-1" />
                <span className="font-plush text-[1.02rem] leading-[1.05]">
                  Korea to
                  <br />
                  Dubai, safely
                </span>
              </div>
              <p className="mt-3.5 text-[0.92rem] leading-[1.45] text-[#5a3a28] max-w-[26ch]">
                Trusted breeders, safe travel, and premium care from start to finish.
              </p>
            </div>

            {/* Stamp 3: Oval */}
            <div className="flex flex-col items-center text-center">
              <div
                className="tp-stamp-ink relative w-[clamp(9.2rem,12vw,11rem)] aspect-[1.35/1] rounded-full border-[3px] border-[#2a170e] text-[#2a170e] flex flex-col items-center justify-center p-3 rotate-[-6deg]"
                style={{ "--stamp-tilt": "-6deg" } as React.CSSProperties}
              >
                <span className="pointer-events-none absolute inset-[5px] rounded-full border-[1.5px] border-dashed border-current" aria-hidden="true" />
                <MessageCircleHeart className="w-6 h-6 mb-1" />
                <span className="font-plush text-[1.05rem] leading-[1.05]">
                  Support 24/7
                </span>
              </div>
              <p className="mt-3.5 text-[0.92rem] leading-[1.45] text-[#5a3a28] max-w-[26ch]">
                Always here to help, from choosing your puppy to post-delivery support.
              </p>
            </div>

            {/* Stamp 4: Dotted Scallop */}
            <div className="flex flex-col items-center text-center">
              <div
                className="tp-stamp-ink relative w-[clamp(8rem,11vw,10rem)] aspect-square rounded-full border-[5px] border-dotted border-[#c2622b] text-[#c2622b] flex flex-col items-center justify-center p-3 rotate-[4deg]"
                style={{ "--stamp-tilt": "4deg" } as React.CSSProperties}
              >
                <span className="pointer-events-none absolute inset-[5px] rounded-full border-[1.5px] border-dashed border-current" aria-hidden="true" />
                <Globe className="w-6 h-6 mb-1" />
                <span className="font-plush text-[0.96rem] leading-[1.05]">
                  Trusted
                  <br />
                  by families
                  <br />
                  worldwide
                </span>
              </div>
              <p className="mt-3.5 text-[0.92rem] leading-[1.45] text-[#5a3a28] max-w-[26ch]">
                Puppies delivered to loving homes all around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
