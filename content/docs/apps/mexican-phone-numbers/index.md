---
title: "Phone Numbers: Mexico"
description: "Phone Numbers: Mexico App"
lead: "Phone Numbers: Mexico App"
date: 2026-09-17T00:00:00+00:00
lastmod: 2026-09-17T00:00:00+00:00
draft: false
weight: 308
images: []
toc: true
---

🇲🇽 **Mexican phone numbers** (country code **52**) changed their dialing rules in **2019**: the `01`, `044`, `045` prefixes
and the `1` after `+52` for mobiles were dropped, every number is now `52` + 10 digits.
**WhatsApp** still keeps accounts registered before that under the old form - with the `1` after the country code:
`5215512345678`, while integrations have them as `525512345678`.

If you send a message to the wrong form - the request fails or the message goes nowhere.

The app **automatically resolves the right number** before sending, so you can send messages
to Mexican numbers **with or without the 1** - no changes on your side.

{{< callout context="tip" title="Built on Phone Numbers" icon="outline/article" >}}
The app is the [**📱 Phone Numbers**]({{< relref "/docs/apps/phone-numbers" >}}) app with the Mexican rules included -
same config and cache API. Use that one for other countries or custom rules.
{{< /callout >}}

## How it works
When you call **send message** APIs with a Mexican number in `chatId` (`52` + 10 digits, with or without the `1`),
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
#WAHA_APPS_ON=mexican-phone-numbers
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
You can find latest `MexicanPhoneNumbersAppConfig` in [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}).
{{< /callout >}}

```json
{
  "app": "mexican-phone-numbers",
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
GET /api/apps/mexican-phone-numbers/{session}/cache/stats
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
GET /api/apps/mexican-phone-numbers/{session}/cache/memory?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "key": "525512345678",
    // Empty string is a confirmed-negative - the number is verified NOT to exist on WhatsApp
    "chatId": "5215512345678@c.us",
    // null when the entry has no TTL
    "expiresAt": "2026-08-28T00:00:00.000Z"
  }
]
```

### List persistent cache
Entries from the persistent (database) cache tier, sorted by id -
works even when the session is **stopped** (`422` if `cache.persistent` is disabled):

```http request
GET /api/apps/mexican-phone-numbers/{session}/cache/db?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "id": 1,
    "key": "525512345678",
    "chatId": "5215512345678@c.us",
    "verified": true,
    "resolvedAt": "2026-08-27T00:00:00.000Z"
  }
]
```

### Purge cache
Removes **ALL** persistent cache entries and clears the in-memory tier
(the in-memory tier only when the session is running):

```http request
DELETE /api/apps/mexican-phone-numbers/{session}/cache/purge
```

```jsonc { title="Response" }
{
  // Number of entries removed from the persistent cache
  "deleted": 10
}
```
