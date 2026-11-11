The `chat.archive` event is triggered when a chat is archived or unarchived.

```jsonc { title="chat.archive" }
{
  "event": "chat.archive",
  "session": "default",
  "payload": {
    "id": "111111111111111@lid",
    "timestamp": 1667561485,
    "archived": true <== or false
  },
  ...
}
```
