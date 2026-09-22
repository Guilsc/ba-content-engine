# BA Content Engine — Source Registry Integration Contract

## Purpose

Define how BA Content Engine surfaces and reuses Source records across Site workflows.

## Shared Registry

The Site should treat Source records as shared data.

Do not create separate source copies inside:
- Trend Radar
- Idea Tank
- Editorial Studio
- Publishing & Learnings

Instead, link those objects to canonical Source records.

## Trend Radar

Each Signal may link to:
- one primary Source
- zero or more additional Sources

The Signal card may display source information, but the canonical record belongs to the Source Registry.

## Idea Tank

When a Signal is promoted into an Idea:
- preserve all Source links
- do not duplicate the Source records
- show inherited Sources when useful

An Idea may also add additional Sources.

## Editorial Studio

Research should inherit all Sources linked through the originating Signal and Idea.

Editorial Research may then:
- verify inherited Sources
- add more Sources
- attach Evidence Notes
- link Sources to Claims
- capture counter-evidence
- flag evidence gaps

## Drafting

Drafting should consume research outputs and verified Claims.

It should not treat every Source in the Registry as valid evidence for every statement.

## Publishing

Publishing does not need to duplicate Source records.

Published Content Items should preserve traceability back to the Sources that informed the final content.

## Learning

Post Learning may optionally use Source metadata for future analysis.

Do not infer causation from small samples.

## Search and Reuse

Future agents/workflows should be able to search the registry by:
- keyword
- topic
- publisher
- source type
- date
- linked Signal
- linked Content Item
- linked Claim

## UI

The Source Registry does not need to be a primary navigation page initially.

It may exist as a shared data layer surfaced through:
- Signal detail
- Idea detail
- Editorial Studio research panels
- Content Item detail

A dedicated Source Library page may be added later if useful.

## Current Integration Limitation

If ChatGPT Sites cannot autonomously persist background-task output, keep the schema and relationships ready for manual or future automated ingestion.

Do not imply that a background task wrote into the Site unless the Site state was actually updated.
