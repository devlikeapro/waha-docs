---
title: "Apps"
description: "Understanding WAHA 🧩 Apps"
lead: "Understanding WAHA 🧩 Apps"
date: 2024-07-13T12:00:00+00:00
lastmod: 2024-07-13T12:00:00+00:00
draft: false
weight: 301
images: ["cover.png"]
toc: true
slug: "about"
---

**🧩 Apps** are **built-in connections** that integrate **WAHA** with **other services** in a few steps.

**WAHA Team** fully supports **🧩 Apps**.

{{< include file="content/docs/apps/about/apps-vs-integrations.md" >}}

## Available Apps
Apps available to connect:
- [**ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}) - use your **WhatsApp** in **ChatWoot CRM**
- [**Calls**]({{< relref "/docs/apps/calls" >}}) - automatically **reject calls** and **auto-reply with a message**

## Configuration

{{< include file="content/docs/apps/about/-config.md" >}}

## API

{{< callout context="tip" title="Session API" icon="outline/article" >}}
You can fetch and update apps using [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions#apps" >}}) API endpoints.
{{< /callout >}}

### List apps for a session
```http request
GET /api/apps?session={session}
```

### Create a new app
```http request
POST /api/apps
```

```json {title="Body"}
{
  "enabled": true,
  "id": "app_{id}",
  "session": "string",
  "app": "chatwoot", 
  "config": {}
}
```

- `id` - use **random long string** for `app: chatwoot` or **session name** for `app: calls`
- `config` - check the latest app config in [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}).
  - `ChatWootAppConfig` 
  - `CallsAppConfig`

### Update an app
```http request
PUT /api/apps/{appId}
```

### Delete an app
```http request
DELETE /api/apps/{appId}
```

## How it works

{{< include file="content/docs/apps/about/-how-it-works.md" >}}

You can use the **WAHA Jobs Dashboard** at [http://localhost:3000/jobs](http://localhost:3000/jobs) for monitoring **Worker** and it's jobs:

![WAHA Jobs Dashboard](screenshots/waha-jobs-dashboard.png)

## Apps SDK

> This section is currently under development. Check back soon for detailed information about the integration architecture and workflow.
