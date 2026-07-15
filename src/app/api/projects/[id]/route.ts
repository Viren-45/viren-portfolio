// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { supabaseServer } from "@/lib/supabase/server";
import { isDisplayOrderUnique } from "@/lib/supabase/queries/projects";

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

// ─── DELETE /api/projects/[id] ────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;

    // Fetch project to get cover image URL for storage cleanup
    const { data: project } = await supabaseServer
      .from("projects")
      .select("cover_image_url")
      .eq("id", id)
      .single();

    // Delete from DB
    const { error } = await supabaseServer
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    // Delete image from storage
    if (project?.cover_image_url) {
      const filename = project.cover_image_url.split("/").pop();
      if (filename) {
        await supabaseServer.storage.from("project-images").remove([filename]);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[PROJECT DELETE ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}

// ─── PUT /api/projects/[id] ───────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const {
      name,
      short_description,
      category,
      tech_stack,
      cover_image_url,
      live_url,
      github_url,
      display_order,
    } = body;

    if (
      !name ||
      !short_description ||
      !category ||
      !cover_image_url ||
      !display_order
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    // Check display order uniqueness excluding current project
    const isUnique = await isDisplayOrderUnique(display_order, id);
    if (!isUnique) {
      return NextResponse.json(
        {
          success: false,
          error: `Display order ${display_order} is already taken.`,
        },
        { status: 409 },
      );
    }

    const { data, error } = await supabaseServer
      .from("projects")
      .update({
        name,
        short_description,
        category,
        tech_stack: tech_stack ?? [],
        cover_image_url,
        live_url: live_url ?? null,
        github_url: github_url ?? null,
        display_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("[PROJECT PUT ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}
