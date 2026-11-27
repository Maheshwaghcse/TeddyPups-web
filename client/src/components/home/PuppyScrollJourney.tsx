"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    MascotPuppy,
    type MascotPose,
} from "@/components/illustrations/MascotPuppy";

interface Waypoint {
    xPct: number;
    docY: number;
    pose: MascotPose;
    flipX?: boolean;
}

interface PawSample {
    x: number;
    y: number;
    angle: number;
    isDarkSection: boolean;
}

interface CursorPaw {
    id: number;
    x: number;
    y: number;
    angle: number;
    isLeft: boolean;
}

interface JourneyMetrics {
    pageHeight: number;
    pageWidth: number;
    pinStart: number;
    pinEnd: number;
    floorVpY: number;
    heroCenterX: number;
    heroDocY: number;
    basketCenterX: number;
    basketDocY: number;
    maxScrollY: number;
    waypoints: Waypoint[];
    paws: PawSample[];
}

function evaluateSplineAtY(
    waypoints: Waypoint[],
    docY: number
): {
    xPct: number;
    dxDy: number;
    pose: MascotPose;
    flipX: boolean;
} {
    if (waypoints.length === 0) {
        return { xPct: 50, dxDy: 0, pose: "walking", flipX: false };
    }
    if (docY <= waypoints[0].docY) {
        return {
            xPct: waypoints[0].xPct,
            dxDy: 0,
            pose: waypoints[0].pose,
            flipX: Boolean(waypoints[0].flipX),
        };
    }
    const last = waypoints[waypoints.length - 1];
    if (docY >= last.docY) {
        return {
            xPct: last.xPct,
            dxDy: 0,
            pose: last.pose,
            flipX: Boolean(last.flipX),
        };
    }

    let idx = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
        if (docY >= waypoints[i].docY && docY <= waypoints[i + 1].docY) {
            idx = i;
            break;
        }
    }

    const p0 = waypoints[Math.max(0, idx - 1)];
    const p1 = waypoints[idx];
    const p2 = waypoints[idx + 1];
    const p3 = waypoints[Math.min(waypoints.length - 1, idx + 2)];

    const span = Math.max(1, p2.docY - p1.docY);
    const t = Math.min(1, Math.max(0, (docY - p1.docY) / span));
    const t2 = t * t;
    const t3 = t2 * t;

    const xPct =
        0.5 *
        (2 * p1.xPct +
            (-p0.xPct + p2.xPct) * t +
            (2 * p0.xPct - 5 * p1.xPct + 4 * p2.xPct - p3.xPct) * t2 +
            (-p0.xPct + 3 * p1.xPct - 3 * p2.xPct + p3.xPct) * t3);

    const dxDt =
        0.5 *
        (-p0.xPct +
            p2.xPct +
            2 * (2 * p0.xPct - 5 * p1.xPct + 4 * p2.xPct - p3.xPct) * t +
            3 * (-p0.xPct + 3 * p1.xPct - 3 * p2.xPct + p3.xPct) * t2);

    const dxDy = dxDt / span;
    const activePt = t < 0.52 ? p1 : p2;

    return {
        xPct,
        dxDy,
        pose: activePt.pose,
        flipX: Boolean(activePt.flipX),
    };
}

export function PuppyScrollJourney() {
    const [mounted, setMounted] = useState(false);
    const [metrics, setMetrics] = useState<JourneyMetrics | null>(null);
    const [dogState, setDogState] = useState<{
        xPx: number;
        yVp: number;
        docY: number;
        pose: MascotPose;
        flipX: boolean;
        isMoving: boolean;
        strideAngle: number;
        bobOffset: number;
        inHeroRest: boolean;
        inBasketRest: boolean;
    }>({
        xPx: 0,
        yVp: 0,
        docY: 0,
        pose: "hero-rest",
        flipX: false,
        isMoving: false,
        strideAngle: 0,
        bobOffset: 0,
        inHeroRest: true,
        inBasketRest: false,
    });

    const smoothXPxRef = useRef(0);
    const smoothYVpRef = useRef(0);
    const smoothStrideRef = useRef(0);
    const lastScrollYRef = useRef(0);
    const stridePhaseRef = useRef(0);
    const lastMoveTimeRef = useRef(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Measure DOM sections + Hero start slot + Footer basket end slot
    useEffect(() => {
        if (!mounted) return;

        const computeLayout = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const maxScrollY = Math.max(1, pageHeight - vh);

            const getRectDoc = (selector: string) => {
                const el = document.querySelector<HTMLElement>(selector);
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return {
                    left: r.left,
                    width: r.width,
                    top: r.top + window.scrollY,
                    height: r.height,
                    bottom: r.bottom + window.scrollY,
                    centerX: r.left + r.width / 2,
                    centerY: r.top + window.scrollY + r.height / 2,
                };
            };

            const heroSlot = getRectDoc('[data-puppy-hero-slot="true"]');
            const hero = getRectDoc('[data-puppy-section="hero"]');
            const meetPups = getRectDoc('[data-puppy-section="meet-pups"]');
            const twoWays = getRectDoc('[data-puppy-section="two-ways"]');
            const journey = getRectDoc('[data-puppy-section="puppy-journey"]');
            const passport = getRectDoc('[data-puppy-section="trust-passport"]');
            const families = getRectDoc('[data-puppy-section="happy-families"]');
            const faq = getRectDoc('[data-puppy-section="faq-preview"]');
            const cta = getRectDoc('[data-puppy-section="final-cta"]');

            const footerEl = document.querySelector("footer");
            let basketSlot = getRectDoc('[data-puppy-basket-slot="true"]');
            if (!basketSlot && footerEl) {
                const footerSvg = footerEl.querySelector("svg");
                if (footerSvg && footerSvg.parentElement) {
                    footerSvg.parentElement.setAttribute(
                        "data-puppy-Auto-basket",
                        "true"
                    );
                    const r = footerSvg.parentElement.getBoundingClientRect();
                    basketSlot = {
                        left: r.left,
                        width: r.width,
                        top: r.top + window.scrollY,
                        height: r.height,
                        bottom: r.bottom + window.scrollY,
                        centerX: r.left + r.width / 2,
                        centerY: r.top + window.scrollY + r.height / 2,
                    };
                }
            }

            const heroCenterX = heroSlot ? heroSlot.centerX : vw * 0.5;
            const heroDocY = heroSlot
                ? heroSlot.bottom - 48
                : hero
                    ? hero.bottom - 75
                    : 480;

            const basketCenterX = basketSlot ? basketSlot.centerX : vw * 0.105;
            const basketDocY = basketSlot ? basketSlot.centerY : pageHeight - 165;

            const isDesktopPin = vw >= 1024 && meetPups && meetPups.height > vh * 1.4;
            const floorStripH = Math.min(Math.max(vh * 0.13, 80), 128);
            const floorVpY = vh - floorStripH * 0.55;

            const pinStart = meetPups ? meetPups.top : 700;
            const pinEnd =
                isDesktopPin && meetPups ? meetPups.bottom - vh : pinStart;

            const pts: Waypoint[] = [];

            // 1. Start at Hero Center Arch
            pts.push({
                xPct: (heroCenterX / vw) * 100,
                docY: heroDocY,
                pose: "walking",
            });

            // 2. Meet the Pups Wooden Floorboard
            if (meetPups) {
                pts.push({
                    xPct: 19.5,
                    docY: pinStart + floorVpY,
                    pose: "walking",
                });
                if (isDesktopPin) {
                    pts.push({
                        xPct: 21.5,
                        docY: pinEnd + floorVpY,
                        pose: "walking",
                    });
                }
            }

            // 3. Two Ways to Meet Your Puppy
            if (twoWays) {
                pts.push({
                    xPct: 56,
                    docY: twoWays.top + twoWays.height * 0.08,
                    pose: "walking",
                });
                pts.push({
                    xPct: 45.5,
                    docY: twoWays.top + twoWays.height * 0.55,
                    pose: "walking",
                });
                pts.push({
                    xPct: 48,
                    docY: twoWays.top + twoWays.height * 0.92,
                    pose: "walking",
                });
            }

            // 4. Your Puppy Journey
            if (journey) {
                pts.push({
                    xPct: 51,
                    docY: journey.top + journey.height * 0.14,
                    pose: "walking",
                });
                pts.push({
                    xPct: 59.5,
                    docY: journey.top + journey.height * 0.48,
                    pose: "walking",
                });
                pts.push({
                    xPct: 60.5,
                    docY: journey.top + journey.height * 0.78,
                    pose: "sitting",
                });
                pts.push({
                    xPct: 57.5,
                    docY: journey.top + journey.height * 0.96,
                    pose: "walking",
                });
            }

            // 5. Why Families Trust TeddyPups
            if (passport) {
                pts.push({
                    xPct: 47,
                    docY: passport.top + passport.height * 0.25,
                    pose: "walking",
                });
                pts.push({
                    xPct: 40.5,
                    docY: passport.top + passport.height * 0.68,
                    pose: "walking",
                });
            }

            // 6. Happy Families & Puppies
            if (families) {
                pts.push({
                    xPct: 46,
                    docY: families.top + families.height * 0.16,
                    pose: "walking",
                });
                pts.push({
                    xPct: 53.5,
                    docY: families.top + families.height * 0.58,
                    pose: "walking",
                });
                pts.push({
                    xPct: 57,
                    docY: families.top + families.height * 0.97,
                    pose: "walking-down",
                });
            }

            // 7. Questions, answered
            if (faq) {
                pts.push({
                    xPct: 36,
                    docY: faq.top + faq.height * 0.24,
                    pose: "walking",
                });
                pts.push({
                    xPct: 15.5,
                    docY: faq.top + faq.height * 0.56,
                    pose: "curious",
                });
                pts.push({
                    xPct: 14.5,
                    docY: faq.top + faq.height * 0.9,
                    pose: "walking",
                });
            }

            // 8. Final CTA
            if (cta) {
                pts.push({
                    xPct: 15.5,
                    docY: cta.top + cta.height * 0.14,
                    pose: "walking",
                });
                pts.push({
                    xPct: 34,
                    docY: cta.top + cta.height * 0.54,
                    pose: "leap",
                    flipX: true,
                });
                pts.push({
                    xPct: 24,
                    docY: cta.top + cta.height * 0.88,
                    pose: "walking-down",
                });
            }

            // 9. Final Destination: Sleeping inside the Basket
            pts.push({
                xPct: (basketCenterX / vw) * 100,
                docY: basketDocY,
                pose: "basket",
            });

            const sortedPts: Waypoint[] = [];
            for (const pt of pts) {
                if (
                    sortedPts.length === 0 ||
                    pt.docY > sortedPts[sortedPts.length - 1].docY + 15
                ) {
                    sortedPts.push(pt);
                }
            }

            const paws: PawSample[] = [];
            if (sortedPts.length >= 2) {
                const startY = sortedPts[0].docY + 36;
                const endY = sortedPts[sortedPts.length - 1].docY - 48;
                const stepY = 52;
                let pawIndex = 0;

                for (let y = startY; y <= endY; y += stepY) {
                    if (
                        isDesktopPin &&
                        y > pinStart + floorVpY + 24 &&
                        y < pinEnd + floorVpY - 24
                    ) {
                        continue;
                    }

                    const evalPt = evaluateSplineAtY(sortedPts, y);
                    const xPx = (evalPt.xPct / 100) * vw;
                    const dxPx = (evalPt.dxDy / 100) * vw;
                    const angleRad = Math.atan2(dxPx, 1);
                    const angleDeg = 180 - (angleRad * 180) / Math.PI;

                    const side = pawIndex % 2 === 0 ? -7.5 : 7.5;
                    const perpX = Math.cos(angleRad) * side;
                    const perpY = -Math.sin(angleRad) * side;

                    const darkSectionStart = faq ? faq.top - 15 : pageHeight;
                    paws.push({
                        x: xPx + perpX,
                        y: y + perpY,
                        angle: angleDeg,
                        isDarkSection: y >= darkSectionStart,
                    });
                    pawIndex++;
                }
            }

            setMetrics({
                pageHeight,
                pageWidth: vw,
                pinStart,
                pinEnd,
                floorVpY,
                heroCenterX,
                heroDocY,
                basketCenterX,
                basketDocY,
                maxScrollY,
                waypoints: sortedPts,
                paws,
            });
        };

        computeLayout();
        const t1 = setTimeout(computeLayout, 350);
        const t2 = setTimeout(computeLayout, 1000);
        window.addEventListener("resize", computeLayout, { passive: true });
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener("resize", computeLayout);
        };
    }, [mounted]);

    // 60fps Scroll-Driven Animation Loop
    useEffect(() => {
        if (!metrics || metrics.waypoints.length === 0) return;

        let rafId = 0;

        const tick = () => {
            const scrollY = window.scrollY;
            const vw = metrics.pageWidth;
            const {
                waypoints,
                pinStart,
                pinEnd,
                floorVpY,
                heroCenterX,
                heroDocY,
                basketCenterX,
                basketDocY,
                maxScrollY,
            } = metrics;

            const deltaY = scrollY - lastScrollYRef.current;
            lastScrollYRef.current = scrollY;

            if (Math.abs(deltaY) > 0.1) {
                stridePhaseRef.current += deltaY * 0.085;
                lastMoveTimeRef.current = performance.now();
            }

            const isScrollingNow =
                performance.now() - lastMoveTimeRef.current < 140;
            const rawStride = isScrollingNow
                ? Math.sin(stridePhaseRef.current) * 18
                : 0;
            smoothStrideRef.current +=
                (rawStride - smoothStrideRef.current) * 0.28;
            const bobOffset = isScrollingNow
                ? -Math.abs(Math.cos(stridePhaseRef.current)) * 3.5
                : 0;

            const inHeroRest = scrollY <= 8;
            const startVpY = heroDocY;
            let targetYVp: number;

            if (scrollY <= pinStart) {
                const p =
                    pinStart > 0 ? Math.min(1, Math.max(0, scrollY / pinStart)) : 1;
                targetYVp = startVpY + p * (floorVpY - startVpY);
            } else {
                const endBasketVpY = basketDocY - maxScrollY;
                const postPinSpan = Math.max(1, maxScrollY - pinEnd);
                const postProgress = Math.min(
                    1,
                    Math.max(0, (scrollY - pinEnd) / postPinSpan)
                );
                const basketBlend =
                    postProgress > 0.86 ? (postProgress - 0.86) / 0.14 : 0;
                targetYVp = floorVpY + basketBlend * (endBasketVpY - floorVpY);
            }

            const currentDocY = scrollY + targetYVp;
            const inBasketRest =
                scrollY >= maxScrollY - 28 || currentDocY >= basketDocY - 18;

            let targetXPx: number;
            let targetPose: MascotPose = "walking";
            let targetFlipX = false;

            if (inHeroRest) {
                targetXPx = heroCenterX;
                targetYVp = heroDocY - scrollY;
                targetPose = "hero-rest";
            } else if (inBasketRest) {
                targetXPx = basketCenterX;
                targetYVp = basketDocY - scrollY;
                targetPose = "basket";
            } else if (
                scrollY >= pinStart &&
                scrollY <= pinEnd &&
                pinEnd > pinStart
            ) {
                const pinProgress = (scrollY - pinStart) / (pinEnd - pinStart);
                targetXPx = ((19.5 + pinProgress * 2) / 100) * vw;
                targetPose = "walking";
                targetFlipX = false;
            } else {
                const evalPt = evaluateSplineAtY(waypoints, currentDocY);
                targetXPx = (evalPt.xPct / 100) * vw;
                targetPose = evalPt.pose;
                targetFlipX = evalPt.flipX;
            }

            if (smoothXPxRef.current === 0 && smoothYVpRef.current === 0) {
                smoothXPxRef.current = targetXPx;
                smoothYVpRef.current = targetYVp;
            } else {
                const lerpRate = inHeroRest || inBasketRest ? 0.35 : 0.24;
                smoothXPxRef.current +=
                    (targetXPx - smoothXPxRef.current) * lerpRate;
                smoothYVpRef.current +=
                    (targetYVp - smoothYVpRef.current) * lerpRate;
            }

            setDogState({
                xPx: smoothXPxRef.current,
                yVp: smoothYVpRef.current,
                docY: scrollY + smoothYVpRef.current,
                pose: targetPose,
                flipX: targetFlipX,
                isMoving: isScrollingNow && !inHeroRest && !inBasketRest,
                strideAngle: smoothStrideRef.current,
                bobOffset,
                inHeroRest,
                inBasketRest,
            });

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [metrics]);

    if (!mounted || !metrics) return null;

    return createPortal(
        <>
            {/* Hide duplicate static mascots & any duplicate static basket so ONLY the sleeping puppy basket shows */}
            <style>{`
        @media (min-width: 1024px) {
          .tp-inline-mascot {
            display: none !important;
          }
          [data-puppy-Auto-basket="true"],
          [data-puppy-basket-slot="true"] > * {
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }
      `}</style>

            {/* 1. Document-Space SVG Paw Print Trail (Unnecessary empty basket removed!) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden z-20 hidden lg:block"
                style={{ height: `${metrics.pageHeight}px` }}
            >
                <svg
                    width={metrics.pageWidth}
                    height={metrics.pageHeight}
                    viewBox={`0 0 ${metrics.pageWidth} ${metrics.pageHeight}`}
                    fill="none"
                    className="w-full h-full"
                >
                    <defs>
                        <g id="tp-paw-print">
                            <ellipse cx="0" cy="2" rx="4.2" ry="3.3" />
                            <circle cx="-4.8" cy="-3.2" r="1.7" />
                            <circle cx="-1.6" cy="-5" r="1.8" />
                            <circle cx="1.8" cy="-5" r="1.8" />
                            <circle cx="4.8" cy="-3.2" r="1.7" />
                        </g>
                    </defs>
                    {metrics.paws.map((paw, idx) => {
                        const passed = paw.y <= dogState.docY + 36;
                        return (
                            <use
                                key={idx}
                                href="#tp-paw-print"
                                transform={`translate(${paw.x.toFixed(1)}, ${paw.y.toFixed(
                                    1
                                )}) rotate(${paw.angle.toFixed(1)})`}
                                fill={
                                    paw.isDarkSection
                                        ? passed
                                            ? "rgba(242, 190, 107, 0.35)"
                                            : "rgba(242, 190, 107, 0.14)"
                                        : passed
                                            ? "rgba(162, 74, 26, 0.24)"
                                            : "rgba(162, 74, 26, 0.10)"
                                }
                                className="transition-opacity duration-300"
                            />
                        );
                    })}
                </svg>
            </div>

            {/* 2. Viewport-Fixed Travelling Dog (Renders sleeping basket ONLY when puppy arrives at basket) */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-30 hidden lg:block overflow-hidden"
            >
                <div
                    className="absolute top-0 left-0 will-change-transform opacity-100"
                    style={{
                        transform: `translate3d(${(
                            dogState.xPx - (dogState.inBasketRest ? 80 : 68)
                        ).toFixed(1)}px, ${(
                            dogState.yVp - (dogState.inBasketRest ? 76 : 86)
                        ).toFixed(1)}px, 0)`,
                    }}
                >
                    <MascotPuppy
                        pose={dogState.pose}
                        flipX={dogState.flipX}
                        isMoving={dogState.isMoving}
                        strideAngle={dogState.strideAngle}
                        bobOffset={dogState.bobOffset}
                        isTraveller
                        className={
                            dogState.inBasketRest
                                ? "w-40 h-36"
                                : "w-34 h-34 xl:w-36 xl:h-36 drop-shadow-[0_6px_10px_rgba(42,23,14,0.16)]"
                        }
                    />
                </div>
            </div>
        </>,
        document.body
    );
}