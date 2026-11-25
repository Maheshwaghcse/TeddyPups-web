/** Warm Dubai skyline silhouette with glowing sunset orb bridging Passport & Happy Families. */
export function SkylineSunset() {
  return (
    <div className="relative w-full overflow-hidden -mb-1" aria-hidden="true">
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="w-full h-24 sm:h-32 md:h-40 block"
      >
        <defs>
          <radialGradient id="sunsetGlow" cx="68%" cy="72%" r="28%">
            <stop offset="0%" stopColor="#FFE19C" stopOpacity="1" />
            <stop offset="50%" stopColor="#F5B864" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C88147" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="980" cy="112" r="145" fill="url(#sunsetGlow)" />
        <circle cx="980" cy="118" r="46" fill="#FFE6A8" />
        {/* Dubai Skyline Silhouette */}
        <path
          d="M0,160 L0,132 L42,132 L42,110 L76,110 L76,134 L125,134 L125,95 L168,95 L168,125 L230,125 L230,78 L266,78 L266,120 L345,120 L345,90 L380,90 L380,126 L448,126 L448,66 L484,66 L484,118 L552,118 L552,44 L568,44 L574,10 L580,44 L596,44 L596,116 L660,116 L660,92 L706,92 L706,124 L795,124 L795,86 L832,86 L832,126 L925,126 L925,105 L964,105 L964,132 L1035,132 L1035,98 L1082,98 L1082,128 L1164,128 L1164,84 L1210,84 L1210,124 L1295,124 L1295,104 L1348,104 L1348,128 L1440,128 L1440,160 Z"
          fill="#9B5326"
        />
      </svg>
    </div>
  );
}

