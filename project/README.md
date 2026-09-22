# BA Content Engine — Skill-Ready Architecture

This package separates governance, reference knowledge, repeatable workflows, and site behavior.

## Architecture

- `PROJECT-INSTRUCTIONS.md` — project-level constitution and governance.
- `resources/` — reference knowledge. Resources describe what the system knows.
- `skills/` — repeatable workflows. Skills describe what the system does.
- `site/` — routing and data-contract guidance for the BA Content Engine site.

## Recommended placement

### ChatGPT Project
Use `PROJECT-INSTRUCTIONS.md` as the basis for Project Instructions.

Add the files under `resources/` as Project resources/files.

### BA Content Engine Site
Keep the workflow definitions under `skills/` in the site/codebase if the site agent can read local instruction files.

Use `site/SKILL-ROUTER.md` to map UI actions to workflows.

Use `site/CONTENT-ITEM-SCHEMA.md` as the canonical data contract.

### Formal ChatGPT Skills
Each directory under `skills/` is intentionally shaped as a standalone skill with a `SKILL.md`.

If/when formal ChatGPT Skills are available in the user's workspace, each skill can be packaged or uploaded separately with the supporting resources it needs.

## Design principle

Resources describe what we know.
Skills describe what we do.
Project Instructions define the rules.
The Site provides the operating interface and stores workflow state.

## Approval rule

Nothing becomes `Approved`, `Scheduled`, or `Published` unless Guilherme explicitly approves the specific Content Item.
