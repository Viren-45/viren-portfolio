// src/components/contact/ContactHero.tsx
"use client";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const infoCards = [
  {
    icon: Mail,
    label: "Email",
    value: "2000viren@gmail.com",
    href: "mailto:2000viren@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Toronto, Ontario, Canada",
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Open to new opportunities",
    href: null,
  },
];

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/Viren-45",
    label: "GitHub",
    gold: false,
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/virendra-purohit/",
    label: "LinkedIn",
    gold: false,
  },
  {
    icon: MdOutlineMail,
    href: "mailto:2000viren@gmail.com",
    label: "Email",
    gold: true,
  },
];

export default function ContactHero() {
  return (
    <div className="flex flex-col gap-8">
      {/* Label */}
      <div className="flex items-center gap-4">
        <span
          className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Get In Touch
        </span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-px bg-[#C9A84C]" />
          <div
            className="w-0 h-0"
            style={{
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: "6px solid #C9A84C",
            }}
          />
        </div>
      </div>

      {/* Heading */}
      <h1
        className="text-5xl md:text-6xl font-light text-[#FFFFFF] leading-tight"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Let&apos;s build something great{" "}
        <span className="text-[#C9A84C]">together.</span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-sm text-[#E8E8E8]/55 leading-relaxed max-w-sm"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        I&apos;m always open to discussing new projects, creative ideas or
        opportunities to be part of your visions. Feel free to reach out —
        I&apos;ll get back to you soon!
      </p>

      {/* Info cards */}
      <div className="flex flex-col gap-3">
        {infoCards.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <div
              className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-200 group"
              style={{
                backgroundColor: "rgba(13,17,23,0.6)",
                border: "1px solid rgba(232,232,232,0.08)",
              }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{
                  backgroundColor: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              >
                <Icon size={16} className="text-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col flex-1">
                <span
                  className="text-[10px] tracking-widest text-[#E8E8E8]/35 uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {label}
                </span>
                <span
                  className="text-sm text-[#E8E8E8]/80 mt-0.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {value}
                </span>
              </div>
              <ArrowRight
                size={15}
                className="text-[#E8E8E8]/20 group-hover:text-[#C9A84C] transition-colors duration-200"
              />
            </div>
          );

          return href ? (
            <a key={label} href={href} className="block">
              {content}
            </a>
          ) : (
            <div key={label}>{content}</div>
          );
        })}
      </div>

      {/* Socials */}
      <div className="flex flex-col gap-4">
        <span
          className="text-xs tracking-widest text-[#E8E8E8]/30 uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Let&apos;s Connect
        </span>
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label, gold }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
              style={{
                backgroundColor: gold
                  ? "rgba(201,168,76,0.1)"
                  : "rgba(255,255,255,0.05)",
                border: gold
                  ? "1px solid rgba(201,168,76,0.3)"
                  : "1px solid rgba(232,232,232,0.1)",
                color: gold ? "#C9A84C" : "rgba(232,232,232,0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = gold
                  ? "rgba(201,168,76,0.2)"
                  : "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = gold ? "#C9A84C" : "#E8E8E8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = gold
                  ? "rgba(201,168,76,0.1)"
                  : "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = gold
                  ? "#C9A84C"
                  : "rgba(232,232,232,0.6)";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
