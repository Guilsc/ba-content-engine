# Current ChatGPT Site State - 2026-09-22

## Production

Site:
BA Content Engine / The Analysis Layer

Live custom domain:

`https://ba-content-engine.guilhermecosta.tech/`

Platform:
ChatGPT Sites

Authentication:
Google selected during the latest Site integration/update flow.

## DNS

DNS provider:
Hostinger

Custom host:
`ba-content-engine.guilhermecosta.tech`

ChatGPT Sites custom-domain target:
`custom-domains.chatgpt.site`

Verification TXT records were configured in Hostinger during setup.

Do not store the TXT verification token values in Git.

The root domain `guilhermecosta.tech` is reserved for Guilherme's personal site.

## Supabase integration

Supabase project:
`ba-content-engine`

Project ref:
`jzceajrfqtrdemptlfbp`

The Trend Radar has been migrated to Supabase as canonical persistent state.

Validated canonical data after migration:
- 7 Signals
- 11 Sources
- 13 Signal-Source links
- 0 Scout Runs

States:
- 4 Watch
- 3 Explore

## Acceptance validation

A temporary Signal and Source were created directly in Supabase.

Temporary Signal title:

`[TEST] Supabase live-read check`

Result:
- the Signal appeared in the live ChatGPT Site Trend Radar without a Site code change
- therefore the live Site read path from Supabase was confirmed
- test Signal/Source/link were removed afterward
- cleanup verified zero remaining test records

## Current source-of-truth rule

Supabase owns live editorial/application state.

The ChatGPT Site is the UI.

GitHub owns portable instructions, Skills, resources, architecture, migrations, and recovery documentation.

Do not maintain a separate canonical Trend Radar dataset inside Site-local storage.

## Pending validation

Do not force an extra test run tonight.

Next normal Scout run should validate:
- creation of `scout_runs`
- Source create/reuse
- Signal create/deduplicate
- Signal-Source links
- visibility of new canonical data in the live Site

Saturday Weekly Review should later validate:
- reading unresolved Signals
- writing evaluation fields
- allowed Trend Radar state changes
- no automatic Candidate/Idea creation

## Site UI/lifecycle invariants

Preserve:
- current navigation
- current visual identity
- Trend Radar behavior
- Idea Tank
- Content Pipeline
- Editorial Studio
- Publishing & Learnings
- Skills/lifecycle rules
- explicit approval governance

A finished Draft or Visual Ready state is never approval.

Only Guilherme may explicitly approve a specific Content Item.
