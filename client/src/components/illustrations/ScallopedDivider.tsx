interface ScallopedDividerProps {
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

/** Playful scalloped cloud wave divider separating the hero arches from the diamond quilt band. */
export function ScallopedDivider({
  fillColor = "#FAF0DC",
  strokeColor = "#B89B7A",
  className = "w-full h-9",
}: ScallopedDividerProps) {
  return (
    <svg
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0,44 L0,24 Q30,0 60,24 Q90,0 120,24 Q150,0 180,24 Q210,0 240,24 Q270,0 300,24 Q330,0 360,24 Q390,0 420,24 Q450,0 480,24 Q510,0 540,24 Q570,0 600,24 Q630,0 660,24 Q690,0 720,24 Q750,0 780,24 Q810,0 840,24 Q870,0 900,24 Q930,0 960,24 Q990,0 1020,24 Q1050,0 1080,24 Q1110,0 1140,24 Q1170,0 1200,24 L1200,44 Z"
        fill={fillColor}
      />
      <path
        d="M0,24 Q30,0 60,24 Q90,0 120,24 Q150,0 180,24 Q210,0 240,24 Q270,0 300,24 Q330,0 360,24 Q390,0 420,24 Q450,0 480,24 Q510,0 540,24 Q570,0 600,24 Q630,0 660,24 Q690,0 720,24 Q750,0 780,24 Q810,0 840,24 Q870,0 900,24 Q930,0 960,24 Q990,0 1020,24 Q1050,0 1080,24 Q1110,0 1140,24 Q1170,0 1200,24"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
}

