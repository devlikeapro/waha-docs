The `chat.archive` event is triggered when a chat is archived or unarchived.
```json
{
  "event": "chat.archive",
  "session": "default",
  "payload": {
    "id": "123123123@c.us",
    "timestamp": 1667561485,
    "archived": true <== or false
  },
  ...
}
```
