import Image from "next/image";
import type { HappyFamily } from "@/lib/types";

interface PolaroidCardProps {
  family: HappyFamily;
}

/** Polaroid frame with jagged translucent masking tape, tilt, and smooth hover straighten. */
export function PolaroidCard({ family }: PolaroidCardProps) {
  return (
    <article
      className="group relative bg-[#fffefb] p-2.5 pb-0 rounded-[0.2rem] shadow-[0_1px_1px_rgba(42,23,14,0.12),0_10px_20px_-8px_rgba(42,23,14,0.36)] transition-all duration-450 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 hover:!rotate-0 hover:shadow-[0_1px_1px_rgba(42,23,14,0.12),0_18px_30px_-14px_rgba(42,23,14,0.42)] hover:z-10"
      style={{ transform: `rotate(${family.tiltDeg ?? -1.5}deg)` }}
    >
      {/* Jagged Translucent Masking Tape at Top */}
      <div
        className="tp-tape-jagged absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-[3deg] w-[clamp(4rem,34%,6.2rem)] h-[1.35rem] opacity-90 pointer-events-none z-20 transition-transform duration-350 group-hover:scale-105"
        style={{ backgroundColor: family.tapeColor || "rgba(246, 215, 154, 0.85)" }}
        aria-hidden="true"
      />

      {/* Photo Viewport */}
      <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-[1px] bg-[#e8dfd3] shadow-[inset_0_0_0_1px_rgba(42,23,14,0.08)]">
        <Image
          src={family.imageUrl}
          alt={family.caption}
          fill
          className="object-cover"
        />
      </div>

      {/* Handwritten Caption */}
      <p className="min-h-[2.6rem] py-2 px-1 text-center font-scrawl text-[0.95rem] sm:text-[1.02rem] text-[#5a3a28] leading-[1.2]">
        {family.caption}
      </p>
    </article>
  );
}
