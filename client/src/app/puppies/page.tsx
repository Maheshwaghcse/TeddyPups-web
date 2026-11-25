import { fetchPuppies } from "@/lib/api";
import { PuppyCatalogClient } from "@/components/puppies/PuppyCatalogClient";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";

export const dynamic = "force-dynamic";

interface PuppiesPageProps {
  searchParams: Promise<{
    origin?: string;
    status?: string;
    breed?: string;
  }>;
}

export default async function PuppiesPage({ searchParams }: PuppiesPageProps) {
  const sp = await searchParams;
  const puppies = await fetchPuppies();

  return (
    <div className="bg-gradient-to-b from-[#FAF0DC] via-[#F7E8CC] to-[#EECA94] min-h-screen py-12 sm:py-16">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-[family-name:var(--font-script)] text-2xl font-bold text-[#9E4B1D]">
              meet your future best friend
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#361D10] tracking-tight">
              Available &amp; Featured Puppies
            </h1>
            <p className="text-sm sm:text-base text-[#6D5242] max-w-2xl">
              Visit our locally available puppies in Downtown Dubai or reserve an
              exclusive Korean teacup breed with concierge air-care delivery. Hover or
              click any wooden door to meet each pup.
            </p>
          </div>
          <MascotPuppy pose="standing" className="w-24 h-24 shrink-0 hidden md:block" animateFloat />
        </div>

        <PuppyCatalogClient
          initialPuppies={puppies}
          initialOrigin={sp.origin ?? "all"}
          initialStatus={sp.status ?? "all"}
          initialBreed={sp.breed ?? "all"}
        />
      </div>
    </div>
  );
}

