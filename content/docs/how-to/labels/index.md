---
title: "🏷️ Labels"
description: "Labels (available in WhatsApp Business)"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 292
images: [ "whatsapp-labels.png" ]
slug: labels
---

You can work with [WhatsApp Labels](https://faq.whatsapp.com/3398508707096369/?cms_platform=android)
available in **WhatsApp Business** using the API!

<div style="width: 400px; margin: 0 auto;">
{{< img lqip="21x webp q20" src="whatsapp-labels.png" alt="WhatsApp Labels" >}}
</div>

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/labels/features.md" >}}

{{< include file="content/docs/how-to/labels/features-events.md" >}}

## Label color
You'll see two color-related fields in the body and response:
- `color: 1` - internal color number, `0-19` values.
- `colorHex: #64c4ff` - is the **latest known** hex color for the label


⚠️ It's possible that `color` - `colorHex` map will be changed, so consider using `color` value instead
when creating or updating labels.

Here's the **current** color map (`color` - `colorHex` - **preview**):
- `0` - `#ff9485` - <span style="display:inline-block;width:15px;height:15px;background-color:#ff9485;"></span>
- `1` - `#64c4ff` - <span style="display:inline-block;width:15px;height:15px;background-color:#64c4ff;"></span>
- `2` - `#ffd429` - <span style="display:inline-block;width:15px;height:15px;background-color:#ffd429;"></span>
- `3` - `#dfaef0` - <span style="display:inline-block;width:15px;height:15px;background-color:#dfaef0;"></span>
- `4` - `#99b6c1` - <span style="display:inline-block;width:15px;height:15px;background-color:#99b6c1;"></span>
- `5` - `#55ccb3` - <span style="display:inline-block;width:15px;height:15px;background-color:#55ccb3;"></span>
- `6` - `#ff9dff` - <span style="display:inline-block;width:15px;height:15px;background-color:#ff9dff;"></span>
- `7` - `#d3a91d` - <span style="display:inline-block;width:15px;height:15px;background-color:#d3a91d;"></span>
- `8` - `#6d7cce` - <span style="display:inline-block;width:15px;height:15px;background-color:#6d7cce;"></span>
- `9` - `#d7e752` - <span style="display:inline-block;width:15px;height:15px;background-color:#d7e752;"></span>
- `10` - `#00d0e2` - <span style="display:inline-block;width:15px;height:15px;background-color:#00d0e2;"></span>
- `11` - `#ffc5c7` - <span style="display:inline-block;width:15px;height:15px;background-color:#ffc5c7;"></span>
- `12` - `#93ceac` - <span style="display:inline-block;width:15px;height:15px;background-color:#93ceac;"></span>
- `13` - `#f74848` - <span style="display:inline-block;width:15px;height:15px;background-color:#f74848;"></span>
- `14` - `#00a0f2` - <span style="display:inline-block;width:15px;height:15px;background-color:#00a0f2;"></span>
- `15` - `#83e422` - <span style="display:inline-block;width:15px;height:15px;background-color:#83e422;"></span>
- `16` - `#ffaf04` - <span style="display:inline-block;width:15px;height:15px;background-color:#ffaf04;"></span>
- `17` - `#b5ebff` - <span style="display:inline-block;width:15px;height:15px;background-color:#b5ebff;"></span>
- `18` - `#9ba6ff` - <span style="display:inline-block;width:15px;height:15px;background-color:#9ba6ff;"></span>
- `19` - `#9368cf` - <span style="display:inline-block;width:15px;height:15px;background-color:#9368cf;"></span>


## API

### Get labels

You can get a list of labels for the session using the endpoint:

```http request
GET /api/{session}/labels
```

```jsonc { title="Response" }
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

### Create label

```http request
POST /api/{session}/labels
```

Using `color`
```jsonc { title="Body" }
{
  "name": "New Client",
  "color": 1
}
```

Using `colorHex`
```jsonc { title="Body" }
{
  "name": "New Client",
  "colorHex" : "#64c4ff"
}
```

### Update label
```http request
PUT /api/{session}/labels/{labelId}
```

Using `color`
```jsonc { title="Body" }
{
  "name": "New Client",
  "color": 1
}
```

Using `colorHex`
```jsonc { title="Body" }
{
  "name": "New Client",
  "colorHex" : "#64c4ff"
}
```

### Delete label
```http request
DELETE /api/{session}/labels/{labelId}
```

### Get chats by label id

You can get a list of chats by label id using the endpoint:

```http request
GET /api/{session}/labels/{labelId}/chats
```

ℹ️ The response format currently depends on the
[**🏭 Engine**]({{< relref "/docs/how-to/engines" >}})
you're using,
similar to how it works with
[**💬 Chats**]({{< relref "/docs/how-to/chats" >}})

### Get labels by chat id

You can get a list of labels by chat id using the endpoint:

```http request
GET /api/{session}/labels/chats/{chatId}/
```

```jsonc { title="Response" }
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

### Update labels to chat

```http request
PUT /api/{session}/labels/chats/{chatId}/
```

**Upsert label**:

👉 You need to provide **the full list of labels** you want to set to the chat. All other labels will be removed.

```jsonc { title="Body" }
{
  "labels": [
    {
      "id": "1"
    }
  ]
}
```

**Remove labels**:

```jsonc { title="Body" }
{
  "labels": []
}

```

## Events
Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

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
    "label": null  // Note: This can be null right after scanning QR code
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
