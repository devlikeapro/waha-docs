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

## Install

WAHA supports 
[**multiple deployment methods**]({{< relref "/categories/install" >}})
to fit different infrastructure needs.

All options are containerized - choose based on **how you want to manage it**.

<hr>

### Docker

<div class="text-center" style="margin-bottom: 16px;">
  <img src="/logos/docker.svg" alt="Docker logo" style="width:128px;height:128px;">
</div>

Use **Docker** and **Docker Compose** for consistent, portable deployments.

{{< link-card title="👉 Deploy WAHA on Docker" href="/blog/waha-on-docker/" >}}

```yaml {title="docker-compose.yaml"}
services:
  waha:
    image: devlikeapro/waha
    restart: always
    ports:
      - "3000:3000"
    volumes:
      - ./.sessions:/app/.sessions
    # ...
```

- **Management**: CLI and Compose files 🟠
- **Complexity**: Medium 🟠
- **Maintenance**: Command line to pull image and restart  🟠
- **Flexibility**: Full control over configuration and scaling 🟢
- **Cons**: You own uptime, backups, and monitoring; updates are manual 🔴

<hr>

### EasyPanel

<div class="text-center" style="margin-bottom: 16px;">
  <img src="/logos/easypanel-logomark.svg" alt="EasyPanel logo" style="width:128px;height:128px;">
</div>

Use an intuitive [**EasyPanel**](https://easypanel.io/) interface to deploy, manage, and provision SSL certificates.

{{< link-card title="👉 Deploy WAHA on EasyPanel" href="/blog/waha-on-easypanel/" >}}

![EasyPanel overview](easypanel-overview.png)

- **Management**: UI (point-and-click) 🟢
- **Complexity**: Low 🟢
- **Maintenance**: One-click updates, SSL, and monitoring from the panel 🟢
- **Flexibility**: Less control over low-level settings 🟠
- **Cons**: Not open source, paid for more than 3 projects 🔴

<hr>

### Coolify

<div class="text-center" style="margin-bottom: 16px;">
  <img src="/logos/coolify-logo-transparent.png" alt="Coolify logo" style="width:128px;height:128px;">
</div>

[**Coolify**](https://coolify.io/) is an open-source & self-hostable alternative to Vercel and co for easily deploying services to your own server.

{{< link-card title="👉 Deploy WAHA on Coolify" href="/blog/waha-on-coolify/" >}}

![Coolify overview](coolify-overview.png)

- **Management**: UI (self-hosted) 🟢
- **Complexity**: Low 🟢
- **Maintenance**: Panel-driven updates and monitoring 🟢
- **Flexibility**: Less control over low-level settings 🟠
- **Cons**: More developer-focused panel 🔴

<hr>

### ChatWoot

If you want to use
[**🧩 Apps**]({{< relref "/docs/apps/about" >}}), such as
[**ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}),
please follow the specific installation and configuration guides provided for each app:

{{< link-card title="👉 WhatsApp + ChatWoot - Installation Guide" href="/blog/apps-chatwoot-1-install/" >}}

<hr>

## Update

{{< link-card title="👉 How to Update WAHA" href="/blog/waha-update/" >}}

## What's next?

{{< include file="content/docs/overview/quick-start/links.md" >}}
