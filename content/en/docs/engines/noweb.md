---
title: "NOWEB"
description: "Lightweight, fast, and flexible."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: [ ]
weight: 311
---

## Overview

**NOWEB** engine **does not require a browser** to work with WhatsApp Web, it does so directly using a WebSocket.
Not running Chromium saves you CPU and Memory, so you can run more instances on a single server!

⚠ Read the article before using **NOWEB** engine
[How to avoid blocking ->]({{< relref " /docs/overview/how-to-avoid-blocking" >}}).

## Run NOWEB

```bash
# Core
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=NOWEB" devlikeapro/waha

# Plus
docker run -v `pwd`/.sessions:/app/.sessions -e "WHATSAPP_DEFAULT_ENGINE=NOWEB" devlikeapro/waha-plus
```

## Links

- [https://github.com/WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)

