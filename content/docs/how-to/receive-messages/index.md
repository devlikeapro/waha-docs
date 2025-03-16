---
title : "📥 Receive messages"
description: "Describe how to receive messages from WhatsApp."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 221
images: ["messages.jpg"]
slug: receive-messages
---
We consider that you've run docker container and authenticated the session with QR code. 

If you haven't yet - please follow the steps from [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}).

You can use [**🔄 Events via Webhooks or Websockets**]({{< relref "/docs/how-to/events" >}}) to receive messages from WhatsApp to your application.

Start a new session with configured `message` event in webhooks - call `POST /api/sessions/` with the payload:
```json
{
  "name": "default",
  "config": {
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ]
      }
    ]
  }
}
```

After that WAHA sends events (see below) about new messages to an endpoint you provided.

{{< callout context="note" title="Observe Events" icon="outline/info-circle" >}}
To observe events and payload you can:
- Open [**📊 Dashboard / Event Monitor**]({{< relref "/docs/how-to/dashboard#event-monitor" >}}) and see the events in real-time
- Open [https://webhook.site](https://webhook.site), paste UUID from it to `url` field in webhook for a session
{{< /callout >}}

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/receive-messages/features-events.md" >}}

## Fields
### chatId, from, to, participant
You can see some in `from`, `to`, and `participant` fields here's what they mean:
- `123123123@c.us`  **Phone numbers** accounts - international phone number without + at the start and add `@c.us` at the end.
  For phone number `12132132131` the `chatId` is  `12132132131@c.us`
- `123123123@s.whatsapp.net` can also appear in **internal data for NOWEB**, just convert it to `@c.us` to work
with that properly. Kindly don't use it in `chatId` when sending messages
- `12312312123133@g.us` - **Groups** uses random number with `@g.us` at the end.
- `123123123@lid` - **is a hidden user ID**, each user has a regular ID along with a hidden one. WhatsApp added that type of ID along with communities functionality.
- `123123123@newsletter` - for [**📰 WhatsApp Channels**]({{< relref "/docs/how-to/channels" >}}).

### replyTo
If you get a message as a reply to another message, you'll see `replyTo` field with the message ID that was replied to.

```json { title="message" }
{
  "event": "message",
  "session": "default",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "timestamp": 1667561485,
    "from": "11111111111@c.us",
    "body": "Yes!",
    "replyTo": "false_22222222@c.us_AAAAAAAAAAAAAAAAAAA"
  }
}

```



## Events
Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

Here's examples of message-related events:

### message

Incoming message (text/audio/files)

```json { title="message" }
{
  "event": "message",
  "session": "default",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "timestamp": 1667561485,
    "from": "11111111111@c.us",
    "fromMe": true,
    "to": "11111111111@c.us",
    "body": "Hi there!",
    "hasMedia": false,
    "ack": 1,
    "vCards": [],
    "_data": {
      ...
    }
  }
}
```

Fields:
- `hasMedia: true | false` - indicates if the message has media attached
- `media.url: http://localhost:8000/...` - the URL to download the media
- `_data` - internal **engine** data, can be different for each engine

It's possible to have `hasMedia: true`, but `media: null` - it means WAHA didn't download media due to configuration.

### message.any

Fired on all message creations, including your own. The payload is the same as for [message](#message) event.

```json { title="message.any" }
{
  "event": "message.any",
  "session": "default",
  "payload": {}
}
```

### message.reaction
Receive events when a message is reacted to by a user (or **yourself** reacting to a message).
- `payload.reaction.text` - emoji that was used to react to the message. It'll be an empty string if the reaction was removed.
- `payload.reaction.messageId` - id of the message that was reacted to.

```json { title="message.reaction" }
{
    "event": "message.reaction",
    "session": "default",
    "me": {
        "id": "79222222222@c.us",
        "pushName": "WAHA"
    },
    "payload": {
        "id": "false_79111111@c.us_11111111111111111111111111111111",
        "from": "79111111@c.us",
        "fromMe": false,
        "participant": "79111111@c.us",
        "to": "79111111@c.us",
        "timestamp": 1710481111.853,
        "reaction": {
            "text": "🙏",
            "messageId": "true_79111111@c.us_11111111111111111111111111111111"
        }
    },
    "engine": "WEBJS",
    "environment": {
        "version": "2024.3.3",
        "engine": "WEBJS",
        "tier": "PLUS",
        "browser": "/usr/bin/google-chrome-stable"
    }
}
```

### message.ack
Receive events when server or recipient gets the message, read or played it.

```json { title="message.ack" }
{
  "event": "message.ack",
  "session": "default",
  "payload": {}
}
```

### message.waiting
Happens when you see
[Waiting for this message. This may take a while.](https://faq.whatsapp.com/3398056720476987)
on your phone.

![waiting for this message](waiting-for-this-message.jpg)

```json { title="message.waiting" }
{
  "event": "message.waiting",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "timestamp": 1667561485,
    "from": "11111111111@c.us",
    "fromMe": true,
    "to": "11111111111@c.us",
    ...
    "_data": {
      ...
    }
  }
}
```

### message.revoked

Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events#messagerevoked" >}}).

```json { title="message.revoked" }
{
  "event": "message.revoked",
  "session": "default",
  "payload": {
    "before": {
      "id": "some-id-here",
      "timestamp": "some-timestamp-here",
      "body": "Hi there!"
    },
    "after": {
      "id": "some-id-here",
      "timestamp": "some-timestamp-here",
      "body": ""
    }
  }
}
```


## Media Files

When people send you media - images, voice messages, and documents - WAHA saves it in the file storage.
In your application you must download it and use it as you want to. You can find the URL in `media.url` field.

For example, you can get the webhook like this with `media` value (we've skipped other fields):

```json { title="message" }
{
  "event": "message",
  "session": "default",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "timestamp": 1667561485,
    "body": "Check this out (caption for the media)!",
    "from": "11111111111@c.us",
    "hasMedia": true,
    "media": {
      "url": "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg",
      "mimetype": "image/jpeg",
      "filename": null,
      "error": null // if there was an error during file download
    }
  }
}
```

Fields:
- `hasMedia: true | false` - indicates if the message has media attached
- `media.url: http://localhost:8000/...` - the URL to download the media

It's possible to have `hasMedia: true`, but `media: null` - it means WAHA didn't download media due to configuration.

Then you can use the link to download the file `http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg`.

For documents (file attachments) there's also `filename` field with the original file name.
```json { title="message" }
{
  "event": "message",
  "session": "default",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "timestamp": 1667561485,
    "from": "11111111111@c.us",
    "media": {
      "url": "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.pdf",
      "filename": "some-file.pdf",
      "mimetype": "application/pdf",
      "error": null // if there was an error during file download
    }
  }
}
```

To configure the `media.url` you can use environment variables: 
- `WAHA_BASE_URL=https://waha.example.com` (only affects `media.url`)

Or define 
- `WHATSAPP_API_SCHEMA=https`,
- `WHATSAPP_API_HOSTNAME=waha.example.com`
- `WHATSAPP_API_PORT=3000`

By default, WAHA download all files that the account receive.
If you want to limit files lifetime, specify file types for download or change directory for files -
read more about [**⚙️ Configuration**]({{< relref "config" >}}).

## Endpoints
See the list of engines [**that support the feature ->**]({{< relref "/docs/how-to/engines#features" >}}).

### Get messages
Read messages from the history use API:

```http request
GET /api/messages
```

{{< callout context="caution" icon="outline/alert-triangle" >}}
We recommend using
[**🔄 Events via Webhooks or Websockets**]({{< relref "docs/how-to/events" >}})
instead of constantly calling it to prevent performance issues.
{{< /callout >}}

Accept the same parameters as
[**💬 Chats** - **Get messages from chat**]({{< relref "/docs/how-to/chats#get-messages" >}}) endpoint:

```bash
curl -X 'GET' \
  'http://localhost:3000/api/messages?chatId=11111111111%40c.us&limit=1000&session=default' \
  -H 'accept: application/json'
```

### Get message by id
You also can get message by id using
[**💬 Chats** - **Get message by id from chat**]({{< relref "/docs/how-to/chats#get-message-by-id" >}}) endpoint.

```http request
GET /api/{session}/chats/{chatId}/messages/{messageId}?downloadMedia=true
```

{{< callout context="note" icon="outline/alert-triangle" >}}
We recommend using
[**🔄 Events via Webhooks or Websockets**]({{< relref "docs/how-to/events" >}})
instead to prevent performance issues. 

However, for single message requests, you can retrieve the message by its ID to obtain the latest `ack`, for example.
{{< /callout >}}

## Examples
Here's few examples of how to receive messages in different languages:
1. [Python guide ->]({{< relref "/docs/integrations/waha+python" >}})

**Do you use another language?**

Please create a short guide how to handle webhook and send message after you finish your setup!
You can create a pull request with your favorite language in the
[GitHub, in examples folder ->](https://github.com/devlikeapro/waha/tree/core/examples).

