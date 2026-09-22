# BA Content Engine Site — Skill Router

This file maps site surfaces and actions to workflow skills.

## Routing

### Trend Radar
Action: Evaluate signal
Skill: `skills/trend-evaluation/SKILL.md`

Allowed outcomes:
- Watch
- Explore
- Candidate recommendation

Do not auto-promote to Candidate.

### Idea Tank
Action: Develop idea
Skill: `skills/idea-development/SKILL.md`

Action: Promote to Candidate
Rule: requires explicit user action/approval for that item.

### Editorial Studio
Action: Research
Skill: `skills/editorial-research/SKILL.md`

Action: Draft
Skill: `skills/linkedin-drafting/SKILL.md`

Action: Develop visual
Skill: `skills/visual-direction/SKILL.md`

Every Candidate should pass through Editorial Studio before approval.

### Publishing & Learnings
Action: Check readiness / schedule
Skill: `skills/publishing-review/SKILL.md`

Action: Learn from published post
Skill: `skills/post-learning/SKILL.md`

## State Safety

No skill may silently skip lifecycle stages.

Only explicit user approval can set `Approved`.

A UI button may request a state transition, but the transition must still satisfy the lifecycle rule.

## Resource Access

When relevant, skills should read from:
- `resources/voice-and-style.md`
- `resources/content-strategy.md`
- `resources/linkedin-profile.md`
- `resources/best-posts.md`
- `resources/post-performance.md`
- `resources/editorial-quality-bar.md`
