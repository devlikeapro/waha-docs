---
title: "ChatWoot"
description: "WAHA ChatWoot Integration"
lead: "WAHA ChatWoot Integration"
date: 2024-09-05T08:49:31+00:00
lastmod: 2024-09-06T08:49:31+00:00
draft: false
menu:
docs:
parent: "help"
weight: 903
images: ["waha-chatwoot.png"]
toc: true
---

<p align="center">
  <img src="/images/chatwoot/waha-chatwoot.png" style="width: 150px">
</p>

{{< callout context="tip" icon="outline/hand-finger-right" title="Use built-in ChatWoot App instead!" >}}
Consider using new 
[**🧩 ChatWoot App**]({{< relref "/docs/apps/chatwoot" >}})!

It's a new, a built-in connection from **WAHA/WhatsApp** to **ChatWoot**!
{{< /callout >}}

To set up **WhatsApp ChatWoot** integration you'll need few things:
1. **WAHA** - installed self-hosted WhatsApp API - [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}})
2. [**🔌 n8n Integration**]({{< relref "/docs/integrations/n8n" >}}) - to create workflows
3. **ChatWoot** - either [self-hosted](https://www.chatwoot.com/docs/self-hosted) or [cloud](https://app.chatwoot.com/) version
   1. To use **ChatWoot Cloud** you need to make sure your **n8n** webhook is accessible from the internet
4. **PostgreSQL** - to store ChatWoot data (and WAHA-ChatWoot relations)

👉 Check out [**WhatsApp + ChatWoot Templates**](https://waha-n8n-templates.devlike.pro/chatwoot/) 
to start from the scratch and create your first **ChatWoot** integration!

