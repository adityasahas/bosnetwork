import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service role key.
// Lazily initialized to avoid crashing at build time when env vars aren't set.

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
    );
  }

  _supabase = createClient(url, key);
  return _supabase;
}
