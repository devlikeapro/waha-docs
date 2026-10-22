`group.v2.participants.tag` happens when a participant sets or removes their member tag in a group,
including your own changes made with the
[**👥 Groups - Member Tags**]({{< relref "/docs/how-to/groups#member-tags" >}}) API.

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
    "tag": "Manager",
    "timestamp": 1666943582,
    "_data": {}
  }
}
```

- `participant.id` - ID of the participant (`@lid` in most groups)
- `participant.pn` - phone number ID of the participant, if known (can be `null`)
- `tag` - the new tag, `null` when the participant removed it
- `timestamp` - when the tag was changed
- `_data` - engine specific data

ℹ️ Tags set before you linked the session arrive with the history sync without an event - use
`GET /api/{session}/groups/{groupId}/participants/v2/tags` for the current state.
