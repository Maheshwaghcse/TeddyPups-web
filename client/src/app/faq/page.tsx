import Link from "next/link";
import { fetchFaqs } from "@/lib/api";
import { FaqAccordionClient } from "@/components/faq/FaqAccordionClient";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await fetchFaqs();

  return (
    <div className="night-stars-bg text-white min-h-screen py-14 sm:py-20">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex justify-center">
            <MascotPuppy pose="walking" className="w-20 h-20" animateFloat />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-black tracking-tight">
            Questions, answered
          </h1>
          <p className="text-sm sm:text-base text-[#D9C3AE] leading-relaxed">
            Everything you want to know about vet certifications, visiting our
            Downtown Dubai showroom, and Korean teacup puppy imports.
          </p>
        </div>

        <FaqAccordionClient faqs={faqs} />

        {/* Still have questions CTA */}
        <div className="rounded-3xl bg-[#472716] border border-white/15 p-8 text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black">
            Still wondering about a breed or arrival date?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={buildWhatsAppUrl("Hi TeddyPups! I have a question about your puppies.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              Ask on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline-light text-sm">
              Visit &amp; contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

