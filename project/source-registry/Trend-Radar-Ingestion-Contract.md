# BA-SITE-Trend-Radar-Ingestion-Contract

## Purpose

Define the canonical handoff between Trend Scout output and the BA Content Engine Trend Radar.

This contract is designed so Scout output can be ingested without performing editorial evaluation during discovery.

## Input Record

Each incoming Scout record should contain:

- `signal_key`
- `title`
- `summary`
- `primary_source`
- `additional_sources`
- `published_date`
- `detected_date`
- `age`
- `state`
- `preliminary_ba_relevance`
- `why_it_may_matter`

Default incoming state:

`New`

## Ingestion Rules

When a Scout record is received:

1. Look up the `signal_key`.
2. If the key already exists, do not create a new Trend Radar item.
3. If the underlying development already exists under a different key, treat it as a semantic duplicate.
4. Merge useful new sources or metadata into the existing record.
5. Preserve the existing editorial state if the signal is already Watch, Explore, Promoted, Ignored, or Archived.
6. Create a new Trend Radar record only for a genuinely new underlying development.
7. Never create an Idea or Candidate as part of ingestion.
8. Never run full Trend Evaluation automatically as part of ingestion unless explicitly requested.

## Persistence

Trend Radar records persist beyond the Scout discovery window.

The 48-hour discovery window does not delete, expire, or hide existing signals.

## State Model

- New
- Watch
- Explore
- Promoted
- Ignored
- Archived

Primary working views should emphasize:

`New + Watch + Explore`

Promoted, Ignored, and Archived should remain accessible historically.

## Freshness

Store:

- Published Date
- Detected Date
- Age

Freshness is metadata only.

Do not use freshness as a proxy for editorial value.

## Archive Eligibility

Signals with no meaningful activity for approximately 30 days may be marked archive-eligible.

Exceptions:

- Watch
- strategically relevant signals
- evergreen signals

Do not delete archived signals.

## Separation of Responsibilities

Trend Scout:
- discovery
- source collection
- deduplication
- discovery metadata

Trend Evaluation:
- Why Now
- BA Impact
- Second-order Implication
- Evidence Strength
- Saturation
- Backlog Overlap
- Strongest Editorial Angle
- Editorial Potential

User:
- explicit promotion decisions
- approval

## Canonical Integration

Supabase is the canonical ingestion and persistence layer.

The Scheduled Trend Scout should write Signals, Sources, Signal-Source links, and Scout Run metadata directly to Supabase when the connected integration is available.

The web application should read the same canonical records. Task chat output is an execution log only.

If a Scheduled Task cannot write to Supabase during a run, it must report the write-back failure and must not claim canonical state was updated.
