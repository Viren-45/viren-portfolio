// src/components/hero/MobileHeroSection.tsx
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import TypewriterTitle from "./TypewriterTitle";

const socialLinks = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/virendra-purohit/",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/Viren-45",
    label: "GitHub",
  },
  {
    icon: MdOutlineMail,
    href: "mailto:2000viren@gmail.com",
    label: "Email",
  },
];

export default function MobileHeroSection() {
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "#0D1117" }}
    >
      {/* Background image */}
      <Image
        src="/images/hero-mobile-bg.png"
        alt="Hero background"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8,12,20,0.75)" }}
      />

      {/* Top left corner accent */}
      <div className="absolute top-8 left-6 w-6 h-16 pointer-events-none">
        <div
          className="w-px h-full mx-auto"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 6px rgba(201,168,76,0.4)",
          }}
        />
      </div>

      {/* Top right corner accent */}
      <div className="absolute top-8 right-6 w-6 h-16 pointer-events-none">
        <div
          className="w-px h-full mx-auto"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 6px rgba(201,168,76,0.4)",
          }}
        />
      </div>

      {/* Sparkle dots */}
      <div
        className="absolute w-1 h-1 rounded-full"
        style={{
          top: "42%",
          left: "8%",
          backgroundColor: "#C9A84C",
          boxShadow: "0 0 6px #C9A84C",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute w-1 h-1 rounded-full"
        style={{
          top: "55%",
          right: "10%",
          backgroundColor: "#C9A84C",
          boxShadow: "0 0 6px #C9A84C",
          opacity: 0.4,
        }}
      />

      {/* Main content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center -translate-y-18">
        {/* HELLO I'M pill */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            backgroundColor: "rgba(13,17,23,0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(232,232,232,0.12)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "#C9A84C",
              boxShadow: "0 0 6px #C9A84C",
            }}
          />
          <span
            className="text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Hello, I&apos;m
          </span>
        </div>

        {/* Name */}
        <h1
          className="text-7xl font-light text-[#FFFFFF] leading-none mb-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Virendra
        </h1>

        {/* Gold underline */}
        <div
          className="w-32 h-px mb-5"
          style={{
            background:
              "linear-gradient(to right, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 10px #C9A84C, 0 0 20px rgba(201,168,76,0.4)",
          }}
        />

        {/* Typewriter */}
        <TypewriterTitle />

        {/* Description */}
        <p
          className="text-sm text-[#E8E8E8]/55 leading-relaxed mb-8 max-w-72.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          I build scalable web applications, engineer secure backend systems,
          and analyze vulnerabilities to protect critical infrastructure.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-6 w-full max-w-75 mb-8">
          <Link
            href="/work"
            className="relative flex items-center justify-center gap-3 w-full py-4 rounded-xl text-xs tracking-[0.2em] text-[#FFFFFF] font-semibold transition-opacity hover:opacity-90 overflow-hidden"
            style={{
              fontFamily: "var(--font-inter)",
              background: "linear-gradient(135deg, #C9A84C 0%, #8D6C3C 100%)",
              boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
            }}
          >
            {/* Pulse sparkle */}
            <span className="relative flex items-center justify-center w-4 h-4">
              <span
                className="absolute inline-flex w-full h-full rounded-full animate-ping"
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  animationDuration: "1.5s",
                }}
              />
              <span className="relative text-[10px] text-white">✦</span>
            </span>
            VIEW MY WORK
            <span>→</span>
          </Link>
          <a
            href="/resume.pdf"
            download
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-[#E8E8E8] text-xs tracking-[0.2em] transition-colors"
            style={{
              fontFamily: "var(--font-inter)",
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(201,168,76,0.35)",
            }}
          >
            DOWNLOAD RESUME
            <span>↓</span>
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#C9A84C",
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
