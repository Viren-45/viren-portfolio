// src/components/skills/SkillsClosingQuote.tsx
export default function SkillsClosingQuote() {
  return (
    <section className="w-full py-16 pb-24">
      <div className="max-w-6xl mx-auto px-8 md:px-20">
        <div
          className="relative flex flex-col items-center justify-center gap-6 py-16 px-8 rounded-2xl overflow-hidden text-center"
          style={{
            backgroundColor: "rgba(13,17,23,0.8)",
            border: "1px solid rgba(201,168,76,0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Top ornament */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[#C9A84C]/40" />
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
              style={{ boxShadow: "0 0 6px #C9A84C" }}
            />
            <div className="w-12 h-px bg-[#C9A84C]/40" />
          </div>

          {/* Quote */}
          <p
            className="text-3xl md:text-4xl font-light text-[#E8E8E8] italic leading-relaxed max-w-3xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The stack I use today might change tomorrow, but the{" "}
            <span
              className="not-italic font-normal"
              style={{ color: "#C9A84C" }}
            >
              passion to build
            </span>{" "}
            will always remain.
          </p>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[#C9A84C]/40" />
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
              style={{ boxShadow: "0 0 6px #C9A84C" }}
            />
            <div className="w-12 h-px bg-[#C9A84C]/40" />
          </div>

          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 90%)",
            }}
          />

          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #C9A84C, transparent)",
              boxShadow: "0 0 12px #C9A84C40",
            }}
          />
        </div>
      </div>
    </section>
  );
}
