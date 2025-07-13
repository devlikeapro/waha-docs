---
title: "WAHA 2025.1"
description: "WAHA 2025.1 - PostgreSQL support, GOWS engine and more! 🎉"
excerpt: "WAHA 2025.1 - PostgreSQL support, GOWS engine and more! 🎉"
date: 2025-01-30T08:48:45+00:00
draft: false
images: ["WAHA 2025.1.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-2025-1
---


🎉 We are thrilled to announce the changes we made during the [**WAHA 2025.1**]({{< relref "/docs/overview/changelog#20251" >}}) 🎉

## GOWS engine
Meet **GOWS** - new, fast, super-reliable and stable [**🏭 Engine**]({{< relref "/docs/how-to/engines" >}}) for your WAHA instance!

**GOWS** engine **does not require a browser** to work with WhatsApp Web, it does so directly using a WebSocket.

🚀 It's new generation engine written in **Golang**, future replacement for **NOWEB** engine.

You can test it by setting `WHATSAPP_DEFAULT_ENGINE=GOWS` environment variable.
```bash
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=GOWS" devlikeapro/waha
```

👉 [Read more about **GOWS**]({{< relref "/docs/how-to/engines" >}}), it doesn't support all features yet, but we're working on it!


## PostgreSQL support

Now you can use **PostgreSQL** as a [**🗄️ Storage**]({{< relref "/docs/how-to/storages" >}}) for your WAHA instance!

| Storage                           | WEBJS | NOWEB | GOWS |
|-----------------------------------|:-----:|:-----:|:----:|
| **🖥️ Session** - **PostgresSQL** |  ✔️   |  ✔️   |  ✔️  |
| **🖼️ Media** - **PostgresSQL**   |  ✔️   |  ✔️   |  ✔️  |

It works with both 
[**🖥️ Session** Storage]({{< relref "/docs/how-to/storages#session-storage" >}}) 
and
[**🖼️ Media** Storage]({{< relref "/docs/how-to/storages#media-storage" >}}),
support all engines and available in [**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) 

How to connect to your **PostgresSQL** instance?

Connect **🖥️ Session** Storage:
```bash
docker run -p 3000:3000 -it -e WHATSAPP_SESSIONS_POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable devlikeapro/waha-plus
```
- Set `WHATSAPP_SESSIONS_POSTGRESQL_URL` with your credentials and database name.

Connect **🖼️ Media** Storage:
```bash
docker run -p 3000:3000 -it -e WAHA_MEDIA_STORAGE=POSTGRESQL WAHA_MEDIA_POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable devlikeapro/waha-plus
```
- Set `WAHA_MEDIA_POSTGRESQL_URL` with your credentials and database name.
- Set `WAHA_MEDIA_STORAGE=POSTGRESQL` to enable **PostgresSQL** as a media storage.

💡 You can use the same connection URL for `WAHA_MEDIA_POSTGRESQL_URL` and `WHATSAPP_SESSIONS_POSTGRESQL_URL` if you want to use the same database for both storages.

## And More!
Check out the full [**WAHA 2025.1 🆕 Changelog**]({{< relref "/docs/overview/changelog#20251" >}}) for more details!


