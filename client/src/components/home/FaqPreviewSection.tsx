import Link from "next/link";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import type { FaqItem } from "@/lib/types";

interface FaqPreviewSectionProps {
  faqs: FaqItem[];
}

export function FaqPreviewSection({ faqs }: FaqPreviewSectionProps) {
  const featured = faqs.slice(0, 3);

  return (
    <section className="relative night-stars-bg text-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5 relative">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight">
              Questions,
              <br />
              answered
            </h2>

            <div className="flex items-start gap-4">
              <Link href="/faq" className="btn-outline-light text-sm">
                Read all questions
              </Link>
              <span
                className="font-[family-name:var(--font-display)] text-3xl font-black text-[#D99B52] rotate-6 select-none"
                aria-hidden="true"
              >
                ?
              </span>
            </div>

            <div className="hidden sm:block pt-3">
              <MascotPuppy pose="walking" className="w-20 h-20" animateFloat />
            </div>
          </div>

          {/* Right Column: Star-Bulleted Q&As */}
          <div className="lg:col-span-7 space-y-8">
            {featured.map((item) => (
              <div key={item._id} className="space-y-2">
                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-[22px] font-black text-white flex items-start gap-2.5">
                  <span className="text-[#E6B366] text-lg leading-7 shrink-0" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item.question}</span>
                </h3>
                <p className="pl-7 text-sm text-[#D9C3AE] leading-relaxed">
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

