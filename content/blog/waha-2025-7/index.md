---
title: "WAHA 2025.7 - ChatWoot App, Dashboard i18n, and more!"
description: "WAHA 2025.7 - ChatWoot App, Dashboard i18n, and more!"
excerpt: "WAHA 2025.7 - ChatWoot App, Dashboard i18n, and more!"
date: 2025-07-29T08:48:45+00:00
draft: false
images: [ "waha-2025-7.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2025-7
---

## 🧩 ChatWoot App
Meet the first built-in app in WAHA - [**🧩 ChatWoot App**]({{< relref "/docs/apps/chatwoot" >}})!

![](chatwoot-overview.png)


WAHA now provides a built-in app to integrate your **WhatsApp** account with **ChatWoot**,
eliminating the need to run n8n or use other third-party products!

We cover all installation and configuration aspects in the following series of articles:
{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}

## 👤 Update Contact on Phone
You can now use the 
[**👤 Update Contact API**]({{< relref "/docs/how-to/contacts#update-contact" >}})
to **update contacts** in **your phone address book** (and in WhatsApp)!

```http request
PUT /api/{session}/contacts/{chatId}
```

```json { title="Body" }
{
  "firstName": "John",
  "lastName": "Doe"
}
```

See details: {{< issue 1124 >}}

## 📊 Dashboard i18n

[**📊 Dashboard**]({{< relref "/docs/how-to/dashboard" >}}) now has language options available!

![](dashboard-languages.png)

## 🆕 Changelog

Check out the full list of updates in the [**🆕 WAHA 2025.7 Changelog**]({{< relref "/docs/overview/changelog#20257" >}}) and stay tuned for more!
