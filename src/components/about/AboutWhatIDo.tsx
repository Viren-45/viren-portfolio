// src/components/about/AboutWhatIDo.tsx
import { Code2, Shield, Brain, Rocket, SparkleIcon } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Full-stack applications built with Next.js, React, and modern tooling. From concept to deployment — clean code, real products.",
    color: "#4ade80",
    bgColor: "rgba(74,222,128,0.1)",
    borderColor: "rgba(74,222,128,0.25)",
    tagIcon: Rocket,
    tags: ["Build", "Ship", "Scale"],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Passionate about understanding how systems can be attacked and how to defend them. Actively learning offensive and defensive security concepts.",
    color: "#a855f7",
    bgColor: "rgba(168,85,247,0.1)",
    borderColor: "rgba(168,85,247,0.25)",
    tagIcon: Shield,
    tags: ["Learn", "Analyze", "Defend"],
  },
  {
    icon: Brain,
    title: "AI & Automation",
    description:
      "Building intelligent tools that solve real problems — from AI-powered receipt scanning to mock interview systems driven by voice.",
    color: "#C9A84C",
    bgColor: "rgba(201,168,76,0.1)",
    borderColor: "rgba(201,168,76,0.25)",
    tagIcon: SparkleIcon,
    tags: ["Automate", "Innovate", "Impact"],
  },
];

export default function AboutWhatIDo() {
  return (
    <section
      className="w-full px-8 md:px-20 py-24"
      style={{ backgroundColor: "rgba(255,255,255,0.01)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span
              className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              What I Do
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
            className="text-5xl font-light text-[#FFFFFF]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Where I focus my energy
          </h2>

          <p
            className="text-sm text-[#E8E8E8]/50 max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Exploring the intersection of code, systems, and intelligence to
            build things that matter.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(
            ({
              icon: Icon,
              title,
              description,
              color,
              bgColor,
              borderColor,
              tagIcon: TagIcon,
              tags,
            }) => (
              <div
                key={title}
                className="relative flex flex-col gap-6 p-6 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "rgba(13,17,23,0.8)",
                  border: `1px solid ${borderColor}`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Icon + Title row */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full shrink-0"
                    style={{
                      backgroundColor: bgColor,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <Icon size={24} strokeWidth={1.5} style={{ color }} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-3xl font-light text-[#E8E8E8]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {title}
                    </h3>
                    <div
                      className="w-8 h-px"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-sm text-[#E8E8E8]/55 leading-relaxed flex-1"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {description}
                </p>

                {/* Tag pill */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full w-fit"
                  style={{
                    backgroundColor: bgColor,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <TagIcon size={13} style={{ color }} strokeWidth={1.5} />
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-inter)", color }}
                  >
                    {tags.join(" • ")}
                  </span>
                </div>

                {/* Bottom glow line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${color}, transparent)`,
                    boxShadow: `0 0 12px ${color}`,
                  }}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
