// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/lib/supabase/server";
import { contactEmailHtml } from "@/lib/email/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    // ── 1. Save to Supabase — never lose a message ────────────────────────────
    const { error: dbError } = await supabaseServer
      .from("contact_messages")
      .insert({ name, email, message });

    if (dbError) {
      console.error("[CONTACT DB ERROR]", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to save message." },
        { status: 500 },
      );
    }

    // ── 2. Send email via Resend — if it fails, message is still saved ────────
    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "2000virendrarajpurohit@gmail.com",
        subject: `New message: ${subject}`,
        html: contactEmailHtml({ name, email, subject, message }),
      });
    } catch (emailError) {
      // Log but don't fail — message already saved to DB
      console.error("[CONTACT EMAIL ERROR]", emailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[CONTACT ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}
