# BA Content Engine Architecture

## Target architecture

```text
                    BA CONTENT ENGINE

              ChatGPT Project / AI runtime
             editorial intelligence + Skills
                         |
             +-----------+-----------+
             |                       |
           GitHub                 Supabase
     portable source/config     canonical live data
             |                       ^
             v                       |
        Web application        Scheduled Tasks
             |
             v
          Hosting
```

## Responsibility boundaries

### GitHub
Canonical for:
- web application source code
- Project instructions
- Skills
- editorial resources
- architecture and decision records
- automation specifications
- Supabase migrations

### Supabase
Canonical for live application entities and state, including:
- Sources
- Signals
- Signal-Source relationships
- Scout Runs
- later: Ideas, Content Items, Claims, Evidence Notes, workflow history

### ChatGPT Project
Operational reasoning environment. It consumes the portable configuration stored in GitHub, but it is not the only copy of the system.

### Scheduled Tasks
Workers running at account level. They use Skills/instructions and read/write Supabase. Their chat output is an execution log, not canonical state.

### Hosting
Replaceable runtime for the browser application. Hosting must not become the source of truth for business data.
