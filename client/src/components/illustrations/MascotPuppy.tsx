"use client";

import React from "react";

export type MascotPose =
  | "hero-rest"
  | "peek"
  | "head"
  | "walking"
  | "sitting"
  | "standing"
  | "walking-down"
  | "curious"
  | "leap"
  | "basket"
  | "empty-basket";

interface MascotPuppyProps {
  pose?: MascotPose;
  className?: string;
  animateFloat?: boolean;
  isMoving?: boolean;
  flipX?: boolean;
  isTraveller?: boolean;
  /** Scroll-driven leg rotation angle in degrees (-20 to +20) */
  strideAngle?: number;
  /** Scroll-driven vertical body bounce in px */
  bobOffset?: number;
}

export function MascotPuppy({
  pose = "walking",
  className = "w-28 h-28",
  animateFloat = false,
  isMoving = false,
  flipX = false,
  isTraveller = false,
  strideAngle = 0,
  bobOffset = 0,
}: MascotPuppyProps) {
  // Exact head from Screenshot 3 & Screenshot 4 centered at (100, 74)
  const renderHead = (headTilt = 0, showCollar = true) => (
    <g transform={`rotate(${headTilt} 100 74)`}>
      {/* Left Scalloped Floppy Ear */}
      <path
        d="M68 52 C52 49, 43 63, 49 76 C43 85, 49 97, 59 96 C63 102, 73 98, 73 88 Z"
        fill="#ca9352"
        stroke="#2a170e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Ear Inner Curl */}
      <path
        d="M56 69 C51 75, 54 85, 61 85"
        fill="none"
        stroke="#2a170e"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Right Scalloped Floppy Ear */}
      <path
        d="M132 52 C148 49, 157 63, 151 76 C157 85, 151 97, 141 96 C137 102, 127 98, 127 88 Z"
        fill="#ca9352"
        stroke="#2a170e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Ear Inner Curl */}
      <path
        d="M144 69 C149 75, 146 85, 139 85"
        fill="none"
        stroke="#2a170e"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Unified Cloud Head + 3-Bump Topknot Silhouette */}
      <path
        d="M75 53
           C71 42, 83 34, 91 41
           C95 30, 105 30, 109 41
           C117 34, 129 42, 125 53
           C136 56, 140 68, 134 77
           C139 85, 133 96, 122 97
           C112 102, 88 102, 78 97
           C67 96, 61 85, 66 77
           C60 68, 64 56, 75 53 Z"
        fill="#dca868"
        stroke="#2a170e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Topknot Smile Crease (Screenshot 3 & 4) */}
      <path
        d="M90 49 Q100 54.5 110 49"
        fill="none"
        stroke="#2a170e"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Soft Cream Snout Oval */}
      <ellipse cx="100" cy="82" rx="17" ry="11.8" fill="#f6dfc1" />

      {/* Coral-Pink Blush Cheeks */}
      <ellipse cx="75.5" cy="81.5" rx="6" ry="3.8" fill="#ea9b8b" opacity="0.92" />
      <ellipse cx="124.5" cy="81.5" rx="6" ry="3.8" fill="#ea9b8b" opacity="0.92" />

      {/* Dark Eyes with Dual Specular Highlights */}
      <circle cx="84.5" cy="72.5" r="5" fill="#2a170e" />
      <circle cx="82.8" cy="70.8" r="1.8" fill="#fffdf8" />
      <circle cx="86.2" cy="74.2" r="0.9" fill="#fffdf8" />

      <circle cx="115.5" cy="72.5" r="5" fill="#2a170e" />
      <circle cx="113.8" cy="70.8" r="1.8" fill="#fffdf8" />
      <circle cx="117.2" cy="74.2" r="0.9" fill="#fffdf8" />

      {/* Arched Eyebrows */}
      <path
        d="M78.5 62.5 Q84.5 59 89.5 62.5 M110.5 62.5 Q115.5 59 121.5 62.5"
        fill="none"
        stroke="#2a170e"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Nose */}
      <ellipse cx="100" cy="77.5" rx="5" ry="3.5" fill="#2a170e" />

      {/* Philtrum + W-Smile */}
      <path
        d="M100 80.5 L100 83.5 M92.5 84.5 Q96.2 88.8 100 83.5 Q103.8 88.8 107.5 84.5"
        fill="none"
        stroke="#2a170e"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terracotta Collar + Gold Tag */}
      {showCollar && (
        <g>
          <path
            d="M78 96.5 Q100 104.5 122 96.5"
            fill="none"
            stroke="#a23e17"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M78 96.5 Q100 104.5 122 96.5"
            fill="none"
            stroke="#2a170e"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="103.5"
            r="4.6"
            fill="#f4c567"
            stroke="#2a170e"
            strokeWidth="2.6"
          />
        </g>
      )}
    </g>
  );

  // Shared Woven Basket (Screenshot 4)
  const renderWovenBasket = () => (
    <g>
      {/* Trapezoid Woven Body */}
      <path
        d="M46 112 L154 112 L142 165 C140 169, 60 169, 58 165 Z"
        fill="#be8246"
        stroke="#2a170e"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Horizontal & Vertical Weave Grid Lines */}
      <path
        d="M51 130 L149 130 M55 148 L145 148 M76 112 L80 167 M100 112 L100 167 M124 112 L120 167"
        stroke="#8a5522"
        strokeWidth="2.8"
      />
      {/* Rounded Top Rim */}
      <rect
        x="38"
        y="101"
        width="124"
        height="14"
        rx="7"
        fill="#d69b5c"
        stroke="#2a170e"
        strokeWidth="4"
      />
    </g>
  );

  const isSectionDuplicate =
    !isTraveller &&
    pose !== "hero-rest" &&
    pose !== "peek" &&
    pose !== "head" &&
    pose !== "empty-basket" &&
    pose !== "basket";

  return (
    <div
      className={`select-none ${isSectionDuplicate ? "tp-inline-mascot" : ""
        } ${animateFloat ? "tp-mascot-float" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <style>{`
          @keyframes tpFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes tpTailWag {
            0%, 100% { transform: rotate(-8deg); }
            50% { transform: rotate(12deg); }
          }
          .tp-mascot-float {
            animation: tpFloat 3.2s ease-in-out infinite;
          }
          .tp-tail-wag {
            transform-box: fill-box;
            transform-origin: bottom right;
            animation: tpTailWag 0.45s ease-in-out infinite;
          }
        `}</style>

        {/* POSE: HEAD (WhatsApp Avatar) */}
        {pose === "head" && (
          <g transform="translate(0, 18) scale(1.08)" style={{ transformOrigin: "100px 74px" }}>
            {renderHead(0, false)}
          </g>
        )}

        {/* POSE: HERO-REST / PEEK (Screenshot 3: Resting behind the scalloped cloud divider) */}
        {(pose === "hero-rest" || pose === "peek") && (
          <g transform="translate(0, 32) scale(1.18)" style={{ transformOrigin: "100px 95px" }}>
            {/* Smooth Rounded Chest / Shoulders Tucked Behind Clouds (Exact Screenshot 3) */}
            <path
              d="M71 94 C65 108, 66 128, 72 142 L128 142 C134 128, 135 108, 129 94 Z"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {renderHead(0, false)}
          </g>
        )}

        {/* POSE: EMPTY-BASKET (Waiting in Footer before dog arrives) */}
        {pose === "empty-basket" && renderWovenBasket()}

        {/* POSE: BASKET (Screenshot 4: Dog resting inside the Footer basket at the end of scroll) */}
        {pose === "basket" && (
          <g>
            <g transform="translate(0, 7)">{renderHead(0, false)}</g>
            {renderWovenBasket()}
            {/* Two Oval Paws Resting Over the Basket Rim (Exact Screenshot 4) */}
            <ellipse
              cx="74"
              cy="107"
              rx="11.5"
              ry="7.5"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="4"
            />
            <ellipse
              cx="126"
              cy="107"
              rx="11.5"
              ry="7.5"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="4"
            />
          </g>
        )}

        {/* POSE: WALKING / STANDING / LEAP (Scroll-driven leg movement down & up) */}
        {(pose === "walking" || pose === "standing" || pose === "leap") && (
          <g transform={`translate(0, ${isMoving ? bobOffset.toFixed(2) : 0})`}>
            {/* Subtle Ground Shadow */}
            <ellipse cx="96" cy="158" rx="46" ry="7.5" fill="rgba(42,23,14,0.14)" />

            <g
              transform={
                flipX
                  ? `translate(200, 0) scale(-1, 1) ${pose === "leap" ? "rotate(-9 100 118)" : ""}`
                  : pose === "leap"
                    ? "rotate(-9 100 118)"
                    : undefined
              }
            >
              {/* Scalloped Cloud Tail */}
              <g className="tp-tail-wag">
                <path
                  d="M46 112 C32 108, 25 95, 33 86 C30 76, 42 72, 48 80 C55 78, 59 90, 53 102 Z"
                  fill="#dca868"
                  stroke="#2a170e"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                />
              </g>

              {/* Back Far Leg (Rotates with -strideAngle) */}
              <g transform={`rotate(${(-strideAngle).toFixed(1)} 58 128)`}>
                <path
                  d="M55 126 L49 149 C48 154, 56 156, 60 152 L65 128 Z"
                  fill="#ca9352"
                  stroke="#2a170e"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                />
              </g>

              {/* Front Far Leg (Rotates with +strideAngle) */}
              <g transform={`rotate(${strideAngle.toFixed(1)} 98 128)`}>
                <path
                  d="M95 126 L91 150 C90 155, 98 156, 101 151 L105 128 Z"
                  fill="#ca9352"
                  stroke="#2a170e"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                />
              </g>

              {/* Fluffy Scalloped Cloud Body */}
              <path
                d="M52 101
                   C42 102, 39 116, 46 125
                   C44 133, 54 139, 64 136
                   C75 140, 93 140, 104 134
                   C114 132, 118 118, 112 106
                   C104 94, 88 94, 78 97
                   C68 94, 58 95, 52 101 Z"
                fill="#dca868"
                stroke="#2a170e"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />

              {/* Back Near Leg (Rotates with +strideAngle) */}
              <g transform={`rotate(${strideAngle.toFixed(1)} 68 128)`}>
                <path
                  d="M65 127 L61 152 C61 157, 70 158, 73 152 L76 128 Z"
                  fill="#dca868"
                  stroke="#2a170e"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                />
              </g>

              {/* Front Near Leg (Rotates with -strideAngle) */}
              <g transform={`rotate(${(-strideAngle).toFixed(1)} 110 124)`}>
                <path
                  d="M105 124 L111 150 C112 156, 121 155, 120 149 L114 122 Z"
                  fill="#dca868"
                  stroke="#2a170e"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                />
              </g>
            </g>

            {/* Head Facing Viewer */}
            <g transform={flipX ? "translate(-13, 0)" : "translate(13, 0)"}>
              {renderHead(pose === "leap" ? -5 : 0, true)}
            </g>
          </g>
        )}

        {/* POSE: SITTING (Step 3 of Your Puppy Journey) */}
        {pose === "sitting" && (
          <g>
            <ellipse cx="94" cy="157" rx="44" ry="7.5" fill="rgba(42,23,14,0.15)" />
            <g className="tp-tail-wag">
              <path
                d="M54 134 C38 130, 34 114, 43 107 C42 99, 53 98, 57 106 C63 108, 63 122, 57 130 Z"
                fill="#dca868"
                stroke="#2a170e"
                strokeWidth="3.8"
                strokeLinejoin="round"
              />
            </g>
            <path
              d="M66 102 C54 112, 50 136, 60 147 C72 155, 110 155, 118 145 C124 134, 120 110, 112 100 Z"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />
            <ellipse
              cx="63"
              cy="148"
              rx="12"
              ry="7.5"
              fill="#ca9352"
              stroke="#2a170e"
              strokeWidth="3.8"
            />
            <path
              d="M86 120 L84 151 C84 156, 93 156, 94 151 L95 122 Z"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />
            <path
              d="M104 120 L106 151 C106 156, 115 156, 116 151 L113 122 Z"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />
            <g transform="translate(6, 0)">{renderHead(3, true)}</g>
          </g>
        )}

        {/* POSE: WALKING-DOWN (Stepping down off porch & into Footer) */}
        {pose === "walking-down" && (
          <g transform={`translate(0, ${isMoving ? bobOffset.toFixed(2) : 0})`}>
            <ellipse cx="100" cy="160" rx="34" ry="8" fill="rgba(42,23,14,0.22)" />
            <g className="tp-tail-wag">
              <path
                d="M100 32 C91 16, 108 12, 112 26 C115 34, 106 40, 100 36 Z"
                fill="#dca868"
                stroke="#2a170e"
                strokeWidth="3.8"
              />
            </g>
            {/* Hind Legs */}
            <g transform={`rotate(${(-strideAngle * 0.6).toFixed(1)} 78 52)`}>
              <path
                d="M78 58 L70 42 C68 37, 75 34, 79 39 L85 54 Z"
                fill="#ca9352"
                stroke="#2a170e"
                strokeWidth="3.8"
              />
            </g>
            <g transform={`rotate(${(strideAngle * 0.6).toFixed(1)} 122 52)`}>
              <path
                d="M122 58 L130 42 C132 37, 125 34, 121 39 L115 54 Z"
                fill="#ca9352"
                stroke="#2a170e"
                strokeWidth="3.8"
              />
            </g>
            {/* Vertical Fluffy Torso */}
            <ellipse
              cx="100"
              cy="66"
              rx="25"
              ry="30"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="3.8"
            />
            {/* Front Stepping Legs (Driven by strideAngle) */}
            <g transform={`rotate(${strideAngle.toFixed(1)} 88 120)`}>
              <path
                d="M84 118 L80 150 C80 155, 89 156, 91 150 L94 120 Z"
                fill="#dca868"
                stroke="#2a170e"
                strokeWidth="3.8"
              />
            </g>
            <g transform={`rotate(${(-strideAngle).toFixed(1)} 112 120)`}>
              <path
                d="M116 118 L120 150 C120 155, 111 156, 109 150 L106 120 Z"
                fill="#dca868"
                stroke="#2a170e"
                strokeWidth="3.8"
              />
            </g>
            <g transform="translate(0, 18)">{renderHead(0, true)}</g>
          </g>
        )}

        {/* POSE: CURIOUS (Play-Bow over "Read all questions" in FAQ) */}
        {pose === "curious" && (
          <g>
            <ellipse cx="102" cy="154" rx="52" ry="8" fill="rgba(0,0,0,0.22)" />
            <g className="tp-tail-wag">
              <path
                d="M148 92 C164 80, 170 96, 156 106 C148 112, 142 102, 148 92 Z"
                fill="#dca868"
                stroke="#2a170e"
                strokeWidth="3.8"
              />
            </g>
            <path
              d="M95 104 C108 92, 138 92, 148 106 C154 118, 144 136, 130 136 C112 136, 98 124, 95 104 Z"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="3.8"
            />
            <path
              d="M134 126 L142 150 C143 155, 134 156, 131 151 L122 128 Z"
              fill="#ca9352"
              stroke="#2a170e"
              strokeWidth="3.8"
            />
            <path
              d="M78 116 L58 142 C54 146, 62 152, 67 147 L88 124 Z"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="3.8"
            />
            <path
              d="M102 120 L94 148 C92 153, 101 155, 104 149 L112 124 Z"
              fill="#dca868"
              stroke="#2a170e"
              strokeWidth="3.8"
            />
            <g transform="translate(-14, 14)">{renderHead(-10, true)}</g>
          </g>
        )}
      </svg>
    </div>
  );
}