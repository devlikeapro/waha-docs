---
title: "Typebot"
description: "WAHA Typebot Integration"
lead: "WAHA Typebot Integration"
date: 2024-09-05T08:49:31+00:00
lastmod: 2024-09-06T08:49:31+00:00
draft: false
menu:
docs:
parent: "help"
weight: 902
images: ["waha+typebot.png"]
toc: true
---

<p align="center">
  <img src="/images/typebot/waha+typebot.png" style="width: 150px">
</p>

To set up **WhatsApp Typebot** integration you'll need few things:
1. **WAHA** - installed self-hosted WhatsApp API - [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}})
2. [**🔌 n8n Integration**]({{< relref "/docs/integrations/n8n" >}}) - to create workflows
3. **Typebot** - either [self-hosted](https://docs.typebot.io/self-hosting/get-started) or [cloud](https://app.typebot.io/) version
   1. To use **Typebot Cloud** you need to make sure your **n8n** webhook is accessible from the internet
4. **PostgreSQL** - to store Typebot data (and WAHA-Typebot relations)

👉 Check out [**WAHA + Typebot Template**](https://waha-n8n-templates.devlike.pro/whatsapp-typebot/) 
to start from the scratch and create your first **Typebot** integration!

