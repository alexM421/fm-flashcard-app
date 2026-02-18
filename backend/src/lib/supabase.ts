import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseApiKey = process.env.SUPABASE_API_KEY!;

/** Default client (no user context). Use for admin or when RLS is not needed. */
export const supabase = createClient(supabaseUrl, supabaseApiKey);

/**
 * Create a Supabase client that uses the given JWT for all requests.
 * Use this so Supabase (and Row Level Security) sees the authenticated user.
 * Prefer SUPABASE_ANON_KEY here if you use RLS; service role bypasses RLS.
 */
export function getSupabaseWithAuth(jwt: string): SupabaseClient {
  return createClient(supabaseUrl, supabaseApiKey, {
    global: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  });
}
