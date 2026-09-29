# Curatia Alpha - Foundation A Migration Plan

Status: implementation plan on `feature/curatia-alpha-foundation`

## Verified baseline

The live Supabase project is ahead of the Git repository migration history.

Live database currently contains:
- `scout_runs`
- `sources`
- `signals`
- `signal_sources`
- `portfolio_publications`

At Foundation A inspection time the live database contained:
- 10 Signals
- 14 Sources
- 16 Signal-Source relationships
- 2 Scout Runs
- 6 portfolio publications

The live migration ledger also includes migrations after the repository's original Trend Scout migration, including hardening and portfolio-publication migrations.

**Requirement:** reconcile missing live migration definitions/history into Git before treating repository migrations as a reproducible database source.

## Current application risks

1. Authentication uses one shared `APP_ACCESS_KEY`.
2. The app uses a service-role Supabase client for reads/writes.
3. Trend Radar queries have no workspace predicate.
4. Existing Trend Radar tables have no `workspace_id`.
5. Existing RLS deliberately denies browser/authenticated roles because the prototype is server-only.
6. Applying multi-user authentication before workspace scoping would create a cross-workspace data exposure risk.

Therefore managed multi-user Auth must not be enabled in production until tenancy enforcement is in place.

## Safe migration strategy

Foundation A is additive.

### Migration A1 - identity and workspace foundation

Create:
- `profiles`
- `workspaces`
- `workspace_members`
- `platform_roles`
- `workspace_entitlements`
- `audit_events`

Roles:
- platform: `owner`
- workspace: `admin | creator | viewer`

Do not create a fake Admin identity for the Owner. The Owner is a real authenticated user who can also hold an Admin membership in Guilherme's workspace.

### Migration A2 - workspace ownership columns

Add nullable `workspace_id` to existing workspace-owned domains:
- `scout_runs`
- `sources`
- `signals`
- `portfolio_publications`

`signal_sources` derives workspace consistency from its parent Signal/Source relationships. Add a consistency constraint/trigger only after the parent records are backfilled.

Do not immediately make the new columns NOT NULL because existing production rows must first be assigned safely.

### Migration A3 - bootstrap and backfill

After Guilherme signs in through managed Auth and has a real `auth.users.id`:

1. create/update Guilherme's `profiles` row
2. grant platform `owner`
3. create Guilherme's initial workspace
4. grant Guilherme `admin` membership in that workspace
5. seed workspace entitlements
6. assign all existing BA Content Engine canonical records to that workspace
7. validate row counts and relationships

The bootstrap must identify the authenticated Owner centrally. Do not scatter email checks through application code and do not hard-code a generated auth UUID in migrations.

### Migration A4 - enforce tenancy

Only after backfill validation:
- make required `workspace_id` columns NOT NULL
- add workspace indexes
- add/adjust uniqueness constraints to be workspace-aware where appropriate
- implement RLS/helper functions for authenticated workspace access
- preserve service-role access for trusted background workers
- enforce Signal/Source relationship workspace consistency

### Application A5 - managed authentication

Replace shared access-key authentication with managed Supabase Auth.

Target providers:
- Google
- GitHub
- Facebook when channel/integration value justifies enabling it
- email/password

Application authorization derives from platform/workspace membership, not provider identity.

### Application A6 - workspace-aware domain services

All domain reads/writes must require an authorization context containing:
- authenticated user
- active workspace
- workspace role
- platform role where applicable

Service-role database access must never mean "skip tenancy". Server-side domain services must explicitly scope queries to the authorized workspace even when the technical client has elevated database privileges.

## Initial Alpha entitlements

Default non-Owner workspace:
- 100 active Signals
- 500 Sources
- 50 Ideas
- 50 Content Items
- 5 generated visual versions per Content Item
- 250 MB asset storage
- 30-day operational logs
- 30-day detailed AI payloads
- 12-month workflow/audit history
- 12-month analytics snapshots

Entitlements are data/configuration, not constants scattered through UI/business code.

## Cutover rule

Do not remove `APP_ACCESS_KEY` from the currently working deployment until:
1. managed Auth works in the Curatia branch/runtime
2. Owner bootstrap is complete
3. existing records are assigned to Guilherme's workspace
4. workspace isolation tests pass
5. Trend Radar read/write regression tests pass
6. production cutover is explicitly approved

## Foundation A acceptance criteria

- Repository reflects actual database migration history sufficiently for reproducible development.
- Curatia tenancy schema exists as reviewed migration code.
- Existing data migration path is explicit and non-destructive.
- Owner is a real user plus workspace member, not an impersonated/fake Admin.
- No cross-workspace query is possible through Curatia domain services.
- Existing Trend Radar behavior remains intact until explicit cutover.
- No production schema/auth/deployment mutation occurs merely by committing migration files.
