import Image from "next/image";
import Link from "next/link";
import { WoodenSignpost } from "@/components/illustrations/WoodenSignpost";
import { FlightArc } from "@/components/illustrations/FlightArc";

export function TwoWaysSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#fbe3b4] to-[#f7d18d] py-[clamp(4.5rem,11vh,8rem)] overflow-hidden">
      <div className="gutter max-w-[110rem] mx-auto">
        <h2 className="font-plush text-huge text-center text-[#2a170e] max-w-[13ch] mx-auto mb-[clamp(2.5rem,6vh,4.5rem)]">
          Two ways to
          <br />
          meet your puppy
        </h2>

        {/* Forked Signpost + Two Path Columns */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start lg:pb-24">
          {/* Left Path: Puppies in Dubai Showroom */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="mb-10 sm:mb-12 lg:-mr-6 relative z-10">
              <div className="tp-wood-plank inline-flex items-center px-6 h-14 sm:h-16 rounded-l-full rounded-r-md border-[3px] border-[#2a170e] shadow-[0_7px_0_-3px_rgba(42,23,14,0.25)] -rotate-2">
                <span className="font-plush text-[clamp(1.35rem,2.1vw,2.1rem)] text-[#2a170e] whitespace-nowrap">
                  Puppies in Dubai
                </span>
              </div>
            </div>

            {/* Dubai Skyline Line Art + Showroom Window */}
            <div className="relative w-full max-w-[360px] h-[240px] flex items-end justify-center mb-5">
              <svg
                viewBox="0 0 360 130"
                className="absolute inset-x-0 bottom-5 w-full h-32 pointer-events-none"
                aria-hidden="true"
              >
                <path
                  d="M8 128 L8 82 L44 82 L44 128 M58 128 L58 50 L96 50 L96 128 M112 128 L112 22 L120 8 L128 22 L128 128 M232 128 L232 58 L268 58 L268 128 M280 128 L280 86 L326 86 L326 128 M0 128 L360 128"
                  fill="none"
                  stroke="rgba(42, 23, 14, 0.28)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Striped Awning Showroom Window */}
              <div className="relative z-10 w-[clamp(8.5rem,12vw,11rem)]">
                <div className="h-5 -mx-2 rounded-t-lg rounded-b-sm border-[3px] border-[#2a170e] bg-[repeating-linear-gradient(90deg,#c2622b_0px,#c2622b_16px,#fffdf8_16px,#fffdf8_32px)]" />
                <div className="relative aspect-[4/4.5] border-x-[3px] border-b-[3px] border-[#2a170e] rounded-b-[0.6rem] bg-[#fbe3b4] shadow-[inset_0_0_0_5px_#fffdf8] overflow-hidden">
                  <Image
                    src="/images/puppies/pomeranian-orange.svg"
                    alt="Puppies in our Dubai Showroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mt-1.5 inline-block font-scrawl text-[0.95rem] text-[#2a170e]">
                  In our showroom
                </span>
              </div>
            </div>

            <p className="text-[1rem] text-[#5a3a28] max-w-[38ch] leading-relaxed mb-5">
              See them, love them, take them home. Come meet our locally available
              puppies before you decide.
            </p>
            <Link href="/puppies?origin=dubai" className="btn-terracotta">
              Meet local puppies
            </Link>
          </div>

          {/* Center Wooden Signpost */}
          <div className="lg:col-span-2 flex justify-center -my-4 lg:my-0 lg:self-stretch">
            <WoodenSignpost />
          </div>

          {/* Right Path: Imported from Korea */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-10 sm:mb-12 lg:-ml-6 relative z-10">
              <div className="tp-wood-plank inline-flex items-center px-6 h-14 sm:h-16 rounded-r-full rounded-l-md border-[3px] border-[#2a170e] shadow-[0_7px_0_-3px_rgba(42,23,14,0.25)] rotate-[1.5deg]">
                <span className="font-plush text-[clamp(1.35rem,2.1vw,2.1rem)] text-[#2a170e] whitespace-nowrap">
                  Imported for you
                </span>
              </div>
            </div>

            <div className="w-full max-w-[380px] h-[240px] flex items-center mb-5">
              <FlightArc />
            </div>

            <p className="text-[1rem] text-[#5a3a28] max-w-[38ch] leading-relaxed mb-5">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s
              most reputable breeders and let us handle the import.
            </p>
            <Link href="/puppies?origin=korea" className="btn-terracotta">
              See imported puppies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
