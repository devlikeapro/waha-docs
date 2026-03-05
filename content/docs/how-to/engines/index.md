---
title: "🏭 Engines"
description: "Under the hood WAHA allows you to use different engines."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 295
images: ["cover.png"]
slug: engines
---

## Engines

{{< include file="content/docs/how-to/engines/-what-is-engine.md" >}}

{{< include file="content/docs/how-to/engines/-engine-namespace.md" >}}

|                                                                  | WEBJS | WPP | GOWS | NOWEB |
|------------------------------------------------------------------|:-----:|:---:|:----:|:-----:|
| Run a **browser** (chromium\chrome) to communicate with WhatsApp |  ✔️   | ✔️  |      |       |
| Communicate with WhatsApp via **websocket (no browser)**         |       |     |  ✔️  |  ✔️   |

## Run Engine

Under the hood **WAHA** allows you to use different engines.

You can control what you want to run by settings `WHATSAPP_DEFAULT_ENGINE` environment variables.

```bash
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=WEBJS" devlikeapro/waha
```

All engines are available in both
Core  and
[Plus  versions]({{< relref "/docs/how-to/waha-plus" >}}).


### WEBJS

A WhatsApp API client that connects through the WhatsApp Web browser app.
It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.

```bash
WHATSAPP_DEFAULT_ENGINE=WEBJS
```

{{< link-card title="👉 Read more about WEBJS" href="/docs/engines/webjs/" >}}

### WPP

**WPP** engine to connect through the WhatsApp Web browser app.
It uses Puppeteer to run a real instance of WhatsApp Web to avoid getting blocked.

```bash
WHATSAPP_DEFAULT_ENGINE=WPP
```

{{< link-card title="👉 Read more about WPP" href="/docs/engines/wpp/" >}}

### GOWS

**GOWS** engine **does not require a browser** to work with WhatsApp Web, it does so directly using a WebSocket.

🚀 It's a new generation engine written in **Golang**, a future replacement for **NOWEB** engine.

```bash
WHATSAPP_DEFAULT_ENGINE=GOWS
```

{{< link-card title="👉 Read more about GOWS" href="/docs/engines/gows/" >}}

### NOWEB

**NOWEB** engine **does not require a browser** to work with WhatsApp Web, it does so directly using a WebSocket.
Not running Chromium saves you CPU and Memory, so you can run more instances on a single server!

```bash
WHATSAPP_DEFAULT_ENGINE=NOWEB
```

{{< link-card title="👉 Read more about NOWEB" href="/docs/engines/noweb/" >}}


## Docker images
WAHA provides few docker images with different setup.

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the latest version and your key.

| Image                                                    | CPU | Browser                 |
|----------------------------------------------------------|-----|-------------------------|
| [**WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) |     |                         |
| `devlikeapro/waha-plus:latest`                           | x86 | Chromium                |
| `devlikeapro/waha-plus:chrome`                           | x86 | Chrome (supports video) |
| `devlikeapro/waha-plus:noweb`                            | x86 | None                    |
| `devlikeapro/waha-plus:gows`                             | x86 | None                    |
| `devlikeapro/waha-plus:arm`                              | ARM | Chromium                |
| `-`                                                      | ARM | Chrome                  |
| `devlikeapro/waha-plus:noweb-arm`                        | ARM | None                    |
| **WAHA Core**                                            |     |                         |
| `devlikeapro/waha:latest`                                | x86 | Chromium                |
| `devlikeapro/waha:chrome`                                | x86 | Chrome                  |
| `devlikeapro/waha:noweb`                                 | x86 | None                    |
| `-`                                                      | ARM | Chrome                  |
| `devlikeapro/waha:arm`                                   | ARM | Chromium                |
| `devlikeapro/waha:noweb-arm`                             | ARM | None                    |


```bash
devlikeapro/{image}:{browser}[-cpu][-version]
```

`{image}`:
- `waha-plus` - [**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) image
- `waha` - **WAHA Core** image

`{browser}`:
- **Chromium** (`latest`) - is the default browser for **WAHA**. It's a good choice for most cases.
- **Chrome** (`chrome`) - is a good choice if you need to receive videos in Plus version.
- **None** (`noweb`) - is a good choice if you want to use **NOWEB** engine.

`{cpu}`:
- **x86** - is a good choice for most cases.
- **ARM** (`-arm`) - is a good choice if you're using ARM processors (like **Apple Silicon M1\M2**, **Raspberry Pi**, etc.)

`{version}`:
- **latest** - is the latest version of WAHA.
- **pinned** - you can pin WAHA version by adding `-{version}` at the end of image tag.

## Features

Some engines may not support certain features.
Here, you will find a list of supported endpoints and webhooks per engine.

|                       Symbol                       | Meaning                                                                           |
|:--------------------------------------------------:|-----------------------------------------------------------------------------------|
|                         ✔️                         | The engines supports the feature.                                                 |
| [#123](https://github.com/devlikeapro/waha/issues) | Feature request or bug for the endpoint                                           |
|                      | The feature available in [WAHA Plus]({{< relref "/docs/how-to/waha-plus" >}}). |

If you don't specify `WHATSAPP_DEFAULT_ENGINE` environment variable - look at **WEBJS** engine,
it's the engine WAHA runs by default.


### 🖥️ Sessions
Read more about
[**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}})

{{< include file="content/docs/how-to/sessions/features.md" >}}

{{< include file="content/docs/how-to/sessions/features-events.md" >}}

### 📤 Messages
Read more about
[**📤 Send Messages**]({{< relref "/docs/how-to/send-messages" >}})
and
[**📥 Receive Messages**]({{< relref "/docs/how-to/receive-messages" >}})

{{< include file="content/docs/how-to/send-messages/features.md" >}}

{{< include file="content/docs/how-to/receive-messages/features-events.md" >}}

### 🟢 Status
Read more about
[**🟢 Status**]({{< relref "/docs/how-to/status" >}})

{{< include file="content/docs/how-to/status/features.md" >}}

### 💬 Chats
Read more about
[**💬 Chats**]({{< relref "/docs/how-to/chats" >}})

{{< include file="content/docs/how-to/chats/features.md" >}}

{{< include file="content/docs/how-to/chats/features-events.md" >}}

### 👤 Contacts
Read more about
[**👤 Contacts**]({{< relref "/docs/how-to/contacts" >}})

{{< include file="content/docs/how-to/contacts/features.md" >}}

### 📢 Channels
Read more about
[**📢 Channels**]({{< relref "/docs/how-to/channels" >}})

{{< include file="content/docs/how-to/channels/features.md" >}}

### 👥 Groups
Read more about 
[**👥 Groups**]({{< relref "/docs/how-to/groups" >}})

{{< include file="content/docs/how-to/groups/features.md" >}}

{{< include file="content/docs/how-to/groups/features-events.md" >}}

### ✅ Presence
Read more about 
[**✅ Presence**]({{< relref "/docs/how-to/presence" >}})

{{< include file="content/docs/how-to/presence/features.md" >}}

{{< include file="content/docs/how-to/presence/features-events.md" >}}

### 🏷️ Labels
Read more about 
[**🏷️ Labels**]({{< relref "/docs/how-to/labels" >}})

{{< include file="content/docs/how-to/labels/features.md" >}}

{{< include file="content/docs/how-to/labels/features-events.md" >}}

### 📅 Event Message
Read more about
[**📅 Event Message**]({{< relref "/docs/how-to/event-message" >}})

{{< include file="content/docs/how-to/event-message/features.md" >}}

{{< include file="content/docs/how-to/event-message/features-events.md" >}}

### 📶 Polls
Read more about
[**📶 Polls**]({{< relref "/docs/how-to/polls" >}})

{{< include file="content/docs/how-to/polls/features.md" >}}

{{< include file="content/docs/how-to/polls/features-events.md" >}}

### 📞 Calls
Read more about 
[**📞 Calls**]({{< relref "/docs/how-to/calls" >}})

{{< include file="content/docs/how-to/calls/features-api.md" >}}

{{< include file="content/docs/how-to/calls/features-events.md" >}}

### 🗄️ Storages
Read more about
[**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}})

<div></div>
{{< details "**🗄️ Storages**" >}}
{{< include file="content/docs/how-to/storages/features.md" >}}
{{< /details >}}

### 🔍 Observability

Read more about 
[**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})

### 🔄 Events
Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

{{< include file="content/docs/how-to/events/features-events.md" >}}
