```jsonc { title="event.response" }
{
  "id": "evt_00000000000000000000001",
  "session": "default",
  "event": "event.response",
  "payload": {
    "id": "false_11111111111111111@c.us_58BBBBBBBBBBBBBBBBBBBBBBBB",
    "timestamp": 1747707858,
    "from": "11111111111111111@c.us",
    "participant": null,
    "fromMe": false,
    "eventCreationKey": {
      "id": "false_999999999999@c.us_3EBAAAAAAAAAAAAAAAAAAAAAAAAAA",
      "to": "me",
      "from": "999999999999@c.us",
      "fromMe": false
    },
    "eventResponse": {
      "response": "GOING",
      "timestampMs": 1747707858429,
      "extraGuestCount": 0
    },
    "source": "app",
    "ack": null,
    "ackName": "UNKNOWN",
    "replyTo": null,
    "_data": {...},
  }
}
```

**Payload**:
- **Most of the fields** are the same as for `message` and `message.any` events
- `eventCreationKey`: Information about the original event message
  - `id`: Unique identifier of the original event message 
    - Format `{fromMe}_{chatId}_{messageId}[_{participant}]`)
    - You need to parse it to get `messageId` and find event that you sent previously, `fromMe` and `chatId` is **from participant**, not yours.
  - `to`: Recipient of the original event message (usually "me")
  - `from`: WhatsApp ID of the sender of the original event message
  - `fromMe`: Boolean indicating if the original event was sent by you
- `eventResponse`: Details of the user's response to the event
  - `response`: The selected response option: `GOING`, `NOT_GOING`, `MAYBE`
  - `timestampMs`: Unix timestamp in milliseconds when the response was made
  - `extraGuestCount`: Number of additional guests the respondent is bringing (`0\1`)
- `source`: Source of the message (usually "app")
- `ack`: Acknowledgment status code
- `ackName`: Human-readable acknowledgment status
- `replyTo`: Reference to a message being replied to (null if not a reply)
- `_data`: Raw data object containing additional information
