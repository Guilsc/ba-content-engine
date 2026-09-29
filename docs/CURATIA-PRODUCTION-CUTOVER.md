# Curatia Alpha - Production Cutover Runbook

Status: release-candidate runbook. Execute only after CI is green and the Owner login identifier is configured.

## Preconditions

- PR #5 is green and approved.
- Production Supabase backup/recovery point is available.
- Existing Trend Radar row counts are recorded.
- Hostinger has the required server/public environment variables.
- Email/password Auth is enabled in Supabase.
- The initial Owner knows the Curatia login email/password to create.
- No automatic publishing is enabled by this release.

## Required environment

Browser-safe:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Server-only:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `CURATIA_BOOTSTRAP_OWNER_EMAIL`

`CURATIA_BOOTSTRAP_OWNER_EMAIL` is used only to recognize the first Owner bootstrap. Runtime authorization subsequently uses the immutable Auth user ID persisted in `platform_roles`.

## Staged database cutover

Do not blindly apply all Foundation migrations in one batch.

### Stage 1 - additive foundation

Apply:
1. `20260929_001_curatia_foundation_tenancy.sql`
2. `20260929_002_curatia_owner_bootstrap.sql`
3. `20260929_004_curatia_onboarding_channels.sql`

These add tenancy/onboarding structures while existing legacy Trend Radar records may still have NULL workspace ownership.

### Stage 2 - application deployment and Owner onboarding

Deploy the release candidate with the new environment.

Owner:
1. creates/signs into the Curatia email/password account
2. completes first-login onboarding
3. receives platform Owner role if the login email matches the one-time bootstrap identifier and no Owner exists
4. receives Admin membership in the newly created personal workspace
5. existing unassigned Scout Runs, Sources, Signals and portfolio publications are backfilled into that workspace
6. an audit event records backfill counts

Verify:
- exactly one platform Owner
- Owner is Admin of personal workspace
- existing row counts are unchanged
- every legacy row now has the Owner workspace_id
- Signal/Source relationships still resolve
- Trend Radar displays the same existing editorial data

### Stage 3 - enforce isolation

Apply:
1. `20260929_003_curatia_enforce_workspace_ownership.sql`
2. `20260929_005_curatia_workspace_rls.sql`
3. `20260929_006_curatia_capacity_guards.sql`

The enforcement migration intentionally refuses to run if backfill is incomplete.

### Stage 4 - smoke tests

Owner:
- login/logout
- Home routing
- Settings save/reload
- Discovery Interest edit
- channel preference edit
- Trend Radar read
- New -> Watch
- New/Watch -> Explore where applicable
- Ignore transition
- verify Settings affects only future discovery configuration

Isolation:
- create a second test user/workspace
- verify it cannot see Owner Signals/Sources
- verify Owner workspace cannot see test workspace through normal workspace context
- verify Viewer cannot write
- verify Creator cannot perform Admin-only operations
- verify service-side Trend Radar query always includes active workspace

Capacity:
- verify entitlements exist
- verify active Signal capacity is visible/configurable
- verify guard rejects overflow instead of deleting editorial knowledge

Security:
- rerun Supabase security advisors
- confirm no secret/service credential is present in browser environment
- confirm audit log receives onboarding/settings/security events

## Rollback

Before Stage 3, rollback is straightforward:
- revert application deployment
- legacy records remain present; workspace columns are additive

After Stage 3:
- prefer forward-fix unless an isolation/security defect exists
- if rollback is required, restore the previous application and database recovery point together so code/schema authorization assumptions stay aligned

## Release rule

Do not merge/deploy if:
- CI build fails
- production dependency audit reports high/critical vulnerabilities
- Owner bootstrap identifier is unknown
- existing data backfill cannot be verified
- workspace isolation test fails
- Supabase security advisors expose a new error-level tenancy/auth finding
