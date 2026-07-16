// src/components/hero/HeroSection.tsx
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

        {/* Social Icons — left side */}
        <div className="absolute left-8 bottom-50 flex flex-col gap-6 z-10">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white hover:text-[#E8E8E8] transition-colors duration-200"
            >
              <Icon size={25} />
            </a>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-40 max-w-4xl">
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
            <Link
              href="/work"
              className="flex items-center gap-3 px-8 py-4 bg-[#715E3F] text-[#E8E8E8] text-xs tracking-[0.2em] hover:bg-[#B8963E] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              VIEW MY WORK
              <span>→</span>
            </Link>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-3 px-8 py-4 border border-[#E8E8E8]/50 text-[#E8E8E8] text-xs tracking-[0.2em] hover:bg-[#E8E8E8]/10 transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
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
