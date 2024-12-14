---
title : "👥 Groups"
description: "Groups"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: []
weight: 240
---

## Features

Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/en/docs/how-to/groups/features.md" >}}

## Endpoints
- `{session}` - use the session name for Whatsapp instance that you created with `POST /api/session` endpoint
- `{groupId}` - group id in format `123123123123@g.us`. You can get the id in a few ways:
  - By [handling incoming message webhook]({{< relref "/docs/how-to/receive-messages" >}}).
  - By getting all groups (see below).
  - By creating a new group and saving the id.

### Create a new group

`POST /api/{session}/groups`

Request:

```json
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

`GET /api/{session}/groups`

👉 If you see `rate-overlimit` error with **NOWEB** engine - try enabling [**🏭 NOWEB Store before using the endpoint**]({{< relref "/docs/engines/NOWEB#store" >}})!

#### Groups Pagination
If you see timeout or the request takes too long - consider using `limit` parameter to get objects in smaller chunks

```
GET /api/{session}/groups?limit=10&offset=0&sortBy=subject&sortOrder=desc
```

- `limit=10` - limit the number of chats to return
- `offset=0` - skip the number of chats from the start
- `sortBy={field}` - sort by field
  - `sortBy=id` - sort by group id
  - `sortBy=subject` - sort by group subject
- `sortOrder=desc|asc` - sort order
  - `desc` - descending order (New first, A-Z)
  - `asc` - ascending order (Old first, Z-A)

### Join group
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

### Get join info for group
If you have invite URL for a group (like `https://chat.whatsapp.com/invitecode`), you can get group info:

```bash
GET /api/{session}/groups/join-info?code=invitecode
```

or using full link (remember to encode the URL)

```bash
GET /api/{session}/groups/join-info?code=https%3A%2F%2Fchat.whatsapp.com%2Finvitecode
```

Response depends on engine you're using

### Refresh groups
If you see any inconsistency in groups list or in participants list, you can refresh the groups from the WhatsApp server:
```bash
POST /api/{session}/groups/refresh
```

⚠️ Do not call it frequently, it can lead to `rate-overlimit` error. Usually groups API has all up-to-date information.

### Get the group

`GET /api/{session}/groups/{groupId}`

### Delete the group

`DELETE /api/{session}/groups/{groupId}`

### Leave the group

`POST /api/{session}/groups/{groupId}/leave`

### Set group subject

Updates the group subject.

Returns `true` if the subject was properly updated. This can return false if the user does not have the necessary
permissions.

`PUT /api/{session}/groups/{groupId}/subject`

Request:

```json
{
  "subject": "Group name"
}
```

### Set group description

Updates the group description.

Returns `true` if the subject was properly updated. This can return false if the user does not have the necessary
permissions.

`PUT /api/{session}/groups/{groupId}/description`

Request:

```json
{
  "description": "Group description"
}
```

### Security - update group info
Updates the group settings to only allow admins to edit group info (title, description, photo).
`PUT /api/{session}/groups/{groupId}/settings/security/info-admin-only`
```json
{
  "adminsOnly": true
}
```

Get the group settings to only allow admins to edit group info (title, description, photo).

`GET /api/{session}/groups/{groupId}/settings/security/info-admin-only`
```json
{
  "adminsOnly": true
}
```

Returns `true` if the setting was properly updated. This can return false if the user does not have the necessary permissions.


### Security - who can send messages
Updates the group settings to only allow admins to send messages.

`PUT /api/{session}/groups/{groupId}/settings/security/messages-admin-only`
```json
{
  "adminsOnly": true
}
```
Returns `true` if the setting was properly updated. This can return false if the user does not have the necessary permissions.

Get the group settings to only allow admins to send messages.

`GET /api/{session}/groups/{groupId}/settings/security/messages-admin-only`
```json
{
  "adminsOnly": true
}
```

### Participants

#### Get participants

`GET /api/{session}/groups/{groupId}/participants`

#### Add participants

`POST /api/{session}/groups/{groupId}/participants/add`

```json
{
  "participants": [
    {
      "id": "123123123123@c.us"
    }
  ]
}
```

#### Remove participants

`POST /api/{session}/groups/{groupId}/participants/remove`

```json
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

`POST /api/{session}/groups/{groupId}/admin/promote`

```json
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

`POST /api/{session}/groups/{groupId}/admin/demote`

```json
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

`GET /api/{session}/groups/{groupId}/invite-code`

Then you can put it in the url `https://chat.whatsapp.com/{inviteCode}` and send it to contacts.

#### Revoke invite code

Invalidates the current group invite code and generates a new one.

`POST /api/{session}/groups/{groupId}/invite-code/revoke`

## Webhooks
See the list of engines [**that support the feature ->**]({{< relref "/docs/how-to/engines#features" >}}).

### group.join

```json
{
  "event": "group.join",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    ...
  }
}
```

### group.leave

```json
{
  "event": "group.leave",
  "session": "default",
  "engine": "WEBJS",
  "payload": {
    ...
  }
}
```
