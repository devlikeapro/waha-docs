You can find `server_id` in **channel message**:

{{< tabs "channel-message-id-for-reaction" >}}
{{< tab "GOWS" >}}
Find `_data.Info.ServerID` value:
```json
{
  "event": "message.any",
  "payload": {
    ...
    "_data": {
      "Info": {
        "Chat": "111111111111111111@newsletter",
        ...
        "ServerID": 105, # <=== this one
        ...
      },
      ...
    }
  }
}
```
{{< /tab >}}

{{< tab "NOWEB" >}}
Find `_data.key.server_id` value:
```json
{
  "event": "message.any",
  "payload": {
    ...
    "_data": {
      "key": {
        "remoteJid": "120363417343416222@newsletter",
        ...
        "server_id": "101" # <=== this one
      },
      ...
    }
  },
  ...
}
```
{{< /tab >}}


{{< tab "WEBJS" >}}
Not supported in **WEBJS** engine
{{< /tab >}}
{{< /tabs >}}
