---
title: "WAHA 2026.6 - WAHA Community"
description: "Starting from 2026.6.1, every WAHA Plus feature ships in the free WAHA Core image, and the Core/Plus/PRO tiers become a single optional Community tier."
excerpt: "Every WAHA Plus feature is now in the free Core image starting 2026.6.1. The tiers collapse into a single optional Community subscription."
date: 2026-06-21T00:00:00+00:00
draft: false
images: [ "waha-community.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: true
homepage: false
slug: waha-2026-6
aliases:
  - /blog/waha-community
---

---

TL;DR: **WAHA Plus** features are now part of **WAHA Core**. 🎉

---

## WAHA is free!

Starting from version **2026.6.1**, every feature that used to need a Plus subscription ships in the free, public image. 

Included but not limited to:

- Unlimited [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}})
- [**📤 Send media messages**]({{< relref "/docs/how-to/send-messages" >}})
- [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}}) (PostgreSQL, MongoDB and S3)
- [**🔒 Security**]({{< relref "/docs/how-to/security" >}}) (API key, Swagger auth)
- [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}}) (health checks and metrics endpoints)

So you just need to use the default docker image like:
```bash
docker pull devlikeapro/waha
```
and enjoy full WAHA features!

👉🏻 We'll keep publishing `devlikeapro/waha-plus` for a while so existing setups don't break:

```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus
docker logout
```

## Migration

If you run Docker Compose, edit the `image:` line and run `docker compose up -d`.

```yaml {title="docker-compose.yaml"}
# before
image: devlikeapro/waha-plus

# after
image: devlikeapro/waha
```

```bash
docker compose up -d
```

If you're using other commands like `docker run`, change the image name there
```bash {title=""}
# before
docker run ... devlikeapro/waha-plus

# after
docker run ... devlikeapro/waha
```

## WAHA Community

We dropped the **Core** / **Plus** / **PRO** tiers in Patreon and Boosty - you **don't need to subscribe** anymore to get WAHA Plus features (now it's all in WAHA Core)!

👉🏻 There's a new **Community** tier - a symbolic **$5/mo**, just enough to keep the lights on. 👈🏻

We can not offer something extra in return - everything is FREE starting [**2026.6.1**]({{< relref "/docs/overview/changelog" >}}) and available for everyone.
This tier offers no perks, just a way to support the work.

It's the **COMMUNITY** that made this project possible in the first place, and your contribution is what keeps it alive and growing 🌱 🫶🏻

If WAHA helps you, consider donating in to keep it growing: [**🎁 Support Us**]({{< relref "/support-us" >}})

{{< callout context="tip" title="Why we go this way" icon="outline/info-circle" >}}
The project grew because the **COMMUNITY** supported it - and since we haven't shipped anything significant in the last few months, we decided to share the work the community already paid for with everyone.

We'll keep supporting, upgrading and developing new features - the project lives if you go to **Patreon** / **Boosty**  / **Crypto** and support it with the new **Community** tier. 

It's a symbolic **$5/mo**, just enough to keep the lights on.
{{< /callout >}}

{{< callout context="note" title="Support WAHA" icon="outline/heart" >}}
To keep WAHA going, please [**🎁 Support Us**]({{< relref "/support-us" >}}) using the new **Community** tier (**$5/mo**) on [**Patreon**](https://www.patreon.com/wa_http_api/membership), [**Boosty**](https://boosty.to/wa-http-api) or [**Crypto**](https://portal.devlike.pro/support-us) 🙏
{{< /callout >}}
