Happens when an incoming call is accepted (on another device) in WhatsApp (either 1-on-1 or group call).

```jsonc { title="call.accepted" }
{
  "event": "call.accepted",
  "session": "default",
  "payload": {
    "id": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "from": "22222222222@c.us",
    "timestamp": 1721374000,
    "isVideo": false,
    "isGroup": false,
    "_data": {}
  },
  ...
}
```
