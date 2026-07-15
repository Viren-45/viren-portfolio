// src/components/about/AboutHero.tsx
import Image from "next/image";

export default function AboutHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0D1117", height: "800px" }}
    >
      {/* Background image — hidden on small screens */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/images/about-bg-v1.png"
          alt="Virendra Purohit"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Content — centered on mobile, right side on desktop */}
      <div
        className="
          absolute inset-0 z-10
          flex flex-col justify-center
          px-8
          md:right-0 md:left-auto md:w-[55%] md:px-20
        "
      >
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="text-xs tracking-[0.2em] text-[#E8E8E8]/70"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            WHO I AM
          </span>
          <span className="w-10 h-px bg-[#C9A84C]" />
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-light text-[#FFFFFF] leading-none mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Virendra Purohit
        </h1>

        {/* Subheading */}
        <p
          className="text-sm tracking-[0.15em] text-[#E8E8E8]/50 mb-8 uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Developer.{" "}
          <span className="text-[#C9A84C]">Security Enthusiast.</span> Builder.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-[#E8E8E8]/15 mb-8" />

        {/* Quote */}
        <p
          className="text-xl font-light text-[#C9A84C]/80 italic leading-relaxed max-w-sm"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          &ldquo;I&apos;m driven by the gap between where technology is and
          where it could be.&rdquo;
        </p>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", height: "100px" }}
        >
          <path
            d="M0,80 L0,40 Q360,0 720,20 Q1080,40 1440,10 L1440,80 Z"
            fill="#0D1117"
          />
        </svg>
      </div>
    </section>
  );
}
