import Link from "next/link";
import { CheckCircle2, MapPin, Plane, ShieldCheck, Truck } from "lucide-react";
import { WhatsAppPhoneMockup } from "@/components/home/WhatsAppPhoneMockup";
import { PassportBook } from "@/components/illustrations/PassportBook";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const CONCIERGE_STEPS = [
  {
    step: "01",
    title: "Choose your breed or meet locally",
    text: "Browse available puppies in our Downtown Dubai showroom or tell us your dream Korean teacup breed, size, and personality.",
  },
  {
    step: "02",
    title: "Real photos, live videos & vet checks",
    text: "We send unedited videos directly on WhatsApp along with age, weight projections, vaccination records, and licensed vet health certificates.",
  },
  {
    step: "03",
    title: "Reservation & travel preparation",
    text: "For Dubai showroom puppies, collect the same day. For Korean imports, our team completes export permits, microchip registration, and IATA climate-controlled flight clearance.",
  },
  {
    step: "04",
    title: "Safe handover & 24/7 lifetime care",
    text: "Your puppy arrives comfortably at your home or showroom meetup, backed by our 24/7 WhatsApp care team for nutrition, training, and settling in.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-gradient-to-b from-[#FAF0DC] via-[#EECA94] to-[#E5B36E]">
      {/* Intro Hero */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="font-[family-name:var(--font-script)] text-2xl font-bold text-[#9E4B1D]">
              step-by-step concierge adoption
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#361D10] leading-[1.06] tracking-tight">
              How bringing home your TeddyPup works
            </h1>
            <p className="text-sm sm:text-base text-[#5C3D2B] leading-relaxed max-w-xl">
              Whether you visit our Downtown Dubai showroom today or reserve a rare
              Korean teacup puppy, every step is transparent, vet-verified, and
              supported 24/7.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/puppies" className="btn-terracotta text-sm">
                View available puppies
              </Link>
              <a
                href={buildWhatsAppUrl("Hi TeddyPups! Can you walk me through how adoption works?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <WhatsAppPhoneMockup />
          </div>
        </div>
      </section>

      {/* 4 Concierge Steps */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONCIERGE_STEPS.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl bg-[#FFF9ED] border-2 border-[#361D10] p-6 sm:p-8 shadow-sm space-y-3"
            >
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#9E4B1D] text-white text-xs font-extrabold">
                Step {item.step}
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#361D10]">
                {item.title}
              </h2>
              <p className="text-sm text-[#5C3D2B] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery & Collection Section (Matches Footer Link) */}
      <section
        id="delivery-collection"
        className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <div className="rounded-3xl bg-[#361D10] text-white p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black">
              Delivery &amp; Showroom Collection
            </h2>
            <p className="text-sm text-[#D9C3AE] leading-relaxed">
              Flexible, puppy-first logistics across Dubai, the UAE, and international
              destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/8 border border-white/15 p-5 space-y-2.5">
              <MapPin className="w-6 h-6 text-[#EBBF82]" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-black">
                Same-Day Dubai Collection
              </h3>
              <p className="text-xs sm:text-sm text-[#D9C3AE] leading-relaxed">
                Meet local puppies in Downtown Dubai and bring your chosen puppy home
                the very same day with starter essentials.
              </p>
            </div>

            <div className="rounded-2xl bg-white/8 border border-white/15 p-5 space-y-2.5">
              <Truck className="w-6 h-6 text-[#EBBF82]" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-black">
                UAE Chauffeur Delivery
              </h3>
              <p className="text-xs sm:text-sm text-[#D9C3AE] leading-relaxed">
                Air-conditioned private door-to-door delivery across Dubai, Abu Dhabi,
                Sharjah, and all Emirates.
              </p>
            </div>

            <div className="rounded-2xl bg-white/8 border border-white/15 p-5 space-y-2.5">
              <Plane className="w-6 h-6 text-[#EBBF82]" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-black">
                Korea &amp; Worldwide Air Care
              </h3>
              <p className="text-xs sm:text-sm text-[#D9C3AE] leading-relaxed">
                Climate-controlled IATA pet transport, MOCCAE/export permits, and vet
                clearance handled end-to-end (10–18 days typical import window).
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-6 text-xs sm:text-sm text-[#F2DEC5]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EBBF82]" /> Licensed veterinary health passport
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#EBBF82]" /> 24/7 post-arrival WhatsApp concierge
            </span>
          </div>
        </div>
      </section>

      {/* Passport Trust Spread */}
      <section className="pb-20 px-4 sm:px-6">
        <PassportBook />
      </section>
    </div>
  );
}

