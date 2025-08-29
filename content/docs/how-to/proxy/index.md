---
title: "🌐 Proxy"
description: "Avoid issues with scanning QR codes in WhatsApp."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 226
slug: proxy
images: [ "proxy.png" ]
---

## Overview
If you're experiencing issues scanning QR codes in WhatsApp, especially with **Indian 🇮🇳 phone numbers**,
using a proxy located close to the phone number's location may help resolve the problem.

<div style="width: 400px; max-width: 100%; margin: 1rem auto;">
{{< img lqip="21x webp q20" src="proxy.png" alt="Proxy" >}}
</div>

👉 If proxy doesn't help but the project works on YOUR local laptop - check [Tunneling](#tunneling).

### Symptoms
1. You start a new session in WhatsApp.
2. Scan the QR code.
3. Experience a long loading time.
4. Face login failures or instant logout.
5. Encounter a new QR code or enter a FAILED state immediately.

### Solutions
**There are two ways to solve this issue**:
1. Use a proxy (read this page and [**article about WAHA + Geonode**]({{< relref "/blog/waha-geonode" >}})).
2. Running WAHA on local network and [**expose WAHA with Ngrok**]({{< relref "/blog/waha-ngrok" >}}).

<div class="text-center">

  ![WhatsApp - could not login](could-not-login.png)

</div>

## Configuration
There are two ways to set up proxies:
1. Global Setting (for all sessions per container)
2. Per Session Configuration (you can define a proxy for each session when you start it)

### Global Proxy Configuration
To use a proxy, you can set the following environment variables:

- `WHATSAPP_PROXY_SERVER=localhost:3128`: Set the proxy server in the format `host:port`, without HTTP or HTTPS.
- `WHATSAPP_PROXY_SERVER_USERNAME=username` and `WHATSAPP_PROXY_SERVER_PASSWORD=password`: Configure credentials for the proxy.
- `WHATSAPP_PROXY_SERVER_LIST=host1.example.com:3138,host2.example.com:3138`: Specify a comma-separated list of addresses to use, utilizing a round-robin algorithm for server selection.
- `WHATSAPP_PROXY_SERVER_INDEX_PREFIX=proxy-`: Define a session name prefix to choose the appropriate proxy from the list.

Read more about it on [**Configuration page** ->]({{< relref "/docs/how-to/config#proxy" >}}).

### Session Proxy Configuration
You can configure proxy for a session by setting `config.proxy` fields when you `POST /api/sessions/`:
- `server` - proxy server address, without `http://` or `https://` prefixes
- `username` and `password` - set this if the proxy requires authentication


**No authentication**
```json
{
  "name": "default",
  "config": {
    "proxy": {
      "server": "localhost:3128"
    }
  }
}
```

**Proxy with authentication**
```json
{
  "name": "default",
  "config": {
    "proxy": {
      "server": "localhost:3128",
      "username": "username",
      "password": "P@ssw0rd"
    }
  }
}
```

Read more about it on [**Sessions page** ->]({{< relref "/docs/how-to/sessions#configure-proxy" >}}).


## Recommended Proxies

### Proxy6
👉 <b><a href="https://proxy6.net/en/?r=628046" target="_blank">Proxy6</a></b>

Apply the promo code to get a **5% OFF Discount** on your purchase.

```yaml
9W9oVxx3UX
```

### Geonode
👉 <b><a href="https://geonode.com/?ref=90920" target="_blank">Geonode</a></b>

Apply the promo code to get a **5% OFF Discount** on your purchase.

```yaml
GEONODEAFF
```

It might reconnect the session due to its internal **geonode** issues - {{< issue 751 >}}




## Tunneling
If you can't use a proxy (or it doesn't help), you can try tunneling the connection to your local machine.

You can run WAHA on local network then, you can buy something like RaspberryPi or a small server (lenovo m93 or similar) and host it there.

So the setup would look like:
1. You have an app (with your logic and database) running on **VPS**
2. You have **WAHA** running on **your local network** on some dedicated PC (mongodb or file MUST be placed on this server as well)
3. You have [ngrok](https://ngrok.com/) (or any similar reverse proxy) running on **local network** and sharing 3000 port on dedicated name (paid ngrok required for that)
4. Your App communicated with WAHA API using the external ngrok name and WAHA send webhooks back to the server

There's nothing we can do about network detection from Meta side :(


