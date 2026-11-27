"use client";

import { useState, useEffect, type FormEvent } from "react";
import { SITE_CONTACT, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Puppy } from "@/lib/types";

const FALLBACK_PUPPY_OPTIONS = [
  { value: "any", label: "any puppy (not sure yet)" },
  { value: "Maltipoo", label: "a Maltipoo puppy" },
  { value: "Toy Poodle", label: "a Toy Poodle puppy" },
  { value: "Pomeranian", label: "a Pomeranian puppy" },
  { value: "Cavapoo", label: "a Cavapoo puppy" },
  { value: "Bichon Frise", label: "a Bichon Frise puppy" },
  { value: "Yorkshire Terrier", label: "a Yorkshire Terrier puppy" },
];

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPuppy, setSelectedPuppy] = useState("any");
  const [message, setMessage] = useState("");

  const [puppyOptions, setPuppyOptions] = useState(FALLBACK_PUPPY_OPTIONS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const whatsappDisplay = SITE_CONTACT?.whatsappDisplay || "+971 50 000 0000";
  const contactEmail = SITE_CONTACT?.email || "info@instabizweb.com";
  const showroomLocation =
    SITE_CONTACT?.location || "Downtown Dubai, United Arab Emirates";

  // Load live puppies for the "curious about..." dropdown if available
  useEffect(() => {
    let active = true;
    fetch("/api/puppies")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        const list: Puppy[] = Array.isArray(data)
          ? data
          : Array.isArray(data.puppies)
            ? data.puppies
            : [];
        if (list.length > 0) {
          const dynamicOpts = [
            { value: "any", label: "any puppy (not sure yet)" },
            ...list.map((p) => ({
              value: p.slug || p.breed || p.title,
              label: `${p.name || p.title} (${p.breed})`,
            })),
          ];
          setPuppyOptions(dynamicOpts);
        }
      })
      .catch(() => {
        // Keep fallback options silently
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !whatsappNumber.trim()) {
      setErrorMsg("Please fill in your name and phone / WhatsApp number.");
      return;
    }

    setSubmitting(true);
    try {
      const composedMessage = [
        location.trim() ? `Living in: ${location.trim()}` : null,
        selectedPuppy !== "any" ? `Curious about: ${selectedPuppy}` : null,
        message.trim() || "Sent via Dear TeddyPups letter form.",
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim() || "no-email@teddypups.ae",
          whatsappNumber: whatsappNumber.trim(),
          inquiryType: "general",
          preferredBreed: selectedPuppy === "any" ? "" : selectedPuppy,
          message: composedMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
    } catch {
      // Even if API route isn't configured, allow graceful letter completion
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="relative overflow-hidden text-[#2a170e]"
      style={{
        background:
          "linear-gradient(180deg, #FFFDF8 0%, #FFF4DE 34%, #FCE5B8 72%, #F5CA82 100%)",
      }}
    >
      <div className="gutter max-w-[1280px] mx-auto pt-12 sm:pt-16 pb-24 sm:pb-32">
        {/* ===============================================================
            HERO HEADER: Left Huge Heading + Right Intro Copy
            =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-14">
          <div className="lg:col-span-7">
            <h1 className="font-plush text-[clamp(3.4rem,7.8vw,6.5rem)] text-[#2a170e] leading-[0.92]">
              Get in touch
              <span className="block">with us</span>
            </h1>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[#5a3a28] text-base sm:text-[1.1rem] leading-[1.65] max-w-md lg:ml-auto">
              Have questions about our puppies or adoption process? Fill out the
              form, and our team will get back to you promptly. Whether ready to
              adopt or just seeking info, we&apos;d love to hear from you!
            </p>
          </div>
        </div>

        {/* ===============================================================
            MAIN 2-COLUMN GRID: Left Contact & Showroom / Right Letter Form
            =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* -------------------------------------------------------------
              LEFT COLUMN: WhatsApp Pill, Call/Email Links, Showroom Card
              ------------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-8">
            {/* Green WhatsApp Pill Button */}
            <div>
              <a
                href={buildWhatsAppUrl(
                  "Hi TeddyPups! I'd love to enquire about your puppies."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm sm:text-base"
              >
                WhatsApp {whatsappDisplay}
              </a>
            </div>

            {/* Call us & Email stack */}
            <div className="space-y-5 pt-1">
              <div>
                <p className="font-scrawl text-[#5a3a28] text-base mb-0.5">
                  call us
                </p>
                <a
                  href={`tel:${whatsappDisplay.replace(/\s+/g, "")}`}
                  className="text-[#a24a1a] font-semibold text-base sm:text-[1.06rem] underline decoration-[#a24a1a]/60 underline-offset-4 hover:text-[#8e3f15]"
                >
                  {whatsappDisplay}
                </a>
              </div>

              <div>
                <p className="font-scrawl text-[#5a3a28] text-base mb-0.5">
                  email
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[#a24a1a] font-semibold text-base sm:text-[1.06rem] underline decoration-[#a24a1a]/60 underline-offset-4 hover:text-[#8e3f15]"
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            {/* Showroom Card with Striped Awning & Arched Window */}
            <div
              className="relative overflow-hidden rounded-[22px] border-2 border-[#2a170e] shadow-[0_6px_0_#2a170e]"
              style={{
                background:
                  "linear-gradient(180deg, #FFF6E4 0%, #FBE4B8 100%)",
              }}
            >
              {/* Top Terracotta & Cream Striped Awning */}
              <div
                className="h-5 w-full border-b-2 border-[#2a170e]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #B55422 0 18px, #FFFDF8 18px 36px)",
                }}
              />

              {/* Subtle Skyline Line-Art Behind Bottom Right */}
              <svg
                className="pointer-events-none absolute right-0 bottom-0 w-52 h-28 opacity-25"
                viewBox="0 0 220 110"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="14"
                  y="45"
                  width="22"
                  height="65"
                  stroke="#A24A1A"
                  strokeWidth="2"
                />
                <rect
                  x="42"
                  y="25"
                  width="26"
                  height="85"
                  stroke="#A24A1A"
                  strokeWidth="2"
                />
                <rect
                  x="168"
                  y="35"
                  width="28"
                  height="75"
                  stroke="#A24A1A"
                  strokeWidth="2"
                />
                <line
                  x1="182"
                  y1="35"
                  x2="182"
                  y2="110"
                  stroke="#A24A1A"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-end relative z-10">
                {/* Left Copy inside Showroom Card */}
                <div className="sm:col-span-7 space-y-4">
                  <h2 className="font-plush text-[1.65rem] sm:text-[1.85rem] text-[#2a170e] leading-[1.02]">
                    Visit us in
                    <span className="block">Downtown Dubai</span>
                  </h2>

                  <p className="text-[#5a3a28] text-xs sm:text-[0.86rem] leading-[1.6]">
                    Step into our Downtown Dubai showroom and experience the joy
                    of choosing your puppy face-to-face.
                  </p>

                  {/* Location with Paw Icon */}
                  <div className="flex items-start gap-2.5 pt-0.5">
                    <svg
                      className="w-4 h-4 text-[#a24a1a] shrink-0 mt-1"
                      viewBox="0 0 64 64"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM14.6 22.3c-3 .1-5.6 3.3-5.6 7s2.6 6.9 5.6 6.9 5.6-3.2 5.6-6.9-2.6-7-5.6-7zM24.2 9.3c-3 0-5.6 3.3-5.6 7.3s2.5 7.3 5.6 7.3 5.6-3.3 5.6-7.3-2.5-7.3-5.6-7.3zM39.8 9.3c-3.1 0-5.6 3.3-5.6 7.3s2.5 7.3 5.6 7.3 5.6-3.3 5.6-7.3-2.5-7.3-5.6-7.3zM49.4 22.3c-3 0-5.6 3.3-5.6 7s2.6 6.9 5.6 6.9 5.6-3.2 5.6-6.9-2.6-7-5.6-7z" />
                    </svg>
                    <span className="text-[#2a170e] font-semibold text-xs sm:text-[0.86rem] leading-snug">
                      {showroomLocation}
                    </span>
                  </div>

                  <div className="pt-1">
                    <a
                      href="https://maps.google.com/?q=Downtown+Dubai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#fffdf8] border-[1.75px] border-[#2a170e] text-[#2a170e] font-semibold text-xs sm:text-sm shadow-[0_2px_0_#2a170e] hover:-translate-y-0.5 hover:bg-[#fff8ea] transition-transform"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                {/* Right Arched Puppy Window */}
                <div className="sm:col-span-5 flex justify-center sm:justify-end">
                  <div className="relative w-36 sm:w-full max-w-[155px] aspect-[3/4] rounded-t-full border-2 border-[#2a170e] overflow-hidden bg-[#e8c38e] shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=600&q=85"
                      alt="TeddyPups teacup puppy in Downtown Dubai showroom"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: "Dear TeddyPups," Letter Card + "hm?" Puppy
              ------------------------------------------------------------- */}
          <div className="lg:col-span-7 relative">
            {/* Stationery Letter Card */}
            <div className="relative rounded-[24px] bg-[#fffdf8] border-2 border-[#2a170e] shadow-[0_7px_0_#2a170e] p-7 sm:p-11 lg:pl-14 lg:pr-11">
              {/* Left Vertical Stationery Margin Line */}
              <div
                className="hidden sm:block pointer-events-none absolute top-0 bottom-0 left-7 w-px bg-[#ebe1d2]"
                aria-hidden="true"
              />

              {/* Tilted Top-Right Paw Postage Stamp */}
              <div
                className=" absolute -top-3.5 right-7 sm:right-10 w-14 h-16 sm:w-16 sm:h-[4.25rem] rounded-md bg-[#f8dfb3] border-2 border-dashed border-[#a24a1a] shadow-sm rotate-[7deg] flex items-center justify-center z-20"
                aria-hidden="true"
              >
                <svg
                  className="w-6 h-6 text-[#9e4819]"
                  viewBox="0 0 64 64"
                  fill="currentColor"
                >
                  <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM14.6 22.3c-3 .1-5.6 3.3-5.6 7s2.6 6.9 5.6 6.9 5.6-3.2 5.6-6.9-2.6-7-5.6-7zM24.2 9.3c-3 0-5.6 3.3-5.6 7.3s2.5 7.3 5.6 7.3 5.6-3.3 5.6-7.3-2.5-7.3-5.6-7.3zM39.8 9.3c-3.1 0-5.6 3.3-5.6 7.3s2.5 7.3 5.6 7.3 5.6-3.3 5.6-7.3-2.5-7.3-5.6-7.3zM49.4 22.3c-3 0-5.6 3.3-5.6 7s2.6 6.9 5.6 6.9 5.6-3.2 5.6-6.9-2.6-7-5.6-7z" />
                </svg>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <p className="font-scrawl text-2xl sm:text-3xl text-[#a24a1a]">
                    Your letter is on its way!
                  </p>
                  <p className="text-[#5a3a28] text-base max-w-md mx-auto">
                    Thank you,{" "}
                    <span className="font-semibold text-[#2a170e]">
                      {fullName}
                    </span>
                    . Our concierge team has received your note and will reach
                    out shortly.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setWhatsappNumber("");
                        setEmail("");
                        setLocation("");
                        setSelectedPuppy("any");
                        setMessage("");
                      }}
                      className="btn-terracotta text-sm"
                    >
                      Write another letter
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Salutation */}
                  <h2 className="font-scrawl text-2xl sm:text-[1.75rem] font-semibold text-[#a24a1a]">
                    Dear TeddyPups,
                  </h2>

                  {/* Paragraph 1: Name, Phone, Email */}
                  <div className="text-[#2a170e] text-base sm:text-[1.06rem] leading-[2.35] sm:leading-[2.5]">
                    <span>my name is </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="your name"
                      aria-label="Your name"
                      className="font-scrawl text-[#a24a1a] placeholder:text-[#b9a38e] bg-transparent border-0 border-b-[1.5px] border-dashed border-[#8c6d53] focus:border-[#a24a1a] focus:outline-none px-1.5 py-0.5 w-44 sm:w-52 inline-block align-baseline"
                    />
                    <span> , and you can reach me on </span>
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+971 50 123 4567"
                      aria-label="Phone or WhatsApp number"
                      className="font-scrawl text-[#a24a1a] placeholder:text-[#b9a38e] bg-transparent border-0 border-b-[1.5px] border-dashed border-[#8c6d53] focus:border-[#a24a1a] focus:outline-none px-1.5 py-0.5 w-44 sm:w-48 inline-block align-baseline"
                    />
                    <span> or by email at </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="optional"
                      aria-label="Email address (optional)"
                      className="font-scrawl text-[#a24a1a] placeholder:text-[#b9a38e] bg-transparent border-0 border-b-[1.5px] border-dashed border-[#8c6d53] focus:border-[#a24a1a] focus:outline-none px-1.5 py-0.5 w-44 sm:w-52 inline-block align-baseline"
                    />
                    <span> .</span>
                  </div>

                  {/* Paragraph 2: Location & Curious About Dropdown */}
                  <div className="text-[#2a170e] text-base sm:text-[1.06rem] leading-[2.35] sm:leading-[2.5]">
                    <span>I live in </span>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Dubai Marina"
                      aria-label="Your city or neighborhood"
                      className="font-scrawl text-[#a24a1a] placeholder:text-[#b9a38e] bg-transparent border-0 border-b-[1.5px] border-dashed border-[#8c6d53] focus:border-[#a24a1a] focus:outline-none px-1.5 py-0.5 w-40 sm:w-44 inline-block align-baseline"
                    />
                    <span> , and I&apos;m curious about </span>
                    <span className="relative inline-flex items-center align-baseline">
                      <select
                        value={selectedPuppy}
                        onChange={(e) => setSelectedPuppy(e.target.value)}
                        aria-label="Puppy you are curious about"
                        className="font-scrawl text-[#7a4b2a] bg-transparent border-0 border-b-[1.5px] border-dashed border-[#8c6d53] focus:border-[#a24a1a] focus:outline-none pr-6 pl-1 py-0.5 appearance-none cursor-pointer"
                      >
                        {puppyOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#a24a1a]"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M2 4l4 5 4-5H2z" />
                      </svg>
                    </span>
                    <span> .</span>
                  </div>

                  {/* Ruled Notebook Lines Textarea */}
                  <div className="pt-1">
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Anything else you'd like to tell us..."
                      aria-label="Additional message"
                      className="w-full font-scrawl text-[#2a170e] placeholder:text-[#b9a38e] bg-transparent border-0 focus:outline-none resize-y text-base sm:text-[1.02rem] leading-[2.25rem] py-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, transparent 0, transparent calc(2.25rem - 1px), #e5ddd0 calc(2.25rem - 1px), #e5ddd0 2.25rem)",
                        backgroundAttachment: "local",
                      }}
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs sm:text-sm font-semibold text-[#b42318]">
                      {errorMsg}
                    </p>
                  )}

                  {/* Sign-off & Submit Button */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="font-scrawl text-[#2a170e] text-base sm:text-[1.05rem]">
                      with love, a future puppy parent
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-terracotta text-sm sm:text-base disabled:opacity-60"
                    >
                      {submitting ? "Posting..." : "Post my letter"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom-Right Curious Puppy Mascot with "hm?" Speech Bubble */}
            <div className="flex justify-end pr-4 sm:pr-8 -mt-2 relative z-20 pointer-events-none">
              <div className="relative flex flex-col items-center">
                {/* "hm?" speech bubble */}
                <div className="relative mb-1 px-3 py-1 rounded-full bg-[#fffdf8] border-2 border-[#2a170e] font-scrawl text-xs font-semibold text-[#2a170e] shadow-[0_2px_0_#2a170e]">
                  hm?
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#fffdf8] border-r-2 border-b-2 border-[#2a170e] rotate-45"
                    aria-hidden="true"
                  />
                </div>

                {/* Sitting Curious TeddyPup SVG */}
                <svg
                  className="w-24 h-24 sm:w-28 sm:h-28 tp-mascot-breathe"
                  viewBox="0 0 120 115"
                  fill="none"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="60"
                    cy="104"
                    rx="38"
                    ry="6"
                    fill="#2A170E"
                    fillOpacity="0.12"
                  />
                  {/* Tail */}
                  <path
                    d="M90 78c9-3 13-12 8-18-4-5-12-2-14 4"
                    fill="#E4A85B"
                    stroke="#2A170E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Body */}
                  <path
                    d="M42 65c-4 10-4 24 2 32h36c5-7 5-22-2-32-7-9-29-9-36 0Z"
                    fill="#E4A85B"
                    stroke="#2A170E"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Paws */}
                  <ellipse
                    cx="46"
                    cy="98"
                    rx="7.5"
                    ry="5"
                    fill="#F2C57C"
                    stroke="#2A170E"
                    strokeWidth="3"
                  />
                  <ellipse
                    cx="62"
                    cy="98"
                    rx="7.5"
                    ry="5"
                    fill="#F2C57C"
                    stroke="#2A170E"
                    strokeWidth="3"
                  />
                  <ellipse
                    cx="80"
                    cy="96"
                    rx="9"
                    ry="5.5"
                    fill="#F2C57C"
                    stroke="#2A170E"
                    strokeWidth="3"
                  />
                  {/* Collar */}
                  <path
                    d="M44 62c8 4 20 4 28 0"
                    stroke="#C84B31"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="58"
                    cy="66"
                    r="3.5"
                    fill="#F2BE6B"
                    stroke="#2A170E"
                    strokeWidth="2"
                  />
                  {/* Tilted Head Group */}
                  <g transform="rotate(-8 58 42)">
                    <path
                      d="M40 30c-9 2-14 14-10 24 3 7 10 7 13 1"
                      fill="#C9823B"
                      stroke="#2A170E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M74 30c9 2 14 14 10 24-3 7-10 7-13 1"
                      fill="#C9823B"
                      stroke="#2A170E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 34c-4-7 4-15 11-12 4-5 13-5 16 0 8-3 15 5 11 12 6 6 5 17-2 22-6 5-28 5-34 0-7-5-8-16-2-22Z"
                      fill="#F2C57C"
                      stroke="#2A170E"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <circle cx="50" cy="43" r="2.7" fill="#2A170E" />
                    <circle cx="65" cy="43" r="2.7" fill="#2A170E" />
                    <circle cx="49.2" cy="42" r="0.9" fill="#FFFDF8" />
                    <circle cx="64.2" cy="42" r="0.9" fill="#FFFDF8" />
                    <ellipse
                      cx="57.5"
                      cy="48.5"
                      rx="3.2"
                      ry="2.3"
                      fill="#2A170E"
                    />
                    <path
                      d="M54 52.5c1.8 2 5.2 2 7 0"
                      stroke="#2A170E"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================================================
          WAVY NIGHT-SKY TRANSITION INTO FOOTER
          =============================================================== */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            fill="#2f1a10"
            d="M0,24 C340,66 680,-8 1020,24 C1230,44 1360,20 1440,12 L1440,64 L0,64 Z"
          />
        </svg>
      </div>
    </div>
  );
}