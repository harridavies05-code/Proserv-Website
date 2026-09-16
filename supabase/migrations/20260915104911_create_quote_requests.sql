-- Quote requests table: stores contact-form / "get a quote" submissions.
-- Public (anon) visitors can only insert their own request, never read,
-- update, or delete any request, including their own. Only the service
-- role key (used server-side, e.g. in an API route) can read or manage
-- requests, since service_role bypasses RLS entirely by default in
-- Supabase, no policy is needed for it.

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  message text,
  status text not null default 'new'
);

alter table public.quote_requests enable row level security;

-- Belt and braces: don't rely on Supabase's default schema privileges,
-- state exactly what anon and authenticated can and can't do at the table
-- level. RLS policies below are the real gate, this just removes any
-- ambiguity about table-level grants.
revoke all on public.quote_requests from anon, authenticated;
grant insert on public.quote_requests to anon;

-- Anon can insert new quote requests (the public form), full stop.
create policy "anon can insert quote requests"
  on public.quote_requests
  for insert
  to anon
  with check (true);

-- Deliberately no select/update/delete policy for anon or authenticated.
-- With RLS enabled and no matching policy, those operations are denied by
-- default, so this table has no read/write access for anyone except
-- service_role.
