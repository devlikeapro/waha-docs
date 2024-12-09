---
title : "💬 Chats"
description: "Chats"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: []
weight: 227
---

Chats methods.

## Features
Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/en/docs/how-to/chats/features.md" >}}

## Endpoints
Parameters in path that you can find in below endpoints:
- `{session}` - use the session name for Whatsapp instance that you created with `POST /api/sessions` endpoint
- `{chatId}` - chat id in format `123123123123@[c.us|g.us]`, `c.us` for direct chats and `g.us` for groups.

### Get all chats
Get all chats 
```
GET /api/{session}/chats
```

#### Chats Pagination
If you see timeout or the request takes too long - consider using `limit` parameter to get chats in smaller chunks

```
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


### Archive chat

Use the method to archive chat
```bash
POST /api/{session}/chats/{chatId}/archive
```

### Unarchive chat

Use the method to unarchive chat

```bash
POST /api/{session}/chats/{chatId}/unarchive
```

### Unread chat
Mark chat as unread

```bash
POST /api/{session}/chats/{chatId}/unread
```

### Delete chat
Use the method to delete chat

`DELETE /api/{session}/chats/{chatId}`


### Get messages
Get **10 messages** from the chat

```
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
- `filter.fromMe=false` - filter messages from me (by default shows all messages)

Get **10 messages** from the chat, skip **downloading media** (images, files)

```
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

```
GET /api/{session}/chats/{chatId}/messages?limit=10&filter.timestamp.gte=1727745026&filter.fromMe=false
```

👉 If you have more messages - you can set `offset` flag 
(increase it always for `limit` amount, even if you get less messages)
```
GET /api/{session}/chats/{chatId}/messages?limit=10&offset=10&filter.timestamp.gte=1727745026&filter.fromMe=false
```


### Get message by id
Get message by id 
```
GET /api/{session}/chats/{chatId}/messages/{messageId}?downloadMedia=true
```

```json
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

```
POST /api/{session}/chats/{chatId}/messages/{messageId}/pin
```

Payload:
```json
{
  "duration": 86400
}
```

- 24 hours - `duration=86400`
- 7 days - `duration=604800`
- 30 days - `duration=2592000`

Response:
```json
{
  "success": true
}
```

### Unpin message

```
POST /api/{session}/chats/{chatId}/messages/{messageId}/unpin
```

Response:
```json
{
  "success": true
}
```

### Edit message
You can edit **text** messages or **"caption"** in media messages.

```
PUT /api/{session}/chats/{chatId}/messages/{messageId}
```
👉 Remember to escape `@` in `chatId` and `messageId` with `%40`.

So if you want to edit `true_123@c.us_AAA` message in `123@c.us` chat you need to send request to:
```
PUT /api/{session}/chats/123%40c.us/messages/true_123%40c.us_AAA
```

**Payload:**
```json
{
  "text": "Hello, world!"
}
```

### Delete message
You can delete messages from the chat.

```
DELETE /api/{session}/chats/{chatId}/messages/{messageId}
```

👉 Remember to escape `@` in `chatId` and `messageId` with `%40`.

So if you want to delete `true_123@c.us_AAA` message in `123@c.us` chat you need to send request to:
```
DELETE /api/{session}/chats/123%40c.us/messages/true_123%40c.us_AAA
```

### Delete all messages
Use the method to clear all messages from the chat

`DELETE /api/{session}/chats/{chatId}/messages`

## Webhooks
### chat.archive
{{< include file="content/en/docs/how-to/chats/webhooks-chat-archive.md" >}}
