---
title: "Uptime Kuma"
description: "Send notifications from Uptime Kuma to your WhatsApp!"
lead: "Send notifications from Uptime Kuma to your WhatsApp!"
date: 2024-09-05T08:49:31+00:00
lastmod: 2024-09-06T08:49:31+00:00
draft: false
menu:
docs:
parent: "help"
weight: 980
images: ["uptime-kuma.jpg"]
toc: true
---

<div style="width: 100px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="uptime-kuma.jpg" alt="Uptime Kuma + WhatsApp" >}}
</div>

If you're using **self-hosted** 
[**Uptime Kuma**](https://github.com/louislam/uptime-kuma) 
you can use **self-hosted** 
[**WAHA**](/)
to send notifications from Kuma to your WhatsApp!

## Overview
Here's what you'll get:
<div style="width:350px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="kuma-whatsapp-notifications.png" alt="Uptime Kuma + WhatsApp" >}}
</div>


## Setup
Go to **Kuma** -> **Settings** -> **Notifications** and find **WhatsApp (WAHA)** notification type.

{{< callout context="note" icon="outline/info-circle" >}}
If you don't find it there - kindly update **Uptime Kuma** to the latest version or
try setting up it from
[Uptime Kuma](https://github.com/louislam/uptime-kuma)

**WhatsApp (WAHA)** provider has been added in [this commit](https://github.com/louislam/uptime-kuma/commit/6f8f8f955f1d47016b43db62bf8757bb5b108abf).
{{< /callout >}}

<div style="width:350px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="kuma-setup.png" alt="Uptime Kuma + WhatsApp setup" >}}
</div>

<br/>

Configure parameters and click **Test** to receive a test message.
