---
title: "🔍 Observability"
description: "Logging, monitoring, hatchecks, etc"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false

weight: 299
---

## Logging

Options you can use to control the way how WAHA output the logs:

- `WAHA_LOG_FORMAT` - supports formats:
    - `WAHA_LOG_FORMAT=PRETTY` - good for local development, **default** format
    - `WAHA_LOG_FORMAT=JSON` - can be useful if you're using central logging management system
- `WAHA_LOG_LEVEL` - how much information to log `error | warn | info | debug | trace`.
    - 👉 Do not set `debug` and `trace` in production, it gives too many logs.
- `WAHA_HTTP_LOG_LEVEL=info` - controls the level of `request completed` log (HTTP access), you can set it
  to `error | warn | info | debug | trace`.
- `DEBUG=1` - you can set this environment variable as a shortcut for `WAHA_LOG_LEVEL=debug`, `DEBUG=1` overrides
  the `WAHA_LOG_LEVEL` to `debug` if both defined.

### Session logging

You can enable debug mode for a session by setting `config.debug` field to `true` when 
[Starting a session]({{< relref "/docs/how-to/sessions#debug" >}})

Can be useful for debugging purposes when you're experiencing some issues.

```json
{
  "name": "default",
  "config": {
    "debug": true
  }
}
```

## Ping

Returns a simple response to check if the service is running.

```http request
GET /ping
```

```json
{
  "message": "pong"
}
```

## Get server version

Returns the version of the installed docker image.

```http request
GET /api/server/version
```

```json
{
  "version": "2024.2.3",
  "engine": "NOWEB",
  "tier": "PLUS",
  "browser": "/usr/bin/google-chrome-stable"
}
```

## Get server environment variables

Returns the environment variables of the server

Return only WAHA related variables.

```http request
GET /api/server/environment?all=false
```

```json
{
  "DEBUG": "1",
  "WAHA_HTTP_LOG_LEVEL": "debug",
  "WAHA_LOG_FORMAT": "PRETTY",
  ...
}

```

Return all environment variables

```http request
GET /api/server/environment?all=true
```

```json
{
  "DEBUG": "1",
  "WAHA_HTTP_LOG_LEVEL": "debug",
  "WAHA_LOG_FORMAT": "PRETTY",
  "PATH": "/home/...",
  ...
}

```

## Get server status

Returns the server status, start timestamp, and uptime.

```http request
GET /api/server/status
```

```json
{
  "startTimestamp": 1723788847247,
  "uptime": 3600000
}
```

## Restart (stop) server

You can stop the server by calling

```http request
POST /api/server/stop
```

```json
{
  // By default, it gracefully stop all sessions and connections
  // but you can force it to stop immediately
  "force": false
}
```
👉 If you're using Docker and followed [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) guide,
Docker will **automatically restart** the server, so you can use this endpoint to **restart** the server.


## Health Check

<b>Health check is available in [WAHA Plus ]({{< relref "/docs/how-to/waha-plus" >}})
only.</b>

The health check endpoint is used to determine the health of the service.

```http request
GET /health
```

It returns a **200 OK** status code if the service is healthy.

The response format:

```json
{
  "status": "ok",
  "info": {
    "metric1": {
      "field": "value"
    },
    "metric2": {
      "field": "value"
    }
  },
  "error": {},
  "details": {}
}
```

Where:

- `status`: `'error' | 'ok' | 'shutting_down'` - If any health indicator failed the status will be `'error'`. If the app
  is shutting down but still accepting HTTP requests, the health check will have the `'shutting_down'` status.
- `info`: Object containing information of each health indicator which is of status `'up'`, or in other words "healthy".
- `error`: Object containing information of each health indicator which is of status `'down'`, or in other words "
  unhealthy".
- `details`: Object containing detailed information of each health indicator.

### Health Check Indicators

Few things we check in the health check:

- Media files storage space - `mediaFiles.space`
- Sessions files storage space - `sessionsFiles.space`
- MongoDB connection - `mongodb`

### Configuration

The following environment variables can be used to configure the health check:

- `WHATSAPP_HEALTH_MEDIA_FILES_THRESHOLD_MB` - the threshold in MB for the media files storage. The default value
  is `100`.
- `WHATSAPP_HEALTH_SESSIONS_FILES_THRESHOLD_MB` - the threshold in MB for the sessions files storage. The default value
  is `100`.
- `WHATSAPP_HEALTH_MONGODB_TIMEOUT` - the timeout in milliseconds for the MongoDB health check. The default value
  is `5000`.

### Examples

**Healthy response** when you use [Local Storage]({{< relref "/docs/how-to/storages#sessions" >}}) for session
authentication:

**200 OK**

```json
{
  "status": "ok",
  "info": {
    "mediaFiles.space": {
      "status": "up",
      "path": "/tmp/whatsapp-files",
      "diskPath": "/",
      "free": 132979355648,
      "threshold": 104857600
    },
    "sessionsFiles.space": {
      "status": "up",
      "path": "/app/.sessions",
      "diskPath": "/",
      "free": 132979355648,
      "threshold": 104857600
    }
  },
  "error": {},
  "details": {
    "mediaFiles.space": {
      "status": "up",
      "path": "/tmp/whatsapp-files",
      "diskPath": "/",
      "free": 132979355648,
      "threshold": 104857600
    },
    "sessionsFiles.space": {
      "status": "up",
      "path": "/app/.sessions",
      "diskPath": "/",
      "free": 132979355648,
      "threshold": 104857600
    }
  }
}
```

**Healthy response** when you use [MongoDB Storage]({{< relref "/docs/how-to/storages#sessions" >}}) for session
authentication:

**200 OK**

```json
{
  "status": "ok",
  "info": {
    "mediaFiles.space": {
      "status": "up",
      "path": "/tmp/whatsapp-files",
      "diskPath": "/",
      "free": 132977496064,
      "threshold": 104857600
    },
    "mongodb": {
      "status": "up",
      "message": "Up and running"
    }
  },
  "error": {},
  "details": {
    "mediaFiles.space": {
      "status": "up",
      "path": "/tmp/whatsapp-files",
      "diskPath": "/",
      "free": 132977496064,
      "threshold": 104857600
    },
    "mongodb": {
      "status": "up",
      "message": "Up and running"
    }
  }
}
```

**Unhealthy response example**

**503 Service Unavailable**

```json
{
  "status": "error",
  "info": {
    "mediaFiles.space": {
      "status": "up",
      "path": "/tmp/whatsapp-files",
      "diskPath": "/",
      "free": 132976623616,
      "threshold": 104857600
    }
  },
  "error": {
    "mongodb": {
      "status": "down",
      "error": "Timeout"
    }
  },
  "details": {
    "mediaFiles.space": {
      "status": "up",
      "path": "/tmp/whatsapp-files",
      "diskPath": "/",
      "free": 132976623616,
      "threshold": 104857600
    },
    "mongodb": {
      "status": "down",
      "error": "Timeout"
    }
  }
}
```

## Get Node.js heapsnapshot
```http request
GET /api/server/debug/heapsnapshot
```

⚠️ For troubleshooting usage only

Creates and download heap dump for Node.js. 

You need to enabled it by setting `WAHA_DEBUG_MODE=True` before you can use it.



