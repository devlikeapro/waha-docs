---
title: "WAHA 2024.10"
description: "WAHA 2024.10 - WAHA Core - Receive Media, n8n Low Code Integration, TypeBot Integration, ChatWoot Integration, Workflow Templates, Stability fixes"
excerpt: "WAHA 2024.10 - WAHA Core - Receive Media, n8n Low Code Integration, TypeBot Integration, ChatWoot Integration, Workflow Templates, Stability fixes"
date: 2024-09-30T08:48:45+00:00
draft: false
weight: 50
images: ["WAHA 2024.10.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-2024-10
---

🎉 We are thrilled to announce the release of [**WAHA 2024.10**]({{< relref "/docs/overview/changelog#202410" >}}) 🎉 

## WAHA Core - Receive Media

We published [**📥 Receive messages** ]({{<relref "/docs/how-to/receive-messages#files" >}})
in free **WAHA Core** version, so you can receive media files in your WhatsApp API for free!

We'll continue to publish features from 
[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) 
to WAHA Core, so you can use them for free!

```json
{
  "event": "message",
  "session": "default",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "timestamp": 1667561485,
    "body": "Check this out (caption for the media)!",
    "from": "11111111111@c.us",
    "hasMedia": true,
    "media": {
      "url": "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg",
      "mimetype": "image/jpeg",
      "filename": null
    }
  }
}
```

## n8n Low Code Integration

<p align="center">
  <img src="/images/n8n/WAHA+n8n.png" width='200'/>
</p>

Meat the new **WAHA** integration with **n8n**!

You can build your WhatsApp automation with using n8n and WAHA in pair!

For that we've built [@devlikeapro/n8n-nodes-waha](https://github.com/devlikeapro/n8n-nodes-waha/)
directly from our [Swagger](/swagger) specification, so all available API calls are available in n8n.

Install it on your n8n instance and start building your first workflow:
```
@devlikeapro/n8n-nodes-waha
```

Read more about 
[**🧩 n8n Integration**]({{< relref "/docs/integrations/n8n" >}})

### TypeBot Integration
<p align="center">
  <img src="/images/typebot/waha+typebot.png" width='200'/>
</p>

Using the n8n workflow you can integrate **TypeBot** with **WAHA**!

👉 Checkout out [**🧩 TypeBot Integration**]({{< relref "/docs/integrations/typebot" >}})

### ChatWoot Integration
<p align="center">
  <img src="/images/chatwoot/waha-chatwoot.png" width='200'/>
</p>

Using the n8n workflow you can integrate **ChatWoot** with **WAHA**!

👉 Checkout out [**🧩 ChatWoot Integration**]({{< relref "/docs/integrations/chatwoot" >}})

### Workflow Templates
👉 Check out
[**https://waha-n8n-workflows.devlike.pro**](http://waha-n8n-templates.devlike.pro/)
for workflow templates!

{{< img src="/images/n8n/waha-n8n.png" >}}


## Stability fixes
We're working on internal things to stabilize the product, to avoid any issues with the API.

Check the full [**🆕 Changelog**]({{< relref "/docs/overview/changelog#202410" >}})
for more details!
