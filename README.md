# BA Content Engine

Portable source and recovery repository for the BA Content Engine.

## Current operating model

- **GitHub**: canonical portable source for Project instructions, Skills, editorial resources, architecture, automation specifications, database migrations, recovery documentation, and fallback application code.
- **Supabase**: canonical live application data and workflow state.
- **ChatGPT Project**: current editorial intelligence workspace.
- **ChatGPT Site**: current operational web UI.
- **Scheduled Tasks**: background workers that read/write the same Supabase data.
- **Hostinger DNS**: manages the custom domain.

## Live Site

Production URL:

`https://ba-content-engine.guilhermecosta.tech/`

The root domain `guilhermecosta.tech` remains reserved for Guilherme's personal site and project portfolio.

## Repository map

- `project/` — portable ChatGPT Project instructions, Skills, resources, automation specs, Source Registry contracts.
- `site/` — current Site deployment/integration state and recovery notes.
- `supabase/` — database migrations.
- `docs/` — architecture, lifecycle, current-state checkpoints.
- `app/` — tested Next.js fallback/reference implementation. It is **not** the current production UI while ChatGPT Sites is operational.

## Recovery

If the current ChatGPT account, Site, or hosting becomes unavailable, start with:

1. `project/PROJECT-BOOTSTRAP.md`
2. `docs/CURRENT-STATE.md`
3. `site/CURRENT-SITE-STATE.md`

## Security

Never commit secrets.

Real Supabase secret keys, OAuth credentials, DNS verification tokens, and Site environment-variable values must remain in their secure platform settings. Placeholder examples only may exist in Git.
