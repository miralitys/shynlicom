# Shynli.com Deployment

## Production Target

- Domain: `shynli.com`
- GitHub repo: `https://github.com/miralitys/shynlicom.git`
- Hosting: Render Static Site
- Lead destination: `https://shynlicleaningservice.com/quote`

## Render Settings

Use these settings if creating/configuring the service manually in Render:

- Service type: `Static Site`
- Branch: `main`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Custom Domain: `shynli.com`
- Redirect/Rewrites:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: `Rewrite`

Render applies rewrite rules only when a matching static file does not already exist, so assets, `robots.txt`, and `sitemap.xml` should still be served directly.

## Repository Shape

The GitHub repo should contain the contents of this folder at the repo root:

- `package.json`
- `package-lock.json`
- `index.html`
- `src/`
- `public/`
- `render.yaml`

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
- quote links and quote form handoff to `https://shynlicleaningservice.com/quote`
