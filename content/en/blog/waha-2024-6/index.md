---
title: "WAHA 2024.6 - NOWEB Store, Dashboard for Core, HTTPS"
description: "Introducing NOWEB store for contacts, chats, and messages, Dashboard available in Core version, and built-in HTTPS support!"
excerpt: "Introducing NOWEB store for contacts, chats, and messages, Dashboard available in Core version, and built-in HTTPS support!"
date: 2024-06-30T08:48:45+00:00
draft: false
weight: 50
images: ["WAHA 2024.6.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
---

🎉 We are thrilled to announce the release of [**WAHA 2024.6**]({{< relref "/docs/overview/changelog" >}}) 🎉 

Here's the list of main changes we've made:

## NOWEB Store

You asked it, we did it - **contacts, chats, and messages** endpoints are now available in NOWEB engine! 
- [`GET /api/contacts/all`]({{< relref "/docs/how-to/contacts#get-all-contacts" >}})
- [`GET /api/{session}/chats`]({{< relref "/docs/how-to/chats#get-all-chats" >}})
- [`GET /api/{session}/chats/{chatId}/messages`]({{< relref "/docs/how-to/chats#get-messages-from-chat" >}})

👉 Please make sure to [**🏭 Enable NOWEB Store before using these endpoints**]({{< relref "/docs/engines/NOWEB#store" >}})!


## Dashboard now available in WAHA Core
[📊 WAHA Dashboard]({{< relref "/docs/how-to/waha-dashboard" >}})
a web interface to easily manage your WhatsApp sessions now is available in Free WAHA Core version!

<video autoplay loop muted playsinline controls='noremoteplayback' width='100%' poster='/images/waha-dashboard.png'>
<source src='/videos/waha-dashboard-overview.webm' type='video/webm' />
Download the <a href='/videos/waha-dashboard-overview.webm'>Dashboard Overview video</a>
</video>

## Built-in HTTPS Support
WAHA supports [🔒 HTTPS out of the box now]({{< relref "/docs/how-to/security#https" >}})!

👉 Here's [**Step-by-step guide on how to set up HTTPS for WAHA**]({{< relref "/blog/waha-https" >}})
![](https_icon.png)

## And MORE!
Read the [**Full Changelog for 2024.6**]({{< relref "/docs/overview/changelog" >}}) to get all updates we've made 
in 2024.6 version!
