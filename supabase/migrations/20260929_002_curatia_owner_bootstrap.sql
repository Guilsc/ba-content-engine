-- Curatia Alpha Foundation A2
-- Owner/workspace bootstrap helper.
-- Run only after the designated Owner has authenticated through managed Supabase Auth.
-- No auth UUID or email is hard-coded here.

create or replace function public.bootstrap_curatia_owner(
  p_user_id uuid,
  p_display_name text,
  p_workspace_name text,
  p_workspace_slug text
)
returns uuid
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
declare
  v_workspace_id uuid;
begin
  if p_user_id is null or not exists (
    select 1 from auth.users where id = p_user_id
  ) then
    raise exception 'A valid authenticated user id is required.';
  end if;

  if exists (select 1 from public.platform_roles where role = 'owner' and user_id <> p_user_id) then
    raise exception 'Curatia Alpha already has a different platform Owner.';
  end if;

  insert into public.profiles (user_id, display_name)
  values (p_user_id, nullif(trim(p_display_name), ''))
  on conflict (user_id) do update
    set display_name = excluded.display_name,
        updated_at = now();

  insert into public.platform_roles (user_id, role, granted_by)
  values (p_user_id, 'owner', p_user_id)
  on conflict (user_id) do update
    set role = 'owner';

  select id into v_workspace_id
  from public.workspaces
  where slug = p_workspace_slug;

  if v_workspace_id is null then
    insert into public.workspaces (name, slug, created_by)
    values (p_workspace_name, p_workspace_slug, p_user_id)
    returning id into v_workspace_id;
  end if;

  insert into public.workspace_members (workspace_id, user_id, role, invited_by)
  values (v_workspace_id, p_user_id, 'admin', p_user_id)
  on conflict (workspace_id, user_id) do update
    set role = 'admin',
        updated_at = now();

  insert into public.workspace_entitlements (workspace_id)
  values (v_workspace_id)
  on conflict (workspace_id) do nothing;

  insert into public.audit_events (
    workspace_id, actor_user_id, event_type, target_type, target_id, metadata
  )
  values (
    v_workspace_id,
    p_user_id,
    'platform.owner_bootstrapped',
    'workspace',
    v_workspace_id::text,
    jsonb_build_object('workspace_slug', p_workspace_slug)
  );

  return v_workspace_id;
end;
$$;

revoke all on function public.bootstrap_curatia_owner(uuid, text, text, text)
  from public, anon, authenticated;
grant execute on function public.bootstrap_curatia_owner(uuid, text, text, text)
  to service_role;

-- Separate backfill function so bootstrap and data assignment can be validated independently.
create or replace function public.backfill_legacy_data_to_workspace(
  p_workspace_id uuid,
  p_actor_user_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_scout_runs integer;
  v_sources integer;
  v_signals integer;
  v_publications integer;
begin
  if not exists (
    select 1
    from public.workspace_members
    where workspace_id = p_workspace_id
      and user_id = p_actor_user_id
      and role = 'admin'
  ) then
    raise exception 'Actor must be an Admin of the target workspace.';
  end if;

  update public.scout_runs
  set workspace_id = p_workspace_id
  where workspace_id is null;
  get diagnostics v_scout_runs = row_count;

  update public.sources
  set workspace_id = p_workspace_id
  where workspace_id is null;
  get diagnostics v_sources = row_count;

  update public.signals
  set workspace_id = p_workspace_id
  where workspace_id is null;
  get diagnostics v_signals = row_count;

  update public.portfolio_publications
  set workspace_id = p_workspace_id
  where workspace_id is null;
  get diagnostics v_publications = row_count;

  insert into public.audit_events (
    workspace_id, actor_user_id, event_type, target_type, target_id, metadata
  )
  values (
    p_workspace_id,
    p_actor_user_id,
    'migration.legacy_data_backfilled',
    'workspace',
    p_workspace_id::text,
    jsonb_build_object(
      'scout_runs', v_scout_runs,
      'sources', v_sources,
      'signals', v_signals,
      'portfolio_publications', v_publications
    )
  );

  return jsonb_build_object(
    'scout_runs', v_scout_runs,
    'sources', v_sources,
    'signals', v_signals,
    'portfolio_publications', v_publications
  );
end;
$$;

revoke all on function public.backfill_legacy_data_to_workspace(uuid, uuid)
  from public, anon, authenticated;
grant execute on function public.backfill_legacy_data_to_workspace(uuid, uuid)
  to service_role;
