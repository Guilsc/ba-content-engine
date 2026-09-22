# Content Item — Canonical Schema

Use one canonical Content Item record across Idea Tank, Pipeline, Editorial Studio, Calendar, and Learnings.

## Identity

- `id`
- `title`
- `series`
- `topic`
- `publishing_channel`

## Editorial

- `core_idea`
- `why_now`
- `ba_implication`
- `second_order_implication`
- `strongest_angle`
- `saturation`
- `evidence_strength`
- `source_origin`

## Workflow

- `status`
- `created_at`
- `updated_at`
- `target_date`
- `publication_date`
- `publication_time`

Allowed status values:

`Idea`
`Candidate`
`Research`
`Draft`
`Visual Ready`
`Approved`
`Scheduled`
`Published`
`Learning`

## Research

- `sources`
- `verified_facts`
- `limitations`
- `evidence_gaps`
- `revised_thesis`

## Draft

- `draft_copy`
- `final_copy`

## Visual

- `visual_concept`
- `visual_brief`
- `final_visual_reference`

## Approval

- `approved_by_user`
- `approval_timestamp`
- `approval_note`

`approved_by_user` may only become true from explicit approval of the specific Content Item.

## Performance

- `impressions`
- `reactions`
- `comments`
- `reposts`
- `saves`
- `sends`
- `profile_visits`
- `new_followers`
- `qualitative_feedback`
- `learning_summary`
- `learning_confidence`

## Governance

Do not infer missing publishing date or time.

Do not use `Visual Ready` as a synonym for `Approved`.

Do not duplicate Content Items across pages. All views should reference the same canonical record.
