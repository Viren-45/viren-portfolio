// src/lib/supabase/queries/projects.client.ts
import { supabaseClient } from "@/lib/supabase/client";
import type { Project } from "@/types";

// ─── Upload cover image ───────────────────────────────────────────────────────
export async function uploadProjectImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const filename = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseClient.storage
    .from("project-images")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabaseClient.storage
    .from("project-images")
    .getPublicUrl(filename);

  return data.publicUrl;
}

// ─── Get all projects (public) ────────────────────────────────────────────────
export async function getPublicProjects(): Promise<Project[]> {
  const { data, error } = await supabaseClient
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data ?? [];
}
