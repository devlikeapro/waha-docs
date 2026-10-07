<div></div>

When WhatsApp rejects the connection **permanently**, **GOWS** stops reconnecting and **WAHA** moves the session to
`FAILED` status. The `session.status` event carries the cause in `payload.data.reason`:

```jsonc { title="session.status" }
{
  "event": "session.status",
  "session": "default",
  "payload": {
    "status": "FAILED",
    "data": {
      "reason": {
        // Which event caused the failure, see the table below
        "event": "TemporaryBan",
        // Other fields - the raw event payload, depends on the "event"
        "Code": 101,
        "Expire": 86400000000000
      }
    }
  }
}
```

👉 `reason.event` is always set, the other fields depend on the event (`PascalCase`).

| `reason.event`    | Fields                     | Meaning |
|-------------------|----------------------------|---------|
| `LoggedOut`       | `Reason`                   | The device was unpaired from the account - logged out from the phone, account locked or banned. WhatsApp session data is wiped.<br>👉 **Logout** and **Start** the session again, re-pair the device. |
| `TemporaryBan`    | `Code`, `Expire`           | The **account** is temporarily banned, see [**Temporary Ban**](#temporary-ban).<br>👉 Wait until the ban expires, then **Restart** the session. Re-pairing does not help - it's the account, not the session. |
| `ClientOutdated`  | -                          | WhatsApp rejects the client version (`405`).<br>👉 [**How to Update WAHA**]({{< relref "/blog/waha-update" >}}) to the latest version. |
| `StreamReplaced`  | -                          | Another client connected with the same session keys - usually two **WAHA** instances share the same session store.<br>👉 Make sure only one instance runs the session, then **Restart** it. |
| `ConnectFailure`  | `Reason`, `Message`, `Raw` | Any other connect failure, see [**Connect Failure Code**](#connect-failure-code).<br>👉 **Restart** the session, if it keeps failing - **Logout** and **Start** again. |
| `CATRefreshError` | -                          | Failed to refresh the Meta crypto auth token (`413`/`414`), practically does not happen for WhatsApp accounts.<br>👉 **Restart** the session. |

Connection drops that WhatsApp **does** recover from (`503`, `500`, keepalive timeouts) do not fail the session -
it goes `STARTING` and back to `WORKING` once reconnected.


`reason.Reason` in `LoggedOut` and `ConnectFailure`:

| Code  | Meaning                                                                                        |
|-------|------------------------------------------------------------------------------------------------|
| `400` | Generic failure.                                                                               |
| `401` | Logged out from another device (unlinked from the phone).                                      |
| `402` | Account temporarily banned, see [**Temporary Ban**](#temporary-ban).                           |
| `403` | Account locked or the primary device is gone (happens for both bans and switching phones).     |
| `405` | Client version is too old.                                                                     |
| `406` | Account banned.                                                                                |
| `409` | Client user agent was rejected.                                                                |
| `413` | Meta crypto auth token expired (not used for WhatsApp accounts).                               |
| `414` | Meta crypto auth token invalid (not used for WhatsApp accounts).                               |
| `415` | Not found.                                                                                     |
| `418` | Client unknown.                                                                                |
| `500` | WhatsApp server error - the session reconnects automatically and does **not** fail.            |
| `501` | Experimental.                                                                                  |
| `503` | WhatsApp service unavailable - the session reconnects automatically and does **not** fail.     |

WhatsApp treats `402`, `403` and `406` the same way - as a **banned** account.

#### Temporary Ban

`TemporaryBan` means WhatsApp temporarily banned the **account** (not the session) - the phone is affected as well.

```jsonc { title="session.status" }
{
  "event": "session.status",
  "session": "default",
  "payload": {
    "status": "FAILED",
    "data": {
      "reason": {
        "event": "TemporaryBan",
        "Code": 101,
        // nanoseconds, 86400000000000 = 24 hours. 0 - unknown
        "Expire": 86400000000000
      }
    }
  }
}
```

- `Reason.Expire` - how long the ban lasts, in **nanoseconds**. Divide by `10^9` to get seconds.
  `0` means WhatsApp did not say when the ban expires.

- `Reason.Code` - why the account was banned:

| `Code`  | Reason                                                                                   |
|---------|------------------------------------------------------------------------------------------|
| `101`   | You sent too many messages to people who don't have you in their address books.          |
| `102`   | Too many people blocked you.                                                             |
| `103`   | You created too many groups with people who don't have you in their address books.       |
| `104`   | You sent the same message to too many people.                                            |
| `106`   | You sent too many messages to a broadcast list.                                          |
| other   | You may have violated the Terms of Service (unknown reason).                             |


{{< callout context="caution" title="Temporary Ban" icon="outline/alert-triangle" >}}
Do **not** re-pair the device during a ban - it does not lift the ban.
Wait until `Expire` passes, then **Restart** the session.

Repeated temporary bans may end in a permanent one (`406`), so review how the account sends messages -
see [**🖥️ Sessions / Reachout Timelock**]({{< relref "/docs/how-to/sessions#reachout-timelock" >}}) for the "soft" restriction
WhatsApp applies before banning.
{{< /callout >}}
