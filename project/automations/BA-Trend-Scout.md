# Automation: BA Trend Scout

## Schedule
Monday, Wednesday, Friday at 08:37 America/Sao_Paulo.

## Execution prompt
Run the BA Trend Scout on Monday, Wednesday, and Friday. Search the web for genuinely new external signals from approximately the last 48 hours relevant to BA Content Engine: Business Analysis, AI, agentic AI, enterprise AI, BI, analytics, data, decision intelligence, semantic layers, context engineering, agent governance, automation, future of work, human-agent collaboration, agent-native workflows, and enterprise technology changes that materially affect senior Business Analyst work. Treat 48 hours as a discovery window only, never as signal expiration. Prioritize credible first-party sources, analyst firms, academic research, standards bodies, and strong industry publications. Filter obvious low-value noise and generic announcements unless they create a meaningful BA implication.

Use the connected Supabase app and the `ba-content-engine` project as the canonical data store. At the start of each run, create a row in `public.scout_runs` with a unique run_key, status `running`, discovery_window_hours = 48, and started_at. Compare findings against existing rows in `public.signals` using `signal_key` and semantic equivalence; deduplicate the same underlying development. Compare sources against `public.sources` using canonical_url, source_key, publisher + external_id, and canonical publication identity. Reuse existing Sources rather than duplicating them.

For each genuinely new qualified signal, upsert its canonical Sources into `public.sources`, insert the Signal into `public.signals` with state `New`, link the Signal to Sources through `public.signal_sources` using role `primary` or `additional`, and set first_seen_run_id and last_seen_run_id to the current scout run. If an existing signal is rediscovered, do not create another signal; update last_seen_run_id and merge useful source metadata or source links without changing its editorial state.

Populate when available: signal_key, title, summary, first_published_at, detected_at, preliminary_ba_relevance, why_it_may_matter. For Sources populate when available: source_key, canonical_url, title, publisher, author, source_type, external_id, published_at, detected_at, accessed_at, summary, topics, tags, credibility_notes, relevance_notes.

Do not perform full Trend Evaluation here. Do not populate saturation, evidence_strength, backlog_overlap, strongest_editorial_angle, or editorial_potential unless they already exist. Do not move signals to Watch, Explore, Promoted, Ignored, or Archived. Do not create Ideas or Candidates. Do not infer approval.

At the end of the run, update the current `scout_runs` row with completed_at, status `completed` or `no_new_signals`, signals_found, new_signals, and a concise summary. The Supabase database is the official result store. The task chat is only an execution log. If Supabase write access is unavailable during a run, do not claim the data was saved; clearly report the write-back failure.
