// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";

const navLinks = [
  { label: "HOME", href: "/", displayLabel: "HOME" },
  { label: "ABOUT", href: "/about", displayLabel: "ABOUT" },
  { label: "SKILLS", href: "/skills", displayLabel: "SKILLS" },
  { label: "WORK", href: "/work", displayLabel: "WORK" },
  { label: "BLOG", href: "/blog", displayLabel: "BLOG" },
  { label: "CONTACT", href: "/contact", displayLabel: "CONTACT" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      {/* Monogram Logo — plain Link, no transition needed */}
      <Link href="/" className="flex items-center justify-center">
        <span
          className="text-4xl font-medium tracking-tight text-[#E8E8E8]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          VP
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-10">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <TransitionLink
              key={link.href}
              href={link.href}
              label={link.label}
              displayLabel={link.displayLabel}
              className="relative flex flex-col items-center gap-1.5 bg-transparent border-none cursor-pointer"
            >
              <span
                className={`text-xs tracking-[0.2em] transition-colors duration-200 ${
                  isActive
                    ? "text-[#FFFFFF] font-semibold"
                    : "text-[#E8E8E8]/70 hover:text-[#E8E8E8]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
              </span>
              {/* Active line indicator — always reserves space so links don't shift */}
              <span
                className={`w-4 h-px transition-colors duration-200 ${
                  isActive ? "bg-[#C9A84C]" : "bg-transparent"
                }`}
              />
            </TransitionLink>
          );
        })}
      </nav>

      {/* CTA Button */}
      <TransitionLink
        href="/contact"
        label="CONTACT"
        displayLabel="CONTACT"
        className="px-6 py-2.5 border border-[#E8E8E8]/50 text-[#E8E8E8] text-xs tracking-[0.2em] hover:bg-[#E8E8E8]/10 transition-colors duration-200 bg-transparent cursor-pointer"
      >
        <span style={{ fontFamily: "var(--font-inter)" }}>LET&apos;S TALK</span>
      </TransitionLink>
    </header>
  );
}
