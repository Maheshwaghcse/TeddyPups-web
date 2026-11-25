"use client";

import { motion } from "framer-motion";

export type MascotPose = "peek" | "standing" | "sitting" | "walking" | "basket" | "head";

interface MascotPuppyProps {
  pose?: MascotPose;
  className?: string;
  animateFloat?: boolean;
}

/** Illustrated TeddyPups fluffy golden puppy mascot supporting pose variants. */
export function MascotPuppy({
  pose = "standing",
  className = "w-20 h-20",
  animateFloat = false,
}: MascotPuppyProps) {
  const Wrapper = animateFloat ? motion.div : "div";
  const motionProps = animateFloat
    ? {
        animate: { y: [0, -4, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  if (pose === "head") {
    return (
      <Wrapper className={`inline-block ${className}`} {...motionProps}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="#FAF0DC" stroke="#472716" strokeWidth="4" />
          <ellipse cx="22" cy="54" rx="11" ry="18" fill="#C98A48" stroke="#3B1F10" strokeWidth="3" />
          <ellipse cx="78" cy="54" rx="11" ry="18" fill="#C98A48" stroke="#3B1F10" strokeWidth="3" />
          <circle cx="50" cy="48" r="24" fill="#E3AA66" stroke="#3B1F10" strokeWidth="3" />
          <circle cx="50" cy="28" r="12" fill="#E9B87A" />
          <ellipse cx="50" cy="56" rx="12" ry="9" fill="#FBE8CE" />
          <circle cx="40" cy="46" r="3.5" fill="#2A150B" />
          <circle cx="60" cy="46" r="3.5" fill="#2A150B" />
          <circle cx="39" cy="44.8" r="1.2" fill="#FFFFFF" />
          <circle cx="59" cy="44.8" r="1.2" fill="#FFFFFF" />
          <ellipse cx="50" cy="52.5" rx="3.8" ry="2.8" fill="#2A150B" />
          <path d="M45 58 Q50 62 55 58" stroke="#3B1F10" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </Wrapper>
    );
  }

  if (pose === "basket") {
    return (
      <Wrapper className={`inline-block ${className}`} {...motionProps}>
        <svg viewBox="0 0 140 120" fill="none" className="w-full h-full">
          {/* Puppy head & paws peeking over woven basket */}
          <ellipse cx="42" cy="44" rx="12" ry="20" fill="#C98A48" stroke="#2D160B" strokeWidth="3" />
          <ellipse cx="98" cy="44" rx="12" ry="20" fill="#C98A48" stroke="#2D160B" strokeWidth="3" />
          <circle cx="70" cy="42" r="26" fill="#E3AA66" stroke="#2D160B" strokeWidth="3" />
          <circle cx="70" cy="20" r="13" fill="#EBB87B" stroke="#2D160B" strokeWidth="2.5" />
          <ellipse cx="70" cy="50" rx="13" ry="10" fill="#FBE8CE" />
          <circle cx="59" cy="39" r="3.8" fill="#221008" />
          <circle cx="81" cy="39" r="3.8" fill="#221008" />
          <circle cx="58" cy="37.5" r="1.3" fill="#FFF" />
          <circle cx="80" cy="37.5" r="1.3" fill="#FFF" />
          <ellipse cx="52" cy="46" rx="4" ry="2.2" fill="#E6887D" opacity="0.65" />
          <ellipse cx="88" cy="46" rx="4" ry="2.2" fill="#E6887D" opacity="0.65" />
          <ellipse cx="70" cy="46.5" rx="4" ry="3" fill="#221008" />
          <path d="M64 53 Q70 57 76 53" stroke="#2D160B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Woven Basket */}
          <path
            d="M18 62 L122 62 L110 112 Q70 118 30 112 Z"
            fill="#C79663"
            stroke="#2D160B"
            strokeWidth="3"
          />
          <rect x="12" y="54" width="116" height="14" rx="7" fill="#D5A674" stroke="#2D160B" strokeWidth="3" />
          <g stroke="#9D6B3C" strokeWidth="2" opacity="0.7">
            <line x1="25" y1="80" x2="115" y2="80" />
            <line x1="28" y1="96" x2="112" y2="96" />
            <line x1="46" y1="68" x2="48" y2="112" />
            <line x1="70" y1="68" x2="70" y2="114" />
            <line x1="94" y1="68" x2="92" y2="112" />
          </g>
          {/* Little paws resting on basket rim */}
          <ellipse cx="44" cy="60" rx="8" ry="6" fill="#EBB87B" stroke="#2D160B" strokeWidth="2.5" />
          <ellipse cx="96" cy="60" rx="8" ry="6" fill="#EBB87B" stroke="#2D160B" strokeWidth="2.5" />
        </svg>
      </Wrapper>
    );
  }

  if (pose === "peek") {
    return (
      <Wrapper className={`inline-block ${className}`} {...motionProps}>
        <svg viewBox="0 0 130 110" fill="none" className="w-full h-full">
          <ellipse cx="32" cy="54" rx="14" ry="22" transform="rotate(14 32 54)" fill="#C98A48" stroke="#2D160B" strokeWidth="3" />
          <ellipse cx="98" cy="54" rx="14" ry="22" transform="rotate(-14 98 54)" fill="#C98A48" stroke="#2D160B" strokeWidth="3" />
          <circle cx="65" cy="52" r="32" fill="#E3AA66" stroke="#2D160B" strokeWidth="3" />
          <circle cx="65" cy="24" r="15" fill="#EBB87B" stroke="#2D160B" strokeWidth="2.5" />
          <ellipse cx="65" cy="62" rx="16" ry="12" fill="#FBE8CE" />
          <circle cx="51" cy="48" r="4.5" fill="#221008" />
          <circle cx="79" cy="48" r="4.5" fill="#221008" />
          <circle cx="49.5" cy="46.2" r="1.5" fill="#FFF" />
          <circle cx="77.5" cy="46.2" r="1.5" fill="#FFF" />
          <ellipse cx="65" cy="57" rx="5" ry="3.5" fill="#221008" />
          <path d="M58 65 Q65 70 72 65" stroke="#2D160B" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="38" cy="86" rx="10" ry="7" fill="#EBB87B" stroke="#2D160B" strokeWidth="2.5" />
          <ellipse cx="92" cy="86" rx="10" ry="7" fill="#EBB87B" stroke="#2D160B" strokeWidth="2.5" />
        </svg>
      </Wrapper>
    );
  }

  // Default full-body cute puppy ("standing" / "walking" / "sitting")
  const isWalking = pose === "walking";
  return (
    <Wrapper className={`inline-block ${className}`} {...motionProps}>
      <svg viewBox="0 0 130 120" fill="none" className="w-full h-full">
        {/* Fluffy Tail */}
        <circle
          cx={isWalking ? "24" : "26"}
          cy="72"
          r="10"
          fill="#E3AA66"
          stroke="#2D160B"
          strokeWidth="2.8"
        />
        {/* Body */}
        <ellipse cx="58" cy="78" rx="30" ry="22" fill="#E3AA66" stroke="#2D160B" strokeWidth="3" />
        {/* Legs */}
        <rect x="34" y="88" width="11" height="20" rx="5.5" transform={isWalking ? "rotate(10 34 88)" : undefined} fill="#D99B55" stroke="#2D160B" strokeWidth="2.8" />
        <rect x="49" y="90" width="11" height="19" rx="5.5" fill="#E3AA66" stroke="#2D160B" strokeWidth="2.8" />
        <rect x="66" y="90" width="11" height="19" rx="5.5" fill="#E3AA66" stroke="#2D160B" strokeWidth="2.8" />
        <rect x="78" y="88" width="11" height="20" rx="5.5" transform={isWalking ? "rotate(-12 78 88)" : undefined} fill="#D99B55" stroke="#2D160B" strokeWidth="2.8" />
        {/* Collar */}
        <path d="M56 62 Q76 66 90 58" stroke="#9E4B1D" strokeWidth="5" strokeLinecap="round" />
        <circle cx="80" cy="64" r="3.5" fill="#F2C86B" />
        {/* Head */}
        <ellipse cx="52" cy="40" rx="11" ry="18" transform="rotate(14 52 40)" fill="#C98A48" stroke="#2D160B" strokeWidth="2.8" />
        <ellipse cx="102" cy="40" rx="11" ry="18" transform="rotate(-14 102 40)" fill="#C98A48" stroke="#2D160B" strokeWidth="2.8" />
        <circle cx="77" cy="40" r="24" fill="#E8B272" stroke="#2D160B" strokeWidth="3" />
        <circle cx="77" cy="18" r="11" fill="#EEBE83" stroke="#2D160B" strokeWidth="2.5" />
        <ellipse cx="78" cy="48" rx="12" ry="9" fill="#FBE8CE" />
        <circle cx="67" cy="37" r="3.6" fill="#221008" />
        <circle cx="89" cy="37" r="3.6" fill="#221008" />
        <circle cx="65.8" cy="35.6" r="1.2" fill="#FFF" />
        <circle cx="87.8" cy="35.6" r="1.2" fill="#FFF" />
        <ellipse cx="78" cy="44" rx="4" ry="2.8" fill="#221008" />
        <path d="M72 51 Q78 55 84 51" stroke="#2D160B" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </Wrapper>
  );
}

