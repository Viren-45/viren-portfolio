// src/components/layout/MobileNav.tsx
"use client";

import { usePathname } from "next/navigation";
import { House, User, Code2, Briefcase, BookOpen, Mail } from "lucide-react";
import TransitionLink from "./TransitionLink";

const navItems = [
  { icon: House, label: "Home", href: "/", displayLabel: "HOME" },
  { icon: User, label: "About", href: "/about", displayLabel: "ABOUT" },
  { icon: Code2, label: "Skills", href: "/skills", displayLabel: "SKILLS" },
  { icon: Briefcase, label: "Work", href: "/work", displayLabel: "WORK" },
  { icon: BookOpen, label: "Blog", href: "/blog", displayLabel: "BLOG" },
  { icon: Mail, label: "Contact", href: "/contact", displayLabel: "CONTACT" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div
        className="relative flex items-center px-3 py-3 rounded-full"
        style={{
          backgroundColor: "rgba(10,14,20,0.90)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(201,168,76,0.35)",
          boxShadow:
            "0 0 10px rgba(201,168,76,0.15), 0 0 20px rgba(201,168,76,0.08), 0 8px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/4 right-1/4 h-px rounded-full"
          style={{
            background:
              "linear-gradient(to right, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 8px #C9A84C, 0 0 16px rgba(201,168,76,0.4)",
          }}
        />

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/4 right-1/4 h-px rounded-full"
          style={{
            background:
              "linear-gradient(to right, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 8px #C9A84C, 0 0 16px rgba(201,168,76,0.4)",
          }}
        />

        {/* Nav items */}
        {navItems.map(({ icon: Icon, label, href, displayLabel }, index) => {
          const isActive = pathname === href;
          return (
            <div key={href} className="flex items-center">
              {/* Divider — not before first item */}
              {index > 0 && (
                <div
                  className="w-px h-8 mx-1"
                  style={{ backgroundColor: "rgba(232,232,232,0.08)" }}
                />
              )}

              <TransitionLink
                href={href}
                label={label.toUpperCase()}
                displayLabel={displayLabel}
                pulseGlow
                className="relative flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-full transition-all duration-300 bg-transparent border-none cursor-pointer"
                style={
                  isActive
                    ? {
                        backgroundColor: "rgba(201,168,76,0.08)",
                        border: "1px solid rgba(201,168,76,0.5)",
                        boxShadow:
                          "0 0 16px rgba(201,168,76,0.2), inset 0 0 12px rgba(201,168,76,0.05)",
                        minWidth: "72px",
                      }
                    : {
                        border: "1px solid transparent",
                        minWidth: "52px",
                      }
                }
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  style={{
                    color: isActive ? "#C9A84C" : "rgba(232,232,232,0.45)",
                    filter: isActive
                      ? "drop-shadow(0 0 6px rgba(201,168,76,0.7))"
                      : "none",
                  }}
                />

                {isActive && (
                  <span
                    className="text-[10px] text-[#C9A84C]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </span>
                )}
              </TransitionLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
