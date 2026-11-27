import Link from "next/link";
import type { FaqItem } from "@/lib/types";

interface FaqPreviewSectionProps {
  faqs: FaqItem[];
}

export function FaqPreviewSection({ faqs }: FaqPreviewSectionProps) {
  const featured = faqs.slice(0, 3);

  return (
    <section
      data-puppy-section="faq-preview"
      className="relative bg-gradient-to-b from-[#3a2114] to-[#2f1a10] text-[#fffdf8] py-[clamp(4.5rem,10vh,7.5rem)] overflow-hidden"
    >
      {/* Twinkling Starfield */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-[#f2be6b]/60 select-none"
      >
        <span className="absolute top-[12%] left-[8%] text-sm">✦</span>
        <span className="absolute top-[18%] left-[41%] text-xs">✦</span>
        <span className="absolute top-[8%] right-[14%] text-xs">✧</span>
        <span className="absolute bottom-[22%] left-[34%] text-xs">✦</span>
        <span className="absolute bottom-[14%] right-[6%] text-sm">✦</span>
      </div>

      <div className="gutter max-w-[110rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Heading + CTA + Floating ? Mark */}
          <div className="lg:col-span-5">
            <h2 className="font-plush text-huge text-[#fffdf8]">
              Questions,
              <br />
              answered
            </h2>

            <div className="mt-7 relative inline-flex flex-col items-center">
              <Link href="/faq" className="btn-outline-light">
                Read all questions
              </Link>
              <span
                aria-hidden="true"
                className="mt-3 font-plush text-[2.2rem] leading-none text-[#f2be6b] rotate-[8deg] select-none"
              >
                ?
              </span>
            </div>
          </div>

          {/* Right Column: 3 Featured Star-Bulleted Q&As */}
          <div className="lg:col-span-7 space-y-10">
            {featured.map((item) => (
              <article key={item._id} className="relative pl-7">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 text-[#f2be6b] text-base leading-none"
                >
                  ✦
                </span>
                <h3 className="font-plush text-[clamp(1.4rem,2.1vw,1.95rem)] leading-[1.15] text-[#fffdf8]">
                  {item.question}
                </h3>
                <p className="mt-2.5 text-[clamp(0.98rem,1.15vw,1.1rem)] leading-[1.6] text-[#fffdf8]/80 max-w-[58ch]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}