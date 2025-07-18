---
title: "GOWS"
description: "Lightweight golang based engine"
lead: ""
date: 2025-01-06T08:48:45+00:00
lastmod: 2025-01-06T08:48:45+00:00
draft: false

weight: 411
---

## Overview

**GOWS** engine **does not require a browser** to work with WhatsApp Web, it does so directly using a WebSocket.
Not running Chromium saves you CPU and Memory, so you can run more instances on a single server!

## Run GOWS

```bash
# Plus
docker run -v `pwd`/.sessions:/app/.sessions -e "WHATSAPP_DEFAULT_ENGINE=GOWS" devlikeapro/waha-plus

# Core
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=GOWS" devlikeapro/waha
```

## Links

- [https://github.com/devlikeapro/gows](https://github.com/devlikeapro/gows)

