---
title: "NOWEB"
description: "Lightweight, fast, and flexible."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false

weight: 411
---

## Overview

**NOWEB** engine **does not require a browser** to work with WhatsApp Web, it does so directly using a WebSocket.
Not running Chromium saves you CPU and Memory, so you can run more instances on a single server!

⚠ Read the article before using **NOWEB** engine
[How to avoid blocking ->]({{< relref "/docs/overview/how-to-avoid-blocking" >}}).

## Run NOWEB

```bash
# Plus
docker run -v `pwd`/.sessions:/app/.sessions -e "WHATSAPP_DEFAULT_ENGINE=NOWEB" devlikeapro/waha-plus

# Core
docker run -it -e "WHATSAPP_DEFAULT_ENGINE=NOWEB" devlikeapro/waha

```

## Configuration
- `markOnline: true` - send `online` **presence** when session starts (default `true`).
  - Required if you want to get notifications in your phone
  - Read more about [**✅ Presence**]({{< relref "/docs/how-to/presence" >}})


```json
{
  "name": "default",
  "config": {
    "noweb": {
      "markOnline": false,
      "store": {
        ...
      }
    }
  }
}
```

## Store
By default, **NOWEB** doesn't store any contacts, chats, or messages, so it's your application's responsibility to store them.
It's fine for CRM cases like "appointment reminders" or "order notifications" where you don't need to store the chat history.

These endpoints doesn't work by default in **NOWEB** engine.
- [`GET /api/contacts/all`]({{< relref "/docs/how-to/contacts#get-all-contacts" >}})
- [`GET /api/{session}/chats`]({{< relref "/docs/how-to/chats#get-all-chats" >}})
- [`GET /api/{session}/chats/{chatId}/messages`]({{< relref "/docs/how-to/chats#get-messages-from-chat" >}})

Here's how you can enable the store feature:

### Enable  store
If you want to get the **contacts, chats or messages** you need to enable it explicitly by settings additional fields 
in `config` at [POST /api/sessions/]({{< relref "/docs/how-to/sessions#create-session" >}}) body.

👉 Do not change the values after you scanned QR, it can lead to the loss of the chat history.

```json
{
  "name": "default",
  "config": {
    "noweb": {
      "store": {
        "enabled": true,
        "fullSync": false
      }
    }
  }
}
```

- `config.noweb.enabled.store=true` - to enable the store feature (`false` by default)
- `config.noweb.enabled.fullSync=true` - emulate a desktop connection (and receive more message history).
  - `fullSync=false` you'll get about 3 months of message history.
  - `fullSync=true` you'll get about 1 year of message history (max 100K messages per chat).
  - 
Or enable it on [WAHA Dashboard]({{< relref "/docs/how-to/dashboard" >}}) when **starting a new session**:
![alt](dashboard-noweb-store.png)



### Get messages
When you enabled store - you can [**Get messages from chat**]({{< relref "/docs/how-to/chats#get-messages-from-chat" >}}), it's the store with some additional fields in `_data`:
- `reactions` - reactions to the message
- `pollUpdates` - encrypted votes to the polls
(not decrypted yet, please create [an issue](https://github.com/devlikeapro/waha/issues) if you wish to get the summary of polls in the response.
- `userReceipt` - **broadcast and group messages** - the user receipt of the message (aka ACK flag, green checkmarks) for 

**Reactions**
```json
[
  {
    "id": "true_111111@c.us_AAAAAAAAAAAAAA",
    // Regular fields here,
    "_data": {
      "key": {
        "remoteJid": "111111@s.whatsapp.net",
        "fromMe": true,
        "id": "AAAAAAAAAAAAAA"
      },
      "messageTimestamp": 1718265764,
      "pushName": "Sim2",
      "broadcast": false,
      "status": 2,
      "reactions": [ // <==== Reactions
        {
          "key": {
            "remoteJid": "111111@s.whatsapp.net",
            "fromMe": true,
            "id": "11111111111111111111111111111111"
          },
          "text": "❤️",
          "senderTimestampMs": 1718265740788
        }
      ]
    }
  }
]
```

**Poll votes**
```json
[
  {
    "id": "true_111111@c.us_AAAAAAAAAAAAAA",
    // Regular fields here,
    "_data": {
      "key": {
        "remoteJid": "111111@s.whatsapp.net",
        "fromMe": true,
        "id": "AAAAAAAAAAAAAA"
      },
      "messageTimestamp": 1718265764,
      "pushName": "Sim2",
      "broadcast": false,
      "status": 2,
      "pollUpdates": [
        {
          /// Encrypted poll votes
        }
      ]
    }
  }
]

```

**User receipt** for group messages and `status@broadcast` messages (aka [Status]({{< relref "/docs/how-to/send-messages#status" >}}) field)
```json
[
  {
    "id": "true_111111111111111111111@g.us_AAAAAAAAAAAAAAAAA",
    "timestamp": 1718266155,
    "from": "111111111111111111111@g.us",
    "fromMe": true,
    "body": "Hdhf",
    "to": "111111111111111111111@g.us",
    "participant": "33333@c.us",
    "hasMedia": false,
    "ack": 1,
    "ackName": "SERVER",
    "_data": {
      "key": {
        "remoteJid": "111111111111111111111@g.us",
        "fromMe": true,
        "id": "AAAAAAAAAAAAAAAAA",
        "participant": "33333@s.whatsapp.net"
      },
      "messageTimestamp": 1718266155,
      "pushName": "Sim2",
      "broadcast": false,
      "status": 2,
      "message": {
        "conversation": "Test"
      },
      "userReceipt": [ // <<<==== User receipt
        {
          "userJid": "1111111@s.whatsapp.net",
          "readTimestamp": 1718266160 // aka ackName: READ
        },
        {
          "userJid": "22222@s.whatsapp.net",
          "receiptTimestamp": 1718266162 // aka ackName: DEVICE
        }
      ]
    }
  }
]
```

### Get chats and contacts
When you enabled store - you can [**Get all chats**]({{< relref "/docs/how-to/chats#get-all-chats" >}}) and [**Get all contacts**]({{< relref "/docs/how-to/contacts#get-all-contacts" >}}).

Here's some ids you can meet there:
- `123123123@c.us`  **Phone numbers** accounts - international phone number without + at the start and add `@c.us` at the end.
  For phone number `12132132131` the `chatId` is  `12132132131@c.us`
- `123123123@s.whatsapp.net` can also appear in **internal data for NOWEB**, just convert it to `@c.us` to work
  with that properly. Kindly don't use it in `chatId` when sending messages
- `12312312123133@g.us` - **Groups** uses random number with `@g.us` at the end.
- `123123123@lid` - **is a hidden user ID**, each user has a regular ID along with a hidden one. WhatsApp added that type of ID along with communities functionality.
- `123123123@newsletter` - for [**📰 WhatsApp Channels**]({{< relref "/docs/how-to/channels" >}}).

### Store under the hood
Under the hood, the **NOWEB** stores the session data in database based on [**🗄️ Storage**]({{< relref "/docs/how-to/storages" >}}) you choose - either in files or in MongoDB.

- For [File local storage]({{< relref "/docs/how-to/storages#sessions---local-files" >}}) it creates sqlite3 database at `.sessions/noweb/{sessionName}/store.sqlite3` store with `chats`, `contacts`, `messages` tables with proper indexes.
  - 👉 **We don't recommend opening it manually when the session is running**, even for reading, it can lead to the loss of the chat history.
- For [MongoDB]({{< relref "/docs/how-to/storages#sessions---mongodb" >}}) in `waha_{engine}_{sessionName}` it creates `chats`, `contacts`, `messages` collections with proper indexes.
  - 👉 You can safely READ from the database, but **DO NOT WRITE** to it manually, it can lead to the loss of the chat history.


## Links

- [https://github.com/devlikeapro/Baileys](https://github.com/devlikeapro/Baileys)

