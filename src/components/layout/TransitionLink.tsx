// src/components/layout/TransitionLink.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useRef,
  type MouseEvent,
  type ReactNode,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { useTransition } from "@/lib/utils/transition-context";

interface TransitionLinkProps {
  href: string;
  label: string;
  displayLabel: string;
  children: ReactNode;
  className?: string;
  pulseGlow?: boolean;
  style?: CSSProperties;
}

export default function TransitionLink({
  href,
  label,
  displayLabel,
  children,
  className,
  pulseGlow = false,
  style,
}: TransitionLinkProps) {
  const { startTransition, state } = useTransition();
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    if (state.isTransitioning) return;

    router.prefetch(href);
    if (pulseGlow && glowRef.current) {
      gsap
        .timeline({ onComplete: () => startTransition(href, displayLabel) })
        .fromTo(
          glowRef.current,
          { autoAlpha: 0, scale: 0.35 },
          { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power2.out" },
        )
        .to(glowRef.current, {
          autoAlpha: 0,
          scale: 1.35,
          duration: 0.24,
          ease: "power2.in",
        });
    } else {
      startTransition(href, displayLabel);
    }
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      style={style}
      className={`${pulseGlow ? "isolate" : ""} ${className ?? ""}`}
      aria-label={`Navigate to ${label}`}
    >
      {pulseGlow && (
        <span
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,197,109,.38)_0%,rgba(201,164,95,.2)_34%,rgba(201,164,95,.07)_58%,transparent_74%)] opacity-0 blur-[1px] shadow-[0_0_18px_rgba(231,180,86,.38)]"
        />
      )}
      {children}
    </Link>
  );
}
