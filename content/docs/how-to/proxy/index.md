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

- `WHATSAPP_PROXY_SERVER=localhost:3128`: Set the proxy server in the format `host:port`
  or a full URL `scheme://username:password@host:port` (credentials percent-encoded).
- `WHATSAPP_PROXY_SERVER_SCHEME=http`: Set the proxy scheme - `http` (default), `https` or `socks5`.
- `WHATSAPP_PROXY_SERVER_USERNAME=username` and `WHATSAPP_PROXY_SERVER_PASSWORD=password`: Configure credentials for the proxy.
- `WHATSAPP_PROXY_SERVER_LIST=host1.example.com:3138,host2.example.com:3138`: Specify a comma-separated list of addresses to use, utilizing a round-robin algorithm for server selection.
- `WHATSAPP_PROXY_SERVER_INDEX_PREFIX=proxy-`: Define a session name prefix to choose the appropriate proxy from the list.

Read more about it on [**⚙️ Configuration**]({{< relref "/docs/how-to/config#proxy" >}}).

### Session Proxy Configuration
You can configure proxy for a session by setting `config.proxy` fields when you `POST /api/sessions/`:

{{< include file="content/docs/how-to/proxy/-proxy-examples.md" >}}

Read more about it on [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions#proxy" >}}).

## API
Check a proxy against what WhatsApp needs - before you save it, or when a session keeps reconnecting.

The [**📊 Dashboard**]({{< relref "/docs/how-to/dashboard" >}}) runs the same checks:
**Test Proxy** in the session config checks the proxy as typed in the form,
**Run Proxy Checks** in the session menu checks the proxy the session has, in the worker menu - any proxy you enter.

Every check comes in two forms:
1. **Session** - `POST /api/sessions/{session}/proxy/...` - checks the proxy the session has
   (its `config.proxy`, or the global one from `WHATSAPP_PROXY_SERVER`).
   Works for a `STOPPED` session, answers `422` when the session has no proxy.
2. **Any proxy** - `POST /api/proxy/...` - checks the `proxy` from the body, no session needed - to try a config
   before saving it. Needs an admin key, or a session key with the `setting` scope -
   see [**🔒 Security**]({{< relref "/docs/how-to/security#session-key-scopes" >}}).

A check always answers `200`. When it fails - `ok` is `false` and `error` says why:

```jsonc { title="Failed check" }
{
  "ok": false,
  "error": {
    "code": "PROXY_AUTH_FAILED",
    "message": "The proxy refused the username or password (407)"
  }
}
```

- `PROXY_AUTH_FAILED` - the proxy refused the username or password
- `PROXY_CONNECTION_REFUSED` - nothing listens on the proxy address
- `PROXY_HOST_NOT_FOUND` - the proxy host does not resolve
- `PROXY_TIMEOUT` - no answer within `timeout`
- `PROXY_REJECTED` - the proxy refused to connect to the target
- `PROXY_DISCONNECTED` - the proxy dropped the connection before the check was over
- `PROXY_INVALID` - the proxy server or scheme is not valid
- `PROXY_FAILED` - anything else, see `message`

The examples below use this proxy:

```jsonc { title="proxy" }
{
  "proxy": {
    "server": "localhost:3128",
    // Optional
    "scheme": "http",
    "username": "username",
    "password": "P@ssw0rd"
  }
}
```

### Get Proxy
Shows the proxy URL, without credentials.

```http request
POST /api/sessions/{session}/proxy/info
```

```http request
POST /api/proxy/info
```

```jsonc { title="Body (/api/sessions/:session/proxy/info)" }
{}
```

```jsonc { title="Body (/api/proxy/info)" }
{
  "proxy": {
    "server": "localhost:3128",
    "username": "username",
    "password": "P@ssw0rd"
  }
}
```

```jsonc { title="Response" }
{
  // Where the proxy comes from - "session", "environment" or "request"
  "source": "session",
  "url": "http://localhost:3128/",
  "username": "username"
}
```

### Check the Proxy Is Reachable
Connects to the proxy server to confirm it is reachable. The credentials are not checked here.

```http request
POST /api/sessions/{session}/proxy/probe/connect
```

```http request
POST /api/proxy/probe/connect
```

```jsonc { title="Body (/api/sessions/:session/proxy/probe/connect)" }
{
  // Optional - how long to wait, in milliseconds
  "timeout": 10000
}
```

```jsonc { title="Body (/api/proxy/probe/connect)" }
{
  "proxy": {
    "server": "localhost:3128",
    "username": "username",
    "password": "P@ssw0rd"
  },
  // Optional - how long to wait, in milliseconds
  "timeout": 10000
}
```

```jsonc { title="Response" }
{
  "ok": true,
  // Time to open the connection, in milliseconds
  "latency": 45,
  // The address the connection was opened to
  "address": "203.0.113.5",
  "port": 3128,
  "error": null
}
```

### Check a Website Is Reachable
Sends a request to a website through the proxy.
Confirms the proxy accepts the credentials and reaches the internet.

```http request
POST /api/sessions/{session}/proxy/probe/http
```

```http request
POST /api/proxy/probe/http
```

```jsonc { title="Body (/api/sessions/:session/proxy/probe/http)" }
{
  // Optional - "HEAD" (default) or "GET"
  "method": "HEAD",
  // Optional - "https://web.whatsapp.com/" by default
  "url": "https://web.whatsapp.com/",
  // Optional - how long to wait, in milliseconds
  "timeout": 10000
}
```

```jsonc { title="Body (/api/proxy/probe/http)" }
{
  "proxy": {
    "server": "localhost:3128",
    "username": "username",
    "password": "P@ssw0rd"
  },
  // Optional - "HEAD" (default) or "GET"
  "method": "HEAD",
  // Optional - "https://web.whatsapp.com/" by default
  "url": "https://web.whatsapp.com/",
  // Optional - how long to wait, in milliseconds
  "timeout": 10000
}
```

Any HTTP answer counts as reachable. Use `GET` to see what the website answered in `body` (up to 16 KB) -
handy when the site shows a block page to proxies.

```jsonc { title="Response" }
{
  "ok": true,
  "url": "https://web.whatsapp.com/",
  "method": "HEAD",
  // The HTTP status the website answered with
  "status": 200,
  // Round trip through the proxy, in milliseconds
  "latency": 230,
  // What the website answered - empty for HEAD
  "body": "",
  "error": null
}
```

### Check the Exit IP
Reads the IP address the internet sees behind the proxy.

```http request
POST /api/sessions/{session}/proxy/probe/exit-ip
```

```http request
POST /api/proxy/probe/exit-ip
```

```jsonc { title="Body (/api/sessions/:session/proxy/probe/exit-ip)" }
{
  // Optional - "https://ifconfig.me/ip" by default
  "url": "https://ifconfig.me/ip",
  // Optional - how long to wait, in milliseconds
  "timeout": 10000
}
```

```jsonc { title="Body (/api/proxy/probe/exit-ip)" }
{
  "proxy": {
    "server": "localhost:3128",
    "username": "username",
    "password": "P@ssw0rd"
  },
  // Optional - "https://ifconfig.me/ip" by default
  "url": "https://ifconfig.me/ip",
  // Optional - how long to wait, in milliseconds
  "timeout": 10000
}
```

`url` is any service that answers with the IP - as plain text, as an `ip=...` line or as JSON with `ip`
(`https://ipinfo.io/json`).

```jsonc { title="Response" }
{
  "ok": true,
  "ip": "203.0.113.10",
  "url": "https://ifconfig.me/ip",
  "error": null
}
```

👉 Call it a few times, some seconds apart - a proxy that rotates the IP between requests can get the account
flagged, especially when the IPs are in different countries. Pick a sticky session on such providers.
The **Dashboard** does 3 reads 30 seconds apart for you.

### Check the Proxy Keeps a WebSocket Open
Holds a WebSocket connection through the proxy for the duration, idle or with periodic messages.
Catches proxies that drop long-lived connections - the session connects fine, then keeps reconnecting.

```http request
POST /api/sessions/{session}/proxy/probe/websocket
```

```http request
POST /api/proxy/probe/websocket
```

```jsonc { title="Body (/api/sessions/:session/proxy/probe/websocket)" }
{
  // Optional - "wss://echo.websocket.org" by default
  "url": "wss://echo.websocket.org",
  // Optional - how long to keep the connection open, in milliseconds (40 seconds by default, 10 minutes max)
  "duration": 40000,
  // Optional - send a message every N milliseconds, like the WhatsApp keepalive. 0 (default) keeps it idle
  "pingInterval": 0,
  // Optional - how long to wait for the connection, in milliseconds
  "timeout": 10000
}
```

```jsonc { title="Body (/api/proxy/probe/websocket)" }
{
  "proxy": {
    "server": "localhost:3128",
    "username": "username",
    "password": "P@ssw0rd"
  },
  // Optional - "wss://echo.websocket.org" by default
  "url": "wss://echo.websocket.org",
  // Optional - how long to keep the connection open, in milliseconds (40 seconds by default, 10 minutes max)
  "duration": 40000,
  // Optional - send a message every N milliseconds, like the WhatsApp keepalive. 0 (default) keeps it idle
  "pingInterval": 0,
  // Optional - how long to wait for the connection, in milliseconds
  "timeout": 10000
}
```

The call lasts the whole `duration` - or returns as soon as the proxy drops the connection,
with `PROXY_DISCONNECTED` and how long it stayed open:

```jsonc { title="Response" }
{
  "ok": false,
  "url": "wss://echo.websocket.org",
  // How long the connection stayed open, in milliseconds
  "duration": 61230,
  // Messages sent and echoed back while connected
  "sent": 0,
  "received": 0,
  "error": {
    "code": "PROXY_DISCONNECTED",
    "message": "The connection closed after 61230 ms (code 1006)"
  }
}
```

Run it twice to cover both cases WhatsApp needs: idle (`pingInterval: 0`, some proxies drop idle connections after
a minute) and with keepalives (`duration: 300000`, `pingInterval: 30000`, like the WhatsApp engines do).

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

{{< callout context="tip" title="Prefer a Sticky Session with a selected country" icon="outline/bulb" >}}
A rotating proxy changes the exit IP between requests, which can get the account flagged.

👉️ Use a <b><a href="https://geonode.com/glossary/sticky-session" target="_blank">Sticky Session</a></b>
and pick the country of the phone number.
{{< /callout >}}

## Tunneling
If you can't use a proxy (or it doesn't help), you can try tunneling the connection to your local machine.

You can run WAHA on local network then, you can buy something like RaspberryPi or a small server (lenovo m93 or similar) and host it there.

So the setup would look like:
1. You have an app (with your logic and database) running on **VPS**
2. You have **WAHA** running on **your local network** on some dedicated PC (mongodb or file MUST be placed on this server as well)
3. You have [ngrok](https://ngrok.com/) (or any similar reverse proxy) running on **local network** and sharing 3000 port on dedicated name (paid ngrok required for that)
4. Your App communicated with WAHA API using the external ngrok name and WAHA send webhooks back to the server

There's nothing we can do about network detection from Meta side :(


