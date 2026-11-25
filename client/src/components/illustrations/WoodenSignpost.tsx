import { MascotPuppy } from "./MascotPuppy";

/** Center wooden signpost pointing between "Puppies in Dubai" and "Imported for you". */
export function WoodenSignpost() {
  return (
    <div className="relative flex flex-col items-center select-none" aria-hidden="true">
      <svg viewBox="0 0 420 145" className="w-[310px] sm:w-[390px] h-auto drop-shadow-sm">
        {/* Vertical wooden post */}
        <rect x="200" y="10" width="20" height="135" rx="4" fill="#9E6234" stroke="#472716" strokeWidth="2.5" />
        {/* Left directional plank */}
        <path
          d="M204 26 L42 26 L18 51 L42 76 L204 76 Z"
          fill="#C58952"
          stroke="#472716"
          strokeWidth="2.5"
        />
        <text
          x="118"
          y="57"
          textAnchor="middle"
          fill="#361D10"
          fontSize="17"
          fontWeight="800"
          fontFamily="var(--font-display)"
        >
          Puppies in Dubai
        </text>
        {/* Right directional plank */}
        <path
          d="M216 38 L378 38 L402 63 L378 88 L216 88 Z"
          fill="#D49B63"
          stroke="#472716"
          strokeWidth="2.5"
        />
        <text
          x="304"
          y="69"
          textAnchor="middle"
          fill="#361D10"
          fontSize="17"
          fontWeight="800"
          fontFamily="var(--font-display)"
        >
          Imported for you
        </text>
      </svg>
      <div className="-mt-8 md:mt-20">
        <MascotPuppy pose="walking" className="w-20 h-20" animateFloat />
      </div>
    </div>
  );
}

