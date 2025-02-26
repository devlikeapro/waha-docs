---
title: "WAHA + n8n: No Code Low Code WhatsApp Automation Step-By-Step Guide"
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

Here's how you can start developing your WhatsApp automation with using **n8n** and **WAHA** in pair so you can create 
your own no-code or low-code **WhatsApp automation**:

{{< imgo src="/images/n8n/waha-n8n.png" >}}

## Installation
Here's a quick docker-compose we have prepared for you to start using **n8n** with **WAHA**:

```bash
wget https://raw.githubusercontent.com/devlikeapro/waha/core/docker-compose/n8n/docker-compose.yaml
```


- If you're using [**WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) (donation version) - kindly go to 
[https://portal.devlike.pro](https://portal.devlike.pro)
and docker pull the image with your credentials:
```bash
docker login -u devlikeapro -p <dckr_pat_1111111111>
docker pull devlikeapro/waha-plus
docker logout
```

- If you're using **WAHA Core** (free version) - you can use the image from Docker Hub:
```bash
sed -i 's/devlikeapro\/waha-plus/devlikeapro\/waha/g' docker-compose.yaml
```

Now you're ready to run:
```bash
docker compose up 
# to run in background:
# docker compose up -d
```

After that, open:
1. **n8n** at [https://localhost:5678](https://localhost:5678) and set up your email/password
2. **WAHA** at [https://localhost:3000/dashboard](https://localhost:3000/dashboard) (`waha/waha`)

### Install WAHA n8n node
We provide WAHA Node, which you can install at your n8n installation.

Go to your **n8n** => **Settings** => **Community nodes** and install:
```bash
@devlikeapro/n8n-nodes-waha
```

If you need help with that, check the
[**Install community nodes**](https://docs.n8n.io/integrations/community-nodes/installation/gui-install/)


## First WhatsApp workflow
We'll build simple workflow - when your WhatsApp account got any message, 
it responds with **"Hi there"** message

### Step 1: Add WAHA API credentials
Before starting using the node, you need to add **WAHA API** credentials.
1. Go to your **n8n** => **Home** => **Credentials** => **Add first credential**
2. Find **WAHA API** in dropdown
3. **Host URL** - `http://waha:3000` or use your domain
4. **API Key** - `321` or your API key set in `docker-compose.yaml`
5. Click **Save** - it'll check the connection and save the credentials

{{< imgo src="/images/blog/waha-n8n/waha-n8n-credentials.png" >}}

If you need help with that, check the
[**Create credentials**](https://docs.n8n.io/credentials/add-edit-credentials/)

### Step 2: Create a new workflow
1. Go to **n8n** => **Home** => **Workflows** => **Create new workflow**.
2. Remove **Manual trigger**

{{< imgo src="/images/blog/waha-n8n/waha-n8n-init-workflow.png" >}}

### Step 3: Add WAHA Trigger
Add **WAHA Trigger** node.

{{< imgo src="/images/blog/waha-n8n/waha-n8n-WAHATrigger.png" >}}

### Step 4: Add Send a text message action
Add **Send a text message** **WAHA Action** and connect it to `message` **WAHA Trigger** output:
{{< imgo src="/images/blog/waha-n8n/waha-n8n-actions.png" >}}

### Step 5: Activate the workflow
Click **Save** and **Activate** the workflow:
{{< imgo src="/images/blog/waha-n8n/waha-n8n-activate-workflow.png" >}}

### Step 6: Start a new session
Open the **WAHA Trigger** and expand **Webhook URLs** => **Production URL**
{{< imgo src="/images/blog/waha-n8n/waha-n8n-WAHATrigger-url.png" >}}

Go to [http://localhost:3000/dashboard/](http://localhost:3000/dashboard/) (`waha/waha`) and 
**Start New** session with the URL you got from the **WAHA Trigger**:
{{< imgo src="/images/blog/waha-n8n/waha-n8n-dashboard-session.png" >}}

**Scan QR** and wait till session in `WORKING` state:
{{< imgo src="/images/blog/waha-n8n/waha-n8n-dashboard-scan-qr.png" >}}

### Step 7: Send a message
Now you can **send any message** to your WhatsApp account, and it'll respond with **"Hi there"** message!

## Workflow Templates
👉 Check out 
[**https://waha-n8n-workflows.devlike.pro**](http://waha-n8n-templates.devlike.pro/) 
for workflow templates!

{{< imgo src="/images/n8n/waha-n8n.png" >}}

## Troubleshooting
If you're experiencing any issues or have a feature request, please check the below resources:
**WAHA**:
- [**🧩 n8n Integration**]({{< relref "/docs/integrations/n8n" >}})
- [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}})
- [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}})
  
**n8n**:
- [**Installation guide**](https://docs.n8n.io/hosting/installation/docker/#starting-n8n)
- [**Install community nodes**](https://docs.n8n.io/integrations/community-nodes/installation/gui-install/)
- [**Create credentials**](https://docs.n8n.io/credentials/add-edit-credentials/)

If that doesn't help - kindly open an issue in the 
[**devlikeapro/n8n-nodes-waha**](https://github.com/devlikeapro/n8n-nodes-waha/)
GitHub repository, we're happy to help you out!
