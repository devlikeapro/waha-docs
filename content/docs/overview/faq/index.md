---
title: "❓ FAQ"
description: "Answers to frequently asked questions."
lead: "Answers to frequently asked questions."
date: 2020-10-06T08:49:31+00:00
lastmod: 2020-10-06T08:49:31+00:00
draft: false
images: ["cover.png"]

menu:
docs:
parent: "help"
weight: 190
toc: true
---

## System Requirements
### How much CPU and Memory does WAHA need?

WAHA has multiple [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}) under the hood, and the CPU and Memory requirements change depending on the engine used.

{{< callout context="tip" icon="outline/server" >}}
We **strongly recommend** using a VPS or server with a minimum **2CPU** and **4GB RAM** configuration for the project **even for a single session**.

If you want to host **more sessions** - please check the numbers below
{{< /callout >}}


| Sessions (accounts) in the container |    **WEBJS**    |    **NOWEB**    |    **GOWS**     |
|--------------------------------------|:---------------:|:---------------:|:---------------:|
| 1                                    | 0.3CPU  / 400MB | 0.1 CPU / 200MB | 0.1 CPU / 200MB |
| 10                                   |  3CPU / 2.5GB   |   1CPU / 2GB    |  0.5 CPU / 1GB  |
| 50                                   |  15CPU / 20GB   |   2CPU / 4GB    |  1.5 CPU / 3GB  |               
| 100                                  |        -        |   4CPU / 8GB    |  3-5 CPU / 5GB  | 
| 500                                  |        -        |        -        | 5-8 CPU / 25GB  |     

{{< include file="content/docs/how-to/install/-the-hosting.md" >}}

### How to horizontally scale WAHA?
You can scale WAHA horizontally by **running multiple instances of WAHA** on **different servers**
and distribute the load between them.

{{< callout context="tip" icon="outline/rocket" >}}
Read about [**WAHA Scaling - how to handle 50+ sessions ->**]({{< relref "/blog/waha-scaling" >}})
{{< /callout >}}

## Is WAHA free?

**Yes!** Starting from version **2026.5.2**, **WAHA** is 100% free and open source -
all features are available for everyone, with no paid tiers and no separate "Plus" image.

**WAHA** includes:
- Unlimited [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}}) - automate as many **WhatsApp Accounts** as you need
- Unlimited **text** and **multimedia messages** (images, videos, files, etc.)
- All [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}}) - PostgreSQL, S3 and MongoDB
- Built-in [**🔒 Security**]({{< relref "/docs/how-to/security" >}}) features
- And everything else that used to be in **WAHA Plus**

{{< callout context="note" icon="outline/info-circle" >}}
Previously **WAHA** was distributed in two versions - **WAHA Core** and **WAHA Plus** (advanced features available through donations).
Since **2026.5.2** everything is part of **WAHA Core**. See the [**WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) page for the history.
{{< /callout >}}

### How can I support the project?

**WAHA** is free, but building and maintaining it takes a lot of time and effort.
If **WAHA** helps you, please consider supporting it on the [**🎁 Support Us**]({{< relref "/support-us" >}}) page.

There's a single **Community** tier - nothing extra in return, everything is **FREE** and available for everyone.
This tier offers no perks, just a way to support the work. It's the **community** that made this project
possible in the first place, and your contribution is what keeps it alive and growing 🌱 🫶🏻

{{< callout icon="filled/heart" title="Keep WAHA Alive" >}}
Please consider **supporting the project** so we can continue developing and maintaining **WAHA** for everyone 🫶
{{< /callout >}}
