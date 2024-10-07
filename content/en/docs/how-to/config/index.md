---
title: "⚙️ Configuration"
description: "Configuration"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: [ ]
weight: 299
---

You can configure WhatsApp API behaviour via environment variables, by adding `-e WHATSAPP_VARNAME=value` at the
begging of the command line or by using [other options](https://docs.docker.com/engine/reference/commandline/run/)

```bash
docker run -it -e "WAHA_WORKER_ID=waha" -e WAHA_PRINT_QR=False devlikeapro/waha
```

It's not necessary to always run such a long command - you can save all data in
[docker-compose.yaml](https://github.com/devlikeapro/waha/blob/core/docker-compose.yaml)
file as described on [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}).


The following environment variables can be used to configure the WAHA.

## Common
- `WHATSAPP_API_PORT=3000`: The port number that the HTTP server will listen on. The default value is `3000`.
  - `PORT=3000` is also supported (for Heroku compatibility)
- `WHATSAPP_API_HOSTNAME=localhost`: The hostname for the HTTP server. The default value is `localhost`.
- `WHATSAPP_API_SCHEMA=https` - it just changes `media.url` schema when you receive media (with files) messages.
  - In order to properly configure SSL follow [**Step-by-step guide on how to set up HTTPS for WAHA**]({{< relref "/blog/waha-https" >}})
- `WAHA_BASE_URL` - will be used to construct the `media.url` field in the webhook events. 
  - By default, it's `{WHATSAPP_API_SCHEMA}://{WHATSAPP_API_HOSTNAME}:{WHATSAPP_API_PORT}`.
- `WAHA_DEBUG_MODE=false` - enables some API only for development or troubleshooting purposes. Disabled by default.
- `TZ=Europe/Warsaw` - set the timezone for the container. The default value is `UTC`. Find [your timezone in the list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).


## Logging
Options you can use to control the way how WAHA output the logs:
- `WAHA_LOG_FORMAT` - supports formats:
  - `WAHA_LOG_FORMAT=PRETTY` - good for local development, **default** format
  - `WAHA_LOG_FORMAT=JSON` - can be useful if you're using central logging management system
- `WAHA_LOG_LEVEL` - how much information to log `error | warn | info | debug | trace`.
  - 👉 Do not set `debug` and `trace` in production, it gives too many logs.
- `WAHA_HTTP_LOG_LEVEL=info` - controls the level of `request completed` log (HTTP access), you can set it to `error | warn | info | debug | trace`.
- `DEBUG=1` - you can set this environment variable as a shortcut for `WAHA_LOG_LEVEL=debug`, `DEBUG=1` overrides the `WAHA_LOG_LEVEL` to `debug` if both defined. 

👉 Learn more about logging configuration on [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}}) page.


## Sessions
- `WAHA_PRINT_QR=True` - set this variable to `False` to disable printing QR codes to the console. By default, `True`.
- `WAHA_WORKER_ID=waha1` - set the worker ID for the session. 
  - Workers restore sessions if worker got restarted. If you have multiple workers, each worker will restore its own sessions.

Rarely used:
- `WAHA_WORKER_RESTART_SESSIONS=True` - restart all sessions when the worker is restarted. By default, `True`.
- `WHATSAPP_START_SESSION=session1,session2`: This variable can be used to start sessions with the specified names right
  after launching the API. Separate session names with a comma.
- `WHATSAPP_RESTART_ALL_SESSIONS=True`: Set this variable to `True` to start all **STOPPED** sessions after container
  restarts. By default, this variable is set to `False`.
- `WAHA_ZIPPER=ZIPUNZIP` - use `zip` and `unzip` system binaries to pack **WEBJS** authentication data. Disabled by default.
  - It's relevant if you're using **WEBJS + MongoDB**. Install `zip` and `unzip` if you don't use our official docker image and set the variable

Read more:
- [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}})
- [**🗄️ Storages**]({{< relref "/docs/how-to/storages#sessions" >}})

## Webhooks

💡 You can open [https://webhook.site](https://webhook.site) and paste UUID from it to `url` field,
and you'll see all requests immediately in your browser to intercept the webhook's payload.

### Global webhooks
There's a way how you can configure
[🔄 Webhooks]({{< relref "/docs/how-to/webhooks" >}})
for ALL sessions - by settings these environment variables:

- `WHATSAPP_HOOK_URL=https://webhook.site/11111111-1111-1111-1111-11111111`  - to set up a URL for the webhook
- `WHATSAPP_HOOK_EVENTS=message,message.any,state.change` - specify events. Do not specify all of
  them, it's too heavy payload, choose the right for you.
- `WHATSAPP_HOOK_EVENTS=*` - subscribe to all events. It's not recommended for production, but it's fine for
  development.

### Session webhooks
You can configure webhook when you start session by setting `config.webhook` fields.

Read more about it on [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions#configure-webhook" >}}).

## Swagger
- `WHATSAPP_SWAGGER_CONFIG_ADVANCED=true` - enables advanced configuration options for Swagger documentation - you can customize host, port and base URL for the requests.
  Disabled by default.
- `WHATSAPP_SWAGGER_ENABLED=false` - disables Swagger documentation. Enabled by default. Available in **WAHA Plus** only.
- `WHATSAPP_SWAGGER_USERNAME=admin` and `WHATSAPP_SWAGGER_PASSWORD=admin` - these variables can be used to protect the Swagger panel
  with `admin / admin` credentials. This does not affect API access. Available in **WAHA Plus** only.

Read more about Swagger configuration on [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}).

## Proxy
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
💡 We recommend handling HTTPS termination with a reverse proxy like Nginx - kindly follow 
[**🔧 Install & Update - Additional Steps**]({{< relref "/docs/how-to/install" >}}) to set up Nginx with Let's Encrypt.

However, you can enable HTTPS directly in WAHA by setting the following environment variables:

- `WAHA_HTTPS_ENABLED=true`: Set this variable to `true` to enable HTTPS. By default, it's `false`.
- `WAHA_HTTPS_PATH_KEY=/path/to/key.pem`: The path to the key file for HTTPS. By default `./.secrets/privkey.pem`
- `WAHA_HTTPS_PATH_CERT=/path/to/cert.pem`: The path to the certificate file for HTTPS. By default `./.secrets/cert.pem`
- `WAHA_HTTPS_PATH_CA=/path/to/ca.pem`: The path to the CA file for HTTPS. By default `./.secrets/chain.pem`

Read more about HTTPS options and how to configure it on [**🔒 Security**]({{< relref "/docs/how-to/security" >}}) page.

## Security
<b>Security is available in [WAHA Plus ![](/images/versions/plus.png)]({{< relref "/docs/how-to/waha-plus" >}}) only.</b>

- `WHATSAPP_API_KEY=mysecret`: If you set this variable, you must include the `X-Api-Key: mysecret` header in all
  requests to the API. This will protect the API with a secret code.
- `WHATSAPP_SWAGGER_USERNAME=admin` and `WHATSAPP_SWAGGER_PASSWORD=admin`: These variables can be used to protect the
  Swagger panel with `admin / admin` credentials. This does not affect API access.
Read more about security settings for Swagger and API on [*🔒 Security**]({{< relref "/docs/how-to/security" >}}).

## Files
<b>Files configuration is available in [WAHA Plus ![](/images/versions/plus.png)]({{< relref "/docs/how-to/waha-plus" >}}) only.</b>

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
- Also read more about [Media Storages on the dedicated page ->]({{< relref "/docs/how-to/storages#media" >}})

💡 Even if WAHA doesn't process the message media because of `WHATSAPP_FILES_MIMETYPES` or `WHATSAPP_DOWNLOAD_MEDIA`
you'll get a webhook event with `hasMedia: True` field, but with no `media.url`.
```json
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

👉 Learn more on [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}}) page.

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
  
👉 Learn more on [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}}) page.

## Health Check
<b>Health check is available in [WAHA Plus ![](/images/versions/plus.png)]({{< relref "/docs/how-to/waha-plus" >}}) only.</b>

The following environment variables can be used to configure the [Health Check ->]({{< relref "/docs/how-to/observability" >}}):
- `WHATSAPP_HEALTH_MEDIA_FILES_THRESHOLD_MB` - the threshold in MB for the media files storage. The default value is `100`.
- `WHATSAPP_HEALTH_SESSIONS_FILES_THRESHOLD_MB` - the threshold in MB for the sessions files storage. The default value is `100`.
- `WHATSAPP_HEALTH_MONGODB_TIMEOUT` - the timeout in milliseconds for the MongoDB health check. The default value is `5000`.

👉 Learn more on [**🔍 Observability**]({{< relref "/docs/how-to/observability" >}}) page.

