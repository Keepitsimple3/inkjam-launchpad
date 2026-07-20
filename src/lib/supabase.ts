import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type WaitlistEntry = {
  id: string;
  email: string;
  signature_png: string | null;
  created_at: string;
};

/**
 * Join the waitlist. Returns the 1-based position in line.
 * Throws on error. Duplicate emails throw a friendly error.
 */
export async function joinWaitlist(
  email: string,
  signaturePng: string | null,
): Promise<{ position: number; total: number }> {
  const { error } = await supabase
    .from("waitlist_entries")
    .insert({ email: email.trim().toLowerCase(), signature_png: signaturePng });

  if (error) {
    // 23505 = unique_violation (email already on the list)
    if (error.code === "23505") {
      const { data: pos } = await supabase
        .rpc("waitlist_position", { p_email: email.trim().toLowerCase() });
      const { data: total } = await supabase.rpc("waitlist_count");
      return { position: pos ?? 0, total: total ?? 0 };
    }
    throw error;
  }

  const [{ data: pos }, { data: total }] = await Promise.all([
    supabase.rpc("waitlist_position", { p_email: email.trim().toLowerCase() }),
    supabase.rpc("waitlist_count"),
  ]);

  return { position: pos ?? 0, total: total ?? 0 };
}

/** Live total count of waitlist signups (for the social-proof counter). */
export async function getWaitlistTotal(): Promise<number> {
  const { data, error } = await supabase.rpc("waitlist_count");
  if (error) return 0;
  return typeof data === "number" ? data : Number(data) || 0;
}
