// src/components/skills/SkillsHero.tsx
export default function SkillsHero() {
  return (
    <section className="relative w-full px-8 md:px-20 pt-40 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        {/* Label */}
        <div className="flex items-center gap-4">
          <span
            className="text-xs tracking-[0.3em] text-[#E8E8E8]/50 uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            WHAT I KNOW
          </span>
          <span className="w-8 h-px bg-[#C9A84C]" />
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-6xl font-light text-[#FFFFFF] leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          The tools I use
          <br />
          to build <span className="text-[#C9A84C]">the future.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm text-[#E8E8E8]/50 mt-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Technologies, tools and mindset I use to turn ideas into impact.
        </p>
      </div>

      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 5% 65%, rgba(201,168,76,0.08) 0%, transparent 60%)",
        }}
      />
    </section>
  );
}
