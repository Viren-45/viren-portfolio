// src/components/work/WorkHero.tsx
import Link from "next/link";

export default function WorkHero() {
  return (
    <section className="relative w-full px-8 md:px-20 pt-14 md:pt-40 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 items-center text-center md:items-start md:text-left">
        {/* Label */}
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: "#C9A84C",
              boxShadow: "0 0 8px #C9A84C",
            }}
          />
          <span
            className="text-xs tracking-[0.35em] text-[#C9A84C] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Work
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-6xl font-light text-[#FFFFFF] leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Turning ideas into
          <br />
          <span style={{ color: "#C9A84C" }}>real impact.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm text-[#E8E8E8]/50 mt-2 max-w-md mx-auto md:mx-0"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          A selection of projects where design, code and strategy come together
          to solve real problems.
        </p>

        {/* CTA */}
        <Link
          href="/contact"
          className="flex items-center gap-3 px-6 py-3 rounded-xl w-fit text-sm text-[#C9A84C] transition-all duration-300 hover:-translate-y-0.5 mt-2"
          style={{
            fontFamily: "var(--font-inter)",
            backgroundColor: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.35)",
          }}
        >
          Let&apos;s build something great
          <span className="text-base">↗</span>
        </Link>
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
