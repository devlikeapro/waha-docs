<div></div>
{{< details "**🖥️ Sessions - API**" >}}

| **API**                                                       | WEBJS | WPP | NOWEB | GOWS |
|---------------------------------------------------------------|:-----:|:---:|:-----:|:-----|
| **List sessions** <br> `GET /api/sessions/`                   |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Get session** <br> `GET /api/sessions/{name}`               |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Create session** <br> `POST /api/sessions/`                 |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Update session** <br> `POST /api/sessions/{name}/`          |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Delete session** <br> `DELETE /api/sessions/{name}/`        |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Start session** <br> `POST /api/sessions/{name}/start`      |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Stop session**  <br> `POST /api/sessions/{name}/stop`       |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Restart session** <br> `POST /api/sessions/{name}/restart`  |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Logout from a session** <br> `POST /api/sessions/logout`    |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Get screenshot** <br> `GET /api/screenshot`                 |  ✔️   | ✔️  |   ➖   | ➖    |
| **Get me** <br> `GET /api/sessions/{session}/me`              |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Get QR** <br> `POST /api/{session}/auth/qr`                 |  ✔️   | ✔️  |  ✔️   | ✔️   |
| **Request code** <br> `POST /api/{session}/auth/request-code` |  ✔️   | ✔️  |  ✔️   | ✔️   |

_If you see the feature is not available in the above list, please [create a feature request](https://github.com/devlikeapro/waha/issues/new/choose) or **leave "+1" comment** on the existing one._

{{< /details >}}
