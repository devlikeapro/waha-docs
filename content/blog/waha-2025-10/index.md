---
title: "WAHA 2025.10 - ChatWoot Pull Commands, Secure Defaults"
description: "ChatWoot history and contact pulls, stronger security defaults, and stability upgrades across WAHA 2025.10."
excerpt: "ChatWoot contact + message pull commands, enforced API credentials, and engine improvements headline WAHA 2025.10."
date: 2025-10-31T08:48:45+00:00
draft: false
images: [ "waha-2025-10.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2025-10
---

## 💬 ChatWoot – Messages Sync
Need old conversations inside ChatWoot? Run `wa/messages pull` to replay WhatsApp chat history, pick the time range, fetch media, and even close conversations during the import. Every switch is explained in the [**💬 ChatWoot – Messages Guide**]({{< relref "/blog/apps-chatwoot-5-messages" >}}).

The dashboard watches each job, keeps rate limits safe, and skips duplicates so long imports do not crash your inbox.

## 👤 ChatWoot – Contacts Sync
`wa/contacts pull` keeps the ChatWoot contact list matched with WhatsApp. It copies names, numbers, avatars, groups, and LIDs, so agents always see the latest profile. Learn how to schedule the sync in the [**👤 ChatWoot – Contacts Guide**]({{< relref "/blog/apps-chatwoot-6-contacts" >}}).

## 🔐 Secure Defaults
Release `2025.10.3` now protects every fresh install. WAHA auto-generates `WAHA_API_KEY`, `WAHA_DASHBOARD_PASSWORD`, and `WHATSAPP_SWAGGER_PASSWORD` when you leave them empty, and it blocks weak passwords such as `0000`, `123`, `admin`, or `waha`. If your setup truly needs to switch any guard off, follow the checklist in [**🔒 Security**]({{< relref "/docs/how-to/security/#how-to-disable-security" >}}).

## 🛠️ Other Fixes
- Voice conversions now work every time (`ffmpeg` goes back to mp3 and WEBJS handles `convert: true`), and channels can receive media again.
- Message reactions, list messages, edited events, and `{device}@lid` group IDs behave the same across engines.
- Sending images through a proxy, loading media over SSL, opening `/about`, and paginating `/messages` all work again after bug fixes.

## 📚 Full Changelog
Open the [**🆕 WAHA 2025.10 Changelog**]({{< relref "/docs/overview/changelog#202510" >}}) to read the full list with issue links and engine notes.
