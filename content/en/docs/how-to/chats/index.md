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
- `limit` - limit the number of chats to return
- `offset` - skip the number of chats from the start

If you see timeout or the request takes too long - consider using `limit` parameter to get chats in smaller chunks

```
GET /api/{session}/chats?limit=100&offset=0
```

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

### Delete chat
Use the method to delete chat

`DELETE /api/{session}/chats/{chatId}`


### Get messages
Get 100 messages from the chat

`GET /api/{session}/chats/{chatId}/messages?limit=100`


Get 100 messages from the chat, skip downloading media (images, files)

`GET /api/{session}/chats/{chatId}/messages?limit=100&downloadMedia=false`

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
