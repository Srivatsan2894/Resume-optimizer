import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client for use in CLIENT COMPONENTS (browser).
 *
 * Use this when:
 * - User is filling out a login form
 * - User clicks a button that triggers a Supabase call
 * - Any code that runs in the browser
 *
 * Do NOT use this in Server Components or API routes.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}