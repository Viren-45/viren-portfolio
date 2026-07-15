// src/components/admin/AdminKeyListener.tsx
"use client";

import { useEffect, useState } from "react";
import AdminLoginModal from "./AdminLoginModal";

export default function AdminKeyListener() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + P
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setIsModalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AdminLoginModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  );
}
