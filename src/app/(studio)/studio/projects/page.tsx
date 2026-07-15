// src/app/(studio)/studio/projects/page.tsx
import { getAllProjects } from "@/lib/supabase/queries/projects";
import ProjectsTable from "@/components/studio/projects/ProjectsTable";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsTable projects={projects} />;
}
