import Image from "next/image";
import Link from "next/link";
import { WoodenSignpost } from "@/components/illustrations/WoodenSignpost";
import { FlightArc } from "@/components/illustrations/FlightArc";

export function TwoWaysSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#EECA94] to-[#EBBF82] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-center text-[#361D10] leading-[1.08] tracking-tight mb-8 sm:mb-10">
          Two ways to
          <br />
          meet your puppy
        </h2>

        {/* Signpost + Two Path Columns */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left Path: Puppies in Dubai Showroom */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            {/* Dubai Skyline Line Art + Showroom Window */}
            <div className="relative w-full max-w-[300px] h-[185px] flex items-end justify-center mb-4">
              {/* Subtle Skyline Outline */}
              <svg
                viewBox="0 0 300 120"
                className="absolute inset-x-0 bottom-0 w-full h-28 opacity-45 pointer-events-none"
                aria-hidden="true"
              >
                <path
                  d="M10 118 L10 72 L45 72 L45 118 M60 118 L60 45 L95 45 L95 118 M205 118 L205 55 L240 55 L240 118 M250 118 L250 82 L290 82 L290 118"
                  fill="none"
                  stroke="#7D4D26"
                  strokeWidth="2"
                />
              </svg>

              {/* Striped Awning Showroom Window */}
              <div className="relative z-10 w-[132px]">
                <div className="h-4 rounded-t-md border-2 border-[#361D10] bg-[repeating-linear-gradient(90deg,#9E4B1D_0px,#9E4B1D_14px,#FFF9EE_14px,#FFF9EE_28px)]" />
                <div className="relative aspect-[4/4.3] border-x-2 border-b-2 border-[#361D10] bg-[#FAF0DC] overflow-hidden shadow-md">
                  <Image
                    src="/images/puppies/pomeranian-orange.svg"
                    alt="Puppies in our Dubai Showroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mt-1.5 inline-block text-[11px] font-bold text-[#4B2C1B]">
                  In our Showroom
                </span>
              </div>
            </div>

            <p className="text-sm text-[#4A2B18] max-w-xs leading-relaxed mb-5">
              See them, love them, take them home. Come meet our locally available
              puppies before you decide.
            </p>
            <Link href="/puppies?origin=dubai" className="btn-terracotta text-sm">
              Meet local puppies
            </Link>
          </div>

          {/* Center Wooden Signpost */}
          <div className="md:col-span-2 flex justify-center -my-4 md:my-0">
            <WoodenSignpost />
          </div>

          {/* Right Path: Imported from Korea */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="w-full mb-4">
              <FlightArc />
            </div>

            <p className="text-sm text-[#4A2B18] max-w-xs leading-relaxed mb-5">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s
              most reputable breeders and let us handle the import.
            </p>
            <Link href="/puppies?origin=korea" className="btn-terracotta text-sm">
              See imported puppies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

