// src/components/layout/TransitionLink.tsx
"use client";

import { useTransition } from "@/lib/utils/transition-context";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";

interface TransitionLinkProps {
  href: string;
  label: string; // URL-friendly label used for navigation
  displayLabel: string; // Human-readable label shown on overlay e.g. "PROJECTS"
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({
  href,
  label,
  displayLabel,
  children,
  className,
}: TransitionLinkProps) {
  const { startTransition, state } = useTransition();
  const pathname = usePathname();
  const linkRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    // Don't transition to the current page
    if (pathname === href) return;
    // Don't trigger if already transitioning
    if (state.isTransitioning) return;

    // Gold pulse ripple on the clicked link
    if (linkRef.current) {
      gsap.fromTo(
        linkRef.current,
        { boxShadow: "0 0 0px #C9A84C00" },
        {
          boxShadow: "0 0 20px #C9A84C80",
          duration: 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.set(linkRef.current, { boxShadow: "none" });
          },
        },
      );
    }

    // Small delay so pulse is visible before overlay
    setTimeout(() => {
      startTransition(href, displayLabel);
    }, 150);
  };

  return (
    <button
      ref={linkRef}
      onClick={handleClick}
      className={className}
      aria-label={`Navigate to ${label}`}
    >
      {children}
    </button>
  );
}
