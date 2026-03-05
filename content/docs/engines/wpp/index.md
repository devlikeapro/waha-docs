---
title: "WPP"
description: "Browser-based engine powered by WPP."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false

weight: 410
---

## Overview

{{< include file="content/docs/how-to/engines/-what-is-engine.md" >}}

**WPP** engine to connect through the WhatsApp Web browser app.
It uses Puppeteer to run a real instance of WhatsApp Web to avoid getting blocked.

## Run WPP

```bash
# Plus
docker run -v `pwd`/.sessions:/app/.sessions -e "WHATSAPP_DEFAULT_ENGINE=WPP" devlikeapro/waha-plus

# Core
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=WPP" devlikeapro/waha
```

## Links

- [https://github.com/wppconnect-team/wppconnect](https://github.com/wppconnect-team/wppconnect)
