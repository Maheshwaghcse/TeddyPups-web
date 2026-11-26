
import { fetchHappyFamilies } from "@/lib/api";
import { HappyFamiliesClient } from "@/components/families/HappyFamiliesClient";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";

export const dynamic = "force-dynamic";

export default async function HappyFamiliesPage() {
  const families = await fetchHappyFamilies();

  // Prefer the testimonial shown in the reference design.
  const quote =
    families.find((f) =>
      f.clientName?.toLowerCase().includes("sarah")
    ) ??
    families.find((f) => f.testimonialQuote);

  const testimonial =
    quote?.testimonialQuote ??
    "TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.";

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
      </section>

      {/* FAMILY PHOTOS */}
      <section className="tp-wall-gallery">
        <HappyFamiliesClient families={families} />
      </section>

      {/* BOTTOM MASCOT */}
      <div className="tp-wall-footer">
        <MascotPuppy
          pose="sitting"
          className="w-20 h-20"
          animateFloat
        />

        <p className="font-scrawl">
          every one of them was a Teddy Pup once
        </p>
      </div>
    </main>
  );
}
