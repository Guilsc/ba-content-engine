# BA Content Engine Architecture

## Current architecture

```text
                         BA CONTENT ENGINE

                  ChatGPT Project / AI runtime
               editorial intelligence + Skills
                           |
             +-------------+--------------+
             |                            |
           GitHub                      Supabase
     portable source/recovery       canonical live data
             |                            ^
             |                            |
             |                     Scheduled Tasks
             |                    Scout + Weekly Review
             |
             +------ recovery/specs ------+
                                          |
                                   ChatGPT Site
                                  operational UI
                                          |
                         ba-content-engine.guilhermecosta.tech

Hostinger DNS
  -> manages guilhermecosta.tech
  -> routes ba-content-engine subdomain to ChatGPT Sites
```

## Responsibility boundaries

### GitHub

Canonical portable source for:
- Project instructions
- workflow Skills
- editorial resources
- architecture and decision records
- automation specifications
- Source Registry contracts
- Supabase migrations
- recovery/current-state documentation
- fallback web application code

GitHub is what allows the BA Content Engine to survive a future ChatGPT account or hosting change.

### Supabase

Canonical for live application entities and workflow state.

Phase 1:
- Sources
- Signals
- Signal-Source relationships
- Scout Runs

Phase 2 publishing:
- Content Items

Later:
- Ideas
- Claims
- Evidence Notes
- workflow history
- publishing/performance entities as needed

`content_items` is the canonical bridge between editorial workflow, Metricool scheduling/publishing, LinkedIn publication, and portfolio display. The personal site consumes only explicitly published + portfolio-enabled rows.

Do not maintain a second independent canonical data store in the Site or ChatGPT Project.

### ChatGPT Project

Current operational reasoning and editorial workspace.

It contains the live working context, but critical rules/resources/Skills are also mirrored in Git so the Project can be recreated.

### ChatGPT Site

Current operational browser UI.

Production domain:
`https://ba-content-engine.guilhermecosta.tech/`

Trend Radar Phase 1 reads canonical Signals/Sources from Supabase. The Site must not become the canonical business-data store.

### Scheduled Tasks

Account-level workers:
- BA Trend Scout: Monday/Wednesday/Friday at 08:37 America/Sao_Paulo
- Trend Radar Weekly Review: Saturday at 09:00 America/Sao_Paulo

Their task chats are execution logs. Canonical state belongs in Supabase.

### Hostinger

Currently used for DNS/domain management.

The root domain `guilhermecosta.tech` is reserved for Guilherme's personal site/portfolio.

The BA Content Engine uses:
`ba-content-engine.guilhermecosta.tech`

### Fallback Next.js application

`app/` contains a tested portable Next.js implementation of Trend Radar.

It is retained as a recovery/fallback path and should not be treated as the current production UI while ChatGPT Sites remains operational.
