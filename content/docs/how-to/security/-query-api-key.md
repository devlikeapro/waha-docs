<div></div>


The recommended way to authenticate is the `X-Api-Key` **HTTP header**.

In some situations you cannot set headers — for example, when you want the **browser to render a media file directly**
without any JavaScript, by putting the URL straight into an `<img>` tag:

```html
<img src="http://localhost:3000/api/files/true_11111111111@c.us_AAA.jpg?x-api-key=your-key" />
```

For these cases WAHA accepts the key as a URL query parameter (note: the parameter name is **lowercase** `x-api-key`, not `X-Api-Key`):

```http request
GET /api/files/true_11111111111@c.us_AAA.jpg?x-api-key=your-key
```

⚠️ Never embed **your admin or full-session key in a URL** — URLs appear in browser history, server logs, and `Referer` headers.

Create a **dedicated session key per session** with all permissions set to `false` (API Key can still have access to media).

See [**🔒 Keys API**]({{< relref "/docs/how-to/security#keys-api" >}}) or [**📊 Dashboard**]({{< relref "/docs/how-to/dashboard#api-keys" >}}) for details.

```http request
POST /api/keys
```

```jsonc { title="Body - media only API Key" }
{
  "isAdmin": false,
  "session": "default",
  "isActive": true,
  "actions": {
    "read": false,
    "send": false,
    "control": false,
    "setting": false,
    "app": false,
    "delete": false
  }
}
```

