// src/components/layout/PageTransitionOverlay.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "@/lib/utils/transition-context";

export default function PageTransitionOverlay() {
  const { state, endTransition } = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const awaitingRouteRef = useRef(false);
  const [routeReady, setRouteReady] = useState(0);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  // Phase one: cover the current page, present the destination, then navigate.
  useEffect(() => {
    if (!state.isTransitioning || !overlayRef.current) return;

    awaitingRouteRef.current = false;
    const context = gsap.context(() => {
      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        yPercent: 100,
        pointerEvents: "auto",
      });
      gsap.set(frameRef.current, { filter: "brightness(.55)" });
      gsap.set(contentRef.current?.children ?? [], { autoAlpha: 0.38, y: 18 });
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(mistRef.current, { scale: 1.08, yPercent: 5, autoAlpha: 0 });

      gsap
        .timeline({ defaults: { ease: "power4.inOut" } })
        .to(overlayRef.current, {
          yPercent: 0,
          duration: 0.58,
        })
        .to(
          frameRef.current,
          { filter: "brightness(1.25)", duration: 0.38, ease: "power2.out" },
          "-=0.25",
        )
        .to(
          mistRef.current,
          {
            autoAlpha: 0.28,
            scale: 1,
            yPercent: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.38",
        )
        .to(
          contentRef.current?.children ?? [],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.42",
        )
        .to(
          progressRef.current,
          { scaleX: 0.88, duration: 0.46, ease: "power2.inOut" },
          "-=0.22",
        )
        .add(() => {
          awaitingRouteRef.current = true;
          if (pathnameRef.current === state.destination) {
            setRouteReady((value) => value + 1);
          } else {
            router.push(state.destination);
          }
        });
    }, overlayRef);

    return () => context.revert();
  }, [state.isTransitioning, state.destination, router]);

  // Phase two: the destination is committed; finish the line and sweep away.
  useEffect(() => {
    if (
      !state.isTransitioning ||
      !awaitingRouteRef.current ||
      pathname !== state.destination ||
      !overlayRef.current
    )
      return;

    awaitingRouteRef.current = false;
    const reveal = gsap
      .timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
          endTransition();
        },
      })
      .to(progressRef.current, {
        scaleX: 1,
        duration: 0.12,
        ease: "power2.out",
      })
      .to(
        frameRef.current,
        { filter: "brightness(.72)", duration: 0.16, ease: "power2.in" },
        "+=0.04",
      )
      .to(
        overlayRef.current,
        { yPercent: -100, duration: 0.62, ease: "power4.inOut" },
        "-=0.06",
      );

    return () => {
      reveal.kill();
    };
  }, [
    pathname,
    routeReady,
    state.destination,
    state.isTransitioning,
    endTransition,
  ]);

  return (
    <div
      ref={overlayRef}
      aria-hidden={!state.isTransitioning}
      aria-live="polite"
      className="invisible fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-[#080f17] opacity-0"
    >
      <div
        ref={mistRef}
        className="pointer-events-none absolute inset-[-3%] bg-[linear-gradient(rgba(8,15,23,.7),rgba(8,15,23,.82)),url('/images/hero-bg-main.png')] bg-cover bg-center bg-no-repeat opacity-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_45%,rgba(91,105,117,.18),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_18%_25%,rgba(255,255,255,.04)_0_1px,transparent_1.5px),radial-gradient(circle_at_78%_66%,rgba(255,255,255,.035)_0_1px,transparent_1.5px)] bg-size-[17px_17px,23px_23px]" />

      <div ref={frameRef} className="pointer-events-none absolute inset-0">
        <span className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#8c5b20]/15 via-[#f4c56d]/70 to-[#8c5b20]/15 blur-[3px] shadow-[0_2px_8px_rgba(231,180,86,.7)]" />
        <span className="absolute inset-x-0 bottom-0 h-1.5 bg-linear-to-r from-[#8c5b20]/15 via-[#f4c56d]/70 to-[#8c5b20]/15 blur-[3px] shadow-[0_-2px_8px_rgba(231,180,86,.7)]" />
        <span className="absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-[#8c5b20]/15 via-[#f4c56d]/70 to-[#8c5b20]/15 blur-[3px] shadow-[2px_0_8px_rgba(231,180,86,.7)]" />
        <span className="absolute inset-y-0 right-0 w-1.5 bg-linear-to-b from-[#8c5b20]/15 via-[#f4c56d]/70 to-[#8c5b20]/15 blur-[3px] shadow-[-2px_0_8px_rgba(231,180,86,.7)]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex max-w-[90vw] flex-col items-center text-center"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-white/55 sm:text-xs">
          Navigating to
        </p>
        <h2 className="mt-5 font-(family-name:--font-cormorant) text-5xl font-normal uppercase tracking-[0.08em] text-white sm:text-7xl lg:text-8xl">
          {state.destinationLabel}
        </h2>
        <div className="mt-7 h-px w-52 overflow-visible bg-white/15 sm:w-72">
          <div
            ref={progressRef}
            className="relative h-px w-full origin-left bg-[#c9a45f] shadow-[0_0_8px_#c9a45f,0_0_24px_rgba(201,164,95,.55)] after:absolute after:-right-1 after:-top-1 after:size-2 after:rounded-full after:bg-[#f1cf8d] after:shadow-[0_0_14px_#d7ad5f]"
          />
        </div>
      </div>
    </div>
  );
}
