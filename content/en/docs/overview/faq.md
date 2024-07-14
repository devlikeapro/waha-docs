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


#### WEBJS

The nature of [WEBJS]({{< relref "/docs/engines/WEBJS" >}}) engine - it runs **real WhatsApp Web** version in **Chromium (or Chrome)** and
communicate with it to prevent blocking from WhatsApp.

It's the reason why it's so demanding on resources.


| Accounts (sessions) in the container | CPU  | Memory |
|--------------------------------------|------|--------|
| 1                                    | 30%  | 400MB  |
| 10                                   | 270% | 1.5GB  |

👉 The benchmark has been made on **Intel(R) Core(TM) i7-10510U CPU @ 1.80GHz**.
It may differ from case to case, it depends on usage pattern - how many messages you get, how many send, etc.

#### NOWEB
If you're looking for less resource demanded engine - [have a look at **NOWEB** engine ->]({{< relref "/docs/engines/NOWEB" >}})

| Accounts (sessions) in the container | CPU  | Memory |
|--------------------------------------|------|--------|
| 1                                    | 10%  | 200MB  |
| 10                                   | 100% | 2GB    |
| 100                                  | 200% | 6GB    |
| 400                                  | 250% | 28GB   |

Quotes from the users:
> The server has **2 CPU and 8GB** of memory. Today we have **85 sessions** in this instance.

> **400** sessions with **4CPU and 32RAM**. It's working fine.


