---
title: "n8n"
description: "Start developing your WhatsApp automation with using n8n and WAHA in pair!"
lead: "Start developing your WhatsApp automation with using n8n and WAHA in pair!"
date: 2024-09-05T08:49:31+00:00
lastmod: 2024-09-06T08:49:31+00:00
draft: false
menu:
docs:
parent: "help"
weight: 902
toc: true
images: ['WAHA+n8n.png']
---

<p align="center">
  <img src="/images/n8n/WAHA+n8n.png" style="width: 150px">
</p>

## Overview

{{< imgo src="/images/n8n/waha-n8n.png" >}}

👉 You can follow 
[**WAHA + n8n: No Code Low Code WhatsApp Automation Step-By-Step Guide**]({{< relref "/blog/waha-n8n" >}}) 
to start **WAHA** and **n8n** from the scratch and start your first "echo" workflow!

Alternatively, check the installation guides for **n8n** and **WAHA**:

**WAHA**:
   - [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}})
   - [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}})

**n8n**:
   - [**Installation guide**](https://docs.n8n.io/hosting/installation/docker/#starting-n8n)


{{< callout context="note" icon="outline/info-circle" title="WhatsApp n8n Templates" >}}
Check out [**WAHA n8n Workflow Templates**](https://waha-n8n-templates.devlike.pro/)
to get a head start on building **WhatsApp** automations with **n8n** and **WAHA**!
{{< /callout >}}

## Install WAHA n8n node
Go to your **n8n** => **Settings** => **Community nodes** and install:

```sh
@devlikeapro/n8n-nodes-waha
```

If you need help with that, check the
[**Install community nodes**](https://docs.n8n.io/integrations/community-nodes/installation/gui-install/)

## WAHA API Credentials

Before using the node you need to add **WAHA API** credentials.

Go to your n8n installation and create a new **WAHA API** credential:
{{< imgo src="/images/n8n/waha-n8n-credentials.png" >}}

If it doesn't allow you to **Save** it (no save button) - just put **any string** in `Api Key` field, know issue :(

## WAHA Actions
**@devlikeapro/n8n-nodes-waha** provides **WAHA Actions** with all available API calls that you can find 
in the [WAHA API documentation](https://waha.devlike.pro/docs/how-to/) or [Swagger](https://waha.devlike.pro/swagger/).

{{< imgo src="/images/n8n/waha-n8n-actions.png" >}}

## WAHA Trigger
**@devlikeapro/n8n-nodes-waha** provides **WAHA Trigger** node,
which make it possible to trigger the workflow when the specific event happens in WAHA.

{{< imgo src="/images/n8n/waha-n8n-WAHATrigger.png" >}}

💡 **Remember to configure your WAHA Session** with proper **Webhook** with **WAHA trigger** -> **Webhook URL** and 
the events you want to listen!

{{< imgo src="/images/n8n/waha-n8n-WAHATrigger-url.png" >}}

{{< imgo src="/images/n8n/waha-n8n-dashboard-session.png" >}}

## Workflow Examples
👉 Check out
[**https://waha-n8n-workflows.devlike.pro**](http://waha-n8n-templates.devlike.pro/)
for workflow templates!

{{< imgo src="/images/n8n/waha-n8n.png" >}}

## Troubleshooting
If you're experiencing any issues or have a feature request, please check the below resources:
**WAHA**:
- [**🔌 n8n Integration**]({{< relref "/docs/integrations/n8n" >}})
- [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}})
- [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}})

**n8n**:
- [**Installation guide**](https://docs.n8n.io/hosting/installation/docker/#starting-n8n)
- [**Install community nodes**](https://docs.n8n.io/integrations/community-nodes/installation/gui-install/)
- [**Create credentials**](https://docs.n8n.io/credentials/add-edit-credentials/)

If that doesn't help - kindly open an issue in the
[**devlikeapro/n8n-nodes-waha**](https://github.com/devlikeapro/n8n-nodes-waha/)
GitHub repository, we're happy to help you out!
