# Permanent move to shynlicleaningservice.com

Redirect version: `2026-10-23.1`.

`server.mjs` returns a server-side HTTP 301 before every static-file, SPA, or API handler. `redirects.mjs` maps requests directly to `https://shynlicleaningservice.com`, uses no trailing slash except the home page, and preserves the query string. The response has an empty body. No client-side redirect or meta refresh is involved.

## Mapping

- All 42 city slugs lose their hyphens. City guides and general city services go to the city page.
- Only Naperville, Aurora, Plainfield and Bolingbrook retain dedicated deep-cleaning and move-out-cleaning targets. All three move service aliases use move-out-cleaning in those four cities.
- Global services, general pages, articles and checklists follow the migration mapping in `redirects.mjs`.
- Unknown paths, ads and assets go to the main site's home page.
- The old sitemap, both ad sitemaps and robots.txt redirect to the main site's matching discovery files.
- Case and trailing-slash variants are normalized inside the mapping, without an intermediate redirect.

All 68 distinct destinations were fetched before deployment and returned HTTP 200 without a redirect. The 584-URL source sitemap remains in `public/sitemap.xml` for rollback and verification. No files or settings on the destination site are changed.

## Deployment

The actual Render service is `srv-d80u9tnlk1mc739ucneg`, using the repository's Dockerfile and the `main` branch. The runtime image copies `redirects.mjs` alongside `server.mjs`. `render.yaml` describes an older native Node setup and is not the active service configuration. No Render dashboard setting needs to change for the origin redirects.

### Remaining edge limitation

Render automatically redirects HTTP requests to HTTPS and the secondary www hostname to the primary hostname before the Node server receives a request. Origin code cannot remove those extra hops. A direct request to `https://shynli.com` reaches the new mapping in one hop, but the other public variants require a redirect-capable edge or web host in front of Render.

On 2026-10-23 the user confirmed that GoDaddy access is unavailable. No DNS records, nameservers, mail settings, or Cloudflare settings were changed. Do not claim that all hostname and protocol variants pass the one-hop requirement until a later edge deployment is verified.

References: [Render custom domains](https://render.com/docs/custom-domains), [Render web services](https://render.com/docs/web-services).

## Verification

```sh
npm ci
npm run test:redirects
npm run lint
npm run build
npm run audit:redirects
```

The audit sends GET requests with redirects disabled and checks every source response, exact Location, destination response, redirect chain and hop count. It writes CSV and JSON evidence under `reports/site-redirect-2026-10-23/`. It exits nonzero if any required check fails, including infrastructure-level hostname variants.

For a local check, run `PORT=4186 npm start`, then:

```sh
AUDIT_ORIGIN=http://127.0.0.1:4186 AUDIT_PHASE=local npm run audit:redirects
```

The ten additional audit paths are a fixed, reproducible sample covering unknown URLs, case, trailing slashes, index.html, ads, city slug aliases, and encoded tracking parameters.

## Rollback

The original React site, static assets, Node handlers and build remain in the repository. Set `SITE_REDIRECT_ENABLED=false` in the Render service environment and redeploy to serve that site again. Alternatively, roll back to commit `bc1630e7665751fd3861948dcee39a9fbebd49d1` in Render. The flag defaults to enabled and affects all public routes, including the old callback endpoint.

A permanent 301 can be cached by browsers or crawlers after rollback. Responses use a one-hour cache lifetime to limit that operational window.

## Airbnb migration proxy

The same Node service handles both shynliairbnbcleaning.com and www.shynliairbnbcleaning.com with their own Airbnb mapping. Only their web bindings move between Render services; DNS stays unchanged. The internal `/__airbnb_redirect/*` endpoint on shynlicom.onrender.com is retained for origin verification. `airbnb-redirects.mjs` is copied from `miralitys/shynliairbnbcleaning/redirects.mjs`; keep the files byte-identical. Host scoping keeps all paths on shynli.com on their original mapping. `AIRBNB_REDIRECT_ENABLED=false` disables the Airbnb handler. The main business website is not modified.

## Apartment domain

`apartment-redirects.mjs` is the byte-identical mapping from `miralitys/shynliapartmentcleaning/redirects.mjs`, version 2026-10-23.1. Its apex and www hostnames use this Node service. `APARTMENT_REDIRECT_ENABLED=false` disables the handler. The reserved `shynlicom.onrender.com/__apartment_redirect/` endpoint permits origin checks. Restore old apartment content by moving its domain bindings back to Static Site `srv-d812br6gvqtc73e16bag`, verifying www and TLS and removing its retained-origin noindex header. DNS remains unchanged.

## Deep cleaning domain

`deep-redirects.mjs` is the byte-identical mapping from `miralitys/shynlideepcleaning/redirects.mjs`, version 2026-10-23.1. The apex and www domains use this Node service. `DEEP_REDIRECT_ENABLED=false` disables the handler. The reserved `shynlicom.onrender.com/__deep_redirect/` prefix supports origin verification. Rollback uses the preserved deep Static Site `srv-d811p1nlk1mc73a1lh50`: restore both domain bindings, verify TLS and remove its retained-origin noindex header. Keep DNS unchanged.

## Move-out cleaning domain

`moveout-redirects.mjs` is the byte-identical mapping from `miralitys/shynlimoveoutcleaning/redirects.mjs`, version 2026-10-23.1. The apex and www domains use this Node service. `MOVEOUT_REDIRECT_ENABLED=false` disables the handler. The reserved `shynlicom.onrender.com/__moveout_redirect/` prefix supports origin verification. Rollback uses retained Static Site `srv-d810a6vaqgkc73ahfkd0`: restore both bindings, verify TLS, remove its noindex header and retain the empty build command and committed dist directory. Keep DNS unchanged.
