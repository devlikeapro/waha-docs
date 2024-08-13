|                                                                   | WEBJS |                          NOWEB                          |
|-------------------------------------------------------------------|:-----:|:-------------------------------------------------------:|
| **Start session** <br> `POST /api/sessions/start`                 |  ✔️   |                           ✔️                            |
| **Stop session**  <br> `POST /api/sessions/stop`                  |  ✔️   |                           ✔️                            |
| **Logout from a session** <br> `POST /api/sessions/logout`        |  ✔️¹  |                           ✔️¹                           |
| **List sessions** <br> `GET /api/sessions/`                       |  ✔️   |                           ✔️                            |
| **Get session** <br> `GET /api/sessions/{session}`                |  ✔️   |                           ✔️                            |
| **Get screenshot** <br> `POST /api/screenshot`                    |  ✔️   |                            ➖                            |
| **Get me** <br> `GET /api/sessions/{session}/me`                  |  ✔️   |                           ✔️                            |
| **Get QR** <br> `POST /api/{session}/auth/qr`                     |  ✔️   |                           ✔️                            |
| **Request code** <br> `POST /api/{session}/auth/request-code`     |       |                           ✔️                            |
| **Authorize code** <br> `POST /api/{session}/auth/authorize-code` |       | ️[#113](https://github.com/devlikeapro/waha/issues/113) |

****
1. **Logout from a session** removes authentication information from a server (WAHA), 
but keeps the device on "Connected Device" in the app - [#148](https://github.com/devlikeapro/waha/issues/148)

_If you see the feature is not available in the above list, please [create a feature request](https://github.com/devlikeapro/waha/issues/new/choose) or **leave "+1" comment** on the existing one._

****
