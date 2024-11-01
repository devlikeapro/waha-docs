|                                                                          | WEBJS | NOWEB |
|--------------------------------------------------------------------------|-------|-------|
| **Get labels**<br>`GET /api/{session}/labels`                            | ✔️    | ✔️    |
| **Create label**<br>`POST /api/{session}/labels`                         | ✔️    | ✔️    |
| **Update label**<br>`PUT /api/{session}/labels/{labelId}`                | ✔️    | ✔️    |
| **Delete label**<br>`DELETE /api/{session}/labels/{labelId}`             | ✔️    | ✔️    |
| **Get chats by label id**<br>`GET /api/{session}/labels/{labelId}/chats` | ✔️    | ✔️    |
| **Get labels by chat id**<br>`GET /api/{session}/labels/chats/{chatId}/` | ✔️    | ✔️    |
| **PUT labels to chat**<br>`PUT /api/{session}/labels/chats/{chatId}/`    | ✔️    | ✔️    |
| `labels.upsert`                                                          |       | ✔️    |
| `labels.deleted`                                                         |       | ✔️    |
| `labels.chat.added`                                                      |       | ✔️    |
| `labels.chat.deleted`                                                    |       | ✔️    |

****

_If you see the feature is not available in the above list, please [create a feature request](https://github.com/devlikeapro/waha/issues/new/choose) or **leave "+1" comment** on the existing one._
****
