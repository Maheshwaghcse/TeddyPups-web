import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { SITE_CONTACT, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-[#FAF0DC] via-[#F4DFBC] to-[#EBBF82] min-h-screen py-14 sm:py-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-[family-name:var(--font-script)] text-2xl font-bold text-[#9E4B1D]">
            say hello or book a cuddle session
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#361D10] tracking-tight">
            Visit &amp; contact TeddyPups
          </h1>
          <p className="text-sm sm:text-base text-[#5C3D2B] leading-relaxed">
            Meet our locally available puppies in our Downtown Dubai showroom or
            message our 24/7 concierge team for personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Showroom Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#361D10] text-white p-7 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-black">
                  Downtown Dubai Showroom
                </h2>
                <MascotPuppy pose="head" className="w-12 h-12 shrink-0" />
              </div>

              <div className="space-y-4 text-sm text-[#EBD9C6]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#EBBF82] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Location</p>
                    <p>{SITE_CONTACT.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#EBBF82] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Showroom Visits</p>
                    <p>Daily 11:00 AM – 9:00 PM (by appointment)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#EBBF82] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">WhatsApp 24/7</p>
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      {SITE_CONTACT.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#EBBF82] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Email</p>
                    <a
                      href={`mailto:${SITE_CONTACT.email}`}
                      className="underline hover:text-white"
                    >
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={buildWhatsAppUrl("Hi TeddyPups! I'd like to schedule a showroom visit in Downtown Dubai.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-sm"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FFF9ED] border-2 border-[#361D10] p-6 sm:p-9 shadow-lg space-y-5">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black text-[#361D10]">
                Send an inquiry or book a visit
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#6D5242]">
                Saved straight to our team queue—expect a reply shortly.
              </p>
            </div>
            <ContactForm defaultInquiryType="showroom-visit" />
          </div>
        </div>
      </div>
    </div>
  );
}

