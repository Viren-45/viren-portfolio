// src/hooks/useAddProject.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadProjectImage } from "@/lib/supabase/queries/projects.client";
import type { Project, ProjectCategory } from "@/types";

interface UseAddProjectProps {
  nextDisplayOrder: number;
  project?: Project; // if passed → edit mode
}

export function useAddProject({
  nextDisplayOrder,
  project,
}: UseAddProjectProps) {
  const router = useRouter();
  const isEditMode = !!project;

  // Form state — prefilled if editing
  const [name, setName] = useState(project?.name ?? "");
  const [shortDescription, setShortDescription] = useState(
    project?.short_description ?? "",
  );
  const [category, setCategory] = useState<ProjectCategory | "">(
    (project?.category as ProjectCategory) ?? "",
  );
  const [customCategory, setCustomCategory] = useState("");
  const [techStack, setTechStack] = useState<string[]>(
    project?.tech_stack ?? [],
  );
  const [coverImage, setCoverImage] = useState<File | null>(null);
  // Existing image URL — kept if user doesn't upload a new one in edit mode
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
    project?.cover_image_url ?? null,
  );
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [displayOrder, setDisplayOrder] = useState(
    project?.display_order ?? nextDisplayOrder,
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isOtherCategory = category === "Other";
  const finalCategory = isOtherCategory ? customCategory : category;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // In add mode a new image is required
    // In edit mode existing image is acceptable
    if (!coverImage && !existingImageUrl) {
      setError("Please upload a cover image.");
      return;
    }
    if (isOtherCategory && !customCategory.trim()) {
      setError("Please enter a custom category.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload new image if provided, otherwise keep existing URL
      let coverImageUrl = existingImageUrl ?? "";
      if (coverImage) {
        coverImageUrl = await uploadProjectImage(coverImage);
      }

      const payload = {
        name,
        short_description: shortDescription,
        category: finalCategory,
        tech_stack: techStack,
        cover_image_url: coverImageUrl,
        live_url: liveUrl || null,
        github_url: githubUrl || null,
        display_order: displayOrder,
      };

      const res = await fetch(
        isEditMode ? `/api/projects/${project.id}` : "/api/projects",
        {
          method: isEditMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to save project.");
        return;
      }

      router.push("/studio/projects");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Form values
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
    // Derived
    isOtherCategory,
    isEditMode,
    // UI state
    isSubmitting,
    error,
    // Actions
    handleSubmit,
  };
}
