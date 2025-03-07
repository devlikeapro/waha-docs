---
title : "👤 Contacts"
description: "Contacts"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 230
slug: contacts
---

Methods for contacts.

## Features
Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/contacts/features.md" >}}

{{< callout note >}}
WhatsApp Web does not support adding contacts, so the API doesn't support it too.
{{< /callout >}}

## Endpoints
See the list of engines [**that support the feature ->**]({{< relref "/docs/how-to/engines#features" >}}).

### Get all contacts

Get your contacts 

```http request
GET /api/{session}/contacts/all
```

```json {title="Response"}
[
  {
    "id": "11231231231@c.us",
    "number": "11231231231",
    "name": "Contact Name",
    "pushname": "Pushname",
    "shortName": "Shortname",
    "isMe": true,
    "isGroup": false,
    "isWAContact": true,
    "isMyContact": true,
    "isBlocked": false
  }
]
```

#### Contacts Pagination
If you see timeout or the request takes too long - consider using `limit` parameter to get contacts in smaller chunks

```http request
GET /api/{session}/contacts/all?limit=100&offset=0&sortBy=id&sortOrder=asc
```

- `limit=100` - limit the number of chats to return
- `offset=0` - skip the number of chats from the start
- `sortBy={field}` - sort by field
    - `sortBy=id` - sort by contact id
    - `sortBy=name` - sort by contact name
- `sortOrder=desc|asc` - sort order
    - `desc` - descending order (A-Z)
    - `asc` - ascending order (Z-A)

### Get contact

Get contact
```http request
GET /api/contacts?contactId={ID}&session={SESSION}
```

- `ID` - either phone number (`123123123`) or chat id (`123123@c.us`)

```json {title="Response"}
{
  "id": "11231231231@c.us",
  "number": "11231231231",
  "name": "Contact Name",
  "pushname": "Pushname",
  "shortName": "Shortname",
  "isMe": true,
  "isGroup": false,
  "isWAContact": true,
  "isMyContact": true,
  "isBlocked": false
}
```

### Check phone number exists

If you want to check if phone number is registered in WhatsApp (even if the number is not in your contact list) - use
this endpoint for that.
```http request
GET /api/contacts/check-exists?phone=11231231231&session=default
```

It returns `numberExists` field with `true` or `false` value and `chatId` field with chat ID of the number (if exists).

```json { title="Response" }
{
  "numberExists": true,
  "chatId": "123123123@c.us"
}
```
**Note for 🇧🇷 Brazilian Phone Numbers**

You should use the `GET /api/contacts/check-exists` endpoint **before sending a message to a new phone number**
to get the correct chatId because of the additional 9-digit number added after 2012.

Read more about
[error sending text to half of Brazilian numbers (every number registered before 2012) ->](https://github.com/devlikeapro/waha/issues/238)

It's fine to send the response to `chatId` for incoming messages, though - the payload already has the correct `chatId`.

### Get "about" contact

```http request
GET /api/contacts/about?contactId={ID}&session={SESSION}
```

- `ID` - either phone number (`123123123`) or chat id (`123123@c.us`)

```json { title="Response" }
{
  "about": "Hi, I use WhatsApp!"
}
```

### Get contact profile picture
```http request
GET /api/contacts/profile-picture?contactId=11231231231&session=default`
```

**Query**:
- `contactId` - contact ID
- `session` - session name
- `refresh=True` - force refresh the picture. By default, we cache it 24 hours. Do not frequently refresh the picture to avoid `rate-overlimit` error.

```json { title="Response" }
{
  "profilePictureURL": "https://example.com/profile.jpg"
}
```

### Block (unblock) contact
Block contact
```http request
POST /api/contacts/block
```

Unblock contact
```http request
POST /api/contacts/unblock
```

```json { title="Body" }
{
  "contactId": "11231231231",
  "session": "default"
}
```
