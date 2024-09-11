---
title: "VENOM"
description: "DEPRECATED"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: [ ]
weight: 319
---

## Overview
⚠️ ⚠️ ⚠️
**DEPRECATED** - use
[WEBJS]({{< relref "/docs/engines/webjs" >}}) or
[NOWEB]({{< relref "/docs/engines/noweb" >}})
instead.
⚠️ ⚠️ ⚠️

It's a high-performance system developed with JavaScript to create a bot for WhatsApp.
It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.

## Run VENOM

```bash
# Core
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=VENOM" devlikeapro/waha

# Plus
docker run -v `pwd`/.sessions:/app/.sessions -e "WHATSAPP_DEFAULT_ENGINE=VENOM" devlikeapro/waha-plus
```

## Links

- [https://github.com/devlikeapro/venom](https://github.com/devlikeapro/venom)

