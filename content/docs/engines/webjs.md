---
title: "WEBJS"
description: "Stable, reliable, and predictable."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false

weight: 310
---

## Overview

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
You can use some of the following environment variables to configure the [**WEBJS**]({{< relref "/docs/how-to/engines#webjs" >}}) session:
- `WAHA_WEBJS_CACHE_TYPE=local` - enable cache (aka use the latest version) for the **web page** in the browser. By default, it's `none` (no cache)
- `WAHA_WEBJS_WEB_VERSION=2.3000.XXXX` - set the version of the WhatsApp Web to use. By default, we're using the latest compatible version. Only works with `local` cache type.

## Links

- [https://github.com/devlikeapro/whatsapp-web.js](https://github.com/devlikeapro/whatsapp-web.js)
