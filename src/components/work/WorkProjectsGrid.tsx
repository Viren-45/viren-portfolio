// src/components/work/WorkProjectsGrid.tsx
"use client";

import WorkProjectCard from "./WorkProjectCard";
import WorkProjectCardMobile from "./WorkProjectCardMobile";
import type { Project } from "@/types";

interface WorkProjectsGridProps {
  projects: Project[];
}

export default function WorkProjectsGrid({ projects }: WorkProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <p
          className="text-sm text-[#E8E8E8]/25"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          No projects found in this category.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop — 3 column grid */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <WorkProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Mobile — single column list */}
      <div className="flex md:hidden flex-col gap-4">
        {projects.map((project) => (
          <WorkProjectCardMobile key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
