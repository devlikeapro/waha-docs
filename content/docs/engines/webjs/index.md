---
title: "WEBJS"
description: "Stable, reliable, and predictable."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false

weight: 410
---

## Overview

{{< include file="content/docs/how-to/engines/-what-is-engine.md" >}}

A WhatsApp API client that connects through the WhatsApp Web browser app.
It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.

👉 **WAHA** uses **WhatsApp WebJS** engine by default (if you don't set `WHATSAPP_DEFAULT_ENGINE` environment variable to
another engine).

⚠ Read the article before using **WEBJS** engine
[How to avoid blocking ->]({{< relref "/docs/overview/how-to-avoid-blocking" >}}).

## Run WEBJS

```bash
# Plus
docker run -v `pwd`/.sessions:/app/.sessions -e "WHATSAPP_DEFAULT_ENGINE=WEBJS" devlikeapro/waha-plus

# Core
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=WEBJS" devlikeapro/waha
```

## Configuration
{{< include file="content/docs/engines/webjs/-env-config.md" >}}

## Session Config

{{< include file="content/docs/engines/webjs/-session-config.md" >}}

## Links

- [https://github.com/devlikeapro/whatsapp-web.js](https://github.com/devlikeapro/whatsapp-web.js)
