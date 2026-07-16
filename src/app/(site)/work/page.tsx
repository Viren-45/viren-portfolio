// src/app/(site)/work/page.tsx
export const revalidate = 0;
import WorkHero from "@/components/work/WorkHero";
import WorkContent from "@/components/work/WorkContent";
import { getPublicProjectsServer } from "@/lib/supabase/queries/projects";

export default async function WorkPage() {
  const projects = await getPublicProjectsServer();

  return (
    <main
      className="min-h-screen pb-28 md:pb-0"
      style={{ backgroundColor: "#0D1117" }}
    >
      <WorkHero />
      <WorkContent projects={projects} />
    </main>
  );
}
