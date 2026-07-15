// src/components/about/AboutBio.tsx
import { Code2, Laptop, Box, Rocket, ArrowRight } from "lucide-react";

const stats = [
  { icon: Code2, value: "4+", label: "Years Coding" },
  { icon: Laptop, value: "15+", label: "Projects Built" },
  { icon: Box, value: "10+", label: "Technologies" },
];

export default function AboutBio() {
  return (
    <section className="w-full px-8 md:px-20 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left — Bio */}
        <div className="flex flex-col gap-6">
          {/* Label */}
          <div className="flex items-center gap-4">
            <span
              className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              My Story
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
          <h2
            className="text-5xl md:text-6xl font-light text-[#FFFFFF] leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Passionate about building{" "}
            <span className="text-[#C9A84C]">things</span> that{" "}
            <span className="text-[#C9A84C]">matter</span>
          </h2>

          {/* Gold underline */}
          <div
            className="w-12 h-px"
            style={{
              backgroundColor: "#C9A84C",
              boxShadow: "0 0 8px #C9A84C",
            }}
          />

          {/* Bio */}
          <p
            className="text-sm text-[#E8E8E8]/60 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            I&apos;m a self-taught developer with a diploma in Computer Systems
            Technician from Sheridan College. Over the last 4 years I&apos;ve
            been building full-stack applications, exploring cybersecurity, and
            diving deep into AI — all while working full-time outside the tech
            industry. I don&apos;t wait for the right moment to start building —
            I just build.
          </p>

          {/* Tagline pill */}
          <div
            className="flex items-center gap-4 px-5 py-3 rounded-xl w-fit"
            style={{
              backgroundColor: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <Rocket size={16} className="text-[#C9A84C]" strokeWidth={1.5} />
            <span
              className="text-sm text-[#E8E8E8]/70"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Always building. Always learning.
            </span>
            <ArrowRight size={15} className="text-[#E8E8E8]/30" />
          </div>
        </div>

        {/* Right — Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="relative flex flex-col items-center justify-between gap-6 px-4 py-8 rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "rgba(13,17,23,0.8)",
                border: "1px solid rgba(201,168,76,0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Icon circle */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full"
                style={{
                  backgroundColor: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <Icon size={20} className="text-[#C9A84C]" strokeWidth={1.5} />
              </div>

              {/* Value + underline */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl font-light text-[#C9A84C]">
                  {value}
                </span>
                <div
                  className="w-6 h-px"
                  style={{
                    backgroundColor: "#C9A84C",
                    boxShadow: "0 0 6px #C9A84C",
                  }}
                />
              </div>

              {/* Label */}
              <span
                className="text-[10px] tracking-widest text-[#E8E8E8]/40 uppercase text-center"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {label}
              </span>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #C9A84C, transparent)",
                  boxShadow: "0 0 12px #C9A84C",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
