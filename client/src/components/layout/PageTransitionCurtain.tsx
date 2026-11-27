"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";

type Phase = "idle" | "entering" | "covering" | "exiting";

export function PageTransitionCurtain() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const prevPathRef = useRef(pathname);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  // Intercept internal link clicks to trigger the quilted curtain transition
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://")
      ) {
        return;
      }

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      e.preventDefault();
      clearAllTimers();
      setPhase("entering");

      const navTimer = setTimeout(() => {
        setPhase("covering");
        router.push(url.pathname + url.search + url.hash);
      }, 240);

      // Safety fallback in case route doesn't change or takes too long
      const safetyTimer = setTimeout(() => {
        setPhase("exiting");
        const doneTimer = setTimeout(() => setPhase("idle"), 440);
        timersRef.current.push(doneTimer);
      }, 2200);

      timersRef.current.push(navTimer, safetyTimer);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearAllTimers();
    };
  }, [router]);

  // Lift curtain once pathname updates
  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    if (phase === "idle") return;
    clearAllTimers();

    const holdTimer = setTimeout(() => {
      setPhase("exiting");
      const doneTimer = setTimeout(() => {
        setPhase("idle");
      }, 440);
      timersRef.current.push(doneTimer);
    }, 260);

    timersRef.current.push(holdTimer);
  }, [pathname, phase]);

  if (phase === "idle") return null;

  const translateClass =
    phase === "entering"
      ? "translate-y-0"
      : phase === "covering"
        ? "translate-y-0"
        : "-translate-y-[115%]";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9990] pointer-events-none transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${translateClass}`}
      style={{
        backgroundColor: "#f7e3bd",
        backgroundImage: `
          radial-gradient(circle at 50% 48%, rgba(255, 253, 248, 0.72) 0%, rgba(250, 236, 205, 0.25) 45%, transparent 72%),
          repeating-linear-gradient(45deg, rgba(194, 98, 43, 0.09) 0px, rgba(194, 98, 43, 0.09) 1px, transparent 1px, transparent 34px),
          repeating-linear-gradient(-45deg, rgba(194, 98, 43, 0.09) 0px, rgba(194, 98, 43, 0.09) 1px, transparent 1px, transparent 34px)
        `,
      }}
    >
      {/* Center Walking Puppy + Handwritten Tagline */}
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 select-none">
        <div className="relative flex items-center gap-3">
          {/* Trailing little paw prints */}
          <svg
            viewBox="0 0 64 64"
            className="w-4 h-4 text-[#c2622b]/35 -rotate-12 translate-y-4"
            fill="currentColor"
          >
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
          <svg
            viewBox="0 0 64 64"
            className="w-3.5 h-3.5 text-[#c2622b]/25 rotate-6 translate-y-2"
            fill="currentColor"
          >
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
          <MascotPuppy
            pose="walking"
            isMoving
            className="w-24 h-24 drop-shadow-[0_6px_12px_rgba(42,23,14,0.12)]"
          />
        </div>
        <span className="font-scrawl text-[#c2622b] text-[1.4rem] tracking-tight">
          every puppy is family
        </span>
      </div>

      {/* Scalloped bottom hem visible as curtain lifts */}
      <svg
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
        className="block w-full h-[38px] absolute left-0 -bottom-[37px]"
      >
        <defs>
          <pattern
            id="tpCurtainScallop"
            width="64"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 0 H64 V18 A32 32 0 0 1 0 18 Z" fill="#f7e3bd" />
            <path
              d="M0 18 A32 32 0 0 0 64 18"
              fill="none"
              stroke="#2a170e"
              strokeWidth="2.5"
            />
          </pattern>
        </defs>
        <rect width="1440" height="44" fill="url(#tpCurtainScallop)" />
      </svg>
    </div>
  );
}
