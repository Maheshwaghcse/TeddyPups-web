/** Korea-to-Dubai dotted flight curve with gently bobbing airplane carrying a puppy portrait. */
export function FlightArc() {
  return (
    <svg viewBox="0 0 420 170" className="w-full max-w-[380px] h-auto mx-auto overflow-visible" aria-hidden="true">
      {/* Curved dotted flight trail */}
      <path
        d="M52 132 Q195 15 368 118"
        fill="none"
        stroke="#a24a1a"
        strokeWidth="3"
        strokeDasharray="3 11"
        strokeLinecap="round"
      />
      <circle cx="52" cy="132" r="5.5" fill="#a24a1a" />
      <circle cx="368" cy="118" r="5.5" fill="#a24a1a" />
      <text
        x="52"
        y="156"
        textAnchor="middle"
        fill="#5a3a28"
        fontSize="16"
        fontFamily="var(--font-script)"
      >
        Korea
      </text>
      <text
        x="368"
        y="144"
        textAnchor="middle"
        fill="#5a3a28"
        fontSize="16"
        fontFamily="var(--font-script)"
      >
        Dubai
      </text>

      {/* Cute Stylized Airplane with bobbing motion */}
      <g transform="translate(150, 26)">
        <g className="tp-plane-bob" style={{ transformOrigin: "55px 35px" }}>
          <path d="M40 24 L25 4 L50 8 L64 24 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
          <path d="M8 28 L0 10 L22 22 Z" fill="#c2622b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="58" cy="34" rx="52" ry="20" fill="#fffdf8" stroke="#2a170e" strokeWidth="3.2" />
          <circle cx="66" cy="32" r="13" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.8" />
          <circle cx="66" cy="33" r="8" fill="#e4a352" />
          <circle cx="63" cy="31" r="1.6" fill="#2a170e" />
          <circle cx="69" cy="31" r="1.6" fill="#2a170e" />
          <ellipse cx="66" cy="34.5" rx="2" ry="1.4" fill="#2a170e" />
          <path d="M36 42 L18 68 L48 64 L66 44 Z" fill="#c2622b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}
