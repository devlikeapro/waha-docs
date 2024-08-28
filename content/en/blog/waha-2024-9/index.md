---
title: "WAHA 2024.9 - S3, Session API, Metadata, Dashboard and more!"
description: "We are thrilled to announce the release of WAHA 2024.9"
excerpt: "We are thrilled to announce the release of WAHA 2024.9 🎉"
date: 2024-08-27T08:48:45+00:00
draft: false
weight: 50
images: ["WAHA 2024.9.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
aliases: 
  - /blog/waha-2024-9/
  - /blog/waha-2024.9-session-api-metadata-dashboard-and-more
---

🎉 We are thrilled to announce the release of [**WAHA 2024.9**]({{< relref "/docs/overview/changelog#20249" >}}) 🎉 

The release has a lot of changes, but we'll cover only few of them in this blog post, 
kindly check the [**🆕 Changelog**]({{< relref "/docs/overview/changelog#20249" >}}) 
for the full list of changes.

## Session API
{{< img src="/images/waha/waha-session-lifecycle.png" >}}

We've added a new [**🖥️ Sessions API**]({{< relref "/docs/how-to/sessions" >}}) 
to manage the session lifecycle.

Now you can change configuration after the session is created,
you can log out the session without removing it, and more!


## Session Metadata
`metadata` is an attribute on Session objects that lets you store more information,
structured as key-value pairs,
to sessions for your own use and reference.
For example, you can store your user’s unique identifier from your system.

Associated `metadata` field is available in:
1. [List Sessions](#list-sessions) and [Get Session](#get-session)  responses
2. [**🔄 Webhooks**]({{< relref "webhooks#metadata" >}}) events
3. [**📊 Dashboard**]({{< relref "waha-dashboard" >}}) for view, and search sessions by metadata


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

👉 Read more
[**🖥️ Sessions - Metadata**]({{< relref "/docs/how-to/sessions#metadata" >}}) 

## Media S3 Storage
You can use the S3 storage to store the media files.

{{< img src="/images/waha/storages/waha-storages.drawio.png" >}}

Any **S3 Compatible** storage can be used, such as AWS S3, MinIO, DigitalOcean Spaces, etc. For in-house solutions, you can use [**MinIO**](https://min.io/).

{{< include file="content/en/docs/how-to/storages/docker-compose.md" >}}

<br>

After you enabled S3 here's example for [**message**]({{< relref "/docs/how-to/webhooks#message" >}}) webhook payload:
```json
{
  "event": "message",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    "id": "true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "hasMedia": true,
    "media": {
        "url": "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg",
        "mimetype": "image/jpeg",
        "filename": null,
        "s3": {
            "Bucket": "bucket-name",
            "Key": "/default/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg"
        },
        "error": null // if there was an error during file download
    }
    ...
  }
}
```
in addition to `media.*` field it will have `media.s3.*` field with the S3 bucket information.


👉 Read more [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}})


## Dashboard
Here's a quick overview of new features available in Dashboard:

{{< img src="/images/blog/waha-2024-9/dashboard-overview.png" >}}
- **Server Uptime** - see how long your server is running
- **Server Restart** - restart the server
- **Session Metadata** - see the metadata of the session
- **Session Actions** - see the actions available for the session
- **Session Bulk Actions** - see the bulk actions available for the session


{{< img src="/images/blog/waha-2024-9/dashboard-server.png" >}}
- **Server Environment Variables** - see the environment variables of the server
- **Server Uptime**

{{< img src="/images/blog/waha-2024-9/dashboard-session.png" >}}
- **Session Metadata** - add metadata to the session

## Reply on Message
You can reply on a message with any type of message now by adding `reply_to` in the request!
```bash
POST /api/sendText
```

```json
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "reply_to": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
  "text": "Reply text"
}

```

Read more about [**📤 Send messages - reply_to**]({{< relref "/docs/how-to/send-messages#reply_to" >}})

## Server API
### Get server status

Returns the server status, start timestamp, and uptime.

```
GET /api/server/status
```

```json
{
  "startTimestamp": 1723788847247,
  "uptime": 3600000
}
```

### Restart (stop) server

You can stop the server by calling

```
POST /api/server/stop
```

```json
{
  // By default, it gracefully stop all sessions and connections
  // but you can force it to stop immediately
  "force": false
}
```
👉 If you're using Docker and followed [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) guide,
Docker will **automatically restart** the server, so you can use this endpoint to **restart** the server.



## Thank you all for your support! 🙏
All these changes were made possible by the amazing community of supporters!

We are grateful for your contributions and feedback. 🚀

<p style="font-size: 8rem" class="text-center">
🫶
</p>

