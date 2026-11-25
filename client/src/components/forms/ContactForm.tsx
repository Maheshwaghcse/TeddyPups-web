"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitInquiry } from "@/lib/api";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { InquiryPayload } from "@/lib/types";

interface ContactFormProps {
  defaultInquiryType?: InquiryPayload["inquiryType"];
  puppyId?: string;
  puppySlug?: string;
  puppyLabel?: string;
  defaultBreed?: string;
}

const BREED_OPTIONS = ["Maltipoo", "Pomeranian", "Toy Poodle", "Cavapoo", "Shih Tzu", "Not sure yet"];

export function ContactForm({
  defaultInquiryType = "showroom-visit",
  puppyId,
  puppySlug,
  puppyLabel,
  defaultBreed = "",
}: ContactFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [inquiryType, setInquiryType] =
    useState<InquiryPayload["inquiryType"]>(defaultInquiryType);
  const [preferredBreed, setPreferredBreed] = useState(defaultBreed);
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState(
    puppyLabel
      ? `Hi TeddyPups! I'd love to enquire about ${puppyLabel}.`
      : ""
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await submitInquiry({
        fullName,
        email,
        whatsappNumber,
        inquiryType,
        puppyId: puppyId ?? null,
        puppySlug: puppySlug ?? "",
        preferredBreed,
        preferredDate,
        message,
      });
      setSubmittedMsg(res.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send inquiry. Please verify the API server is running or reach us on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedMsg) {
    const waText = `Hi TeddyPups! My name is ${fullName}. ${message}`;
    return (
      <div className="rounded-2xl bg-[#ECF7F1] border-2 border-[#1B7F4B] p-6 sm:p-8 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-[#1B7F4B] mx-auto" />
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#361D10]">
          Inquiry Sent!
        </h3>
        <p className="text-sm text-[#3E5847] max-w-md mx-auto leading-relaxed">
          {submittedMsg}
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={buildWhatsAppUrl(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm"
          >
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmittedMsg(null);
              setMessage("");
            }}
            className="btn-outline-dark text-sm"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-[#FDECEA] border border-[#C84B3B] px-4 py-3 text-xs sm:text-sm text-[#8F261A] font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#4A2B18] mb-1.5">
            Full name *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Sarah Al Maktoum"
            className="w-full rounded-xl border border-[#D8C09E] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4A2B18] mb-1.5">
            Email address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[#D8C09E] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#4A2B18] mb-1.5">
            Phone / WhatsApp number *
          </label>
          <input
            type="tel"
            required
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="+971 50 000 0000"
            className="w-full rounded-xl border border-[#D8C09E] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4A2B18] mb-1.5">
            Inquiry type
          </label>
          <select
            value={inquiryType}
            onChange={(e) =>
              setInquiryType(e.target.value as InquiryPayload["inquiryType"])
            }
            className="w-full rounded-xl border border-[#D8C09E] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
          >
            <option value="showroom-visit">Book Dubai Showroom Visit</option>
            <option value="puppy-enquiry">Available Puppy Enquiry</option>
            <option value="import-request">Korea Teacup Import Request</option>
            <option value="general">General Question</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!puppyLabel && (
          <div>
            <label className="block text-xs font-bold text-[#4A2B18] mb-1.5">
              Preferred breed
            </label>
            <select
              value={preferredBreed}
              onChange={(e) => setPreferredBreed(e.target.value)}
              className="w-full rounded-xl border border-[#D8C09E] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
            >
              <option value="">Select a breed (optional)</option>
              {BREED_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={puppyLabel ? "sm:col-span-2" : ""}>
          <label className="block text-xs font-bold text-[#4A2B18] mb-1.5">
            Preferred visit / delivery date (optional)
          </label>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full rounded-xl border border-[#D8C09E] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#4A2B18] mb-1.5">
          Your message *
        </label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your home, preferred gender or age, or when you'd like to visit our Downtown Dubai showroom..."
          className="w-full rounded-xl border border-[#D8C09E] bg-[#FFFDF8] px-3.5 py-2.5 text-sm text-[#361D10] focus:outline-none focus:ring-2 focus:ring-[#9E4B1D]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-terracotta w-full text-sm sm:text-base disabled:opacity-60 cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending inquiry...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send inquiry
          </>
        )}
      </button>
    </form>
  );
}

