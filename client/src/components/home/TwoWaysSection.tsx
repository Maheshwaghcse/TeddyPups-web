"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WoodenSignpost } from "@/components/illustrations/WoodenSignpost";

interface Point {
  x: number;
  y: number;
}

// Cubic Bezier control points for the flight route arc: M 44 166 C 120 40, 256 40, 334 158
const P0: Point = { x: 44, y: 166 };
const P1: Point = { x: 120, y: 40 };
const P2: Point = { x: 256, y: 40 };
const P3: Point = { x: 334, y: 158 };

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function getBezierPoint(t: number): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * P0.x + 3 * uu * t * P1.x + 3 * u * tt * P2.x + ttt * P3.x,
    y: uuu * P0.y + 3 * uu * t * P1.y + 3 * u * tt * P2.y + ttt * P3.y,
  };
}

function getBezierTangentAngle(t: number): number {
  const u = 1 - t;
  const dx =
    3 * u * u * (P1.x - P0.x) +
    6 * u * t * (P2.x - P1.x) +
    3 * t * t * (P3.x - P2.x);
  const dy =
    3 * u * u * (P1.y - P0.y) +
    6 * u * t * (P2.y - P1.y) +
    3 * t * t * (P3.y - P2.y);

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const SHOWROOM_PHOTOS = [
  "/images/puppies/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.webp",
  "/images/puppies/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.webp",
  "/images/puppies/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.webp",
];

export function TwoWaysSection() {
  const [showroomImgIdx, setShowroomImgIdx] = useState(0);
  const flightContainerRef = useRef<HTMLDivElement | null>(null);
  const arcPathRef = useRef<SVGPathElement | null>(null);
  const [flightProgress, setFlightProgress] = useState(0.05);
  const [arcLength, setArcLength] = useState(360);

  useEffect(() => {
    if (arcPathRef.current) {
      setArcLength(arcPathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateFlightOnScroll = () => {
      rafId = 0;
      const el = flightContainerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Take off as section enters lower viewport, fly along arc, and land as user scrolls down
      const startY = vh * 0.9;
      const endY = vh * 0.25;
      const raw = (startY - rect.top) / Math.max(1, startY - endY);

      const t = clamp(raw, 0, 1);
      // Smoothstep easing for smooth take-off and landing touchdown
      const eased = t * t * (3 - 2 * t);
      setFlightProgress(eased);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateFlightOnScroll);
      }
    };

    updateFlightOnScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const planePos = getBezierPoint(flightProgress);
  const tangentAngle = getBezierTangentAngle(flightProgress);

  // Gentle nose flare on the last 12% so the plane levels out as it lands at the arrowhead
  const landingFlare =
    flightProgress > 0.88 ? ((flightProgress - 0.88) / 0.12) * -18 : 0;
  const planeAngle = tangentAngle + landingFlare;
  const planeScale = 0.92 + Math.sin(flightProgress * Math.PI) * 0.18;

  return (
    <section
      data-puppy-section="two-ways"
      className="relative bg-gradient-to-b from-[#fbe3b4] to-[#f7d18d] py-[clamp(4.5rem,11vh,8rem)] overflow-hidden"
    >
      <div className="gutter max-w-[110rem] mx-auto">
        <h2 className="font-plush text-huge text-center text-[#2a170e] max-w-[13ch] mx-auto mb-[clamp(2.5rem,6vh,4.5rem)]">
          Two ways to
          <br />
          meet your puppy
        </h2>
        {/* Forked Signpost + Two Path Columns */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start lg:pb-24">
          {/* Left Path: Puppies in Dubai Showroom */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right">
            <div className="mb-10 sm:mb-12 lg:-mr-6 relative z-10">
              <div className="tp-wood-plank inline-flex items-center px-6 h-14 sm:h-16 rounded-l-full rounded-r-md border-[3px] border-[#2a170e] shadow-[0_7px_0_-3px_rgba(42,23,14,0.25)] -rotate-2">
                <span className="font-plush text-[clamp(1.35rem,2.1vw,2.1rem)] text-[#2a170e] whitespace-nowrap">
                  Puppies in Dubai
                </span>
              </div>
            </div>
            {/* Dubai Skyline Line Art + Showroom Window */}
            <div className="relative w-full max-w-[360px] h-[240px] flex items-end justify-center mb-5">
              <svg
                viewBox="0 0 360 130"
                className="absolute inset-x-0 bottom-5 w-full h-32 pointer-events-none"
                aria-hidden="true"
              >
                <path
                  d="M8 128 L8 82 L44 82 L44 128 M58 128 L58 50 L96 50 L96 128 M112 128 L112 22 L120 8 L128 22 L128 128 M232 128 L232 58 L268 58 L268 128 M280 128 L280 86 L326 86 L326 128 M0 128 L360 128"
                  fill="none"
                  stroke="rgba(42, 23, 14, 0.28)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Striped Awning Showroom Window */}
              <div className="relative z-10 w-[clamp(8.5rem,12vw,11rem)]">
                <div className="h-5 -mx-2 rounded-t-lg rounded-b-sm border-[3px] border-[#2a170e] bg-[repeating-linear-gradient(90deg,#c2622b_0px,#c2622b_16px,#fffdf8_16px,#fffdf8_32px)]" />
                <div className="relative aspect-[4/4.5] border-x-[3px] border-b-[3px] border-[#2a170e] rounded-b-[0.6rem] bg-[#fbe3b4] shadow-[inset_0_0_0_5px_#fffdf8] overflow-hidden">
                  <Image
                    src={SHOWROOM_PHOTOS[showroomImgIdx]}
                    alt="Puppies in our Dubai Showroom"
                    fill
                    sizes="200px"
                    unoptimized
                    onError={() => {
                      setShowroomImgIdx((prev) =>
                        prev + 1 < SHOWROOM_PHOTOS.length ? prev + 1 : prev
                      );
                    }}
                    className="object-cover"
                  />
                </div>
                <span className="mt-1.5 inline-block font-scrawl text-[0.95rem] text-[#2a170e]">
                  In our showroom
                </span>
              </div>
            </div>
            <p className="text-[1rem] text-[#5a3a28] max-w-[38ch] leading-relaxed mb-5">
              See them, love them, take them home. Come meet our locally available
              puppies before you decide.
            </p>
            <Link href="/puppies?origin=dubai" className="btn-terracotta">
              Meet local puppies
            </Link>
          </div>

          {/* Center Wooden Signpost */}
          <div className="lg:col-span-2 flex justify-center -my-4 lg:my-0 lg:self-stretch">
            <WoodenSignpost />
          </div>

          {/* Right Path: Imported from Korea (Scroll-Animated Airplane Arc) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-10 sm:mb-12 lg:-ml-6 relative z-10">
              <div className="tp-wood-plank inline-flex items-center px-6 h-14 sm:h-16 rounded-r-full rounded-l-md border-[3px] border-[#2a170e] shadow-[0_7px_0_-3px_rgba(42,23,14,0.25)] rotate-[1.5deg]">
                <span className="font-plush text-[clamp(1.35rem,2.1vw,2.1rem)] text-[#2a170e] whitespace-nowrap">
                  Imported for you
                </span>
              </div>
            </div>

            {/* Scroll-Driven Airplane Take-off, Curved Arrow Alignment & Landing */}
            <div
              ref={flightContainerRef}
              className="w-full max-w-[380px] h-[240px] flex items-center mb-5 select-none"
            >
              <svg
                viewBox="0 0 380 220"
                className="w-full h-full overflow-visible"
                aria-label="Flight route from Korea to Dubai"
              >
                <defs>
                  <filter
                    id="tpPlaneDropShadow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="3"
                      floodColor="#2a170e"
                      floodOpacity="0.22"
                    />
                  </filter>
                </defs>

                {/* Decorative clouds */}
                <g fill="#fffdf8" stroke="#2a170e" strokeWidth="2.2" opacity="0.9">
                  <path d="M82 68 C82 58 94 54 101 60 C107 52 122 54 125 64 C133 65 136 75 128 80 L84 80 C76 80 75 70 82 68 Z" />
                  <path d="M246 54 C246 46 256 42 262 47 C267 40 280 42 282 51 C289 52 292 60 285 65 L248 65 C241 65 240 56 246 54 Z" />
                </g>

                {/* Ground runway baseline */}
                <line
                  x1="24"
                  y1="176"
                  x2="356"
                  y2="176"
                  stroke="rgba(42, 23, 14, 0.2)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Dashed flight curve from Korea to Dubai */}
                <path
                  ref={arcPathRef}
                  d="M 44 166 C 120 40, 256 40, 334 158"
                  fill="none"
                  stroke="rgba(42, 23, 14, 0.32)"
                  strokeWidth="3"
                  strokeDasharray="7 7"
                  strokeLinecap="round"
                />

                {/* Highlighted progress trail following the plane */}
                <path
                  d="M 44 166 C 120 40, 256 40, 334 158"
                  fill="none"
                  stroke="#c2622b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={arcLength}
                  strokeDashoffset={arcLength * (1 - flightProgress)}
                />

                {/* Curved Route Arrowhead at Dubai end */}
                <g transform="translate(334, 158) rotate(56)">
                  <path
                    d="M -11 -6 L 2 0 L -11 6"
                    fill="none"
                    stroke="#2a170e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Origin Pin: Korea */}
                <g transform="translate(44, 166)">
                  <circle
                    r="7"
                    fill="#fffdf8"
                    stroke="#2a170e"
                    strokeWidth="3"
                  />
                  <circle r="3" fill="#c2622b" />
                  <rect
                    x="-32"
                    y="13"
                    width="64"
                    height="22"
                    rx="11"
                    fill="#fffdf8"
                    stroke="#2a170e"
                    strokeWidth="2.2"
                  />
                  <text
                    x="0"
                    y="28"
                    textAnchor="middle"
                    className="font-plush text-[11px] fill-[#2a170e]"
                  >
                    Korea
                  </text>
                </g>

                {/* Destination Pin: Dubai */}
                <g transform="translate(334, 166)">
                  <circle
                    r="8"
                    fill="#c2622b"
                    stroke="#2a170e"
                    strokeWidth="3"
                  />
                  <circle r="3" fill="#fffdf8" />
                  <rect
                    x="-32"
                    y="13"
                    width="64"
                    height="22"
                    rx="11"
                    fill="#2a170e"
                  />
                  <text
                    x="0"
                    y="28"
                    textAnchor="middle"
                    className="font-plush text-[11px] fill-[#fffdf8]"
                  >
                    Dubai
                  </text>
                </g>

                {/* Airplane aligned to the curve tangent as it takes off, cruises, and lands */}
                <g
                  transform={`translate(${planePos.x.toFixed(
                    2
                  )}, ${planePos.y.toFixed(2)}) rotate(${planeAngle.toFixed(
                    2
                  )}) scale(${planeScale.toFixed(3)})`}
                  filter="url(#tpPlaneDropShadow)"
                >
                  {/* Jet contrail lines */}
                  {flightProgress > 0.03 && flightProgress < 0.96 && (
                    <g opacity="0.75">
                      <line
                        x1="-26"
                        y1="-3"
                        x2="-38"
                        y2="-3"
                        stroke="#fffdf8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="-24"
                        y1="3"
                        x2="-34"
                        y2="3"
                        stroke="#fffdf8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </g>
                  )}

                  {/* Airplane body oriented toward +X (0 deg) so tangent rotation aligns nose to path */}
                  <g>
                    {/* Far wing */}
                    <path
                      d="M -4 -2 L -12 -18 L -3 -18 L 8 -2 Z"
                      fill="#e38c59"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />
                    {/* Tail fin */}
                    <path
                      d="M -18 -2 L -25 -14 L -16 -14 L -10 -2 Z"
                      fill="#c2622b"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />
                    {/* Fuselage */}
                    <path
                      d="M -22 -4 C -10 -7, 10 -7, 20 -2 C 25 0, 25 3, 20 5 C 10 7, -12 7, -22 3 Z"
                      fill="#fffdf8"
                      stroke="#2a170e"
                      strokeWidth="2.6"
                      strokeLinejoin="round"
                    />
                    {/* Cockpit */}
                    <path
                      d="M 12 -3 C 16 -3, 19 -1, 19 1 L 12 1 Z"
                      fill="#2a170e"
                    />
                    {/* Cabin windows */}
                    <circle cx="-4" cy="0" r="1.6" fill="#2a170e" />
                    <circle cx="2" cy="0" r="1.6" fill="#2a170e" />
                    <circle cx="8" cy="0" r="1.6" fill="#2a170e" />
                    {/* Near wing */}
                    <path
                      d="M -2 2 L -11 18 L -1 18 L 9 2 Z"
                      fill="#c2622b"
                      stroke="#2a170e"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <p className="text-[1rem] text-[#5a3a28] max-w-[38ch] leading-relaxed mb-5">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s
              most reputable breeders and let us handle the import.
            </p>
            <Link href="/puppies?origin=korea" className="btn-terracotta">
              See imported puppies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}