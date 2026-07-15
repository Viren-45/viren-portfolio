// src/components/work/WorkHero.tsx
import Image from "next/image";

export default function WorkHero() {
  return (
    <section
      className="relative w-full overflow-hidden shrink-0"
      style={{ height: "300px" }}
    >
      {/* Background image */}
      <Image
        src="/images/work-bg.png"
        alt="Work background"
        fill
        priority
        className="object-cover object-center"
        quality={90}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0D1117]/35" />

      {/* Top gradient for navbar readability */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#0D1117]/70 to-transparent z-1" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-20 pb-12">
        <div className="flex items-center gap-4 mb-3">
          <span
            className="text-xs tracking-[0.3em] text-[#E8E8E8]/60"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            MY WORK
          </span>
          <span className="w-8 h-px bg-[#C9A84C]" />
        </div>
        <h1
          className="text-6xl font-light text-[#FFFFFF] mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          All Projects
        </h1>
        <p
          className="text-sm text-[#E8E8E8]/60 max-w-sm leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          A selection of projects where strategy and development come together
          to create impactful digital experiences.
        </p>
      </div>
    </section>
  );
}
