"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CursorPaw {
  id: number;
  x: number;
  y: number;
  angle: number;
  isLeft: boolean;
}

export function CursorPawTrail() {
  const [mounted, setMounted] = useState(false);
  const [cursorPaws, setCursorPaws] = useState<CursorPaw[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let lastX = -100;
    let lastY = -100;
    let stepCount = 0;
    let idCounter = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < 40) return;

      const angle =
        lastX === -100 ? 0 : Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      const isLeft = stepCount % 2 === 0;
      stepCount += 1;

      const rad = (angle * Math.PI) / 180;
      const sideOffset = isLeft ? -6 : 6;
      const x = e.clientX + Math.cos(rad) * sideOffset;
      const y = e.clientY + Math.sin(rad) * sideOffset;

      lastX = e.clientX;
      lastY = e.clientY;

      const id = ++idCounter;
      setCursorPaws((prev) => [...prev.slice(-22), { id, x, y, angle, isLeft }]);

      const timer = setTimeout(() => {
        setCursorPaws((prev) => prev.filter((p) => p.id !== id));
        timers.delete(timer);
      }, 2000);

      timers.add(timer);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [mounted]);

  if (!mounted || cursorPaws.length === 0) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes tpCursorPawFade {
          0% { opacity: 0.72; transform: translate(-50%, -50%) scale(0.9); }
          20% { opacity: 0.65; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      >
        {cursorPaws.map((paw) => (
          <span
            key={paw.id}
            className="absolute block w-4 h-4"
            style={{
              left: paw.x,
              top: paw.y,
              animation: "tpCursorPawFade 2s ease-out forwards",
            }}
          >
            <svg
              viewBox="0 0 64 64"
              className="w-full h-full fill-[#c2622b]/45"
              style={{
                transform: `rotate(${paw.angle}deg) scaleX(${paw.isLeft ? 1 : -1})`,
              }}
            >
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
          </span>
        ))}
      </div>
    </>,
    document.body
  );
}
