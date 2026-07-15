// src/components/studio/LogoutConfirmDialog.tsx
"use client";

import { useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import gsap from "gsap";

interface LogoutConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutConfirmDialog({
  isOpen,
  onClose,
}: LogoutConfirmDialogProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backdropRef.current || !dialogRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        backdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        dialogRef.current,
        { autoAlpha: 0, y: 16, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" },
      );
    } else {
      gsap.to(backdropRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(dialogRef.current, {
        autoAlpha: 0,
        y: 12,
        scale: 0.97,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
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

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 z-99999 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,17,23,0.90) 0%, rgba(13,17,23,0.80) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(232,232,232,0.12)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(232,232,232,0.08)",
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full"
            style={{
              backgroundColor: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <LogOut size={20} className="text-[#C9A84C]" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <h3
            className="text-xl font-light text-[#E8E8E8] mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Confirm Logout
          </h3>
          <p
            className="text-sm text-[#E8E8E8]/50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Are you sure you want to log out of the admin panel?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-sm text-[#E8E8E8]/60 hover:text-[#E8E8E8] transition-colors duration-200 cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              border: "1px solid rgba(232,232,232,0.12)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 py-2.5 rounded-lg text-sm text-[#E8E8E8] transition-opacity duration-200 hover:opacity-90 cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              background:
                "linear-gradient(135deg, #8D6C3C 0%, #725F45 55%, rgba(255,255,255,0.06) 100%)",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
