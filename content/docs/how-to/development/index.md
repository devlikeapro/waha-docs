---
title: "🛠️ Development"
description: "How to clone, build and run WAHA and its engines locally"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 800
images: ["cover.png"]
slug: development
---

This page is for developers who want to **change WAHA itself** - fix a bug in an engine, add an API endpoint,
tweak the dashboard or the docs.

If you just want to **use** WAHA - go to [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) instead.

## How to start

Clone everything into a single `devlikeapro` folder, keeping the folder names exactly as below - scripts depend on them.

```bash
mkdir -p ~/devlikeapro && cd ~/devlikeapro

# WAHA, dashboard, docs
git clone https://github.com/devlikeapro/waha.git
git clone https://github.com/devlikeapro/waha-hub.git
git clone https://github.com/devlikeapro/waha-docs.git

# Engines
git clone https://github.com/devlikeapro/whatsapp-web.js.git webjs
git clone https://github.com/devlikeapro/Baileys.git noweb
git clone https://github.com/devlikeapro/gows-plus.git gows
git clone https://github.com/devlikeapro/whatsmeow.git
git clone https://github.com/wppconnect-team/wppconnect.git wpp
git clone https://github.com/wppconnect-team/wa-js.git
```

{{< callout context="caution" title="Folder names matter" icon="outline/alert-triangle" >}}
The folder names are not cosmetic - the build scripts reach across repositories by relative path,
for example WAHA's `Makefile` builds **GOWS** from `../gows`.
{{< /callout >}}

Install dependencies:

```bash
cd ~/devlikeapro/waha
yarn install
```

Set the environment and start it:

```bash
export DEBUG=1
export WAHA_DEBUG_MODE=True
export WAHA_API_KEY=666
export WAHA_DASHBOARD_USERNAME=admin
export WAHA_DASHBOARD_PASSWORD=666
export WHATSAPP_SWAGGER_USERNAME=admin
export WHATSAPP_SWAGGER_PASSWORD=666
export WHATSAPP_DEFAULT_ENGINE=NOWEB   # WEBJS | NOWEB | WPP | GOWS
export WAHA_HTTP_STRICT_MODE=1
export WAHA_MEDIA_STORAGE=LOCAL
export WHATSAPP_FILES_FOLDER=./.media

yarn start
```

Then open:

- Dashboard - <http://localhost:3000/dashboard>
- Swagger - <http://localhost:3000/>

To build the Docker images instead:

```bash
make build          # devlikeapro/waha
make build-chrome   # image with Chrome instead of Chromium
make build-noweb    # browserless image, NOWEB default
make build-gows     # browserless image, GOWS default
```

## Overview

WAHA is not a single repository. It's a NestJS application that drives four WhatsApp engines,
and each engine is a separate library maintained (or forked) in its own repository.

```text
waha                       - REST API, webhooks, sessions, storages, dashboard hosting
├── WEBJS  -> whatsapp-web.js         (Node.js, Puppeteer)
├── NOWEB  -> Baileys                 (Node.js, WebSocket)
├── GOWS   -> gows + whatsmeow        (Go, WebSocket, talks to WAHA over gRPC)
└── WPP    -> wppconnect + wa-js      (Node.js, Puppeteer)
```

Almost every build script uses **relative paths** between these repositories
(`../gows`, `../whatsmeow`, `../waha`), so all of them must be cloned side by side.

| Project | Repository | Folder | Note |
|---|---|---|---|
| **WAHA** | [devlikeapro/waha](https://github.com/devlikeapro/waha) | `waha` | The WAHA application - NestJS. REST API, WebSockets, webhooks, session management, security, storages, engine orchestration. |
| **Dashboard** | [devlikeapro/waha-hub](https://github.com/devlikeapro/waha-hub) | `waha-hub` | Dashboard UI (`waha-hub/ui`, Nuxt) that talks to the WAHA API. Built output is shipped inside the WAHA image. |
| **Dashboard** | [devlikeapro/dashboard](https://github.com/devlikeapro/dashboard) | - | Build artifact of the dashboard. WAHA's `Dockerfile` downloads it by the pinned SHA from `waha.config.json`. You don't clone this one. |
| **Docs** | [devlikeapro/waha-docs](https://github.com/devlikeapro/waha-docs) | `waha-docs` | This documentation site - Hugo. |
| **WEBJS** | [devlikeapro/whatsapp-web.js](https://github.com/devlikeapro/whatsapp-web.js) | `webjs` | Automates WhatsApp Web in a real browser via Puppeteer. Our fork of [pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js). |
| **NOWEB** | [devlikeapro/Baileys](https://github.com/devlikeapro/Baileys) | `noweb` | Speaks the WhatsApp Web protocol directly over a WebSocket, no browser. Our fork of [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys). |
| **GOWS** | [devlikeapro/gows-plus](https://github.com/devlikeapro/gows-plus) | `gows` | Go service that wraps `whatsmeow` and exposes it to WAHA over gRPC on a unix socket. Compiled binary is shipped inside the WAHA image. Ours. |
| **GOWS** | [devlikeapro/whatsmeow](https://github.com/devlikeapro/whatsmeow) | `whatsmeow` | The Go WhatsApp Web library **GOWS** is built on. Wired in via a `replace` directive in `gows/src/go.mod`. Our fork of [tulir/whatsmeow](https://github.com/tulir/whatsmeow). |
| **WPP** | [wppconnect-team/wppconnect](https://github.com/wppconnect-team/wppconnect) | `wpp` | Puppeteer-based engine. Not forked - used straight from upstream. |
| **WPP** | [wppconnect-team/wa-js](https://github.com/wppconnect-team/wa-js) | `wa-js` | The library **WPP** injects into the WhatsApp Web page. Not forked - used straight from upstream. |

WAHA consumes the Node.js engines straight from GitHub - there is no npm release step for the forks.
From `waha/package.json`:

```jsonc { title="package.json" }
{
  "@adiwajshing/baileys": "github:devlikeapro/Baileys#fork-master-2026-04-28",
  "whatsapp-web.js": "github:devlikeapro/whatsapp-web.js#fork-main-2026-06-26",
  "@wppconnect-team/wppconnect": "github:wppconnect-team/wppconnect#master",
  "@wppconnect/wa-js": "github:wppconnect-team/wa-js#main"
}
```

The **GOWS** binary and the dashboard are pinned by version/SHA instead:

```jsonc { title="waha.config.json" }
{
  "waha": {
    "gows": { "repo": "devlikeapro/gows-plus", "ref": "v1.0.43" },
    "dashboard": { "repo": "devlikeapro/dashboard", "ref": "5908178..." }
  }
}
```

### Fork branches

Our forks never commit to `main`/`master`. We rebase onto upstream and keep a dated fork branch,
which is exactly the branch referenced in `package.json`:

| Engine | Upstream branch | Our fork branch |
|---|---|---|
| **WEBJS** | `main` | `fork-main-<YYYY-MM-DD>` |
| **NOWEB** | `master` | `fork-master-<YYYY-MM-DD>` |
| **GOWS** | `main` | `fork-main-<YYYY-MM-DD>` (`whatsmeow`) |

When we pull upstream changes, we create a **new** dated branch and bump the reference in `package.json`
(or in `gows/src/go.mod` for `whatsmeow`).

In the forks, add the upstream as a second remote and check out the branch WAHA actually uses:

```bash
cd ~/devlikeapro/noweb
git remote add upstream https://github.com/WhiskeySockets/Baileys.git
git checkout fork-master-2026-04-28   # see package.json for the current branch
```

## Update

The pattern is the same for every Node.js engine: **point WAHA at your local checkout**, iterate,
then push the branch to the fork and bump the reference in `package.json`.

`yarn link` writes a `resolutions` entry into `package.json` - revert it before committing.

### WEBJS

```bash
cd ~/devlikeapro/waha
yarn link ../webjs
WHATSAPP_DEFAULT_ENGINE=WEBJS yarn start
```

Plain JavaScript, no build step. Restart WAHA to pick up changes.

When you're done - push your branch to the fork and update the reference:

```bash
make up-webjs   # yarn up whatsapp-web.js@github:devlikeapro/whatsapp-web.js#fork-main-<date>
```

Edit the branch name inside the `Makefile` target when you cut a new fork branch.

### NOWEB

**NOWEB** is TypeScript and must be built before WAHA can use it:

```bash
cd ~/devlikeapro/noweb
yarn install && yarn build   # emits lib/

cd ~/devlikeapro/waha
yarn link ../noweb
WHATSAPP_DEFAULT_ENGINE=NOWEB yarn start
```

It's ESM-only - WAHA loads it through the bridge in `src/vendor/esm.ts`.

To update the pinned fork: `make up-noweb`.

### GOWS

**GOWS** is a Go binary that WAHA spawns and talks to over gRPC on a unix socket.
Build it from the WAHA folder:

```bash
cd ~/devlikeapro/waha
make gows   # runs `make all` in ../gows -> ../gows/bin/gows
```

Then point WAHA at the binary you just built:

```bash
export WAHA_GOWS_PATH=../gows/bin/gows
export WAHA_GOWS_SOCKET=/tmp/gows.sock
WHATSAPP_DEFAULT_ENGINE=GOWS yarn start
```

To work on `whatsmeow` itself, replace the fork with your local checkout:

```bash
cd ~/devlikeapro/gows/src
go mod edit -replace go.mau.fi/whatsmeow=../../whatsmeow
```

Revert that before committing - the committed `go.mod` must point at the `devlikeapro/whatsmeow` fork.

If you change the gRPC contract in `gows/proto/*.proto`, regenerate both sides:

```bash
cd ~/devlikeapro/waha
make gows         # regenerates Go stubs (make build-proto in ../gows)
make proto-gows   # regenerates TypeScript stubs from ../gows/proto
```

### WPP

```bash
cd ~/devlikeapro/wa-js
npm install && npm run build:prd

cd ~/devlikeapro/waha
yarn link ../wa-js
WHATSAPP_DEFAULT_ENGINE=WPP yarn start
```

**WPP** is not forked, so changes here belong upstream in
[wppconnect-team](https://github.com/wppconnect-team). To pull the latest upstream: `make up-wpp`.

### Dashboard

The dashboard lives in `waha-hub/ui` (Nuxt). Run it against a locally running WAHA:

```bash
cd ~/devlikeapro/waha-hub/ui
yarn install
yarn dev-3001     # http://localhost:3001
```

There's also `yarn dev`, but it serves on `:3000` - the port WAHA itself already runs on -
so in practice we always use `yarn dev-3001` and keep WAHA on `:3000`.

To serve your build from WAHA itself:

```bash
cd ~/devlikeapro/waha-hub/ui
make dev          # build + copy into the WAHA dashboard folders
```

Shipped images don't build the UI - they download the pinned artifact from `devlikeapro/dashboard`.
Bump it with `make up-dashboard` in the WAHA folder, which resolves the latest `gh-pages` SHA into `waha.config.json`.

### Docs

```bash
cd ~/devlikeapro/waha-docs
npm install
npm run dev       # http://localhost:1313
```

Pages live under `content/docs/`. Each page is a folder with `index.md` and its images;
`weight` in the front matter controls the order in the sidebar.

## Contribution

Start by **reproducing the problem against a locally running WAHA** and noting **which engine** is affected -
the same symptom often has a different cause in **WEBJS** than in **NOWEB**.

Fix it **in the engine repository** if it's engine behaviour, and **in `waha`** if it's API behaviour -
sessions, webhooks, storages, and everything the REST API exposes. Then `yarn link` your engine checkout
and **verify the fix end to end through the WAHA API**, not only in the library itself.

Open a **pull request to the engine fork first**, then a **second pull request to WAHA** that bumps the
reference in `package.json` (or `waha.config.json` for **GOWS** and the dashboard). Finally, add a
**changelog entry**, and when the behaviour is visible to users - **update these docs** in the same change.
