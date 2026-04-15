---
title: "How to Update WAHA"
description: "Step-by-step instructions to update WAHA on Docker, Coolify, and EasyPanel."
excerpt: "Step-by-step instructions to update WAHA on Docker, Coolify, and EasyPanel."
date: 2026-04-14T01:01:01+00:00
draft: false
images: ["cover.png"]
categories: ["Install"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-update
toc: true
---

This guide covers how to update **WAHA** to the latest version depending on how you deployed it:

{{< callout context="tip" title="Sessions are safe" icon="outline/shield-check" >}}
Your sessions will survive the update as long as session data is persisted via one of the supported
[**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}}):
- **Local** — a volume mounted to `/app/.sessions`
- **PostgreSQL** or **MongoDB** — external database
{{< /callout >}}

## Docker

👉 Installed using [Deploy WAHA on Docker]({{< relref "/blog/waha-on-docker" >}}) guide? Here's how to update.

When there's a new version of WAHA, update it with these commands.

{{< tabs "docker-update" >}}
{{< tab "WAHA Core" >}}
```bash {title="Update WAHA Core"}
docker compose pull
docker compose up -d
```
{{< /tab >}}

{{< tab "➕ WAHA Plus" >}}
```bash {title="Update WAHA Plus"}
# Login to pull the latest Plus image
docker login -u devlikeapro -p {KEY}
docker compose pull
docker logout

docker compose up -d
```

{{< callout context="caution" title="Pinned version tag?" icon="outline/alert-triangle" >}}
If you specified an exact version tag in `docker-compose.yaml`, like:

```yaml
image: devlikeapro/waha-plus:latest-2024.7.8
```

Remember to update it to the new `latest-{YEAR}.{MONTH}.{BUILD}` tag before pulling.
{{< /callout >}}
{{< /tab >}}
{{< /tabs >}}

You can verify the running version and check logs after updating:

```bash
# Check running containers
docker compose ps

# Show recent logs
docker compose logs --since 1h
```

## Coolify

👉 Installed using [Deploy WAHA on Coolify]({{< relref "/blog/waha-on-coolify" >}}) guide? Here's how to update.

When there's a new version, open your WAHA app in Coolify and click **Redeploy** to pull the latest image and restart the service:

![Redeploy on Coolify](coolify-redeploy.png)

Coolify will pull the latest image and restart the container automatically.

## EasyPanel

👉 Installed using [Deploy WAHA on EasyPanel]({{< relref "/blog/waha-on-easypanel" >}}) guide? Here's how to update.

When you want to update the image on EasyPanel, go to the **Deployments** tab of your `waha` service and click **Force Build**:

![Force Build on EasyPanel](easypanel-force-rebuild.png)

EasyPanel will pull the latest image and redeploy the service.
