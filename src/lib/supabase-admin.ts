import { createClient } from "@supabase/supabase-js";

// Server-only. Full database access, bypasses Row Level Security entirely.
// Never import this into a Client Component or anything that ships to the
// browser, only Route Handlers, Server Actions, or other server-only code.
// Built lazily (not a module-scope singleton) so a missing env var throws
// only when actually used, not at build/import time, that broke the whole
// production build before when a similar client was created eagerly.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase admin client is missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(url, serviceKey);
}
