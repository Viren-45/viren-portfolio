// src/components/work/ProjectsGrid.tsx
"use client";

import { useWorkProjects } from "@/hooks/useWorkProjects";
import WorkFilters from "./WorkFilters";
import ProjectCard from "./ProjectCard";
import WorkCTA from "./WorkCTA";
import type { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    filtered,
  } = useWorkProjects(projects);

  return (
    <div className="flex flex-col">
      {/* Filters */}
      <WorkFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Grid + CTA wrapper — consistent horizontal padding */}
      <div className="px-20">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p
              className="text-sm text-[#E8E8E8]/25"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              No projects found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* CTA — inside same padding wrapper */}
        <div className="mt-12">
          <WorkCTA />
        </div>
      </div>
    </div>
  );
}
