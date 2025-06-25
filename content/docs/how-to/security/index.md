---
title : "🔒 Security"
description: "Security"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 700
images: ["swagger-basic-auth.png"]
slug: security
---

{{< callout context="caution" title="Do not expose WhatsApp API on public networks!" icon="outline/shield-check" >}}
We do not recommend exposing the API on any public networks!

Either protect the API with [**Api Key**](#api-security) or deny access by using firewalls.

{{< /callout >}}

## API security

You can protect the API by requiring `X-Api-Key` header in HTTP request.

Set `WAHA_API_KEY=yoursecretkey` environment variable for that:

```bash
docker run -it -e WAHA_API_KEY=yoursecretkey devlikeapro/waha-plus
```
{{< include file="content/docs/how-to/security/how-to-set-api-key.md" >}}

> Api Key does not hide your Swagger documentation or Dashboard. Please have a look at the next section to find how to hide Swagger under the password.

### Use Api-Key in Swagger

After you set api key - to authorize on swagger use **Authorize** button at the top:
![alt](swagger-auth.png)

### Add X-Api-Key header

To authorize requests - set `X-Api-Key` header to `yoursecretkey` for all requests that go to WAHA.

#### Python
Example for Python **requests** library:

```python
import requests

headers = {
  'Content-type': 'application/json',
  'X-Api-Key': 'yoursecretkey',
}
requests.get("http://localhost:3000/api/sessions", headers=headers)
```

### Exclude endpoints
If you need to exclude some endpoints (like `GET /health` or `GET /ping`) from the API Key requirement - you can
set `WAHA_API_KEY_EXCLUDE_PATH` environment variable with a comma-separated list of endpoints (no `/` at the beginning).

```bash
docker run -it \
 -e WAHA_API_KEY_EXCLUDE_PATH="health,ping" \
 -e WAHA_API_KEY=yoursecretkey \
 devlikeapro/waha-plus
```



## Swagger Security
### Username and password
If you want to hide the project Swagger panel under the password - run the following command to hide under `admin/admin`
login and password.

```bash
docker run -it -e WHATSAPP_SWAGGER_USERNAME=admin -eWHATSAPP_SWAGGER_PASSWORD=admin devlikeapro/waha-plus
```

Open http://localhost:3000/ and enter `admin / admin` in the inputs:

![alt](swagger-basic-auth.png)

{{< callout context="note" icon="outline/info-circle" >}}
Protecting Swagger under the password does not protect your API from other request! Use both techniques to protect your API and Swagger!
{{< /callout >}}

### Disable Swagger
You also can hide swagger completely by setting `WHATSAPP_SWAGGER_ENABLED=false` environment variable.

{{< callout context="note" icon="outline/info-circle" >}}
Disabling Swagger does not protect the API, please use API security as well
{{< /callout >}}


### Swagger White Label
You can also set [Swagger White Label]({{< relref "/docs/how-to/swagger#white-label" >}})
options instead of hiding the Swagger panel.


## Dashboard Security
When running WAHA you can set the following environment variables to configure the dashboard:
- `WAHA_DASHBOARD_ENABLED=true` - enable or disable the dashboard, by default `true`. Set to `false` to disable the dashboard.
- `WAHA_DASHBOARD_USERNAME=waha` - username used to log in, by default `admin` or `waha` 
- `WAHA_DASHBOARD_PASSWORD=waha` - password used to log in, by default `admin` or `waha`.

Read more about [**Dashboard ->**]({{< relref "/docs/how-to/dashboard" >}})

## Webhook security
To make sure that you get a webhook from your WAHA instance - you can use **HMAC authentication**.

Read more about
[**🔄 Events**]({{< relref "/docs/how-to/events#hmac-authentication" >}}).

## HTTPS
After you set up the security options - you should set up HTTPS to protect the data in transit and prevent [Man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

That's fine to run it on the **local network** without HTTPS, but for **the production** environment, HTTPS is a must-have.

{{< include file="content/docs/how-to/security/use-nginx-for-https.md" >}}

WAHA supports HTTPS out of the box if you don't want to use a reverse proxy like Nginx (**using Nginx is recommended**)

You can set up the following environment variables to enable HTTPS:
- `WAHA_HTTPS_ENABLED=true`: Set this variable to `true` to enable HTTPS. By default, it's `false`.
- `WAHA_HTTPS_PATH_KEY=/path/to/key.pem`: The path to the key file for HTTPS. By default `./.secrets/privkey.pem`
- `WAHA_HTTPS_PATH_CERT=/path/to/cert.pem`: The path to the certificate file for HTTPS. By default `./.secrets/cert.pem`
- `WAHA_HTTPS_PATH_CA=/path/to/ca.pem`: The path to the CA file for HTTPS. By default `./.secrets/chain.pem`
