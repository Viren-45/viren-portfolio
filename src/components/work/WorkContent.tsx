// src/components/work/WorkContent.tsx
"use client";

import { useWorkProjects } from "@/hooks/useWorkProjects";
import WorkFilters from "./WorkFilters";
import WorkProjectsGrid from "./WorkProjectsGrid";
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
      <div className="px-8 md:px-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <WorkProjectsGrid projects={filtered} />
        </div>
      </div>
    </>
  );
}
