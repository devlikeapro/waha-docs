---
title: "WAHA 2026.3 - WPP Engine, LID Merge Control, GOWS & NOWEB Upgrades"
description: "A new WPP engine, per-engine @lid/@c.us merge control, GOWS image sizes and device sync depth, NOWEB view-once messages, storage namespaces, and a new contacts endpoint."
excerpt: "WAHA 2026.3 ships a new WPP engine, LID merge control for NOWEB and GOWS, image sizes, view-once messages, storage namespaces, and more."
date: 2026-03-31T00:00:00+00:00
draft: false
images: [ "waha-2026-3.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-3
---

## ⚡ New Engine: WPP

**WPP** is a new browser-based engine powered by [wppconnect](https://github.com/wppconnect-team/wppconnect). It runs WhatsApp Web in a Puppeteer browser — same approach as **WEBJS**, different underlying library. `forwardMessages` is supported from the start.

```bash
WHATSAPP_DEFAULT_ENGINE=WPP
```

Check the [**WPP engine docs**]({{< relref "/docs/engines/wpp" >}}) for details.
- Issue: [#101](https://github.com/devlikeapro/waha/issues/101)

## 🔀 LID / @c.us Merge Control (**NOWEB** + **GOWS**)

WhatsApp uses two ID formats for the same contact: `@lid` (newer) and `@c.us` (phone-number-based). WAHA merges them by default so they appear as a single thread. That's still the default, but now you can turn it off with a `merge` flag in session config.

- **NOWEB** — controls merging in `/overview` and `/messages`.
  - Issues: [#1444](https://github.com/devlikeapro/waha/issues/1444), [#1419](https://github.com/devlikeapro/waha/issues/1419), [#1683](https://github.com/devlikeapro/waha/issues/1683), [#1432](https://github.com/devlikeapro/waha/issues/1432)
- **GOWS** — same, for `/messages`, `/overview`, and `/chats`.
  - Issues: [#1684](https://github.com/devlikeapro/waha/issues/1684), [#1817](https://github.com/devlikeapro/waha/issues/1817), [#1910](https://github.com/devlikeapro/waha/issues/1910)

This also covers the underlying merge fixes — duplicate chats, missing messages, wrong `@lid`↔`@c.us` mapping that piled up since `@lid` was introduced.

## 📦 GOWS

A few additions for **GOWS** this release:

- Image messages now include `width` and `height`.
  - Issues: [#1402](https://github.com/devlikeapro/waha/issues/1402), [#901](https://github.com/devlikeapro/waha/issues/901)
- `WAHA_GOWS_DEVICE_*` env variables to control how far back historical messages sync on first connect.
  - Issue: [#1963](https://github.com/devlikeapro/waha/issues/1963)
- `sendContactVcard` now includes `displayName` in the payload.
  - Issue: [#1978](https://github.com/devlikeapro/waha/issues/1978)
- CPU spikes in PostgreSQL storage — fixed.
  - Issue: [#1955](https://github.com/devlikeapro/waha/issues/1955)

## 👁️ NOWEB

**NOWEB** picks up a couple of additions in message handling:

- View-once messages now appear in the `message` event.
  - Issue: [#1972](https://github.com/devlikeapro/waha/issues/1972)
- Image size (`width`/`height`) is included when sending to a newsletter.
  - Issue: [#1980](https://github.com/devlikeapro/waha/issues/1980)
- CPU spikes from the `@lid`/`@c.us` merge path — fixed.
  - Issue: [#1955](https://github.com/devlikeapro/waha/issues/1955)

## 🗄️ Storage Namespaces

Two new env variables for storage path isolation:

- `WAHA_NAMESPACE` — top-level prefix applied to all storage in this instance.
- `WAHA_SESSION_NAMESPACE` — per-session path override.

Useful when multiple WAHA instances share the same storage backend (S3, mounted volume, etc.) and you need their data kept separate. See [**🗄️ Storages – Namespace**]({{< relref "/docs/how-to/storages#namespace" >}}).

## 🔍 New API: GET /api/{session}/contacts/{id}

Fetch a single contact by ID without pulling the full list:

```http request
GET /api/{session}/contacts/{id}
```

## 🧩 Apps: No Queue Required

Apps are now enabled by default and can run in-memory — no Redis or other queue needed. If you have a queue configured, nothing changes on your end.

## 🧩 ChatWoot

- Message sync now targets only the `@c.us` chat when both `@lid` and `@c.us` are present — stops duplicate conversations from appearing.
- Group participant is now mapped to the message, so replies in group chats correctly attribute the sender.

## 📊 Dashboard

Chat UI got some layout and rendering cleanup.

## 🛠️ Other Fixes

**WEBJS**
- QR Code generation failure in some environments.
  - Issues: [#1923](https://github.com/devlikeapro/waha/issues/1923), [#1918](https://github.com/devlikeapro/waha/issues/1918)
- Profile picture endpoint and channels list broken.
  - Issues: [#1707](https://github.com/devlikeapro/waha/issues/1707), [#1947](https://github.com/devlikeapro/waha/issues/1947), [#1959](https://github.com/devlikeapro/waha/issues/1959)
- Apps endpoints (`GET`/`PUT`/`DELETE`) returning 403.
  - Issue: [#1926](https://github.com/devlikeapro/waha/issues/1926)
- Stale browser processes on restart — now cleaned up, Singleton removed.

**NOWEB**
- Out-of-order messages and timestamp-based sorting.
  - Issues: [#1912](https://github.com/devlikeapro/waha/issues/1912), [#1712](https://github.com/devlikeapro/waha/issues/1712)

**Other**
- Brazilian landline number normalization.
  - Issue: [#1974](https://github.com/devlikeapro/waha/issues/1974)
- Send media crash: `user_agents_1.default is not a constructor`.
  - Issue: [#1946](https://github.com/devlikeapro/waha/issues/1946)
- `yarn` now supports all CPU/OS architectures.
  - Issue: [#1952](https://github.com/devlikeapro/waha/issues/1952)
- Auth middleware no-auth case.
  - Issue: [#1939](https://github.com/devlikeapro/waha/issues/1939)

## ⚙️ Full Changelog
All versions, issue links, and engine bumps are in the [**🆕 WAHA 2026.3 Changelog**]({{< relref "/docs/overview/changelog#20263" >}}).
