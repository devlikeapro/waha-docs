---
title: "WAHA 2026.8 - Extend WAHA, Group Join Requests, Stickers"
description: "WAHA 2026.8 - Extend WAHA, Group Join Requests, Stickers and more!"
excerpt: "WAHA 2026.8 - Extend WAHA, Group Join Requests, Stickers and more!"
date: 2026-09-01T00:00:00+00:00
draft: false
images: [ "waha-2026-8.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-8
---

## 🛠️ Extend WAHA - Apps, Modules, Plugins

Want to add your own functionality to **WAHA** - an integration with an external product,
a region-specific behavior, a metric, a low-level tweak in the message flow?

We've documented **how to extend WAHA** - four extension layers,
ordered from the most preferred to the last resort - pick the **highest layer that fits**:

- [**🧩 Apps**]({{< relref "/docs/how-to/development#-apps" >}}) - new functionality on top of WAHA, attached per session - like [**ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}) or [**Brazilian Phone Numbers**]({{< relref "/docs/apps/brazilian-phone-numbers" >}}).
- [**📦 Modules**]({{< relref "/docs/how-to/development#-modules" >}}) - a product-wide capability, enabled and configured via environment variables - like Prometheus metrics or Webhooks.
- [**🔌 Plugins**]({{< relref "/docs/how-to/development#-plugins" >}}) - a low-level tweak of how requests and events flow through a session.
- [**🏭 Engines**]({{< relref "/docs/how-to/development#-engines" >}}) - a new core WhatsApp feature or an engine fix.

The guide builds the same **Message Logger** feature at every layer, with real code -
folder structure, registration points, lifecycle hooks, migrations and the Dashboard part.

Right now extending WAHA means sending a **pull request to the official WAHA** -
a PR that keeps its changes inside an app, a module or a plugin gets reviewed fast and is likely to be accepted.

Later we're planning a more extensive way to contribute, like **n8n community nodes**:
you publish a `@{scope}/waha-app-{name}` or `waha-module-{name}` npm package,
and **WAHA** discovers and enables it **automatically**.

Read more: [**🛠️ Development**]({{< relref "/docs/how-to/development#extending-waha" >}})

## 🧩 Apps: Brazilian Phone Numbers

Brazilian numbers (country code **55**) have the **9th digit** problem -
the same contact exists with and without the extra `9`, so messages end up in the wrong chat or get no reply at all.

Attach the new **Brazilian Phone Numbers** app to a session, and **WAHA** resolves the correct chat id automatically
before sending. It's also a small **reference app** to look at if you're building your own.

Read more: [**Brazilian Phone Numbers**]({{< relref "/docs/apps/brazilian-phone-numbers" >}}) — [#2180](https://github.com/devlikeapro/waha/pull/2180)

## 👥 Group Join Requests

You can now manage groups where **admins must approve new members** - read and update the setting via API:

```http request
PUT /api/{session}/groups/{groupId}/settings/security/membership-approval
```

```jsonc { title="Body" }
{
  // true - admins must approve requests to join the group
  // false - anyone can join the group
  "newMembersApprovalRequired": true
}
```

List the pending requests, then approve or reject them:

```http request
GET /api/{session}/groups/{groupId}/participants/join-requests
```

```http request
POST /api/{session}/groups/{groupId}/participants/join-requests/approve
```

```http request
POST /api/{session}/groups/{groupId}/participants/join-requests/reject
```

And there's a new **group.v2.participants.join-request** event when a request is created, rejected or revoked -
so you can build auto-approval flows:

```jsonc { title="group.v2.participants.join-request" }
{
  "event": "group.v2.participants.join-request",
  "session": "default",
  "payload": {
    "group": {
      "id": "123456789@g.us"
    },
    "action": "created",
    "requesterId": "123456789@lid",
    "requesterPn": "123456789@c.us",
    "requestMethod": "invite_link",
    "timestamp": 1666943582
  }
}
```

Read more: [**👥 Groups**]({{< relref "/docs/how-to/groups#join-requests" >}}) — [#2200](https://github.com/devlikeapro/waha/issues/2200)

## 📤 Send Stickers

You can now send **stickers**:

```http request
POST /api/sendSticker
```

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "image/webp",
    "url": "https://www.gstatic.com/webp/gallery/1.webp"
  }
}
```

The file must already be in **WebP** format (via URL or BASE64) - PNG and JPEG are not converted.

Read more: [**📤 Send messages**]({{< relref "/docs/how-to/send-messages#send-sticker" >}}) — [#1287](https://github.com/devlikeapro/waha/issues/1287)

## 🔍 Observability - Prometheus

**WAHA** can now expose **Prometheus** metrics - sessions and their statuses, engine and build info.
The endpoint is disabled by default - enable it with an env var:

```bash { title=".env" }
WAHA_PROMETHEUS_ENABLED=True
# Optional:
# WAHA_PROMETHEUS_PATH=/metrics
# WAHA_PROMETHEUS_METRIC_PREFIX=waha_
# WAHA_PROMETHEUS_TRACK_EVENTS=message.any
# WAHA_PROMETHEUS_HTTP_DURATION_BUCKETS=0.005,0.01,0.025,0.05,0.1,0.25,0.5,1,2.5,5,10,30
# WAHA_PROMETHEUS_USERNAME=admin
# WAHA_PROMETHEUS_PASSWORD=secret
```

```http request
GET /metrics
```

Read more: [**🔍 Observability**]({{< relref "/docs/how-to/observability#prometheus-metrics" >}}) — [#2245](https://github.com/devlikeapro/waha/pull/2245)

## 🔎 Observability - Tracing

**WAHA** now uses **OpenTelemetry** trace context to correlate logs with HTTP requests:
every log line gets `trace_id` and `span_id` fields, and every HTTP response carries a `traceparent` header,
so you can find all the logs for a single API call
(if the client sends its own `traceparent` - WAHA continues that trace).
There's no exporter and no extra infrastructure - it's enabled by default:

```text { title="Response header" }
traceparent: 00-b992d8568c2ea3d2d3b135cc0cd322a6-4e4d4694dcbc1938-01
```

Read more: [**🔍 Observability**]({{< relref "/docs/how-to/observability#tracing" >}})

## 📈 Message Capping and Timelock

WhatsApp enforces a **per-cycle quota** on how many **new contacts** an account may message -
once the account is capped, sends fail with `server returned error 475` while the session looks perfectly fine.

**WAHA** now exposes the **Message Capping** state - fetch the current quota from WhatsApp on demand:

```http request
GET /api/sessions/{session}/capping
```

```jsonc { title="Response" }
{
  "cappingStatus": "FIRST_WARNING",
  "totalQuota": 1000,
  "usedQuota": 640,
  "cycleStart": 1782874800,
  "cycleEnd": 1785553199
}
```

You also get it in the `me.messageCapping` field and in `session.status` events when the state changes.

The [**⏳ Reachout Timelock**]({{< relref "/docs/how-to/sessions#reachout-timelock" >}}) from 2026.7
got the same on-demand endpoint (**GOWS**, **NOWEB**, **WEBJS**),
and **GOWS** now refreshes the timelock state right when a send fails with error `463`:

```http request
GET /api/sessions/{session}/timelock
```

Read more: [**⚙️ Sessions**]({{< relref "/docs/how-to/sessions#message-capping" >}}) — [#2186](https://github.com/devlikeapro/waha/issues/2186), [#2219](https://github.com/devlikeapro/waha/issues/2219)

## 🖼️ Media Download Control

You can now control media downloading **separately** for events (webhooks, websockets) and API calls -
globally via env vars, per mimetype, and per request with query parameters:

```bash { title=".env" }
WAHA_EVENTS_DOWNLOAD_MEDIA=true
WAHA_EVENTS_DOWNLOAD_MEDIA_MIMETYPES=audio,image/png
WAHA_API_DOWNLOAD_MEDIA=true
WAHA_API_DOWNLOAD_MEDIA_MIMETYPES=image
```

When media is not downloaded, you still get `hasMedia: true` and the `media` attributes
(`mimetype`, `filename`) - only `media.url` is `null`.

Read more: [**⚙️ Configuration**]({{< relref "/docs/how-to/config#media-download" >}}) — [#2211](https://github.com/devlikeapro/waha/issues/2211)

## 🧩 Apps Updates

- **Purge API** - delete an app's stored data but keep the app configured:

```http request
POST /api/apps/{id}/purge
```

- **Purge on logout** - `POST /api/sessions/{session}/logout` accepts `{"apps": {"purge": true}}` to purge apps' storage on logout.
- **Unique apps** - one instance per session for **ChatWoot**, **Reject Calls** and **Brazilian Phone Numbers**.

Read more: [**🧩 Apps**]({{< relref "/docs/apps/about#purge-app-storage" >}})

## 🆕 Changelog

Check out the full list of updates in the [**🆕 WAHA 2026.8 Changelog**]({{< relref "/docs/overview/changelog#20268" >}}) and stay tuned for more!
