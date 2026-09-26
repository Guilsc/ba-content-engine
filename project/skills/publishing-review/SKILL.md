# Publishing Review

## Job to Be Done

Verify that a Content Item is actually eligible to be scheduled or published, and keep the public portfolio registry synchronized with the publishing lifecycle.

Use this skill in the Publishing & Learnings layer.

This skill is a governance gate, not an approval generator.

## Required Rule

Only Guilherme's explicit approval of the specific Content Item can set:

`Status = Approved`

The following do not count as approval:
- finished draft
- finished visual
- `Visual Ready`
- positive feedback that does not explicitly approve the item

## Inputs

Required:
- Content Item ID
- current status
- final post copy
- final visual when applicable
- publishing channel
- publication date
- publication time
- explicit approval evidence

For LinkedIn scheduling, also capture when available:
- Metricool post ID
- Metricool post UUID
- final LinkedIn URL after publication

## Workflow

1. Verify the Content Item ID.
2. Verify `Status = Approved`.
3. Verify explicit user approval exists for that specific item.
4. Verify final copy exists.
5. Verify final visual exists when applicable.
6. Verify channel.
7. Verify date.
8. Verify time.
9. Identify missing information.
10. Only when every required field is present may the item be sent to Metricool for scheduling.
11. After Metricool confirms scheduling, upsert the LinkedIn item into Supabase `public.portfolio_publications` as `publication_status = 'scheduled'`. Store `scheduled_at`, `source_system = 'metricool'`, Metricool identifiers when available, and `last_synced_at`.
12. Treat the Metricool scheduling action and the Supabase scheduled-state upsert as one logical operation. If scheduling fails, do not mark the item Scheduled. If the Supabase write fails after Metricool scheduling succeeds, report the partial failure explicitly and do not claim the portfolio registry is synchronized.
13. Never promote a registry record to `published` merely because its scheduled time has passed.
14. When actual LinkedIn publication is confirmed and the exact LinkedIn URL is known, upsert the same record with `publication_status = 'published'`, the canonical URL, accurate `published_at`, and refreshed `last_synced_at`.
15. If a scheduled publication is cancelled or known to have failed, update the registry status to `cancelled` or `failed`.
16. Deduplicate before every write using Metricool UUID/external ID, canonical LinkedIn URL, and existing `public_id`.
17. Only Guilherme-authored/original content may become a portfolio publication. Never add a reshare/repost of third-party content.
18. Historical manually curated publications must remain intact unless an explicit correction is required.

## Portfolio Visibility Rule

The personal portfolio may expose only records satisfying:

`portfolio = true AND publication_status = 'published'`

A `scheduled`, `failed`, or `cancelled` record is operational state, not public portfolio content.

The workflow must not depend on the paid Metricool REST API or on a recurring ChatGPT automation.

## Output Contract

Return:
- Content Item ID
- Approval verified: Yes / No
- Final copy: Ready / Missing
- Final visual: Ready / Not applicable / Missing
- Channel: value / Missing
- Date: value / Missing
- Time: value / Missing
- Publishing readiness:
  - Ready to Schedule
  - Blocked
- Metricool scheduling: Scheduled / Failed / Not attempted
- Portfolio registry: Scheduled / Published / Failed / Not attempted
- LinkedIn URL: value / Pending

If blocked, list only the missing or invalid requirements.
If an external action partially succeeds, state exactly which system changed and which did not.

## Quality Checks

- Did you infer approval? If yes, stop and correct.
- Did you infer a date or time? If yes, stop and correct.
- Did you advance an unapproved item? If yes, revert.
- Did you equate scheduled with published? If yes, stop and correct.
- Did you expose an unconfirmed publication to the public portfolio? If yes, revert.
- Did you create a duplicate publication record? If yes, reconcile it before continuing.
