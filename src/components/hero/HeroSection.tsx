// src/components/hero/HeroSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import TypewriterTitle from "./TypewriterTitle";
import MobileHeroSection from "./MobileHeroSection";

const socialLinks = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/virendra-purohit/",
    label: "LinkedIn",
  },
  { icon: FaGithub, href: "https://github.com/Viren-45", label: "GitHub" },
  { icon: MdOutlineMail, href: "mailto:2000viren@email.com", label: "Email" },
];

export default function HeroSection() {
  return (
    <>
      {/* Mobile hero */}
      <div className="md:hidden">
        <MobileHeroSection />
      </div>

      {/* Desktop hero */}
      <section className="relative hidden md:block w-full h-screen max-h-screen overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-bg.png"
          alt="Virendra Purohit"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0D1117]/10" />

        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#0D1117]/70 to-transparent z-1" />

        {/* Social Icons — right edge glass panel */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
          <div
            className="flex flex-col items-center gap-6 px-4 py-6 rounded-2xl"
            style={{
              backgroundColor: "rgba(7,16,23,0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(201,168,76,0.35)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
            }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                aria-label={label}
                className="text-[#C9A84C] transition-all duration-300 hover:scale-110 hover:text-[#ffd77a]"
                style={{
                  filter: "drop-shadow(0 0 0px transparent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    "drop-shadow(0 0 8px rgba(201,168,76,0.7))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    "drop-shadow(0 0 0px transparent)";
                }}
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-30 max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-[0.3em] text-[#E8E8E8]/80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              HELLO, I&apos;M
            </span>
            <span className="w-10 h-px bg-[#C9A84C]" />
          </div>

          <h1
            className="text-8xl font-light text-[#FFFFFF] leading-none mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Virendra
          </h1>

          <TypewriterTitle />

          <div className="w-10 h-px bg-[#E8E8E8]/30 mb-6" />

          <p
            className="text-sm text-[#E8E8E8]/70 leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            I build scalable web applications, engineer secure backend systems,
            and analyze vulnerabilities to protect critical infrastructure.
          </p>

          <div className="flex items-center gap-4">
            {/* VIEW MY WORK — gold gradient with pulse sparkle */}
            <Link
              href="/work"
              className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-xs tracking-[0.2em] text-[#FFFFFF] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 overflow-hidden"
              style={{
                fontFamily: "var(--font-inter)",
                background: "linear-gradient(135deg, #C9A84C 0%, #8D6C3C 100%)",
                boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
              }}
            >
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
              <span className="text-base">→</span>
            </Link>

            {/* DOWNLOAD RESUME — glass with gold border */}
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-[#E8E8E8] text-xs tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5"
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
        </div>
      </section>
    </>
  );
}
