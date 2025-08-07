---
title: "WAHA 2025.2"
description: "WAHA 2025.2 - Search Channels API, Profile API and more! 🎉"
excerpt: "WAHA 2025.2 - Search Channels API, Profile API and more! 🎉"
date: 2025-02-27T08:48:45+00:00
draft: false
images: ["waha-2025-2.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-2025-2
---

🎉 We are thrilled to announce the changes we made during the
[**WAHA 2025.2**]({{< relref "/docs/overview/changelog#20252" >}}) 🎉

## 🆔 Profile API

Managing your WhatsApp profile has never been easier.

With the new
[**🆔 Profile API**]({{< relref "/docs/how-to/profile" >}})
, you can customize your profile details!

{{< imgo src="/images/whatsapp/whatsapp-profile.jpg" full="false" >}}

**Retrieve your profile details**

```http request
GET /api/{SESSION}/profile
```

**Set Your Profile Name**

```http request
PUT /api/{session}/profile/name
```

**Set a custom status ("About")**

```http request
PUT /api/{session}/profile/status
```

**Update a profile picture**

```http request
PUT /api/{session}/profile/picture
```

```http request
DELETE /api/{session}/profile/picture
```

## 📢🔎 Search Channels API

{{< callout context="tip" icon="outline/hand-finger-right" >}}
Available in [**➕ WAHA Plus**]({{< relref "waha-plus#plus" >}}) version.
{{< /callout >}}

Discovering public channels is now **effortless** with the
[**📢 Channels - Search API**]({{< relref "/docs/how-to/channels#search-api" >}})!

### Search channels by view

{{< imgo src="/images/whatsapp/channels/channels-views.png" full="false" >}}

You can search **public** (not subscribed yet) channels **by view**:

```http request
POST /api/{session}/channels/search/by-view
```

### Search channels by text

{{< imgo src="/images/whatsapp/channels/channels-text.png" full="false" >}}

You can search **public** (not subscribed yet) channels **by text**:

```http request
POST /api/{session}/channels/search/by-text
```

## 👥 Update Group Picture API

Added [**👥 Set Group Picture API**]({{< relref "/docs/how-to/groups#set-group-picture" >}}) to update the group picture.

**Set Group Picture**
{{< callout context="tip" icon="outline/hand-finger-right" >}}
Available in [**➕ WAHA Plus**]({{< relref "waha-plus#plus" >}}) version.
{{< /callout >}}

```http request
PUT /api/{SESSION}/groups/{ID}/picture
```

- `{SESSION}` - session name
- `{ID}` - group id. Remember to encode `@` symbol - `123123123123%40g.us`

```json { title="Body" }
{
  "file": {
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
  }
}
```

## 👥 Groups API - NOWEB, GOWS

**NOWEB** and **GOWS** engines now support the
[**👥 Groups API**]({{< relref "/docs/how-to/groups" >}})!

{{< include file="content/docs/how-to/groups/features.md" >}}

## 🔄 group.v2.\* events

We added new `group.v2.*` events and made `payload` body **the same** across of all engines!

Check
[**🔄 Webhooks**]({{< relref "/docs/how-to/events" >}}) or
[**👥 Groups API**]({{< relref "/docs/how-to/groups" >}}) for more details.

### group.v2.join

{{< include file="content/docs/how-to/groups/events-group.v2.join.md" >}}

### group.v2.leave

{{< include file="content/docs/how-to/groups/events-group.v2.leave.md" >}}

### group.v2.participants

{{< include file="content/docs/how-to/groups/events-group.v2.participants.md" >}}

### group.v2.update

{{< include file="content/docs/how-to/groups/events-group.v2.update.md" >}}

## And More!

Check out the full list of changes in the
[**WAHA 2025.2**]({{< relref "/docs/overview/changelog#20252" >}}) 🎉
