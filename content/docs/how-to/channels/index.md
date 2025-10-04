---
title: "📢 Channels"
description: "Channels (aka Newsletter)"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 231
images: [ "channels.png" ]
slug: channels
---

Here's complete information about **WhatsApp Channels** (aka _Newsletters_) and how to use them.

<div style="width: 400px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="channels.png" alt="WhatsApp Channels" >}}
</div>

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/channels/features.md" >}}

## Channels API

💡 Channels have a special `@newsletter` prefix, so you can distinguish them from regular chats and groups.

- `123123123@newsletter` - channel ID

### Get your channels

You can get list of **subscribed or owned** channels:

Get all (your and subscribed) channels:
```http request
GET /api/{session}/channels
```

Filter channels by your role:
```http request
GET /api/{session}/channels?role=OWNER
```
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

You can create a new channel:

```http request
POST /api/{session}/channels
```

```jsonc { title="Body" }
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

You can delete a channel `DELETE /api/{session}/channels/123123%40newsletter`
```http request
DELETE /api/{session}/channels/{ID}
```

- 👉 Remember to escape `@` in `chatId` and `messageId` with `%40`.
- Allowing to delete only channels where you're `OWNER`.

### Get channel by Id

You can get a channel by ID

```http request
GET /api/{SESSION}/channels/{ID}
```

- 👉 Remember to escape `@` in `chatId` and `messageId` with `%40`.

```jsonc {title="Response"}
{
  "id": "111111111111111111@newsletter",
  "name": "Channel - Owner - Picture",
  "description": "Hi there, I'm new here",
  "invite": "https://whatsapp.com/channel/111111111111111111GdZ60l",
  "preview": "https://mmg.whatsapp.net/m1/v/t24/123",
  "picture": "https://mmg.whatsapp.net/m1/v/t24/123",
  "verified": false,
  "role": "OWNER",
  "subscribersCount": 12323
}
```

### Get channel by Invite Code

You can get a channel information by Invite Code

```http request
GET /api/{session}/channels/{inviteCode}
```

- `inviteCode` here is the last part in invite URL `https://whatsapp.com/channel/111111111111111111GdZ60l` -
  `111111111111111111GdZ60l`

💡 To get full `picture` you need to get channel by ID after you get the invite code.

```jsonc {title="Response"}
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

## Search API

### Search channels by view

{{< imgo src="/images/whatsapp/channels/channels-views.png" full="false" >}}

You can search **public** (not subscribed yet) channels **by view**:

```http request
POST /api/{session}/channels/search/by-view
```


```jsonc { title="Body" }
{
  "view": "RECOMMENDED",
  "countries": [
    "US"
  ],
  "categories": [],
  "limit": 50,
  "startCursor": ""
}
```

- `view` - Use `value` from [get available views](#get-search-views)
- `countries` - use `code` from [get available countries](#get-search-countries)
- `categories` - use `id` from [get available categories](#get-search-categories)
- `limit` - we recommend using default `50` value, it's the way official clients work
- `startCursor` - use `endCursor` from the previous response (if any data available on the next page)

```jsonc { title="Response" }
{
  "page": {
    "startCursor": null,
    "endCursor": "base64encodedstring",
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "channels": [
    {
      "id": "123123123123@newsletter",
      "name": "Channel Name",
      "invite": "https://www.whatsapp.com/channel/111111111111111111111111",
      "preview": "https://mmg.whatsapp.net/m1/v/t24/An&_nc_cat=10",
      "picture": "https://mmg.whatsapp.net/m1/v/t24/An&_nc_cat=10",
      "description": "string",
      "verified": true,
      "subscribersCount": 0
    }
  ]
}
```

### Search channels by text
{{< imgo src="/images/whatsapp/channels/channels-text.png" full="false" >}}

You can search **public** (not subscribed yet) channels **by text**:
```http request
POST /api/{session}/channels/search/by-text
```

```jsonc { title="Body" }
{
  "text": "Donald Trump",
  "categories": [],
  "limit": 50,
  "startCursor": ""
}
```
- `text` - search text
- `categories` - use `id` from [get available categories](#get-search-categories)
- `limit` - we recommend using default `50` value, it's the way official clients work
- `startCursor` - use `endCursor` from the previous response (if any data available on the next page)

### Get Search Views
List of available views for search:

```http request
GET /api/{session}/channels/search/views
```

```jsonc { title="Response" }
[
  {
    "value": "RECOMMENDED",
    "name": "Explore"
  }
]
```

### Get Search Countries
List of available countries for search (not full one, you can try different `code` values if you don't see your country):

```http request
GET /api/{session}/channels/search/countries
```

```jsonc { title="Response" }
[
  {
    "code": "US",
    "name": "United States"
  }
]
```

### Get Search Categories
List of available categories for search:

```http request
GET /api/{session}/channels/search/categories
```

```jsonc { title="Response" }
[
  {
    "value": "BUSINESS",
    "name": "Business"
  },
  {
    "value": "ENTERTAINMENT",
    "name": "Entertainment"
  }
]
```

### Get Messages (Preview) for Channel
You can get latest messages from **public** channels (not subscribed yet) by invite code (or channel id).
Returns only **preview** messages (one that you'll see on channel preview).

```http request
GET /api/{SESSION}/channels/{INVITE}/messages/preview?downloadMedia=false&limit=100
```

**Query parameters**:
- `{SESSION}` - your session
- `{INVITE}` - invite code (123123123) or channel id (123132123@newsletter). **Invite code is recommended**.
- `downloadMedia` - whether to download media or not
- `limit` - limit of messages to return. **100 is recommended**.

```json
[
  {
    "reactions": {
      "👍": 10,
      "❤️": 5
    },
    "viewCount": 0,
    "message": {
      "id": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
      "timestamp": 1666943582,
      "body": "string",
      "media": {}
    }
  }
]
```
- `reactions` - reactions for the message
- `viewCount` - views count for the message
- `message` - message object - the same as in `payload` field [**message**]({{< relref "/docs/how-to/events#message" >}}) event

## How-to

### Send Text to the channel

You can use regular [`POST /api/sendText`]({{< relref "/docs/how-to/send-messages#send-text" >}}) endpoint to send a
text message into the channel

👉 Make sure you're `OWNER` or `ADMIN` for the channel

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "12132132130@newsletter",
  "text": "Hi there!"
}
```

### Send Image to the channel

You can use regular [`POST /api/sendImage`]({{< relref "/docs/how-to/send-messages#send-image" >}}) endpoint
to send an image into the channel

```jsonc { title="Body" }
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

### Send Video to the channel

You can use regular [`POST /api/sendVideo`]({{< relref "/docs/how-to/send-messages#send-video" >}}) endpoint
to send a video message into the channel

```jsonc { title="Body" }
{
  "chatId": "111111111111111111@newsletter",
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/video.mp4"
  },
  "caption": "Just watch at this!",
  "session": "default"
}
```

### Send Reaction to the channel

```http request
PUT /api/reaction
```

```jsonc { title="Body" }
{
  "messageId": "false_11111111111@newsletter_100_AAAAAAAAAAAAAAAAAAAA",
  "reaction": "👍",
  "session": "default"
}
```

`messageId` can be in formats:
1. `{fromMe}_{id}@newsletter_{serverID}_{clientID}` - `false_11111111111@newsletter_100_AAAAAAAAAAAAAAAAAAAA`
1. `false_11111111111@newsletter_AAAAAAAAAAAAAAAAAAAA` - using characters. Works if you're subscribed to the channel.
2. `false_11111111111@newsltter_123` - using `server_id`. If you're not subscribed to the channel, you can use this format.

{{< include file="content/docs/how-to/channels/-how-to-find-message-id.md" >}}


### Send Poll Vote to the channel

```http request
POST /api/sendPollVote
```

```jsonc { title="Body" }
{
  "chatId": "11111111111@newsletter",
  "pollMessageId": "false_11111111111@newsletter_AAAAAAAAAAAAAAAAAAAA",
  "pollServerId": 123,
  "votes": [
    "Awesome!"
  ],
  "session": "default"
}
```

{{< include file="content/docs/how-to/channels/-how-to-find-message-id.md" >}}


### Get messages from the channel

You can use regular
[`GET /api/{session}/chats/{chatId}/messages`]({{< relref "/docs/how-to/chats#get-messages-from-chat" >}})
to fetch messages from the channel

```http request
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
      "url": "http://localhost:3000/api/files/1111111111111111111111.jpeg",
      "error": null
    },
    "mediaUrl": "http://localhost:3000/api/files/1111111111111111111111.jpeg",
    "ack": 0,
    "ackName": "PENDING",
    "_data": {}
  }
]

```

### Receive messages from the channel

For all incoming messages in your own and subscribed channels you'll receive

- [`message`]({{< relref "/docs/how-to/receive-messages#message" >}}) event for a message from the channel (send by
  someone else)
- [`message.any`]({{< relref "/docs/how-to/receive-messages#message.any" >}}) event for a message from the channel (
  including your messages)

```jsonc { title="message" }
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
    "_data": {}
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
