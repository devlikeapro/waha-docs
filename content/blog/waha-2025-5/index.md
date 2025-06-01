---
title: "WAHA 2025.5 - Presence, Polls, Labels and More!"
description: "WAHA 2025.5 - Presence, Polls, Labels and More!"
excerpt: "WAHA 2025.5 - Presence, Polls, Labels and More!"
date: 2025-05-29T08:48:45+00:00
draft: false
weight: 50
images: [ "waha-2025-5.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2025-5
---

## 🆕 What's New?

### ✅ Presence (WEBJS)

In **WEBJS**, you can now use the
[**✅ Presence**]({{<relref "docs/how-to/presence" >}}) API and Events
to track your customers' online status!

### 📶 Polls (GOWS)

We've added [**📶 Polls**]({{< relref "docs/how-to/polls" >}}) support to **GOWS** -
including API to send polls and Events to receive poll answers!

### 🏷️ Labels (GOWS)

Added [**🏷️ Labels**]({{< relref "docs/how-to/labels" >}}) support in the **GOWS** engine.

### 👤 @lid to @c.us API

Introduced new
[**👤 Contacts - Lids API**]({{< relref "/docs/how-to/contacts/#api---lids" >}})
to convert `@lid` format to phone numbers (`@c.us`).

Available in all engines: **WEBJS**, **GOWS**, **NOWEB**!

### 💬  Filter Chats by IDs

You can now filter chats by `ids` in the 
[**💬 Chats - Get Chats Overview**]({{< relref "/docs/how-to/chats#get-chats-overview" >}}) API.

Available in all engines: **WEBJS**, **GOWS**, **NOWEB**!

## 🛠️ Key Fixes

- Fixed media fetching from S3/PostgreSQL
- Improved presence subscription handling
- Fixed pairing for Business Accounts connected to Meta API
- Added `tini` to Docker to handle zombie processes
- Fixed empty session name issues in Local Storage

---

## 🆕 Changelog
Check out the full list of updates in the
[**🆕 WAHA 2025.5 Changelog**]({{< relref "/docs/overview/changelog#20255" >}})
and stay tuned for more!
