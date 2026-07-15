// src/components/studio/projects/ProjectsTable.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import ProjectsToolbar from "./ProjectsToolbar";
import DeleteProjectDialog from "./DeleteProjectDialog";
import type { Project } from "@/types";

interface ProjectsTableProps {
  projects: Project[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const router = useRouter();
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    filtered,
  } = useProjectsFilter(projects);

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const res = await fetch(`/api/projects/${deleteTarget.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setDeleteTarget(null);
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <ProjectsToolbar
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(232,232,232,0.08)" }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3"
            style={{
              backgroundColor: "#0A121E",
              borderBottom: "1px solid rgba(232,232,232,0.08)",
            }}
          >
            {["Project", "Category", "Link", "Date", "Actions"].map((h) => (
              <span
                key={h}
                className="text-[10px] uppercase tracking-widest text-[#E8E8E8]/30"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div
              className="flex items-center justify-center py-16"
              style={{ backgroundColor: "#080F17" }}
            >
              <p
                className="text-sm text-[#E8E8E8]/25"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {projects.length === 0
                  ? "No projects yet. Add your first one."
                  : "No projects match your search."}
              </p>
            </div>
          ) : (
            filtered.map((project, index) => (
              <div
                key={project.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 transition-colors duration-150 hover:bg-[#E8E8E8]/02"
                style={{
                  backgroundColor: index % 2 === 0 ? "#080F17" : "#060C14",
                  borderBottom:
                    index < filtered.length - 1
                      ? "1px solid rgba(232,232,232,0.05)"
                      : "none",
                }}
              >
                {/* Project — image + name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={project.cover_image_url}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span
                    className="text-sm text-[#E8E8E8] truncate"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {project.name}
                  </span>
                </div>

                {/* Category */}
                <span
                  className="text-xs px-2.5 py-1 rounded-md text-[#C9A84C] w-fit"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {project.category}
                </span>

                {/* Link */}
                {project.live_url || project.github_url ? (
                  <a
                    href={(project.live_url ?? project.github_url) as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#E8E8E8]/40 hover:text-[#C9A84C] transition-colors truncate"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <ExternalLink size={12} className="shrink-0" />
                    <span className="truncate">
                      {(project.live_url ?? project.github_url)
                        ?.replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </span>
                  </a>
                ) : (
                  <span
                    className="text-xs text-[#E8E8E8]/20"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    —
                  </span>
                )}

                {/* Date */}
                <span
                  className="text-xs text-[#E8E8E8]/40"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {formatDate(project.created_at)}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/studio/projects/${project.id}/edit`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-green-400 hover:text-white hover:bg-green-800 transition-colors"
                    style={{
                      border: "1px solid rgba(232,232,232,0.08)",
                    }}
                  >
                    <Pencil size={13} />
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(project)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-red-400 hover:text-white hover:bg-red-400 transition-colors cursor-pointer"
                    style={{
                      border: "1px solid rgba(232,232,232,0.08)",
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Count */}
        {filtered.length > 0 && (
          <p
            className="text-xs text-[#E8E8E8]/25"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Showing {filtered.length} of {projects.length} project
            {projects.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Delete dialog */}
      <DeleteProjectDialog
        isOpen={deleteTarget !== null}
        projectName={deleteTarget?.name ?? ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
