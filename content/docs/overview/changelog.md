---
title: "🆕 Changelog"
description: "WAHA's changelog"
lead: "You can find here the list of changes made to WAHA."
date: 2020-10-06T08:49:31+00:00
lastmod: 2020-10-06T08:49:31+00:00
draft: false

menu:
  docs:
    parent: "help"
weight: 199
toc: true
---


## Get Notified
If you wish to get **Monthly Summary** about WAHA changes, subscribe to our channels.

{{< callout context="tip" title="You can subscribe on free tier!" icon="outline/rss" >}}
- [**Patreon ->**](https://patreon.com/wa_http_api)
- [**Boosty ->**](https://boosty.to/wa-http-api)
- [**dev.to ->**](https://dev.to/waha)
{{< /callout >}}

If you wish to get **Real-Time Email** about new changes,
you can **Watch Releases** in [**🐙 WAHA GitHub**](https://github.com/devlikeapro/waha)

{{< details "💡 GitHub - How To Subscribe" >}}

Go to [https://github.com/devlikeapro/waha](https://github.com/devlikeapro/waha), click **Watch - Custom**:
{{< imgo src="/images/github/github-watch.png" full="false" >}}

Select **Releases**, click **Apply**:
{{< imgo src="/images/github/github-watch-releases.png" full="false" >}}

You will get notifications about new releases in associated email!

{{< /details >}}
## Releases
Latest Version:
<a href="https://github.com/devlikeapro/waha/releases" target="_blank">
<img alt="GitHub Release" src="https://img.shields.io/github/v/release/devlikeapro/waha">
</a>

{{< callout context="note" icon="outline/info-circle" >}}
Check the [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) page to learn how to update WAHA.
{{< /callout >}}

### 2025.3
`2025.3.1`
- **GOWS** 
  - Enable Link Previews {{< issue 763 >}}
  - Delete Status Message {{< issue 754  >}}
  - Delete Message {{< issue 796  >}}
  - Edit Message {{< issue 797  >}}
  - Reply To Message {{< issue 799  >}}
  - Add `filename` on `/api/sendFile`
- `linkPreviewHighQuality: true` for [**📤 Send messages - Link Preview**]({{< relref "/docs/how-to/send-messages#link-preview" >}})
  - **GOWS**, **NOWEB**
- Add `event.timestamp` to [**🔄 Events**]({{< relref "/docs/how-to/events" >}}) {{< issue 755 >}}
- **NOWEB** - Filter [**📞 Calls**]({{< relref "/docs/how-to/calls" >}}) from `message` event - {{< issue 840 >}}
- Support **disappearing messages** in [**📤 Send messages**]({{< relref "/docs/how-to/send-messages" >}}) - {{< issue 736 >}}
  - **GOWS**, **NOWEB**, **WEBJS**
  - Might require repairing (logout/scan qr) for old chats
- Add `source: api|app` in [**🔄 Events** - message.any]({{< relref "/docs/how-to/events#messageany" >}}) - {{< issue 787 >}}

### 2025.2
`2025.2.8`
- **WEBJS** - fix empty channels {{< issue 832 >}}
- Edit message `linkPreview`  {{< issue 833 >}}

`2025.2.7`
- Add [**👥 Group Picture API**]({{< relref "/docs/how-to/groups#group-picture" >}}) - {{< issue 802 >}}
  - **WEBJS**, **NOWEB**, **GOWS**
  - Picture Update available in [**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}})
- **GOWS** - Add [**👥 Group API**]({{< relref "/docs/how-to/groups" >}}) - {{< issue 825 >}}
- **NOWEB** - Add [**👥 Group Settings API**]({{< relref "/docs/how-to/groups" >}}) - {{< issue 695 >}}, {{< issue 808 >}} 
- Add `exclude=participants` to [**👥 Get All Groups API**]({{< relref "/docs/how-to/groups#get-all-groups" >}}) - {{< issue 242 >}} 
  - **WEBJS**, **NOWEB**, **GOWS**
- **NOWEB** - fix `TypeError: group.participants is not iterable` - {{< issue 810 >}}
- **NOWEB** - disable auto-restart every 30 mins, restart will happen only on socket error - {{< issue 756 >}}

`2025.2.6`
- **NOWEB** + **PostgreSQL** - fix `\u0000 - unsupported Unicode escape sequence` - {{< issue 820 >}}

`2025.2.5`
- **NOWEB** - fix `body: null` or empty `body` in some cases - {{< issue 813 >}}
- **NOWEB** - add `message.revoked` event

`2025.2.4`
- Add [**👥 group.v2 events**]({{< relref "/docs/how-to/groups#events" >}}) 
  - `group.v2.join` - when you join a group
  - `group.v2.leave` - when you leave a group
  - `group.v2.participants` - when someone joins, leaves, get promoted or demoted in a group
  - `group.v2.update` - when group information are updated
  - **WEBJS**, **NOWEB**, **GOWS** engines
  - {{< issue 583 >}}, {{< issue 527 >}}, {{< issue 404 >}}
- **NOWEB** - catch and log unhandled errors  {{< issue 809 >}}
  
`2025.2.3`
- Add [**🆔 Profile API**]({{< relref "/docs/how-to/profile" >}} ) to get and update profile information {{< issue 529 >}} 
  - **WEBJS**, **NOWEB**, **GOWS** engines
- Fix `hasMedia` behaviour - now when you request messages with `downloadMedia=False`, `hasMedia: true` if message has media
  - **WEBJS**, **NOWEB**, **GOWS** engines

`2025.2.2`
- [**📢 Search Public Channels**]({{< relref "/docs/how-to/channels#search-channels-by-view" >}}) API - {{< issue 440 >}}
  - Available in [**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}})
- [**📢 Get Messages (Preview) From Public Channels**]({{< relref "/docs/how-to/channels##get-messages-from-channel-preview" >}}) API
  - Available in [**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}})
- **PostgreSQL** - fix `sorry, too many clients already` in some cases
  - **WEBJS**, **NOWEB**, **GOWS** engines
- **S3** - fix `headers[headerName].trim is not a function` error {{< issue 790 >}}

`2025.2.1`
- **GOWS** - [**👤 Contacts**]({{< relref "/docs/how-to/contacts" >}}) API
- **GOWS** - [**💬 Chats - Get Chats Overview**]({{< relref "/docs/how-to/chats#get-chats-overview" >}}) API
- **GOWS** - [**💬 Chats - Get Messages**]({{< relref "/docs/how-to/chats#get-messages" >}}) API
- **NOWEB** - fix group message error {{< issue 765 >}}, {{< issue 766 >}}
- **GOWS** - fix group message error {{< issue 765 >}}, {{< issue 766 >}}

### 2025.1
[**Release Notes**]({{< relref "/blog/waha-2025-1" >}})

`2025.1.6`
- **WEBJS** - fix send image/video to [**📢 Channels**]({{< relref "/docs/how-to/channels" >}}) - {{< issue 733 >}}

`2025.1.5`
- **GOWS** - add [**📢 Channels**]({{< relref "/docs/how-to/channels" >}}) API
- **GOWS** - add [**🟢 Status (aka Stories) API**]({{< relref "/docs/how-to/status" >}}) API
- **GOWS** - add [**Check Contact exists**]({{< relref "/docs/how-to/contacts" >}}) API

`2025.1.4`
- [**🖥️ Session Storage - PostgresSQL**]({{< relref "/docs/how-to/storages#sessions---postgresql" >}}) - add support for storing sessions in PostgreSQL
  - Available in all [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}})!
- [**🖼️ Media Storage - PostgresSQL**]({{< relref "/docs/how-to/storages#media---postgresql" >}}) - add support for storing media files in PostgreSQL
  - Available in all [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}})!
- [**🗄️ Local Storage**]({{< relref "/docs/how-to/storages" >}}) available in **WAHA Core** now - {{< issue 741 >}}
  - Both **🖥️ Session** and **🖼️ Media** storages
- **S3**, **PostgreSQL** - add `chat-id` metadata {{< issue 717 >}}
- **WEBJS** - remove unnecessary flags for chrome/chromium process to increase stability 
  - {{< issue 685 >}}, {{< issue 714 >}}

`2025.1.3`
- **GOWS** - add [**🏭 GOWS Engine**]({{< relref "/docs/how-to/engines#gows" >}}) beta version (does not support many features yet) 
- Lazy QR code png generation (300+ sessions performance issue)
- Shutdown HTTP server gracefully

`2025.1.2`
- **NOWEB** - fix corrupted sessions {{< issue 731 >}}
- Use atomic write for files (**NOWEB** + media files)

`2025.1.1`
- **NOWEB** - do not save empty creds into file when session stops {{< issue 727 >}}
- **NOWEB** + **MongoDB** - add descending order for messages
- Some timeout fixes

### 2024.12

[**Release Notes**]({{< relref "/blog/waha-2024-12" >}})

`2024.12.6`
- Add [**💬 Get chats overview API**]({{< relref "/docs/how-to/chats#get-chats-overview" >}}) 
  - **WEBJS**, **NOWEB**
  - {{< issue 566 >}}
  - {{< issue 573 >}}
  - {{< issue 701 >}}
- Add [**📊 Chat UI to Dashboard**]({{< relref "/docs/how-to/dashboard#chat-ui" >}}) -
as an example for [**💬 Get chats overview API**]({{< relref "/docs/how-to/chats#get-chats-overview" >}})
- Add [**💬 Get chat picture API**]({{< relref "/docs/how-to/chats#get-chat-picture" >}}) 
- Add `refresh` flag to **Get chat picture** and **Get contact picture** API
- Cache profile picture for 24 hours
- **WEBJS** - fix "Could not get the quoted message" error when replying to a message - {{< issue 576 >}}
- **NOWEB** - Fix `not-authorized` on get profile picture {{< issue 381 >}}

`2024.12.5`
- **NOWEB** - attempt #3 to fix missing messages {{< issue 671 >}}

`2024.12.4`
- Add [**👥 Join Group API**]({{< relref "/docs/how-to/groups#join-group" >}}) - {{< issue 688 >}}

`2024.12.3`
- **NOWEB** - use **NOWEB** engine by default in [devlikeapro/waha-plus:noweb]({{< relref "/docs/how-to/engines#docker-images" >}}) - {{< issue 414 >}}
- **NOWEB** - fix `rate-overlimit` error on groups API {{< issue 462 >}}
- Add pagination to [**👥 Get Groups API**]({{< relref "/docs/how-to/groups#get-all-groups" >}})
- Add [**👥 Refresh Groups API**]({{< relref "/docs/how-to/groups#refresh-groups" >}})

`2024.12.2`
- **NOWEB** - attempt #2 to fix missing messages {{< issue 671 >}}

`2024.12.1`
- **WEBJS** - fix get channel info by id {{< issue 682 >}}
- **WEBJS** - fix channel messages {{< issue 683 >}}

### 2024.11
`2024.11.11`
- **NOWEB** - fix 403 on media message {{< issue 667 >}}
- **WEBJS** - fix channels list and message {{< issue 664 >}}

`2024.11.10`
- **WEBJS** - fix empty groups and participants {{< issue 670 >}} {{< issue 674 >}}

`2024.11.9`
- **NOWEB** - attempt to fix missing messages {{< issue 671 >}}

`2024.11.8`
- **WEBJS** - Fix QR code (set `WAHA_WEBJS_CACHE_TYPE=none` by default) - {{< issue 659 >}}

`2024.11.7`
- **WEBJS** - Add `WAHA_WEBJS_CACHE_TYPE=none` - ability to disable cache for `WEBJS` engine {{< issue 653 >}}, {{< issue 654 >}}
  - [**⚙️ Configuration - WEBJS**]({{< relref "/docs/how-to/config#webjs" >}})
  
`2024.11.6`
- Fix **WAHA Core** version {{< issue 645 >}}

`2024.11.5`
- Add [**📊 Dashboard - Event Monitor**]({{< relref "dashboard#event-monitor" >}}) - observe your events in real-time!
- All [**🔄 Webhooks**]({{< relref "events#webhooks" >}}) features in **WAHA Core** version now: Retries, HMAC, Custom Headers!
- [**🔄 Websockets**]({{< relref "events#websockets" >}}) supports all events now {{< issue 535 >}}
- [**💬 Chats** - **Pin, Unpin message**]({{< relref "/docs/how-to/chats#pin-message" >}}) {{< issue 613>}}
  - **WEBJS**, **NOWEB**
- **NOWEB** - fix `me.pushName` after authentication {{< issue 409 >}}
- Add `engine.event` for debug and troubleshooting

`2024.11.4`
- **NOWEB** - fix many contacts send status issues {{< issue 390 >}}, {{< issue 413 >}}
- **NOWEB** - `contacts` list for [**🟢 Status (aka Stories) API**]({{< relref "docs/how-to/status" >}}) is not required anymore
- **WEBJS** - fix **HTTP ERROR 429** {{<issue 633 >}}

`2024.11.3`
- add `linkPreview` flag in `POST /api/sendText` to disable generating preview for links {{< issue 596 >}}, {{< issue 598 >}}
- Fix "Sqlite: attempt to write to read only database" error {{< issue 628 >}}
- Fix `POST /api/sendVideo` - "TargetCloseError: Protocol error" {{< issue 629 >}}

`2024.11.2`
- **WEBJS** - fix cases when it stops receiving events (message, message.ack, etc)

`2024.11.1`
- Create, Update and Delete [**🏷️ Labels**]({{< relref "docs/how-to/labels" >}}) - {{< issue 607 >}}
  - **WEBJS**, **NOWEB**
- **WEBJS** - Add [**🟢 Status (aka Stories) API**]({{< relref "docs/how-to/status" >}})
  - **NOWEB** related issues: {{< issue 390 >}}, {{< issue 413 >}}. You can **WEBJS** for now to handle such cases for now.
- **NOWEB** + **MongoDB** - fix double message issue - {{< issue 623 >}}


### 2024.10
`2024.10.13`
- **NOWEB** - fix waves issue on voice message {{< issue 621 >}}
- Fix `GET /api/messages` limit {{< issue 620 >}}

`2024.10.12`
- **WEBJS** - fix `FAILED` session (remove `--single-process`)

`2024.10.11`
- **WEBJS** + **MongoDB** - Fix `SingletonLock: File exists` error on launch

`2024.10.10`
- **WEBJS** - Update puppeter and Chrome version
- **WEBJS** - Set window size to 1280x720
- **WEBJS** - Fix `SingletonLock: File exists` error on launch

`2024.10.9`
- Add pagination and filters to [**💬 Chats** - **Get messages from chat**]({{< relref "/docs/how-to/chats#get-messages" >}}) 
  - **WEBJS** can return messages by a single chat
  - **NOWEB** can return messages by a chat or `chatId=all`
  - {{< issue 140 >}}, {{< issue 449 >}}, {{< issue 458 >}}
- Add [**💬 Chats** - **Get message by id**]({{< relref "/docs/how-to/chats#get-message-by-id" >}}) 
  - `GET /api/{session}/chats/{chatId}/messages/{messageId}`
  - {{< issue 159 >}}, {{< issue 484 >}} 
- Add [**💬 Chats** - Pagination]({{< relref "/docs/how-to/chats#pagination" >}})
  - {{< issue 371 >}}
- Add [**👤 Contacts** - Pagination]({{< relref "/docs/how-to/contacts#pagination" >}})
  - {{< issue 371 >}}
- Add [**💬 Chats** - Unread Chat]({{< relref "/docs/how-to/chats#unread-chat" >}})
  - `POST /api/{session}/chats/{chatId}/unread`
  - **WEBJS**, **NOWEB**
  - {{< issue 498 >}}
- **NOWEB** - Fix `/archive` and `/unarchive` chats - [**💬 Chats** - Archive Chat]({{< relref "/docs/how-to/chats#archive-chat" >}})
  - {{< issue 445 >}}
- Remove the device from **Connected Devices** on [**🖥️ Session Logout**]({{< relref "/docs/how-to/sessions#logout-session" >}})
  - **WEBJS**, **NOWEB**
  - {{< issue 148 >}}, {{< issue 327 >}}, {{< issue 194 >}}, {{< issue 211 >}}

`2024.10.8`
- Add `WAHA_LOCAL_STORE_BASE_DIR` to allow overriding the base directory for local storage [#597](https://github.com/devlikeapro/waha/issues/597)

`2024.10.7`
- **WAHA Core** - fix webhooks issue [#595](https://github.com/devlikeapro/waha/issues/595)

`2024.10.6`
- **WEBJS** + **MongoDB** - reduce CPU usage

`2024.10.5`
- Add **Send Buttons** API `POST /api/sendButtons` - [$544](https://github.com/devlikeapro/waha/issues/544)
  - [**📤 Send messages** - Send Buttons]({{<relref "/docs/how-to/send-messages#send-buttons" >}})
  - **NOWEB**
- Add **forward message** API `POST /api/forwardMessage` - [#158](https://github.com/devlikeapro/waha/issues/158)
  - [**📤 Send messages** - Forward Message]({{<relref "/docs/how-to/send-messages#forward-message" >}})
  - **WEBJS**, **NOWEB**
- Fix sessions stuck in `STARTING` on container restart - [#586](https://github.com/devlikeapro/waha/issues/586)
- Add `WAHA_AUTO_START_DELAY_SECONDS=0` environment variable so you can control the delay between sessions
  - [**⚙️ Configuration** - Sessions]({{<relref "/docs/how-to/config#sessions" >}})
- Track session status and do not restart it - [#491](https://github.com/devlikeapro/waha/issues/491) 
- Add workers environment variables: `WAHA_WORKER_ID`, `WAHA_WORKER_RESTART_SESSIONS`
- Add request id in webhooks headers and logs [#580](https://github.com/devlikeapro/waha/issues/580)
  - [**🔄 Webhooks** - Headers]({{< relref "events#headers" >}})
- Add `policy` for webhook retries [#587](https://github.com/devlikeapro/waha/issues/587)
  - [**🔄 Webhooks** - Headers]({{< relref "events#retries" >}})

`2024.10.4`
- **NOWEB** - send video note via `POST /api/sendVideo` via `asNote: true`
- **NOWEB** - handle "sent by advertisement" message properly [#567](https://github.com/devlikeapro/waha/issues/567)
- **NOWEB** + **MongoDB** - save auth data when stopping session (and container)

`2024.10.3`
- **WEBJS** + **MongoDB** - handle removing temp folder with retries
- **WEBJS** - add more logs for state changes to help debugging

`2024.10.2`
- 📢 **WEBJS** + **MongoDB** setup - handle disconnection properly (it stop saving auth data if connection to mongodb lost)

`2024.10.1` - [**Release Notes**]({{< relref "/blog/waha-2024-10" >}})
- Receive **media** now available in **WAHA Core** version!
  - [**📥 Receive messages** - Files]({{<relref "/docs/how-to/receive-messages#files" >}})
- Add `PORT` environment variable for Heroku deployment - [#555](https://github.com/devlikeapro/waha/issues/555)
- Add `WAHA_BASE_URL` environment variable to set the base URL for the server for `media.url` links
- **WEBJS** - Add `message.waiting` event for encrypted but not yet decrypted messages [#554](https://github.com/devlikeapro/waha/issues/554)
  - [**🔄 Webhooks** - message.waiting]({{< relref "events#messagewaiting" >}})
  - [https://faq.whatsapp.com/3398056720476987](https://faq.whatsapp.com/3398056720476987)
- **WEBJS** - handle connectivity issues better, restart client if required [#552](https://github.com/devlikeapro/waha/issues/552)
- Use `axios` as default library for sending webhooks - solve bad webhooks performance issues for many sessions installation.
- Handle webhooks retries properly in **WAHA Plus** version (using `axios`)

### 2024.9

`2024.9.6`
- **NOWEB** - set session presence (`online|offline`) at the start - [#412](https://github.com/devlikeapro/waha/issues/412)
  - Affects notifications on your phone (if it's `online` - you won't get in-app notifications on your device)
- **WEBJS**, **NOWEB** - fix auto restart logic bug
- **WEBJS** - support pairing via code `POST /api/{session}/auth/request-code` 
  - Read more [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions#get-pairing-code" >}}) 
- Retrieve engine info only on detailed `GET /api/sessions/{name}`
- Check session's status before performing the request in most endpoints
- **Dashboard** - add login via **QR** and **Code** auth flows
- **Dashboard, API** - Add `me` for `STOPPED` sessions (account phone number, push name)
- **Dashboard** - Hide duplicated sessions flag for multiple servers setup (match by `session.name+me.id`)

`2024.9.5`
- **NOWEB** - fix memory leak and performance problems [#533](https://github.com/devlikeapro/waha/issues/533)
- **WEBJS** - reduce memory usage for chrome/chromium for ~40MB per session
- Adjust error message for WAHA Core when session `STOPPED` [#538](https://github.com/devlikeapro/waha/issues/538)
- Removed `VENOM` engine completely 
- Add special `/api/server/debug/heapsnapshot` to get heap dump for Node.js by `WAHA_DEBUG_MODE=True`

`2024.9.4`
- Fix empty config sessions operations (`Session not found`)

`2024.9.3`
- **NOWEB** - fix restarting issue when websocket is not connected yet (WebSocket was closed before the connection was established)

`2024.9.2`
- **NOWEB** - fix error on incoming messages - [#521](https://github.com/devlikeapro/waha/issues/521)

`2024.9.1` - [**Release Notes**]({{< relref "/blog/waha-2024-9" >}})
- Add support for **S3** to store media file - [#353](https://github.com/devlikeapro/waha/issues/353)
  - Read more [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}})
- Add more granular API for [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}}) 
  - Dedicated `create, update, delete, start, stop, logout, restart` actions!
  - The old API is working the same way as before for backward compatibility, but marked as **Deprecated**
  - Related issues: [#435](https://github.com/devlikeapro/waha/issues/435), [#480](https://github.com/devlikeapro/waha/issues/480)
- Add ability to add your [**Metadata**]({{< relref "/docs/how-to/sessions#metadata" >}}) to a session [#443](https://github.com/devlikeapro/waha/issues/443). 
  - `metadata` field available in:
    - [List Sessions]({{< relref "/docs/how-to/sessions#list-sessions" >}}) and [Get Session]({{< relref "/docs/how-to/sessions#get-session" >}})  responses
    - [**🔄 Webhooks**]({{< relref "events#metadata" >}}) events
    - [**📊 Dashboard**]({{< relref "dashboard" >}}) for view, and search sessions by metadata
- Add **Bulk Operations** (start, restart, etc.) for [**📊 Dashboard**]({{< relref "dashboard" >}}) - [#438](https://github.com/devlikeapro/waha/issues/438)
- Add environment variables on [**📊 Dashboard**]({{< relref "/docs/how-to/dashboard" >}}) - [#319](https://github.com/devlikeapro/waha/issues/319)
- Add [**🔄 Webhooks - Custom Headers**]({{< relref "/docs/how-to/events#custom-headers" >}}) on [**📊 Dashboard**]({{< relref "/docs/how-to/dashboard" >}})
- Add `GET /api/server/version` and `/api/server/environment` endpoints
  - [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})
- Validate API request on `/api/sessions/*` endpoints - [#470](https://github.com/devlikeapro/waha/issues/470)
  - 📢 **Requires attention** - make sure you're sending the right requests
- Add `POST /api/sendSeen` documentation and correct swagger spec [#485](https://github.com/devlikeapro/waha/issues/485)
- Add `GET /api/server/status` endpoint to **get server uptime** - [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})
- Add `POST /api/server/stop` endpoint to **restart** server - [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})
- Add `WHATSAPP_API_SCHEMA=http` environment variable so you can get the right `media.url` link
- Add `media.error` to messages with media and error - [#510](https://github.com/devlikeapro/waha/issues/510)
- Add `reply_to` field for text and media (image, files, etc) messages - [#503](https://github.com/devlikeapro/waha/issues/503)
  - [**📤 Send messages** - reply_to]({{<relref "/docs/how-to/send-messages#reply_to" >}})
- Add `replyTo` field for receiving message - [#506](https://github.com/devlikeapro/waha/issues/506)
  - [**📥 Receive messages** - replyTo]({{<relref "/docs/how-to/receive-messages#replyto" >}})
- Update **NOWEB** engine to the latest upstream changes

### 2024.8
`2024.8.5`
- **NOWEB** - ⚠️ urgent fix [#511](https://github.com/devlikeapro/waha/issues/511)

`2024.8.4`
- **WEBJS** - fix get `GET /api/{session}/chats?limit=1` "Cannot read properties of undefined (reading 'getChats')" - 
[#486](https://github.com/devlikeapro/waha/issues/486)
- **NOWEB** - fix sticker download - [#504](https://github.com/devlikeapro/waha/issues/504)

`2024.8.3`
- fix restart container with **NOWEB** engine [#483](https://github.com/devlikeapro/waha/issues/483)
- fix " this.logger.info is not a function" in swagger plus [#496](https://github.com/devlikeapro/waha/issues/496)

`2024.8.2`
- fix flaky **WEBJS** engine issues (`Failed to add page binding with name ...`)
- **WEBJS** + **MongoDB** - switch to native `zip` and `unzip` binaries [#465](https://github.com/devlikeapro/waha/issues/465)
  - If you're not using official docker image install `zip` and `unzip` AND set `WAHA_ZIPPER=ZIPUNZIP` env variable.
- Add `WAHA_HTTP_LOG_LEVEL=info` variable to control `request completed` log level - [#466](https://github.com/devlikeapro/waha/issues/466) - [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})

`2024.8.1` - [**Release Notes**]({{< relref "/blog/waha-2024-8" >}})
- Add [**🏷️ Labels**]({{< relref "docs/how-to/labels" >}}) support [#318](https://github.com/devlikeapro/waha/issues/318)
- Add [**📞 Calls**]({{< relref "docs/how-to/calls" >}}) events [#307](https://github.com/devlikeapro/waha/issues/307)
- Add [**chat.archive**]({{< relref "docs/how-to/events#chatarchive" >}}) event [#434](https://github.com/devlikeapro/waha/issues/434)
- Add [**Archive and Unarchive chat endpoints**]({{< relref "docs/how-to/chats" >}})  [#434](https://github.com/devlikeapro/waha/issues/434)
- Add "sessions.name" index for MongoDB storage [#447](https://github.com/devlikeapro/waha/issues/447)
- Add `WHATSAPP_API_KEY_EXCLUDE_PATH` to exclude URI from key auth [#451](https://github.com/devlikeapro/waha/issues/451) - [**🔒 Security**]({{< relref "/docs/how-to/security" >}})
- Add `GET /ping` endpoint to just touch the service (no checks like in `GET /health` is done during that) - [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})

----

### 2024.7

- `2024.7.7` - **WEBJS** + **MongoDB** fix - `unexpected end of file` [#457](https://github.com/devlikeapro/waha/issues/457)
- `2024.7.6` - **WEBJS** restart fix [#444](https://github.com/devlikeapro/waha/issues/444)
- `2024.7.5` - [**📰 WhatsApp Channels**]({{< relref "/docs/how-to/channels" >}})
- `2024.7.4` - **NOWEB** fix profile picture [#422](https://github.com/devlikeapro/waha/issues/422)
- `2024.7.3` - added JSON logging format - [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}}). 
- `2024.7.2` - **WEBJS** create group fix [#416](https://github.com/devlikeapro/waha/issues/416)
- `2024.7.1` - **WEBJS** urgent update [#399](https://github.com/devlikeapro/waha/issues/399)

----

### 2024.6
#### 📢 Breaking changes

----

Docker image has been renamed to `devlikeapro/waha` and `devlikeapro/waha-plus`!
- Read more about [WAHA Docker images]({{< relref "/docs/how-to/engines#docker-images" >}})
- Build: `2024.6.2`

----

***🎉 New***

----

Starting `2026.6.1` we publish images with `{version}` tag, so you can pin the version you want to use.

`devlikeapro/waha-plus:chrome-{version}` => `devlikeapro/waha-plus:chrome-2024.6.1`

- Read more about [WAHA Docker images]({{< relref "/docs/how-to/engines#versions" >}})
- Build: `2024.6.1`

----

Added `limit` and `offset` parameters to `GET /api/{session}/chats` endpoint.

- Read more about [Get all chats]({{< relref "/docs/how-to/chats#get-all-chats" >}})
- Build: `2024.6.4`
- Engine: **WEBJS**
- Engine: **NOWEB**

----

Added Out of the box **HTTPS Support**!

👉 [**Step-by-step guide on how to set up HTTPS for WAHA**]({{< relref "/blog/waha-https" >}})

- Read more about [**🔒 Security**]({{< relref "/docs/how-to/security" >}})
- Build: `2024.6.5`
- Issue: [#42](https://github.com/devlikeapro/waha/issues/42)
- Issue: [#369](https://github.com/devlikeapro/waha/issues/369)

----

Add [Websockets](({{< relref "/docs/how-to/events#websockets" >}})) support!

- Read more about [Websockets]({{< relref "/docs/how-to/events#websockets" >}})
- Build: `2024.6.7`

----

**🎉 New - NOWEB**

----

You asked it, we did it - **contacts, chats, and messages** endpoints are now available in **NOWEB** engine!
Please make sure to [Enable NOWEB Store]({{< relref "/docs/engines/noweb#store" >}}) before using these endpoints.

- Build: `2024.6.3`
- Engine: **NOWEB**
- [Read more about NOWEB Store]({{< relref "/docs/engines/noweb#store" >}})
- Issue [#169](https://github.com/devlikeapro/waha/issues/169)
- Issue [#206](https://github.com/devlikeapro/waha/issues/206)
- Issue [#217](https://github.com/devlikeapro/waha/issues/217)
- Issue [#322](https://github.com/devlikeapro/waha/issues/322)
- Issue [#339](https://github.com/devlikeapro/waha/issues/339)

----

Generate thumbnail preview for video and image messages in **NOWEB** engine.
- Build: `2024.6.3`
- Engine: **NOWEB**

----

Fix sending poll response in **NOWEB** engine.
- Build: `2024.6.1`
- Engine: **NOWEB**
- Issue: [#356](https://github.com/devlikeapro/waha/issues/356)

----

Delete status endpoint - [`POST /api/{session}/status/delete`]({{<relref "/docs/how-to/send-messages#delete-status" >}})

- Build: `2024.6.7`
- Engine: **NOWEB**
- Issue: [#386](https://github.com/devlikeapro/waha/issues/386)

----

**🎉 New - DASHBOARD**

----

Starting `2024.6.3` [Dashboard]({{< relref "/docs/how-to/dashboard" >}}) is available in **WAHA Core** version!

- Read more about [WAHA Dashboard]({{< relref "/docs/how-to/dashboard" >}})
- Build: `2024.6.3`

----

Starting `2024.6.3` [Dashboard]({{< relref "/docs/how-to/dashboard" >}}) allows connecting to **multiple WAHA instances**!

- Read more about [WAHA Dashboard]({{< relref "/docs/how-to/dashboard" >}})
- Build: `2024.6.3`

----

**🐛 Fixes - NOWEB**


Sender presence keeps on typing after sending message. 
- Issue: [#379](https://github.com/devlikeapro/waha/issues/379)
- Build: `2024.6.6`

----

### 2024.5
**🎉 New**

----

Added `WAHA_PRINT_QR` environment variable to control QR code printing (by default `True`). Set `WAHA_PRINT_QR=False` to disable QR code printing.
- Read more about it on [Configuration]({{< relref "/docs/how-to/config" >}})
- Issue: [#351](https://github.com/devlikeapro/waha/issues/351)
- Build: `2024.5.13`

----

[Swagger White Label]({{< relref "/docs/how-to/swagger#white-label" >}}) - show your own brand in the Swagger documentation!
- Read more about [Swagger White Label]({{< relref "/docs/how-to/swagger#white-label" >}})
- Issue: [#305](https://github.com/devlikeapro/waha/issues/305)
- Build: `2024.5.4`

----

**🐛 Fixes**

----

Don't allow to start two sessions with the same name.

Before API allowed to start two sessions with the same name, which could lead to potential problems (no way to stop the first, abandoned session).
- Issue: [#315](https://github.com/devlikeapro/waha/issues/315)
- Read more about [start a session](https://waha.devlike.pro/docs/how-to/sessions/#start)
- Build: `2024.5.3`
- Engine: **ALL**

----

**🐛 Fixes - WEBJS**

Handling rare errors in MongoDB process for saving and restoring session data.
- Build: `2024.5.12`
- Engine: **WEBJS**
- Commit: [9c398f2](https://github.com/devlikeapro/waha-plus/commit/9c398f26f937bf0de2c43ebb1e032c7a766ca8f7)

----

Fix send video issue `POST /api/sendVideo` in **WEBJS**.
- Issue: [#321](https://github.com/devlikeapro/waha/issues/321)
- Issue: [#328](https://github.com/devlikeapro/waha/issues/328)
- Build: `2024.5.9`
- Engine: **WEBJS**

----

Use local cache for **WEBJS** engine (versions file).
- Issue: [#316](https://github.com/devlikeapro/waha/issues/316)
- Build: `2024.5.4`
- Engine: **WEBJS**

----

**🐛 Fixes - NOWEB**

Fix `message.ack` event for viewing status (`status@broadcast`) messages.

- Issue: [#329](https://github.com/devlikeapro/waha/issues/329)
- Build: `2024.5.14`

----

Auto restart **NOWEB** connection every 30 minutes.

- Issue: [#336](https://github.com/devlikeapro/waha/issues/336)
- Build: `2024.5.14`

----

Set heap memory limit to 16GB for **NOWEB** engine.

- Issue: [#347](https://github.com/devlikeapro/waha/issues/347)
- Build: `2024.5.12`

----

Add `body` to messages with caption in **NOWEB** engine.

- Build: `2024.5.10`

----

Fix "document with caption" message media issue

- Issue: [#345](https://github.com/devlikeapro/waha/issues/345)
- Build: `2024.5.10`

----

Important **NOWEB** Engine Update!
WhatsApp has deprecated the version currently being used in the NOWEB engine

- [Read on Patreon](https://www.patreon.com/posts/important-noweb-104631614)
- [Read on Boosty](https://boosty.to/wa-http-api/posts/6ccedda7-ddae-413b-b15f-f2f22192c0d8)
- Build: `2024.5.8`
- Engine: **NOWEB**

----

### 2024.4
**🎉 New**

Add **WAHA Dashboard** - UI to manage your WhatsApp sessions!
- Read more about [Dashboard]({{< relref "/docs/how-to/dashboard" >}})

----

Add `GET /api/sessions/{session}` endpoint to get information about a specific session.
- Read more about [Get session information]({{< relref "/docs/how-to/sessions#get-session" >}})
- Issue: [#300](https://github.com/devlikeapro/waha/issues/300)

----

Implement `GET /api/contacts/profile-picture` for **NOWEB** engine.
- Read more about [Get contact profile picture](https://waha.devlike.pro/docs/how-to/contacts/#get-contact-profile-picture)
- Issue: [#298](https://github.com/devlikeapro/waha/issues/298)

----

### 2024.3
**🎉 New**

----

Add `message.reaction` webhook in **WEBJS** and **NOWEB** engines
- Read more about [message.reaction]({{< relref "/docs/how-to/events#messagereaction" >}}) event
- Issue: [#275](https://github.com/devlikeapro/waha/issues/275)

👉 **NOWEB** engine note - reactions were sent in `'message'` and `'message.any'` events, not it's available **only** in `'message.reaction'`!

----

Add star and unstar message endpoint `PUT /api/star`
- Read [Star and unstar message]({{< relref "/docs/how-to/send-messages#star-and-unstar-message" >}}) documentation
- Issue: [#273](https://github.com/devlikeapro/waha/issues/240)

----

Add `PUT /api/{session}/chats/{chatId}/messages/{messageId}` endpoint to **edit** the message.
- Read more about [Edit message]({{< relref "/docs/how-to/send-messages#edit-message" >}})
- Issue: [#241](https://github.com/devlikeapro/waha/issues/241)

----

Add `DELETE /api/{session}/chats/{chatId}/messages/{messageId}` endpoint to **delete** the message.
- Read more about [Delete message]({{< relref "/docs/how-to/send-messages#delete-message" >}})
- Issue: [#209](https://github.com/devlikeapro/waha/issues/209)

----

Add `POST /api/sendContactVcard` support for **NOWEB** engine.
- Read more about [Send Contact vCard]({{< relref "/docs/how-to/send-messages#send-contact-vcard" >}})
- Issue: [#276](https://github.com/devlikeapro/waha/issues/256)

----

Handles `caption` and `filename` right in `POST /api/sendFile`
- Issue: [#94](https://github.com/devlikeapro/waha/issues/94)
- Issue: [#133](https://github.com/devlikeapro/waha/issues/133)

----

Add security settings for who can send messages `PUT /api/{session}/groups/{groupId}/settings/security/messages-admin-only`
- Read [Security - who can send messages]({{< relref "/docs/how-to/groups##security---who-can-send-messages" >}})
- Issue: [#274](https://github.com/devlikeapro/waha/issues/274)

----

Add `config.debug` field to `POST /api/sessions/start` to enable debug and verbose logs for the session.

----

#### 📢 Breaking changes
- **NOWEB** - reactions were sent in `'message'` and `'message.any'` events, not it's available **only** in `'message.reaction'`!
- Add **required body** in `PUT /api/{session}/groups/{groupId}/settings/security/info-admin-only` endpoint.
```json
{
  "adminsOnly": false
}
```

- `POST /api/sendContactVcard` doesn't work in **VENOM** anymore (use **NOWEB** engine).

### 2024.2
- Add support for [MongoDB as storage for Session data]({{< relref "/docs/how-to/storages" >}})
- Support persistent file storage for media files - [now you can save media files between container restarts]({{< relref "/docs/how-to/storages#media" >}})
- If you set `WHATSAPP_FILES_LIFETIME=0` environment variable - media files will be never deleted.
- Add `GET /api/health` endpoint to [check the health of the service](https://waha.devlike.pro/docs/how-to/observability/)

### 2024.1
- Implement [Patron Portal](https://portal.devlike.pro/) where you can get your personal API key and manage your perks.
  - Read more on [Patreon ->](https://www.patreon.com/posts/waha-patron-97637416)
  - Read more on [Boosty ->](https://boosty.to/wa-http-api/posts/8319079f-dac1-4179-b954-fcc559097c76)

### 2024.2
- Listen for browser disconnected and page close events in **WEBJS** engine [#262](https://github.com/devlikeapro/waha/issues/262)

### 2023.12
December 2023
- Add `chatId` field to `GET /api/contacts/check-exists` to help get the right `chatId` for Brazilian numbers.
Read more about
  [error sending text to half of Brazilian numbers (every number registered before 2012) ->](https://github.com/devlikeapro/waha/issues/238)

### 2023.11
November 2023
- Add different formats for QR code:
  1. **binary image** - `GET /api/{session}/auth/qr`
  2. **base64 image** - `GET /api/{session}/auth/qr` and set `Accept: application/json` header
  3. **raw** - `GET /api/{session}/auth/qr?format=raw`
- Add different formats for the screenshot:
  1. **binary image** - `GET /api/{session}/screenshot`
  2. **base64 image** - `GET /api/{session}/screenshot` and set `Accept: application/json` header
- Add `WHATSAPP_SWAGGER_ENABLED=false` so you can hide Swagger documentation (available only in Plus version). [#185](https://github.com/devlikeapro/waha/issues/185)
- Add dedicated `media` field in webhook payload - now you can know which media is attached to the message.
```json { title="message" }
{
  "event": "message",
  "session": "default",
  "payload": {
    "hasMedia": true,
    "media": {
      "url": "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.pdf",
      "mimetype": "application/pdf",
      "filename": "file.pdf"
    }
  }
}

```
- Add `WHATSAPP_DOWNLOAD_MEDIA` environment variable to control media download. Available only in Plus version.
  - `WHATSAPP_DOWNLOAD_MEDIA=True` - download media
  - `WHATSAPP_DOWNLOAD_MEDIA=False` - do not download media at all.
- Add `filename` field for document (file attachments) - the original filename of the document.
- Add `/api/sendVideo` endpoint to **NOWEB** and **WEBJS** engines. Available only in Plus version.
- Add security settings for edit group info `GET /api/{session}/groups/{groupId}/settings/security/info-admin-only` - updates the group settings to only allow admins to edit group info (title, description, photo).

### 2023.10
October 2023
- Add `session.status` event for all engines! Now you can get the latest session's status immediately after it changes.
- Add `message.revoked` event in **WEBJS** engine
- Add `me` field in webhook payload - now you can know which number is associated with the session
- Add `enviroment` field in webhook payload - now you can know which environment is used for the session

### 2023.9
September 2023
- Add `GET /api/sessions/{session/me` endpoint so you [can get the phone number associated with the session](https://waha.devlike.pro/docs/how-to/sessions/#get-me)
- Add [polls support in NOWEB engine](https://waha.devlike.pro/docs/how-to/polls)
- Add dedicated [Get QR](https://waha.devlike.pro/docs/how-to/sessions/#get-qr) endpoint!
- Support [pairing method (NOWEB)](https://waha.devlike.pro/docs/how-to/sessions/#get-pairing-code) - you can connect with a code instead of QR.
- Add string field `ackName: DEVICE|READ|...` in [message.ack payload](https://waha.devlike.pro/docs/how-to/events/#messageack)
- Support `message.ack` event webhook in **NOWEB** engine

### 2023.8
August 2023
- Added [stories (aka status) endpoints](https://waha.devlike.pro/docs/how-to/send-messages/#send-status-aka-stories) to **NOWEB** engine!
  - `POST /api/{session}/status/text|image|voice|video` - choose one that suites your!
- Added [chats endpoints](https://waha.devlike.pro/docs/how-to/chats)
  - Get all chats - `GET /api/{session/chats`
  - Delete chat - `DELETE /api/{session/chats/{chatId}`
  - Get messages from chat - `GET /api/{session/chats/{chatId}/messages?limit=1000?downloadMedia=true`
  - Clear messages in the chat `DELETE /api/{session/chats/{chatId}/messages`
- Added `downloadMedia` flag to speed up `GET /api/messages` and `GET /api/{session/chats/{chatId}/messages` performance.
- Added [set presence endpoint](https://waha.devlike.pro/docs/how-to/presence)!
  - With `online` presence you can show your status as online [#121](https://github.com/devlikeapro/waha/issues/121)
  - With `offline` presence you can get notifications for your device [#28](https://github.com/devlikeapro/waha/issues/28)
- Added security settings for edit group info `PUT /api/{session}/groups/{groupId}/settings/security/info-admin-only` - updates the group settings to only allow admins to edit group info (title, description, photo).

### 2023.7
July 2023
- Now session can have their own [🔄 Webhooks]({{< relref "/docs/how-to/events" >}}) -
   you can define webhook configuration when you start a session with `POST /api/sessions/start`!
  - Add HMAC authentication for webhooks
  - Configure retries
  - Add you custom headers
- Added [proxy configuration](https://waha.devlike.pro/docs/how-to/config/#proxy) with supporting proxy authentication.
  Thanks **puntolino** for the contribution!
  You can control proxy's settings per session with `POST /api/sessions/start` or globally with environment variables.
- Added [presence information](https://waha.devlike.pro/docs/how-to/presence) - now you can get online status for
  a contact by calling endpoints or receiving a webhook event!
- Now you can mention contact in groups by settings `mentions` field in `POST /api/sendText`
  [read more about it in Send Messages ->]({{< relref "/docs/how-to/send-messages" >}})

### 2023.6
June 2023

Improvements on session management, restarting sessions and more:

- Added `WHATSAPP_RESTART_ALL_SESSIONS=True`: Set this variable to `True` to start all **STOPPED** sessions after
  container restarts. By default, this variable is set to `False`.
  - Please note that this will start all **STOPPED** sessions, not just the sessions that were working before the
    restart. You can maintain the session list by
    using `POST /api/sessions/stop` with the `logout: True` parameter or by calling `POST /api/sessions/logout` to remove
    **STOPPED** sessions. You can see all sessions, including **STOPPED** sessions, in the `GET /api/sessions/all=True`
    response.
- `WHATSAPP_START_SESSION` now support more than one session! Separate session names by command, and it'll start them
  ALWAYS after container restart `WHATSAPP_START_SESSION=session1,session2`
- `WHATSAPP_SWAGGER_CONFIG_ADVANCED=true` enables advanced configuration options for Swagger documentation - you can customize host, port and base URL for the requests.
  Disabled by default.
- Added `?all=true` parameter to `GET /api/session?all=True` endpoint - it'll show you ALL session, included
  **STOPPED**, so you can know which one will be restarted if you set `WHATSAPP_RESTART_ALL_SESSIONS=True` environment variable.
- Added `POST /api/sessions/logout` that allow you to logout from session - remove saved credentials.
- Added `logout` boolean parameter to `POST /api/sessions/stop` request that allow you to stop the session AND logout at
  the same time.
- Added `engine` field in webhook payload

```json { title="message" }
{
  "event": "message",
  "session": "default",
  "engine": "WEBJS",
  "payload": {}
}
```

### 2023.5
May 2023

- Added new [NOWEB engine]({{< relref "/docs/how-to/engines" >}}). **NOWEB** engine does not require a browser to work
  with
  WhatsApp Web, it does so directly using a WebSocket.
  - Less CPU and RAM usage!
  - Send Locations API works!
  - Send Link Preview API works!
  - ⚠ Read the article before using it [How to avoid blocking ->]({{< relref "/docs/overview/how-to-avoid-blocking" >}}).

### 2023.4
March 2023

- Add [Groups API]({{< relref "/docs/how-to/groups" >}})
- Use Chromium by default instead of Chrome

### 2023.1
January 2023

- Added  [Contacts API]({{< relref "/docs/how-to/contacts" >}})
  - Get all contacts
  - Get a contact
  - Get contact "about" (status)
  - Get contact profile picture
  - Check number exists (is registered in WhatsApp) - works even if the number is not in the contact list
  - Block and unblock contact

### 2022.12
December 2023

- Added `GET /messages/` endpoint to get chat messages [#31](https://github.com/devlikeapro/waha/issues/31)
- Added `WHATSAPP_SWAGGER_USERNAME` and `WHATSAPP_SWAGGER_PASSWORD` to hide and protect swagger panel.

### 2022.11

**Please test changes in test environment before update production!!**

**Engine** 

1. WAHA has changed its underlying engine from Venom to Whatsapp Web.JS. It might change the response and webhook's
   payloads.
2. Optimize CPU and memory consumption.

**Requests** 

- For all `/api/sessions/` requests use `name` field instead of `sessionName`.
- For all "chatting" requests use `session` field instead of `sessionName`.

**Sessions** 

Now you don't have to scan QR code each time you run WAHA, WAHA saves it for you! Available only in Plus version.

**Authentication** 

Now you can authenticate all requests for WAHA - use `WHATSAPP_API_KEY=secret` environment variable to set "secret key".

If `WHATSAPP_API_KEY` is set - requests must have `X-Api-Key` header with `secret` value, where `secret` - any random
secret key.

**Webhooks** 

Instead of setting each webhook via environment variables - we use two environments variables:

- `WHATSAPP_HOOK_URL` - to set a URL
- `WHATSAPP_HOOK_EVENTS` - to set events that are sent to the URL

**Webhook payload**

The data for webhooks are wrapped inside a new `WAWebhook` object with `event` and `payload` fields to help you identify
which handler you should call based on `event`.

```json { title="message.any" }
{
  "event": "message.any",
  "payload": {
  }
}
```
