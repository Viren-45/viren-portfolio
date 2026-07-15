// src/components/studio/projects/DeleteProjectDialog.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import gsap from "gsap";

interface DeleteProjectDialogProps {
  isOpen: boolean;
  projectName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteProjectDialog({
  isOpen,
  projectName,
  onClose,
  onConfirm,
}: DeleteProjectDialogProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.2 });
      gsap.to(dialogRef.current, {
        autoAlpha: 0,
        y: 12,
        scale: 0.97,
        duration: 0.2,
      });
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-99998 bg-[#0D1117]/60 backdrop-blur-sm"
        onClick={onClose}
      />
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
              backgroundColor: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
            }}
          >
            <Trash2 size={20} className="text-red-400" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <h3
            className="text-xl font-light text-[#E8E8E8] mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Delete Project
          </h3>
          <p
            className="text-sm text-[#E8E8E8]/50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Are you sure you want to delete{" "}
            <span className="text-[#E8E8E8]">{projectName}</span>? This action
            cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-lg text-sm text-[#E8E8E8]/60 hover:text-[#E8E8E8] transition-colors disabled:opacity-50 cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              border: "1px solid rgba(232,232,232,0.12)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-lg text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              backgroundColor: "#DC2626",
              boxShadow: "0 4px 20px rgba(220,38,38,0.3)",
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
}
