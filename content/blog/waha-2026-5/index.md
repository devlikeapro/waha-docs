---
title: "WAHA 2026.5 - the summer one"
description: "Not a lot of new stuff this month, mostly fixes. Summer, you know."
excerpt: "Lottie stickers as animated WebP for GOWS, status broadcast batch size control, and fixes across WEBJS, GOWS, and NOWEB."
date: 2026-06-17T00:00:00+00:00
draft: false
images: [ "waha-2026-5.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-5
---

This month's release is mostly fixes — a few things that were quietly broken and finally got the attention they deserved. Two small additions for **GOWS** snuck in too.

## 🎞️ Animated Stickers (GOWS)

Lottie stickers (`application/was`) now convert to animated WebP instead of arriving as a dead static frame. Took a while to get around to it, but here it is. — [#2039](https://github.com/devlikeapro/waha/issues/2039)

## 📢 Status Broadcast Batch Size (GOWS)

If you send status updates to a lot of contacts and were seeing timeouts, there's now an env var for that:

```bash
WAHA_GOWS_STATUS_PARTICIPANTS_BATCH_SIZE=500
```

Default is 500. Was higher before, which caused batch timeouts on bigger accounts. — [#2080](https://github.com/devlikeapro/waha/issues/2080)

## 🛠️ Fixes

**GOWS**
- Every outbound message returning 400 until you restart the session. — [#2084](https://github.com/devlikeapro/waha/issues/2084)
- Encrypted message edits not handled. — [#2062](https://github.com/devlikeapro/waha/issues/2062)
- MediaRetry only fired on 403, now fires on any ciphertext hash mismatch too. — [#2085](https://github.com/devlikeapro/waha/issues/2085)
- Sticker download was hitting a stale placeholder URL and failing silently.
- gif→mp4 conversion when sending video. — [#2077](https://github.com/devlikeapro/waha/issues/2077)

**WEBJS**
- Sessions getting stuck in `starting` / `stopped` with large RemoteAuth in PostgreSQL. Node.js Buffer limit. — [#2090](https://github.com/devlikeapro/waha/issues/2090)
- Symlinks in remote storages now ignored — **PLUS**.
- E2E session and disappearing messages settings broken. — [#2046](https://github.com/devlikeapro/waha/issues/2046)

**NOWEB**
- `message.edit` event wasn't firing. — [#2072](https://github.com/devlikeapro/waha/issues/2072)
- gif→mp4 conversion, same as GOWS. — [#2077](https://github.com/devlikeapro/waha/issues/2077)

**API**
- `POST /api/{session}/chats/overview` now requires pagination. Was silently hanging for accounts with many chats. — [#2070](https://github.com/devlikeapro/waha/issues/2070)

**📊 Dashboard**
- E2E and disappearing messages settings now show up in the UI. — [#2046](https://github.com/devlikeapro/waha/issues/2046)

## ⚙️ Full Changelog

[**🆕 WAHA 2026.5 Changelog**]({{< relref "/docs/overview/changelog#20265" >}})
