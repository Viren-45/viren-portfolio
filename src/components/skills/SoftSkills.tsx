// src/components/skills/SoftSkills.tsx
import { MessageSquare, Lightbulb, TrendingUp } from "lucide-react";
import { Star } from "lucide-react";

const softSkills = [
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Clear and effective.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Think. Analyze. Solve.",
  },
  {
    icon: TrendingUp,
    title: "Adaptability",
    description: "Learn. Adapt. Grow.",
  },
];

export default function SoftSkills() {
  return (
    <section className="w-full py-8">
      <div className="max-w-6xl mx-auto px-8 md:px-20 flex flex-col gap-10">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
          <span
            className="text-xs tracking-[0.3em] text-[#E8E8E8]/50 uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Soft Skills
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
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: "rgba(201,168,76,0.3)",
                animationDuration: "2s",
              }}
            />
            <Star
              size={12}
              className="relative text-[#C9A84C]"
              fill="#C9A84C"
              style={{ filter: "drop-shadow(0 0 4px #C9A84C)" }}
            />
          </div>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {softSkills.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-4 py-10 px-6 rounded-2xl text-center"
              style={{
                backgroundColor: "rgba(13,17,23,0.6)",
                border: "1px solid rgba(232,232,232,0.08)",
              }}
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full"
                style={{
                  backgroundColor: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <Icon size={22} className="text-[#C9A84C]" strokeWidth={1.5} />
              </div>

              <h3
                className="text-2xl font-light text-[#E8E8E8]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {title}
              </h3>

              <p
                className="text-xs text-[#E8E8E8]/40"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
