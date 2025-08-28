`group.v2.update` happens when the group information is updated.

```jsonc { title="group.v2.update" }
{
  "event": "group.v2.update",
  "session": "default",
  "payload": {
    "group": {
      "id": "1231231232@g.us",
      "subject": "New Work Group Name"
    },
    "timestamp": 789456123,
    "_data": {}
  }
}
```

- `group` - group information with updates field (may contain all fields in some engines)
  - See details in [group.v2.join](#groupv2join)
- `timestamp` - event timestamp
- `_data` - engine specific data
