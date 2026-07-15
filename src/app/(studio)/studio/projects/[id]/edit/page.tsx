// src/app/(studio)/studio/projects/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import {
  getProjectById,
  getNextDisplayOrder,
} from "@/lib/supabase/queries/projects";
import AddProjectForm from "@/components/studio/projects/AddProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const [project, nextDisplayOrder] = await Promise.all([
    getProjectById(id),
    getNextDisplayOrder(),
  ]);

  if (!project) notFound();

  return (
    <AddProjectForm nextDisplayOrder={nextDisplayOrder} project={project} />
  );
}
