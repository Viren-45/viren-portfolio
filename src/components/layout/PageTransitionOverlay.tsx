// src/components/layout/PageTransitionOverlay.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransition } from "@/lib/utils/transition-context";
import { useRouter } from "next/navigation";

export default function PageTransitionOverlay() {
  const { state, endTransition } = useTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!state.isTransitioning) return;

    const overlay = overlayRef.current;
    const border = borderRef.current;
    const progress = progressRef.current;
    const progressWrap = progressWrapRef.current;
    const label = labelRef.current;
    const title = titleRef.current;

    if (!overlay || !border || !progress || !progressWrap || !label || !title)
      return;

    // Reset
    gsap.set(overlay, { autoAlpha: 0, yPercent: 0 });
    gsap.set(border, { autoAlpha: 0 });
    gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(progressWrap, { autoAlpha: 0 });
    gsap.set([label, title], { autoAlpha: 0, y: 10 });

    const tl = gsap.timeline();

    // 1. Fade in overlay
    tl.to(overlay, {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    })

      // 2. Fade in glowing border
      .to(
        border,
        {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "<",
      )

      // 3. Fade in content
      .to(
        [label, title],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.1",
      )

      // 4. Fade in progress bar and start moving to ~88%
      .to(
        progressWrap,
        {
          autoAlpha: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .to(
        progress,
        {
          scaleX: 0.88,
          duration: 1.4,
          ease: "power1.out",
        },
        "<",
      )

      // 5. Navigate
      .add(() => {
        router.push(state.destination);
      })

      // 6. Snap to 100%
      .to(progress, {
        scaleX: 1,
        duration: 0.25,
        ease: "power2.out",
      })

      // 7. Brief pause
      .to({}, { duration: 0.25 })

      // 8. Sweep overlay upward to reveal page
      .to(overlay, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: endTransition,
      });
  }, [state.isTransitioning, state.destination, router, endTransition]);

  if (!state.isTransitioning) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0D1117" }}
    >
      {/* SVG Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeBlend mode='screen'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          mixBlendMode: "soft-light",
          opacity: 0.4,
        }}
      />

      {/* Glowing golden border on all four sides */}
      <div
        ref={borderRef}
        className="absolute inset-4 pointer-events-none"
        style={{
          border: "1px solid #C9A84C60",
          boxShadow:
            "inset 0 0 30px #C9A84C15, 0 0 30px #C9A84C15, inset 0 0 60px #C9A84C08",
        }}
      />

      {/* Corner accents — top left */}
      <div
        className="absolute top-4 left-4 w-8 h-8 pointer-events-none"
        style={{
          borderTop: "1px solid #C9A84C",
          borderLeft: "1px solid #C9A84C",
          filter: "drop-shadow(0 0 4px #C9A84C)",
        }}
      />
      {/* Corner accents — top right */}
      <div
        className="absolute top-4 right-4 w-8 h-8 pointer-events-none"
        style={{
          borderTop: "1px solid #C9A84C",
          borderRight: "1px solid #C9A84C",
          filter: "drop-shadow(0 0 4px #C9A84C)",
        }}
      />
      {/* Corner accents — bottom left */}
      <div
        className="absolute bottom-4 left-4 w-8 h-8 pointer-events-none"
        style={{
          borderBottom: "1px solid #C9A84C",
          borderLeft: "1px solid #C9A84C",
          filter: "drop-shadow(0 0 4px #C9A84C)",
        }}
      />
      {/* Corner accents — bottom right */}
      <div
        className="absolute bottom-4 right-4 w-8 h-8 pointer-events-none"
        style={{
          borderBottom: "1px solid #C9A84C",
          borderRight: "1px solid #C9A84C",
          filter: "drop-shadow(0 0 4px #C9A84C)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p
          ref={labelRef}
          className="text-xs tracking-[0.4em] text-[#E8E8E8]/50"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          NAVIGATING TO
        </p>

        <h2
          ref={titleRef}
          className="text-7xl font-light tracking-[0.15em] text-[#FFFFFF] uppercase"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {state.destinationLabel}
        </h2>
      </div>

      {/* Progress bar — positioned in lower center, not at edge */}
      <div
        ref={progressWrapRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64"
      >
        <div className="w-full h-0.5 bg-[#E8E8E8]/10 rounded-full">
          <div
            ref={progressRef}
            className="h-full origin-left rounded-full"
            style={{
              backgroundColor: "#C9A84C",
              boxShadow:
                "0 0 8px #C9A84C, 0 0 20px #C9A84C80, 0 0 40px #C9A84C40",
            }}
          />
        </div>
      </div>
    </div>
  );
}
