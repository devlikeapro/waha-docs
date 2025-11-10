<div></div>

If you send any requests to WhatsApp servers (send message, fetch data) - WAHA
marks the session as `online` for  `WAHA_PRESENCE_AUTO_ONLINE_DURATION_SECONDS` period.

{{< callout context="caution" title="Manual Typing Presence" icon="outline/keyboard" >}}
It doesn't send `typing` automatically, so remember to send it manually before `/api/sendText` to emulate real user behavior.
{{< /callout >}}

You can configure automatic presence behavior with the following environment variables:
- `WAHA_PRESENCE_AUTO_ONLINE=False` - disable automatic setting session as `online`.
- `WAHA_PRESENCE_AUTO_ONLINE_DURATION_SECONDS=25` - duration in seconds to keep session as `online` after sending any requests to WhatsApp servers.