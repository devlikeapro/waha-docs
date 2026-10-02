---
title: "WAHA 2026.9 - Phone Numbers Apps, Chatwoot Message Status, Group History"
description: "WAHA 2026.9 - Phone Numbers Apps for any country, delivered and read ticks in Chatwoot, group history sharing and more!"
excerpt: "WAHA 2026.9 - Phone Numbers Apps for any country, delivered and read ticks in Chatwoot, group history sharing and more!"
date: 2026-10-02T00:00:00+00:00
draft: false
images: [ "waha-2026-9.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-9
---

## 📱 Phone Numbers Apps

WhatsApp may know a number in a **different form** than the one you send to -
a mobile prefix that's required or not (🇦🇷 `54...` vs `549...`, 🇲🇽 `52...` vs `521...`), an extra digit (🇧🇷 the 9th one) -
and the message goes nowhere.

Last month we shipped **Brazilian Phone Numbers**. This month the idea is generalized into a family of apps:

- [**📱 Phone Numbers**]({{< relref "/docs/apps/phone-numbers" >}}) - resolve numbers of **any country** with your own **regexp rules**.
- [**🇦🇷 Phone Numbers: Argentina**]({{< relref "/docs/apps/argentine-phone-numbers" >}}) - the mobile `9` - thanks to [ropu](https://github.com/ropu)! — [#2260](https://github.com/devlikeapro/waha/pull/2260)
- [**🇲🇽 Phone Numbers: Mexico**]({{< relref "/docs/apps/mexican-phone-numbers" >}}) - the old `1` after the country code.
- [**🇧🇷 Phone Numbers: Brazil**]({{< relref "/docs/apps/brazilian-phone-numbers" >}}) - the 9th digit.

Attach the app to a session and **WAHA** resolves the number to the chat id WhatsApp knows **before sending** -
in `chatId` of send requests and in mentions - so you keep sending to the number you have in your CRM.

The country apps need **no config** at all. The generic **Phone Numbers** app takes **regexp rules** -
the first matching rule wins, and with no rules every number is simply checked against WhatsApp:

```http request
POST /api/apps
```

```jsonc { title="Body" }
{
  "app": "phone-numbers",
  "session": "default",
  "config": {
    "rules": [
      // Mexico - accounts registered before 2019 still have the "1" after the country code
      { "regexp": "^52([2-9]\\d{9})$", "replace": "521$1" },
      { "regexp": "^521(\\d{10})$", "replace": "52$1" }
    ]
  }
}
```

When a number is confirmed **not** to exist on WhatsApp, the app warns and sends the best guess anyway -
set `strict: true` to reject such sends with `422` instead.

Resolutions are cached in memory and in the database, and every app has a **cache API** to inspect and purge them:

```http request
GET /api/apps/phone-numbers/{session}/cache/stats
```

Each country app is the **Phone Numbers** app plus a few dozen lines of rules - if your country has the same problem,
that's the template to copy, and the [**🛠️ Development**]({{< relref "/docs/how-to/development#-apps" >}}) guide
shows how to build and register your own app.

Read more: [**📱 Phone Numbers**]({{< relref "/docs/apps/phone-numbers" >}})

## 🧩 ChatWoot - Delivered and Read Ticks

Messages agents send from **Chatwoot** now show WhatsApp **delivered** and **read** ticks right in the conversation.

It's on by default for apps created from the **Dashboard**; for apps created via API set
`conversations.syncMessageStatus: true`. Direct chats only - a message with attachments is updated once every part
is delivered or read. — [#2264](https://github.com/devlikeapro/waha/issues/2264)

More **Chatwoot** updates:

- **Outgoing messages** - messages you send from the WhatsApp app or API show up as **private notes** (default)
  or as **regular outgoing messages**, as if an agent sent them: `conversations.outgoing: private-note | message`. — [#2249](https://github.com/devlikeapro/waha/issues/2249)
- **Contact names** - update names of existing Chatwoot contacts from your phone book:
  `wa/contacts pull --update-names no|if-raw|always`. — [#1245](https://github.com/devlikeapro/waha/issues/1245)
- Deleting a message with attachments in Chatwoot now deletes **every part** in WhatsApp, not only the last one.

Read more: [**🧩 ChatWoot**]({{< relref "/docs/apps/chatwoot#message-status" >}})

## 👥 Groups - Share Message History

Control who can share the group's message history with new members - **all members** or **admins only**:

```http request
PUT /api/{session}/groups/{groupId}/settings/security/member-share-history-mode
```

```jsonc { title="Body" }
{
  "membersCanShareHistory": true
}
```

`GET` on the same path returns the current setting. Not available on **WPP**. — [#2282](https://github.com/devlikeapro/waha/issues/2282), [#2283](https://github.com/devlikeapro/waha/issues/2283)

Read more: [**👥 Groups**]({{< relref "/docs/how-to/groups#security---share-message-history-with-new-members" >}})

## 🛠️ Other Fixes

**WEBJS**
- Sending media failing with `Data passed to getter must include an id property`. — [#2271](https://github.com/devlikeapro/waha/issues/2271), [#2273](https://github.com/devlikeapro/waha/issues/2273)
- Joining a group via invite link, getting and subscribing to presence returning `500` on current WhatsApp Web, missing `presence.update` events. — [#2262](https://github.com/devlikeapro/waha/pull/2262)
- Forward message, create group, get and revoke group invite code, set profile name. — [#2278](https://github.com/devlikeapro/waha/issues/2278)

**NOWEB**
- Delete and edit media caption for channel messages. — [#2038](https://github.com/devlikeapro/waha/issues/2038), [#2284](https://github.com/devlikeapro/waha/pull/2284)
- Downloading `interactiveMessageTemplate` failing with `"templateMessage" message is not a media message`. — [#2275](https://github.com/devlikeapro/waha/issues/2275)
- Messages from history sync now have image thumbnails for newly linked sessions - Dashboard chat thumbnails work too.
- Update contact. — [#2285](https://github.com/devlikeapro/waha/issues/2285)

**GOWS**
- Some group messages were saved without content and missing from chat messages. — [#2289](https://github.com/devlikeapro/waha/issues/2289)
- Clearing a group description with an empty string hung. — [#2257](https://github.com/devlikeapro/waha/issues/2257)
- Update contact.

**NOWEB** and **GOWS** - downloading media that expired on WhatsApp servers now asks the phone to **re-upload** it instead of failing.

**Core**
- Setting an empty group subject returns `400` instead of hanging. — [#2257](https://github.com/devlikeapro/waha/issues/2257)
- Sending a poll with empty or duplicate options returns `400`.

**📊 Dashboard**
- Chat not refreshing on new messages (`@lid` vs `@c.us` chats).

## 🆕 Changelog

Check out the full list of updates in the [**🆕 WAHA 2026.9 Changelog**]({{< relref "/docs/overview/changelog#20269" >}}) and stay tuned for more!
