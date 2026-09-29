# Curatia Content Engine Web Application

This directory contains the Next.js implementation of Curatia, including the Trend Radar foundation.

## Important status

**This is not the current production UI.**

The current production UI is the ChatGPT Site at:

`https://curatia-content-engine.guilhermecosta.tech/`

The implementation in this folder is retained as:
- recovery/fallback code
- portability insurance
- the portable production implementation of Curatia

Do not deploy this application merely because it exists. Deployment requires an explicit architecture decision.

## Implemented scope

The fallback application:
- reads `New`, `Watch`, and `Explore` Signals from Supabase
- renders canonical linked Sources
- persists Trend Radar state changes server-side
- never exposes the Supabase secret key to browser code
- does not create Ideas/Candidates automatically
- has a private access-key authentication flow
- successfully completed a GitHub Actions production build

## Environment variables if fallback deployment is ever needed

```
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
APP_ACCESS_KEY=use-a-long-random-personal-access-key
```

Never commit real secrets.

## Architecture

- GitHub = portable source/configuration/recovery
- Supabase = canonical live application data
- ChatGPT Project = operational AI/editorial workspace
- ChatGPT Site = current production UI
- Scheduled Tasks = background workers
- this Next.js app = fallback runtime
