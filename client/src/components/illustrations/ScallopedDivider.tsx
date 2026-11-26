interface ScallopedDividerProps {
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

/** Playful scalloped cloud wave divider with inner dashed stitch line separating the hero arches from the quilt band. */
export function ScallopedDivider({
  fillColor = "#fff1d8",
  strokeColor = "#2a170e",
  className = "w-full h-10 sm:h-11 block",
}: ScallopedDividerProps) {
  // 20 smooth semicircular scallops across 1200 viewBox width (60 units each)
  const arches = Array.from({ length: 20 }, (_, i) => {
    const x1 = i * 60;
    const x2 = x1 + 60;
    return `A 30 28 0 0 1 ${x2} 36`;
  }).join(" ");

  const innerStitches = Array.from({ length: 20 }, (_, i) => {
    const x1 = i * 60 + 7;
    const x2 = i * 60 + 53;
    return `M ${x1} 37 A 23 21 0 0 1 ${x2} 37`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path d={`M 0 44 L 0 36 ${arches} L 1200 44 Z`} fill={fillColor} />
      <path
        d={`M 0 36 ${arches}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d={innerStitches}
        fill="none"
        stroke="rgba(42, 23, 14, 0.28)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
    </svg>
  );
}
