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
