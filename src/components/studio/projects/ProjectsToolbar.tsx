// src/components/studio/projects/ProjectsToolbar.tsx
"use client";

import Link from "next/link";
import { Search, Plus } from "lucide-react";

interface ProjectsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export default function ProjectsToolbar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ProjectsToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left — filters */}
      <div className="flex items-center gap-3">
        {/* Category dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg px-4 py-2 text-sm text-[#E8E8E8]/70 outline-none transition-colors"
          style={{
            fontFamily: "var(--font-inter)",
            backgroundColor: "#0A121E",
            border: "1px solid rgba(232,232,232,0.12)",
            minWidth: "160px",
          }}
        >
          <option value="all" style={{ backgroundColor: "#0A121E" }}>
            All Categories
          </option>
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
              style={{ backgroundColor: "#0A121E" }}
            >
              {cat}
            </option>
          ))}
        </select>

        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-2"
          style={{
            backgroundColor: "#0A121E",
            border: "1px solid rgba(232,232,232,0.12)",
            minWidth: "240px",
          }}
        >
          <Search size={14} className="text-[#E8E8E8]/30 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-transparent text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/30 outline-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {/* Right — Add button */}
      <Link
        href="/studio/projects/add"
        className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm text-[#E8E8E8] transition-opacity hover:opacity-90 shrink-0"
        style={{
          fontFamily: "var(--font-inter)",
          background:
            "linear-gradient(135deg, #8D6C3C 0%, #725F45 55%, #8D6C3C 100%)",
          boxShadow: "0 4px 20px rgba(141,108,60,0.3)",
        }}
      >
        <Plus size={15} />
        Add Project
      </Link>
    </div>
  );
}
