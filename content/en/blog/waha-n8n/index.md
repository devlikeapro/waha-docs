---
title: "WAHA + n8n - No Code Low Code WhatsApp Automation"
description: "Start developing your WhatsApp automation with using n8n and WAHA in pair!"
excerpt: "Start developing your WhatsApp automation with using n8n and WAHA in pair!"
date: 2024-08-27T08:48:45+00:00
draft: false
weight: 50
images: ["waha-n8n.png"]
categories: ["Tips"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-n8n
aliases:
  - /blog/waha-n8n
---

<p align="center">
  <img src="/images/n8n/WAHA+n8n.png" width='200'/>
</p>

You can start developing your WhatsApp automation with using n8n and WAHA in pair!

{{< img src="/images/n8n/waha-n8n.png" >}}

## Installation

### Install WAHA
Make sure you have WAHA up and running.

If not - follow
[**⚡ Quick Start**](https://waha.devlike.pro/docs/overview/quick-start/)
so you have WAHA available on
[http://localhost:3000/](http://localhost:3000/)

### Install n8n
Kindly follow [n8n Installation guide](https://docs.n8n.io/hosting/installation/docker/#starting-n8n) for that part.


### Install WAHA node
Go to your n8n installation => **Settings** => **Community nodes** and install:

```
@devlikeapro/n8n-nodes-waha
```

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Credentials

Before using the node you need to add **WAHA API** credentials.
Go to your n8n installation and create a new
[WAHA API credential](https://docs.n8n.io/credentials/add-edit-credentials/)

If it doesn't allow you to **Save** it (no save button) - just put any string in `Api Key` field, know issue :(

## Usage
You can check the workflows and how to use WAHA n8n Nodes
1. Go to your n8n installation with installed **WAHA** node.
2. **Add workflow** there (just empty one)
3. Import one of the [**examples**](https://github.com/devlikeapro/n8n-nodes-waha/tree/master/n8n-workflows) by clicking on three dots **...** at the right top corner
   of the n8n window and selecting **Import from URL**.
4. Paste the url to import workflow
5. Select credentials for all WAHA nodes
6. Configure you session to send event to **WAHA Trigger** Webhook URL
7. Activate the workflow
8. Enjoy low-code automation!


## Workflow Examples
👉 Check out [**n8n-workflows**](https://github.com/devlikeapro/n8n-nodes-waha/tree/master/n8n-workflows) folder for examples.
{{< img src="/images/n8n/waha-n8n.png" >}}

