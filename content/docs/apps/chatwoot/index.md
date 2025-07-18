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

## Features

### Contacts
**Contact information** is displayed in Chatwoot from **WhatsApp**:

![Contact Information](screenshots/contact-info.png)

### Messages

Send and receive text messages:

![Text Messages](screenshots/messages/text.png)
<br/><br/>

Reply to specific messages:

![Reply to Messages](screenshots/messages/reply.png)
<br/><br/>

Receive media files from WhatsApp:

![Receive Media](screenshots/messages/receive-media.png)
<br/><br/>

Send media files through Chatwoot (available in
[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}))

![Send Media](screenshots/messages/send-media.png)
<br/><br/>

View message reactions from WhatsApp:

![Message Reactions](screenshots/messages/reactions.png)
<br/><br/>

Messages from WhatsApp are displayed in Chatwoot:

![Messages from WhatsApp](screenshots/messages/message-from-whatsapp.png)
<br/><br/>

Deleted messages in WhatsApp are marked accordingly:

![Deleted Messages in WhatsApp](screenshots/messages/deleted-messages-on-whatsapp.png)
<br/><br/>

Delete messages in Chatwoot:

![Delete Messages in Chatwoot](screenshots/messages/delete-message-on-chatwoot.png)
<br/><br/>

Add private notes visible only to agents:

![Private Notes](screenshots/messages/private-note.png)

### Languages

You can set your language when creating a **Chatwoot App** in the **WAHA Dashboard**:

![WAHA Languages](screenshots/dashboard/cw-languages-waha.png)

You'll receive notification messages in the selected language in **Chatwoot**:

![Chatwoot Languages](screenshots/dashboard/cw-languages-chatwoot.png)

### Commands
Use the `help` command to see available commands in **WhatsApp Integration (WAHA)** conversation:

![Help Command](screenshots/commands/help.png)

**Scan QR code** to connect WhatsApp:

![Scan QR Command](screenshots/commands/scan-qr.png)

Get session status updates in Chatwoot:

![Status Updates Command](screenshots/commands/status-updates.png)


### Error Handling
In case of any errors, WAHA retries a few times and then gives detailed information about the error:

![Error Reports and Retries](screenshots/messages/error-reports-and-retries.png)

You can use the **WAHA Jobs Dashboard** at [http://localhost:3000/jobs](http://localhost:3000/jobs) for monitoring:

![WAHA Jobs Dashboard](screenshots/dashboard/cw-waha-jobs-dashboard.png)

## How it works

> This section is currently under development. Check back soon for detailed information about the integration architecture and workflow.

