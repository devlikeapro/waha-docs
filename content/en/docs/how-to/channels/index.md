---
title : "📰 Channels"
description: "Channels (aka Newsletter)"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: []
weight: 231
---

Here's complete information about **WhatsApp Channels** (aka Newsletter) and how to use them.

![](channels.png)

💡 Channels have a special `@newsletter` prefix, so you can distinguish them from regular chats and groups.
- `123123123@c.us`

{{< include file="content/en/docs/how-to/channels/features.md" >}}

## Endpoints
### Get all channels
You can get list of **known** channels 
- Get all (your and subscribed) channels `GET /api/{session}/channels`
- Filter channels `GET /api/{session}/channels?role=OWNER`, 
  - `role` can be `OWNER`, `ADMIN`, `SUBSCRIBER` 

```json
[
  {
    "id": "111111111111111111@newsletter",
    "name": "Channel - Owner - Picture",
    "description": "Hi there, I'm new here",
    "invite": "https://whatsapp.com/channel/111111111111111111GdZ60l",
    "preview": "https://mmg.whatsapp.net/m1/v/t24/123",
    "picture": "https://mmg.whatsapp.net/m1/v/t24/123",
    "verified": false,
    "role": "OWNER"
  },
  {
    "id": "111111111111111111@newsletter",
    "name": "Channel - Subscriber - No Picture",
    "description": "",
    "invite": "https://whatsapp.com/channel/111111111111111111111111",
    "preview": null,
    "picture": null,
    "verified": false,
    "role": "SUBSCRIBER"
  }
]
```

### Create a new channel
You can create a new channel `POST /api/{session}/channels` with the payload:
```json
{
  "name": "Channel Name",
  "description": "Channel Description",
  "picture": {
    "mimetype": "image/jpeg",
    "filename": "filename.jpg",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg"
  }
}
```

### Delete a channel
You can delete a channel `DELETE /api/{session}/channels/123123%40newsletter` (escape `@` to `%40`).
Make sure have `OWNER` role for the channel.

### Get channel by ID
You can get a channel by ID `GET /api/{session}/channels/123123%40newsletter` (escape `@` to `%40`).

```json
{
  "id": "111111111111111111@newsletter",
  "name": "Channel - Owner - Picture",
  "description": "Hi there, I'm new here",
  "invite": "https://whatsapp.com/channel/111111111111111111GdZ60l",
  "preview": "https://mmg.whatsapp.net/m1/v/t24/123",
  "picture": "https://mmg.whatsapp.net/m1/v/t24/123",
  "verified": false,
  "role": "OWNER"
}
```

### Get channel by Invite Code
You can get a channel by Invite Code `GET /api/{session}/channels/{inviteCode}` 
- `inviteCode` here is the last part in invite URL `https://whatsapp.com/channel/111111111111111111GdZ60l` - `111111111111111111GdZ60l`

💡 To get full `picture` you need to get channel by ID after you get the invite code.

```json
{
  "id": "111111111111111111@newsletter",
  "name": "Channel - Owner - Picture",
  "description": "Hi there, I'm new here",
  "invite": "https://whatsapp.com/channel/111111111111111111GdZ60l",
  "preview": "https://mmg.whatsapp.net/m1/v/t24/123",
  "picture": "https://mmg.whatsapp.net/m1/v/t24/123",
  "verified": false,
  "role": "OWNER"
}
```


## How-to
### Send Text to the channel
You can use regular [`POST /api/sendText`]({{< relref "/docs/how-to/send-messages#send-text" >}}) endpoint to send a text message into the channel

👉 Make sure you're `OWNER` or `ADMIN` for the channel

```json
{
  "session": "default",
  "chatId": "12132132130@newsletter",
  "text": "Hi there!"
}
```

### Send Image to the channel
You can use regular [`POST /api/sendImage`]({{< relref "/docs/how-to/send-messages#send-image" >}}) endpoint to send an image into the channel

```json
{
  "session": "default",
  "chatId": "11111111111@newsletter",
  "file": {
    "mimetype": "image/jpeg",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg",
    "filename": "filename.jpeg"
  },
  "caption": "string"
}
```

### Get messages from the channel
You can use regular 
[`GET /api/{session}/chats/{chatId}/messages`]({{< relref "/docs/how-to/chats#get-messages-from-chat" >}}) 
to fetch messages from the channel

```bash
GET /api/default/chats/123%40newsletter/messages?downloadMedia=true&limit=100
```

```json
[
  {
    "id": "true_111111111111111111@newsletter_1111111111111111111111",
    "timestamp": 1720775833,
    "from": "111111111111111111@newsletter",
    "fromMe": true,
    "body": "Caption",
    "hasMedia": true,
    "media": {
      "mimetype": "image/jpeg",
      "filename": null,
      "url": "http://localhost:3000/api/files/1111111111111111111111.jpeg"
    },
    "mediaUrl": "http://localhost:3000/api/files/1111111111111111111111.jpeg",
    "ack": 0,
    "ackName": "PENDING",
    "_data": {
      ...
    }
  }
]

```

### Receive messages from the channel
For all incoming messages in your own and subscribed channels you'll receive 
- [`message`]({{< relref "/docs/how-to/receive-messages#message" >}}) event for a message from the channel (send by someone else)
- [`message.any`]({{< relref "/docs/how-to/receive-messages#message.any" >}}) event for a message from the channel (including your messages)

```json
{
    "event": "message",
    "session": "default",
    "me": {
        "id": "111111111111@c.us",
        "pushName": "Slovakia WAHA"
    },
    "payload": {
        "id": "false_123123@newsletter_11111111111111111111111111111111",
        "timestamp": 1720776511,
        "from": "111111111111111111@newsletter",
        "fromMe": false,
        "body": "How are you all?! ❤️",
        "hasMedia": false,
        "ack": null,
        "ackName": "UNKNOWN",
        "_data": {
          ...
        }
    },
    "engine": "NOWEB",
    "environment": {
        "version": "2024.7.4",
        "engine": "NOWEB",
        "tier": "PLUS",
        "browser": "/usr/bin/google-chrome-stable"
    }
}
```
