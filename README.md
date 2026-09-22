# BA Content Engine

Portable source-of-truth repository for the BA Content Engine.

## Canonical responsibility split

- GitHub: application source code, Project instructions, Skills, editorial resources, architecture, automation specifications, database migrations.
- Supabase: canonical live application data and workflow state.
- ChatGPT Project: an operational AI workspace instantiated from the files in `project/`.
- Scheduled Tasks: background workers that read/write Supabase.
- Web hosting: production runtime for the BA Content Engine application.

## Recovery

If the current ChatGPT account or hosting is unavailable, start with `project/PROJECT-BOOTSTRAP.md` and `docs/CURRENT-STATE.md`.

## Security

Never commit secrets. `.env.example` contains placeholders only. Supabase secret keys must be configured in a secure server-side environment store.
