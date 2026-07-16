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
    <>
      {/* Desktop navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-8 py-6">
        {/* Monogram Logo */}
        <Link href="/" className="flex items-center justify-center">
          <span
            className="text-4xl font-medium tracking-tight text-[#E8E8E8]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            VP
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                label={link.label}
                displayLabel={link.displayLabel}
                pulseGlow
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
          className="hidden md:block px-6 py-2.5 border border-[#E8E8E8]/50 text-[#E8E8E8] text-xs tracking-[0.2em] hover:bg-[#E8E8E8]/10 transition-colors duration-200 bg-transparent cursor-pointer"
        >
          <span style={{ fontFamily: "var(--font-inter)" }}>
            LET&apos;S TALK
          </span>
        </TransitionLink>
      </header>

      {/* Mobile header — centered code tag with name */}
      <header
        className="flex md:hidden fixed top-0 left-0 right-0 z-50 items-center justify-center py-4"
        style={{
          backgroundColor: "rgba(10,14,20,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <span
          className="text-sm tracking-widest"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#C9A84C",
            textShadow:
              "0 0 12px rgba(201,168,76,0.6), 0 0 24px rgba(201,168,76,0.3)",
          }}
        >
          &lt;/Virendra&gt;
        </span>
      </header>
    </>
  );
}
