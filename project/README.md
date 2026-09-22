# BA Content Engine — Skill-Ready Architecture

This package separates governance, reference knowledge, repeatable workflows, and Site behavior so the ChatGPT Project can be recreated independently of the current account.

## Architecture

- `PROJECT-INSTRUCTIONS.md` — project-level constitution and governance.
- `resources/` — reference knowledge. Resources describe what the system knows.
- `skills/` — repeatable workflows. Skills describe what the system does.
- `site/` — routing and data-contract guidance for the BA Content Engine site.

## Recommended placement

### ChatGPT Project
Use `PROJECT-INSTRUCTIONS.md` as the basis for Project Instructions.

Add the files under `resources/` as Project resources/files.

### BA Content Engine Web Application
Keep workflow definitions under `skills/` as portable specifications. The web application should enforce lifecycle rules in code and use Supabase as canonical state.

Use `site/SKILL-ROUTER.md` to map UI actions to workflows.

Use `site/CONTENT-ITEM-SCHEMA.md` as the canonical data contract.

### Formal ChatGPT Skills
Each directory under `skills/` is intentionally shaped as a standalone skill with a `SKILL.md`.

If/when formal ChatGPT Skills are available in the user's workspace, each skill can be packaged or uploaded separately with the supporting resources it needs.

## Design principle

Resources describe what we know.
Skills describe what we do.
Project Instructions define the rules.
The web application provides the operating interface. Supabase stores canonical workflow state.

## Approval rule

Nothing becomes `Approved`, `Scheduled`, or `Published` unless Guilherme explicitly approves the specific Content Item.


## Current production UI

The live operational UI is the ChatGPT Site at:

`https://ba-content-engine.guilhermecosta.tech/`

Supabase is the canonical live data store. GitHub is the portable source/recovery layer.

The Next.js code under `../app/` is a fallback implementation, not the current production UI.
