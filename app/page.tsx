import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  // Try to connect to Supabase
  const supabase = await createClient();

  // Run a harmless query — just count rows in the resumes table.
  // No user is logged in yet, so this returns 0 (RLS blocks reads for anonymous users).
  // What we care about: did the connection succeed?
  const { error } = await supabase.from('resumes').select('id', { count: 'exact', head: true });

  const connected = !error;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-50">
      <h1 className="text-4xl font-bold mb-4">Resume Optimizer</h1>
      <p className="text-slate-600 mb-8">AI-powered resume optimization for ATS</p>

      <div className={`px-6 py-4 rounded-lg ${connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {connected
          ? '✅ Connected to Supabase successfully'
          : `❌ Connection failed: ${error?.message ?? 'Unknown error'}`}
      </div>
    </main>
  );
}