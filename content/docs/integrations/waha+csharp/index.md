---
title: "WAHA + C#"
description: "WAHA + C#"
lead: "WAHA + C# integration"
date: 2024-09-05T08:49:31+00:00
lastmod: 2024-09-06T08:49:31+00:00
draft: false
menu:
docs:
parent: "help"
weight: 990
images: [ 'csharp.svg' ]
toc: true
slug: csharp
---

<p align="center">
  <img src="/images/csharp.svg" style="width: 150px">
</p>

## waha-net library

{{< callout context="caution" icon="outline/alert-triangle" >}}
It's **community-driven library**, so please check the code before using it.

As alternative, you can use [built-in HTTP API](#using-built-in-http-api).
{{< /callout >}}

Check out:

{{< link-card
title="GitHub: waha-net/waha-net"
href="https://github.com/Waha-net/waha-net"
target="_blank">}}

{{< link-card
title="GitHub: waha-net/waha-aspire-hosting"
href="https://github.com/Waha-net/waha-aspire-hosting"
target="_blank" >}}

## Using Built-in HTTP API

{{< include file="layouts/code/language/csharp/install-dependencies.md" >}}

{{< include file="layouts/code/language/csharp/send-message.md" >}}

{{< include file="layouts/code/language/csharp/receive-message.md" >}}

