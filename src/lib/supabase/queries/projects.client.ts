// src/lib/supabase/queries/projects.client.ts
import { supabaseClient } from "@/lib/supabase/client";

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
