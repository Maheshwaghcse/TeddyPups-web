import Link from "next/link";
import { NightHouseDoor } from "@/components/illustrations/NightHouseDoor";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCtaSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#2f1a10] to-[#24130b] text-[#fffdf8] pt-[clamp(4.5rem,10vh,7rem)] pb-[clamp(5rem,11vh,8rem)] text-center overflow-hidden">
      <div className="gutter max-w-[110rem] mx-auto">
        <h2 className="font-plush text-huge text-[#fffdf8] max-w-[15ch] mx-auto">
          Ready to meet your
          <br />
          new best friend?
        </h2>

        <p className="mt-5 text-[clamp(1.05rem,1.3vw,1.3rem)] leading-[1.55] text-[#fffdf8]/80 max-w-[52ch] mx-auto">
          Bring home a healthy, happy teacup or designer puppy with expert guidance
          every step of the way. We help you find the right match and ensure a
          smooth, safe delivery across the UAE.
        </p>

        {/* Illuminated Night House Entryway with Opening Door */}
        <NightHouseDoor />

        <div className="pt-[clamp(2rem,4vh,2.75rem)] flex flex-wrap items-center justify-center gap-3">
          <a
            href={buildWhatsAppUrl("Hi TeddyPups! I'm ready to meet my new best friend.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            Enquire on WhatsApp
          </a>
          <Link href="/contact" className="btn-outline-light">
            Visit &amp; contact
          </Link>
        </div>
      </div>
    </section>
  );
}
