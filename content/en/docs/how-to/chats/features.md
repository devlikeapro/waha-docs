|                                                                                     | WEBJS |                         NOWEB                          | VENOM |
|-------------------------------------------------------------------------------------|:-----:|:------------------------------------------------------:|:-----:|
| **Get all chats** <br> `GET /api/{session}/chats`                                   |  ✔️   |                    ✔️[*1](#heading)                    |       |
| **Archive chat** <br> `POST /api/{session}/chats/{chatId}/archive`                  |  ✔️   | [#445](https://github.com/devlikeapro/waha/issues/445) |       |
| **Unarchive chat** <br> `POST /api/{session}/chats/{chatId}/unarchive`              |  ✔️   | [#445](https://github.com/devlikeapro/waha/issues/445) |       |
| **Delete chat** <br> `DELETE /api/{session}/chats/{chatId}`                         |  ✔️   |                                                        |       |
| **Get messages** <br> `GET /api/{session}/chats/{chatId}/messages`                  |  ✔️   |                    ✔️[*1](#heading)                    |  ✔️   |
| **Edit message** <br> `PUT /api/{session}/chats/{chatId}/messages/{messageId}`      |  ✔️   |                           ✔️                           |       |
| **Delete message** <br> `DELETE /api/{session}/chats/{chatId}/messages/{messageId}` |  ✔️   |                           ✔️                           |       |
| **Delete all messages** <br> `DELETE /api/{session}/chats/{chatId}/messages`        |  ✔️   |                                                        |       |


****
1. **NOWEB** - you need to [**Enable Store**]({{< relref "/docs/engines/noweb#store" >}}) to get **chats, contacts and messages**

_If you see the feature is not available in the above list, please [create a feature request](https://github.com/devlikeapro/waha/issues/new/choose) or **leave "+1" comment** on the existing one._
****
