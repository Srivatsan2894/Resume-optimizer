import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * ADMIN client — uses the service role key.
 *
 * ⚠️ This bypasses Row Level Security. NEVER import this in:
 * - Client Components (browser)
 * - Any code that runs where a user could see it
 *
 * Used only for trusted server operations:
 * - Writing to usage_logs (rate limit tracking)
 * - Admin scripts
 * - Webhook handlers
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}