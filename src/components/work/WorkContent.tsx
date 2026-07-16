// src/components/work/WorkContent.tsx
"use client";

import { useWorkProjects } from "@/hooks/useWorkProjects";
import WorkFilters from "./WorkFilters";
import type { Project } from "@/types";

interface WorkContentProps {
  projects: Project[];
}

export default function WorkContent({ projects }: WorkContentProps) {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    filtered,
  } = useWorkProjects(projects);

  return (
    <>
      <WorkFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      {/* Projects grid comes here next */}
      <div className="px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs text-[#E8E8E8]/30"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </>
  );
}
