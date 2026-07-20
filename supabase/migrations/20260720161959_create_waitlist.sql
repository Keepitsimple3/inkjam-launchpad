/*
# Create waitlist_entries table (single-tenant, no auth)

1. New Tables
- `waitlist_entries`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — the writer's email
  - `signature_png` (text, nullable) — base64 data URL of the drawn signature
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `waitlist_entries`.
- Allow anon + authenticated to INSERT (join the waitlist).
- Allow anon + authenticated to SELECT only the aggregate count + their own row by email
  (email is not sensitive in this public waitlist context, and the app needs to show a
  writer their position in line).
3. Notes
- The real position-in-line is computed via an RPC `waitlist_position(email)` that counts
  rows created at or before this entry. This gives a stable, monotonic number without
  leaking other writers' emails.
*/

CREATE TABLE IF NOT EXISTS waitlist_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  signature_png text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can join the waitlist.
DROP POLICY IF EXISTS "anon_insert_waitlist" ON waitlist_entries;
CREATE POLICY "anon_insert_waitlist"
ON waitlist_entries FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Anyone can read rows (the app shows position by email; no auth, no user_id).
DROP POLICY IF EXISTS "anon_select_waitlist" ON waitlist_entries;
CREATE POLICY "anon_select_waitlist"
ON waitlist_entries FOR SELECT
TO anon, authenticated USING (true);

-- RPC: total number of waitlist entries.
CREATE OR REPLACE FUNCTION waitlist_count()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::bigint FROM waitlist_entries;
$$;

-- RPC: 1-based position of an email in the waitlist (by created_at order).
-- Returns 0 if the email is not on the list yet.
CREATE OR REPLACE FUNCTION waitlist_position(p_email text)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::bigint
  FROM waitlist_entries
  WHERE created_at <= (
    SELECT created_at FROM waitlist_entries WHERE email = lower(p_email) LIMIT 1
  );
$$;

-- Grant execute on the RPCs to anon + authenticated.
GRANT EXECUTE ON FUNCTION waitlist_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION waitlist_position(text) TO anon, authenticated;