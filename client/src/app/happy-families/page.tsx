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
        <header className="text-center max-w-2xl mx-auto space-y-4">
          <p className="font-scrawl text-sm sm:text-base text-[#a24a1a] lowercase">
            our wall of happy endings
          </p>
          <h1 className="font-plush text-[clamp(2.75rem,7vw,5.5rem)] text-[#2a170e]">
            Happy families
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#5a3a28]">
            Real moments shared by TeddyPups families across Dubai, Abu Dhabi, and
            around the world after welcoming their new best friend home.
          </p>
          <p className="font-scrawl text-sm text-[#8e3f15]">
            {families.length} moments and counting
          </p>
        </header>

        {quote && (
          <blockquote className="mt-10 sm:mt-14 mx-auto max-w-2xl text-center">
            <p className="font-plush-text text-xl sm:text-2xl leading-snug text-[#3a2013]">
              &ldquo;{quote.testimonialQuote}&rdquo;
            </p>
            <footer className="mt-3 text-sm font-semibold text-[#a24a1a]">
              {quote.clientName || "TeddyPups family"}
              {quote.location ? `, ${quote.location}` : ""}
            </footer>
          </blockquote>
        )}

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
