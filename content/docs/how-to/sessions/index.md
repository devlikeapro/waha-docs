---
title: "🖥️ Sessions"
description: "All about sessions (WhatsApp accounts) actions."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 210
slug: sessions
images: ["waha-session-lifecycle.png"]
---

**Session** represents a **WhatsApp Account (Phone Number)** connected to **WAHA**
that you can use to send and receive messages.

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/sessions/features.md" >}}

{{< include file="content/docs/how-to/sessions/features-events.md" >}}

## Session Lifecycle

Before you can
[**📤 Send**]({{< relref "/docs/how-to/send-messages" >}})
or
[**📥 Receive**]({{< relref "/docs/how-to/receive-messages" >}})
messages
, you need to [**Create**](#create-session) a session (optionally, [**Start**](#start-session)) and authenticate it using
[**QR code**](#get-qr) or [**pairing code**](#get-pairing-code).

Here's Session Lifecycle State Diagram:

{{< imgo src="waha-session-lifecycle.png" >}}


### Session Status

Here's the list of possible `session.status` values:

- `STOPPED` - session is stopped
- `STARTING` - session is starting
- `SCAN_QR_CODE` - session is required to scan QR code or login via phone number.
    - The `SCAN_QR_CODE` is issued every time when QR updated (WhatsApp requirements)
    - Every time you receive the `session.status` event with `SCAN_QR_CODE` status,
      you need to [**fetch updated QR ->**]({{< relref "/docs/how-to/sessions#get-qr" >}}), because it's changed.
- `WORKING` - session is working and ready to use
- `FAILED` - session is failed due to some error. It's likely either authorization is required again or device has been
  disconnected from that account.
  Try to [**Restart**](#restart-session) the session and if it doesn't help - [**Logout**](#logout-session) and 
[**Start **](#start-session) the session again.


## Create Session

In order to create (and start) a new session - with [**Session Config**](#session-config).

```http request
POST /api/sessions
```

```jsonc { title="Body" }
{
  // "name" is Optional - it'll be generated automatically
  "name": "default",
  "config": {
    // Read about Session Config below
      ...
  }
}
```

```jsonc { title="Response" }
{
  "name": "session_123123123",
  // if name is not provided - it'll be generated automatically
  "status": "STARTING",
  "engine": {
    "engine": "WEBJS"
  },
  "config": {
    ...
  },
  "me": null
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-create.md" >}}

{{< callout >}}
**WAHA** uses session `name` more like "id", but we call it `name` for historical and compatibility reasons.
{{< /callout >}}

### Postpone start

By default, the session starts right after creation.
You can create a session and postpone its start by setting `start` field to `false`.
It'll create a session in `STOPPED` status, and you can start it later by calling `POST /api/sessions/{session}/start`.

```jsonc { title="Body" }
{
  "name": "default",
  "start": false
}

```

## Session Config
**Full possible config** for a session:

```jsonc
{
  "name": "default",
  "config": {
    "debug": true,
    // Only for NOWEB engine
    "noweb": {
      "store": {
        "enabled": true,
        "fullSync": false
      }
    },
    // Only for WEBJS engine
    "webjs": {
      "tagsEventsOn": false
    },
    // Use "metadata" to save additional information.
    "metadata": {
      "user.id": "123",
      "user.email": "email@example.com"
    },
    "ignore": {
      "status": false,
      "groups": false,
      "channels": false
    },
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ],
        // Optional
        "hmac": {
          "key": "your-secret-key"
        },
        // Optional
        "customHeaders": [
          {
            "name": "X-My-Custom-Header",
            "value": "Value"
          }
        ],
        // Optional
        "retries": {
          "policy": "constant",
          "delaySeconds": 2,
          "attempts": 15
        }
      }
    ],
    // Optional
    "proxy": {
      "server": "localhost:3128",
      // Optional - username, password
      "username": "username",
      "password": "P@ssw0rd"
    }
  }
}
```


### Metadata
![Dashboard - Metadata](session-config-metadata.png)

`metadata` is an attribute on Session objects that lets you store more information,
structured as key-value pairs,
to sessions for your own use and reference. 
For example, you can store your user’s unique identifier from your system.

Associated `metadata` field is available in:
1. [List Sessions](#list-sessions) and [Get Session](#get-session)  responses
2. [**🔄 Events**]({{< relref "events#metadata" >}}) events
3. [**📊 Dashboard**]({{< relref "dashboard" >}}) for view, and search sessions by metadata


```json
{
  "name": "default",
  "config": {
    "metadata": {
      "user.id": "123",
      "user.email": "email@example.com"
    }
  }
}
```

Sample `metadata` use cases:
- **Link IDs**: Attach your system’s unique IDs to a Session object to simplify lookups. For example, add your user or tenant id.
- **Customer details**: Annotate a customer by storing an internal information (email, customer name) for your future 
use, so you don't have to look into two systems.

WAHA does not use metadata for any internal purposes, it's up to you how to use it.

### Webhooks
![Dashboard - Webhooks](session-config-webhooks.png)

Read more about
[**🔄 Events - Webhooks**]({{< relref "/docs/how-to/events#webhooks" >}}).

You can configure webhooks for a session:

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

**Full possible webhook config**:
```jsonc
{
  "name": "default",
  "config": {
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ],
        // Optional
        "hmac": {
          "key": "your-secret-key"
        },
        // Optional
        "customHeaders": [
          {
            "name": "X-My-Custom-Header",
            "value": "Value"
          }
        ],
        // Optional
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

👉 Read more about available options on
[**🔄 Webhooks**]({{< relref "/docs/how-to/events#webhooks-advanced-imagesversionspluspng" >}}) page.


### Ignore
![Dashboard - Ignore Chats](session-config-ignore.png)

You can ignore events from certain chat types for a session by adding `config.ignore`.
This helps save resources and avoids unnecessary HTTP requests over
[**🔄 Webhooks**]({{< relref "docs/how-to/events#webhooks" >}})
by filtering at the source.

What is **filtered**:
- [**🔄 Events**]({{< relref "docs/how-to/events" >}}) for the ignored chat types (no webhooks for them)
- [**🗄️ Storage**]({{< relref "/docs/how-to/storages" >}}) do not save messages to database (GOWS/NOWEB engines)

What is **NOT filtered**:
- [**📤 Sending messages**]({{< relref "/docs/how-to/send-messages" >}}) to these chats — sending is not limited.
- Low-level [**engine.event**]({{< relref "/docs/how-to/events#engineevent" >}}) (you still receive them)


```json
{
  "name": "default",
  "config": {
    "ignore": {
      "status": true,
      "groups": false,
      "channels": true,
      "broadcast": true
    }
  }
}
```

- `config.ignore.status=true` - ignore [**🟢 Status**]({{< relref "/docs/how-to/status" >}})
- `config.ignore.groups=true` - ignore [**👥 Groups**]({{< relref "/docs/how-to/groups" >}})
- `config.ignore.channels=true` - ignore [**📢 Channels**]({{< relref "/docs/how-to/channels" >}})
- `config.ignore.broadcast=true` - ignore 📡 Broadcast (`*@broadcast`), excluding `status@broadcast` (use `config.ignore.status` for Status)

If you don't provide `config.ignore` - it'll use configuration from environment variables [**⚙️ Configuration**]({{< relref "/docs/how-to/config#sessions---ignore-chats" >}}).



### Proxy

![Dashboard - Proxy](session-config-proxy.png)

You can configure proxy for a session by setting `config.proxy` fields when you create or update a session.

- `server` - proxy server address, without `http://` or `https://` prefixes
- `username` and `password` - set this if the proxy requires authentication

**No authentication**

```json
{
  "name": "default",
  "config": {
    "proxy": {
      "server": "localhost:3128"
    }
  }
}
```

**Proxy with authentication**

```json
{
  "name": "default",
  "config": {
    "proxy": {
      "server": "localhost:3128",
      "username": "username",
      "password": "P@ssw0rd"
    }
  }
}
```

You can configure proxy when for all sessions by set up environment variables.
Read more about it on [**Proxy page** ->]({{< relref "/docs/how-to/proxy" >}}) or [**Configuration page** ->]({{<
relref "/docs/how-to/config#proxy" >}}).

### WEBJS

![Dashboard - WEBJS](session-config-webjs.png)

{{< include file="content/docs/engines/webjs/-session-config.md" >}}

### NOWEB
![Dashboard - NOWEB](session-config-noweb.png)

[**NOWEB Engine**]({{< relref "/docs/how-to/engines" >}}) 
has a specific store that allows you to save session data.

You need to add `config.noweb` field to activate the store:

```json
{
  "name": "default",
  "config": {
    "noweb": {
      "store": {
        "enabled": true,
        "fullSync": false
      }
    }
  }
}
```

👉 Read more about [**NOWEB Store Configuration**]({{< relref "/docs/engines/noweb#store" >}}).

### Debug

You can enable debug mode for a session by setting `config.debug` to `true`.
This enables more verbose logs for that session (equivalent to using a `WAHA_LOG_LEVEL=debug` for that session).
Useful when you’re troubleshooting a specific session.

```json
{
  "name": "default",
  "config": {
    "debug": true
  }
}
```

For system‑wide logging controls, see [**⚙️ Configuration → Logging**]({{< relref "/docs/how-to/config#logging" >}})
- You can increase verbosity even more by setting `WAHA_LOG_LEVEL=trace` (use with care in production).


## Update Session

In order to update a session - call `PUT /api/sessions/{session}` with a **full** new configuration
(see the possible `config` in [**Session Config**](#session-config) section)

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

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-update.md" >}}

⚠️ If the session not in `STOPPED` status, it'll be **stopped** and **started** with a new configuration.

## Start Session

In order to start a session - call

```http request
POST /api/sessions/{session}/start
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-start.md" >}}

🎯 **Idempotent operation** - you can call it multiple times, and it'll start the session only if it's not running.

## Stop Session

In order to stop a session - call 

```http request
POST /api/sessions/{session}/stop
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-stop.md" >}}

ℹ️ **Stop** doesn't **Log out** or **Delete** anything

🎯 **Idempotent operation** - you can call it multiple times, and it'll stop the session only if it's running.

## Restart Session

In order to start a session - call

```http request
POST /api/sessions/{session}/restart
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-restart.md" >}}

⚠️ If the session is already running (status is not `STOPPED`), it'll be **stopped** and **started**.

## Logout Session

In order to log out the session - call 

```http request
POST /api/sessions/{session}/logout
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-logout.md" >}}

⚠️ If the session is running (not in `STOPPED` status), it'll be **logged out** and **started** from scratch.

👉 If the session in `WORKING` status it'll also remove associated device from **Connected Devices** list in the app.

ℹ️ **Log out** removes **session information** (authentication info and data),
but keeps the **session's configuration**, so you can start a new session with the same configuration.

## Delete Session

In order to delete a session - call 

```http request
DELETE /api/sessions/{session}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-delete.md" >}}

⚠️ **Delete** also **logs out** the session (removes both session configuration and data).

⚠️ **Delete** also **stops** the session if it's running (session status is not `STOPPED`)

🎯 **Idempotent operation**  - you can call it multiple times, and it'll stop the session only if it exists.

## List Sessions

To get session list - call 

```http request
GET /api/sessions
```

```jsonc { title="Response" }
[
  {
    "name": "default",
    "status": "WORKING",
    "config": {
      "proxy": null,
      "webhooks": [
        {
          "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
          "events": [
            "message",
            "session.status"
          ],
          "hmac": null,
          "retries": null,
          "customHeaders": null
        }
      ],
      "debug": false
    },
    "me": {
      "id": "79111111@c.us",
      "pushName": "WAHA"
    },
    "engine": {
      "engine": "NOWEB"
    }
  }
]
```

You can add `?all=true` parameter to the request it'll show you ALL session, including **STOPPED**.

```http request
GET /api/sessions?all=true
```

## Get Session

To get information about a specific session - call

```http request
GET /api/sessions/{session}
```

```jsonc { title="Response" }
{
  "name": "default",
  "status": "WORKING",
  "config": {
    "proxy": null,
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message",
          "session.status"
        ],
        "hmac": null,
        "retries": null,
        "customHeaders": null
      }
    ],
    "debug": false
  },
  "me": {
    "id": "79111111@c.us",
    "pushName": "WAHA"
  },
  "engine": {
    "engine": "NOWEB"
  }
}
```

## Get screenshot

Get screenshot of the session's screen.

### Binary

```http request
GET /api/screenshot?session=default
```

### Base64

You can get screenshot in base64 format by adding `Accept: application/json` header to the request.

```http request
GET /api/screenshot?session=default
```

```http request {title="Headers"}
Accept: application/json
```

```jsonc { title="Response" }
{
  "mimetype": "image/png",
  "data": "base64-encoded-data"
}
```

You can change it in Swagger by clicking on **Media Type** dropdown and selecting **application/json**:

{{< imgo src="/images/swagger-media-type.png" alt="swagger" >}}

{{< include file="content/docs/how-to/sessions/api-session-screenshot.md" >}}

## Get me

ℹ️ You'll get the same info if you request `GET /api/sessions/{session}` in `me` field.

Get information about the associated account for that session (if any).

```http request
GET /api/sessions/{session}/me
```

**Authenticated and working** session's response:

```jsonc { title="Response" }
{
  "id": "11111111111@c.us",
  "pushName": "string"
}
```

**Stopped** or **not authenticated** session returns `null`:

```jsonc { title="Response" }
null
```

{{< include file="content/docs/how-to/sessions/api-session-me.md" >}}

## Get QR

The simplest way to authenticate a new session - get QR code and scan it on your device.

```http request
GET /api/{session}/auth/qr
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-qr.md" >}}

You'll get QR image that you can scan and get authenticated

You can get QR in different formats:

1. **binary image** - `GET /api/{session}/auth/qr`
2. **base64 image** - `GET /api/{session}/auth/qr` and set `Accept: application/json` header
3. **raw** - `GET /api/{session}/auth/qr?format=raw`

### Binary

**Binary image** - **default** format, you'll get image in response

```bash
# Get image - binary
GET /api/{session}/auth/qr

# OR
GET /api/{session}/auth/qr?format=image

# OR specify Accept header as well
GET /api/{session}/auth/qr?format=image
Accept: image/png
```

### Base64

**Base64 image** - you'll get image in base64 format in response if you set `Accept: application/json` header.

```http request
GET /api/{session}/auth/qr?format=image
```

```http request {title="Headers"}
Accept: application/json
```

```jsonc { title="Response" }
{
  "mimetype": "image/png",
  "data": "base64-encoded-data"
}
```

You can change it in Swagger by clicking on **Media Type** dropdown and selecting **application/json**:

{{< imgo src="/images/swagger-media-type.png" alt="swagger" >}}

### Raw

**Raw** - you'll get raw data in response, you can use it **to generate QR code on your side** with the `value`.

```http request
GET /api/{session}/auth/qr?format=raw
```

```jsonc { title="Response" }
{
  "value": "value-that-you-need-to-use-to-generate-qr-code"
}
```

## Get pairing code

See the list of engines [**that support the features ->**]({{< relref "/docs/how-to/engines#features" >}}).

You can [link a session with phone number](https://faq.whatsapp.com/1324084875126592) - make a request to the endpoint.

```http request
POST /api/{session}/auth/request-code
```

Body example:

```json
{
  "phoneNumber": "12132132130"
}
```

You'll get code in the need to enter in **WhatsApp app** to authenticate the session:

```jsonc { title="Response" }
{
  "code": "ABCD-ABCD"
}
```

👉 **Always** add to [**QR code auth flow**](#get-qr) in your application as a fallback, 
because the pairing code is not always available and works as expected.

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/sessions/api-session-pairing-code.md" >}}

## Events

Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

### session.status

The `session.status` event is triggered when the session status changes.

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

## engine.event
Internal event that is triggered when the engine emits an event.

```jsonc { title="engine.event" }
{
  "id": "evt_11111111111111111111111111",
  "session": "default",
  "event": "engine.event",
  "payload": {
    "session": "default",
    "event": "{{engine.EventName}}",
    "data": {
      "field": "value"
    }
  },
  "timestamp": 1742102571277,
  "metadata": {},
  "me": {
    "": null
  },
  "environment": {
    "": null
  }
}
```

## Advanced sessions 

With [WAHA Plus version]({{< relref "waha-plus" >}}) you can save session state to avoid scanning QR code everytime,
configure autostart options so when the docker container restarts - it restores all previously run sessions!

### Session persistent

If you want to save your session and do not scan QR code everytime when you launch WAHA -
[connect the session storage to the container ->]({{< relref "/docs/how-to/storages#sessions" >}})

### Autostart

By default, WAHA track which session have been run on which worker and restart it when 
worker got restarted. If you want to disable it - set `WAHA_WORKER_RESTART_SESSIONS=False` in 
environment variable.

### Multiple sessions

If you want to save server's CPU and Memory - run multiple sessions inside one docker container!
[Plus version]({{< relref "waha-plus" >}}) supports multiple sessions in one container.

## DEPRECATED

Before new granular API we have a simple API to control the session.

**Kindly switch to new API** that allows you to control the session **in a more flexible way**.

### Start
The endpoint **Create** (if not exists),
**Update** (if existed before) and **Start** a new session.

```http request
POST /api/sessions/start
```

Accepts the same configuration as
[Create](#create-session) and [Update](#update-session) API.

```jsonc { title="Body" }
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

### Stop

```http request
POST /api/sessions/stop
```

- **Stop** if `logout: false`
- **Stop**, **Logout** and **Delete** session if `logout: true`

```jsonc { title="Body" }
{
  "name": "default",
  "logout": true
}
```

### Logout

**Logout** and **Delete** session.

```http request
POST /api/sessions/logout
```

```jsonc { title="Body" }
{
  "name": "default"
}
```
