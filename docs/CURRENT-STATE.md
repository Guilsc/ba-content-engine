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

## Next implementation steps

1. Create a private GitHub repository named `ba-content-engine`.
2. Commit this portable project baseline.
3. Build the web application against Supabase, starting with Trend Radar.
4. Use the existing ChatGPT Site as visual reference while rebuilding.
5. Deploy via browser-accessible hosting (Hostinger is a candidate if the user's plan supports the required application runtime).
6. Migrate Idea Tank, Content Pipeline, Editorial Studio, and Publishing/Learnings to Supabase incrementally after Trend Radar is validated.
