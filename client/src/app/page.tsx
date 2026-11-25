import { fetchFaqs, fetchHappyFamilies, fetchPuppies } from "@/lib/api";
import { HeroSection } from "@/components/home/HeroSection";
import { MeetPupsSection } from "@/components/home/MeetPupsSection";
import { TwoWaysSection } from "@/components/home/TwoWaysSection";
import { PuppyJourneySection } from "@/components/home/PuppyJourneySection";
import { TrustPassportSection } from "@/components/home/TrustPassportSection";
import { HappyFamiliesSection } from "@/components/home/HappyFamiliesSection";
import { FaqPreviewSection } from "@/components/home/FaqPreviewSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [puppies, families, faqs] = await Promise.all([
    fetchPuppies({ featured: true }),
    fetchHappyFamilies({ featured: true }),
    fetchFaqs({ featured: true }),
  ]);

  return (
    <>
      <HeroSection />
      <MeetPupsSection puppies={puppies} />
      <TwoWaysSection />
      <PuppyJourneySection />
      <TrustPassportSection />
      <HappyFamiliesSection families={families} />
      <FaqPreviewSection faqs={faqs} />
      <FinalCtaSection />
    </>
  );
}

