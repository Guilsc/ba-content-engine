-- Phase 2A: canonical public portfolio publications
-- Keeps publication state in Supabase so consumers never need a hard-coded fallback.

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  channel text not null,
  title text not null,
  summary text not null,
  category text,
  url text not null unique,
  status text not null default 'Draft',
  portfolio_visible boolean not null default false,
  archived_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint publications_status_check check (status in ('Draft','Approved','Scheduled','Published','Archived'))
);

create index if not exists publications_public_portfolio_idx
  on public.publications (channel, status, portfolio_visible, published_at desc)
  where archived_at is null;

alter table public.publications enable row level security;

comment on table public.publications is
  'Canonical publication metadata. Public API exposes only Published, portfolio-visible, non-archived rows.';
