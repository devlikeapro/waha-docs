<div></div>

You can subscribe to `presence.update` webhook event to get the most recent presence information.

```jsonc { title="presence.update" }
{
    "event": "presence.update",
    "session": "default",
    "payload": {
        "id": "111111111111111111@g.us",
        "presences": [
            {
                "participant": "11111111111@c.us",
                "lastKnownPresence": "typing",
                "lastSeen": null
            }
        ]
    },
    "engine": "NOWEB"
}
```

- `payload.id` indicates the chat - either direct chat with a contact or a group chat.
- `payload.id.[].participant` - certain participant presence status. For a direct chat there's only one participant.
- `lastKnownPresence` statuses that you can set or get for chats:
    - `online`
    - `offline`
    - `typing`
    - `recording`
    - `paused`
