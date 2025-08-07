---
title: "WAHA 2025.6 - Security in WAHA Core, Message Edit Event, and Media Conversion"
description: "Enhanced security, message edit tracking, and simplified media conversion in WAHA 2025.6"
excerpt: "Secure API keys, message edit events, and built-in media conversion without manual setup."
date: 2025-06-29T08:48:45+00:00
draft: false
images: ["waha-2025-6.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-2025-6
---

## 🆕 What's New?

### 🔒 Security in WAHA Core

**WAHA Core** now comes with robust, built-in security features!  
You can protect your API with an **API Key** - and now, for even greater security, you can store only the hash of your key using `WAHA_API_KEY=sha512:{HASH}`.  
This means your API key is never stored in plain text, reducing the risk if your environment variables are exposed.

[**🔒 Security →**]({{< relref "/docs/how-to/security" >}})

### ✏️ Message Edit Event

You can now track when a message is edited!  
The new [`message.edited`]({{< relref "/docs/how-to/events#messageedited" >}}) event is available in **WEBJS**, **GOWS**, and **NOWEB** engines.

- **NOWEB note**: Edited protocol messages are now only available via `message.edited` (not in `message` or `message.any`).

### 🖼️ Media Conversion for WAHA Plus (Voice/Video)

Sending voice or video files just got easier!

**WAHA Plus** now supports **built-in media conversion** - no more manual `ffmpeg` setup required.

- **Voice**: Send any audio file, set `"convert": true`, and WAHA will convert it to WhatsApp’s required OPUS/OGG format.
- **Video**: Send any video file, set `"convert": true`, and WAHA will convert it to WhatsApp’s required MP4 format.
- **APIs**:
  - [**POST /api/{session}/media/convert/voice**]({{< relref "/docs/how-to/send-messages#media---convert-voice" >}})
  - [**POST /api/{session}/media/convert/video**]({{< relref "/docs/how-to/send-messages#media---convert-video" >}})

## 🆕 Changelog

Check out the full list of updates in the [**🆕 WAHA 2025.6 Changelog**]({{< relref "/docs/overview/changelog#20256" >}}) and stay tuned for more!
