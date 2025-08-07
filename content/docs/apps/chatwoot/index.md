---
title: "Chatwoot"
description: "Chatwoot App"
lead: "Chatwoot App"
date: 2025-07-10T08:49:31+00:00
lastmod: 2024-07-10T08:49:31+00:00
draft: false
menu:
docs:
weight: 302
images: ["waha-chatwoot.png"]
toc: true
---

<p align="center">
  <img src="/images/chatwoot/waha-chatwoot.png" style="width: 150px">
</p>

**WAHA** provides a built-in **WhatsApp** integration for
[**Chatwoot**](https://www.chatwoot.com/) that you can configure in a few steps using
[**🧩 Apps**]({{< relref "/docs/apps/about" >}})!

![Chatwoot Overview](screenshots/overview.png)
<br/><br/>

{{< include file="content/docs/apps/chatwoot/-disclaimer.md" >}}

## Installation

We cover all installation and configuration aspects in the following series of articles:
{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}

## Configuration

{{< include file="content/docs/apps/about/-config.md" >}}

## How it works

{{< include file="content/docs/apps/about/-how-it-works.md" >}}

### Error Handling

In case of any errors, WAHA retries a few times and then gives detailed information about the error:

![Error Reports and Retries](screenshots/error-reports-and-retries.png)

You can use the **WAHA Jobs Dashboard** at [http://localhost:3000/jobs](http://localhost:3000/jobs) for monitoring:

![WAHA Jobs Dashboard](screenshots/waha-jobs-dashboard.png)
