import { createClient } from '@supabase/supabase-js';

// Connected Supabase Project Credentials
export const SUPABASE_URL = 'https://dqkdiokxjubtmgckbyru.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxa2Rpb2t4anVidG1nY2tieXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjQ5MTAsImV4cCI6MjAzOTQwMDkxMH0.sample_key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to check live database connectivity
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('categories').select('count', { count: 'exact', head: true });
    if (error) {
      console.warn('[Supabase Client] DB connection warning:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[Supabase Client] Exception connecting to Supabase:', e);
    return false;
  }
}
