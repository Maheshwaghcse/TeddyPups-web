import Link from "next/link";
import { PuppyDoorCard } from "@/components/puppies/PuppyDoorCard";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import type { Puppy } from "@/lib/types";

interface MeetPupsSectionProps {
  puppies: Puppy[];
}

export function MeetPupsSection({ puppies }: MeetPupsSectionProps) {
  const featured = puppies.slice(0, 8);

  return (
    <section className="relative bg-gradient-to-b from-[#FBF2DF] via-[#F9EBD0] to-[#F3DBB3] pt-14 sm:pt-20 overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#361D10] tracking-tight">
              Meet the pups
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6D5242]">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>
          <Link href="/puppies" className="btn-terracotta text-sm shrink-0 self-start sm:self-auto">
            See all available puppies
          </Link>
        </div>

        {/* Arched Wooden Door Puppy Grid */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 pb-8">
          {featured.map((puppy) => (
            <PuppyDoorCard
              key={puppy._id}
              puppy={puppy}
              highlightTitle={puppy.slug === "copper-male"}
            />
          ))}
        </div>

        {/* Playful Mascot by Floorboard */}
        <div className="relative flex justify-start pl-4 sm:pl-16 -mb-4 z-20 pointer-events-none">
          <MascotPuppy pose="standing" className="w-20 h-20 sm:w-24 sm:h-24" animateFloat />
        </div>
      </div>

      {/* Horizontal Wooden Floorboard Strip Transition */}
      <div
        className="w-full h-11 bg-[#D69D5E] border-t-2 border-[#6B3A19] grid grid-cols-4 sm:grid-cols-6"
        aria-hidden="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-r border-[#8A5026]/40 h-full" />
        ))}
      </div>
    </section>
  );
}

