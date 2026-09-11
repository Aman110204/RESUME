# Aman Kumar — Portfolio (v2)

React + TypeScript + Vite + Tailwind rebuild. See in-app admin at `/admin` for content editing —
backed by the same Supabase project/table as the original site.

## Run locally
```bash
npm install
npm run dev
```

## Environment variables
Copy `.env.example` to `.env`, fill in your Supabase URL/anon key (already pre-filled in `.env`
in this zip with your existing project's values).

## Build & deploy (Netlify)
```bash
npm run build   # outputs to dist/
```
`netlify.toml` already sets the build command, publish dir, Node version (20), SPA redirects,
and security headers — nothing to configure manually on Netlify beyond the two env vars.

## Certifications with links
The `/admin` → `certifications` tab now has a `link` field per certificate. Two certs already
point at PDFs bundled directly in this project (`public/certs/`) — no external hosting needed.
You can also paste a Google Drive share link there instead if you'd rather host it externally
(make sure Drive sharing is set to "Anyone with the link").

## Badges (Credly, etc.)
New `/admin` → `badges` tab. Add a badge's name, issuer, and its public share link (from Credly:
open the badge → Share → copy the public URL). Renders as its own section on the public site,
only when at least one badge is added.

## Keeping Supabase awake
`.github/workflows/supabase-keepalive.yml` pings the database twice a week automatically.
Needs two repo secrets set on GitHub: `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
