`group.v2.participants` happens when someone join or leave a group.

ℹ️ It might duplicate [group.v2.join](#groupv2join) and [group.v2.leave](#groupv2leave) events for your ID.


```jsonc { title="group.v2.participants" }
{
  "event": "group.v2.participants",
  "session": "default",
  "payload": {
    "type": "join",
    "timestamp": 1666943582,
    "group": {
      "id": "123456789@g.us"
    },
    "participants": [
      {
        "id": "123456789@c.us",
        "role": "participant"
      }
    ],
    "_data": {}
  }
}
```

- `type` - event type. Possible values:
  - **join** - when someone joins the group
  - **leave** - when someone leaves the group
  - **promote** - when someone is promoted to admin
  - **demote** - when someone is demoted to regular participant
- `participants` - list of participants (contains only changed participants)
  - `id` - participant ID
  - `role` - participant role. Possible values:
    - **left** - left the group
    - **participant** - regular participant
    - **admin** - group admin
    - **superadmin** - group super admin
- `_data` - engine specific data
