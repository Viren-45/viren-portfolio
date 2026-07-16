// src/components/work/WorkFilters.tsx
"use client";

import SortDropdown from "./SortDropdown";

interface WorkFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function WorkFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: WorkFiltersProps) {
  return (
    <div className="w-full px-2 md:px-20 py-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2">
          {/* All Projects tab */}
          <button
            onClick={() => onCategoryChange("all")}
            className="relative px-5 py-2 rounded-full text-xs tracking-wide transition-all duration-200 overflow-hidden cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              backgroundColor:
                selectedCategory === "all"
                  ? "rgba(201,168,76,0.12)"
                  : "rgba(10,14,20,0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border:
                selectedCategory === "all"
                  ? "1px solid rgba(201,168,76,0.4)"
                  : "1px solid rgba(201,168,76,0.15)",
              color:
                selectedCategory === "all"
                  ? "#C9A84C"
                  : "rgba(232,232,232,0.6)",
            }}
          >
            {selectedCategory === "all" && (
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C] align-middle" />
            )}
            All Projects
            {selectedCategory === "all" && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #C9A84C, transparent)",
                  boxShadow: "0 0 8px #C9A84C",
                }}
              />
            )}
          </button>

          {/* Dynamic category tabs */}
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="relative px-5 py-2 rounded-full text-xs tracking-wide transition-all duration-200 overflow-hidden cursor-pointer"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: isActive
                    ? "rgba(201,168,76,0.12)"
                    : "rgba(10,14,20,0.85)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: isActive
                    ? "1px solid rgba(201,168,76,0.4)"
                    : "1px solid rgba(201,168,76,0.15)",
                  color: isActive ? "#C9A84C" : "rgba(232,232,232,0.6)",
                }}
              >
                {isActive && (
                  <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C] align-middle" />
                )}
                {cat}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, #C9A84C, transparent)",
                      boxShadow: "0 0 8px #C9A84C",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <SortDropdown value={sortBy} onValueChange={onSortChange} />
      </div>
    </div>
  );
}
