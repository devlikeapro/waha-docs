---
title: "WAHA 2024.12"
description: "WAHA 2024.12 - Chat UI API, Join Group, And More! 🎉"
excerpt: "WAHA 2024.12 - Chat UI API, Join Group, And More! 🎉"
date: 2024-12-30T08:48:45+00:00
draft: false
weight: 50
images: ["WAHA 2024.12.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-2024-12
---

🎉🎉🎉 First of all, **Happy New Year!** We wish you all the best in the New 2025 Year! 🎉🎉🎉

We are thrilled to announce the release of [**WAHA 2024.12**]({{< relref "/docs/overview/changelog#202412" >}})!

## Chat Overview API
We've added [**💬 Chats Overview API**]({{< relref "/docs/how-to/chats#get-chats-overview" >}})
to help you build your custom UI clients!

{{< imgo src="/images/waha/dashboard/waha-dashboard-chat-ui.png" >}}

Get chats "overview" - the API that almost all
[**Chat UI**]({{< relref "/docs/how-to/dashboard#chat-ui" >}})
client needs!

```http request
GET /api/{session}/chats/overview?limit=20&offset=0
```

**Response** contains the main info you need to show in the chat list:
1. `id` - chat id
2. `name` - chat name (if any)
3. `picture` - chat picture (if any)
4. `lastMessage` - last message in the chat (if any).
5. `_chat` - the structure depends on engine you're using

## Join Groups API
Now you can 
[**👥 Join Group**]({{< relref "/docs/how-to/groups#join-group" >}}) 
by link 
and get 
[**👥 Group Info**]({{< relref "/docs/how-to/groups#get-join-info-for-group" >}})
before joining!

If you have invite URL for a group (like `https://chat.whatsapp.com/invitecode`), you can

```bash
POST /api/{session}/groups/join
```

**Body**
```json
{
  "code": "invitecode"
}
```

or using full link:
```json
{
  "code": "https://chat.whatsapp.com/invitecode"
}
```

**Response**:
```json
{
  "id": "123123123@g.us"
}
```

## Profile Picture API improvements
We've added optimizations in 
[**💬 Get Chat Picture**]({{< relref "/docs/how-to/chats#get-chat-picture" >}})
and 
[**👤 Get Contact Profile Picture**]({{< relref "/docs/how-to/contacts#get-contact-profile-picture" >}})
API!

Before it could give rate-overlimit error, now it's optimized and faster!

## And More!
Check out the full [**WAHA 2024.12 🆕 Changelog**]({{< relref "/docs/overview/changelog#202412" >}}) for more details!


