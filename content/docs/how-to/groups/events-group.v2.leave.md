`group.v2.leave` happens when **you** leave or are removed from a group.


```jsonc { title="group.v2.leave" }
{
  "event": "group.v2.leave",
  "session": "default",
  "payload": {
    "group": {
      "id": "1231231232@g.us"
    },
    "timestamp": 789456123,
    "_data": {}
  }
}
```

- `group.id` - group ID
- `timestamp` - event timestamp
- `_data` - engine specific data
