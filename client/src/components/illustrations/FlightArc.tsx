/** Korea-to-Dubai dotted flight curve with airplane carrying a puppy portrait. */
export function FlightArc() {
  return (
    <svg viewBox="0 0 420 170" className="w-full max-w-[380px] h-auto mx-auto" aria-hidden="true">
      {/* Curved dotted flight trail */}
      <path
        d="M52 132 Q195 15 368 118"
        fill="none"
        stroke="#7C4D27"
        strokeWidth="2.5"
        strokeDasharray="6 6"
      />
      <circle cx="52" cy="132" r="5" fill="#7C4D27" />
      <circle cx="368" cy="118" r="5" fill="#7C4D27" />
      <text
        x="52"
        y="156"
        textAnchor="middle"
        fill="#4A2B18"
        fontSize="13"
        fontWeight="700"
      >
        Korea
      </text>
      <text
        x="368"
        y="144"
        textAnchor="middle"
        fill="#4A2B18"
        fontSize="13"
        fontWeight="700"
      >
        Dubai
      </text>

      {/* Cute Stylized Airplane */}
      <g transform="translate(150, 26) rotate(-14)">
        {/* Back wing */}
        <path d="M40 24 L25 4 L50 8 L64 24 Z" fill="#8C4820" stroke="#361D10" strokeWidth="2.5" />
        {/* Tail fin */}
        <path d="M8 28 L0 10 L22 22 Z" fill="#B55C2B" stroke="#361D10" strokeWidth="2.5" />
        {/* Fuselage */}
        <ellipse cx="58" cy="34" rx="52" ry="20" fill="#FFF9F0" stroke="#361D10" strokeWidth="2.8" />
        {/* Puppy window */}
        <circle cx="66" cy="32" r="13" fill="#EBBF82" stroke="#361D10" strokeWidth="2.2" />
        <circle cx="66" cy="33" r="8" fill="#E3AA66" />
        <circle cx="63" cy="31" r="1.6" fill="#221008" />
        <circle cx="69" cy="31" r="1.6" fill="#221008" />
        <ellipse cx="66" cy="34.5" rx="2" ry="1.4" fill="#221008" />
        {/* Front wing */}
        <path d="M36 42 L18 68 L48 64 L66 44 Z" fill="#9E4B1D" stroke="#361D10" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

