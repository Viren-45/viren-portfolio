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
  const linkUrl = project.live_url ?? project.github_url;

  return (
    <div
      className="flex items-stretch rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: "rgba(10,14,20,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(232,232,232,0.08)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-40 shrink-0">
        <Image
          src={project.cover_image_url}
          alt={project.name}
          fill
          className="object-cover"
          quality={80}
          sizes="80px"
        />
      </div>

      {/* Content */}
      <div className="flex items-center gap-3 flex-1 min-w-0 p-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span
            className="text-[9px] tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: "var(--font-inter)", color: "#C9A84C" }}
          >
            {project.category}
          </span>

          <h3
            className="text-xl font-normal text-[#E8E8E8] truncate"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {project.name}
          </h3>

          <p
            className="text-xs text-[#E8E8E8]/70 leading-relaxed"
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

          {/* Tags */}
          {project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tech_stack.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-2 py-0.5 rounded text-[#E8E8E8]/80"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(232,232,232,0.08)",
                  }}
                >
                  {tag}
                </span>
              ))}
              {project.tech_stack.length > 3 && (
                <span
                  className="text-[9px] px-2 py-0.5 rounded text-[#E8E8E8]/30"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  +{project.tech_stack.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right — link icons */}
        <div className="flex flex-col gap-2 shrink-0">
          {hasLive && (
            <a
              href={project.live_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{
                backgroundColor: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
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
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(232,232,232,0.1)",
                color: "rgba(232,232,232,0.6)",
              }}
            >
              <FaGithub size={13} />
            </a>
          )}
          {!hasLive && !hasGithub && linkUrl && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{
                backgroundColor: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#C9A84C",
              }}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
