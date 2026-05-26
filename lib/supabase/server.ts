import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase client for use on the SERVER.
 *
 * Use this in:
 * - Server Components (most pages in app folder)
 * - Route Handlers (api routes)
 * - Server Actions
 *
 * It reads the user's session from cookies so calls run as that user
 * (and Row Level Security policies apply automatically).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — the middleware will refresh
            // the session on the next request. Safe to ignore.
          }
        },
      },
    }
  );
}