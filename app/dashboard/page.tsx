import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single();

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-600">
              Welcome, {profile?.full_name || user.email}
            </p>
          </div>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              You haven&apos;t uploaded any resumes yet. Upload functionality
              coming in the next step.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}