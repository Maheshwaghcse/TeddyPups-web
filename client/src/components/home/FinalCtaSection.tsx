import Link from "next/link";
import { NightHouseDoor } from "@/components/illustrations/NightHouseDoor";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCtaSection() {
  return (
    <section className="relative night-stars-bg text-white pt-6 pb-16 sm:pb-24 px-4 sm:px-6 text-center">
      <div className="max-w-[820px] mx-auto space-y-5">
        <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight">
          Ready to meet your
          <br />
          new best friend?
        </h2>

        <p className="text-sm sm:text-base text-[#D9C3AE] max-w-lg mx-auto leading-relaxed">
          Bring home a healthy, happy teacup or designer puppy with expert guidance
          every step of the way. We help you find the right match and ensure a
          smooth, safe delivery across the UAE.
        </p>

        {/* Illuminated Night House Entryway */}
        <NightHouseDoor />

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href={buildWhatsAppUrl("Hi TeddyPups! I'm ready to meet my new best friend.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm sm:text-[15px]"
          >
            Enquire on WhatsApp
          </a>
          <Link href="/contact" className="btn-outline-light text-sm sm:text-[15px]">
            Visit &amp; contact
          </Link>
        </div>
      </div>
    </section>
  );
}

