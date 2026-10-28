---
title: "WAHA 2026.10 - Group Member Tags, Labels fixes, and more!"
description: "WAHA 2026.10 - Group Member Tags, Labels fixes, and more!"
excerpt: "WAHA 2026.10 - Group Member Tags, Labels fixes, and more!"
date: 2026-10-28T00:00:00+00:00
draft: false
images: [ "waha-2026-10.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-10
---

We're excited to roll out [**WAHA 2026.10**]({{< relref "/docs/overview/changelog#202610" >}})!

## 👥 Group Member Tags

WhatsApp lets group members set a short tag for themselves - like `Manager` or `Support` - and shows it right under the name in the group.

🎉 Now you can do the same via [**👥 Groups - Member Tags API**]({{< relref "/docs/how-to/groups#member-tags" >}})!

{{< imgo src="waha-chat-ui-member-tags.png" alt="Member tags in Chat UI" full="false" >}}

<br/>

**Get all tags in the group**

```http request
GET /api/{session}/groups/{groupId}/participants/v2/tags
```

```jsonc { title="Response" }
[
  {
    "id": "123456789@lid",
    "tag": "Manager",
    "timestamp": 1666943582
  },
  {
    "id": "987654321@lid",
    "tag": "Support",
    "timestamp": 1666943600
  }
]
```

**Get notified when a tag changes**

When somebody changes their tag, you get a `group.v2.participants.tag` event - so you can keep your side in sync:

```jsonc { title="group.v2.participants.tag" }
{
  "event": "group.v2.participants.tag",
  "session": "default",
  "payload": {
    "group": {
      "id": "123456789@g.us"
    },
    "participant": {
      "id": "123456789@lid",
      "pn": "123456789@c.us"
    },
    "tag": "Manager", // null when the participant removed the tag
    "timestamp": 1666943582
  }
}
```

**Set your tag**

```http request
PUT /api/{session}/groups/{groupId}/participants/v2/tags/my
```

```jsonc { title="Body" }
{
  "tag": "Manager"
}
```

Read more: [**👥 Groups - Member Tags**]({{< relref "/docs/how-to/groups#member-tags" >}}) and [**🔄 Events · group.v2.participants.tag**]({{< relref "/docs/how-to/events#groupv2participantstag" >}})

## 🏷️ Labels

{{< imgo src="waha-chat-ui-labels.png" alt="Labels in Chat UI" full="false" >}}

We spent some time on 
[**🏷️ Labels**]({{< relref "/docs/how-to/labels" >}})
this month - 
fixed labels sync in **GOWS**, updating and deleting labels in **WEBJS**, and a bunch of small things here and there.


[**🏷️ Labels**]({{< relref "/docs/how-to/labels" >}}) should now work the same way across all engines!

WhatsApp keeps its built-in lists (**Unread**, **Favourites**, **Groups**) next to your labels,
so now the API returns `type` and `isActive` fields to tell them apart.

And the easiest way to try it out - the **Chat UI** in Dashboard got labels support!

Read more: [**🏷️ Labels**]({{< relref "/docs/how-to/labels" >}}) and [**🔄 Events · label.chat.added**]({{< relref "/docs/how-to/events#labelchatadded" >}})

## 🆕 Changelog

Plenty of fixes landed this month across all engines - **GOWS**, **NOWEB**, **WEBJS** - plus a few security updates.

Check out the full list in the [**🆕 Changelog · 2026.10**]({{< relref "/docs/overview/changelog#202610" >}}) and stay tuned for more!
