// src/app/(site)/blog/page.tsx
import Link from "next/link";

export default function BlogPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-8 pb-28 md:pb-0"
      style={{ backgroundColor: "#0D1117" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 text-center max-w-md">
        {/* Label */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[#C9A84C]" />
          <span
            className="text-xs tracking-[0.3em] text-[#E8E8E8]/40 uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Coming Soon
          </span>
          <div className="w-8 h-px bg-[#C9A84C]" />
        </div>

        {/* Heading */}
        <h1
          className="text-6xl md:text-7xl font-light text-[#FFFFFF] leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Blog
        </h1>

        {/* Gold underline */}
        <div
          className="w-16 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 10px #C9A84C",
          }}
        />

        {/* Description */}
        <p
          className="text-sm text-[#E8E8E8]/45 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          I&apos;m working on something here. Thoughts on development,
          cybersecurity, and building things that matter — coming soon.
        </p>

        {/* Back link */}
        <Link
          href="/"
          className="mt-2 text-xs tracking-widest text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors duration-200 uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
