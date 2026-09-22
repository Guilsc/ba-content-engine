# Hostinger Deployment Guide

## Goal

Deploy the BA Content Engine web application without requiring local software on the work laptop.

## Hosting requirement

Use Hostinger managed Node.js Web App hosting.

Current Hostinger documentation states that managed Node.js web applications are available on:
- Business Web Hosting
- Cloud Startup
- Cloud Professional
- Cloud Enterprise
- Cloud Enterprise Plus

Next.js is a supported frontend and backend framework. Node.js 20 is supported and matches this repository's current `package.json`.

## GitHub deployment

Preferred deployment path:

1. Hostinger hPanel
2. Websites
3. Add Website
4. Deploy Web App / Node.js Web App
5. Import Git Repository
6. Authorize the GitHub account that owns `Guilsc/ba-content-engine`
7. Select the private `ba-content-engine` repository

Hostinger can automatically build and redeploy applications connected through GitHub.

## Application root

The web application currently lives under:

`app/`

Before the first production deployment, verify whether the Hostinger deployment screen allows `app/` to be selected as the application/root directory.

If it does not, do not duplicate the app manually. Move/flatten the web app to the repository root in Git so Hostinger sees `package.json` and the Next.js application directly.

## Required environment variables

Configure these in Hostinger's environment-variable UI. Never commit their real values.

```
SUPABASE_URL
SUPABASE_SECRET_KEY
APP_ACCESS_KEY
```

### SUPABASE_URL

Use the canonical BA Content Engine Supabase project URL.

### SUPABASE_SECRET_KEY

Use a current Supabase `sb_secret_...` key.

This key is server-only and must never be exposed in client JavaScript.

### APP_ACCESS_KEY

Use a long random personal access key.

This protects the private editorial interface. The application stores a derived HTTP-only session token in the browser rather than the raw key.

## Supabase

Hostinger currently supports connecting an external Supabase project to a Node.js application through its database connection wizard.

The BA Content Engine code already uses Supabase and does not require Hostinger to modify application code.

## First production acceptance test

After deployment:

1. Open the site and confirm the private login page appears.
2. Sign in with `APP_ACCESS_KEY`.
3. Confirm Trend Radar loads from the live Supabase project.
4. Insert or verify a temporary New Signal in Supabase.
5. Refresh Trend Radar and confirm it appears.
6. Change the Signal to Watch.
7. Refresh and confirm Watch persists.
8. Confirm linked Sources render.
9. Remove temporary test data.
10. Confirm no Supabase secret is present in browser source or client network payloads.

Do not migrate Idea Tank or later workflow phases until these checks pass.
