// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import {
  createProject,
  isDisplayOrderUnique,
} from "@/lib/supabase/queries/projects";

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

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 },
      );
    }

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

    // Validate required fields
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

    // Check display order uniqueness
    const isUnique = await isDisplayOrderUnique(display_order);
    if (!isUnique) {
      return NextResponse.json(
        {
          success: false,
          error: `Display order ${display_order} is already taken.`,
        },
        { status: 409 },
      );
    }

    const project = await createProject({
      name,
      short_description,
      category,
      tech_stack: tech_stack ?? [],
      cover_image_url,
      live_url: live_url ?? null,
      github_url: github_url ?? null,
      display_order,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (err) {
    console.error("[PROJECTS POST ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}
