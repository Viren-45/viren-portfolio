// src/components/work/SortDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const sortOptions = [
  { value: "display_order", label: "Display Order" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "az", label: "A → Z" },
];

interface SortDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SortDropdown({
  value,
  onValueChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    sortOptions.find((o) => o.value === value)?.label ?? "Display Order";

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onValueChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-45">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-full flex items-center gap-3 px-2 py-2 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: "rgba(10,14,20,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(201,168,76,0.35)",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/4 right-1/4 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 8px rgba(201,168,76,0.6)",
          }}
        />

        {/* Filter icon */}
        <SlidersHorizontal
          size={15}
          className="shrink-0"
          style={{ color: "#C9A84C" }}
        />

        {/* Label */}
        <span
          className="flex-1 text-left text-sm text-[#E8E8E8]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {selectedLabel}
        </span>

        {/* Chevron */}
        <ChevronDown
          size={16}
          className="shrink-0 transition-transform duration-200"
          style={{
            color: "#C9A84C",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/4 right-1/4 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #C9A84C, transparent)",
            boxShadow: "0 0 8px rgba(201,168,76,0.6)",
          }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-50"
          style={{
            backgroundColor: "rgba(10,14,20,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(201,168,76,0.3)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.05)",
          }}
        >
          {sortOptions.map((option, index) => {
            const isActive = value === option.value;
            return (
              <div key={option.value}>
                {/* Active item */}
                <button
                  onClick={() => handleSelect(option.value)}
                  className="relative w-full flex items-center justify-between px-5 py-3.5 transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(201,168,76,0.12)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {/* Active top glow */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-1/4 right-1/4 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, #C9A84C, transparent)",
                        boxShadow: "0 0 8px rgba(201,168,76,0.5)",
                      }}
                    />
                  )}

                  {/* Label */}
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: isActive ? "#C9A84C" : "rgba(232,232,232,0.8)",
                    }}
                  >
                    {option.label}
                  </span>

                  {/* Radio indicator */}
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      border: isActive
                        ? "1.5px solid #C9A84C"
                        : "1.5px solid rgba(232,232,232,0.25)",
                      backgroundColor: isActive
                        ? "rgba(201,168,76,0.15)"
                        : "transparent",
                    }}
                  >
                    {isActive && (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: "#C9A84C",
                          boxShadow: "0 0 6px #C9A84C",
                        }}
                      />
                    )}
                  </div>
                </button>

                {/* Divider between inactive items */}
                {!isActive &&
                  index < sortOptions.length - 1 &&
                  value !== sortOptions[index + 1]?.value && (
                    <div
                      className="mx-4 h-px"
                      style={{
                        backgroundColor: "rgba(232,232,232,0.06)",
                      }}
                    />
                  )}
              </div>
            );
          })}

          {/* Bottom glow */}
          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #C9A84C, transparent)",
              boxShadow: "0 0 8px rgba(201,168,76,0.4)",
            }}
          />
        </div>
      )}
    </div>
  );
}

// trigger redeploy
