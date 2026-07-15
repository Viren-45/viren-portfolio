// src/hooks/useSkillsFilter.ts
"use client";

import { useState } from "react";

export type SkillCategory =
  | "All"
  | "Frontend"
  | "Backend"
  | "Security & AI"
  | "Tools & DevOps";

export function useSkillsFilter() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");
  return { activeCategory, setActiveCategory };
}
