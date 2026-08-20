`group.v2.participants.join-request` happens when a request to join a group with
membership approval enabled is created, rejected or revoked.

You can list, approve and reject the requests with the
[**👥 Groups - Join requests**]({{< relref "/docs/how-to/groups#join-requests" >}}) API.

ℹ️ There is no `accepted` action - when a request is approved, the user joins the group and you get
[group.v2.participants](#groupv2participants) event with `type: join`.

```jsonc { title="group.v2.participants.join-request" }
{
  "event": "group.v2.participants.join-request",
  "session": "default",
  "payload": {
    "group": {
      "id": "123456789@g.us"
    },
    "action": "created",
    "requesterId": "123456789@lid",
    "requesterPn": "123456789@c.us",
    "requestMethod": "invite_link",
    "timestamp": 1666943582,
    "_data": {}
  }
}
```

- `action` - what happened to the request. Possible values:
  - `created` - a user requested to join the group
  - `rejected` - an admin rejected the request
  - `revoked` - the requester cancelled their own request
- `requesterId` - ID of the user requesting to join the group (`@c.us` or `@lid`)
- `requesterPn` - phone number ID of the requester, if known (can be `null`)
- `requestMethod` - how the request was created (can be `null`). Possible values:
  - `invite_link` - the user requested to join via invite link
  - `linked_group_join` - the user requested to join via a linked community group
  - `non_admin_add` - a regular member added the user, so admin approval is required
- `_data` - engine specific data

⚠️ **WEBJS** and **WPP** emit only the `created` action - WhatsApp Web shows no message
when a request is rejected or revoked, so browser engines can not see it.
Use **NOWEB** or **GOWS** if you need the `rejected` and `revoked` actions.
