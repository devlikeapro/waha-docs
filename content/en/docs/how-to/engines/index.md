---
title: "🏭 Engines"
description: "Under the hood WAHA allows you to use different engines."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: [ ]
weight: 290
---

## Engines

Under the hood **WAHA** allows you to use different engines. You can control what you want to run by settings
`WHATSAPP_DEFAULT_ENGINE` environment variables.

```bash
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=WEBJS" devlikeapro/waha
```

If you have any problems with one engine - try another!

{{< alert icon="👉" text="API responses and webhook payloads may differ significantly, test everything before changing the engine" />}}

All engines are available in both
Core ![](/images/versions/core.png) and
[Plus ![](/images/versions/plus.png) versions]({{< relref "/docs/how-to/plus-version" >}}).

### WEBJS

👉 [Read more about **WEBJS**]({{< relref "/docs/engines/webjs" >}})

`WHATSAPP_DEFAULT_ENGINE=WEBJS`

A WhatsApp API client that connects through the WhatsApp Web browser app.
It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.


### NOWEB
👉 [Read more about **NOWEB**]({{< relref "/docs/engines/noweb" >}})

`WHATSAPP_DEFAULT_ENGINE=NOWEB`

**NOWEB** engine **does not require a browser** to work with WhatsApp Web, it does so directly using a WebSocket.
Not running Chromium saves you CPU and Memory, so you can run more instances on a single server!

Quotes from the users:
> The server has **2 CPU and 8GB** of memory. Today we have **85 sessions** in this instance.
>
> **400** sessions with **4CPU and 32RAM**. It's working fine.


### VENOM
👉 [Read more about **VENOM**]({{< relref "/docs/engines/venom" >}})

`WHATSAPP_DEFAULT_ENGINE=VENOM`

It's a high-performance system developed with JavaScript to create a bot for WhatsApp.
It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.


## Docker images
WAHA provides few docker images with different setup.

| Image                                                   | CPU | Browser                 |
|---------------------------------------------------------|-----|-------------------------|
| [WAHA Plus]({{< relref "/docs/how-to/plus-version" >}}) |     |                         |
| `devlikeapro/waha-plus:latest`                          | x86 | Chromium                |
| `devlikeapro/waha-plus:chrome`                          | x86 | Chrome (supports video) |
| `devlikeapro/waha-plus:noweb`                           | x86 | None                    |
| `devlikeapro/waha-plus:arm`                             | ARM | Chromium                |
| `devlikeapro/waha-plus:noweb-arm`                       | ARM | None                    |
| **WAHA Core**                                           |     |                         |
| `devlikeapro/waha:latest`                               | x86 | Chromium                |
| `devlikeapro/waha:chrome`                               | x86 | Chrome                  |
| `devlikeapro/waha:noweb`                                | x86 | None                    |
| `devlikeapro/waha:arm`                                  | ARM | Chromium                |
| `devlikeapro/waha:noweb-arm`                            | ARM | None                    |

### Browsers
- **Chromium** - is the default browser for **WAHA**. It's a good choice for most cases.
- **Chrome** - is a good choice if you need to receive videos in Plus version.
- **None** - is a good choice if you want to use **NOWEB** engine.

### CPU
- **x86** - is a good choice for most cases.
- **ARM** - is a good choice if you're using ARM processors (like Apple Silicon, Apple M1, etc.)
{{< alert icon="💡" text="Chrome version is not available in ARM" />}}


### Versions

💡 You can pin WAHA version by adding `-{version}` at the end of image tag.
- `devlikeapro/waha-plus:chrome-{version}` => `devlikeapro/waha-plus:chrome-2024.6.1`
- `devlikeapro/waha-plus:latest-{version}` => `devlikeapro/waha-plus:latest-2024.6.1`

## Features

Some engines may not support certain features.
Here, you will find a list of supported endpoints and webhooks per engine.

|                       Symbol                       | Meaning                                                                           |
|:--------------------------------------------------:|-----------------------------------------------------------------------------------|
|                         ✔️                         | The engines supports the feature.                                                 |
| [#123](https://github.com/devlikeapro/waha/issues) | Feature request or bug for the endpoint                                           |
|           ![](/images/versions/plus.png)           | The feature available in [WAHA Plus]({{< relref "/docs/how-to/plus-version" >}}). |
|                         ➖                          | The engine **does not** and will newer support this feature                       |

If you don't specify `WHATSAPP_DEFAULT_ENGINE` environment variable - look at **WEBJS** engine,
it's the engine WAHA runs by default.

### Protocols

|                                                              | WEBJS | NOWEB | VENOM |
|--------------------------------------------------------------|:-----:|:-----:|:-----:|
| Run a browser (chromium\chrome) to communicate with WhatsApp |  ✔️   |   ➖    |  ✔️   |
| Communicate with WhatsApp via websocket (no browser)         |   ➖    |  ✔️   |    ➖   |

### Webhooks

| **Webhooks**                                        | WEBJS | NOWEB | VENOM |
|-----------------------------------------------------|:-----:|:-----:|:-----:|
| `message`                                           |  ✔️   |  ✔️   |  ✔️   |
| `message` with files ![](/images/versions/plus.png) |  ✔️   |  ✔️   |  ✔️   |
| `message.reaction`                                  |  ✔️   |  ✔️   |       |
| `message.any`                                       |  ✔️   |  ✔️   |  ✔️   |
| `message.ack`                                       |  ✔️   |  ✔️   |  ✔️   |
| `message.revoked`                                   |  ✔️   |       |       |
| `state.change`                                      |  ✔️   |  ✔️   |  ✔️   |
| `group.join`                                        |  ✔️   |  ✔️   |  ✔️   |
| `group.leave`                                       |  ✔️   |       |       |
| `presence.update`                                   |       |  ✔️   |       |
| `poll.vote`                                         |       |  ✔️   |       |
| `poll.vote.failed`                                  |       |  ✔️   |       |

### Sessions

If you find any inconsistency with actual endpoints -
please [create an issue](https://github.com/devlikeapro/waha/issues/new?title=Error+in+engine+features )

|                                           | WEBJS |                          NOWEB                          | VENOM |
|-------------------------------------------|:-----:|:-------------------------------------------------------:|:-----:|
| **Session**                               |       |                                                         |       |
| `POST /api/sessions/start`                |  ✔️   |                           ✔️                            |  ✔️   |
| `POST /api/sessions/stop`                 |  ✔️   |                           ✔️                            |  ✔️   |
| `POST /api/sessions/logout`               |  ✔️   |                           ✔️                            |  ✔️   |
| `GET /api/sessions/`                      |  ✔️   |                           ✔️                            |  ✔️   |
| `GET /api/sessions/{session}/me`          |  ✔️   |                           ✔️                            |       |
| **Authentication**                        |       |                                                         |       |
| `POST /api/{session}/auth/qr`             |  ✔️   |                           ✔️                            |  ✔️   |
| `POST /api/{session}/auth/request-code`   |       |                           ✔️                            |       |
| `POST /api/{session}/auth/authorize-code` |       | ️[#113](https://github.com/devlikeapro/waha/issues/113) |       |
| **Screenshot**                            |       |                                                         |       |
| `POST /api/screenshot`                    |  ✔️   |                            ➖                            |  ✔️   |

### Chatting
| **Chatting**                                                | WEBJS |      NOWEB       | VENOM |
|-------------------------------------------------------------|:-----:|:----------------:|:-----:|
| `GET /api/checkNumberStatus`                                |  ✔️   |        ✔️        |  ✔️   |
| `GET /api/sendContactVcard`                                 |       |        ✔️        |       |
| `GET /api/sendText`                                         |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/sendText`                                        |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/reply`                                           |  ✔️   |        ✔️        |  ✔️   |
| `PUT /api/{session}/chats/{chatId}/messages/{messageId}`    |  ✔️   |        ✔️        |       |
| `DELETE /api/{session}/chats/{chatId}/messages/{messageId}` |  ✔️   |        ✔️        |       |
| `POST /api/sendPoll`                                        |       |        ✔️        |       |
| `POST /api/sendLocation`                                    |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/sendLinkPreview`                                 |       |        ✔️        |  ✔️   |
| `POST /api/sendImage` ![](/images/versions/plus.png)        |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/sendFile` ![](/images/versions/plus.png)         |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/sendVoice` ![](/images/versions/plus.png)        |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/sendVideo` ![](/images/versions/plus.png)        |  ✔️   |        ✔️        |       |
| `POST /api/sendSeen`                                        |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/startTyping`                                     |  ✔️   |        ✔️        |  ✔️   |
| `POST /api/stopTyping`                                      |  ✔️   |        ✔️        |       |
| `POST /api/reaction`                                        |  ✔️   |        ✔️        |       |
| `POST /api/star`                                            |  ✔️   |        ✔️        |       |
| `GET /api/messages`                                         |  ✔️   | ✔️[*1](#heading) |  ✔️   |

### Status
|                                                                   | WEBJS |      NOWEB       | VENOM |
|-------------------------------------------------------------------|:-----:|:----------------:|:-----:|
| **Status**                                                        |       |                  |       |
| `POST /api/{session}/status/text`                                 |       |        ✔️        |       |
| `POST /api/{session}/status/image` ![](/images/versions/plus.png) |       |        ✔️        |       |
| `POST /api/{session}/status/voice` ![](/images/versions/plus.png) |       |        ✔️        |       |
| `POST /api/{session}/status/video` ![](/images/versions/plus.png) |       |        ✔️        |       |
| `POST /api/{session}/status/delete`                               |       |        ✔️        |       |

### Chats
|                                                                   | WEBJS |      NOWEB       | VENOM |
|-------------------------------------------------------------------|:-----:|:----------------:|:-----:|
| `GET /api/{session}/chats`                                        |  ✔️   | ✔️[*1](#heading) |       |
| `DELETE /api/{session}/chats/{chatId}`                            |  ✔️   |  [*2](#heading)  |       |
| `GET /api/{session}/chats/{chatId}/messages`                      |  ✔️   | ✔️[*1](#heading) |  ✔️   |
| `DELETE /api/{session}/chats/{chatId}/messages`                   |  ✔️   |  [*2](#heading)  |       |
| `PUT /api/{session}/chats/{chatId}/messages/{messageId}`          |  ✔️   |        ✔️        |       |
| `DELETE /api/{session}/chats/{chatId}/messages/{messageId}`       |  ✔️   |        ✔️        |       |

### Contacts
|                                                                   | WEBJS |      NOWEB       | VENOM |
|-------------------------------------------------------------------|:-----:|:----------------:|:-----:|
| `GET /api/contacts`                                               |  ✔️   | ✔️[*1](#heading) |       |
| `GET /api/contacts/all`                                           |  ✔️   | ✔️[*1](#heading) |       |
| `GET /api/contacts/check-exists`                                  |  ✔️   |        ✔️        |  ✔️   |
| `GET /api/contacts/about`                                         |  ✔️   |                  |       |
| `GET /api/contacts/profile-picture`                               |  ✔️   |        ✔️        |       |
| `POST /api/contacts/block`                                        |  ✔️   |  [*2](#heading)  |       |
| `POST /api/contacts/unblock`                                      |  ✔️   |  [*2](#heading)  |       |

#### *
1. **NOWEB** - you need to [**Enable Store**]({{< relref "/docs/engines/noweb#store" >}}) to get **chats, contacts and messages**
2. **NOWEB** - Create an issue with the [feature request if you need it](https://github.com/devlikeapro/waha/issues/)

### Channels
{{< include file="content/en/docs/how-to/channels/features.md" >}}

### Groups
|                                                                        | WEBJS | NOWEB | VENOM |
|------------------------------------------------------------------------|:-----:|:-----:|:-----:|
| `POST /api/{session}/groups`                                           |  ✔️   |  ✔️   |       |
| `GET /api/{session}/groups`                                            |  ✔️   |  ✔️   |       |
| `GET /api/{session}/groups/{id}`                                       |  ✔️   |  ✔️   |       |
| `DELETE /api/{session}/groups/{id}`                                    |  ✔️   |       |       |
| `GET /api/{session}/groups/{id}/settings/security/info-admin-only`     |  ✔️   |       |       |
| `PUT /api/{session}/groups/{id}/settings/security/info-admin-only`     |  ✔️   |       |       |
| `GET /api/{session}/groups/{id}/settings/security/messages-admin-only` |  ✔️   |       |       |
| `PUT /api/{session}/groups/{id}/settings/security/messages-admin-only` |  ✔️   |       |       |
| `POST /api/{session}/groups/{id}/leave`                                |  ✔️   |  ✔️   |       |
| `PUT /api/{session}/groups/{id}/description`                           |  ✔️   |  ✔️   |       |
| `PUT /api/{session}/groups/{id}/subject`                               |  ✔️   |  ✔️   |       |
| `GET /api/{session}/groups/{id}/invite-code`                           |  ✔️   |  ✔️   |       |
| `POST /api/{session}/groups/{id}/invite-code/revoke`                   |  ✔️   |  ✔️   |       |
| `GET /api/{session}/groups/{id}/participants`                          |  ✔️   |  ✔️   |       |
| `POST /api/{session}/groups/{id}/participants/add`                     |  ✔️   |  ✔️   |       |
| `POST /api/{session}/groups/{id}/participants/remove`                  |  ✔️   |  ✔️   |       |
| `POST /api/{session}/groups/{id}/admin/promote`                        |  ✔️   |  ✔️   |       |
| `POST /api/{session}/groups/{id}/admin/demote`                         |  ✔️   |  ✔️   |       |

### Presence

|                                                   | WEBJS | NOWEB | VENOM |
|---------------------------------------------------|:-----:|:-----:|:-----:|
| `POST /api/{session}/presence`                    |  ✔️   |  ✔️   |       |
| `GET /api/{session}/presence`                     |       |  ✔️   |       |
| `GET /api/{session}/presence/{chatId}`            |       |  ✔️   |       |
| `POST /api/{session}/presence/{chatId}/subscribe` |       |  ✔️   |       |

### Observability
|                                                   | WEBJS | NOWEB | VENOM |
|---------------------------------------------------|:-----:|:-----:|:-----:|
| **Other**                                         |       |       |       |
| `GET /api/version`                                |  ✔️   |  ✔️   |       |
| `GET /health` ![](/images/versions/plus.png)      |  ✔️   |  ✔️   |  ✔️   |


