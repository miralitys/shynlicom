# Shynli.com Deployment

## Production Target

- Domain: `shynli.com`
- GitHub repo: `https://github.com/miralitys/shynlicom.git`
- Hosting: Render Web Service / Node
- Lead intake: local callback endpoint at `/api/leads/callback`
- Server-side forward destination: `QUOTE_SUBMIT_URL`

## Render Settings

Use these settings if creating/configuring the service manually in Render:

- Service type: `Web Service`
- Runtime: `Node`
- Branch: `main`
- Build Command: `npm ci && npm run build`
- Start Command: `npm start`
- Custom Domain: `shynli.com`

The Node server serves `dist/` directly, falls back to `dist/index.html` for app routes, and exposes `POST /api/leads/callback`.

## Prerender (SEO)

`npm run build` automatically triggers `postbuild`, which installs Chromium and runs `scripts/prerender.mjs`.

The site is a Vite + React SPA, so raw HTML is an empty shell on every route: same title, same H1, no city text. Google renders JS for the core pages but leaves the long tail in "Discovered, currently not indexed" (453 of ~640 as of the 2026-07-23 audit). The prerender step fixes that: it serves `dist/` locally, walks all 626 URLs from `sitemap.xml` with Playwright, and writes the fully rendered HTML to `dist/<route>/index.html`.

**No server changes are needed.** `serveStatic` in `server.mjs` already prefers `dist/<route>/index.html` when the file exists and only falls back to the SPA shell when it does not.

Notes:

- The home page is skipped on purpose. `dist/index.html` stays as the SPA fallback for unknown routes, and its raw title and description are already correct.
- Build time grows by roughly 4 to 5 minutes (Chromium download plus ~626 pages at 6 parallel tabs).
- A failing prerender does **not** break the deploy: the site still works through the SPA fallback, only the SEO gain is lost. Set `PRERENDER_STRICT=1` if you want a failed prerender to fail the build instead.
- Tunables: `PRERENDER_CONCURRENCY` (default 6), `PRERENDER_PORT` (default 4183).

Verify after a deploy:

```
curl -s https://shynli.com/service-areas/naperville | grep -o '<title>[^<]*'
curl -s https://shynli.com/service-areas/naperville | grep -c -i naperville
```

Expect the city-specific title and dozens of city mentions in the raw response, not the generic shell.

## Environment Variables

- `QUOTE_SUBMIT_URL`: existing quote backend submit URL. Defaults to `https://shynlicleaningservice.com/api/quote/submit`.
- `LEAD_WEBHOOK_URL`: optional extra webhook for raw callback leads.
- `LEADS_FILE_PATH`: optional JSONL storage path for callback leads. Defaults to `data/callback-leads.jsonl`.

## Repository Shape

The GitHub repo should contain the contents of this folder at the repo root:

- `package.json`
- `package-lock.json`
- `index.html`
- `src/`
- `public/`
- `render.yaml`
- `server.mjs`

Do not push the entire Obsidian vault to `miralitys/shynlicom`.

## Pre-Deploy Checks

Run before pushing a production deploy:

```bash
npm run lint
npm run build
```

After Render deploys, verify:

- `https://shynli.com/`
- `https://shynli.com/sitemap.xml`
- `https://shynli.com/robots.txt`
- a deep URL, for example `/service-areas/naperville/deep-cleaning`
- callback form submission to `https://shynli.com/api/leads/callback`
- lead storage / server-side forward to `QUOTE_SUBMIT_URL`
- GTM / dataLayer event `lead_quote_submit`
