---
title: "Phone Numbers"
description: "Phone Numbers App"
lead: "Phone Numbers App"
date: 2026-09-16T00:00:00+00:00
lastmod: 2026-09-16T00:00:00+00:00
draft: false
weight: 305
images: []
toc: true
---

📱 **WhatsApp** may know a phone number under a **different form** than the one you send to:
a mobile prefix that is required or not (🇦🇷 `54...` vs `549...`, 🇲🇽 `52...` vs `521...`),
an extra digit (🇧🇷 the 9th digit) or an account that is only reachable by its **LID**.
Sending to the wrong form fails or the message goes nowhere.

The app **resolves the number to the chat id WhatsApp knows** before sending - for **any country**,
with optional **regexp rules** for numbers that may exist in more than one form.

{{< callout context="tip" title="Ready-made country apps" icon="outline/article" >}}
[**🇧🇷 Phone Numbers: Brazil**]({{< relref "/docs/apps/brazilian-phone-numbers" >}}),
[**🇦🇷 Phone Numbers: Argentina**]({{< relref "/docs/apps/argentine-phone-numbers" >}}) and
[**🇲🇽 Phone Numbers: Mexico**]({{< relref "/docs/apps/mexican-phone-numbers" >}}) are built on this app
with the country logic included - same config and cache API.
{{< /callout >}}

## How it works
When you call **send message** APIs with a phone number in `chatId`, the app checks the **rules** - the first matching rule
handles the number - and resolves it going through the tiers below, cheapest first:

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
#WAHA_APPS_ON=phone-numbers
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
You can find latest `PhoneNumbersAppConfig` in [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}).
{{< /callout >}}

```json
{
  "app": "phone-numbers",
  "session": "{session}",
  "id": "app_{session}",
  "config": {
    "rules": [
      {
        "regexp": "^52(\\d{10})$",
        "replace": "521$1"
      }
    ],
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

- `rules` - which numbers to handle, the **first matching rule wins**. **No rules - every number is resolved**.
  - `regexp` - matched against the **digits only** (no `+`, no `@c.us`).
  - `replace` - optional, also check the replaced form (`regexp` + `replace` work like `String.replace`).
- `strict` - what to do when the number is confirmed **NOT** on WhatsApp:
  - `false` (default) - warn in logs and send to the best-guess number anyway.
  - `true` - reject the request with `422` error.
- `lookup` - allow asking WhatsApp servers for numbers that local tiers can't resolve.
  When `false`, unresolved numbers are sent as provided.
- `cache.memoryTtl` - how long to keep resolved numbers in memory (duration format - `30m`, `24h`, `7d`).
- `cache.persistent` - save **verified** resolutions in the database so they survive restarts.
  Unverified guesses and negatives are never saved.
- `cache.persistentTtl` - how long to keep resolved numbers in the database.

### Rules examples
Every number - any country, resolve to the form WhatsApp knows:
```json
{ "rules": [] }
```

🇲🇽 Mexico - accounts registered before 2019 still have the `1` after the country code
(the same as the [**Phone Numbers: Mexico**]({{< relref "/docs/apps/mexican-phone-numbers" >}}) app):
```json
{
  "rules": [
    { "regexp": "^52([2-9]\\d{9})$", "replace": "521$1" },
    { "regexp": "^521(\\d{10})$", "replace": "52$1" }
  ]
}
```

🇦🇷 Argentina - mobiles have `9` after the country code, callers send either form
(the same as the [**Phone Numbers: Argentina**]({{< relref "/docs/apps/argentine-phone-numbers" >}}) app):
```json
{
  "rules": [
    { "regexp": "^54([1-3]\\d{9})$", "replace": "549$1" },
    { "regexp": "^549([1-3]\\d{9})$", "replace": "54$1" }
  ]
}
```

Only some countries - other numbers are sent as is:
```json
{ "rules": [{ "regexp": "^(52|54)" }] }
```

## Cache API
The app also exposes endpoints to monitor and clean up the resolved-numbers cache.
All endpoints require the app to be **enabled** for the session.

### Get cache stats
Stats for both cache tiers:

```http request
GET /api/apps/phone-numbers/{session}/cache/stats
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
GET /api/apps/phone-numbers/{session}/cache/memory?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "key": "521234567890",
    // Empty string is a confirmed-negative - the number is verified NOT to exist on WhatsApp
    "chatId": "5211234567890@c.us",
    // null when the entry has no TTL
    "expiresAt": "2026-08-28T00:00:00.000Z"
  }
]
```

### List persistent cache
Entries from the persistent (database) cache tier, sorted by id -
works even when the session is **stopped** (`422` if `cache.persistent` is disabled):

```http request
GET /api/apps/phone-numbers/{session}/cache/db?limit=100&offset=0
```

```jsonc { title="Response" }
[
  {
    "id": 1,
    "key": "521234567890",
    "chatId": "5211234567890@c.us",
    "verified": true,
    "resolvedAt": "2026-08-27T00:00:00.000Z"
  }
]
```

### Purge cache
Removes **ALL** persistent cache entries and clears the in-memory tier
(the in-memory tier only when the session is running):

```http request
DELETE /api/apps/phone-numbers/{session}/cache/purge
```

```jsonc { title="Response" }
{
  // Number of entries removed from the persistent cache
  "deleted": 10
}
```
