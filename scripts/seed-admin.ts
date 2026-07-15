import { config } from "dotenv";
config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

// ─── Config ───────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;

const USERNAME = "virendra45";
const PLAIN_PASSWORD = process.env.ADMIN_PASSWORD!;

// ─── Run ──────────────────────────────────────────────────────────────────────
async function seedAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error("❌ Missing Supabase environment variables.");
    process.exit(1);
  }

  if (!PLAIN_PASSWORD) {
    console.error("❌ Missing ADMIN_PASSWORD environment variable.");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

  // Check if admin already exists
  const { data: existing } = await supabase
    .from("admin_users")
    .select("id")
    .eq("username", USERNAME)
    .single();

  if (existing) {
    console.log("⚠️  Admin user already exists. Skipping.");
    process.exit(0);
  }

  // Hash password with bcrypt — 12 rounds
  const password_hash = await bcrypt.hash(PLAIN_PASSWORD, 12);

  const { error } = await supabase.from("admin_users").insert({
    username: USERNAME,
    password_hash,
  });

  if (error) {
    console.error("❌ Failed to seed admin user:", error.message);
    process.exit(1);
  }

  console.log("✅ Admin user seeded successfully.");
  console.log(`   Username: ${USERNAME}`);
  console.log("   Password: [hashed — original not stored]");
}

seedAdmin();
