# LinkedIn Publishing Reconciliation

## Purpose

Keep Supabase `content_items` aligned with posts that were actually published to LinkedIn through Metricool.

This is a reconciliation step, not a publishing step.

## Canonical ownership

- Supabase owns content lifecycle and publishing state.
- Metricool is the scheduling/publishing bridge.
- LinkedIn is the external published destination.
- The personal site reads only Supabase rows where:
  - `status = 'Published'`
  - `show_on_portfolio = true`

## Inputs

Read recent LinkedIn post analytics from Metricool for the connected Guilherme da Silva Costa brand.

Required Metricool fields:
- publication date/time
- post text
- LinkedIn post ID
- LinkedIn post URL

Useful optional fields:
- title
- image
- impressions
- reactions
- comments
- shares

## Matching order

For each recently published LinkedIn post, try to match an existing `content_items` row in this order:

1. `external_post_id`
2. `metricool_uuid` / stored Metricool identifiers
3. scheduled time within a reasonable tolerance plus normalized body-text match

Do not silently match on title alone.

## Allowed updates

When a scheduled/approved item is confirmed as published:

- set `status = 'Published'`
- set `published_at`
- set `external_post_id`
- set `external_url`
- preserve title, summary, body, category, and editorial metadata
- store performance fields in `metadata` only when available

Do not change `show_on_portfolio` automatically unless the item was already approved for portfolio display.

## Historical/backfill behavior

If a Metricool/LinkedIn post exists with no matching `content_items` row, do not auto-create canonical editorial history during normal reconciliation.

Historical backfills should be explicit, reviewed imports.

## Frequency

This does not need to run continuously. A weekly or existing multi-weekly worker is sufficient for the current publishing cadence.

Prefer extending an existing BA Content Engine scheduled worker rather than creating another automation slot.

## Failure behavior

If Metricool is unavailable or returns incomplete data:
- leave Supabase state unchanged
- record/report the failure
- retry on the next normal run

Never infer `Published` solely because the scheduled time has passed.
