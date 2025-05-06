---
title: "WAHA 2025.4 - Read Chat Messages, Group Acks, and Engines Stability!"
description: "WAHA 2025.4 - Mark messages as read, track receipts in groups, stability fixes and more!"
excerpt: "WAHA 2025.4 - Mark messages as read, track receipts in groups, stability fixes and more!"
date: 2025-04-29T08:48:45+00:00
draft: false
weight: 50
images: ["waha-2025-4.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-2025-4
---------------

We’re excited to introduce [**WAHA 2025.4**]({{< relref "/docs/overview/changelog#20254" >}}), packed with new API capabilities, group handling improvements, and crucial bug fixes across all engines!

---

## 🆕 What's New?

### ✅ Mark Messages as Read!

You can now use the brand new [**💬 Read Messages API**]({{< relref "/docs/how-to/chats/#read-messages" >}}) to mark unread messages as read!

Works across **WEBJS**, **NOWEB**, and **GOWS**!
[#783](https://github.com/devlikeapro/waha/issues/783)

---

### 📥 Group Receipts Tracking

**WEBJS** now includes:

* `message.ack` events for group & status messages
* `message._data.receipts` in [**Get Message by ID**]({{< relref "/docs/how-to/chats/#get-message-by-id" >}})

You can now **track delivery for each participant**!
[#495](https://github.com/devlikeapro/waha/issues/495), [#900](https://github.com/devlikeapro/waha/issues/900)

---

### 👁️‍🗨️ Bulk Read Support

Use `messageIds` in [**Send Seen API**]({{< relref "/docs/how-to/send-messages/#send-seen" >}}) to mark **multiple messages as read** in one request.
**NOWEB**, **GOWS**

---

### 🧰 Filter by Ack

New `filter.ack` option in [**Get Messages API**]({{< relref "/docs/how-to/chats/#get-messages" >}}) — filter messages based on delivery status.
**All engines**

### 🟢 Send Reaction to Channels

[**Send Reaction to Channels**]({{< relref "/docs/how-to/channels/#send-reaction-to-the-channel" >}}) is now fixed for **GOWS** and **NOWEB** engines.
[#889](https://github.com/devlikeapro/waha/issues/889)

### 🌐 Send Link Custom Preview

[**Send Link Custom Preview**]({{< relref "/docs/how-to/send-messages/#send-link-custom-preview" >}}) has been improved for **GOWS** and **NOWEB** engines.
[#880](https://github.com/devlikeapro/waha/issues/880), [#596](https://github.com/devlikeapro/waha/issues/596)

![Custom Link Preview](whatsapp-link-preview.png)

---

## 🛠️ Fixes & Stability

* **NOWEB**:

    * Fix for `protocolMessage` crash [#932](https://github.com/devlikeapro/waha/issues/932)
    * Message status updated on `/api/sendSeen` [#635](https://github.com/devlikeapro/waha/issues/635)
    * Correct `ack` for new messages (`DEVICE` instead of `UNKNOWN`)
    * Fix sending/receiving in **anonymous groups** and **status**
* **WEBJS**:

    * Auto-restart browser on `ProtocolError` & other errors
      [#244](https://github.com/devlikeapro/waha/issues/244), [#936](https://github.com/devlikeapro/waha/issues/936)
* **GOWS**:

    * Group `message.ack` now sent for **all participants**
    * Stability improvements for group/status messages
    * Fix sending reactions to other users' messages [#894](https://github.com/devlikeapro/waha/issues/894)

---

## ⚙️ Engine Updates

* Updated engines:

    * **NOWEB** - latest version
    * **GOWS** - latest version
    * **WEBJS** - updated **puppeteer** and **chrome** images

---

Check out the full list of updates in the [**🆕 WAHA 2025.4 Changelog**]({{< relref "/docs/overview/changelog#20254" >}}) and stay tuned for more!
