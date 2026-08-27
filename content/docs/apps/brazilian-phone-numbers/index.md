---
title: "Brazilian Phone Numbers"
description: "Brazilian Phone Numbers App"
lead: "Brazilian Phone Numbers App"
date: 2026-08-26T00:00:00+00:00
lastmod: 2026-08-26T00:00:00+00:00
draft: false
weight: 305
images: []
toc: true
---

🇧🇷 **Brazilian phone numbers** (country code **55**) have a tricky **9th digit**:
mobile numbers were migrated from 8 to 9 local digits (adding a leading `9` after the area code, DDD),
but on **WhatsApp** an account can still be registered with **either** form.

If you send a message to `5531988887777` while the account is registered as `553188887777` (or vice versa) -
the message goes to the wrong chat or nowhere at all.

The app **automatically resolves the right number** before sending, so you can send messages
to Brazilian numbers **with or without the 9th digit** - no changes on your side.

## How it works
When you call **send message** APIs with a Brazilian number in `chatId`, the app resolves the registered form
going through the tiers below - cheapest first:

1. **In-memory cache** - previously resolved numbers.
2. **Static rules** - deterministic cases that need no lookup:
  - **DDD < 31** (São Paulo and nearby regions) - mobile numbers always use the 9-digit form, the `9` is added automatically.
  - **0800 toll-free numbers** - `08000464636` is stored as `558000464636` on WhatsApp, rewritten automatically.
3. **Persistent cache** - verified resolutions saved in the database.
4. **Local contacts** - the number is matched against the session's contact and LID store.
5. **WhatsApp lookup** - asks WhatsApp servers which form exists (can be turned off with `lookup: false`).

Other APIs (typing, mark as read, group operations, etc.) resolve using local tiers only - they never call WhatsApp lookup and never fail.

## Installation
- Configure env variables
```bash {title=".env"}
WAHA_APPS_ENABLED=True
# If you don't need other apps - explicitly specify apps to enable
WAHA_APPS_ON=brazilian-phone-numbers
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
You can find latest `BrazilianPhoneNumbersAppConfig` in [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}).
{{< /callout >}}

```json
{
  "app": "brazilian-phone-numbers",
  "session": "{session}",
  "id": "app_{session}",
  "config": {
    "strict": false,
    "lookup": true,
    "cache": {
      "memoryTtl": "24h",
      "persistent": true,
      "persistentTtl": "31d"
    }
  }
}
```

- `strict` - what to do when the number is confirmed **NOT** on WhatsApp:
  - `false` (default) - warn in logs and send to the best-guess number anyway.
  - `true` - reject the request with `422` error.
- `lookup` - allow asking WhatsApp servers for numbers that local tiers can't resolve.
  When `false`, unresolved numbers are sent as provided.
- `cache.memoryTtl` - how long to keep resolved numbers in memory (duration format - `30m`, `24h`, `7d`).
- `cache.persistent` - save **verified** resolutions in the database so they survive restarts.
  Unverified guesses and negatives are never saved.
- `cache.persistentTtl` - how long to keep resolved numbers in the database.

## Cache API
The app also exposes endpoints to monitor and clean up the resolved-numbers cache.
All endpoints require the app to be **enabled** for the session.

### Get cache stats
Stats for both cache tiers:

```http request
GET /api/apps/brazilian-phone-numbers/{session}/cache/stats
```

```jsonc { title="Response" }
{
  // null when the session is not running
  "memory": {
    "total": 100
  },
  // null when the persistent cache is disabled
  "db": {
    "total": 100,
    "verified": 90
  }
}
```

### List in-memory cache
Entries from the in-memory cache tier of the **running** session, sorted by key
(`422` if the session is not running):

```http request
GET /api/apps/brazilian-phone-numbers/{session}/cache/memory?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "key": "553188887777",
    // Empty string is a confirmed-negative - the number is verified NOT to exist on WhatsApp
    "chatId": "5531988887777@c.us",
    // null when the entry has no TTL
    "expiresAt": "2026-08-28T00:00:00.000Z"
  }
]
```

### List persistent cache
Entries from the persistent (database) cache tier, sorted by id -
works even when the session is **stopped** (`422` if `cache.persistent` is disabled):

```http request
GET /api/apps/brazilian-phone-numbers/{session}/cache/db?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "id": 1,
    "key": "553188887777",
    "chatId": "5531988887777@c.us",
    "verified": true,
    "resolvedAt": "2026-08-27T00:00:00.000Z"
  }
]
```

### Purge cache
Removes **ALL** persistent cache entries and clears the in-memory tier
(the in-memory tier only when the session is running):

```http request
DELETE /api/apps/brazilian-phone-numbers/{session}/cache/purge
```

```jsonc { title="Response" }
{
  // Number of entries removed from the persistent cache
  "deleted": 10
}
```
