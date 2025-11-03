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

## WAHA Plus
### What is the difference between WAHA Core and WAHA Plus?

These are two versions of the product we build:

**WAHA Core** 
- The free and open source project available for everyone. 
- Supports automating a single **WhatsApp Account** (aka [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}}))
- Sends and receives **unlimited text messages**.
- Doesn't have any built-in [🔒 Security]({{< relref "/docs/how-to/security" >}}) features, 
which means you need to make sure your infrastructure is secure.

**WAHA Plus**
- The full version available through donations
- Supports **unlimited** [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}})
- Sends and receives **multimedia messages** (images, videos)
- Has built-in [🔒 Security]({{< relref "/docs/how-to/security" >}}) features

{{< callout >}}
You can find the full comparison table on [**🎁 Support Us**]({{< relref "/support-us#donations" >}}) page.
{{< /callout >}}

### What is the difference between Core, Plus and PRO Tiers?

- **Core Tier** - it's free tier (aka community edition) that you're already in, and you can use **WAHA Core** for free!
- **Plus Tier** - allows you to have access to **WAHA Plus** docker image and enjoy all features available in the product!
- **PRO Tier** - also gives you access to **WAHA Plus** image AND **WAHA Plus Source Code** on [GitHub](https://github.com/devlikeapro/waha-plus). Also our team will pay additional attentions to your requests 🫶
  - [waha-plus](https://github.com/devlikeapro/waha-plus)
  - [gow-plus](https://github.com/devlikeapro/gows-plus)
  - [dashboard](https://github.com/devlikeapro/waha-hub)

{{< callout >}}
You can find the full tier comparison table on [**🎁 Support Us**]({{< relref "/support-us#donations" >}}) page.
{{< /callout >}}


### Is it a one-time donation?

**No**. WAHA Plus is **not** a one-time purchase - but the version you install **keeps running after your subscription ends**, until WhatsApp makes backward incompatible change, or you need to install or update WAHA.

**An active subscription is needed to:**

* Pull any update (compatibility fixes, new features, security patches)
* Reinstall or move WAHA Plus to another server

ℹ️ WhatsApp typically makes changes every 3–6 months (timing can vary by region). So it's more like "every 3-6 month donation"

{{< callout icon="filled/heart" title="Keep WAHA Alive" >}}
Please consider **staying subscribed** so we can continue developing and maintaining WAHA - both **Core** and **Plus** versions 🫶  

See the full comparison on the [**🎁 Support Us**]({{< relref "/support-us#donations" >}}) page.
{{< /callout >}}
