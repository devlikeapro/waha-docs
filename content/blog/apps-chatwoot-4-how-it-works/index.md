---
title: "WhatsApp + ChatWoot - How It Works"
description: "Learn how WAHA and ChatWoot work together behind the scenes. Explains message flow, retry logic, and dashboards for watching jobs."
excerpt: "Learn how WAHA and ChatWoot work together behind the scenes. Explains message flow, retry logic, and dashboards for watching jobs."
date: 2025-07-06T08:48:45+00:00
draft: false
images: [ "waha-chatwoot.png" ]
categories: [ "Apps", "ChatWoot" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: apps-chatwoot-4-how-it-works
---

## Overview
Complete guide to install and set up production-ready **WAHA** and **Chatwoot** instances on your own infrastructure!

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}

## How it works

{{< include file="content/docs/apps/about/-how-it-works.md" >}}

## Error Handling
In case of any errors, WAHA retries a few times and then gives detailed information about the error:

![Error Reports and Retries](screenshots/error-reports-and-retries.png)

You can use the **WAHA Jobs Dashboard** at [http://localhost:3000/jobs](http://localhost:3000/jobs) for monitoring:

![WAHA Jobs Dashboard](screenshots/waha-jobs-dashboard.png)
