// src/app/(site)/work/page.tsx
import WorkHero from "@/components/work/WorkHero";
import ProjectsGrid from "@/components/work/ProjectsGrid";
import { getPublicProjectsServer } from "@/lib/supabase/queries/projects";

export default async function WorkPage() {
  const projects = await getPublicProjectsServer();

  return (
    <main
      className="min-h-screen flex flex-col w-full"
      style={{ backgroundColor: "#0D1117" }}
    >
      <WorkHero />
      <ProjectsGrid projects={projects} />
    </main>
  );
}
