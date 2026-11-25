"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PuppyDoorCard } from "@/components/puppies/PuppyDoorCard";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Puppy } from "@/lib/types";

interface PuppyDetailClientProps {
  puppy: Puppy;
  related: Puppy[];
}

export function PuppyDetailClient({ puppy, related }: PuppyDetailClientProps) {
  const [activeImage, setActiveImage] = useState(
    puppy.images[0] ?? "/images/puppies/maltipoo-cream.svg"
  );

  const displayName = puppy.name || puppy.title;

  return (
    <div className="bg-gradient-to-b from-[#FAF0DC] via-[#F7E8CC] to-[#EECA94] py-10 sm:py-14">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Breadcrumb */}
        <Link
          href="/puppies"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#9E4B1D] hover:text-[#7B3610]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all puppies
        </Link>

        {/* Main 2-Column Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Arched Portrait + Thumbnails */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/4.6] w-full rounded-t-[999px] rounded-b-3xl overflow-hidden border-[3px] border-[#361D10] bg-[#FFF8EB] shadow-lg">
              <Image
                src={activeImage}
                alt={displayName}
                fill
                className="object-cover"
              />
              <span className="absolute top-6 right-6 px-3.5 py-1 rounded-full bg-white border-2 border-[#361D10] text-xs font-extrabold text-[#361D10] rotate-6 shadow-xs">
                {puppy.status === "available"
                  ? "Available"
                  : puppy.status === "reserved"
                  ? "Reserved"
                  : "Gone Home"}
              </span>
            </div>

            {puppy.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {puppy.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === img
                        ? "border-[#9E4B1D] scale-105 shadow-md"
                        : "border-[#D8C09E] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${displayName} view ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specs + Health + WhatsApp & Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D8C09E] text-xs font-bold text-[#4A2B18]">
                {puppy.origin === "dubai" ? (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-[#9E4B1D]" />
                    In Downtown Dubai Showroom (Same-day meetup)
                  </>
                ) : (
                  <>
                    <Plane className="w-3.5 h-3.5 text-[#1B7F4B]" />
                    Seoul Partner Breeder (Concierge Korea → Dubai import)
                  </>
                )}
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#361D10] tracking-tight">
                {displayName}
              </h1>

              <p className="text-lg font-extrabold text-[#9E4B1D]">
                AED {puppy.priceAed.toLocaleString()}
              </p>

              <p className="text-sm sm:text-base text-[#5C3D2B] leading-relaxed">
                {puppy.description}
              </p>
            </div>

            {/* Key Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Breed", value: puppy.breed },
                { label: "Gender", value: puppy.gender },
                { label: "Age", value: puppy.ageLabel },
                { label: "Est. Adult Weight", value: puppy.expectedAdultWeight },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-[#FFF9ED] border border-[#DFC7A3] p-3.5"
                >
                  <p className="text-[11px] font-semibold text-[#8A654A]">{stat.label}</p>
                  <p className="mt-1 text-sm font-extrabold text-[#361D10] capitalize">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Personality & Health Checklist */}
            <div className="rounded-2xl bg-[#FFF9ED] border border-[#DFC7A3] p-5 space-y-4">
              {puppy.personalityTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {puppy.personalityTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F3E2C4] text-xs font-bold text-[#4A2B18]"
                    >
                      <Sparkles className="w-3 h-3 text-[#9E4B1D]" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-[#EAD8BB] grid grid-cols-2 gap-2.5 text-xs font-bold text-[#361D10]">
                {[
                  { ok: puppy.healthChecks.vaccinated, label: "Age-appropriate vaccinations" },
                  { ok: puppy.healthChecks.dewormed, label: "Dewormed & parasite-checked" },
                  { ok: puppy.healthChecks.vetCertificate, label: "Licensed vet certificate" },
                  { ok: puppy.healthChecks.microchipped, label: "Microchipped & passport" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        item.ok ? "text-[#1B7F4B]" : "text-gray-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary WhatsApp Action */}
            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl(
                  `Hi TeddyPups! I'd love more photos/videos and details about ${displayName} (${puppy.breed}, ${puppy.ageLabel}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm sm:text-base"
              >
                Enquire about {displayName} on WhatsApp
              </a>
            </div>

            {/* Direct MongoDB-backed Inquiry Form */}
            <div className="rounded-3xl bg-[#FFF9ED] border-2 border-[#361D10] p-6 sm:p-7 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#9E4B1D]" />
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#361D10]">
                  Reserve or book a showroom meetup
                </h2>
              </div>
              <ContactForm
                defaultInquiryType="puppy-enquiry"
                puppyId={puppy._id}
                puppySlug={puppy.slug}
                puppyLabel={`${displayName} (${puppy.breed})`}
                defaultBreed={puppy.breed}
              />
            </div>
          </div>
        </div>

        {/* Related Puppies */}
        {related.length > 0 && (
          <section className="pt-8 border-t border-[#D8B98E] space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-black text-[#361D10]">
                More puppies looking for homes
              </h2>
              <Link href="/puppies" className="btn-outline-dark text-xs sm:text-sm">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((p) => (
                <PuppyDoorCard key={p._id} puppy={{ ...p, defaultDoorOpen: true }} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

