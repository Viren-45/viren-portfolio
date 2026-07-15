// src/lib/utils/studio-page-meta.ts
interface PageMeta {
  title: string;
  subtitle: string;
}

export const studioPageMeta: Record<string, PageMeta> = {
  "/studio": {
    title: "Welcome back, Virendra 👋",
    subtitle: "Here's what's happening with your portfolio.",
  },
  "/studio/projects": {
    title: "Projects",
    subtitle: "Manage and update your portfolio projects.",
  },
  "/studio/projects/add": {
    title: "Add New Project",
    subtitle: "Create a new project to showcase in your portfolio.",
  },
};
