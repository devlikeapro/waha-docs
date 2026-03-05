---
title: "WAHA 2026.2 - Fixes Pack"
description: "A fixes-focused release with Channels/media repairs, WEBJS LID and groups fixes, API hardening, and ChatWoot cleanup."
excerpt: "WAHA 2026.2 focuses on bug fixes across WEBJS, NOWEB, GOWS, API, ChatWoot, and Dashboard."
date: 2026-02-28T00:00:00+00:00
draft: false
images: [ "waha-2026-2.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-2
---

## 🛠️ Channels and Media Fixes (**NOWEB** + **GOWS**)
This release is mainly about getting existing flows more reliable, especially around Channels and media editing.

- **NOWEB** now supports editing text in Channels, editing media captions, sending image templates correctly, and sending to community groups.
  - Issues: [#1352](https://github.com/devlikeapro/waha/issues/1352), [#1374](https://github.com/devlikeapro/waha/issues/1374), [#1886](https://github.com/devlikeapro/waha/issues/1886), [#1901](https://github.com/devlikeapro/waha/issues/1901)
- **NOWEB** and **GOWS** now include seconds for video messages.
  - Issue: [#1893](https://github.com/devlikeapro/waha/issues/1893)
- **GOWS** also fixes media message editing.
  - Issue: [#1852](https://github.com/devlikeapro/waha/issues/1852)

## 💬 **WEBJS** LID and Groups Repairs
`2026.2` also addresses multiple **WEBJS** issues around LID handling and groups behavior.

- Fixed "LID is missing in chat table" and "No LID for user" cases.
  - Issues: [#1824](https://github.com/devlikeapro/waha/issues/1824), [#1881](https://github.com/devlikeapro/waha/issues/1881)
- Fixed internal errors for groups endpoints (`GET groups`, groups count, and related failures).
  - Issues: [#1860](https://github.com/devlikeapro/waha/issues/1860), [#1879](https://github.com/devlikeapro/waha/issues/1879), [#1873](https://github.com/devlikeapro/waha/issues/1873)
- Fixed sending messages to channels and contact update handling.
  - Issues: [#1863](https://github.com/devlikeapro/waha/issues/1863), [#1839](https://github.com/devlikeapro/waha/issues/1839)

## 🔒 API and Security Fixes
API safeguards were tightened in this cycle.

- Hardened auth middleware, WebSocket guard, and policies guard.
  - Issue: [#1899](https://github.com/devlikeapro/waha/issues/1899)
- Added `chatId` parameter support to `POST /api/{session}/presence`.
  - Issue: [#1842](https://github.com/devlikeapro/waha/issues/1842)

## 🧩 ChatWoot and Dashboard Fixes
- ChatWoot now strips escaped newlines from `v4.10.1+` webhooks so WhatsApp messages render cleanly.
  - Issue: [#1833](https://github.com/devlikeapro/waha/issues/1833)
- Dashboard fixed app creation failure (`crypto.randomUUID is undefined`).

## ⚙️ Engine Updates + Full List
Alongside fixes, this release includes engine updates for **NOWEB**, **GOWS**, and **WEBJS**.

For every change and issue link, open the [**🆕 WAHA 2026.2 Changelog**]({{< relref "/docs/overview/changelog#20262" >}}).
