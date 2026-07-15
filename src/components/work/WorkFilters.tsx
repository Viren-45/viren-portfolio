// src/components/work/WorkFilters.tsx
"use client";

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
    <div className="flex items-center justify-between px-20 py-5">
      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg px-4 py-2 text-sm text-[#E8E8E8]/70 outline-none transition-colors"
        style={{
          fontFamily: "var(--font-inter)",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(232,232,232,0.12)",
          minWidth: "180px",
        }}
      >
        <option value="all" style={{ backgroundColor: "#0D1117" }}>
          All Categories
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat} style={{ backgroundColor: "#0D1117" }}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sort by */}
      <div className="flex items-center gap-3">
        <span
          className="text-xs text-[#E8E8E8]/40"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg px-4 py-2 text-sm text-[#E8E8E8]/70 outline-none"
          style={{
            fontFamily: "var(--font-inter)",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(232,232,232,0.12)",
            minWidth: "160px",
          }}
        >
          <option value="display_order" style={{ backgroundColor: "#0D1117" }}>
            Display Order
          </option>
          <option value="newest" style={{ backgroundColor: "#0D1117" }}>
            Newest First
          </option>
          <option value="oldest" style={{ backgroundColor: "#0D1117" }}>
            Oldest First
          </option>
          <option value="az" style={{ backgroundColor: "#0D1117" }}>
            A → Z
          </option>
        </select>
      </div>
    </div>
  );
}
