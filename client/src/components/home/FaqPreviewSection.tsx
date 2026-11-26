import Link from "next/link";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import type { FaqItem } from "@/lib/types";

interface FaqPreviewSectionProps {
  faqs: FaqItem[];
}

const NIGHT_STARS = [
  { left: "8%", top: "14%", size: 12, delay: "0s" },
  { left: "22%", top: "36%", size: 8, delay: "0.6s" },
  { left: "38%", top: "12%", size: 10, delay: "1.1s" },
  { left: "72%", top: "6%", size: 14, delay: "1.6s" },
  { left: "89%", top: "24%", size: 9, delay: "2.1s" },
  { left: "93%", top: "68%", size: 11, delay: "0.9s" },
  { left: "64%", top: "82%", size: 8, delay: "2.5s" },
  { left: "16%", top: "78%", size: 10, delay: "1.4s" },
];

export function FaqPreviewSection({ faqs }: FaqPreviewSectionProps) {
  const featured = faqs.slice(0, 3);

  return (
    <section className="relative bg-gradient-to-b from-[#4d2b19] to-[#2f1a10] text-[#fffdf8] py-[clamp(4.5rem,10vh,7rem)] overflow-hidden">
      {/* Twinkling 4-point SVG Stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {NIGHT_STARS.map((star, idx) => (
          <svg
            key={idx}
            viewBox="0 0 40 40"
            className="tp-twinkle absolute text-[#f2be6b]"
            style={{ left: star.left, top: star.top, width: `${star.size}px`, animationDelay: star.delay }}
          >
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
        ))}
      </div>

      <div className="gutter relative max-w-[110rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[clamp(3rem,7vw,8rem)] items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 relative">
            <h2 className="font-plush text-huge text-[#fffdf8]">
              Questions,
              <br />
              answered
            </h2>

            <div>
              <Link href="/faq" className="btn-outline-light">
                Read all questions
              </Link>
            </div>

            <div className="relative pt-4 w-[clamp(9.5rem,24vw,13rem)]">
              <span
                className="tp-wonder-float font-scrawl text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-[#f2be6b] absolute -top-2 left-[58%] select-none"
                aria-hidden="true"
              >
                ?
              </span>
              <MascotPuppy pose="walking" className="w-28 h-28 sm:w-36 sm:h-32" animateFloat />
            </div>
          </div>

          {/* Right Column: Star-Bulleted Q&As */}
          <div className="lg:col-span-7 space-y-[clamp(2rem,4.5vh,3.25rem)]">
            {featured.map((item) => (
              <div key={item._id}>
                <h3 className="font-plush text-[clamp(1.4rem,2vw,1.95rem)] leading-[1.12] text-[#fffdf8] flex items-start gap-3">
                  <svg viewBox="0 0 40 40" className="w-[1.15rem] h-[1.15rem] text-[#f2be6b] shrink-0 mt-1" aria-hidden="true">
                    <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
                  </svg>
                  <span>{item.question}</span>
                </h3>
                <p className="mt-2.5 pl-[1.9rem] text-[1rem] text-[#fffdf8]/80 max-w-[58ch] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
