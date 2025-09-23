---
title: "✅ Presence"
description: "Presence - online, offline, typing status"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 291
images: ["typing.jpg"]
slug: presence
---

You can get presence information (online, offline with last seen, typing status) for a contact if they share their
presence information.

<div style="width: 400px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="typing.jpg" alt="WhatsApp Typing" >}}
</div>


## FAQ
👉 **I don't get notifications on my phone when WAHA session is connected**
- You need to send `offline` after all presence you send (WhatsApp doesn't send notifications to the device if a web client is active).
- For [**🏭 NOWEB Engine**]({{< relref "/docs/engines/NOWEB" >}}) also mark sure to send `markOnline: false` 
when you create a new session.

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/presence/features.md" >}}

{{< include file="content/docs/how-to/presence/features-events.md" >}}

## API

### Set presence
You can set your global or chat-related presence with endpoint

```http request
POST /api/{session}/presence
```

```jsonc { title="Body" }
{
  "chatId": "111111111@c.us",
  "presence": "typing"
}
```

Possible presence statuses that you can set or get for chats:
- `online` - send the status with no `chatId`
- `offline` - send the status with no `chatId`
- `typing` - `chatId` required
- `recording` - `chatId` required
- `paused` - resets the chat presence after you were `typing`. `chatId` required.

**Start typing** to a chat (you can use `POST /startTyping` instead)

```jsonc { title="Body" }
{
  "chatId": "111111111@c.us",
  "presence": "typing"
}
```

**Clear "typing" state** (you can use `POST /stopTyping` instead)

```jsonc { title="Body" }
{
  "chatId": "111111111@c.us",
  "presence": "paused"
}
```

**Set global "online"**, all contacts will see it

```jsonc { title="Body" }
{
  "presence": "online"
}
```

💡 In the multi-device version of WhatsApp - if a desktop client is active, WhatsApp doesn't send push notifications
to the device.
If you would like to receive said notifications - you need to mark a session's presence as `offline`.

```jsonc { title="Body" }
{
  "presence": "offline"
}
```

### Get chat presence

```http request
GET /api/{session}/presence/{chatId}
```

Get presence information for a single chat. For a group, you'll get participants' statuses.

```jsonc {title="Response"}
{
  "id": "2132132130@c.us",
  "presences": [
    {
      "participant": "2132132130@c.us",
      "lastKnownPresence": "online",
      "lastSeen": null
    }
  ]
}
```

### Subscribe to presence

You can subscribe to presence information by calling
```http request
POST /api/{session}/presence/{chatId}/subscribe
```

(no body required).

You can get later presence information for the chat with above `GET` endpoints or by listening to `presence.update`
webhook.

### Get all chats presence

You can get all presence information available for a session by calling

```http request
GET /api/{session}/presence
```

It returns both groups' and personal chats' presence information.

Here's few notes about fields:
- `chatId` - either contact id (`213213213@c.us`) or group chat id (`1111111111111@g.us`).
- `lastSeen` - contains Unix timestamps indicating when a participant was last online
- `lastKnownPresence` - contains the last known presence status, which can be
  `offline`, `online`, `typing`, `recording`, or `paused`

```jsonc {title="Response"}
[
  {
    "id": "2132132130@c.us",
    "presences": [
      {
        "participant": "2132132130@c.us",
        "lastKnownPresence": "offline",
        "lastSeen": 1686719326
      }
    ]
  },
  {
    "id": "11111111111111111111111@g.us",
    "presences": [
      {
        "participant": "11111111111111111111111@g.us",
        "lastKnownPresence": "online",
        "lastSeen": null
      },
      {
        "participant": "2132132130@c.us",
        "lastKnownPresence": "offline",
        "lastSeen": 1686719326
      }
    ]
  }
]
```


## Events
Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

### presence.update

{{< include file="content/docs/how-to/presence/-events-presence.update.md" >}}
