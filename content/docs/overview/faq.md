---
title: "❓ FAQ"
description: "Answers to frequently asked questions."
lead: "Answers to frequently asked questions."
date: 2020-10-06T08:49:31+00:00
lastmod: 2020-10-06T08:49:31+00:00
draft: false

menu:
docs:
parent: "help"
weight: 190
toc: true
---

## System Requirements
### How much CPU and Memory does WAHA need?

{{< callout note >}}
We strongly recommend using VPS or servers with minimum **2CPU** and **2GB RAM** configuration for the project even for a single session.
If you want to host more sessions - please check the numbers below
{{< /callout >}}

WAHA has multiple [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}) under the hood and depends on the used engine
CPU and Memory requirements change

| Sessions (accounts) in the container |    **WEBJS**    |    **NOWEB**    |    **GOWS**     |
|--------------------------------------|:---------------:|:---------------:|:---------------:|
| 1                                    | 0.3CPU  / 400MB | 0.1 CPU / 200MB | 0.1 CPU / 200MB |
| 10                                   |  3CPU / 2.5GB   |   1CPU / 2GB    |  0.5 CPU / 1GB  |
| 50                                   |  15CPU / 20GB   |   2CPU / 4GB    |  1.5 CPU / 3GB  |               
| 100                                  |        -        |   4CPU / 8GB    |  3-5 CPU / 5GB  | 
| 500                                  |        -        |        -        | 5-8 CPU / 25GB  |     

{{< callout context="note" title="Real feedback from the users" >}}
- The server has **2 CPU and 8GB** of memory. Today we have **85 sessions** in this instance.
- **NOWEB** and **400** sessions with **4CPU and 32RAM**. It's working fine.
{{< /callout >}}

### How to horizontally scale WAHA?
You can scale WAHA horizontally by **running multiple instances of WAHA** on **different servers**
and distribute the load between them.

{{< callout context="tip" icon="outline/rocket" >}}
Read about [**WAHA Scaling - how to handle 50+ sessions ->**]({{< relref "/blog/waha-scaling" >}})
{{< /callout >}}

## WAHA Plus
### What is the difference between WAHA Core and WAHA Plus?

It's two versions of product we build:

**WAHA Core** 
- The free and open source project available for everyone. 
- Supports automating a single **WhatsApp Account** (aka [🖥️ Sessions]({{< relref "/docs/how-to/sessions" >}}) 
- Sends and receives **unlimited text messages**.
- Doesn't have any built-in [🔒 Security]({{< relref "/docs/how-to/security" >}}) features, 
which means you need to make sure your infrastructure is secure.

**WAHA Plus**
- The full available through donations version of the project
- Supports **unlimited** [🖥️ Sessions]({{< relref "/docs/how-to/sessions" >}})
- Sends and receives **multimedia messages** (images, videos)
- Have built-in [🔒 Security]({{< relref "/docs/how-to/security" >}}) features

{{< callout >}}
You can find the full comparison table on [**Pricing**]({{< relref "/pricing#donations" >}}) page.
{{< /callout >}}

### What is the difference between Core, Plus and PRO Tiers?

- **Core Tier** - it's free tier (aka community edition) that you're already in, and you can use **WAHA Core** for free!
- **Plus Tier** - allows you to have access to **WAHA Plus** docker image and enjoy all features available in the product!
- **PRO Tier** - also gives you access to **WAHA Plus** image AND **WAHA Plus Source Code** on [GitHub](https://github.com/devlikeapro/waha-plus). Also our team will pay additional attentions to your requests 🫶
  - [waha-plus](https://github.com/devlikeapro/waha-plus)
  - [gow-plus](https://github.com/devlikeapro/gows-plus)
  - [dashboard](https://github.com/devlikeapro/waha-hub)

{{< callout >}}
You can find the full tier comparison table on [**Pricing**]({{< relref "/pricing#donations" >}}) page.
{{< /callout >}}


### Is it one time donation?

According to [**Pricing**]({{< relref "/pricing#donations" >}}) page:
> It doesn't require monthly subscriptions, once installed on your server - it always works!
> **(until WhatsApp made backward-incompatible changes, and you have to update the image, or you need to reinstall it on new server )**

Meaning that the installed WAHA will continue to work even after you subscription got expired. 
Unfortunately, WhatsApp makes backward incompatible changes and when it happens we need to keep up and update the docker image, 
which means that you need to update your WAHA as well, otherwise it won't work 😔
It happens like every **3-6 months** or so and depends on your country as well.

In order to update WAHA you need to have **active docker key** 
(which you get on WAHA [Patron Portal](https://portal.devlike.pro)), meaning at this time you need to be active subscriber.

In summary, it's not one time purchase, it's rather **"every 3-6 months" purchase** to get the latest update.


{{< callout >}}
💡 We recommend staying subscribing, so we can keep developing awesome product for you!
Your support the only reason why we're able to publish and maintain the project 🫶

You can find the full comparison table on [**Pricing**]({{< relref "/pricing#donations" >}}) page.
{{< /callout >}}

