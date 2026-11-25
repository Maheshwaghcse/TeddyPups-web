import Image from "next/image";
import type { HappyFamily } from "@/lib/types";

interface PolaroidCardProps {
  family: HappyFamily;
}

/** Polaroid frame with translucent masking tape, slight tilt, and handwritten caption. */
export function PolaroidCard({ family }: PolaroidCardProps) {
  return (
    <article
      className="relative bg-white p-2.5 sm:p-3 pb-4 rounded-[4px] shadow-[0_14px_28px_rgba(20,9,4,0.35)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] hover:z-10"
      style={{ transform: `rotate(${family.tiltDeg ?? -1.5}deg)` }}
    >
      {/* Colored Masking Tape at Top */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-5 rotate-[-2deg] rounded-[2px] shadow-xs pointer-events-none"
        style={{ backgroundColor: family.tapeColor || "rgba(235, 203, 152, 0.85)" }}
        aria-hidden="true"
      />

      {/* Photo Viewport */}
      <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-[#EFE3D2]">
        <Image
          src={family.imageUrl}
          alt={family.caption}
          fill
          className="object-cover"
        />
      </div>

      {/* Handwritten Caption */}
      <p className="mt-2.5 text-center font-[family-name:var(--font-script)] text-base sm:text-lg font-semibold text-[#361D10] leading-snug">
        {family.caption}
      </p>
    </article>
  );
}

