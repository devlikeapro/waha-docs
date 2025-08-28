Sometimes it happens that we didn't manager to decrypt the response for the event.
In that case you'll get `event.response.failed` event with `eventResponse: null`.

**Resend the Event Message** one more time if you get this event to get a new response

```jsonc { title="event.response.failed" }
{
  "id": "evt_00000000000000000000001",
  "session": "default",
  "event": "event.response.failed",
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
    "eventResponse": null, // <=== eventResponse will be null in that case
    "source": "app",
    "ack": null,
    "ackName": "UNKNOWN",
    "replyTo": null,
    "_data": {...},
  }
}
```


**Payload**:
- the same as for `event.response` payload, but with `eventResponse: null`