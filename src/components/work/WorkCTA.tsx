// src/components/work/WorkCTA.tsx
import Link from "next/link";

export default function WorkCTA() {
  return (
    <section
      className="w-full px-10 py-6 flex items-center justify-between rounded-xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(232,232,232,0.08)",
        borderBottom: "1px solid rgba(232,232,232,0.08)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>

        <div>
          <h3
            className="text-2xl font-light text-[#E8E8E8] mb-1"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Have a project in mind?
          </h3>
          <p
            className="text-sm text-[#E8E8E8]/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Let&apos;s build something great together.
          </p>
        </div>
      </div>

      {/* Right */}
      <Link
        href="/contact"
        className="flex items-center gap-3 px-8 py-3.5 text-sm tracking-[0.15em] text-[#E8E8E8] transition-opacity hover:opacity-90 shrink-0"
        style={{
          fontFamily: "var(--font-inter)",
          background:
            "linear-gradient(135deg, #8D6C3C 0%, #725F45 55%, #8D6C3C 100%)",
          boxShadow: "0 4px 24px rgba(141,108,60,0.3)",
        }}
      >
        LET&apos;S WORK TOGETHER
        <span>→</span>
      </Link>
    </section>
  );
}
