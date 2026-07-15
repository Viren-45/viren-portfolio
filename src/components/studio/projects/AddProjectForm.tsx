// src/components/studio/projects/AddProjectForm.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type Project,
} from "@/types";
import { useAddProject } from "@/hooks/useAddProject";
import TagInput from "./TagInput";
import ImageUpload from "./ImageUpload";

interface AddProjectFormProps {
  nextDisplayOrder: number;
  project?: Project; // optional — passed in edit mode
}

export default function AddProjectForm({
  nextDisplayOrder,
  project,
}: AddProjectFormProps) {
  const router = useRouter();
  const {
    name,
    setName,
    shortDescription,
    setShortDescription,
    category,
    setCategory,
    customCategory,
    setCustomCategory,
    techStack,
    setTechStack,
    coverImage,
    setCoverImage,
    existingImageUrl,
    setExistingImageUrl,
    liveUrl,
    setLiveUrl,
    githubUrl,
    setGithubUrl,
    displayOrder,
    setDisplayOrder,
    isOtherCategory,
    isEditMode,
    isSubmitting,
    error,
    handleSubmit,
  } = useAddProject({ nextDisplayOrder, project });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Breadcrumb + Action buttons row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/studio/projects"
            className="text-base text-[#E8E8E8]/40 hover:text-[#E8E8E8] transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Projects
          </Link>
          <ChevronRight size={12} className="text-[#E8E8E8]/25" />
          <span
            className="text-base text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isEditMode ? "Edit Project" : "Add New Project"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/studio/projects")}
            className="px-5 py-2 rounded-lg text-sm text-[#E8E8E8]/50 hover:text-[#E8E8E8] transition-colors cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              border: "1px solid rgba(232,232,232,0.12)",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg text-sm text-[#E8E8E8] transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
            style={{
              fontFamily: "var(--font-inter)",
              background:
                "linear-gradient(135deg, #8D6C3C 0%, #725F45 55%, #8D6C3C 100%)",
              boxShadow: "0 4px 20px rgba(141,108,60,0.3)",
            }}
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
                ? "Update Project"
                : "Save Project"}
          </button>
        </div>
      </div>

      {/* Centered form content */}
      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
        {error && (
          <p
            className="text-sm text-red-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {error}
          </p>
        )}

        {/* Project Details Card */}
        <div
          className="rounded-xl p-6 flex flex-col gap-6"
          style={{
            backgroundColor: "#0A121E",
            border: "1px solid rgba(232,232,232,0.08)",
          }}
        >
          <h2
            className="text-xs font-medium text-[#E8E8E8] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Project Details
          </h2>

          {/* Name + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs text-[#E8E8E8]/50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Portfolio Website"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/25 outline-none"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(232,232,232,0.12)",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs text-[#E8E8E8]/50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                required
                className="w-full rounded-lg px-4 py-2.5 text-sm text-[#E8E8E8] outline-none"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "#0A121E",
                  border: "1px solid rgba(232,232,232,0.12)",
                }}
              >
                <option value="" disabled>
                  Select category
                </option>
                {PROJECT_CATEGORIES.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    style={{ backgroundColor: "#0A121E" }}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom category */}
          {isOtherCategory && (
            <div className="flex flex-col gap-2">
              <label
                className="text-xs text-[#E8E8E8]/50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Custom Category <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter your category"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/25 outline-none"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(232,232,232,0.12)",
                }}
              />
            </div>
          )}

          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs text-[#E8E8E8]/50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Short Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              rows={3}
              maxLength={160}
              placeholder="Brief description of the project..."
              className="w-full rounded-lg px-4 py-2.5 text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/25 outline-none resize-none"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(232,232,232,0.12)",
              }}
            />
            <p
              className="text-[10px] text-[#E8E8E8]/25 text-right"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {shortDescription.length}/160
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs text-[#E8E8E8]/50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Tech Stack
            </label>
            <TagInput
              tags={techStack}
              onChange={setTechStack}
              placeholder="Type a technology and press Enter..."
            />
            <p
              className="text-[10px] text-[#E8E8E8]/25"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Press Enter or comma to add. Backspace to remove last.
            </p>
          </div>
        </div>

        {/* Cover Image Card */}
        <div
          className="rounded-xl p-6 flex flex-col gap-4"
          style={{
            backgroundColor: "#0A121E",
            border: "1px solid rgba(232,232,232,0.08)",
          }}
        >
          <h2
            className="text-xs font-medium text-[#E8E8E8]/40 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Cover Image <span className="text-red-400">*</span>
          </h2>
          <ImageUpload
            value={coverImage}
            onChange={setCoverImage}
            existingImageUrl={existingImageUrl}
            onExistingImageRemove={() => setExistingImageUrl(null)}
          />
        </div>

        {/* Links + Display Order Card */}
        <div
          className="rounded-xl p-6 flex flex-col gap-6"
          style={{
            backgroundColor: "#0A121E",
            border: "1px solid rgba(232,232,232,0.08)",
          }}
        >
          <h2
            className="text-xs font-medium text-[#E8E8E8]/40 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Links & Order
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs text-[#E8E8E8]/50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Live URL <span className="text-[#E8E8E8]/25">(optional)</span>
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://yourproject.com"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/25 outline-none"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(232,232,232,0.12)",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs text-[#E8E8E8]/50"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                GitHub URL <span className="text-[#E8E8E8]/25">(optional)</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/you/project"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/25 outline-none"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(232,232,232,0.12)",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 max-w-45">
            <label
              className="text-xs text-[#E8E8E8]/50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Display Order <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              min={1}
              required
              className="w-full rounded-lg px-4 py-2.5 text-sm text-[#E8E8E8] outline-none"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(232,232,232,0.12)",
              }}
            />
            <p
              className="text-[10px] text-[#E8E8E8]/25"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Auto-assigned. Change to reorder.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
