import { PassportBook } from "@/components/illustrations/PassportBook";
import { SkylineSunset } from "@/components/illustrations/SkylineSunset";

export function TrustPassportSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#f0b866] to-[#a65a30] pt-[clamp(4rem,9vh,6.5rem)] overflow-x-clip">
      <div className="gutter max-w-[96rem] mx-auto pb-8 sm:pb-12">
        <PassportBook />
      </div>
      <SkylineSunset />
    </section>
  );
}
