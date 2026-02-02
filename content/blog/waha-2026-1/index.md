---
title: "WAHA 2026.1 - Per-Session API Keys, GOWS Storage Toggle"
description: "Per-session API keys, optional storage for GOWS, and ChatWoot improvements ship in WAHA 2026.1."
excerpt: "Per-session API keys, optional GOWS storage, and ChatWoot workflow improvements in WAHA 2026.1."
date: 2026-01-31T08:48:45+00:00
draft: false
images: [ "waha-2026-1.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-1
---

## 🔐 Per-Session API Keys
You can now scope API keys to specific sessions instead of the whole server. This helps isolate tenants, rotate access, and keep automation scoped to the right WhatsApp session.

Configure and manage keys in [**📊 Dashboard - API Keys**]({{< relref "/docs/how-to/dashboard#api-keys" >}}) and review the security notes in [**🔒 Security - Keys API**]({{< relref "/docs/how-to/security#keys-api" >}}).

<div class="text-center">

![](waha-dashboard-api-keys.png)

</div>

## 🧰 GOWS Storage Toggle
The **GOWS** engine can now run with storage disabled. This is useful for lighter, more ephemeral setups where you want the engine to stay stateless.

<div class="text-center">

![](session-config-gows.png)

</div>

## 💬 ChatWoot Improvements
ChatWoot now uses the chat id from incoming messages to support `@lid` and `@c.us`, adds a configurable delay, and improves mention handling in group messages.

If you’re using ChatWoot, check the setup details in [**🧩 ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}).

## 🛠️ Other Fixes
WEBJS stability and chat handling were refined, GOWS event noise was reduced, and NOWEB proxy media delivery was corrected.

Read the full list with issue links in the [**🆕 WAHA 2026.1 Changelog**]({{< relref "/docs/overview/changelog#20261" >}}).
