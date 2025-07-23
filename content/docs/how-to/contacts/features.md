<div></div>
{{< details "**👤 Contacts - API**" >}}

| **API**                                                             | WEBJS |      NOWEB       | GOWS |
|---------------------------------------------------------------------|:-----:|:----------------:|:----:|
| **Get all contacts** <br> `GET /api/contacts/all`                   |  ✔️   | ✔️[*1](#heading) |  ✔️  |
| **Get contact** <br> `GET /api/contacts`                            |  ✔️   | ✔️[*1](#heading) |  ✔️  |
| **Update contact** <br> `PUT /api/{session}/contacts/{chatId}`      |  ✔️   |        ✔️        |  ✔️  |
| **Check phone number exists** <br> `GET /api/contacts/check-exists` |  ✔️   |        ✔️        |  ✔️  |
| **Get “about” contact** <br> `GET /api/contacts/about`              |  ✔️   |                  |      |
| **Get profile picture** <br> `GET /api/contacts/profile-picture`    |  ✔️   |        ✔️        |  ✔️  |
| **Block contact** <br> `POST /api/contacts/block`                   |  ✔️   |                  |      |
| **Unblock contact** <br> `POST /api/contacts/unblock`               |  ✔️   |                  |      |

1. **NOWEB** - you need to [**Enable Store**]({{< relref "/docs/engines/noweb#store" >}}) to get **chats, contacts and messages**

{{< /details >}}

{{< details "**👤 Lids - API**" >}}

| **API**                                                                     | WEBJS |      NOWEB       | GOWS |
|-----------------------------------------------------------------------------|:-----:|:----------------:|:----:|
| **Get Known LIDs** <br> `GET /api/{session}/lids`                           |  ✔️   | ✔️[*1](#heading) |  ✔️  |
| **Get Count of LIDs** <br> `GET /api/{session}/lids/count`                  |  ✔️   | ✔️[*1](#heading) |  ✔️  |
| **Get Phone Number by LID** <br> `GET /api/{session}/lids/{lid}`            |  ✔️   | ✔️[*1](#heading) |  ✔️  |
| **Get LID by Phone Number** <br> `GET /api/{session}/lids/pn/{phoneNumber}` |  ✔️   | ✔️[*1](#heading) |  ✔️  |

1. **NOWEB** - you need to [**Enable Store**]({{< relref "/docs/engines/noweb#store" >}}) to get **chats, contacts and messages**

{{< /details >}}
