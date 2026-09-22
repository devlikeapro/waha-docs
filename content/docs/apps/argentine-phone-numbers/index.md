---
title: "Phone Numbers: Argentina"
description: "Phone Numbers: Argentina App"
lead: "Phone Numbers: Argentina App"
date: 2026-09-16T00:00:00+00:00
lastmod: 2026-09-16T00:00:00+00:00
draft: false
weight: 307
images: []
toc: true
---

🇦🇷 **Argentine mobile numbers** (country code **54**) are registered on **WhatsApp** with a **9** after the country code:
`5491112345678`, while integrations often have them as `541112345678` - without the `9`.

If you send a message to the wrong form - the request fails or the message goes nowhere.

The app **automatically resolves the right number** before sending, so you can send messages
to Argentine numbers **with or without the 9** - no changes on your side.

{{< callout context="tip" title="Built on Phone Numbers" icon="outline/article" >}}
The app is the [**📱 Phone Numbers**]({{< relref "/docs/apps/phone-numbers" >}}) app with the Argentine rules included -
same config and cache API. Use that one for other countries or custom rules.
{{< /callout >}}

## How it works
When you call **send message** APIs with an Argentine number in `chatId` (`54` + area code + number, with or without the `9`),
the app checks the **supplied form first** and then the other one, going through the tiers below - cheapest first:

1. **In-memory cache** - previously resolved numbers.
2. **Persistent cache** - verified resolutions saved in the database.
3. **Local contacts** - the number is matched against the session's contact and LID store.
4. **WhatsApp lookup** - asks WhatsApp servers which form exists (can be turned off with `lookup: false`).

Other APIs (typing, mark as read, group operations, etc.) resolve using local tiers only - they never call WhatsApp lookup and never fail.

## Installation
- Configure env variables
```bash {title=".env"}
WAHA_APPS_ENABLED=True
# If you don't need other apps - explicitly specify apps to enable
#WAHA_APPS_ON=argentine-phone-numbers
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
You can find latest `ArgentinePhoneNumbersAppConfig` in [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}).
{{< /callout >}}

```json
{
  "app": "argentine-phone-numbers",
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
GET /api/apps/argentine-phone-numbers/{session}/cache/stats
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
GET /api/apps/argentine-phone-numbers/{session}/cache/memory?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "key": "541112345678",
    // Empty string is a confirmed-negative - the number is verified NOT to exist on WhatsApp
    "chatId": "5491112345678@c.us",
    // null when the entry has no TTL
    "expiresAt": "2026-08-28T00:00:00.000Z"
  }
]
```

### List persistent cache
Entries from the persistent (database) cache tier, sorted by id -
works even when the session is **stopped** (`422` if `cache.persistent` is disabled):

```http request
GET /api/apps/argentine-phone-numbers/{session}/cache/db?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "id": 1,
    "key": "541112345678",
    "chatId": "5491112345678@c.us",
    "verified": true,
    "resolvedAt": "2026-08-27T00:00:00.000Z"
  }
]
```

### Purge cache
Removes **ALL** persistent cache entries and clears the in-memory tier
(the in-memory tier only when the session is running):

```http request
DELETE /api/apps/argentine-phone-numbers/{session}/cache/purge
```

```jsonc { title="Response" }
{
  // Number of entries removed from the persistent cache
  "deleted": 10
}
```

Thanks to [ropu](https://github.com/ropu) for the [original implementation](https://github.com/devlikeapro/waha/pull/2260).
