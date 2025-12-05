---
title: "Calls"
description: "Calls App"
lead: "Calls App"
date: 2025-07-10T08:49:31+00:00
lastmod: 2024-07-10T08:49:31+00:00
draft: false
menu:
docs:
weight: 303
images: []
toc: true
---

You can **automatically reject calls** and **auto-reply with a message** using this app.

## Installation
- Configure env variables
```bash {title=".env"}
WAHA_APPS_ENABLED=True
# If you don't need "chatwoot" app - explicity specify apps to enable
WAHA_APPS_ON=calls
```
- Restart WAHA server
```bash 
docker compose up -d
```

- Create an app using [**📊 Dashboard**]({{< relref "/docs/how-to/dashboard" >}}) or API below

## API
You can use [**🧩 Apps API**]({{< relref "/docs/apps/about#api" >}}) or [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions#apps" >}}) API endpoints.

```http request
POST /api/apps
```

{{< callout context="tip" title="Latest Config in Swagger" icon="outline/article" >}}
You can find latest `CallsAppConfig` in [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}).
{{< /callout >}}

```json
{
  "app": "calls",
  "session": "{session}",
  "id": "app_{session}",
  "config": {
    "dm": {
      "reject": true,
      "message": "📞❌ We don't take calls right now.\n🎤 Please send a voice message or 📝 text — we'll reply ASAP!"
    },
    "group": {
      "reject": true,
      "message": "📞❌ We don't take calls right now.\n🎤 Please send a voice message or 📝 text — we'll reply ASAP!"
    }
  }
}
```