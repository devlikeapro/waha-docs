<div></div>

You can configure WEBJS-specific options per session via `config.webjs`.

- `tagsEventsOn` — Enable emission of special `tag:*` engine
  [**🔄 Events**]({{< relref "/docs/how-to/events" >}}) -
  **required** for `presence.update` and `message.ack`.

**WARNING**: Enabling `tagsEventsOn` this may have a performance and stability impact. Disabled by default.

```json
{
  "name": "default",
  "config": {
    "webjs": {
      "tagsEventsOn": false
    }
  }
}
```
