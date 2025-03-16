<div></div>
{{< details "**📤 Messages - API**" >}}

| **API**                                                     |                            WEBJS                             | NOWEB | GOWS |
|-------------------------------------------------------------|:------------------------------------------------------------:|:-----:|:----:|
| `POST /api/sendText`                                        |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/sendSeen`                                        |                              ✔️                              |  ✔️   |  ✔️  |
| `PUT /api/{session}/chats/{chatId}/messages/{messageId}`    |                              ✔️                              |  ✔️   |  ✔️  |
| `DELETE /api/{session}/chats/{chatId}/messages/{messageId}` |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/sendImage`                                       |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/sendFile`                                        |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/sendVoice`                                       |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/sendVideo`                                       |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/sendButtons`                                     |                                                              |  ✔️   |      |
| `POST /api/forwardMessage`                                  | ✔️<br>[#588](https://github.com/devlikeapro/waha/issues/588) |  ✔️   |      |
| `POST /api/sendLocation`                                    |                              ✔️                              |  ✔️   |      |
| `POST /api/startTyping`                                     |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/stopTyping`                                      |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/{session}/presence`                              |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/reaction`                                        |                              ✔️                              |  ✔️   |  ✔️  |
| `POST /api/star`                                            |                              ✔️                              |  ✔️   |      |
| `GET /api/sendContactVcard`                                 |                                                              |  ✔️   |      |
| `GET /api/messages`                                         |                              ✔️                              |  ✔️¹  |      |
| `GET /api/checkNumberStatus`                                |                              ✔️                              |  ✔️   |  ✔️  |

1. **NOWEB** - you need to [**Enable Store**]({{< relref "/docs/engines/noweb#store" >}}) to get **chats, contacts and messages**

_If you see the feature is not available in the above list, please [create a feature request](https://github.com/devlikeapro/waha/issues/new/choose) or **leave "+1" comment** on the existing one._

{{< /details >}}
