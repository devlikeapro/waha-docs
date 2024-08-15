---
title: "❓ FAQ"
description: "Answers to frequently asked questions."
lead: "Answers to frequently asked questions."
date: 2020-10-06T08:49:31+00:00
lastmod: 2020-10-06T08:49:31+00:00
draft: false
images: [ ]
menu:
docs:
parent: "help"
weight: 190
toc: true
---

## System Requirements
We strongly recommend using VPS or servers with minimum **2CPU** and **2GB RAM** configuration for the project even for a single session.
If you want to host more sessions - please check the numbers below


### How much CPU and Memory does WAHA consume?

WAHA uses multiple [🏭 Engines]({{< relref "/docs/how-to/engines" >}}) under the hood and depends on the used engine 
CPU and Memory requirements change

👉 We kindly recommend getting **at least** **2CPU and 2GB RAM** for a VPS, 
it's not comfortable to work with less resources.


#### WEBJS

The nature of [WEBJS]({{< relref "/docs/engines/WEBJS" >}}) engine - it runs **real WhatsApp Web** version in **Chromium (or Chrome)** and
communicate with it to prevent blocking from WhatsApp.

It's the reason why it's so demanding on resources.


| Accounts (sessions) in the container                                                       | CPU   | Memory |
|--------------------------------------------------------------------------------------------|-------|--------|
| 1                                                                                          | 30%   | 400MB  |
| 10                                                                                         | 270%  | 2.5GB  |
| 50                                                                                         | 1500% | 20GB   |
| 💡 [**WAHA Scaling - how to handle 50+ sessions ->**]({{< relref "/blog/waha-scaling" >}}) |       |        |

👉 The benchmark may differ from case to case, it depends on usage pattern - how many messages you get, how many send, etc.

#### NOWEB
If you're looking for less resource demanded engine - [have a look at **NOWEB** engine ->]({{< relref "/docs/engines/NOWEB" >}})

| Accounts (sessions) in the container                                                        | CPU  | Memory |
|---------------------------------------------------------------------------------------------|------|--------|
| 1                                                                                           | 10%  | 200MB  |
| 10                                                                                          | 100% | 2GB    |
| 50                                                                                          | 150% | 4GB    |
| 100                                                                                         | 200% | 6GB    |
| 500                                                                                         | 300% | 30GB   |
| 💡 [**WAHA Scaling - how to handle 500+ sessions ->**]({{< relref "/blog/waha-scaling" >}}) |      |        |

Quotes from the users:
> The server has **2 CPU and 8GB** of memory. Today we have **85 sessions** in this instance.

> **400** sessions with **4CPU and 32RAM**. It's working fine.


### How to horizontally scale WAHA?
You can scale WAHA horizontally by running multiple instances of WAHA on different servers and distribute 
the load between them.

Read more [**WAHA Scaling - how to handle 500+ sessions ->**]({{< relref "/blog/waha-scaling" >}})

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

You can find the full comparison table on [**Pricing**]({{< relref "/pricing#donations" >}}) page.
### What is the difference between Core, Plus and PRO tiers?

- **Core** free tier (aka community edition) that you're already in, and you can use **WAHA Core** for free!
- **Plus** tier allows you to have access to **WAHA Plus** docker image and enjoy all features available in the product!
- **PRO** tier also gives you access to **WAHA Plus** image AND **WAHA Plus Source Code** on [GitHub](https://github.com/devlikeapro/waha-plus)
, but also our team will pay additional attentions to your requests 🫶

You can find the full comparison table on [**Pricing**]({{< relref "/pricing#donations" >}}) page.



### I want to purchase WAHA Plus (WAHA Pro), is it one time purchase?

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

💡 We recommend staying subscribing, so we can keep developing awesome product for you! 
Your support the only reason why we're able to publish and maintain the project 🫶

