import { PolaroidCard } from "./PolaroidCard";
import type { HappyFamily } from "@/lib/types";

/** Photo ratios cycled through the wall so it reads as a natural scattered collage. */
const RATIOS = ["4 / 5", "3 / 4", "1 / 1", "4 / 5", "3 / 4", "5 / 6"];

export function HappyFamiliesClient({ families }: { families: HappyFamily[] }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 lg:gap-8">
      {families.map((family, i) => (
        <div key={family._id} className="break-inside-avoid mb-5 sm:mb-8 px-1 pt-3">
          <PolaroidCard family={family} ratio={RATIOS[i % RATIOS.length]} />
        </div>
      ))}
    </div>
  );
}
