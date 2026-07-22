**Reachout Timelock** means WhatsApp has **shadow-restricted** the account for reaching out to too many
**new contacts** - sending messages to new contacts fails with `server returned error 463` until it ends.

When you receive `reachoutTimelock` (in `session.status` `data` or in the `me` info):

- Do **NOT** restart, logout or re-pair the session - it does **not** lift the restriction.
  The session is healthy, stays connected and remains in `WORKING` status.
- **Pause outreach to new contacts** until `timeEnforcementEnds` (unix timestamp, seconds) -
  watch for the follow-up `session.status` event with `isActive: false` when the restriction lifts.
- Messaging **existing chats** generally still works -
  WhatsApp only blocks 1:1 messages to contacts without an established chat.
- **WAHA** does **NOT** block any API calls while timelocked - WhatsApp enforces the restriction server-side.
