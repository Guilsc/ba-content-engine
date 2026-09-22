# BA-SKILL-Trend-Scout

## Purpose

Define the recurring discovery behavior for BA Content Engine Trend Radar.

Trend Scout discovers external signals.
Trend Evaluation judges editorial potential.

Keep those responsibilities separate.

## Trigger

Designed for recurring runs on Monday, Wednesday, and Friday.

Default discovery window:

**Approximately the last 48 hours**

The 48-hour period is a discovery window only. It is never a signal-expiration rule.

## Discovery Scope

Search for genuinely new developments related to:

- Business Analysis
- AI
- Agentic AI
- enterprise AI
- BI and analytics
- data
- decision intelligence
- semantic layers
- context engineering
- agent governance
- automation
- future of work
- human-agent collaboration
- agent-native workflows
- enterprise technology changes that materially affect senior BA work

## Source Priority

Prefer:

1. first-party company/product/research sources
2. analyst firms
3. academic research
4. standards bodies
5. established consulting/research organizations
6. strong industry publications

Do not prioritize a development merely because it is breaking news.

## Discovery Workflow

1. Search approximately the last 48 hours.
2. Gather potentially relevant external signals.
3. Remove obvious low-value noise.
4. Reject generic product announcements unless they materially change senior BA work.
5. Compare findings with previously detected Trend Radar signals.
6. Deduplicate the same underlying development.
7. Merge multiple credible sources covering the same development when useful.
8. Add only genuinely new signals.
9. Assign initial state `New`.
10. Store discovery metadata.
11. Do not perform the full Trend Evaluation workflow.
12. Do not create Ideas or Candidates automatically.
13. Do not infer approval or advance editorial lifecycle state.

## Persistent Signal Rule

Once discovered, a signal remains in Trend Radar until it is:

- Promoted
- Ignored
- Archived

A signal does not disappear because it is older than 48 hours.

Freshness is metadata, not editorial value.

## Trend Radar States

Supported states:

- New
- Watch
- Explore
- Promoted
- Ignored
- Archived

The Scout normally creates only `New` records.

Other states are set through editorial evaluation or explicit user action.

## Deduplication

Treat two items as duplicates when they describe substantially the same underlying development, even if:

- headlines differ
- multiple publications cover it
- one article summarizes another
- different sources emphasize different aspects

Prefer enriching the existing signal with additional credible sources rather than creating another card.

## Output Contract

For every genuinely new signal return:

- Signal Key
- Title
- Summary of What Changed
- Primary Source
- Additional Sources
- Published Date
- Detected Date
- Age
- Initial State: New
- Preliminary BA Relevance
- Why It May Matter

### Signal Key

Create a short stable identifier based on the underlying development, not the publication headline.

Example:

`openai-agent-governance-controls-2026-09`

The Signal Key supports later deduplication.

## What Trend Scout Must Not Do

Do not output:

- full Why Now analysis
- Evidence Strength
- Saturation score
- Existing Backlog Overlap
- strongest editorial angle
- Candidate recommendation
- post draft
- visual concept

Those belong to Trend Evaluation or later workflow Skills.

## No-New-Signal Behavior

If there are no genuinely new qualified signals, return no editorial items and do not manufacture content to fill a quota.

## Aging

Trend Scout may calculate signal age for display.

Suggested labels:

- Fresh: 0–2 days
- Recent: 3–7 days
- Aging: 8–30 days

Age never determines editorial value.

Items untouched for roughly 30 days may become archive-eligible, except:

- Watch items
- strategically relevant items
- evergreen signals

Archiving must preserve historical data.

## Quality Checks

Before emitting a signal:

- Is this actually new?
- Is it materially relevant to BA Content Engine?
- Does it have a credible source?
- Is it already represented by an existing signal?
- Is this discovery rather than editorial judgment?
- Would a senior BA plausibly care about the underlying change?

Prefer fewer strong signals over a large feed of noise.
