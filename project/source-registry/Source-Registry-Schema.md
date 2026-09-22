# BA Content Engine — Source / Evidence Registry Schema

## Purpose

The Source / Evidence Registry is the canonical shared evidence layer for BA Content Engine.

Sources are first-class entities. A source must not exist only as a field inside a Trend Signal, Idea, Candidate, or Research record. The same source may be reused by multiple signals, content items, claims, workflows, and agents.

The registry must preserve traceability across:

`Source → Signal → Idea → Candidate → Research → Draft/Post`

## Core Principles

1. Store source metadata, links, summaries, and evidence notes.
2. Do not duplicate the same underlying source across multiple Content Items.
3. Reuse existing source records when the same URL or canonical publication is discovered again.
4. Preserve source provenance.
5. Separate the source itself from the claims or evidence notes derived from it.
6. Do not treat a source as automatically credible merely because it exists in the registry.
7. Do not copy full copyrighted articles into the registry unless explicitly permitted and necessary.
8. Sources remain reusable even if an associated signal is archived.

## Canonical Source Record

### Identity
- `source_id`
- `canonical_url`
- `title`
- `publisher`
- `author`
- `source_type`

Suggested `source_type` values:
- First-party announcement
- Product documentation
- Analyst report
- Academic paper
- Standards/specification
- Consulting/research report
- Industry publication
- News article
- Practitioner source
- Internal observation
- Other

### Dates
- `published_date`
- `detected_date`
- `accessed_date`
- `last_verified_date`

### Editorial Metadata
- `summary`
- `topics`
- `tags`
- `credibility_notes`
- `freshness_notes`
- `relevance_notes`

### Relationships
- `linked_signal_ids`
- `linked_idea_ids`
- `linked_content_item_ids`
- `linked_claim_ids`

Relationships should reference canonical records rather than duplicate source content.

## Evidence Notes

Evidence is not the same thing as Source.

A Source is the original material. An Evidence Note describes what that source supports, contradicts, limits, or contextualizes.

Suggested fields:
- `evidence_id`
- `source_id`
- `claim_id`
- `evidence_type`
- `note`
- `strength`
- `limitations`
- `created_at`
- `created_by_workflow`

Suggested `evidence_type`:
- Supports
- Contradicts
- Limits
- Context
- Example
- Background

Suggested `strength`:
- Strong
- Moderate
- Weak

## Claims

Suggested Claim fields:
- `claim_id`
- `content_item_id`
- `claim_text`
- `claim_type`
- `status`
- `supporting_evidence_ids`
- `counter_evidence_ids`
- `confidence`

Suggested `status`:
- Unverified
- Supported
- Mixed
- Rejected

Suggested `confidence`:
- Low
- Moderate
- High

## Deduplication

Before creating a new Source:

1. Check canonical URL.
2. Check normalized title + publisher.
3. Check DOI, report ID, document ID, or other stable identifier when available.
4. Detect mirrored or syndicated copies of the same publication.
5. Prefer the original/canonical source over a secondary copy.
6. Merge useful metadata into the existing Source rather than creating duplicates.

## Source Reuse

A single source may support:
- multiple Trend Signals
- multiple Ideas
- multiple Content Items
- multiple Claims
- multiple future posts

Do not create a new Source merely because a different workflow uses it.

## Trend Scout Behavior

When Trend Scout discovers a new signal:

1. Create or reuse canonical Source records first.
2. Create the Trend Signal separately.
3. Link the Signal to one or more `source_id` values.
4. Do not copy source metadata into the Signal beyond what is necessary for display.
5. Preserve all source relationships if the Signal later moves to Watch, Explore, Promoted, Ignored, or Archived.

## Editorial Research Behavior

When Editorial Research begins:

1. Inherit Sources already linked through the originating Signal or Idea.
2. Verify that inherited Sources are still relevant.
3. Add new Sources discovered during research.
4. Create Evidence Notes tied to specific claims where useful.
5. Distinguish verified facts from editorial interpretation.
6. Capture contradictory or limiting evidence, not only supporting material.

## Drafting Behavior

LinkedIn Drafting should use verified facts, supported claims, and approved interpretations.

Drafting must not rely on raw Source presence alone as proof.

## User Interface Guidance

Do not expose this schema as technical documentation in the normal UI.

Useful contextual views may include:

### Source panel
- Title
- Publisher
- Source type
- Published date
- Link
- Summary
- Linked Signals / Content Items

### Research evidence panel
- Claim
- Supporting Sources
- Counter-evidence
- Confidence
- Evidence gaps

### Content Item source summary
- Sources inherited from Trend Radar
- Sources added during Research
- Total evidence base
- Unverified claims
- Contradictory evidence present

## Governance

The Source / Evidence Registry is shared infrastructure.

Adding a Source:
- does not create an Idea
- does not create a Candidate
- does not approve a Content Item
- does not imply a claim is true
