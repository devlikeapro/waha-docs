<div></div>

You can configure GOWS-specific options per session via `config.gows`.

- `storage.messages` - Store messages locally. Set to `false` to disable.
- `storage.groups` - Store groups locally. Set to `false` to disable.
- `storage.chats` - Store chats locally. Set to `false` to disable.
- `storage.labels` - Store labels locally. Set to `false` to disable.

If a field is omitted or set to `null`, storage remains enabled for that data type.

```json
{
  "name": "default",
  "config": {
    "gows": {
      "storage": {
        "messages": true,
        "groups": true,
        "chats": true,
        "labels": true
      }
    }
  }
}
```
