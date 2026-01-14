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

WAHA supports multiple deployment methods to fit different infrastructure needs.

All options are containerized - choose based on **how you want to manage it**.

### Docker
Use **Docker** and **Docker Compose** for consistent, portable deployments.

- **Management**: CLI and Compose files 🟠
- **Complexity**: Medium 🟠
- **Maintenance**: Command line to pull image and restart  🟠
- **Flexibility**: Full control over configuration and scaling 🟢
- **Cons**: You own uptime, backups, and monitoring; updates are manual 🔴

{{< link-card title="👉 Deploy WAHA on Docker" href="/blog/waha-on-docker/" >}}


### EasyPanel

Use an intuitive **EasyPanel** interface to deploy, manage, and provision SSL certificates.

- **Management**: UI (point-and-click) 🟢
- **Complexity**: Low 🟢
- **Maintenance**: One-click updates, SSL, and monitoring from the panel 🟢
- **Flexibility**: Less control over low-level settings 🟠
- **Cons**: Not open source, paid for more than 3 projects 🔴

{{< link-card title="👉 Deploy WAHA on EasyPanel" href="/blog/waha-on-easypanel/" >}}

### ChatWoot

If you want to use
[**🧩 Apps**]({{< relref "/docs/apps/about" >}}), such as
[**ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}),
please follow the specific installation and configuration guides provided for each app:

{{< link-card title="👉 WhatsApp + ChatWoot - Installation Guide" href="/blog/apps-chatwoot-1-install/" >}}

## What's next?

{{< include file="content/docs/overview/quick-start/links.md" >}}
