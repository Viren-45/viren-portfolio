// src/components/work/WorkProjectCardMobile.tsx
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";

interface WorkProjectCardMobileProps {
  project: Project;
}

export default function WorkProjectCardMobile({
  project,
}: WorkProjectCardMobileProps) {
  const hasLive = !!project.live_url;
  const hasGithub = !!project.github_url;

  return (
    <div
      className="flex items-stretch rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "rgba(10,14,20,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(232,232,232,0.08)",
      }}
    >
      {/* Left — image with icons stacked on top right */}
      <div className="relative shrink-0 p-2">
        <div
          className="relative w-32 rounded-xl overflow-hidden"
          style={{ minHeight: "140px" }}
        >
          <Image
            src={project.cover_image_url}
            alt={project.name}
            fill
            className="object-cover"
            quality={80}
            sizes="96px"
          />

          {/* Icons stacked top right over image */}
          {(hasLive || hasGithub) && (
            <div className="absolute top-1.5 right-1.5 flex flex-row gap-1">
              {hasLive && (
                <a
                  href={project.live_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded-md"
                  style={{
                    backgroundColor: "rgba(10,14,20,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "#C9A84C",
                  }}
                >
                  <ExternalLink size={10} />
                </a>
              )}
              {hasGithub && (
                <a
                  href={project.github_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded-md"
                  style={{
                    backgroundColor: "rgba(10,14,20,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(232,232,232,0.15)",
                    color: "rgba(232,232,232,0.7)",
                  }}
                >
                  <FaGithub size={10} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right — content */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0 py-3 pr-3">
        {/* Category */}
        <span
          className="text-[9px] tracking-[0.2em] uppercase font-medium"
          style={{ fontFamily: "var(--font-inter)", color: "#C9A84C" }}
        >
          {project.category}
        </span>

        {/* Name */}
        <h3
          className="text-lg font-normal text-[#E8E8E8] leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="text-xs text-[#E8E8E8]/50 leading-relaxed"
          style={{
            fontFamily: "var(--font-inter)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.short_description}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mt-1">
          {project.tech_stack.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 rounded text-[#E8E8E8]/50"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(232,232,232,0.08)",
              }}
            >
              {tag}
            </span>
          ))}
          {project.tech_stack.length > 2 && (
            <span
              className="text-[9px] px-2 py-0.5 rounded text-[#E8E8E8]/30"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              +{project.tech_stack.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
