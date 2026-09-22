# BA Content Engine Web Application

This directory contains the portable web application for BA Content Engine.

## Current scope

Phase 1 implements the Trend Radar against the canonical Supabase backend.

The application:
- reads `New`, `Watch`, and `Explore` Signals from Supabase
- renders canonical linked Sources
- persists Trend Radar state changes server-side
- never exposes the Supabase secret key to browser code
- does not create Ideas/Candidates automatically

Later phases will add Idea Tank, Content Pipeline, Editorial Studio, and Publishing & Learnings.

## Required environment variables

Configure these only in the hosting provider's server-side environment settings:

```
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
APP_ACCESS_KEY=use-a-long-random-personal-access-key
```

Never commit real secrets.

`APP_ACCESS_KEY` protects the private editorial UI. The application stores only a derived HTTP-only session token in the browser.

## Run

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

The hosting platform should use `app/` as the application root.

## Architecture

- GitHub = canonical code/configuration
- Supabase = canonical live application data
- ChatGPT Project = operational AI/editorial workspace
- Scheduled Tasks = background workers
- hosting = replaceable runtime
