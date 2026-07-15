// src/lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

// Server-side Supabase client — uses secret key, bypasses RLS
export const supabaseServer = createClient(supabaseUrl, supabaseSecretKey);
