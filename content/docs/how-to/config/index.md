---
title: "⚙️ Configuration"
description: "Configuration"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 299
slug: config
images: ["cover.png"]
---

You can configure WhatsApp API behavior via environment variables.

{{< tabs "config-methods" >}}

{{< tab "docker run" >}}
You can add environment variables by adding `-e WHATSAPP_VARNAME=value` at the
beginning of the command line or by using [other options](https://docs.docker.com/engine/reference/commandline/run/)

```bash
docker run -it -e "WAHA_WORKER_ID=waha" -e WAHA_PRINT_QR=False devlikeapro/waha-plus
```
{{< /tab >}}

{{< tab "docker compose" >}}
It's not necessary to always run such a long command - you can save all data in
[docker-compose.yaml](https://github.com/devlikeapro/waha/blob/core/docker-compose.yaml)
file as described on [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}).

```yaml { title="docker-compose.yaml" }
version: '3'

services:
  waha:
    image: devlikeapro/waha-plus
    container_name: waha
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - WAHA_WORKER_ID=waha
      - WAHA_PRINT_QR=False
```

```bash
docker compose up -d
```
{{< /tab >}}

{{< tab ".env" >}}
You can also use a `.env` file to set environment variables. Create a `.env` file in the same directory as your docker-compose.yaml file.

```ini { title=".env" }
WAHA_WORKER_ID=waha
WAHA_PRINT_QR=False
```

Then reference it in your docker-compose.yaml file:

```yaml { title="docker-compose.yaml" }
version: '3'

services:
  waha:
    image: devlikeapro/waha-plus
    container_name: waha
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    env_file:
      - .env
```

```bash
docker compose up -d
```
{{< /tab >}}

{{< /tabs >}}


## Common
- `WHATSAPP_API_PORT=3000`: The port number that the HTTP server will listen on. The default value is `3000`.
  - `PORT=3000` is also supported (for Heroku compatibility)
- `WHATSAPP_API_HOSTNAME=localhost`: The hostname for the HTTP server. The default value is `localhost`.
- `WHATSAPP_API_SCHEMA=https` - it just changes `media.url` schema when you receive media (with files) messages.
- `WAHA_BASE_URL` - will be used to construct the `media.url` field in the webhook events. 
  - By default, it's `{WHATSAPP_API_SCHEMA}://{WHATSAPP_API_HOSTNAME}:{WHATSAPP_API_PORT}`.
- `WAHA_PUBLIC_URL=https://w.example.com` — the publicly available link to the dashboard (use this if `WAHA_BASE_URL` is set to an internal address for Docker).
- `TZ=Europe/Warsaw` - set the timezone for the container. The default value is `UTC`. Find [your timezone in the list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
- `WAHA_DEBUG_MODE=false` - enables some API only for development or troubleshooting purposes. Disabled by default.
  - Read more on [**🔍 Observability**]({{< relref "/docs/how-to/observability#waha-debug-mode" >}}) page.


## Logging

Read more about [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})

Options you can use to control how WAHA outputs logs:
- `WAHA_LOG_FORMAT` - supports formats:
  - `WAHA_LOG_FORMAT=PRETTY` - good for local development, **default** format
  - `WAHA_LOG_FORMAT=JSON` - can be useful if you're using a central logging management system
- `WAHA_LOG_LEVEL` - how much information to log `error | warn | info | debug | trace`.
  - 👉 Do not set `debug` and `trace` in production, as these levels generate excessive log output.
- `WAHA_HTTP_LOG_LEVEL=info` - controls the level of `request completed` log (HTTP access). You can set it to `error | warn | info | debug | trace`.
- `DEBUG=1` - you can set this environment variable as a shortcut for `WAHA_LOG_LEVEL=debug`, `DEBUG=1` overrides the `WAHA_LOG_LEVEL` to `debug` if both defined. 
👉 Learn more about logging configuration on [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}}) page.


## Engines
Read more about [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}})

- `WHATSAPP_DEFAULT_ENGINE=WEBJS` - set the default engine for all sessions. Available options: `WEBJS`, `NOWEB`, `GOWS`. By default, it's `WEBJS`.

### WEBJS
{{< include file="content/docs/engines/webjs/-env-config.md" >}}

## Sessions

Read more about [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}}) and [**🗄️ Storages**]({{< relref "/docs/how-to/storages#sessions" >}})

- `WAHA_AUTO_START_DELAY_SECONDS=0` - when docker-container restarts, WAHA starts all `STOPPED` sessions (or all sessions if you set `WAHA_RESTART_ALL_SESSIONS=True`). You can set the delay between session restarts in seconds.
  - By default, it's `0`.
  - **WEBJS** - consider setting it to `5` if you have many sessions
  - **NOWEB** - it's fine to leave to `0` or you can increase to `1` if you experience issues with starting sessions.
- `WAHA_PRINT_QR=True` - set this variable to `False` to disable printing QR codes to the console. By default, `True`.
- `WAHA_WORKER_ID=waha1` - set the worker ID for the session. 
  - Workers restore sessions if worker got restarted. If you have multiple workers, each worker will restore its own sessions.
- `WHATSAPP_RESTART_ALL_SESSIONS=True`: Set this variable to `True` to start all **STOPPED** sessions after container
  restarts. By default, this variable is set to `False`.

Rarely used:
- `WAHA_WORKER_RESTART_SESSIONS=True` - restart all sessions when the worker is restarted. By default, `True`.
- `WHATSAPP_START_SESSION=session1,session2`: This variable can be used to start sessions with the specified names right
  after launching the API. Separate session names with a comma.
- `WAHA_ZIPPER=ZIPUNZIP` - use `zip` and `unzip` system binaries to pack **WEBJS** authentication data. Disabled by default.
  - It's relevant if you're using **WEBJS + MongoDB**. Install `zip` and `unzip` if you don't use our official docker image and set the variable

### Sessions - Local
- `WAHA_LOCAL_STORE_BASE_DIR=/app/.sessions` - Override the base directory for local storage of session data

### Sessions - PostgreSQL
- `WHATSAPP_SESSIONS_POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable` - PostgreSQL connection URL for storing session data

### Sessions - MongoDB
- `WHATSAPP_SESSIONS_MONGO_URL=mongodb://user:password@host:port/` - MongoDB connection URL for storing session data

### Sessions - Ignore Chats
You can configure default ignore rules for all sessions via environment variables (applied unless a session provides its own `config.ignore`). This helps save resources and reduces HTTP requests sent over webhooks by filtering out events at the source.

- `WAHA_SESSION_CONFIG_IGNORE_STATUS=false` – ignore [**🟢 Status**]({{< relref "/docs/how-to/status" >}}) events where chat id is `status@broadcast`
- `WAHA_SESSION_CONFIG_IGNORE_GROUPS=false` – ignore [**👥 Groups**]({{< relref "/docs/how-to/groups" >}}) events where chat id is `.*@g.us`
- `WAHA_SESSION_CONFIG_IGNORE_CHANNELS=false` – ignore [**📢 Channels**]({{< relref "/docs/how-to/channels" >}}) events where chat id is `.*@newsletter`
- `WAHA_SESSION_CONFIG_IGNORE_BROADCAST=false` – ignore 📡 Broadcast events where chat id is `.*@broadcast` (excludes `status@broadcast`; use `WAHA_SESSION_CONFIG_IGNORE_STATUS` for Status)

Read more about `config.ignore` on [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions#ignore" >}}) page.

## Apps

{{< include file="content/docs/apps/about/-config.md" >}}

## Webhooks

Read more about [**🔄 Events & Webhooks**]({{< relref "/docs/how-to/events" >}})

💡 You can open [https://webhook.site](https://webhook.site) and paste UUID from it to `url` field,
and you'll see all requests immediately in your browser to intercept the webhook's payload.

### Global webhooks
You can configure webhooks for **all sessions** at once by setting these environment variables:

- `WHATSAPP_HOOK_URL=https://webhook.site/11111111-1111-1111-1111-11111111`  - to set up a URL for the webhook
- `WHATSAPP_HOOK_EVENTS=message,message.any,state.change` - specify events.
  - `WHATSAPP_HOOK_EVENTS=*` - subscribe to all events.
  - We don't suggest using `*` or all events for production, it can generate a lot of requests.
- `WHATSAPP_HOOK_HMAC_KEY=your-secret-key` - the same as `hmac.key` field in the webhook configuration.
- `WHATSAPP_HOOK_RETRIES_POLICY=linear` - the same as `retries.policy` field in the webhook configuration.
- `WHATSAPP_HOOK_RETRIES_DELAY_SECONDS=2` - the same as `retries.delaySeconds` field in the webhook configuration.
- `WHATSAPP_HOOK_RETRIES_ATTEMPTS=4`
- `WHATSAPP_HOOK_CUSTOM_HEADERS=X-My-Custom-Header-1:Value;X-My-Custom-Header-2:Value` - the same as `customHeaders` field in the webhook configuration.
  - Use `Header:Value` format and separate them by `;`.

That webhook configuration **does not appear** in `session.config` field in `GET /api/sessions/` request.

💡 You can open [https://webhook.site](https://webhook.site) and paste URL from it to `url` field,
and you'll see all requests immediately in your browser to intercept the webhook's payload.

### Session webhooks
You can configure webhook when you start session by setting `config.webhook` fields.

Read more about it on [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions#configure-webhook" >}}).

## Swagger

Read more about [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}})

- `WHATSAPP_SWAGGER_CONFIG_ADVANCED=true` - enables advanced configuration options for Swagger documentation - you can customize host, port and base URL for the requests.
  Disabled by default.
- `WHATSAPP_SWAGGER_ENABLED=false` - disables Swagger documentation. Enabled by default. Available in **WAHA Plus** only.
- `WHATSAPP_SWAGGER_USERNAME=admin` and `WHATSAPP_SWAGGER_PASSWORD=admin` - these variables can be used to protect the Swagger panel
  with `admin / admin` credentials. This does not affect API access. Available in **WAHA Plus** only.
- `WHATSAPP_SWAGGER_TITLE` - the title of the Swagger documentation and some other places.
- `WHATSAPP_SWAGGER_DESCRIPTION` - Markdown formatted description of your API.
- `WHATSAPP_SWAGGER_EXTERNAL_DOC_URL` - URL to the external documentation.
- `WHATSAPP_SWAGGER_VIDEO_EXAMPLE_URL` - link to the video example.
- `WHATSAPP_SWAGGER_OPUS_EXAMPLE_URL` - link to the opus example.
- `WHATSAPP_SWAGGER_JPG_EXAMPLE_URL` - link to the jpg example.

## Proxy

Read more about [**🔌 Proxy**]({{< relref "/docs/how-to/proxy" >}})

### Global proxy
If you need to use a proxy, you can set the following environment variables:

- `WHATSAPP_PROXY_SERVER=localhost:3128`: Use this variable to set the proxy server in the format `host:port`, without http or https.
- `WHATSAPP_PROXY_SERVER_USERNAME=username` and `WHATSAPP_PROXY_SERVER_PASSWORD=password`: Use these variables to set up credentials for the proxy.
- `WHATSAPP_PROXY_SERVER_LIST=host1.example.com:3138,host2.example.com:3138`: Use this variable to set a comma-separated list of addresses to use, using a round-robin algorithm to choose the server for the session.
- `WHATSAPP_PROXY_SERVER_INDEX_PREFIX=proxy-`: Use this variable to parse the session name for the prefix and find the appropriate session.
  For example, if you have set `WHATSAPP_PROXY_SERVER_LIST=host-first:80,host-second:80,host-third:80` and `WHATSAPP_PROXY_SERVER_INDEX_PREFIX=proxy-` and you run `proxy-3` session, the `host-third:80` proxy will be chosen for that session.
  This is a way to select a proxy from while you start session.

### Session proxy
You can configure proxy when you start session by setting `config.proxy` fields.
Read more about it on [**Session page** ->]({{< relref "/docs/how-to/sessions#configure-proxy" >}}).

Keep in mind that session's proxy configuration takes precedence over proxy configuration set by environment variables!

## HTTPS 

Read more about [**🔒 Security**]({{< relref "/docs/how-to/security" >}})

{{< include file="content/docs/how-to/security/use-nginx-for-https.md" >}}

Enable HTTPS directly in WAHA by setting the following environment variables:

- `WAHA_HTTPS_ENABLED=true`: Set this variable to `true` to enable HTTPS. By default, it's `false`.
- `WAHA_HTTPS_PATH_KEY=/path/to/key.pem`: The path to the key file for HTTPS. By default `./.secrets/privkey.pem`
- `WAHA_HTTPS_PATH_CERT=/path/to/cert.pem`: The path to the certificate file for HTTPS. By default `./.secrets/cert.pem`
- `WAHA_HTTPS_PATH_CA=/path/to/ca.pem`: The path to the CA file for HTTPS. By default `./.secrets/chain.pem`


## Security

Read more about [**🔒 Security**]({{< relref "/docs/how-to/security" >}})

**API**
- `WAHA_API_KEY={RANDOMLONGSTRING}`: require `X-Api-Key: {KEY}` header in all requests to the API.
  - `WAHA_API_KEY={RANDOMLONGSTRING}`- plain key works, but it's better to set **SHA512** instead.
  - `WHATSAPP_API_KEY={RANDOMLONGSTRING}` - also works, but it's better to set **SHA512** instead.
  - `WAHA_API_KEY=sha512:{SHA515_FROM_RANDOMLONGSTRING}`: require `X-Api-Key: {RANDOMLONGSTRING}` header in all requests to the API.
- `WHATSAPP_API_KEY_EXCLUDE_PATH=ping,health` - exclude URI from key auth [#451](https://github.com/devlikeapro/waha/issues/451)
- `WAHA_NO_API_KEY=True`: Disable Api Key so you can set `WAHA_API_KEY` to empty value. By default, it'd generate the value anyway

**Dashboard**
- `WAHA_DASHBOARD_ENABLED=true`: Toggle to enable or disable the dashboard.
- `WAHA_DASHBOARD_USERNAME=waha`: Default username for login (default: waha).
- `WAHA_DASHBOARD_PASSWORD=waha`: Default password for login (default: waha).
- `WAHA_DASHBOARD_NO_PASSWORD=True`: Disable dashboard password so you can set `WAHA_DASHBOARD_PASSWORD` to empty value. By default, it'd generate the value anyway

**Swagger**
- `WHATSAPP_SWAGGER_ENABLED=true`: Toggle to enable or disable the Swagger.
- `WHATSAPP_SWAGGER_USERNAME={randomlongstring}`
- `WHATSAPP_SWAGGER_PASSWORD={randomlongstring}`
- `WHATSAPP_SWAGGER_NO_PASSWORD=True`: Disable swagger password so you can set `WHATSAPP_SWAGGER_NO_PASSWORD` to empty value. By default, it'd generate the value anyway


## Files

Read more about [**🖼️ Media Storage**]({{< relref "/docs/how-to/storages#media-storage" >}}) and [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}})


### Files - Local
The following environment variables can be used to configure the file storage options for the WAHA:

- `WHATSAPP_FILES_MIMETYPES`: This variable can be used to download only specific mimetypes from messages.
  By default, all files are downloaded. The mimetypes must be separated by a comma, without spaces.
  For example: `audio,image/png,image/gif`. To choose a specific type, use a prefix (like `audio,image`). See usage below.
- `WHATSAPP_DOWNLOAD_MEDIA=true` - this variable can be used to **completely** disable downloading media files. By default, all files are downloaded.
  Set this variable to `WHATSAPP_DOWNLOAD_MEDIA=false` to disable downloading media files.
  - Under the hood, it sets `WHATSAPP_FILES_MIMETYPES=mimetype/ignore-all-media` to ignore all media files.
- `WHATSAPP_FILES_LIFETIME`: This variable can be used to set the time (in seconds) after which files will be removed to
  free up space. The default value is `180`.
  - Set this variable to `0` to disable the file lifetime.
- `WHATSAPP_FILES_FOLDER`: This variable can be used to set the folder where files from chats (images, voice messages)
  will be stored. The default value is `/tmp/whatsapp-files`.
  - The folder must be mounted to the host machine to keep the files between container restarts. [ Read more about how to persist files ->]({{< relref "/docs/how-to/storages#media" >}})

💡 When media files are not processed due to `WHATSAPP_FILES_MIMETYPES` or `WHATSAPP_DOWNLOAD_MEDIA` settings,
you'll still receive a webhook event with `hasMedia: True` field, but without a `media.url`.
```jsonc { title="message" }
{
  "event": "message",
  "session": "default",
  "payload": {
    "hasMedia": true,
    "media": {
      "url": null,
      "mimetype": "video/mp4",
      "filename": null,
      "error": null // if there was an error during file download
    }
  }
}
```

### Files - S3
- `WAHA_MEDIA_STORAGE=S3` - enable the S3 storage
- `WAHA_S3_REGION=eu-west-1` - the region of the S3 bucket
- `WAHA_S3_BUCKET=waha` - the name of the S3 bucket
- `WAHA_S3_ACCESS_KEY_ID=minioadmin` - the access key of the S3 bucket
- `WAHA_S3_SECRET_ACCESS_KEY=minioadmin` - the secret access key of the S3 bucket
- `WAHA_S3_ENDPOINT=http://127.0.0.1:9000` - the endpoint of the S3 bucket (not required for AWS S3)
- `WAHA_S3_FORCE_PATH_STYLE=True` - force path style for the S3 bucket (not required for AWS S3)
- `WAHA_S3_PROXY_FILES` - proxy media files through WAHA (`False` by default)
  - `WAHA_S3_PROXY_FILES=False` - generate pre-signed URLs for media files and send them to the client in `media.url`
  - `WAHA_S3_PROXY_FILES=True` - WAHA will proxy media files through itself in `media.url`

### Files - PostgreSQL
- `WAHA_MEDIA_STORAGE=POSTGRESQL` - enable the PostgreSQL storage for media files
- `WAHA_MEDIA_POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable` - PostgreSQL connection URL for storing media files

## Health Check

Read more about [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}})

<b>Health check is available in [WAHA Plus ]({{< relref "/docs/how-to/waha-plus" >}}) only.</b>

The following environment variables can be used to configure the Health Check:
- `WHATSAPP_HEALTH_MEDIA_FILES_THRESHOLD_MB` - the threshold in MB for the media files storage. The default value is `100`.
- `WHATSAPP_HEALTH_SESSIONS_FILES_THRESHOLD_MB` - the threshold in MB for the sessions files storage. The default value is `100`.
- `WHATSAPP_HEALTH_MONGODB_TIMEOUT` - the timeout in milliseconds for the MongoDB health check. The default value is `5000`.
