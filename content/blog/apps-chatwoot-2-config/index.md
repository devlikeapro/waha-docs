---
title: "WAHA + ChatWoot - Configuration Guide"
description: "WAHA + ChatWoot - Configuration Guide"
excerpt: "WAHA + ChatWoot - Configuration Guide"
date: 2025-07-10T08:48:45+00:00
draft: false
images: [ "waha-chatwoot.png" ]
categories: [ "Apps", "ChatWoot" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: apps-chatwoot-config
---

## Overview
Complete guide to install and set up production-ready **WAHA** and **Chatwoot** instances on your own infrastructure!

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}

After completing the configuration guide, you'll have:
- **WhatsApp** connected to [**ChatWoot Inbox**](https://www.chatwoot.com/hc/user-guide/articles/1677492191-adding-inboxes) using **WAHA** [**🧩 ChatWoot App**]({{< relref "/docs/apps/chatwoot" >}})!
- **WAHA** on [**http://localhost:3000**](http://localhost:3000)
- **ChatWoot** on [**http://localhost:3009**](http://localhost:3009)

{{< include file="content/docs/apps/chatwoot/-disclaimer.md" >}}

## Requirements
At this point you should have:
- **WAHA** on [**http://localhost:3000**](http://localhost:3000)
- **ChatWoot** on [**http://localhost:3009**](http://localhost:3009) 

If you don't have it - kindly follow
[**WAHA + ChatWoot - Installation Guide**]({{< relref "/blog/apps-chatwoot-1-install" >}})

{{< include file="content/blog/apps-chatwoot-1-install/-ssh-port-forwarding.md" >}}

## Steps to Configure ChatWoot App
Now you're ready to setup **WhatsApp** to **ChatWoot** connection using
**WAHA** [**🧩 ChatWoot App**]({{< relref "/docs/apps/chatwoot" >}})!

### 1. WAHA: Create Session
{{< tabs "waha-create-session" >}}
{{< tab "➕ WAHA Plus" >}}
- Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Create a new **default** session
  - ⚠️ Hit **Create**, not **Create & Start**

![](waha-create-default-session.png)
{{< /tab >}}

{{< tab "WAHA Core" >}}
- Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Make sure there's **default** session

![](waha-core-default-session.png)
{{< /tab >}}

{{< /tabs >}}

### 2. WAHA: Copy Webhook URL
- Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Click **Apps**
- Click **Add App**
- Copy **Webhook URL**
- Keep the tab open, we'll fill the fields

![](waha-add-chatwoot-app.png)

### 3. ChatWoot: Create API Inbox
- Go to **ChatWoot** [http://localhost:3009](http://localhost:3009)
- Open **Settings → Inboxes**
- Click **Add Inbox**, choose **API**
- Set fields as:
  - **Name**: `WhatsApp - default` (name can be anything, doesn't have to follow that pattern)
  - **Webhook URL**: `http://waha:3009/webhook/chatwoot/...` - Webhook URL from WAHA
- **Finish** creation guide

![](chatwoot-create-inbox.png)


### 4. WAHA: Get Required Fields from ChatWoot
Now we'll need to find those fields in **ChatWoot**

![](waha-chatwoot-fields.png)

Check the screenshots below, but here's the path how you can find the values:
- **ChatWoot URL** - put `http://chatwoot:3009`
  - 👉 Note that it's not `localhost`, it's `chatwoot`!
- **Account ID** - find it on **Settings → Account Settings**
- **Account Token** - find it on **(click on profile) → Profile settings**
- **Inbox ID** - find it on **Settings → Inboxes → (inspect browser url, the last part)**
- **Inbox Identifier** - find it on **Settings → Inboxes → {Inbox} → Configuration**

![](chatwoot-account-id.png)
{{< img-sign text="Account ID: Settings → Account Settings" >}}

![](chatwoot-account-token.png)
{{< img-sign text="Account Token: (click on profile) → Profile settings" >}}

![](chatwoot-inbox-fields.png)
{{< img-sign text="Inbox ID, Inbox Identifier: Settings → Inboxes → {Inbox} → Configuration" >}}

### 5. WAHA: Save App
Click **Save** after you finish all fields.

![](waha-chatwoot-fields.png)

### 6. ChatWoot: Check Integration
Now you can open a new conversation created by WAHA and send `status` or `help` to check that integration is working.

- Go to **ChatWoot** [http://localhost:3009](http://localhost:3009)
- Find new `WhatsApp Integration (WAHA)` conversation
- Send `status` or `help` to test **WAHA <=> ChatWoot** connection

![](chatwoot-send-status.png)

### 7. ChatWoot: Start Session, Scan QR
{{< callout context="caution" title="Get your phone with WhatsApp App" icon="outline/shield-check" >}}
Now we're ready to connect your phone with WAHA and ChatWoot.

For that you'll need to 
[**Link a device**](https://faq.whatsapp.com/1317564962315842/?helpref=uf_share) on your mobile phone using QR code.

Open **WhatsApp** on the phone and click on three dots at the right and **Linked Devices** and be ready to scan QR code
{{< /callout >}}

- In `WhatsApp Integration (WAHA)` conversation **send** `start` message
- Open **WhatsApp** on your phone, click **More** (three dots), **Linked Devices**, **Link a device**
- **Scan QR** code from ChatWoot

![](chatwoot-start-session.png)

### 8. ChatWoot: Test WhatsApp
Now let's see how ChatWoot WhatsApp integration works!

- Send a message from **another** phone to **a connected** account using **WhatsApp**
- Send a response from **ChatWoot**

![](chatwoot-test-whatsapp.png)
## What is next?

👉 Setup **HTTPS** for **ChatWoot** in 
[**WAHA + ChatWoot - HTTPS Guide**]({{< relref "/blog/apps-chatwoot-3-https" >}})

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}
