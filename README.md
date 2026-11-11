# Ask Anoop Tej

A place to ask Anoop about any topic. This portal is its own site.

Public URL: https://anooptejt.github.io/askanooptejthotapalli/

## What is here

- Career, Library, and Interview sections ready for Anoop’s original articles
- Open source projects with a realistic first contribution
- An Ask me page that sends questions through n8n to Telegram, with personal replies shown in the browser

No articles are currently published in Career, Library, or Interview. The placeholder articles, their individual routes, homepage previews, and matching rules have been removed. Add original content and its article routes when ready to publish.

The website is static. Messaging uses a separate, temporary HTTPS gateway connected to the local n8n Human Relay. Questions and replies are stored in the relay and the visitor’s browser. LinkedIn remains available when messaging is offline. See [gateway operation and limits](gateway/README.md).

## Run locally

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:38471/askanooptejthotapalli/.

## Verify and preview the production website

```bash
npm test
npm start
```

Open http://127.0.0.1:38471/askanooptejthotapalli/.

`npm test` runs ESLint, gateway HTTP tests, builds all static pages, and checks every exported local link and asset. `npm start` serves the actual `out/` files under the same path used in production. Stop the development server before starting the production preview; both use port 38471.

## GitHub Pages publishing

This repository publishes its static export through `.github/workflows/deploy-pages.yml`. The public path remains `/askanooptejthotapalli/`. Enable Pages only after the engineering site stops publishing this path.

The URL prefix is defined in `src/lib/site.ts`; Next.js applies it to navigation and scripts, and the profile image uses the same prefix. Keep the prefix aligned with the publishing folder. Trailing slashes allow direct visits and refreshes on GitHub Pages. Image optimization is disabled because Pages has no image server.

Edit guides in `src/content/`, identity and contact links in `src/lib/profile.ts`, and the homepage in `src/app/page.tsx`. Commit content changes to this repository to publish them through its Pages workflow.

## Messaging

The standalone server in `gateway/` keeps the n8n key private and supplies server-generated visitor identities. `public/relay-config.json` contains only its public HTTPS address. Use `npm run relay:status`, `npm run relay:start`, and `npm run relay:stop` on the configured Mac. A fresh tunnel start requires publishing its new address. Read [gateway/README.md](gateway/README.md) for operation and recovery.

The active Telegram workflows and their Docker data are maintained separately.
