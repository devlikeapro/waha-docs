---
title: "WAHA 2025.11 - Auto Presence, Leaner GOWS"
description: "Presence auto-online, lighter memory use across engines, and fresh mention + groups controls in WAHA 2025.11."
excerpt: "Presence auto-online, GOWS memory fixes, mention-everyone support, and a long list of stability updates."
date: 2025-11-30T08:48:45+00:00
draft: false
images: [ "waha-2025-11.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2025-11
---

## ✅ Presence – Auto Online
Presence now sets you `online` when you do anything via the API, then returns to `offline` after a few seconds. Dashboards stay correct, and your phone still receives notifications.

See the options in the [**✅ Presence**]({{< relref "/docs/how-to/presence" >}}).

## 🧠 Lighter Engines
We fixed **memory leaks** in GOWS, reuse a single gRPC client per instance, and cap response sizes to keep RAM safe.

All engines run smoother because CPU profiling stays off in debug mode, and the Node.js 24.11 bump improves stability.

## 🗣️ Mentions and Groups
Mention everyone in groups with `mentions: ["all"]` for messages and media.

Group participant management is now at `/api/:session/groups/:id/participants/v2`, and **GOWS** adds full mention support.

## 🛠️ And Plenty of Fixes
Voice converter repairs, location/vcard events on **GOWS/NOWEB**, **WEBJS** pairing fixes, and many more small improvements this month.

Read the full list with issue links in the [**🆕 Changelog**]({{< relref "/docs/overview/changelog#202511" >}}).
