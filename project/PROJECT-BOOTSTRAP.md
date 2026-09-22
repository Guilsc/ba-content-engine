# BA Content Engine - Project Bootstrap

Purpose: recreate the BA Content Engine AI workspace in a new ChatGPT account or another capable AI environment without relying on chat history.

## 1. Create the workspace

Create a project/workspace named **BA Content Engine**.

Use `PROJECT-INSTRUCTIONS.md` as the authoritative project instructions.

## 2. Load editorial resources

Add all files in `project/resources/` as project resources/context:

- voice-and-style.md
- content-strategy.md
- linkedin-profile.md
- best-posts.md
- post-performance.md
- editorial-quality-bar.md

These files describe what the system knows and how content should sound. They are not workflow actions.

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

## 4. Restore architecture

Read:

- `docs/ARCHITECTURE.md`
- `docs/LIFECYCLE.md`
- `docs/CURRENT-STATE.md`
- `project/source-registry/*`

## 5. Connect external systems

### GitHub
This repository is the canonical source for code and portable project configuration.

### Supabase
Canonical application data lives in the Supabase project named `ba-content-engine`.
Configure credentials server-side only. Never expose a secret key in frontend code or chat content.

Recreate the database from `supabase/migrations/` if required.

## 6. Recreate Scheduled Tasks

Use the specifications in `project/automations/`.

Current cadence:

- BA Trend Scout: Monday, Wednesday, Friday at 08:37 America/Sao_Paulo, approximately 48-hour discovery window.
- Trend Radar Weekly Review: Saturday at 09:00 America/Sao_Paulo.

The tasks must use Supabase as the canonical state store. Task chats are execution logs only.

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

## 8. Resume work

Read `docs/CURRENT-STATE.md` before making architecture changes. Treat it as the latest handoff snapshot, then verify live Supabase/GitHub state before acting.
