import { MascotPuppy } from "./MascotPuppy";

/** Warmly lit wooden house front door at night with welcome mat and glowing paw-print trail. */
export function NightHouseDoor() {
  return (
    <div className="relative mx-auto max-w-[520px] pt-4 pb-2 flex flex-col items-center">
      {/* Subtle glowing paw trail descending from top-left */}
      <svg
        viewBox="0 0 120 120"
        className="hidden sm:block absolute -left-12 -top-10 w-24 h-24 opacity-40 pointer-events-none"
        aria-hidden="true"
      >
        <g fill="#B97843">
          <circle cx="24" cy="20" r="3" />
          <circle cx="38" cy="40" r="3" />
          <circle cx="52" cy="64" r="3.5" />
          <circle cx="68" cy="88" r="3.5" />
        </g>
      </svg>

      <div className="relative w-full max-w-[390px]">
        {/* Walking puppy mascot greeting the doorway */}
        <div className="absolute -left-2 sm:-left-6 top-8 z-10">
          <MascotPuppy pose="walking" className="w-20 h-20 sm:w-24 sm:h-24" animateFloat />
        </div>

        <svg viewBox="0 0 380 220" className="w-full h-auto drop-shadow-[0_18px_36px_rgba(0,0,0,0.45)]">
          <defs>
            <radialGradient id="porchLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE8A3" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#E69F4E" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#331C10" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* House Timber Facade */}
          <rect x="28" y="20" width="324" height="175" rx="8" fill="#4B2816" stroke="#241208" strokeWidth="3" />
          <g stroke="#391D0F" strokeWidth="2">
            <line x1="28" y1="50" x2="352" y2="50" />
            <line x1="28" y1="80" x2="352" y2="80" />
            <line x1="28" y1="110" x2="352" y2="110" />
            <line x1="28" y1="140" x2="352" y2="140" />
            <line x1="28" y1="170" x2="352" y2="170" />
          </g>

          {/* Glowing Porch Sconce */}
          <circle cx="268" cy="86" r="46" fill="url(#porchLight)" />
          <rect x="259" y="72" width="18" height="24" rx="8" fill="#FFE79C" stroke="#854B22" strokeWidth="2" />

          {/* Arched Front Door */}
          <path
            d="M140 195 L140 86 A50 50 0 0 1 240 86 L240 195 Z"
            fill="#9B4D1E"
            stroke="#59280D"
            strokeWidth="5"
          />
          <path
            d="M148 195 L148 88 A42 42 0 0 1 232 88 L232 195 Z"
            fill="none"
            stroke="#BF6D38"
            strokeWidth="2"
          />
          {/* Glowing Porthole Window */}
          <circle cx="190" cy="88" r="18" fill="#FCE2A6" stroke="#59280D" strokeWidth="3" />
          {/* Brass Doorknob */}
          <circle cx="222" cy="138" r="4.5" fill="#F2C86B" />

          {/* Left Potted Shrub */}
          <polygon points="88,162 118,162 113,195 93,195" fill="#9E5225" stroke="#241208" strokeWidth="2" />
          <circle cx="103" cy="148" r="19" fill="#5D874B" stroke="#241208" strokeWidth="2" />
          <circle cx="94" cy="144" r="12" fill="#73A15F" />

          {/* Right Potted Shrub */}
          <polygon points="262,162 292,162 287,195 267,195" fill="#9E5225" stroke="#241208" strokeWidth="2" />
          <circle cx="277" cy="148" r="19" fill="#5D874B" stroke="#241208" strokeWidth="2" />
          <circle cx="286" cy="144" r="12" fill="#73A15F" />

          {/* Porch Step */}
          <rect x="12" y="195" width="356" height="16" rx="4" fill="#2A160B" />

          {/* Welcome Home Doormat */}
          <rect x="145" y="191" width="90" height="16" rx="3" fill="#D5A66E" stroke="#6E4422" strokeWidth="1.5" />
          <text
            x="190"
            y="202"
            textAnchor="middle"
            fill="#472716"
            fontSize="9"
            fontWeight="700"
            fontFamily="var(--font-script)"
          >
            welcome home
          </text>
        </svg>
      </div>
    </div>
  );
}

