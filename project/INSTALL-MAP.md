# Installation / Placement Map

## 1. ChatGPT Project

### Project Instructions
Use the content from:
`PROJECT-INSTRUCTIONS.md`

### Project Resources
Add:
- `resources/voice-and-style.md`
- `resources/content-strategy.md`
- `resources/linkedin-profile.md`
- `resources/best-posts.md`
- `resources/post-performance.md`
- `resources/editorial-quality-bar.md`

These are knowledge/reference files, not workflow engines.

## 2. Site / App Codebase

Add:
- `/skills/*/SKILL.md`
- `site/SKILL-ROUTER.md`
- `site/CONTENT-ITEM-SCHEMA.md`

The site runtime must explicitly read or route to these files. Merely storing them in the repository does not make them executable.

## 3. Formal ChatGPT Skills

When the account/workspace supports formal Skills, each folder under `/skills/` is designed to become a standalone Skill.

For a formal standalone upload, include the specific `SKILL.md` plus any supporting resource files that skill needs.

## Suggested Resource Dependencies

- Trend Evaluation → content strategy, editorial quality bar
- Idea Development → content strategy, editorial quality bar
- Editorial Research → content strategy, editorial quality bar
- LinkedIn Drafting → voice/style, strategy, LinkedIn profile, best posts, quality bar
- Visual Direction → content strategy, quality bar
- Publishing Review → project governance / content schema
- Post Learning → post performance, content strategy

## Do Not Duplicate Governance

Keep lifecycle and approval rules canonical in Project Instructions and Site schema.

Skills may repeat critical safety gates such as approval requirements, but should not introduce conflicting lifecycle definitions.
