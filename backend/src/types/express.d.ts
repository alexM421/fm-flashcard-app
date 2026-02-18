import { User } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      /** Set by authMiddleware: the validated Supabase user. */
      user?: User;
      /** Set by authMiddleware: the raw JWT (access token). */
      token?: string;
      /** Set by authMiddleware: Supabase client using this request's JWT (user context for RLS). */
      supabase?: SupabaseClient;
    }
  }
}

export {};
