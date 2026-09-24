create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  content_key text not null unique,
  title text not null,
  summary text,
  body text not null,
  category text,
  channel text not null default 'linkedin',
  status text not null default 'Idea'
    check (status in (
      'Idea',
      'Candidate',
      'Research',
      'Draft',
      'Visual Ready',
      'Approved',
      'Scheduled',
      'Published',
      'Learning'
    )),
  scheduled_at timestamptz,
  published_at timestamptz,
  metricool_id text,
  metricool_uuid text,
  external_post_id text,
  external_url text,
  show_on_portfolio boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index content_items_metricool_uuid_uq
  on public.content_items (metricool_uuid)
  where metricool_uuid is not null;

create unique index content_items_external_post_uq
  on public.content_items (channel, external_post_id)
  where external_post_id is not null;

create index content_items_status_idx
  on public.content_items (status);

create index content_items_published_at_idx
  on public.content_items (published_at desc)
  where status = 'Published';

create index content_items_portfolio_feed_idx
  on public.content_items (published_at desc)
  where status = 'Published' and show_on_portfolio = true;

create trigger content_items_set_updated_at
before update on public.content_items
for each row execute function public.set_updated_at();

alter table public.content_items enable row level security;

revoke all on table public.content_items from anon, authenticated;
grant select on table public.content_items to anon, authenticated;
grant all on table public.content_items to service_role;

create policy "published portfolio posts are publicly readable"
on public.content_items
for select
to anon, authenticated
using (
  status = 'Published'
  and show_on_portfolio = true
);
