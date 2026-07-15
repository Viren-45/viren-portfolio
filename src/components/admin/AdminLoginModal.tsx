// src/components/admin/AdminLoginModal.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { X, User, Lock, Eye, EyeOff } from "lucide-react";
import gsap from "gsap";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
}: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Animate in/out
  useEffect(() => {
    if (!modalRef.current || !backdropRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        backdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { autoAlpha: 0, y: 24, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(backdropRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        autoAlpha: 0,
        y: 16,
        scale: 0.97,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Invalid credentials");
        return;
      }

      // Success — navigate to studio
      window.location.href = "/studio";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-99998 bg-[#0D1117]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/2 z-99999 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,17,23,0.85) 0%, rgba(13,17,23,0.75) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,232,232,0.12)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(232,232,232,0.08)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#E8E8E8]/40 transition-colors duration-200 hover:text-[#E8E8E8] cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <span
            className="text-3xl font-medium text-[#C9A84C]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Virendra Purohit
          </span>
          <h2
            className="text-xl font-light text-[#E8E8E8]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Admin Login
          </h2>
          <p
            className="text-xs text-[#E8E8E8]/50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Welcome back. Please login to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div
            className="flex items-center gap-3 rounded-lg px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(232,232,232,0.12)",
            }}
          >
            <User size={16} className="shrink-0 text-[#E8E8E8]/30" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-transparent text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/30 outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* Password */}
          <div
            className="flex items-center gap-3 rounded-lg px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(232,232,232,0.12)",
            }}
          >
            <Lock size={16} className="shrink-0 text-[#E8E8E8]/30" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-transparent text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/30 outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="shrink-0 text-[#E8E8E8]/30 transition-colors duration-200 hover:text-[#E8E8E8]/70"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p
              className="text-xs text-red-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-lg py-3.5 text-sm font-medium tracking-widest text-[#E8E8E8] transition-opacity duration-200 hover:opacity-90 disabled:opacity-50 cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              background:
                "linear-gradient(135deg, #8D6C3C 0%, #725F45 55%, rgba(255,255,255,0.06) 100%)",
            }}
          >
            {isLoading ? "Verifying..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-[#E8E8E8]/10" />
            <span
              className="text-[10px] tracking-widest text-[#E8E8E8]/30"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              OR
            </span>
            <div className="h-px flex-1 bg-[#E8E8E8]/10" />
          </div>
          <div className="flex items-center gap-2">
            <Lock size={12} className="text-[#E8E8E8]/25" />
            <p
              className="text-[11px] text-[#E8E8E8]/25"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Secure access • Authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
