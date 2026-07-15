// src/components/skills/TechnicalSkills.tsx
"use client";

import { Code2, Server, Shield, Wrench, Sparkle } from "lucide-react";
import { useSkillsFilter, type SkillCategory } from "@/hooks/useSkillsfilter";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Security & AI",
  "Tools & DevOps",
] as const;

const skillGroups = [
  {
    id: "Frontend",
    icon: Code2,
    title: "Frontend Development",
    color: "#60a5fa",
    bgColor: "rgba(96,165,250,0.08)",
    borderColor: "rgba(96,165,250,0.2)",
    pillBg: "rgba(96,165,250,0.08)",
    pillBorder: "rgba(96,165,250,0.2)",
    pillColor: "#60a5fa",
    glowColor: "#60a5fa",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML/CSS",
      "PHP",
    ],
  },
  {
    id: "Backend",
    icon: Server,
    title: "Backend Development",
    color: "#4ade80",
    bgColor: "rgba(74,222,128,0.08)",
    borderColor: "rgba(74,222,128,0.2)",
    pillBg: "rgba(74,222,128,0.08)",
    pillBorder: "rgba(74,222,128,0.2)",
    pillColor: "#4ade80",
    glowColor: "#4ade80",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Java",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Supabase",
    ],
  },
  {
    id: "Security & AI",
    icon: Shield,
    title: "Security & AI",
    color: "#a855f7",
    bgColor: "rgba(168,85,247,0.08)",
    borderColor: "rgba(168,85,247,0.2)",
    pillBg: "rgba(168,85,247,0.08)",
    pillBorder: "rgba(168,85,247,0.2)",
    pillColor: "#a855f7",
    glowColor: "#a855f7",
    skills: [
      "Microsoft Defender",
      "Microsoft Sentinel",
      "KQL",
      "Claude API",
      "OpenAI API",
    ],
  },
  {
    id: "Tools & DevOps",
    icon: Wrench,
    title: "Tools & DevOps",
    color: "#C9A84C",
    bgColor: "rgba(201,168,76,0.08)",
    borderColor: "rgba(201,168,76,0.2)",
    pillBg: "rgba(201,168,76,0.08)",
    pillBorder: "rgba(201,168,76,0.2)",
    pillColor: "#C9A84C",
    glowColor: "#C9A84C",
    skills: ["Git", "GitHub", "Vercel", "Docker", "VS Code"],
  },
];

export default function TechnicalSkills() {
  const { activeCategory, setActiveCategory } = useSkillsFilter();

  const visibleGroups =
    activeCategory === "All"
      ? skillGroups
      : skillGroups.filter((g) => g.id === activeCategory);

  return (
    <section className="w-full px-8 md:px-20 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
          <span
            className="text-xs tracking-[0.3em] text-[#E8E8E8]/50 uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Technical Skills
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(201,168,76,0.15), rgba(201,168,76,0.4), rgba(201,168,76,0.15))",
              boxShadow: "0 0 8px rgba(201,168,76,0.3)",
            }}
          />
          <div className="relative shrink-0">
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: "rgba(201,168,76,0.3)",
                animationDuration: "2s",
              }}
            />
            <Sparkle
              size={12}
              className="relative text-[#C9A84C]"
              fill="#C9A84C"
              style={{ filter: "drop-shadow(0 0 4px #C9A84C)" }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as SkillCategory)}
                className="relative px-5 py-2 rounded-full text-xs tracking-wide transition-all duration-200 overflow-hidden"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: isActive
                    ? "rgba(201,168,76,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(201,168,76,0.4)"
                    : "1px solid rgba(232,232,232,0.10)",
                  color: isActive ? "#C9A84C" : "rgba(232,232,232,0.5)",
                }}
              >
                {cat}
                {/* Bottom glow on active */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, #C9A84C, transparent)",
                      boxShadow: "0 0 8px #C9A84C",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Skill cards */}
        <div
          className={`grid gap-6 ${
            activeCategory === "All"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {visibleGroups.map(
            ({
              id,
              icon: Icon,
              title,
              color,
              bgColor,
              borderColor,
              pillBg,
              pillBorder,
              glowColor,
              skills,
            }) => (
              <div
                key={id}
                className="relative flex flex-col gap-6 p-6 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "rgba(13,17,23,0.8)",
                  border: `1px solid ${borderColor}`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{
                      backgroundColor: bgColor,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} style={{ color }} />
                  </div>
                  <h3
                    className="text-2xl font-light text-[#E8E8E8]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {title}
                  </h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs"
                      style={{
                        fontFamily: "var(--font-inter)",
                        backgroundColor: pillBg,
                        border: `1px solid ${pillBorder}`,
                        color: "rgba(232,232,232,0.85)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom glow */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${glowColor}, transparent)`,
                    boxShadow: `0 0 12px ${glowColor}`,
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
