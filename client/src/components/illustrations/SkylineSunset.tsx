/** Warm Dubai skyline silhouette with glowing sunset orb bridging Passport & Happy Families. */
export function SkylineSunset() {
  return (
    <div className="relative w-full h-[clamp(5rem,12vw,10rem)] overflow-hidden -mb-px pointer-events-none" aria-hidden="true">
      {/* Setting Sunset Orb */}
      <div
        className="tp-sun-scroll absolute bottom-[18%] left-[62%] w-[clamp(7rem,16vw,13rem)] aspect-square rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, #ffd27f 0%, #ffd27f 70%, rgba(242,190,107,0.45) 73%, transparent 100%)",
        }}
      />

      {/* Dubai Skyline Silhouette matching HappyFamilies top sky color (#a65a30) */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-full block"
      >
        <path
          d="M0,160 L0,132 L42,132 L42,110 L76,110 L76,134 L125,134 L125,95 L168,95 L168,125 L230,125 L230,78 L266,78 L266,120 L345,120 L345,90 L380,90 L380,126 L448,126 L448,66 L484,66 L484,118 L552,118 L552,44 L568,44 L574,10 L580,44 L596,44 L596,116 L660,116 L660,92 L706,92 L706,124 L795,124 L795,86 L832,86 L832,126 L925,126 L925,105 L964,105 L964,132 L1035,132 L1035,98 L1082,98 L1082,128 L1164,128 L1164,84 L1210,84 L1210,124 L1295,124 L1295,104 L1348,104 L1348,128 L1440,128 L1440,160 Z"
          fill="#a65a30"
        />
      </svg>
    </div>
  );
}
