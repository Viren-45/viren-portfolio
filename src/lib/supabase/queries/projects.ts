// src/lib/supabase/queries/projects.ts
import { supabaseServer } from "@/lib/supabase/server";
import type { Project, ProjectFormData } from "@/types";

// ─── Get next display order ───────────────────────────────────────────────────
export async function getNextDisplayOrder(): Promise<number> {
  const { data } = await supabaseServer
    .from("projects")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  return data ? data.display_order + 1 : 1;
}

// ─── Check display order is unique ───────────────────────────────────────────
export async function isDisplayOrderUnique(
  order: number,
  excludeId?: string,
): Promise<boolean> {
  let query = supabaseServer
    .from("projects")
    .select("id")
    .eq("display_order", order);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data } = await query;
  return !data || data.length === 0;
}

// ─── Create project ───────────────────────────────────────────────────────────
export async function createProject(
  formData: ProjectFormData,
): Promise<Project> {
  const { data, error } = await supabaseServer
    .from("projects")
    .insert(formData)
    .select()
    .single();

  if (error) throw new Error(`Failed to create project: ${error.message}`);
  return data;
}

// ─── Get all projects (admin) ─────────────────────────────────────────────────
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabaseServer
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data ?? [];
}

// ─── Get all projects (public — server side) ──────────────────────────────────
export async function getPublicProjectsServer(): Promise<Project[]> {
  const { data, error } = await supabaseServer
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data ?? [];
}

// ─── Get project by ID (admin) ────────────────────────────────────────────────
export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabaseServer
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
