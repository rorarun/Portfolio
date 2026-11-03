-- Run in a NEW Supabase project. Admin membership is provisioned through SQL only.
create table public.portfolio_admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.portfolio_admins enable row level security;
create policy "Read own membership" on public.portfolio_admins for select to authenticated using (user_id = auth.uid());
create function public.is_portfolio_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.portfolio_admins where user_id=auth.uid()) $$;
revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;
create table public.portfolio_content (
 id text primary key check (id in ('profile','projects','experience','skills','education','socials','site-config')),
 draft jsonb not null default '{}'::jsonb,
 published jsonb,
 updated_at timestamptz not null default now()
);
alter table public.portfolio_content enable row level security;
create policy "Admin content access" on public.portfolio_content for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());
-- Drafts are never readable by anonymous visitors. Public adapter must expose
-- only validated published JSON, through a separate view or server endpoint.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('portfolio-assets','portfolio-assets',false,5242880,array['image/jpeg','image/png','image/webp','application/pdf']);
create policy "Admin asset access" on storage.objects for all to authenticated using (bucket_id='portfolio-assets' and public.is_portfolio_admin()) with check (bucket_id='portfolio-assets' and public.is_portfolio_admin());
