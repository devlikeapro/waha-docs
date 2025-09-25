---
title : "👤 Contacts"
description: "Contacts"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 230
images: ["contacts.png"]
slug: contacts
---

Methods for contacts.

<div style="width: 200px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="contacts.png" alt="WhatsApp Contacts" >}}
</div>

## Features
Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/contacts/features.md" >}}

{{< callout context="note" icon="outline/info-circle" >}}
WhatsApp Web does not support adding contacts, so the API doesn't support it too.
{{< /callout >}}

## @lid and @c.us
WhatsApp finalized its **LID** (Local Identifier) update (which it started in 2023).

This **LID** system assures the anonymity of users in large groups,
allowing the WhatsApp client to show a masked value (for example `+43.......21`) instead of a full phone number.
This is done to ensure the privacy of users.

WhatsApp is also adding a username system (@username); relying solely on a phone number to identify a user can be
cumbersome or even impossible in some contexts. Thus, WhatsApp now assigns a **LID** to each user on its platform.

This **LID** is unique to each user, similar to a JID (phone number–based). 
You can message anyone using either their **LID** or their **PN**.

👉 Use the [**API - Lids**]({{< relref "/docs/how-to/contacts/#api---lids" >}}) to map between a **Phone Number** (`@c.us`)
and a **LID** (`@lid`) in both directions.


### Get all contacts

Get your contacts 

```http request
GET /api/contacts/all?session={NAME}
```

```jsonc {title="Response"}
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
GET /api/contacts/all?session={NAME}&limit=100&offset=0&sortBy=id&sortOrder=asc
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

- `ID` - either phone number (`123123123`) or chat id (`123123@c.us` or `123123@lid`)

```jsonc {title="Response"}
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

### Update contact
**Update contact** on **your phone address book** (and in WhatsApp):

```http request
PUT /api/{session}/contacts/{chatId}
```

```jsonc { title="Body" }
{
  "firstName": "John",
  "lastName": "Doe"
}
```

**Path Parameters**:
- `{session}` - session name - `default`
- `{chatId}` - chat ID can end with "@c.us" or "@lid", or can be just a phone number - `12132132130`

{{< callout context="note" icon="outline/address-book" title="Phone Address Book Update Note" >}}
- If you have multiple **WhatsApp** apps installed on your phone, the API might only work with one account.
- You may need to make **a few API requests** with the same parameters and wait **a few seconds** between requests to update your **phone address book**.
{{< /callout >}}

### Check phone number exists

If you want to check if phone number is registered in WhatsApp (even if the number is not in your contact list) - use
this endpoint for that.
```http request
GET /api/contacts/check-exists?phone=11231231231&session=default
```

It returns `numberExists` field with `true` or `false` value and `chatId` field with chat ID of the number (if exists).

```jsonc { title="Response" }
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

- `ID` - either phone number (`123123123`) or chat id (`123123@c.us` or `123123@lid`)

```jsonc { title="Response" }
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

```jsonc { title="Response" }
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

```jsonc { title="Body" }
{
  "contactId": "11231231231",
  "session": "default"
}
```

## API - Lids

WhatsApp uses so-called **Linked ID** (`lid`) identifier to hide a user phone number (`pn`) from public groups and other places.

The API below you can use to map a linked identifier (`@lid`) to a contact phone number (`@c.us`).

### Get All Known LIDs

```http request
GET /api/{session}/lids
```

Query all known LID-to-phone number mappings for a session.

**Query Parameters:**

* `limit`: (optional, default: 100) Number of records to return
* `offset`: (optional, default: 0) Pagination offset

**Response:**

```json
[
  {
    "lid": "123123123@lid",
    "pn": "123456789@c.us"
  }
]
```

{{< callout context="tip" icon="outline/hand-finger-right" >}}
Call
[**Get all groups**]({{< relref "/docs/how-to/groups/#get-all-groups" >}})
or
[**Refresh groups**]({{< relref "/docs/how-to/groups/#refresh-groups" >}}) to populate lid to phone number mapping for all groups.
{{< /callout >}}

### Get Count of LIDs

```http request
GET /api/{session}/lids/count
```

Returns the number of known LID mappings for a session.

**Response:**

```json
{
  "count": 123
}
```

### Get Phone Number by LID

```http request
GET /api/{session}/lids/{lid}
```

Retrieve the associated phone number for a specific LID.

👉 Remember to escape `@` in `lid` with `%40` (`123123%40lid`) or use just a number (`123123`)

{{< tabs "lids-get-pn-response" >}}
{{< tab "Response (Found)" >}}
```json
{
  "lid": "123123123@lid",
  "pn": "123456789@c.us"
}
```
{{< /tab >}}
{{< tab "Response (Not Found)" >}}
```json
{
  "lid": "123123123@lid",
  "pn": null
}
```
{{< /tab >}}
{{< /tabs >}}

### Get LID by Phone Number

```http request
GET /api/{session}/lids/pn/{phoneNumber}
```

Fetch the LID for a given phone number (chat ID).

👉 Remember to escape `@` in `phoneNumber` with `%40` (`123123%40lid`) or use just a number (`123123`)
👉 Remember to escape `@` in `phoneNumber` with `%40` (e.g. `123123%40c.us`) or use just a number (`123123`)

{{< tabs "lids-get-lid-response" >}}
{{< tab "Response (Found)" >}}
```json
{
  "lid": "123123123@lid",
  "pn": "123456789@c.us"
}
```
{{< /tab >}}
{{< tab "Response (Not Found)" >}}
```json
{
  "lid": null,
  "pn": "123456789@c.us"
}
```
{{< /tab >}}
{{< /tabs >}}

### Lids FAQ
- If you **don't find a phone number by lid** - you don't have the phone number in your contact list or you're not **admin** in the group.
- For [**👥 Groups**]({{< relref "/docs/how-to/groups" >}}) - try [**Refresh groups**]({{< relref "/docs/how-to/groups" >}}) if you don't find the `lid` but you're **admin** in the group.

{{< callout context="tip" icon="outline/hand-finger-right" >}}
👉 If nothing helped, and **you see phone number for participant on your phone app** - please 
[**open an issue**](https://github.com/devlikeapro/waha)
and tell what
[**🏭 Engine**]({{< relref "/docs/how-to/engines" >}})
you're using and what behavior you see.
{{< /callout >}}
