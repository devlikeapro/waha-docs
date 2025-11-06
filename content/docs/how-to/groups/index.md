---
title : "👥 Groups"
description: "Groups"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 240
images: ["groups.jpg"]
slug: groups
---

Manage WhatsApp groups with the API.

<div style="width: 200px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="groups.jpg" alt="WhatsApp Groups" >}}
</div>

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/groups/features.md" >}}
{{< include file="content/docs/how-to/groups/features-events.md" >}}

## API
- `{session}` - use the session name for Whatsapp instance that you created with `POST /api/session` endpoint
- `{groupId}` - group id in format `123123123123@g.us`. You can get the id in a few ways:
  - By [handling incoming message webhook]({{< relref "/docs/how-to/receive-messages" >}}).
  - By getting all groups (see below).
  - By creating a new group and saving the id.

{{< callout context="tip" icon="outline/hand-finger-right" >}}
Check [**👤 Contacts - Lids**]({{< relref "/docs/how-to/contacts/#api---lids" >}}) if you see `@lid` 
in participants list for a group
{{< /callout >}}

### Create a new group

```http request
POST /api/{session}/groups
```

```jsonc { title="Body" }
{
  "name": "Group name",
  "participants": [
    {
      "id": "123123123123@c.us"
    }
  ]
}
```

### Get all groups

```http request
GET /api/{session}/groups
```


**Response**:
depends on [**🏭 Engine**]({{< relref "/docs/how-to/engines" >}}) you use.

**Query parameters**:

```http request
GET /api/{session}/groups?limit=10&offset=0&sortBy=subject&sortOrder=desc
```

If you see timeout or the request takes too long - consider using `limit` parameter to get objects in smaller chunks

- `limit=10` - limit the number of chats to return
- `offset=0` - skip the number of chats from the start
- `sortBy={field}` - sort by field
  - `sortBy=id` - sort by group id
  - `sortBy=subject` - sort by group subject
- `sortOrder=desc|asc` - sort order
  - `desc` - descending order (New first, A-Z)
  - `asc` - ascending order (Old first, Z-A)
- `exclude=participants` - you can exclude participants data from the response

{{< details "I see rate-overlimit in NOWEB" >}}
  👉 If you see `rate-overlimit` error with **NOWEB** engine - try enabling [**🏭 NOWEB Store before using the endpoint**]({{< relref "/docs/engines/NOWEB#store" >}})!
{{< /details >}}

### Get groups count
Get the total number of groups

```http request
GET /api/{session}/groups/count
```

```jsonc { title="Response" }
{
  "count": 10
}
```

### Join group
If you have invite URL for a group (like `https://chat.whatsapp.com/invitecode`), you can 

```http request
POST /api/{session}/groups/join
```

```jsonc { title="Body" }
{
  "code": "invitecode"
}
```

or using full link:
```jsonc { title="Body" }
{
  "code": "https://chat.whatsapp.com/invitecode"
}
```

```jsonc { title="Response" }
{
  "id": "123123123@g.us"
}
```

### Get join info for group
If you have invite URL for a group (like `https://chat.whatsapp.com/invitecode`), you can get group info:

```http request
GET /api/{session}/groups/join-info?code=invitecode
```

or using full link (remember to encode the URL)

```http request
GET /api/{session}/groups/join-info?code=https%3A%2F%2Fchat.whatsapp.com%2Finvitecode
```

Response depends on engine you're using

### Refresh groups
If you see any inconsistency in groups list or in participants list, you can refresh the groups from the WhatsApp server:
```http request
POST /api/{session}/groups/refresh
```

⚠️ Do not call it frequently, it can lead to `rate-overlimit` error. Usually groups API has all up-to-date information.

### Get the group

```http request
GET /api/{session}/groups/{groupId}
```

### Delete the group

```http request
DELETE /api/{session}/groups/{groupId}
```

### Leave the group

```http request
POST /api/{session}/groups/{groupId}/leave
```

### Group Picture
You can get, set and remove group picture

#### Get Group Picture

```http request
GET /api/{SESSION}/groups/{ID}/picture?refresh=false
```

- `{SESSION}` - session name
- `{ID}` - group id. Remember to encode `@` symbol - `123123123123%40g.us`
- `refresh=True` - force refresh the picture. By default, we cache it 24 hours. Do not frequently refresh the picture to avoid `rate-overlimit` error.

```jsonc { title="Response" }
{
  "url": "https://example.com/picture.jpg"
}
```

- `url` can be `null` if there's no picture for the group

#### Set Group Picture
👉 Available in [**WAHA Plus**]({{< relref "waha-plus#plus" >}}) version.

```http request
PUT /api/{SESSION}/groups/{ID}/picture
```

- `{SESSION}` - session name
- `{ID}` - group id. Remember to encode `@` symbol - `123123123123%40g.us`

{{< tabs "groups-set-picture" >}}
{{< tab "URL" >}}
```jsonc { title="Body" }
{
  "file": {
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
  }
}
```

{{< /tab >}}

{{< tab "BASE64" >}}
```jsonc { title="Body" }
{
  "file": {
    "data": "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"
  }
}
```
{{< /tab >}}
{{< /tabs >}}

```jsonc { title="Response" }
{
  "success": true
}
```

#### Delete Group Picture
👉 Available in [**WAHA Plus**]({{< relref "waha-plus#plus" >}}) version.

```http request
DELETE /api/{SESSION}/groups/{ID}/picture
```
- `{SESSION}` - session name
- `{ID}` - group id. Remember to encode `@` symbol - `123123123123%40g.us`

```jsonc { title="Response" }
{
  "success": true
}
```

### Set group subject

Updates the group subject.

Returns `true` if the subject was properly updated. This can return false if the user does not have the necessary
permissions.

```http request
PUT /api/{session}/groups/{groupId}/subject
```

```jsonc { title="Body" }
{
  "subject": "Group name"
}
```

### Set group description

Updates the group description.

Returns `true` if the subject was properly updated. This can return false if the user does not have the necessary
permissions.

```http request
PUT /api/{session}/groups/{groupId}/description
```

```jsonc { title="Body" }
{
  "description": "Group description"
}
```

### Security - update group info
Updates the group settings to only allow admins to edit group info (title, description, photo).

```http request
PUT /api/{session}/groups/{groupId}/settings/security/info-admin-only
```

```jsonc { title="Body" }
{
  "adminsOnly": true
}
```

Get the group settings to only allow admins to edit group info (title, description, photo).

```http request
GET /api/{session}/groups/{groupId}/settings/security/info-admin-only
```

```jsonc { title="Response" }
{
  "adminsOnly": true
}
```

Returns `true` if the setting was properly updated. This can return false if the user does not have the necessary permissions.

### Security - who can send messages
Updates the group settings to only allow admins to send messages.

```http request
PUT /api/{session}/groups/{groupId}/settings/security/messages-admin-only
```

```jsonc { title="Body" }
{
  "adminsOnly": true
}
```

Returns `true` if the setting was properly updated. This can return false if the user does not have the necessary permissions.

Get the group settings to only allow admins to send messages.

```http request
GET /api/{session}/groups/{groupId}/settings/security/messages-admin-only
```

```jsonc { title="Response" }
{
  "adminsOnly": true
}
```

### Participants

#### Get participants v2

Get list of participants with the "almost" the same response across engines

```http request
GET /api/{session}/groups/{groupId}/participants/v2
```
```json
[
  {
    "id": "111111111111@c.us",
    "role": "participant"
  },
  {
    "id": "222222222222@c.us",
    "role": "superadmin"
  },
  {
    "id": "33333333333@c.us",
    "role": "participant"
  }
]
```
Role:
- `left`
- `participant`
- `admin`
- `superadmin` 

#### Get participants

```http request
GET /api/{session}/groups/{groupId}/participants
```

#### Add participants

```http request
POST /api/{session}/groups/{groupId}/participants/add
```

```jsonc { title="Body" }
{
  "participants": [
    {
      "id": "123123123123@c.us"
    }
  ]
}
```

#### Remove participants

```http request
POST /api/{session}/groups/{groupId}/participants/remove
```

```jsonc { title="Body" }
{
  "participants": [
    {
      "id": "123123123123@c.us"
    }
  ]
}
```

### Admin

#### Promote to admin

Promote participants to admin users.

```http request
POST /api/{session}/groups/{groupId}/admin/promote
```

```jsonc { title="Body" }
{
  "participants": [
    {
      "id": "123123123123@c.us"
    }
  ]
}
```

#### Demote to regular users

Demote participants by to regular users.

```http request
POST /api/{session}/groups/{groupId}/admin/demote
```

```jsonc { title="Body" }
{
  "participants": [
    {
      "id": "123123123123@c.us"
    }
  ]
}
```

### Invite code

#### Get invite code

```http request
GET /api/{session}/groups/{groupId}/invite-code
```

Then you can put it in the url `https://chat.whatsapp.com/{inviteCode}` and send it to contacts.

#### Revoke invite code

Invalidates the current group invite code and generates a new one.

```http request
POST /api/{session}/groups/{groupId}/invite-code/revoke
```

## Events
Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

{{< include file="content/docs/how-to/groups/features-events.md" >}}

### group.v2.join
{{< include file="content/docs/how-to/groups/events-group.v2.join.md" >}}

### group.v2.leave
{{< include file="content/docs/how-to/groups/events-group.v2.leave.md" >}}

### group.v2.participants
{{< include file="content/docs/how-to/groups/events-group.v2.participants.md" >}}

### group.v2.update
{{< include file="content/docs/how-to/groups/events-group.v2.update.md" >}}

### group.join
{{< include file="content/docs/how-to/groups/events-group.join.md" >}}

### group.leave
{{< include file="content/docs/how-to/groups/events-group.leave.md" >}}
