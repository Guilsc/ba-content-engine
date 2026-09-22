# Installation / Placement Map

## 1. ChatGPT Project

### Project Instructions

Use:
`PROJECT-INSTRUCTIONS.md`

### Project Resources

Add:
- `resources/voice-and-style.md`
- `resources/content-strategy.md`
- `resources/linkedin-profile.md`
- `resources/best-posts.md`
- `resources/post-performance.md`
- `resources/editorial-quality-bar.md`

These are reference/knowledge files, not workflow engines.

### Workflow Skills

Use the Skill specifications under:
`skills/*/SKILL.md`

## 2. Current ChatGPT Site

Production URL:

`https://ba-content-engine.guilhermecosta.tech/`

Current role:
- operational UI
- reads/writes canonical Supabase state
- preserves lifecycle and approval rules

Site state/recovery notes:

`../../site/CURRENT-SITE-STATE.md`

Use:
- `site/SKILL-ROUTER.md`
- `site/CONTENT-ITEM-SCHEMA.md`

Do not assume that merely storing a Skill in Git makes it executable in the Site. The Site implementation must explicitly enforce or invoke the corresponding workflow behavior.

## 3. Supabase

Supabase is the canonical persistent data store.

Phase 1 tables:
- `sources`
- `signals`
- `signal_sources`
- `scout_runs`

Use the migrations under:
`../../supabase/migrations/`

Never commit real keys or credentials.

## 4. Scheduled Tasks

Specifications:
- `automations/BA-Trend-Scout.md`
- `automations/Trend-Radar-Weekly-Review.md`

Tasks must read/write the same canonical Supabase data used by the Site.

## 5. Fallback Web App

`../../app/` contains a tested Next.js fallback implementation.

It is not the current production UI. Deploy only after an explicit architecture decision.

## 6. Formal ChatGPT Skills

If formal standalone Skills are used in a future account/workspace, each folder under `skills/` is designed to become an independent Skill package.

## Suggested Resource Dependencies

- Trend Evaluation → content strategy, editorial quality bar
- Idea Development → content strategy, editorial quality bar
- Editorial Research → content strategy, editorial quality bar
- LinkedIn Drafting → voice/style, strategy, LinkedIn profile, best posts, quality bar
- Visual Direction → content strategy, quality bar
- Publishing Review → project governance / content schema
- Post Learning → post performance, content strategy

## Do Not Duplicate Governance

Keep lifecycle and approval rules canonical in Project Instructions and Site schema.

Skills may repeat critical gates, but must not introduce conflicting lifecycle definitions.
