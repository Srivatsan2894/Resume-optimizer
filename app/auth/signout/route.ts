import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Build the redirect URL from the public host (Codespaces/Vercel safe)
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host');
  const proto = headersList.get('x-forwarded-proto') ?? 'https';
  const origin = `${proto}://${host}`;

  return NextResponse.redirect(`${origin}/`, { status: 302 });
}