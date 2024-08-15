---
title: "📊 Dashboard"
description: "Dashboard - UI to manage your WhatsApp sessions!"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: [ ]
weight: 202
---

## Overview

**Dashboard** is a UI to manage your WhatsApp sessions!

<video autoplay loop muted playsinline controls='noremoteplayback' width="100%" poster='/images/waha-dashboard.png'>
  <source src="/videos/waha-dashboard-overview.webm" type="video/webm" />
  Download the <a href="/videos/waha-dashboard-overview.webm">Dashboard Overview video</a> .
</video>

You can access **Dashboard** by running the project and opening
<a href="http://localhost:3000/dashboard" target="_blank">http://localhost:3000/dashboard</a>
(or similar, but with <a href="/dashboard" target="_blank">/dashboard</a> at the end).

ℹ️ **Default username and password**: `waha/waha`

```bash
docker run -it -p 3000:3000/tcp devlikeapro/waha-plus
```

If you're using [API Key]({{< relref "security" >}}), remember to set up the key in the dashboard.

![Dashboard with API Key](waha-dashboard-key.png)

## Configuration

When running WAHA you can set the following environment variables to configure the dashboard:

- `WAHA_DASHBOARD_ENABLED=true` - enable or disable the dashboard, by default `true`. Set to `false` to disable the
  dashboard.
- `WAHA_DASHBOARD_USERNAME=waha` - username used to log in, by default `waha`.
- `WAHA_DASHBOARD_PASSWORD=waha` - password used to log in, by default `waha`.

```bash
docker run -it -p 3000:3000/tcp -e WAHA_DASHBOARD_USERNAME=waha -e WAHA_DASHBOARD_PASSWORD=waha devlikeapro/waha-plus
```

## Single Dashboard - Multiple Servers
If you're running multiple servers 
(like [**using sharding to handle 50+ sessions ->**]({{< relref "/blog/waha-scaling" >}}))
you can run a dedicated WAHA just to have a single place where from you can manage all servers:

{{< img src="/images/waha/dashboard/waha-dashboard-servers.drawio.png" >}}

After that you can connect all server to the single dashboard:

{{< img src="/images/waha/dashboard/waha-single-dashboard-multiple-servers.png" >}}

## Bug reports and feature requests
If you're experiencing any issues or have a feature request, please create an issue in the
[WAHA GitHub](https://github.com/devlikeapro/waha/issues)

