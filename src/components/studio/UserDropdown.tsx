// src/components/studio/UserDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import LogoutConfirmDialog from "./LogoutConfirmDialog";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div ref={dropdownRef} className="relative">
        {/* Avatar + Name trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* VP Avatar */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
            style={{
              backgroundColor: "#1A2332",
              border: "1px solid #C9A84C",
            }}
          >
            <span
              className="text-lg font-medium text-[#C9A84C]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              VP
            </span>
          </div>

          {/* Name + Role */}
          <div className="flex flex-col items-center">
            <span
              className="text-sm text-[#E8E8E8] leading-normal"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Virendra
            </span>
            <span
              className="text-[12px] text-[#E8E8E8]/70 leading-normal"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Administrator
            </span>
          </div>

          <ChevronDown
            size={14}
            className={`text-[#E8E8E8]/70 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute right-0 top-full mt-3 mr-[-4] w-40 rounded-lg py-1 z-50"
            style={{
              backgroundColor: "#0A121E",
              border: "1px solid rgba(232,232,232,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutConfirm(true);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#E8E8E8]/60 hover:text-[#E8E8E8] hover:bg-[#E8E8E8]/05 transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
