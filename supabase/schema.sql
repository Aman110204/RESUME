create table if not exists public.site_content (
  id integer primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists public.site_revisions (
  id bigserial primary key,
  site_id integer references public.site_content(id) on delete cascade,
  data jsonb not null,
  created_at timestamptz default now(),
  created_by uuid default auth.uid()
);

create table if not exists public.admin_users (
  id bigserial primary key,
  email text unique not null,
  created_at timestamptz default now()
);
