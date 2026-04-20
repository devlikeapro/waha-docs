<div></div>
{{< details "**💬 Chats - API**" >}}

| **API**                                                                                | WEBJS | WPP | GOWS | NOWEB |
|----------------------------------------------------------------------------------------|:-----:|:---:|:----:|:-----:|
| **Get all chats** <br> `GET /api/{session}/chats`                                      |  ✔️   | ✔️  |  ✔️  |  ✔️¹  |
| **Get chats overview** <br> `GET /api/{session}/chats/overview`                        |  ✔️   | ✔️  |  ✔️  |  ✔️¹  |
| **Get chat picture** <br> `GET /api/{session}/chats/{chatId}/picture`                  |  ✔️   | ✔️  |  ✔️  |  ✔️¹  |
| **Unread chat** <br> `POST /api/{session}/chats/{chatId}/unread`                       |  ✔️   | ✔️  |  ✔️  |  ✔️¹  |
| **Archive chat** <br> `POST /api/{session}/chats/{chatId}/archive`                     |  ✔️   | ✔️  |      |  ✔️¹  |
| **Unarchive chat** <br> `POST /api/{session}/chats/{chatId}/unarchive`                 |  ✔️   | ✔️  |      |  ✔️¹  |
| **Delete chat** <br> `DELETE /api/{session}/chats/{chatId}`                            |  ✔️   | ✔️  |      |       |
| **Read messages** <br> `POST /api/{session}/chats/{chatId}/messages/read`              |  ✔️   | ✔️  |  ✔️  |  ✔️¹  |
| **Get messages** <br> `GET /api/{session}/chats/{chatId}/messages`                     |  ✔️   | ✔️  |  ✔️  |  ✔️¹  |
| **Get message by id** <br> `GET /api/{session}/chats/{chatId}/messages/{messageId}`    |  ✔️   | ✔️  |  ✔️  |  ✔️¹  |
| **Pin message** <br> `POST /api/{session}/chats/{chatId}/messages/{messageId}/pin`     |  ✔️   |     |      |  ✔️   |
| **Unpin message** <br> `POST /api/{session}/chats/{chatId}/messages/{messageId}/unpin` |  ✔️   |     |      |  ✔️   |
| **Edit message** <br> `PUT /api/{session}/chats/{chatId}/messages/{messageId}`         |  ✔️   | ✔️  |  ✔️  |  ✔️   |
| **Delete message** <br> `DELETE /api/{session}/chats/{chatId}/messages/{messageId}`    |  ✔️   | ✔️  |  ✔️  |  ✔️   |
| **Delete all messages** <br> `DELETE /api/{session}/chats/{chatId}/messages`           |  ✔️   |     |      |       |

1. **NOWEB** - you need to [**Enable Store**]({{< relref "/docs/engines/noweb#store" >}}) to get **chats, contacts and messages**

_If you see the feature is not available in the above list, please [create a feature request](https://github.com/devlikeapro/waha/issues/new/choose) or **leave "+1" comment** on the existing one._

{{< /details >}}
