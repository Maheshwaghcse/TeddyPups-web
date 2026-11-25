import { fetchHappyFamilies } from "@/lib/api";
import { HappyFamiliesClient } from "@/components/families/HappyFamiliesClient";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";

export const dynamic = "force-dynamic";

export default async function HappyFamiliesPage() {
  const families = await fetchHappyFamilies();

  return (
    <div className="bg-gradient-to-b from-[#9B5326] via-[#87431A] to-[#331C10] min-h-screen py-14 sm:py-20 text-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex justify-center">
            <MascotPuppy pose="sitting" className="w-20 h-20" animateFloat />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-black tracking-tight">
            Happy families &amp; puppies
          </h1>
          <p className="text-sm sm:text-base text-[#F5DEC7] leading-relaxed">
            Real moments shared by TeddyPups families across Dubai, Abu Dhabi, and
            around the world after welcoming their new best friend home.
          </p>
        </div>

        <HappyFamiliesClient families={families} />
      </div>
    </div>
  );
}

