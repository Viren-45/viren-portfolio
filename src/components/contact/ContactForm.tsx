// src/components/contact/ContactForm.tsx
// src/components/contact/ContactForm.tsx
"use client";

import { Lock, Send } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactForm() {
  const { form, setField, isSubmitting, handleSubmit } = useContactForm();

  const fontStyle = {
    fontFamily: "var(--font-inter)",
  };

  const fieldClassName = `
    group
    flex flex-col gap-2
    rounded-[10px]
    border border-white/[0.12]
    bg-white/[0.015]
    px-4 py-4
    transition-all duration-300
    focus-within:border-[#C9A84C]/45
    focus-within:bg-[#C9A84C]/[0.025]
    focus-within:shadow-[0_0_20px_rgba(201,168,76,0.05)]
  `;

  const inputClassName = `
    w-full
    bg-transparent
    text-[14px]
    text-[#E8E8E8]
    placeholder:text-[#E8E8E8]/35
    outline-none
  `;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[16px]
        border border-white/11
        px-9 py-9
        md:px-10 md:py-10
      "
      style={{
        background:
          "linear-gradient(145deg, rgba(15,19,27,0.92) 0%, rgba(10,14,21,0.96) 100%)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        boxShadow:
          "0 10px 10px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      {/* Soft background bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 12%, rgba(255,255,255,0.025), transparent 35%)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-5">
          <div
            className="
              flex h-15.5 w-15.5 mt-3
              shrink-0 items-center justify-center
              rounded-full
            "
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.045) 70%)",
              border: "1px solid rgba(201,168,76,0.16)",
              boxShadow:
                "inset 0 0 22px rgba(201,168,76,0.035), 0 0 25px rgba(201,168,76,0.025)",
            }}
          >
            <Send size={23} strokeWidth={1.65} className="text-[#E7C34F]" />
          </div>

          <div className="pt-1">
            <h3
              className="text-xl font-medium text-[#E8E8E8]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Send me a message
            </h3>

            <p
              className="text-sm text-[#E8E8E8]/55 mt-1 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Have a question or proposal? Fill out the form and I&apos;ll get
              back to you as soon as possible.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className={fieldClassName}>
              <label
                htmlFor="name"
                className="text-[13px] font-medium text-[#F0F0F0]"
                style={fontStyle}
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                required
                className={inputClassName}
                style={fontStyle}
              />
            </div>

            <div className={fieldClassName}>
              <label
                htmlFor="email"
                className="text-[13px] font-medium text-[#F0F0F0]"
                style={fontStyle}
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                required
                className={inputClassName}
                style={fontStyle}
              />
            </div>
          </div>

          {/* Subject */}
          <div className={fieldClassName}>
            <label
              htmlFor="subject"
              className="text-[13px] font-medium text-[#F0F0F0]"
              style={fontStyle}
            >
              Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="How can I help?"
              value={form.subject}
              onChange={(e) => setField("subject", e.target.value)}
              required
              className={inputClassName}
              style={fontStyle}
            />
          </div>

          {/* Message */}
          <div
            className={`
              ${fieldClassName}
              min-h-52.5
            `}
          >
            <label
              htmlFor="message"
              className="text-[13px] font-medium text-[#F0F0F0]"
              style={fontStyle}
            >
              Message
            </label>

            <textarea
              id="message"
              placeholder="Tell me about your project or idea..."
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              required
              className={`
                ${inputClassName}
                min-h-37.5
                flex-1
                resize-none
                leading-6
              `}
              style={fontStyle}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              mt-1
              flex w-full
              items-center justify-center
              gap-3
              rounded-[10px]
              py-4.25
              text-[15px]
              font-semibold
              text-[#10141B]
              transition-all duration-300
              hover:-translate-y-px
              hover:brightness-105
              hover:shadow-[0_12px_35px_rgba(201,168,76,0.18)]
              active:translate-y-0
              disabled:pointer-events-none
              disabled:opacity-50
              cursor-pointer
            "
            style={{
              ...fontStyle,
              background:
                "linear-gradient(90deg, #FFD94D 0%, #F2C94C 48%, #E8B83E 100%)",
              boxShadow:
                "0 8px 28px rgba(201,168,76,0.12), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <Send size={18} strokeWidth={1.8} />

            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          </button>

          {/* Privacy note */}
          <div className="mt-1 flex items-center justify-center gap-2.5">
            <Lock size={13} strokeWidth={1.6} className="text-[#E8E8E8]/35" />

            <p className="text-[12px] text-[#E8E8E8]/35" style={fontStyle}>
              Your information is safe and will never be shared.
            </p>
          </div>
        </form>
      </div>

      {/* Bottom gold glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0 left-1/2
          h-px w-[38%]
          -translate-x-1/2
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.95), transparent)",
          boxShadow:
            "0 0 10px rgba(201,168,76,0.5), 0 0 26px rgba(201,168,76,0.16)",
        }}
      />
    </div>
  );
}
