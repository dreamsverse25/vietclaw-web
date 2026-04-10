import { createClient } from "@supabase/supabase-js";

/** Server-only: đọc/ghi theo clerk_id (không dùng session Supabase Auth). Cần SUPABASE_SERVICE_ROLE_KEY. */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}
