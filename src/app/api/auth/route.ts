// src/app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { supabaseServer } from "@/lib/supabase/server";

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 30;
const SESSION_DURATION_DAYS = 7;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

// ─── POST /api/auth ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 },
      );
    }

    const ip = getClientIp(req);

    // ── 1. Check lockout status ──────────────────────────────────────────────
    const { data: attemptRecord } = await supabaseServer
      .from("admin_login_attempts")
      .select("id, locked_until")
      .eq("ip_address", ip)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (attemptRecord?.locked_until) {
      const lockedUntil = new Date(attemptRecord.locked_until);
      const now = new Date();

      if (lockedUntil > now) {
        const remainingMs = lockedUntil.getTime() - now.getTime();
        const remainingMinutes = Math.ceil(remainingMs / 1000 / 60);

        return NextResponse.json(
          {
            success: false,
            error: `Too many attempts. Try again in ${remainingMinutes} minute${remainingMinutes === 1 ? "" : "s"}.`,
            lockedUntil: lockedUntil.toISOString(),
          },
          { status: 429 },
        );
      }
    }

    // ── 2. Fetch admin user ──────────────────────────────────────────────────
    const { data: adminUser } = await supabaseServer
      .from("admin_users")
      .select("id, username, password_hash")
      .eq("username", username)
      .single();

    // ── 3. Verify password ───────────────────────────────────────────────────
    const isValid =
      adminUser != null &&
      (await bcrypt.compare(password, adminUser.password_hash));

    if (!isValid) {
      // Count recent failed attempts for this IP
      const { count } = await supabaseServer
        .from("admin_login_attempts")
        .select("id", { count: "exact" })
        .eq("ip_address", ip)
        .is("locked_until", null);

      const failedAttempts = (count ?? 0) + 1; // +1 for this attempt

      // Determine if we should lock
      const shouldLock = failedAttempts >= MAX_ATTEMPTS;
      const lockedUntil = shouldLock
        ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString()
        : null;

      // Record this failed attempt
      await supabaseServer.from("admin_login_attempts").insert({
        ip_address: ip,
        locked_until: lockedUntil,
      });

      if (shouldLock) {
        return NextResponse.json(
          {
            success: false,
            error: `Too many failed attempts. Locked for ${LOCKOUT_MINUTES} minutes.`,
            lockedUntil,
          },
          { status: 429 },
        );
      }

      const attemptsLeft = MAX_ATTEMPTS - failedAttempts;
      return NextResponse.json(
        {
          success: false,
          error: `Invalid credentials. ${attemptsLeft} attempt${attemptsLeft === 1 ? "" : "s"} remaining.`,
        },
        { status: 401 },
      );
    }

    // ── 4. Success — clear failed attempts and issue session cookie ──────────
    await supabaseServer
      .from("admin_login_attempts")
      .delete()
      .eq("ip_address", ip);

    // Sign a JWT session token
    const token = await new SignJWT({ username: adminUser.username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${SESSION_DURATION_DAYS}d`)
      .sign(getSecret());

    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set HTTP-only session cookie
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[AUTH ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
