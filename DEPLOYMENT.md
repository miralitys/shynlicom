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

## SEO: per-route title and description in raw HTML

The site is a Vite + React SPA, so `useSeoMeta` sets the title client side. That left every one of the 626 URLs shipping the same raw markup: title `Shynli Cleaning | House Cleaning in Chicago Western Suburbs`, H1 `Shynli`, zero city mentions. Google rendered JS for the core pages but parked 453 of ~640 URLs in "Discovered, currently not indexed", because nothing in the markup told them apart.

Two pieces solve this, and they run at different times.

### 1. Build step: `dist/seo-routes.json` (this is what production uses)

The `shynli-seo-routes` plugin in `vite.config.ts` writes a route to meta map for every city, service, city+service and generic SEO page. Titles and descriptions are copied verbatim from `src/site/pages.tsx` (`CityPage`, `ServiceSeoPage`) so the server and the client never disagree.

`server.mjs` loads that file at startup and `injectRouteSeo` uses it, alongside the existing `guideSeoMeta`, to rewrite title, description, robots and canonical before the HTML goes out.

No extra dependency, no browser, no added build time. Current output: 595 routes, 553 distinct titles.

### 2. Optional local step: full prerender

`npm run prerender` (after `npm run build`) installs Chromium, serves `dist/` locally, walks all sitemap URLs with Playwright, and writes fully rendered HTML with real body copy to `dist/<route>/index.html`. `serveStatic` prefers those files when they exist, so no server change is needed.

**This is deliberately not part of the Render build.** Render's native Node runtime has no system libraries for Chromium (`libnss3`, `libatk`, `libgbm`), so the browser cannot launch there. Running it would just add a failed download to every deploy. To make it work in production the service would have to move to the Docker runtime with a Playwright base image, and the current `Dockerfile` is Alpine, which Playwright does not support.

Notes on the prerender script:

- The home page is skipped on purpose. `dist/index.html` stays as the SPA fallback for unknown routes.
- `index.html` carries a static ~87 word skeleton and React only paints around the six second mark, so the wait condition is a `document.title` change away from the shell title plus a word count. A naive "root has text" check silently captures the skeleton.
- External requests are blocked during prerender: analytics never settles and stalls the load.
- The local server always returns the clean shell for app routes, so a rerun never feeds the previous output back into itself.
- Tunables: `PRERENDER_CONCURRENCY` (default 6), `PRERENDER_PORT` (default 4183), `PRERENDER_STRICT=1` to exit non-zero on failure.

### Verify after a deploy

```
curl -s https://shynli.com/service-areas/naperville | grep -o '<title>[^<]*'
curl -s https://shynli.com/service-areas/aurora/deep-cleaning | grep -o '<title>[^<]*'
```

Expect `House Cleaning in Naperville, IL | Shynli Cleaning` and `Deep Cleaning in Aurora, IL | Shynli Cleaning`. The generic shell title means `dist/seo-routes.json` did not load, check the service log for `SEO-маршрутов загружено`.

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
