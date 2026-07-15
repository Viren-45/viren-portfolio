// src/hooks/useProjectsFilter.ts
"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/types";

export function useProjectsFilter(projects: Project[]) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Unique categories from actual projects
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return unique.sort();
  }, [projects]);

  // Filtered projects
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, search, selectedCategory]);

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    filtered,
  };
}
