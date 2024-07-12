
|                                                                                        | WEBJS | NOWEB                                                          |
|----------------------------------------------------------------------------------------|-------|----------------------------------------------------------------|
| **Search public channels**                                                             |       |                                                                |
| **Create Channel** <br> `POST /api/{session}/channels`                                 |       | ✔️                                                             |
| **Get channel - by id and invite code** <br> `GET /api/{session}/channels/{ChannelID}` | ✔️    | ✔️                                                             |
| **List channels** <br> `GET /api/{session}/channels`                                   | ✔️    | ✔️                                                             |
| **Delete channel** <br> `DELETE /api/{session}/channels/{ChannelID}`                   |       | ✔️                                                             |
| **Get messages** <br> `GET /api/{session}/chats/{ChannelID}/messages`                  | ✔️    | ✔️ <br> [#433](https://github.com/devlikeapro/waha/issues/433) |
| **Send messages - Text** <br> `POST /api/sendText`                                     | ✔️    | ✔️                                                             |
| **Send messages - Image** ![](/images/versions/plus.png) <br> `POST /api/sendImage`    | ✔️    | ✔️                                                             |
| **Send messages - Poll** <br> `POST /api/sendPoll`                                     |       |                                                                |
| **Receive messages - Text** <br> `message` event                                       | ✔️    | ✔️                                                             |
| **Receive messages - Image** ![](/images/versions/plus.png) <br> `message` event       | ✔️    | ✔️                                                             |
| **Receive messages - Polls**                                                           |       | ✔️                                                             |
| **Receive messages - Polls Votes (in my channel)**                                     |       |                                                                |
| **Receive messages - Reactions (in my channel)**                                       |       |                                                                |
| **Channels - follow, unfollow**                                                        |       |                                                                |
| **Channels - mute, unmute**                                                            |       |                                                                |
| **Admins - Send Invite**                                                               |       |                                                                |
| **Admins - Revoke Invite**                                                             |       |                                                                |
| **Admins - Accept Invite**                                                             |       |                                                                |
| **Admins - Demote Admin**                                                              |       |                                                                |
****

_If you don't see the feature request link you need in the above list - please create [an feature request](https://github.com/devlikeapro/waha/issues/new/choose) or vote and leave a comment on the existing one._
****
