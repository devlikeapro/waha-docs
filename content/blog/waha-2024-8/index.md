---
title: "WAHA 2024.8 - WhatsApp Business Labels API, Chat Archive and more!"
description: "Introducing WAHA 2024.8 - WhatsApp Business Labels API, Chat Archive and more!"
excerpt: "Introducing WAHA 2024.8 - WhatsApp Business Labels API, Chat Archive and more!"
date: 2024-08-01T08:48:45+00:00
draft: false
weight: 50
images: ["WAHA 2024.8.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
---

🎉 We are thrilled to announce the release of [**WAHA 2024.8**]({{< relref "/docs/overview/changelog#20248" >}}) 🎉 


## WhatsApp Business Labels API
You can now work with **WhatsApp Labels** available in WhatsApp Business using the API!

![alt](whatsapp-labels.png)

### Labels API

Here's **Get labels** API example:

```http request
GET /api/{session}/labels
```

Response:

```json
[
  {
    "id": "1",
    "name": "New Client",
    "color": 1,
    "colorHex": "#64c4ff"
  },
  ...
]
```

👉 Read more about the WhatsApp Business Labels API on [**🏷️ Labels**]({{< relref "docs/how-to/labels" >}}) page!

### Labels Events
You can now receive information about label creation, update, and deletion using webhooks!

```json { title="label.upsert" }
{
  "event": "label.upsert",
  "session": "default",
  "payload": {
    "id": "10",
    "name": "Label Name",
    "color": 14,
    "colorHex": "#00a0f2"
  },
  "engine": "NOWEB",
  ...
}

```
👉 Read more about the Labels Events on [**🏷️ Labels**]({{< relref "docs/how-to/labels#webhooks" >}}) page!

## Chat archive/unarchive
You can now **archive and unarchive** WhatsApp Chats using API and 
receive events about chat archive in WhatsApp using webhooks!

![alt](whatsapp-archive.jpeg)
### Chat archive API

Use the method to **archive** chat
```http request
POST /api/{session}/chats/{chatId}/archive
```

Use the method to **unarchive** chat

```http request
POST /api/{session}/chats/{chatId}/unarchive
```


👉 Read more about the endpoints on [**💬 Chats**]({{< relref "docs/how-to/chats#archive-chat" >}}) page!

### Chat archive Events
Enable `chat.archive` event when starting a new session 
and receive information about chat archive in WhatsApp using events:

```json { title="chat.archive" }
{
  "event": "chat.archive",
  "session": "default",
  "payload": {
    "id": "123123123@c.us",
    "timestamp": 1667561485,
    "archived": true <== or false
  },
  ...
}
```

👉 Read more about the events on [**🔄 Webhooks**]({{< relref "docs/how-to/events#chatarchive" >}}) page!


## Calls Events
Now when the WhatsApp account receives (rejects and accepts) a new call - you can receive information about 
that using new `call.*` webhooks!

![alt](whatsapp-phone-call.png)

Enable `call.*` events when starting a new session
and receive information about calls in WhatsApp using events:

```json { title="call.received" }
{
  "event": "call.received",
  "session": "default",
  "payload": {
    "id": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "from": "22222222222@c.us",
    "timestamp": 1721374000,
    "isVideo": false,
    "isGroup": false
  },
  ...
}
```

👉 Read more about the events on [**📞 Calls**]({{< relref "docs/how-to/calls" >}}) page!

## And more!

👉 Read the full [**🆕 Changelog**]({{< relref "/docs/overview/changelog#20248" >}}) for WAHA 2024.8 release!
