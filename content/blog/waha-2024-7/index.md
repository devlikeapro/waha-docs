---
title: "WAHA 2024.7 - WhatsApp Channels API, JSON logs"
description: "Introducing WAHA 2024.7 - WhatsApp Channels API, JSON logs"
excerpt: "Introducing WAHA 2024.7 - WhatsApp Channels API, JSON logs"
date: 2024-07-20T08:48:45+00:00
draft: false
images: ["WAHA 2024.7.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
---

🎉 We are thrilled to announce the release of [**WAHA 2024.7**]({{< relref "/docs/overview/changelog" >}}) 🎉

## WhatsApp Channels API

![alt](whatsapp-channels.png)

WAHA now supports [**WhatsApp Channels**]({{< relref "/whatsapp-channels" >}}) - a brand-new feature introduced by WhatsApp.
You can manage, read and send messages to **WhatsApp Channels** (aka Newsletters) via API.

👉 Read more about available features on [**📢 Channels**]({{< relref "/docs/how-to/channels" >}}) documentation page.

💡 If you're completely new with the project, we wrote a
[**Step-By-Step Guide on How to send a post to WhatsApp Channel via API**]({{< relref "/blog/how-to-send-messages-to-channels" >}})

## JSON logs

WAHA now supports JSON logs. You can enable it by setting `WAHA_LOG_FORMAT=JSON` environment variable.
`WAHA_LOG_FORMAT` - supports formats:

- `WAHA_LOG_FORMAT=PRETTY` - good for local development, **default** format
- `WAHA_LOG_FORMAT=JSON` - can be useful if you're using central logging management system

👉 Learn more about logging configuration on [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}}) page.
