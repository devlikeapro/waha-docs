---
title : "🔧 Install & Update"
description: "How to install and update WAHA"
lead: "How to install and update WAHA"
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 201
slug: install
images: ["install.jpg"]
aliases:
  - /docs/how-to/install-update
---

You probably already have run the docker run command during
[**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}) guide:
```bash
docker run ... devlikeapro/waha
```

{{< callout context="caution" icon="outline/alert-triangle" >}}
☝️ The above command is good **for development purposes**, but **not for production**.
{{< /callout >}}

To make it **production-ready**, you need to configure a few more parameters to make it secure, reliable, and easy to manage. 💪🏻


## Why Self-Host WAHA?

Self-hosting WAHA gives you complete control over your privacy:

- **Data Privacy**: Keep all data on your own servers
- **Cost Control**: No per-session/per-message pricing - scale as much as you need
- **Integration**: Deep integration with your existing infrastructure

## Deployment Options

WAHA supports multiple deployment methods to fit different infrastructure needs:

### Docker
Use **Docker** and **Docker Compose** for consistent, portable deployments.

[**👉 Deploy WAHA on Docker**]({{< relref "/blog/waha-on-docker" >}})


### EasyPanel

Use an intuitive **EasyPanel** interface to deploy, manage, and provision SSL certificates.

[**👉 Deploy WAHA on EasyPanel**]({{< relref "/blog/waha-on-easypanel" >}})

### ChatWoot

If you want to use
[**🧩 Apps**]({{< relref "/docs/apps/about" >}}), such as
[**ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}),
please follow the specific installation and configuration guides provided for each app:

[**👉 WhatsApp + ChatWoot - Installation Guide**]({{< relref "/blog/apps-chatwoot-1-install" >}})

## What's next?

{{< include file="content/docs/overview/quick-start/links.md" >}}
