// src/components/work/WorkProjectCard.tsx
"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";

interface WorkProjectCardProps {
  project: Project;
}

export default function WorkProjectCard({ project }: WorkProjectCardProps) {
  const hasLive = !!project.live_url;
  const hasGithub = !!project.github_url;

  return (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-default"
      style={{
        backgroundColor: "rgba(10,14,20,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(232,232,232,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.border = "1px solid rgba(201,168,76,0.3)";
        e.currentTarget.style.boxShadow =
          "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.border = "1px solid rgba(232,232,232,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "220px" }}
      >
        <Image
          src={project.cover_image_url}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          quality={85}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Link icons — top right */}
        <div className="absolute flex flex-col top-3 right-3 items-center gap-2">
          {hasLive && (
            <a
              href={project.live_url!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "rgba(10,14,20,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#C9A84C",
              }}
            >
              <ExternalLink size={13} />
            </a>
          )}
          {hasGithub && (
            <a
              href={project.github_url!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "rgba(10,14,20,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(232,232,232,0.15)",
                color: "rgba(232,232,232,0.8)",
              }}
            >
              <FaGithub size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Category */}
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-medium"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#C9A84C",
          }}
        >
          {project.category}
        </span>

        {/* Name */}
        <h3
          className="text-2xl font-normal text-[#E8E8E8] truncate leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-[#E8E8E8]/55 leading-relaxed"
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
                className="text-[10px] px-2.5 py-1 rounded-md text-[#E8E8E8]/60"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(232,232,232,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span
                className="text-[10px] px-2.5 py-1 rounded-md text-[#E8E8E8]/30"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(255,255,255,0.03)",
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
