---
title : "🔄 Events"
description: "Events - how to set up and handle them using Webhooks and Websockets"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 223
slug: events
images: [ "webhooks.png" ]
aliases:
  - /docs/how-to/events
  - /docs/how-to/webhooks
  - /docs/how-to/websockets
---

In order to notify your application about events in the WhatsApp API, you can use 
[**Webhooks**](#webhooks) and [**Websockets**](#websockets).

👉 See the list of all available events in the [**Events**](#events) section.

🌟 You can observe **Events** in real-time using 
[**📊 Dashboard - Event Monitor**]({{< relref "dashboard#event-monitor" >}})!

## Webhooks

<div style="width: 500px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="webhooks.png" alt="Webhooks" >}}
</div>

**Webhooks** are a way for two different applications to communicate with each other in real-time.
When a certain event happens in one application, it sends a message to another application through a webhook URL.
The receiving application can then take action based on the information received.

### Session webhooks
You can define webhooks configuration per session when you start it with `POST /api/sessions/` request data.

Here's a simple example:
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

Here's available configuration options for webhooks
```json
{
  "name": "default",
  "config": {
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ],
        "hmac": {
          "key": "your-secret-key"
        },
        "retries": {
          "policy": "constant",
          "delaySeconds": 2,
          "attempts": 15
        },
        "customHeaders": [
          {
            "name": "X-My-Custom-Header",
            "value": "Value"
          }
        ]
      }
    ]
  }
}
```

### Global webhooks
There's a way how you can configure
[**🔄 Webhooks**]({{< relref "/docs/how-to/events#webhooks" >}})
for **all sessions** at once - by settings these environment variables:

- `WHATSAPP_HOOK_URL=https://webhook.site/11111111-1111-1111-1111-11111111`  - to set up a URL for the webhook
- `WHATSAPP_HOOK_EVENTS=message,message.any,state.change` - specify events. 
  - `WHATSAPP_HOOK_EVENTS=*` - subscribe to all events. 
  - We don't suggest using `*` or all events for production, it can generate a lot of requests.
- `WHATSAPP_HOOK_HMAC_KEY=your-secret-key` - the same as `hmac.key` field in the webhook configuration.
- `WHATSAPP_HOOK_RETRIES_POLICY=linear` - the same as `retries.policy` field in the webhook configuration.
- `WHATSAPP_HOOK_RETRIES_DELAY_SECONDS=2` - the same as `retries.delaySeconds` field in the webhook configuration.
- `WHATSAPP_HOOK_RETRIES_ATTEMPTS=4`
- `WHATSAPP_HOOK_CUSTOM_HEADERS=X-My-Custom-Header-1:Value;X-My-Custom-Header-2:Value` - the same as `customHeaders` field in the webhook configuration.
  - Use `Header:Value` format and separate them by `;`.

That webhook configuration **does not appear** in `session.config` field in `GET /api/sessions/` request.


💡 You can open [https://webhook.site](https://webhook.site) and paste URL from it to `url` field,
and you'll see all requests immediately in your browser to intercept the webhook's payload.

### Retries
You can configure retry policy for webhooks by settings `config.retries` structure when `POST /api/sessions/`:

```json
{
  "name": "default",
  "config": {
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ],
        "retries": {
          "policy": "constant",
          "delaySeconds": 2,
          "attempts": 15
        }
      }
    ]
  }
}

```

Possible `policy`:
- `constant` - retry with the same delay between attempts (2, 2, 2, 2)
- `linear` - retry with linear backoff (2, 4, 6, 8)
- `exponential` - retry with exponential backoff with 20% jitter (2, 4.1, 8.4, 16.3).

### Headers
When you receive a webhook request to your API endpoint, you'll get **those headers**:
- `X-Webhook-Request-Id` - unique request id for each webhook request.
- `X-Webhook-Timestamp` - Unix timestamp in milliseconds when the webhook was sent.

If you're using [**HMAC authentication**](#hmac-authentication) you'll get two additional headers:
- `X-Webhook-Hmac` - message authentication code for the raw **body** in HTTP POST request that send to your endpoint.
- `X-Webhook-Hmac-Algorithm` - `sha512` - algorithm that have been used to create `X-Webhook-Hmac` value.

You can send any **customer headers** by defining `config.webhooks.customHeaders` fields this way:
```json
{
  "name": "default",
  "config": {
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ],
        "customHeaders": [
          {
            "name": "X-My-Custom-Header",
            "value": "Value"
          }
        ]
      }
    ]
  }
}
```


### HMAC authentication

You can authenticate webhook sender by using [HMAC Authentication](https://www.okta.com/identity-101/hmac/).

1. Define you secret key in `config.hmac.key` field when you start session with `POST /api/sessions/`:

```json
{
  "name": "default",
  "config": {
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ],
        "hmac": {
          "key": "your-secret-key"
        }
      }
    ]
  }
}
```

2. After that you'll receive all webhooks payload with two additional headers:
- `X-Webhook-Hmac` - message authentication code for the raw **body** in HTTP POST request that send to your endpoint.
- `X-Webhook-Hmac-Algorithm` - `sha512` - algorithm that have been used to create `X-Webhook-Hmac` value.

3. Implement the authentication algorithm by hashing body and using secret key and then verifying it with `X-Webhook-Hmac`
value. Please [check your implementation here ->](https://www.devglan.com/online-tools/hmac-sha256-online)

Here's example for
```
# Full body
{"event":"message","session":"default","engine":"WEBJS"}
# Secret key
my-secret-key
# X-Webhook-Hmac-Algorithm
sha512
# X-Webhook-Hmac
208f8a55dde9e05519e898b10b89bf0d0b3b0fdf11fdbf09b6b90476301b98d8097c462b2b17a6ce93b6b47a136cf2e78a33a63f6752c2c1631777076153fa89
```

### Examples
Here's few examples of how to handle webhook in different languages:
1. [Python guide]({{< relref "/docs/integrations/waha+python" >}})

**Do you use another language?**

Please create a short guide how to handle webhook and send message after you finish your setup!
You can create a pull request with your favorite language in the
[GitHub, in examples folder ->](https://github.com/devlikeapro/waha/tree/core/examples).

## Websockets
You can use Websockets to receive messages in real-time!

Install [websocat](https://github.com/vi/websocat?tab=readme-ov-file#installation) first.

```bash
# Listen all sessions and events
# -E to end the connection when the server closes it
websocat -E ws://localhost:3000/ws

# Use secure (SSL/HTTPS) connection - add wss://
websocat -E wss://localhost:3000/ws

# Add your API key
websocat -E ws://localhost:3000/ws?x-api-key=123

# Listen all sessions and events
websocat -E ws://localhost:3000/ws?session=*&events=*

# Listen certain events
websocat -E ws://localhost:3000/ws?session=*&events=session.status&events=message

# If you want to see the logs and ping the server every 10 seconds
websocat -v --ping-interval=10 -E ws://localhost:3000/ws

# Listen certain session
websocat -E ws://localhost:3000/ws?session=default&events=session.status

# With API Key
websocat -E ws://localhost:3000/ws?x-api-key=123
```

Parameters:
- `session` - session name, `*` for all sessions
- `events` - list of events, `*` for all events
  - `events=*` doesn't include `engine.event`. You need to specify `events=*&events=engine.event` if you want to listen all events
- `x-api-key` - your API key

### Examples
#### JavaScript
```javascript
// Configuration
const apiKey = '123'; // Replace with your API key
const baseUrl = 'ws://localhost:3000/ws';
const session = '*'; // Use '*' to listen to all sessions
const events = ['session.status', 'message']; // List of events to listen to

// Construct the WebSocket URL with query parameters
const queryParams = new URLSearchParams({
    'x-api-key': apiKey,
    session,
    ...events.reduce((acc, event) => ({ ...acc, events: event }), {}) // Add multiple 'events' params
});
const wsUrl = `${baseUrl}?${queryParams.toString()}`;

// Initialize WebSocket connection
const socket = new WebSocket(wsUrl);

// Handle incoming messages
socket.onmessage = (event) => {
    console.log('Received:', event.data);
};

// Handle errors
socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

// Handle connection open
socket.onopen = () => {
    console.log('WebSocket connection established:', wsUrl);
};

// Handle connection close
socket.onclose = () => {
    console.log('WebSocket connection closed');
};
```

## Event Payload
### Structure
In [**Webhooks**](#webhooks) or [**Websockets**](#websockets) you'll receive the following payload:

```json
{
  // lower case ULID - https://github.com/ulid/spec
  "id": "evt_1111111111111111111111111111",
  // timestamp in milliseconds
  "timestamp": 1741249702485,
  // event name
  "event": "message",
  // session name
  "session": "default",
  // 'metadata' provided when you created the session
  "metadata": {
    "user.id": "123",
    "user.email": "email@example.com"
  },
  // me - your own contact, if authenticated and WORKING
  "me": {
    "id": "71111111111@c.us",
    "pushName": "~"
  },
  "payload": {
    ... // event specific data
  },
  "environment": {
    "tier": "PLUS",
    "version": "2023.10.12"
  },
  "engine": "WEBJS"
}
```

### Metadata
You can provide additional `metadata` when you start the session with
[**Start Session**]({{< relref "/docs/how-to/sessions#start-session" >}})
request data.

```jsonc { title="message" }
{
  "event": "message",
  "session": "default",
  // 'metadata' provided when you created the session
  "metadata": {
    "user.id": "123",
    "user.email": "email@example.com"
  },
  ...
}
```

You'll receive the same `metadata` in the webhook payload.


## Events
Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):


{{< include file="content/docs/how-to/events/features-events.md" >}}

### session.status
The `session.status` event is triggered when the session status changes.
- `STOPPED` - session is stopped
- `STARTING` - session is starting
- `SCAN_QR_CODE` - session is required to scan QR code or login via phone number
    - When you receive the `session.status` event with `SCAN_QR_CODE` status, you can [**fetch updated QR ->**]({{< relref "/docs/how-to/sessions#get-qr" >}})
    - The `SCAN_QR_CODE` is issued every time when QR updated (WhatsApp requirements)
- `WORKING` - session is working and ready to use
- `FAILED` - session is failed due to some error. It's likely that authorization is required again or device has been disconnected from that account.
  Try to restart the session and if it doesn't help - logout and start the session again.

```jsonc { title="session.status" }
{
    "event": "session.status",
    "session": "default",
    "me": {
        "id": "7911111@c.us",
        "pushName": "~"
    },
    "payload": {
        "status": "WORKING",
        "statuses": [ 
            {
                "status": "STOPPED",
                "timestamp": 1700000001000,
            },
            {
                "status": "STARTING",
                "timestamp": 1700000002000,
            },
            {
                "status": "WORKING",
                "timestamp": 1700000003000,
            },
        ],
    },
    "engine": "WEBJS",
    "environment": {
        "version": "2023.10.12",
        "engine": "WEBJS",
        "tier": "PLUS"
    }
}
```
- `status` - current session status
- `statuses` - recent 3 statuses

### message

Incoming message (text/audio/files)

```jsonc { title="message" }
{
  "event": "message",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "timestamp": 1667561485,
    "from": "11111111111@c.us",
    "fromMe": true,
    "source": "app",
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
- `source: app|api` - can be `api` for [message.any](#messageany) event if you send a message via WAHA API. Otherwise, it's `app`.

It's possible to have `hasMedia: true`, but `media: null` - it means WAHA didn't download media due to configuration.

### message.any

Fired on all message creations, including your own. The payload is the same as for [message](#message) event.

```jsonc { title="message.any" }
  "event": "message.any",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    ...
  }
}
```

Fields:
- `source: app|api` - can be `api` for [message.any](#messageany) event if you send a message via WAHA API. Otherwise, it's `app`.

### message.reaction
Receive events when a message is reacted to by a user (or **yourself** reacting to a message).
- `payload.reaction.text` - emoji that was used to react to the message. It'll be an empty string if the reaction was removed.
- `payload.reaction.messageId` - id of the message that was reacted to.

```jsonc { title="message.reaction" }
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

{{< callout context="note" icon="outline/info-circle" >}}
NOWEB engine note - reactions were sent in 'message' and 'message.any' events, not it's available only in 'message.reaction'!" 
{{< /callout >}}

### message.ack
Receive events when server or recipient gets the message, read or played it.

`ackName` field contains message status (`ack` has the same meaning, but show the value in int, but we keep it for backward compatability, they much to each other)

Possible message ack statuses:
- `ackName: ERROR, ack: -1` - error occurred
- `ackName: PENDING, ack: 0` - message is pending
- `ackName: SERVER, ack: 1` - message was sent to server
- `ackName: DEVICE, ack: 2` - message was sent to the device
- `ackName: READ, ack: 3` - recipient read message
- `ackName: PLAYED, ack: 4` - recipient played the message


The payload may have more fields, it depends on the engine you use, but here's a minimum amount that all engines send:
```jsonc { title="message.ack" }
{
  "event": "message.ack",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    "id":"true_11111111111@c.us_4CC5EDD64BC22EBA6D639F2AF571346C",
    "from":"11111111111@c.us",
    "participant": null,
    "fromMe":true,
    "ack":3,
    "ackName":"READ"
  }
}
```

### message.waiting
Happens when you see
[Waiting for this message. This may take a while.](https://faq.whatsapp.com/3398056720476987)
on your phone.

![waiting for this message](waiting-for-this-message.jpg)

```jsonc { title="message.waiting" }
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

### message.edited
The `message.edited` event is message edited

```jsonc { title="message.edited" }
{
  "event": "message.edited",
  "session": "default",
  "payload": {
    "id": "false_1231243123@c.us_BBBBBBBBBBBBBBBBBBBBB[_participant]",
    ...,
    "editedMessageId": "AAAAAAAAAAAAAAAA",
    "body": "New body",
    "_data": ...,
  }
}
```

**Fields**:
- `message.id` - message if for **edit action**
  - In format `false_{chatId}_{revokeActionMessageId}[_{participant}]`
  - It's not the **revoked** message (but it can be the same, for instance, in **WEBJS**)
- `editedMessageId` - the **edited message id** in format `{messageId}`, without `chatId`
- `body` - the new body (text) of the message

### message.revoked
The `message.revoked` event is triggered when a user, whether it be you or any other participant,
revokes a previously sent message.

```jsonc { title="message.revoked" }
{
  "event": "message.revoked",
  "session": "default",
  "payload": {
    "after": {
      "id": "false_1231243123@c.us_BBBBBBBBBBBBBBBBBBBBB[_participant]",
      "_data": ...,
      ...,
    },
    "revokedMessageId": "AAAAAAAAAAAAAAAA",
    "before": null
  }
}
```

**Fields**:
- `after.id` - message if for **revoke action**
  - In format `false_{chatId}_{revokeActionMessageId}[_{participant}]`
  - It's not the **revoked** message (but it can be the same, for instance, in **WEBJS**)
- `revokedMessageId` - the **revoked message id** in format `{messageId}`, without `chatId` 
- `before` - is `null` in most cases.

### chat.archive
{{< include file="content/docs/how-to/chats/webhooks-chat-archive.md" >}}

### group.v2.join
{{< include file="content/docs/how-to/groups/events-group.v2.join.md" >}}

### group.v2.leave
{{< include file="content/docs/how-to/groups/events-group.v2.leave.md" >}}

### group.v2.participants
{{< include file="content/docs/how-to/groups/events-group.v2.participants.md" >}}

### group.v2.update
{{< include file="content/docs/how-to/groups/events-group.v2.update.md" >}}

### presence.update

{{< include file="content/docs/how-to/presence/-events-presence.update.md" >}}


### poll.vote
We have a dedicated page [how to send polls and receive votes]({{< relref "/docs/how-to/polls" >}})!

```jsonc { title="poll.vote" }
{
  "event": "poll.vote",
  "session": "default",
  "payload": {
    "vote": {
      "id": "false_1111111111@c.us_83ACBE602A05C79B234B54415E95EE8A",
      "to": "me",
      "from": "1111111@c.us",
      "fromMe": false,
      "selectedOptions": ["Awesome!"],
      "timestamp": 1692861427
    },
    "poll": {
      "id": "true_1111111111@c.us_BAE5F2EF5C69001E",
      "to": "1111111111@c.us",
      "from": "me",
      "fromMe": true
    }
  },
  "engine": "NOWEB"
}
```

### poll.vote.failed
We have a dedicated page [how to send polls and receive votes]({{< relref "/docs/how-to/polls" >}})!

```jsonc { title="poll.vote.failed" }
{
  "event": "poll.vote.failed",
  "session": "default",
  "payload": {
    "vote": {
      "id": "false_11111111111@c.us_2E8C4CDA89EDE3BC0BC7F605364B8451",
      "to": "me",
      "from": "111111111@c.us",
      "fromMe": false,
      "selectedOptions": [],
      "timestamp": 1692956972
    },
    "poll": {
      "id": "true_1111111111@c.us_BAE595F4E0A2042C",
      "to": "111111111@c.us",
      "from": "me",
      "fromMe": true
    }
  },
  "engine": "NOWEB"
}
```

### event.response
Read more about
[**📅 Event Message**]({{< relref "/docs/how-to/event-message" >}})

{{< include file="content/docs/how-to/event-message/events-event-response.md" >}}

### event.response.failed

Read more about
[**📅 Event Message**]({{< relref "/docs/how-to/event-message" >}})

{{< include file="content/docs/how-to/event-message/events-event-response-failed.md" >}}

### label.upsert

```jsonc { title="label.upsert" }
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

### label.deleted

```jsonc { title="label.deleted" }
{
  "event": "label.deleted",
  "session": "default",
  "payload": {
    "id": "10",
    "name": "",
    "color": 14,
    "colorHex": "#00a0f2"
  },
  "engine": "NOWEB",
  ...
}

```

### label.chat.added

```jsonc { title="label.chat.added" }
{
  "event": "label.chat.added",
  "session": "default",
  "payload": {
    "labelId": "6",
    "chatId": "11111111111@c.us",
    "label": null <=== right after scanning QR it can be null. 
  },
  "engine": "NOWEB",
  ...
}
```

### label.chat.deleted

```jsonc { title="label.chat.deleted" }
{
  "event": "label.chat.deleted",
  "session": "default",
  "payload": {
    "labelId": "6",
    "chatId": "11111111111@c.us",
    "label": null
  },
  "engine": "NOWEB",
  ...
}
```

### call.received

{{< include file="content/docs/how-to/calls/webhooks-call-received.md" >}}

### call.accepted

{{< include file="content/docs/how-to/calls/webhooks-call-accepted.md" >}}

### call.rejected

{{< include file="content/docs/how-to/calls/webhooks-call-rejected.md" >}}

### engine.event
Low-level engine event, for **debug** and **troubleshooting** purposes.

```jsonc { title="engine.event" }
{
  "event": "engine.event",
  "session": "default",
  "engine": "NOWEB",
  "payload": {
    "event": "messages.upsert",
    "data": {"":  ""}
  }
}
```

## Deprecated Events

### group.join
{{< include file="content/docs/how-to/groups/events-group.join.md" >}}

### group.leave
{{< include file="content/docs/how-to/groups/events-group.leave.md" >}}


### state.change
⚠️ **DEPRECATED**, use `session.status` event instead.

It's an internal engine's state, not **session** `status`.

```jsonc { title="state.change" }
{
  "event": "state.change",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    ...
  }
}
```
