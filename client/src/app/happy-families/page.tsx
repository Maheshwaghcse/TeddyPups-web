import { fetchHappyFamilies } from "@/lib/api";
import { HappyFamiliesClient } from "@/components/families/HappyFamiliesClient";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";

export const dynamic = "force-dynamic";

export default async function HappyFamiliesPage() {
  const families = await fetchHappyFamilies();
  const quote = families.find((f) => f.testimonialQuote);

  return (
    <div className="tp-wall-page relative overflow-hidden bg-[#fff1d8] text-[#2a170e] pt-16 sm:pt-24 pb-28 sm:pb-36">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          <header>
            <p className="font-scrawl text-base sm:text-lg text-toffee-ink">
              our wall of happy endings
            </p>
            <h1 className="relative inline-block font-plush text-[clamp(2.75rem,7vw,5.5rem)] text-cocoa mt-2">
              Happy families
              <svg
                viewBox="0 0 48 44"
                className="absolute -top-3 -right-10 sm:-right-14 w-8 sm:w-11 text-toffee rotate-12"
                aria-hidden="true"
              >
                <path
                  d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h1>
            <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft">
              Nothing makes us happier than seeing our puppies in loving homes! Here
              are some beautiful moments shared by our amazing clients after
              welcoming their furry friends.
            </p>
            <p className="font-scrawl mt-5 text-base sm:text-lg text-toffee-ink">
              {families.length} moments and counting
            </p>
          </header>

          <figure className="relative mx-auto lg:mx-0 max-w-md lg:justify-self-end bg-[#fffefb] p-6 sm:p-8 rounded-[0.2rem] rotate-[1.5deg] shadow-[0_1px_1px_rgba(42,23,14,0.12),0_14px_28px_-10px_rgba(42,23,14,0.36)]">
            <span
              aria-hidden="true"
              className="tp-tape-jagged absolute -top-3 left-1/2 -translate-x-1/2 -rotate-[3deg] w-24 h-6 opacity-90"
              style={{ backgroundColor: "#cfe5f6" }}
            />
            <blockquote className="font-plush-text text-base sm:text-lg leading-relaxed text-[#3a2013]">
              &ldquo;{quote?.testimonialQuote ??
                "TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind."}&rdquo;
            </blockquote>
            <figcaption className="font-scrawl mt-4 text-sm sm:text-base text-toffee-ink">
              {quote ? `${quote.clientName || "TeddyPups family"}, ${quote.location}` : "Sarah M., Dubai, UAE"}
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 sm:mt-16">
          <HappyFamiliesClient families={families} />
        </div>

        <div className="mt-20 sm:mt-28 flex flex-col items-center gap-3 text-center">
          <MascotPuppy pose="sitting" className="w-20 h-20" animateFloat />
          <p className="font-scrawl text-sm sm:text-base text-[#5a3a28]">
            every one of them was a Teddy Pup once
          </p>
        </div>
      </div>
    </div>
  );
}
