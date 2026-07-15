// src/app/(studio)/studio/projects/add/page.tsx
import { getNextDisplayOrder } from "@/lib/supabase/queries/projects";
import AddProjectForm from "@/components/studio/projects/AddProjectForm";

export default async function AddProjectPage() {
  const nextDisplayOrder = await getNextDisplayOrder();
  return <AddProjectForm nextDisplayOrder={nextDisplayOrder} />;
}
