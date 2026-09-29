# Curatia

**Signals. Context. Decisions. Creation.**

Curatia is the evolution of BA Content Engine into a configurable editorial intelligence and content operations platform.

## Alpha direction

The current implementation is being evolved incrementally. Existing working behavior and canonical data must be preserved while Curatia adds workspace isolation, managed authentication/authorization, configurable discovery, a Content API boundary, operational observability, multi-channel creation, Visual Studio, publishing and performance learning.

The approved implementation baseline lives in:

- `docs/CURATIA-ALPHA-BASELINE.md`

Do not treat that target architecture as proof that every capability is already live.

## Current operating model

- **GitHub**: canonical portable source for product/Project instructions, Skills, editorial resources, architecture, automation specifications, database migrations, recovery documentation, and application code.
- **Supabase**: canonical live application data and workflow state.
- **Hostinger Web App**: current/target production runtime for the portable Next.js application as migration/cutover proceeds.
- **ChatGPT Project**: editorial intelligence and development collaboration workspace.
- **Scheduled workers**: existing background automation during the transition; Curatia Alpha moves toward replaceable scheduler -> job-dispatcher contracts.
- **Hostinger DNS**: manages the custom domain.

## Current live URL

The existing BA Content Engine deployment remains available during the Curatia migration:

`https://ba-content-engine.guilhermecosta.tech/`

Renaming/domain cutover is a separate release decision. Do not break the existing URL during foundation work.

## Repository map

- `project/` - portable Project instructions, Skills, resources, automation specs, Source Registry contracts.
- `site/` - legacy/current Site deployment and recovery notes during migration.
- `supabase/` - database migrations.
- `docs/` - architecture, lifecycle, Curatia Alpha baseline, and current-state checkpoints.
- `app/` - Next.js application being evolved toward the Curatia production runtime.

## Migration principle

Curatia is an incremental evolution, not a destructive rewrite.

1. Preserve existing canonical Trend Radar data.
2. Introduce workspace ownership and authorization safely.
3. Migrate existing Guilherme data into Guilherme's workspace.
4. Add domains in reviewed migrations.
5. Keep approval and editorial governance intact.
6. Validate each phase before production cutover.

## Recovery

For legacy/current-state recovery, start with:

1. `project/PROJECT-BOOTSTRAP.md`
2. `docs/CURRENT-STATE.md`
3. `site/CURRENT-SITE-STATE.md`

For forward implementation, use `docs/CURATIA-ALPHA-BASELINE.md` as the approved target baseline.

## Security

Never commit secrets.

Supabase secret/service keys, OAuth credentials/tokens, integration credentials, DNS verification tokens and production environment-variable values remain in secure platform settings. Curatia must not expose stored secrets in readable form.
