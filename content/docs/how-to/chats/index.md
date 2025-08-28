---
title : "💬 Chats"
description: "Chats"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 227
images: ["chats.jpg"]
slug: chats
---

Chats methods.

<div style="width: 200px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="chats.jpg" alt="WhatsApp Chats" >}}
</div>

## Features
Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/chats/features.md" >}}

{{< include file="content/docs/how-to/chats/features-events.md" >}}

## API
Parameters in path that you can find in below endpoints:
- `{session}` - use the session name for Whatsapp instance that you created with `POST /api/sessions` endpoint
- `{chatId}` - chat id in format `123123123123@[c.us|g.us]`, `c.us` for direct chats and `g.us` for groups.

### Get all chats
Get all chats 
```http request
GET /api/{session}/chats
```

#### Chats Pagination
If you see timeout or the request takes too long - consider using `limit` parameter to get chats in smaller chunks

```http request
GET /api/{session}/chats?limit=100&offset=0&sortBy=messageTimestamp&sortOrder=desc
```

- `limit=100` - limit the number of chats to return
- `offset=0` - skip the number of chats from the start
- `sortBy={field}` - sort by field
  - `sortBy=messageTimestamp` - sort by last message timestamp
  - `sortBy=id` - sort by chat id
  - `sortBy=name` - sort by chat name
- `sortOrder=desc|asc` - sort order
  - `desc` - descending order (New first, A-Z)
  - `asc` - ascending order (Old first, Z-A)

### Get chats overview
Get chats "overview" - the API that almost all 
[**Chat UI**]({{< relref "/docs/how-to/dashboard#chat-ui" >}})
client needs!

```http request
GET /api/{session}/chats/overview?limit=20&offset=0
```

**Query Parameters**:
- `limit=100` - limit the number of chats to return
- `offset=0` - skip the number of chats from the start
- `ids=11111&ids=9999@c.us` - optional, filter result by chat id or phone number


{{< callout context="tip" icon="outline/hand-finger-right" >}}
Use `POST` request if you have a lot of chats (>400) in `ids` filter
{{< /callout >}}

```http request
POST /api/{session}/chats/overview
```

```jsonc { title="Request (POST)" }
{
  "pagination": {
    "limit": 20,
    "offset": 0
  },
  "filter": {
    "ids": ["111111@c.us"]
  }
}
```

**Response** contains the main info you need to show in the chat list:
1. `id` - chat id
2. `name` - chat name (if any)
3. `picture` - chat picture (if any)
4. `lastMessage` - last message in the chat (if any). 
5. `_chat` - the structure depends on engine you're using

⚠️ `lastMessage` doesn't have media attachments, you need to [get message by id]({{< relref "#get-message-by-id" >}}) to get media attachments.

```jsonc { title="Response" }
[
  {
    "id": "12312l123@c.us",
    "name": "John Doe",
    "picture": "https://example.com/picture.jpg",
    "lastMessage": {
      "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      "timestamp": 1667561485,
      "from": "11111111111@c.us",
      "fromMe": true,
      "to": "11111111111@c.us",
      "body": "Hi there!",
      ...
    },
    "_chat": {
      ...
    }
  }
]

```


### Get chat picture
Get chat picture (avatar, profile picture, group image) by chat id
```http request
GET /api/{session}/chats/{chatId}/picture[?refresh=True]
```

**Query**
- `refresh=True` - force refresh the picture. By default, we cache it 24 hours. Do not frequently refresh the picture to avoid `rate-overlimit` error.

```jsonc { title="Response" }
{
  "url": "https://example.com/picture.jpg"
}
```
- `url` can be `null` if there's no picture for the chat

### Archive chat

Use the method to archive chat
```http request
POST /api/{session}/chats/{chatId}/archive
```

### Unarchive chat

Use the method to unarchive chat

```http request
POST /api/{session}/chats/{chatId}/unarchive
```

### Unread chat
Mark chat as unread

```http request
POST /api/{session}/chats/{chatId}/unread
```

### Delete chat
Use the method to delete chat

```http request
DELETE /api/{session}/chats/{chatId}
```

### Read messages
You can mark all **unread** messages in the chat as **read** (double blue checkmark) using one query:

It'll find all unread messages in the chat and mark them as read.

```http request
POST /api/{SESSION}/chats/{chatId}/messages/read
```

```jsonc { title="Body" }
{}
```

```jsonc { title="Response" }
{
  "ids": [
    "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
    "true_99999999999@c.us_AAAAAAAAAAAAAAAAAAAA"
  ]
}
```
- `ids` - list of message ids that were marked as read

{{< callout context="note" icon="outline/info-circle" >}}
👉 **NOWEB**: Please make sure to [**🏭 Enable NOWEB Store before using this API**]({{< relref "/docs/engines/NOWEB#store" >}})!
{{< /callout >}}

Optionally, you can control how many messages you need to read:

```jsonc { title="Body" }
{
  "messages": 30,
  "days": 7
}
```
- `messages: 30` - how many messages you need to read
  - defaults is `30` for **direct chats** and `100` for **groups**
- `days: 7` - how many days you need to read
  - default is `7`

For more granular control, you can use the
[**POST /api/sendSeen**]({{< relref "/docs/how-to/send-messages#send-seen" >}})
API.

### Get messages
Get **10 messages** from the chat

```http request
GET /api/{session}/chats/{chatId}/messages?limit=10
```

Available parameters:
- `downloadMedia=true` - download media files (images, files) or not
- `chatId=123@c.us` - chatId, phone number 
  - `chatId=all` - get messages from all chats (works on [**NOWEB**]({{< relref "/docs/how-to/engines#noweb" >}}) engine only)
- `limit=100` - limit the number of chats to return
- `offset=0` - skip the number of chats from the start
- `filter.timestamp.lte=1727745026` - filter messages by timestamp less than or equal to `1727745026`
- `filter.timestamp.gte=1727745026` - filter messages by timestamp greater than or equal to `1727745026`
- `filter.fromMe=false` - filter messages from me (by default, shows all messages)
- `filter.ack=DEVICE` - filter messages by ack 
  - `ERROR, ack: -1` - error occurred
  - `PENDING, ack: 0` - message is pending
  - `SERVER, ack: 1` - message was sent to server
  - `DEVICE, ack: 2` - message was sent to the device
  - `READ, ack: 3` - recipient read message
  - `PLAYED, ack: 4` - recipient played the message

Get **10 messages** from the chat, skip **downloading media** (images, files)

```http request
GET /api/{session}/chats/{chatId}/messages?limit=10&downloadMedia=false
```

```json
[
  {
    "id": "false_123123@c.us_AAAAAA",
    "timestamp": 1727745026,
    "from": "123123@c.us",
    "fromMe": false,
    "body": "I'm good!",
    "hasMedia": false,
    "ack": 3,
    "ackName": "READ",
    "replyTo": null,
    "_data": {
      ... // Raw Engine Data
    }
  }
]
```

Get **10 messages** from 1727745026 timestamp, not from me

```http request
GET /api/{session}/chats/{chatId}/messages?limit=10&filter.timestamp.gte=1727745026&filter.fromMe=false
```

👉 If you have more messages - you can set `offset` flag 
(increase it always for `limit` amount, even if you get less messages)
```http request
GET /api/{session}/chats/{chatId}/messages?limit=10&offset=10&filter.timestamp.gte=1727745026&filter.fromMe=false
```


### Get message by id
Get message by id 
```http request
GET /api/{session}/chats/{chatId}/messages/{messageId}?downloadMedia=true
```

```jsonc { title="Response" }
{
    "id": "false_123123@c.us_AAAAAA",
    "timestamp": 1727745026,
    "from": "123123@c.us",
    "fromMe": false,
    "body": "I'm good!",
    "hasMedia": false,
    "ack": 3,
    "ackName": "READ",
    "replyTo": null,
    "_data": {
        ... // Raw Engine Data
    }
}
```

- `chatId` - in format `123123123@c.us`
- `messageId` - must be in format `{true|false}_213213@c.us_AAAAAAA`)
- `downloadMedia` - download media files (images, files) or not

### Pin message

```http request
POST /api/{session}/chats/{chatId}/messages/{messageId}/pin
```

```jsonc { title="Body" }
{
  "duration": 86400
}
```

- 24 hours - `duration=86400`
- 7 days - `duration=604800`
- 30 days - `duration=2592000`

```jsonc { title="Response" }
{
  "success": true
}
```

### Unpin message

```http request
POST /api/{session}/chats/{chatId}/messages/{messageId}/unpin
```

```jsonc { title="Response" }
{
  "success": true
}
```

### Edit message
You can edit **text** messages or **"caption"** in media messages.

```http request
PUT /api/{session}/chats/{chatId}/messages/{messageId}
```
👉 Remember to escape `@` in `chatId` and `messageId` with `%40`.

So if you want to edit `true_123@c.us_AAA` message in `123@c.us` chat you need to send request to:
```http request
PUT /api/{session}/chats/123%40c.us/messages/true_123%40c.us_AAA
```

```jsonc { title="Body" }
{
  "text": "Hello, world!"
}
```

### Delete message
You can delete messages from the chat.

```http request
DELETE /api/{session}/chats/{chatId}/messages/{messageId}
```

👉 Remember to escape `@` in `chatId` and `messageId` with `%40`.

So if you want to delete `true_123@c.us_AAA` message in `123@c.us` chat you need to send request to:
```http request
DELETE /api/{session}/chats/123%40c.us/messages/true_123%40c.us_AAA
```

### Delete all messages
Use the method to clear all messages from the chat

```http request
DELETE /api/{session}/chats/{chatId}/messages 
```

## Events
Read more about 
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

### chat.archive
{{< include file="content/docs/how-to/chats/webhooks-chat-archive.md" >}}
