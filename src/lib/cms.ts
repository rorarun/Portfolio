import { createClient } from "@supabase/supabase-js";
// Integration scaffold. Not imported by the public portfolio until the authenticated
// editor, version validation, and published-content adapter are implemented.
export function createCmsClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("CMS not configured");
  return createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}
