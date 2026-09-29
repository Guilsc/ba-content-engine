# Curatia Alpha - Product and Architecture Baseline

> Status: Alpha baseline for implementation
> Product: **Curatia**
> Tagline: **Signals. Context. Decisions. Creation.**
> This document records approved product direction before runtime implementation.

## 1. Product boundary

Curatia is a configurable editorial intelligence and content operations platform. It discovers and curates signals, supports evidence-based editorial decisions, creates channel-specific content and visuals, publishes approved work, and learns from performance.

The original Business Analysis configuration becomes the initial editorial profile for Guilherme's workspace. Curatia itself is domain-neutral: each workspace controls its editorial profile and discovery interests.

The canonical lifecycle remains:

`Idea -> Candidate -> Research -> Draft -> Visual Ready (when required) -> Approved -> Scheduled -> Published -> Learning`

Only explicit authorized approval may move a Content Item to Approved. A finished draft or visual is not approval.

## 2. Platform and workspace model

Curatia is multi-workspace from Alpha.

- A **platform Owner** has platform administration privileges and may also be a member of normal workspaces.
- The initial platform Owner is Guilherme da Silva Costa. Ownership is assigned to the immutable Supabase Auth user ID and is independent of authentication provider.
- Owner status is an authorization record, not a fake Admin account, provider identity, or hard-coded email check throughout application code.
- The Owner has a normal personal workspace so Curatia can be used exactly as an Admin uses it.
- The Owner can switch between **My Workspace** and **Platform Administration**.
- An Admin creates/owns a workspace and can invite users into that workspace.
- Child users inherit the workspace boundary of the Admin who invited them.
- No workspace may read another workspace's content, signals, sources, analytics, configuration, integrations, agent activity, or users.
- Platform Owner can administer workspaces across the platform, but passwords, OAuth tokens, API secrets, and other credentials are never exposed in readable form.

### Alpha roles

| Role | Scope |
|---|---|
| Owner | Platform administration plus normal workspace membership |
| Admin | Full administration of one workspace and its users |
| Creator | Full editorial/content operation with limited agent, analytics, and configuration controls |
| Viewer | Read-only workspace access |

Fine-grained custom roles are later scope. Alpha uses these four roles.

## 3. Workspace onboarding and editorial profile

A first-time Admin creates a workspace and establishes its editorial intelligence profile.

Onboarding/configuration covers:
- workspace/brand identity
- audience
- voice and writing preferences
- content strategy/themes
- discovery interests
- visual identity/preferences
- channels
- integrations
- publishing preferences

The current BA Content Engine resources seed Guilherme's workspace. They must not become global defaults for every user.

## 4. Configurable discovery

Each workspace has one editable collection of **Discovery Interests**.

Curatia seeds a useful curated set for Guilherme's workspace (for example Business Analysis, AI, Agentic AI, Business Process, BI, Data, Decision Intelligence, Automation and Context Engineering). The user can add or remove any interest. Defaults are not mandatory.

UI behavior:
- interests render as compact removable labels/chips
- an **Add interest** control adds another label
- saving changes clearly states that changes affect the **next discovery run**
- previously discovered Signals retain the discovery tags and context that existed when they were found

Discovery behavior:
1. active interests are loaded for the workspace
2. the discovery capability expands interests into appropriate search concepts/queries
3. the run records which interests/query context were used
4. resulting Signals receive a historical discovery-tag snapshot

Changing interests never rewrites historical Signal provenance.

## 5. Agent model

Curatia does not create a large permanent pantheon of specialist agents.

- Responsibilities should be assigned to the existing main Olympus agents when Curatia later joins Olympus.
- Main agents may use multiple Curatia Skills.
- Temporary workers may be created for specialized, parallel, or bounded work and disposed of afterward.
- Standalone Curatia uses an orchestration service/runtime; it does not need to pretend this service is another named agent.
- Olympus must remain a future adapter, not an Alpha runtime dependency.

Every agent/worker boundary must define:
- mission/responsibility
- allowed Skills and tools
- data scope
- permitted autonomous actions
- approval-required actions
- input/output contracts
- retry/failure behavior
- observability requirements

Existing workflow Skills remain reusable capabilities rather than being converted one-for-one into permanent agents.

## 6. Mission Control and operational observability

Mission Control is a Curatia operational surface inspired by the useful parts of the Hermes AgentOS Mission Control pattern, not a clone of the whole external dashboard.

Workspace-level Mission Control should expose relevant:
- main agent/temporary worker status
- current jobs and linked Content Items/Scout Runs
- scheduled jobs
- recent activity
- run status/duration
- errors and retries
- AI/model/tool usage where measurable

Owner Platform Administration additionally provides cross-workspace health, usage, run, error, schedule and integration views.

Keep three histories distinct:

1. **Workflow History**: business lifecycle changes such as Candidate -> Research -> Draft.
2. **Agent Activity Log**: execution events, tool calls, worker delegation, failures and results.
3. **Audit Log**: security/governance actions such as role changes, configuration changes, approvals, credential changes and API-client changes.

Agent runs support parent/child relationships so temporary-worker delegation is traceable. Cancel/retry is a SHOULD capability for Alpha evolution, not a blocker for the first foundation increment.

## 7. Scheduling

The target standalone scheduling boundary is:

`Scheduler -> Job Dispatcher/API -> Curatia jobs`

Business job logic must not live inside a hosting-specific cron definition.

Initial jobs include:
- Trend Scout
- Trend Radar review
- analytics synchronization
- publication synchronization
- retention/cleanup
- health checks

The scheduler implementation should be replaceable through an adapter so a future Olympus scheduler can call the same job contracts without rewriting Curatia business logic.

Hostinger is the current application runtime, but scheduling must not be architecturally coupled to Hostinger.

## 8. Content API and integrations

Curatia introduces a dedicated server-side Content/API boundary rather than allowing clients, agents or external systems to write arbitrary database records.

Expected domains include:
- signals
- ideas
- content
- content versions
- assets
- publications
- analytics
- agents/runs
- configuration

External API access is disabled by default. Future scoped API clients may be enabled per workspace.

Integrations are adapters. Composio may be used where it adds value, but Curatia must not depend on it for core domain logic. Metricool or direct provider integrations may be used for publishing/analytics where appropriate.

## 9. Multi-channel content

A Content Item represents the canonical editorial thesis/content concept. Channel variants are derived but independent artifacts.

Alpha/V2 targets include:
- LinkedIn post
- LinkedIn carousel
- Instagram post
- Instagram carousel
- Instagram Reel where supported
- TikTok where supported

Channel adaptation is not simple copy/paste. Each variant has its own copy/format/assets/publication metadata while retaining a link to the canonical Content Item.

## 10. Visual Studio

Visuals are optional. Curatia may recommend whether a visual adds value, but the user decides.

A Content Item can choose:
- AI-generated visual
- uploaded image
- carousel
- template-based visual
- no visual

**No visual** is a valid completed visual decision and must not block approval.

### AI visual flow

1. Curatia proposes a visual concept based on thesis, content, channel and workspace visual identity.
2. Curatia prepares an editable generation prompt.
3. User generates the image.
4. Generated result appears in the same Visual Studio workspace as soon as generation completes.
5. User may accept it, directly edit the prompt, or give natural-language revision feedback.
6. Re-generation creates a new version rather than destroying the previous version.
7. User explicitly selects the version to use.

Uploaded images receive preview, replacement and channel-fit/crop handling.

Suggested carousel slide counts depend on format rather than using one fixed number. Example ranges:
- quick insight: 4-5
- argument: 6-8
- framework: 7-9
- tutorial: 8-12
- story: 6-10
- custom: user choice

Visual metadata should retain provenance such as generated/uploaded/template, prompt where applicable, provider/model where applicable, parent version, dimensions, channel and selection status.

## 11. Analytics and learning

Curatia improves Post Learning into a performance intelligence capability.

Track where provider data permits:
- reach/views/impressions
- reactions/comments/shares/reposts
- saves/sends
- profile visits/follows/clicks
- channel, topic, thesis, format, hook, length, visual type and publication timing

Learning should distinguish:
`Observation -> Hypothesis -> Experiment -> Evidence -> Learning`

Curatia must not claim reliable patterns from insufficient samples.

Analytics are workspace-isolated. Owner receives aggregate/platform operational views in addition to authorized workspace inspection.

## 12. Authentication, authorization and security

Target authentication uses managed Supabase Auth rather than Curatia storing passwords itself. Alpha starts with email/password. The email is a login identifier; ownership is bound to the immutable Auth user ID, not to an email domain/provider. OAuth providers may be added later without changing authorization.

Alpha sign-in:
- email/password

Later optional providers:
- Google
- GitHub
- Facebook where justified by channel/integration needs

Authorization is workspace-aware and enforced server-side/database-side, not only by hidden UI elements.

Security rules:
- never expose service-role/secret keys to the client
- never expose stored OAuth/API secrets in readable form
- use secure server-side secret/token storage
- all domain records that belong to a workspace carry/enforce workspace ownership
- privileged operations create audit events
- Owner identity/role is centrally bootstrapped/configured by immutable Auth user ID, not duplicated as scattered email/provider checks

## 13. Workspace capacity and retention

Alpha deliberately limits resource consumption because workspaces use the platform owner's infrastructure.

Initial configurable entitlement defaults for non-Owner workspaces:

| Resource | Alpha default |
|---|---:|
| Active Signals | 100 |
| Sources | 500 |
| Ideas | 50 |
| Content Items | 50 |
| Generated visual versions | 5 per Content Item |
| Asset storage | 250 MB per workspace |
| Agent operational logs | 30 days |
| Detailed AI run payloads | 30 days |
| Workflow/audit history | 12 months |
| Analytics snapshots | 12 months |

These values are configuration/entitlements, not hard-coded throughout application logic.

Capacity UX:
- show usage such as `87 / 100 active signals`
- warn as capacity approaches the limit
- archive appropriate historical editorial records rather than silently destroying useful knowledge
- remove transient/raw operational payloads according to retention policy
- content is archived rather than automatically deleted
- unreferenced/redundant source payloads may be cleaned according to policy

For Alpha, ordinary workspaces do not receive unlimited operational-data retention. Owner/internal workspaces may override limits for administration/testing.

Billing, subscriptions, checkout and paid upgrades are explicitly **out of Alpha scope**, but the entitlement model must allow future plans without redesigning domain tables.

## 14. Documentation and configuration

Curatia will eventually expose version-matched product documentation from the application/Hostinger deployment. Repository documentation remains canonical for engineering.

AI Configuration expresses business intent, not raw prompt editing. Configuration areas include discovery, editorial profile, visual identity, agent autonomy/boundaries, publishing, analytics/learning, integrations and retention within entitlement limits.

## 15. Data-domain direction

Expected Phase 2+ domains:

### Identity and tenancy
- profiles
- workspaces
- workspace_members
- platform_roles / workspace roles

### Configuration
- workspace_settings
- discovery_interests
- workspace_entitlements
- retention policies
- editorial/visual profile configuration

### Editorial
- sources
- signals
- signal_sources
- ideas
- content_items
- content_versions
- claims
- evidence_notes
- assets

### Channels and publishing
- channels
- channel_accounts
- content_variants
- publications

### Agents and operations
- agent definitions/boundaries
- agent_runs
- agent_events
- schedules/job runs

### Governance
- workflow_events
- approvals
- audit_events

### Analytics
- performance snapshots/metrics
- experiments
- learnings

### Integrations
- integration connections
- webhooks
- API clients

This is a target domain map, not authorization to create every table in one migration.

## 16. Alpha implementation sequence

### A. Foundation
- Curatia rename/product shell
- managed Auth
- workspace tenancy
- Owner/Admin/Creator/Viewer authorization
- workspace onboarding/profile
- entitlement/capacity framework
- audit foundation
- API/domain-service boundary
- safe migration strategy for existing Guilherme data

### B. Configurable Intelligence
- editable Discovery Interests
- historical discovery-tag snapshots
- dynamic query generation
- Scout run history
- replaceable scheduler/job dispatcher

### C. Operational layer
- orchestration contracts
- agent boundaries
- parent/child runs
- Agent Activity Log
- Workflow History
- Mission Control
- AI/usage observability

### D. Editorial Studio
- Ideas/Content Items
- research/claims/evidence
- thesis and draft versioning
- explicit approval

### E. Visual Studio
- optional visual decision
- AI generation with live preview and editable prompt
- natural-language revisions/versioning
- uploads
- templates
- carousel generation

### F. Distribution
- channel variants
- LinkedIn/Instagram/TikTok support
- scheduling
- publishing integrations
- publication state tracking

### G. Learning
- metric ingestion
- performance dashboard
- experiments
- confidence-aware learnings
- strategy feedback

### H. Platform maturity
- external scoped API clients
- expanded integrations
- automated cleanup/retention
- in-product documentation
- deeper health/cost monitoring
- Olympus adapters

## 17. Explicit non-goals for the first Alpha foundation

Do not:
- make Olympus a runtime dependency
- create permanent agents for every Skill
- implement billing/subscriptions now
- expose raw secrets to Owner/Admin
- allow cross-workspace data access
- force every Content Item to have an image
- auto-approve generated content
- auto-promote Trend Radar Signals to Ideas/Candidates
- redesign infrastructure around Higgsfield/here.now
- create the entire target database in one unreviewed migration

## 18. UX design checkpoint

Before broad feature implementation, Curatia may undergo a one-time Alpha UX/design exploration to ensure the original BA Content Engine layout can support the expanded product.

The desired product feel is an **editorial intelligence workspace**, not a generic CMS covered in AI controls.

Major surfaces to validate:
- application shell/navigation
- Home
- Signals / Trend Radar
- Idea Tank
- Editorial Studio
- Visual Studio
- Publishing / Calendar
- Analytics
- Mission Control
- Workspace onboarding/configuration
- Owner Platform Administration

Design exploration is a proposal stage only. Approved UX is implemented in the real Curatia codebase.
