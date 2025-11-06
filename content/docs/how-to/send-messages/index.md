---
title: "📤 Send messages"
description: "Describe how to send messages."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 220
images: ["messages.jpg"]
slug: send-messages
---

We assume that you've already run the Docker container and authenticated the session with a QR code.

If you haven't yet - please follow the steps from [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}).

<div style="width: 500px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="messages.jpg" alt="WhatsApp Messages" >}}
</div>

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/send-messages/features.md" >}}

## Fields

There are common fields that you can find in almost all requests:

```json
{
  "session": "default",
  "chatId": "12132132130@c.us",
  "file": "..."
}
```

### session

`session` - a session name from which account you're sending the message. We use `default` in the examples.

- Core  version supports only `default` session.
- Plus  allows you to run multiple sessions inside one container to save your memory and
  CPU resources!

Read more about [multiple sessions →]({{< relref "/docs/how-to/sessions" >}})

### chatId

`chatId` - this is a phone number or Group identifier where you're sending the message.

{{< include file="content/docs/how-to/receive-messages/-chat-ids.md" >}}

👉 To get the actual `chatId` for 🇧🇷 **Brazilian phone number** - use `chatId` field from
[Check phone number exists]({{< relref "/docs/how-to/contacts#check-phone-number-exists" >}})
response.

Read more
about [error sending text to half of Brazilian numbers (every number registered before 2012) ->](https://github.com/devlikeapro/waha/issues/238)

### file

When sending media (images, voice, files) you can either use:

- `file.data` field [with base64 encoded file](https://base64.guru/converter/encode/file)
- `file.url` field with public available URL for that file

See the list of engines [**that support the feature ->**]({{< relref "/docs/how-to/engines#features" >}}).

### reply_to

You can add the `reply_to` field in order to reply to a specific message.

```json
{
  "chatId": "11111111111@c.us",
  ...
  "reply_to": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA"
}
```

`reply_to` is available in all messages

## Send Seen

If you get a new message via [**🔄 Events**]({{< relref "docs/how-to/events#message" >}})
and want to reply to that message, you need to first send that you've seen the message
(double green tick) - read [**⚠️ How to Avoid Blocking**]({{< relref "docs/overview/how-to-avoid-blocking" >}})

{{< callout context="note" title="Read all unread messages in the chat" >}}
Check 
[**💬 Chats - Read messages**]({{< relref "/docs/how-to/chats#read-messages" >}}) API
to read messages without providing message id.
{{< /callout >}}

```http request
POST /api/sendSeen
```

Send seen (read a message) for **all unread** messages **older than 7 days** (30 max for DM, 100 max for groups)
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us"
}
```

In **NOWEB** and **GOWS** 
[**🏭 Engines**]({{< relref "/docs/how-to/engines" >}})
you can control what messages to read by using `messagesIds` (or deprecated `messageId`) field:

Send seen for **direct message**:

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "messageIds": [
    "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA"
  ]
}
```

Send seen for **Group Message** you need to provide `participant` field:

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@g.us",
  "messageIds": [
    "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA_33333333333@c.us"
  ],
  "participant": "33333333333@c.us"
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendSeen-code.md" >}}

## Send Text
Use the API to send text messages to the chat.

```http request
POST /api/sendText
```

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "12132132130@c.us",
  "text": "Hi there!"
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendText-code.md" >}}

Here's some additional options:
- `reply_to: false_1111@c.us_AAA` - to reply on a message
- `mentions` - to mention a contact in a group
- `linkPreview: false` - to disable preview generation for links in the message

### Link preview

```http request
POST /api/sendText
```

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "12132132130@c.us",
  "text": "Hi there!",
  "linkPreview": true,
  "linkPreviewHighQuality": true
}
```

If the text has a link - it generates a preview for that link. You adjust the behavior by setting
- `linkPreview: true` - to enable link preview
- `linkPreviewHighQuality: true` - to enable high-quality link preview (requires additional upload to WA servers)

{{< details-html "🖼️ **Link Preview** Screenshot" >}}
{{< imgo src="whatsapp-link-preview.jpg" alt="WhatsApp Link Preview" >}}
{{< /details-html >}}

{{< callout context="tip" title="Custom Link Preview" icon="outline/info-circle" >}}
If link preview generation process fails or site protects it with captcha - you can generate your own preview and
[**Send Custom Link Preview**](#send-link-custom-preview)
{{< /callout >}}


### Reply on message

To reply on a message - add `reply_to` field:

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "reply_to": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
  "text": "Reply text"
}
```

### Mention contact

If you send a message in a group and want to mention a participant in the message -
use `mentions` field for that in `POST /api/sendText` request.

Please note that you MUST mention a number in the text as well in the format `@2132132130` and
also mention it in `mentions` in format `2132132130@c.us`

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "12132132130@c.us",
  "text": "Hi there! @2132132130",
  "mentions": [
    "2132132130@c.us"
  ]
}
```

{{< callout context="tip" icon="outline/hand-finger-right" title="Mention Everyone in a Group" >}}
In **groups**, you can mention all participants at once by using the `"all"` keyword in the `mentions` field:
```jsonc { title="Body (Mention All)" }
{
  "session": "default",
  "chatId": "12132132130@c.us",
  "text": "Hi there, check this out!",
  "mentions": [ "all" ]
}
```
{{< /callout >}}

## Send Image
Use API to send images to the chat.

```http request
POST /api/sendImage
```

You can send images in two ways:

1. Provide a **URL** for the image.
2. Encode the whole file content into **BASE64** and send it in the request body.

{{< tabs "send-image-body" >}}
{{< tab "URL" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "image/jpeg",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg",
    "filename": "filename.jpeg"
  },
  "caption": "string"
}
```
{{< /tab >}}

{{< tab "BASE64" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "image/jpeg",
    "filename": "filename.jpeg",
    "data": "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"
  },
  "caption": "string"
}
```
{{< /tab >}}
{{< /tabs >}}
{{< include file="content/docs/how-to/send-messages/media-image-format.md" >}}

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendImage-code.md" >}}

## Send Voice
Use API to send voice messages to the chat.

```http request
POST /api/sendVoice
```

You can send voice messages in two ways:

1. Provide a **URL** for the voice.
2. Encode the whole file content into **BASE64** and send it in the request body.


{{< tabs "send-voice-body" >}}
{{< tab "URL" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.opus"
  },
  "convert": false
}
```
{{< /tab >}}

{{< tab "BASE64" >}}
```jsonc { title="Body" }
{
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "audio/ogg; codecs=opus",
    "filename": "voice-message.mp3",
    "data": "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"
  },
  "session": "default",
  "convert": false
}
```
{{< /tab >}}
{{< /tabs >}}

**Fields**:
- `file` - provide **one of** the fields:
  - `url` - URL to the file
  - `data` - Base 64 encoded binary content of the file
- `convert: false` - convert the file to the right format. **Default:** `false`
  - Set `convert: true` if you don't have the right format, check the format note below.

{{< include file="content/docs/how-to/send-messages/media-voice-format.md" >}}

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendVoice-code.md" >}}

### Media - Convert Voice
{{< include file="content/docs/how-to/send-messages/media-voice-convert.md" >}}


## Send Video
```http request
POST /api/sendVideo
```
Use API to send a video to a chat.

You can send video messages in two ways:

1. Provide a **URL** for the file and the API will download and send it in the request body.
2. Provide the file as a **BASE64** string in the request body.

{{< tabs "send-video-body" >}}
{{< tab "URL" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "caption": "Watch this video!",
  "asNote": false,
  // aka video note, rounded video
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/video.mp4"
  },
  "convert": false
}
```
{{< /tab >}}

{{< tab "BASE64" >}}
```jsonc { title="Body" }
{
  "chatId": "11111111111@c.us",
  "caption": "Watch this video!",
  "asNote": false,
  // aka video note, rounded video
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "data": "AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQyAAAHEW1vb3YAAABsbXZoZAAAAADgAUTa4AFE2gAAdTAAAHe6AAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAANzdHJhawAAAFx0a2hkAAAAA+ABRNrgAUTaAAAAAQAAAAAAAHVOAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAUAAAAC0AAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAB1TgAAA+kAAQAAAAAC621kaWEAAAAgbWRoZAAAAADgAUTa4AFE2gAAdTAAAHVOVcQAAAAAAF9oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAASVNPIE1lZGlhIGZpbGUgcHJvZHVjZWQgYnkgR29vZ2xlIEluYy4gQ3JlYXRlZCBvbjogMDIvMDIvMjAyMy4AAAACZG1pbmYAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAIkc3RibAAAAJhzdHNkAAAAAAAAAAEAAACIYXZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAUAAtAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAADJhdmNDAWQAH//hABtnZAAfrNEAUAW7AWoCAgKAAAH0gAB1MAeMGIkBAARo648sAAAAGHN0dHMAAAAAAAAAAQAAAB4AAAPpAAAAKHN0c2MAAAAAAAAAAgAAAAEAAAAOAAAAAQAAAAMAAAACAAAAAQAAABxzdGNvAAAAAAAAAAMAAAcxAAAq7wAAS24AAACMc3RzegAAAAAAAAAAAAAAHgAAA0kAAAAyAAAAJQAAACYAAAAmAAAAKQAAACUAAAAlAAAAJQAAACkAAAAlAAAAJQAAACUAAAApAAAAJAAAACQAAAAkAAAAJwAAACQAAAAkAAAAJQAAACYAAAAlAAAAJQAAACUAAAAmAAAAJQAAACUAAAAlAAAAKgAAABRzdHNzAAAAAAAAAAEAAAABAAAAiGN0dHMAAAAAAAAADwAAAAEAAAPpAAAAAQAAD6QAAAADAAAAAAAAAAEAAA+kAAAAAwAAAAAAAAABAAAPpAAAAAMAAAAAAAAAAQAAD6QAAAADAAAAAAAAAAEAAA+kAAAAAwAAAAAAAAABAAAPpAAAAAMAAAAAAAAAAQAAE40AAAAEAAAAAAAAABR2bWhkAAAAAQAAAAAAAAAAAAACuHRyYWsAAABcdGtoZAAAAAPgAUTa4AFE2gAAAAIAAAAAAAB3ugAAAAAAAAAAAAAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAlRtZGlhAAAAIG1kaGQAAAAA4AFE2uABRNoAAKxEAACwABXHAAAAAABfaGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAElTTyBNZWRpYSBmaWxlIHByb2R1Y2VkIGJ5IEdvb2dsZSBJbmMuIENyZWF0ZWQgb246IDAyLzAyLzIwMjMuAAAAAc1taW5mAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABkXN0YmwAAABpc3RzZAAAAAAAAAABAAAAWW1wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAACsRAAAAAAANWVzZHMAAAAAAycAAgAEH0AVAAAAAAAAAAAAAAAFEBIQAAAAAAAAAAAAAAAAAAAGAQIAAAAYc3R0cwAAAAAAAAABAAAALAAABAAAAAAoc3RzYwAAAAAAAAACAAAAAQAAABUAAAABAAAAAwAAAAIAAAABAAAAHHN0Y28AAAAAAAAAAwAADHYAACz0AABLvQAAAMRzdHN6AAAAAAAAAAAAAAAsAAABcwAAAXQAAAFzAAABdAAAAXMAAAF0AAABcwAAAXQAAAFzAAABdAAAAXMAAAF0AAABcwAAAXQAAAFzAAABdAAAAXMAAAF0AAABcwAAAXQAAAFzAAABdAAAAXMAAAF0AAABcwAAAXQAAAF0AAABcwAAAXQAAAFzAAABdAAAAXMAAAF0AAABcwAAAXQAAAFzAAABdAAAAXMAAAF0AAABcwAAAXQAAAFzAAABdAAAAXMAAAAQc21oZAAAAAAAAAAAAAAAcnVkdGEAAABqbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAA9aWxzdAAAABlnc3N0AAAAEWRhdGEAAAABAAAAADAAAAAcZ3N0ZAAAABRkYXRhAAAAAQAAAAAxMDY4AABHe21kYXQAAANFJbhABd/+9Y2vmWVRi0/fwl7Vp8FFIlFodBXWJ7AAAAMAAAMAAAMAAAMCb3w7b+xvu484N6S/wPJaC8sMAAADApIAAAxYAAEIAAAaIAAD7AAAqQAAIeAABmgAAcgAAHOAACMgAAnwAAPEAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAAzkv4VetcGPbngLXvkqeR7JxISR12BgR++cnsBM31J1hURZirB4HGwWvpFdPC289mAkjXLCSyIdvFR3dv6aHr0B82L8J9Xog23WabSqb8cO+rmTPXAgY7aaIpgPquTfAAAJQGERBcipJr4m65wx3o3poM4QuaQq1SlHkzKL3Tov43kRfCoIa5GVUZ6CE6rriYcm72C827hp2mDdqNx6fHB1jsnRsQxit03/N5XMsHAWWiLnLJlru6Fjs4nF8PgsKqHV100N02/K4Lui85ShIhYz0cYsI7cmrr9AQCKLf3rbXvAOQEK9iZ3ELwGrUemoiVtzbbFzFplif1tWr4bGWSBRmylGBomUYqlh1w2hY5WSz2e+e7EcHvZ3AoMWZIUkvohRPbA016vF3x1mlXVR5P1rFnPwA9O12c73pWqAnTtHi4IAABARcfYC/FQsIkx5nfpXAi1MP7Uyt1kxrRbxQyilN42vcIBU33ywVC0b3cmIpGpnrZ4Z8LXriYPNJkqXUN5+h61ktEcZ1ymfgp77JtlJItHJN+fuhrxPY8HucNaFPQrChl1Ud+EN4SuQWg4TvEUl5O7cM275b8BOxJtWfRMVkuL/A93UIq3SWPbsd9Dd06g+obkwgq9up6u9YZkWczBlwDmK5gitbPbKN4o1ZI7AAAOLsX06bPLKB01V+iAw3xjzslG/7US1WFR/CRaZZ5EIoPL0xOxVV/wmQeGC5YwF7JNsJLtWzbrAJl/y1td4SJ5Tw1iu0O1RsxzaEkmLjU/lPicm/sSMjMcK1Tw4SwcuwXwlCRbCcqWoNDNOJZK3+YBqxBc8XHcOrAAAJCIWAAAvoK4AAQw+gAAefAAAB/vwAAQwIAADMiAAA+XoAAZvgAAOJsAAK8cAAKXMAAKNgAANGgAAVBAAACTAAAFAAADAC5AAAIMAAAaMVdIAAAALiHiTIXf/eEAAAMAAAMAAAMAAAMCGogH7ip1N+0CWY7DPZHZwAAAAwAAAwAEHaAAAAAhAakHyLf/AAADAAADAAADAAADABkThmAAAAMAAAMAAxaIAAAAIgGpC8jX/wAAAwAAAwAAAwAAAwAVSr7ewAAAAwAAAwAHXcAAAAAiAakPyNf/AAADAAADAAADAAADABVKvt7AAAADAAADAAddwAAAACUh5IohV//8hAAAAwAAAwAAAwAAAwAEcKP8u5AAAAMAAAMAAQdwAAAAIQGpl8i3/wAAAwAAAwAAAwAAAwAZE4ZgAAADAAADAAMWiAAAACEBqZvIt/8AAAMAAAMAAAMAAAMAGROGYAAAAwAAAwADFogAAAAhAamfyLf/AAADAAADAAADAAADABkThmAAAAMAAAMAAxaIAAAAJSHmyiE3//pYAAADAAADAAADAAADAAi4gzWuQAAAAwAAAwADMiAAAAAhAaonyJf/AAADAAADAAADAAADAByn5+AAAAMAAAMABN2QAAAAIQGqK8iX/wAAAwAAAwAAAwAAAwAcp+fgAAADAAADAATdkAAAACEBqi/Il/8AAAMAAAMAAAMAAAMAHKfn4AAAAwAAAwAE3ZAAAAAlIekKIRf/+lgAAAMAAAMAAAMAAAMACLPP13NAAAADAAADAAO6YCEABQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHohEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3p4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUhEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcCEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcCEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH0hEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3p4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHYhEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAciEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcyEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4hEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3p4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHohEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdyEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeiEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAgAaq3yd8AAAMAAAMAAAMAAAMAHrvIgAAAAwAAAwAFtJAAAAAgAaq7yd8AAAMAAAMAAAMAAAMAHrvIgAAAAwAAAwAFtJAAAAAgAaq/yd8AAAMAAAMAAAMAAAMAHrvIgAAAAwAAAwAFtJAAAAAjIetKI9/zIAAAAwAAAwAAAwAAAwAVW8H+swAAAwAAAwAAEvcAAAAgAatHyV8AAAMAAAMAAAMAAAMAKY8KAAADAAADAAAIOyAAAAAgAatLyV8AAAMAAAMAAAMAAAMAKY8KAAADAAADAAAIOyAAAAAhAatPyJf/AAADAAADAAADAAADAByn5+AAAAMAAAMABN2QAAAAIiHtiiNf5EAAAAMAAAMAAAMAAAMAAAMAAAMAAAMAAAMCgiAAAAAhAavXyLf/AAADAAADAAADAAADAAADAAADAAADAAADAO6YAAAAIQGr28i3/wAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwDumAAAACEBq9/It/8AAAMAAAMAAAMAAAMAAAMAAAMAAAMAAAMA7pgAAAAiIe/aIt+HAAADAAADAAADAAADAAADAAADAAADAAADAAmagAAAACEBrGfIl/8AAAMAAAMAAAMAAAMAAAMAAAMAAAMAAAMBF3AAAAAhAaxryJf/AAADAAADAAADAAADAAADAAADAAADAAADARdwIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUhEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3p4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUhEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfiEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeiEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfyEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEhEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3p4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4hEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfSEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcyEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwhEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3p4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHohEAUAoBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeCEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfiEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHkAAAAhAaxvyJf/AAADAAADAAADAAADAAADAAADAAADAAADARdwAAAAIQGsc8iX/wAAAwAAAwAAAwAAAwAAAwAAAwAAAwAAAwEXcAAAAAEKIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6IRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN6cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHI="
  },
  "session": "default",
  "convert": false
}
```
{{< /tab >}}
{{< /tabs >}}

**Fields**:
- `file` - provide **one of** the fields:
  - `url` - URL to the file
  - `data` - Base 64 encoded binary content of the file
- `convert: false` - convert the file to the right format. **Default:** `false`
  - Set `convert: true` if you don't have the right format, check the format note below.

{{< include file="content/docs/how-to/send-messages/media-video-format.md" >}}

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendVideo-code.md" >}}

### Media - Convert Video

{{< include file="content/docs/how-to/send-messages/media-video-convert.md" >}}


## Send File

Use API to send a file (as a document/attachment) to a chat.

```http request
POST /api/sendFile
```

You can send files in two ways:

1. Provide a **URL** for the file.
2. Encode the whole file content into **BASE64** and send it in the request body.

{{< tabs "send-file-body" >}}
{{< tab "URL" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "caption": "Check this out!",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "image/jpeg",
    "filename": "filename.jpeg",
    "url": "https://raw.githubusercontent.com/devlikeapro/waha/core/examples/video.mp4"
  }
}
```
{{< /tab >}}

{{< tab "BASE64" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "file": {
    "mimetype": "image/jpeg",
    "filename": "filename.jpeg",
    "data": "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"
  },
  "caption": "string"
}
```
{{< /tab >}}
{{< /tabs >}}

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendFile-code.md" >}}

## Send Poll

We have a dedicated page about [**📶 Polls**]({{< relref "/docs/how-to/polls" >}})!

![alt](poll-example.jpg)

```http request
POST /api/sendPoll
```

The request body is pretty simple:

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "123123123@c.us",
  "poll": {
    "name": "How are you?",
    "options": [
      "Awesome!",
      "Good!",
      "Not bad!"
    ],
    "multipleAnswers": false
  }
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendPoll-code.md" >}}

## Send Poll Vote

We have a dedicated page about [**📶 Polls**]({{< relref "/docs/how-to/polls" >}})!

```http request
POST /api/sendPollVote
```

## Send List
{{< callout context="caution" icon="outline/alert-octagon" title="List Messages May Stop Working Anytime" >}}
**List Messages** are fragile creatures and may stop working at any time.

We recommend adding fallback logic using
[**Send Text**](#send-text)
or 
[**📶 Polls**]({{< relref "/docs/how-to/polls" >}}).

{{< /callout >}}


{{< callout context="note" icon="outline/info-circle" title="Only Direct Message Chats" >}}
**List Messages** can only be sent to **direct chats (1:1)**. 

The `chatId` must be one of the following formats:  `phone`, `phone@c.us`, `{number}@lid`.
{{< /callout >}}

<p align="center" >
  <img style="max-height: 30rem" src="whatsapp-list-message-phone.webp" alt="WhatsApp List Message" />
</p>


Send a **list message** using API:

```http request
POST /api/sendList
```

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "reply_to": null,
  "message": {
    "title": "Simple Menu",
    "description": "Please choose an option",
    "footer": "Thank you!",
    "button": "Choose",
    "sections": [
      {
        "title": "Main",
        "rows": [
          {
            "title": "Option 1",
            "rowId": "option1",
            "description": null
          },
          {
            "title": "Option 2",
            "rowId": "option2",
            "description": null
          },
          {
            "title": "Option 3",
            "rowId": "option3",
            "description": null
          }
        ]
      }
    ]
  }
}
```


## Send Event
You can send Event Message using API

```http request
POST /api/{SESSION}/events
```

{{< callout context="note" icon="outline/info-circle" >}}
👉 Read more about how to send [**📅 Event Message**]({{< relref "/docs/how-to/event-message" >}}) and receive responses.
{{< /callout >}}

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendEvent-code.md" >}}


<div style="width: 500px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="whatsapp-event-message.jpg" alt="WhatsApp Event Message" >}}
</div>



## Send Link Custom Preview
{{< callout context="tip" icon="outline/hand-finger-right" >}}
Available in [**➕ WAHA Plus**]({{< relref "waha-plus#plus" >}}) version.
{{< /callout >}}

Using [/api/sendText](#send-text) 
you can send **auto-generated link previews**.

If you want to send a **custom link preview** in case of any errors or captcha during the link preview generation 
(like for Amazon: {{< issue 596 >}},{{< issue 880 >}} ), you can use the following API.

```http request
POST /api/send/link-custom-preview
```
{{< tabs "send-link-custom-preview-body" >}}
{{< tab "URL" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "text": "Check this out! https://github.com/",
  "linkPreviewHighQuality": true,
  "preview": {
    "url": "https://github.com/",
    "title": "Your Title",
    "description": "Check this out, this is a custom link preview!",
    "image": {
      "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
    }
  }
}
```
{{< /tab >}}

{{< tab "BASE64" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "11111111111@c.us",
  "text": "Check this out! https://github.com/",
  "linkPreviewHighQuality": true,
  "preview": {
    "url": "https://github.com/",
    "title": "Your Title",
    "description": "Check this out, this is a custom link preview!",
    "image": {
      "data": "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"
    }
  }
}
```
{{< /tab >}}
{{< /tabs >}}

{{< details-html "🖼️ **Link Preview** Screenshot" >}}
{{< imgo src="whatsapp-link-preview.png" alt="WhatsApp Link Preview" >}}
{{< /details-html >}}

**Fields**:
- `text` - must contain `preview.url` somewhere in the text
- `preview.url` - must be a valid URL
- `preview.title` - title of the link preview
- `preview.description` - description of the link preview
- `preview.image` - one of:
  - `preview.image.url` - URL of the image to be used in the link preview
  - `preview.image.data` - base64 encoded image data to be used in the link preview

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendLinkCustomPreview-code.md" >}}

## Forward Message

You can forward a message to another chat (that you chatted before, otherwise it may fail):

```http request
POST /api/forwardMessage
```

```jsonc { title="Body" }
{
  "chatId": "11111111111@c.us",
  "messageId": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
  "session": "default"
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-forwardMessage-code.md" >}}


## Edit message

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
  "text": "Hello, world!",
  "linkPreview": true
}
```

- `linkPreview: false` - to disable preview generation for links in the message

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-editMessage-code.md" >}}

## Delete message

You can delete messages from the chat.

```http request
DELETE /api/{session}/chats/{chatId}/messages/{messageId}
```

👉 Remember to escape `@` in `chatId` and `messageId` with `%40`.

So if you want to delete `true_123@c.us_AAA` message in `123@c.us` chat you need to send request to:

```http request
DELETE /api/{session}/chats/123%40c.us/messages/true_123%40c.us_AAA
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-deleteMessage-code.md" >}}


## Add a reaction
Use API to add a reaction to a message.

```http request
PUT /api/reaction
```

{{< callout context="note" title="Use PUT method" icon="outline/alert-octagon" >}}
Reaction API uses **PUT**, not **POST** request! Please make sure you send right request.
{{< /callout >}}


```jsonc { title="Body" }
{
  "messageId": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
  "reaction": "👍",
  "session": "default"
}
```

To **remove reaction from a message** - send empty string in the reaction request:

```jsonc { title="Body" }
{
  "messageId": "false_11111111111@c.us_AAAAAAAAAAAAAAAAAAAA",
  "reaction": "",
  "session": "default"
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-reaction-code.md" >}}

## Star and unstar message
Use API to star or unstar a message.

```http request
PUT /api/star
```

{{< callout context="note" title="Use PUT method" icon="outline/alert-octagon" >}}
Star API uses **PUT**, not **POST** request! Please make sure you send right request.
{{< /callout >}}

**Star:**

```jsonc { title="Body" }
{
  "messageId": "false_71111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "chatId": "71111111111@c.us",
  "star": true,
  "session": "default"
}
```

**Unstar:**

```jsonc { title="Body" }
{
  "messageId": "false_71111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "chatId": "71111111111@c.us",
  "star": false,
  "session": "default"
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-star-code.md" >}}

## Send contact (vcard)
Use the API to send contact (vcard)

```http request
POST /api/sendContactVcard
```

You can send contacts in multiple ways:

{{< tabs "send-vcard-body" >}}
{{< tab "Fields" >}}
```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "79111111@c.us",
  "contacts": [
    {
      "fullName": "John Doe",
      "organization": "Company Name",
      "phoneNumber": "+91 11111 11111",
      "whatsappId": "911111111111"
    }
  ]
}
```
{{</ tab >}}

{{< tab "vCard" >}}

```jsonc { title="Body" }
{
  "session": "default",
  "chatId": "79111111@c.us",
  "contacts": [
    {
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:Jane Doe\nORG:Company Name;\nTEL;type=CELL;type=VOICE;waid=911111111111:+91 11111 11111\nEND:VCARD"
    }
  ]
}
```
{{</ tab >}}

{{< tab "Combined" >}}
```jsonc { title="Body" }
  {
  "chatId": "79111111@c.us",
  "contacts": [
    {
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:Jane Doe\nORG:Company Name;\nTEL;type=CELL;type=VOICE;waid=911111111111:+91 11111 11111\nEND:VCARD"
    },
    {
      "fullName": "John Doe",
      "organization": "Company Name",
      "phoneNumber": "+91 11111 11111",
      "whatsappId": "911111111111"
    }
  ],
  "session": "default"
}
```
{{</ tab >}}

{{< /tabs >}}

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendContactVcard-code.md" >}}

## Send location

```http request
POST /api/sendLocation
```

```json
{
  "chatId": "11111111111@c.us",
  "latitude": 38.8937255,
  "longitude": -77.0969763,
  "title": "Our office",
  "session": "default"
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendLocation-code.md" >}}

## Send Status (aka stories)

You can send statuses (aka stories)!

Check out [**🟢 Status**]({{< relref "/docs/how-to/status" >}}) page.

## Send messages to Channels

You can send messages to channels!

Check out [**📢 Channels**]({{< relref "/docs/how-to/channels" >}}) page.

## Send Buttons Reply
If you're using **Official Business API** to send buttons and wanna "click" on the buttons 
(for testing or other purposes) you can do it using the API

```http request
POST /api/send/buttons/reply
```

```jsonc { title="Body" }
{
  "chatId": "11111111111@c.us",
  "replyTo": "false_11111111111@c.us_AAAAAAAAAAAAAAAAA",
  "selectedDisplayText": "No",
  "selectedButtonID": "button:id",
  "session": "default"
}
```

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendButtonsReply-code.md" >}}

{{< details "**How to get fields for the Body**" >}}
When you get `message` event to the session, you need to get some fields from it.

For testing purpose you can use [**📊 Dashboard - Event Monitor**]({{< relref "/docs/how-to/dashboard#event-monitor" >}}) to get the fields.

{{< tabs "send-buttons-reply-message" >}}
{{< tab "WEBJS" >}}
- **Message ID** - `payload.id` in format `false_11111111111@c.us_AAAAAAAAAA666`
- **Button ID** - `payload._data.dynamicReplyButtons.[1].buttonId` - like `button:id`
- **Button Display Text** - `payload._data.dynamicReplyButtons.[1].buttonText.displayText` - like `No`
{{< /tab >}}

{{< tab "NOWEB" >}}
- **Not implemented yet**
{{< /tab >}}
{{< tab "GOWS" >}}
- **Not implemented yet**
{{< /tab >}}
{{< /tabs >}}

{{< /details >}}

## Send Buttons
{{< callout context="danger" title="DEPRECATED - Buttons do not work at the moment!" icon="outline/alert-octagon" >}}
Buttons are fragile creatures and may not work as expected.

We recommend adding fallback logic using
[**Send Text**](#send-text)
or
[**📶 Polls**]({{< relref "/docs/how-to/polls" >}}).
{{< /callout >}}


![alt](send-buttons.jpg)

You can send **interactive message** (aka **buttons**) using

```http request
POST /api/sendButtons
```

```json
{
  "chatId": "11111111111@c.us",
  "header": "How are you?",
  "headerImage": {
    "mimetype": "image/jpeg",
    "filename": "filename.jpg",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
  },
  "body": "Tell us how are you please 🙏",
  "footer": "If you have any questions, please send it in the chat",
  "buttons": [
    {
      "type": "reply",
      "text": "I am good!"
    },
    {
      "type": "call",
      "text": "Call us",
      "phoneNumber": "+1234567890"
    },
    {
      "type": "copy",
      "text": "Copy code",
      "copyCode": "4321"
    },
    {
      "type": "url",
      "text": "How did you do that?",
      "url": "https://waha.devlike.pro"
    }
  ],
  "session": "default"
}
```

👉 `headerImage` is available only in
[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}})

Here's how you can call it from various languages:
{{< include file="content/docs/how-to/send-messages/api-sendButtons-code.md" >}}

Here's available buttons you can use in `buttons`:

{{< tabs "send-buttons-types" >}}
{{< tab "Quick Reply" >}}
```json
{
  // Optional id
  // "id": "123",
  "type": "reply",
  "text": "I am good!"
}
```
{{< /tab >}}


{{< tab "URL" >}}
```json
{
  "type": "url",
  "text": "How did you do that?",
  "url": "https://waha.devlike.pro"
}
```
{{< /tab >}}

{{< tab "Call" >}}
```json
{
  "type": "call",
  "text": "Call us",
  "phoneNumber": "+1234567890"
}
```
{{< /tab >}}

{{< tab "Copy" >}}
```json
{
  "type": "copy",
  "text": "Copy code",
  "copyCode": "4321"
}
```
{{< /tab >}}
{{< /tabs >}}
