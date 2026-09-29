create table if not exists public.portfolio_publications (
  public_id text primary key check (length(trim(public_id)) > 0),
  channel text not null check (channel = 'linkedin'),
  title text not null check (length(trim(title)) > 0),
  summary text not null check (length(trim(summary)) > 0),
  category text,
  url text not null unique check (url ~ '^https://(www\\.)?linkedin\\.com/'),
  published_at timestamptz not null,
  portfolio boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source_system text not null default 'manual'
    check (source_system in ('manual','metricool','linkedin','ba_content_engine')),
  source_external_id text,
  last_synced_at timestamptz,
  publication_status text not null default 'published'
    check (publication_status in ('scheduled','published','cancelled','failed')),
  scheduled_at timestamptz,
  metricool_post_id text,
  metricool_post_uuid text
);

drop trigger if exists portfolio_publications_set_updated_at on public.portfolio_publications;
create trigger portfolio_publications_set_updated_at
before update on public.portfolio_publications
for each row execute function public.set_updated_at();

alter table public.portfolio_publications enable row level security;
grant all on table public.portfolio_publications to service_role;
