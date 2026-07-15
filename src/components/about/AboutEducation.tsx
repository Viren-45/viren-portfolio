// src/components/about/AboutEducation.tsx
import { GraduationCap, Landmark, FileText } from "lucide-react";

const education = [
  {
    degree: "Computer Systems Technician",
    institution: "Sheridan College, Ontario",
    type: "Diploma",
    year: "2021",
    status: "Completed" as const,
  },
  {
    degree: "Honours Bachelor of Computer Science",
    institution: "York University, Ontario",
    type: "Bachelor's Degree",
    year: "Sep 2026",
    status: "Upcoming" as const,
  },
];

export default function AboutEducation() {
  return (
    <section className="w-full px-8 md:px-20 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span
              className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Education
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
            Academic background
          </h2>

          <p
            className="text-sm text-[#E8E8E8]/50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A foundation of learning that shaped the way I think and build.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map(({ degree, institution, type, year, status }) => {
            const isCompleted = status === "Completed";
            const accentColor = isCompleted ? "#4ade80" : "#C9A84C";
            const accentBg = isCompleted
              ? "rgba(74,222,128,0.1)"
              : "rgba(201,168,76,0.1)";
            const accentBorder = isCompleted
              ? "rgba(74,222,128,0.25)"
              : "rgba(201,168,76,0.25)";

            return (
              <div
                key={degree}
                className="relative flex flex-col gap-6 p-6 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "rgba(13,17,23,0.8)",
                  border: `1px solid ${accentBorder}`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Top row — icon + status badge */}
                <div className="flex items-start justify-between">
                  {/* Icon circle */}
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full"
                    style={{
                      backgroundColor: accentBg,
                      border: `1px solid ${accentBorder}`,
                    }}
                  >
                    <GraduationCap
                      size={24}
                      strokeWidth={1.5}
                      style={{ color: accentColor }}
                    />
                  </div>

                  {/* Status badge */}
                  <div
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full"
                    style={{
                      backgroundColor: accentBg,
                      border: `1px solid ${accentBorder}`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span
                      className="text-[10px] tracking-widest uppercase font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: accentColor,
                      }}
                    >
                      {status}
                    </span>
                  </div>
                </div>

                {/* Degree + Institution */}
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-3xl font-light text-[#E8E8E8] leading-tight"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {degree}
                  </h3>

                  <div className="flex items-center gap-2">
                    <Landmark
                      size={14}
                      className="text-[#E8E8E8]/30 shrink-0"
                      strokeWidth={1.5}
                    />
                    <span
                      className="text-sm text-[#E8E8E8]/50"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {institution}
                    </span>
                  </div>
                </div>

                {/* Bottom row — type + year */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{
                    borderTop: "1px solid rgba(232,232,232,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileText
                      size={14}
                      className="text-[#E8E8E8]/30 shrink-0"
                      strokeWidth={1.5}
                    />
                    <span
                      className="text-sm text-[#E8E8E8]/40"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-px h-4"
                      style={{ backgroundColor: accentColor, opacity: 0.4 }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: accentColor,
                      }}
                    >
                      {year}
                    </span>
                  </div>
                </div>

                {/* Bottom glow line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                    boxShadow: `0 0 12px ${accentColor}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
