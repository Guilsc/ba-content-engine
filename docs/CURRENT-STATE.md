# Current State - 2026-09-22

## Platform direction

The BA Content Engine is being decoupled from ChatGPT Sites so the project remains portable across accounts and hosting providers.

Target split:
- GitHub = canonical source/configuration
- Supabase = canonical live application data
- ChatGPT Project = operational AI workspace
- Scheduled Tasks = background workers
- Web hosting = replaceable application runtime

## Supabase

Project: `ba-content-engine`
Region: `sa-east-1` (Sao Paulo)
Project ref: `jzceajrfqtrdemptlfbp`
Project URL: `https://jzceajrfqtrdemptlfbp.supabase.co`

Phase 1 tables created:
- public.sources
- public.signals
- public.signal_sources
- public.scout_runs

RLS is enabled. Browser/anonymous access has not been opened.

Manual integration test completed successfully, then all artificial test records were removed.

## Scheduled Tasks

### BA Trend Scout
- cadence: Monday, Wednesday, Friday
- time: 08:37 America/Sao_Paulo
- discovery window: approximately 48 hours
- writes canonical Sources/Signals/links/run metadata to Supabase when integration access is available
- creates only New Signals
- no automatic Idea/Candidate promotion

### Trend Radar Weekly Review
- cadence: Saturday
- time: 09:00 America/Sao_Paulo
- reads unresolved Signals from Supabase
- evaluates Why Now, BA Impact, second-order implication, evidence, saturation, overlap, editorial angle/potential
- may move New -> Watch / Explore / Ignored
- never automatically promotes to Idea/Candidate

## ChatGPT Sites issue

The existing ChatGPT Site remains available as a visual/reference implementation, but editing/redeploy is currently blocked by `HTTP 400: Invalid MCP request metadata` in the Sites connector.

The Site is therefore not being treated as the long-term canonical platform.

## GitHub

Private repository: `Guilsc/ba-content-engine`

Portable baseline committed:
- Project Instructions
- editorial Resources
- workflow Skills
- Source Registry contracts
- Scheduled Task specifications
- architecture/lifecycle/current-state documentation
- Supabase migration

The repository is now the canonical portable source for code and project configuration.

## Web application

A Phase 1 Next.js application now exists under `app/`.

Implemented:
- private access-key login using an HTTP-only derived session token
- server-only Supabase secret usage
- Trend Radar working view for New / Watch / Explore
- linked Source rendering
- server-side state changes for Watch / Explore / Ignored
- explicit prevention of Phase 1 promotion to Idea/Candidate
- responsive editorial UI
- GitHub Actions build workflow
- first pull-request CI build completed successfully on 2026-09-22

Required hosting environment variables:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `APP_ACCESS_KEY`

## Next implementation steps

1. Confirm the available Hostinger plan/runtime and deploy `app/` using browser-only configuration.
2. Confirm whether Hostinger can use `app/` as the application root; if not, flatten the web app to repository root before deployment.
3. Configure the three server-side environment variables in hosting.
4. Run Trend Radar acceptance tests against the live Supabase project.
5. Use the existing ChatGPT Site as visual reference while refining the new UI.
6. Migrate Idea Tank, Content Pipeline, Editorial Studio, and Publishing/Learnings incrementally after Trend Radar is validated.
