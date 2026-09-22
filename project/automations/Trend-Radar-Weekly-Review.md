# Automation: Trend Radar Weekly Review

## Schedule
Saturday at 09:00 America/Sao_Paulo.

## Execution prompt
Run the BA Content Engine Trend Radar Weekly Review every Saturday at 09:00. Use the connected Supabase app and the `ba-content-engine` project as the canonical data store. Read unresolved signals from `public.signals`, focusing on states `New`, `Watch`, and `Explore`, and reuse their linked Sources from `public.signal_sources` + `public.sources`.

Apply the BA Content Engine Trend Evaluation logic to each unresolved signal: Why Now, BA Impact, Second-order Implication, Evidence Strength (Strong/Moderate/Weak), Saturation (Low/Medium/High), Existing Backlog Overlap, Strongest Editorial Angle, and Editorial Potential (Watch/Explore/Candidate). Deduplicate overlapping developments before evaluation and preserve canonical Source relationships.

Write the evaluation results back to the same Signal row in Supabase. You may move a Signal within Trend Radar from `New` to `Watch`, `Explore`, or `Ignored` when the evidence clearly supports that state. You may update why_now, ba_impact, second_order_implication, evidence_strength, saturation, backlog_overlap, strongest_editorial_angle, editorial_potential, and relevant metadata. Preserve existing editorial decisions unless new evidence clearly justifies a change.

Do not create an Idea or Candidate automatically. Do not set state `Promoted` automatically. Promotion beyond Trend Radar requires Guilherme's explicit decision. Do not infer approval or advance any Content Item lifecycle stage.

Also produce a concise weekly insight summary with: strongest developments, notable patterns across signals, weak/noisy themes that can be ignored, and Signals that deserve Guilherme's attention for a possible promotion decision. The Supabase database is the official state store. The task chat is only the execution summary. If Supabase read/write access is unavailable, do not claim state changes were saved; clearly report the failure and list the intended changes.
