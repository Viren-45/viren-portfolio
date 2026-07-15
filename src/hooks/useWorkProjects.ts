// src/hooks/useWorkProjects.ts
"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/types";

export function useWorkProjects(projects: Project[]) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("display_order");

  // Unique categories from actual data
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return unique.sort();
  }, [projects]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...projects];

    // Filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "display_order":
      default:
        result.sort((a, b) => a.display_order - b.display_order);
        break;
    }

    return result;
  }, [projects, selectedCategory, sortBy]);

  return {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    filtered,
  };
}
