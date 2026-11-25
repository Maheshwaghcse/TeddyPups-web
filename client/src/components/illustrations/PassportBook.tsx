import { Globe, HeartHandshake, MessageCircleHeart, Plane } from "lucide-react";
import { MascotPuppy } from "./MascotPuppy";

/** Open leather-bound "Puppy Passport" trust spread with 4 official-style stamps. */
export function PassportBook() {
  return (
    <div className="relative mx-auto max-w-[960px]">
      {/* Leather Cover Frame */}
      <div className="rounded-[24px] bg-[#6E3416] p-3 sm:p-4 shadow-[0_24px_48px_rgba(45,22,9,0.28)] border-2 border-[#47210D]">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[16px] overflow-hidden border border-[#B99874] bg-[#FAF0DC] relative">
          {/* Center Spine Shadow */}
          <div
            className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/0 via-black/15 to-black/0 z-10"
            aria-hidden="true"
          />

          {/* Left Page */}
          <div className="diamond-quilt-bg p-8 sm:p-12 flex flex-col justify-between min-h-[300px] md:min-h-[390px] border-b md:border-b-0 md:border-r border-[#DEC6A4]">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#8A5A3A] mb-3">
                puppy passport
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#361D10] leading-[1.03] tracking-tight">
                Why
                <br />
                families trust
                <br />
                TeddyPups
              </h2>
            </div>

            <div className="mt-8 flex items-end justify-end">
              <MascotPuppy pose="standing" className="w-24 h-24 sm:w-28 sm:h-28" animateFloat />
            </div>
          </div>

          {/* Right Page: 4 Passport Stamps */}
          <div className="diamond-quilt-bg p-7 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 items-start">
            {/* Stamp 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#A6653E] flex flex-col items-center justify-center p-2 bg-[#FFF8EB]/70">
                <HeartHandshake className="w-5 h-5 text-[#9E4B1D] mb-1" />
                <span className="text-[11px] font-extrabold leading-tight text-[#4A2715]">
                  Vet-checked
                  <br />& healthy
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#5C3D2B]">
                Every puppy comes vaccinated, dewormed, and with a verified health certificate.
              </p>
            </div>

            {/* Stamp 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-20 -rotate-3 rounded-lg border-2 border-[#2E7D5B] flex flex-col items-center justify-center p-2 bg-[#ECF7F1]/80 shadow-xs">
                <Plane className="w-4 h-4 text-[#2E7D5B] mb-1" />
                <span className="text-[11px] font-extrabold leading-tight text-[#1E5C42]">
                  Korea to
                  <br />
                  Dubai, safely
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#5C3D2B]">
                Trusted breeders, safe travel, and premium care from start to finish.
              </p>
            </div>

            {/* Stamp 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-2 border-[#472716] flex flex-col items-center justify-center p-2 bg-[#FFF8EB]/75">
                <MessageCircleHeart className="w-5 h-5 text-[#472716] mb-1" />
                <span className="text-[11px] font-extrabold leading-tight text-[#361D10]">
                  Support 24/7
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#5C3D2B]">
                Always here to help, from choosing your puppy to post-delivery support.
              </p>
            </div>

            {/* Stamp 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-2 border-dotted border-[#B85E2B] flex flex-col items-center justify-center p-2 bg-[#FFF8EB]/70">
                <Globe className="w-5 h-5 text-[#B85E2B] mb-1" />
                <span className="text-[10px] font-extrabold leading-tight text-[#9E4B1D]">
                  Trusted
                  <br />
                  by families
                  <br />
                  worldwide
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#5C3D2B]">
                Puppies delivered to loving homes all around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

