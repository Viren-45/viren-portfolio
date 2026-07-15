// src/components/work/ProjectCard.tsx
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLive = !!project.live_url;
  const hasGithub = !!project.github_url;

  return (
    <div
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "rgba(13,17,23,0.7)",
        border: "1px solid rgba(232,232,232,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-4px)";
        el.style.border = "1px solid rgba(201,168,76,0.3)";
        el.style.boxShadow =
          "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.border = "1px solid rgba(232,232,232,0.08)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Cover image — 1:1 */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.cover_image_url}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          quality={85}
        />
      </div>

      {/* Card content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Category + link icons row */}
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] tracking-widest uppercase text-[#C9A84C]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.category}
          </span>

          {/* Link icons */}
          <div className="flex items-center gap-2">
            {hasLive && (
              <a
                href={project.live_url!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="View live project"
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 text-green-400"
                style={{
                  backgroundColor: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(201,168,76,0.2)";
                  e.currentTarget.style.boxShadow =
                    "0 0 12px rgba(201,168,76,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(201,168,76,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <ExternalLink size={15} />
              </a>
            )}
            {hasGithub && (
              <a
                href={project.github_url!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="View GitHub repository"
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 text-white"
                style={{
                  backgroundColor: "rgba(232,232,232,0.06)",
                  border: "1px solid rgba(232,232,232,0.12)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(232,232,232,0.12)";
                  e.currentTarget.style.boxShadow =
                    "0 0 12px rgba(232,232,232,0.1)";
                  e.currentTarget.style.color = "#E8E8E8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(232,232,232,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.color = "rgba(232,232,232,0.7)";
                }}
              >
                <FaGithub size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Project name — truncate to 1 line */}
        <h3
          className="text-xl font-normal text-[#E8E8E8] truncate"
          style={{ fontFamily: "var(--font-cormorant)" }}
          title={project.name}
        >
          {project.name}
        </h3>

        {/* Description — max 2 lines */}
        <p
          className="text-xs text-[#E8E8E8]/50 leading-relaxed"
          style={{
            fontFamily: "var(--font-inter)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.short_description}
        </p>

        {/* Tech stack tags */}
        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tech_stack.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded text-[#E8E8E8]/40"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(232,232,232,0.06)",
                  border: "1px solid rgba(232,232,232,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span
                className="text-[10px] px-2 py-0.5 rounded text-[#E8E8E8]/30"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(232,232,232,0.04)",
                }}
              >
                +{project.tech_stack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
