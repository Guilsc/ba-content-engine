# BA Content Engine - Project Bootstrap

Purpose: recreate the BA Content Engine AI workspace and operating architecture in a new ChatGPT account or another capable AI environment without relying on chat history.

## 1. Create the workspace

Create a project/workspace named **BA Content Engine**.

Use `PROJECT-INSTRUCTIONS.md` as the authoritative Project Instructions.

## 2. Load editorial resources

Add all files in `project/resources/`:

- voice-and-style.md
- content-strategy.md
- linkedin-profile.md
- best-posts.md
- post-performance.md
- editorial-quality-bar.md

Resources describe what the system knows. They are not workflow actions.

## 3. Load workflow Skills

Load all `SKILL.md` files under `project/skills/`.

Current Skills:
- Trend Scout
- Trend Evaluation
- Idea Development
- Editorial Research
- LinkedIn Drafting
- Visual Direction
- Publishing Review
- Post Learning

Skills describe what the system does. Project Instructions define global rules.

## 4. Restore architecture and current state

Read:
- `docs/ARCHITECTURE.md`
- `docs/LIFECYCLE.md`
- `docs/CURRENT-STATE.md`
- `site/CURRENT-SITE-STATE.md`
- `project/source-registry/*`

Always verify the live Supabase/GitHub state before changing architecture.

## 5. Connect external systems

### GitHub

Repository:

`Guilsc/ba-content-engine`

GitHub is the canonical portable source/recovery repository.

### Supabase

Project:

`ba-content-engine`

Project ref:

`jzceajrfqtrdemptlfbp`

Canonical application data lives in Supabase.

Recreate the database from `supabase/migrations/` only if recovery requires it.

Never expose or commit the Supabase secret key.

### ChatGPT Site

Current production UI:

`https://ba-content-engine.guilhermecosta.tech/`

The Site should use Supabase as canonical persistent data. Do not reconstruct live editorial state from chat history when canonical Supabase data exists.

Google was selected as the current Site authentication method.

### DNS

The BA Content Engine custom domain is managed through Hostinger DNS.

Do not repurpose the root `guilhermecosta.tech`; it is reserved for the personal site/portfolio.

## 6. Recreate Scheduled Tasks

Use the specifications in `project/automations/`.

Current cadence:
- BA Trend Scout: Monday, Wednesday, Friday at 08:37 America/Sao_Paulo, approximately 48-hour discovery window.
- Trend Radar Weekly Review: Saturday at 09:00 America/Sao_Paulo.

Tasks must use Supabase as canonical state. Task chats are execution logs only.

## 7. Governance rules that must survive recovery

- Trend Scout discovers; Trend Evaluation judges.
- Trend Scout creates only New Signals.
- Trend Radar evaluation may move New to Watch, Explore, or Ignored.
- No automation promotes a Signal to an Idea or Candidate.
- Idea to Candidate requires Guilherme's explicit decision.
- Every Candidate passes through Editorial Studio.
- Draft, Visual Ready, and finished visual are not approval.
- Only Guilherme can explicitly set a specific Content Item to Approved.
- Only Approved items may be scheduled or published.

## 8. Fallback application

The repository contains `app/`, a tested Next.js Trend Radar implementation.

Use it only as a fallback/recovery option if ChatGPT Sites becomes unsuitable or inaccessible. It is not the current production UI.

## 9. Resume work

Read `docs/CURRENT-STATE.md` first.

At the 2026-09-22 checkpoint:
- Site ↔ Supabase live-read was validated.
- existing Trend Radar data was migrated to Supabase.
- temporary acceptance-test data was cleaned.
- scheduled Scout autonomous write-back still needed validation on its next normal run.
