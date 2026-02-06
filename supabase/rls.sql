alter table public.site_content enable row level security;
alter table public.site_revisions enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where email = auth.email()
  );
$$;

create policy "public read site content"
on public.site_content
for select
using (true);

create policy "admin write site content"
on public.site_content
for all
using (public.is_admin())
with check (public.is_admin());

create policy "admin read revisions"
on public.site_revisions
for select
using (public.is_admin());

create policy "admin write revisions"
on public.site_revisions
for insert
with check (public.is_admin());

create policy "admin read admin_users"
on public.admin_users
for select
using (public.is_admin());

create policy "admin write admin_users"
on public.admin_users
for insert
with check (public.is_admin());
