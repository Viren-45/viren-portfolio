// src/components/about/AboutPersonal.tsx
import { Dumbbell, BookOpen, Coffee, Heart, ArrowRight } from "lucide-react";
import { GiCricketBat } from "react-icons/gi";

const interests = [
  { icon: Dumbbell, label: "Gym" },
  { icon: BookOpen, label: "Reading" },
  { icon: GiCricketBat, label: "Cricket" },
  { icon: Coffee, label: "Chai" },
];

const funFacts = [
  {
    icon: BookOpen,
    title: "I read books to think better",
    subtitle: "and code to build better",
  },
  {
    icon: Coffee,
    title: "I'm a chai person",
    subtitle: "in a coffee-obsessed country",
  },
];

export default function AboutPersonal() {
  return (
    <section
      className="w-full px-8 md:px-20 py-24"
      style={{ backgroundColor: "rgba(255,255,255,0.01)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span
              className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Beyond The Code
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

          <h2
            className="text-5xl md:text-6xl font-light text-[#FFFFFF] leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The person behind the{" "}
            <span className="text-[#C9A84C]">keyboard</span>
          </h2>

          <p
            className="text-sm text-[#E8E8E8]/50 mt-3"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            I code. I learn. I build. But there&apos;s more to the story.
          </p>
        </div>

        {/* Two column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left — Fun fact cards */}
          <div className="flex flex-col gap-7">
            {funFacts.map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-5 rounded-xl relative overflow-hidden group cursor-default"
                style={{
                  backgroundColor: "rgba(13,17,23,0.8)",
                  border: "1px solid rgba(232,232,232,0.08)",
                  borderLeft: "3px solid #C9A84C",
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                  style={{
                    backgroundColor: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <Icon
                    size={20}
                    className="text-[#C9A84C]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 gap-1">
                  <span
                    className="text-sm font-medium text-[#E8E8E8]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {title}
                  </span>
                  <span
                    className="text-xs text-[#E8E8E8]/45 mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {subtitle}
                  </span>
                </div>

                {/* Arrow */}
                <ArrowRight size={16} className="text-[#E8E8E8]/20 shrink-0" />
              </div>
            ))}
          </div>

          {/* Right — Interests + Cricket */}
          <div className="flex flex-col gap-5">
            {/* Things I love label */}
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-[#C9A84C]" />
              <span
                className="text-xs tracking-widest text-[#E8E8E8]/50 uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Things I love
              </span>
            </div>

            {/* Interest pills */}
            <div className="flex flex-wrap gap-2">
              {interests.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(232,232,232,0.10)",
                  }}
                >
                  <Icon
                    size={14}
                    className="text-[#C9A84C]"
                    strokeWidth={1.5}
                  />
                  <span
                    className="text-sm text-[#E8E8E8]/75"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Cricket highlight card */}
            <div
              className="flex items-center gap-5 p-5 rounded-xl mt-1"
              style={{
                backgroundColor: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              {/* Large circle icon */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full shrink-0"
                style={{
                  backgroundColor: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
              >
                <GiCricketBat size={26} className="text-[#C9A84C]" />
              </div>

              <div className="flex flex-col gap-1">
                <span
                  className="text-base font-medium text-[#E8E8E8]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Right-hand batsman —
                </span>
                <p
                  className="text-sm text-[#E8E8E8]/60"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  I play <span className="text-[#C9A84C]">cricket</span> as
                  seriously as I write{" "}
                  <span className="text-[#C9A84C]">code</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
