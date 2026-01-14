---
title: "Deploy WAHA on EasyPanel"
description: "Quick setup guide to install WAHA on EasyPanel."
excerpt: "Quick setup guide to install WAHA on EasyPanel."
date: 2026-01-12T01:01:01+00:00
draft: false
images: ["cover.png"]
categories: ["Install"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-on-easypanel
toc: true
---
## Overview

![EasyPanel overview](00-easypanel-overview.png)

With WAHA on EasyPanel, you get:
- A public DNS name like `https://myproject-waha.<ID>.easypanel.host/`
- Automatic HTTPS handling
- Easy UI for deployments, env vars, and storage


{{< callout context="note" title="Requirements" icon="outline/server" >}}
- Clean **Ubuntu** or any **Linux-based** OS
- Minimum **2 CPU** and **2 GB RAM**
- **Public IP** address assigned to the server
- **No DNS required up front** because EasyPanel provides built-in DNS.
{{< /callout >}}

## Install
### Install EasyPanel

Install [EasyPanel](https://easypanel.io/) on a fresh Linux server:

```bash {title="Install EasyPanel"}
curl -sSL https://get.easypanel.io | sh
```

Finish the web setup in your browser.

### Create Project
Now, we need to **create a project** :

![Create project](01-create-project.png)

Name it `myproject`:

![Project name](02-create-project-myproject.png)

### Create an App
Open `myproject`, add a new **Service**, and choose **App**:

![Create service](10-project-create-service-app.png)

Name it `waha`:

![Service name](11-project-create-service-app-name-waha.png)

### App - Docker Image
Open the **waha** service and click **Docker Image**:

![Docker image](12-service-waha-docker-image.png)

Fill the fields based on the WAHA version you'll use.

You can change it later in the **Source** tab for the `waha` service.

{{< tabs "docker-image" "waha" >}}
{{< tab "➕ WAHA Plus" >}}
For 
[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}})
, use the following:

- **Image:** `devlikeapro/waha-plus`
- **Username:** `devlikeapro`
- **Password:** `{KEY}`
{{< /tab >}}

{{< tab "WAHA Core" >}}

- **Image:** `devlikeapro/waha`

{{< /tab >}}

{{< /tabs >}}

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right version.


### App - Environment Variables
Go to **Environment** and paste the environment variables below.

![Environment variables](13-service-waha-environment.png)

{{< callout context="caution" title="Change Secrets" icon="outline/shield-check" >}}
In the example below, we use `44..44` for some environment variables.

You must generate your own using this command:
```bash {title="Generate Secrets"}
uuidgen | tr -d '-'
```

{{< /callout >}}

```bash {title="Environment Variables"}
# ====================
# ===== SECURITY =====
# ====================
WAHA_API_KEY=44444444444444444444444444444444
WAHA_DASHBOARD_USERNAME=admin
WAHA_DASHBOARD_PASSWORD=44444444444444444444444444444444
WHATSAPP_SWAGGER_USERNAME=admin
WHATSAPP_SWAGGER_PASSWORD=44444444444444444444444444444444

# Disable Dashboard or Swagger
WAHA_DASHBOARD_ENABLED=True
WHATSAPP_SWAGGER_ENABLED=True

# ==================
# ===== COMMON =====
# ==================
# WhatsApp engine (WEBJS is default, GOWS or NOWEB for better performance)
WHATSAPP_DEFAULT_ENGINE=WEBJS

# "Firefox (YourApp)" in Linked Devices
# WAHA_CLIENT_DEVICE_NAME=YourApp

# Base URL for the API (used for webhooks, file URLs, etc.)
WAHA_BASE_URL=https://$(PRIMARY_DOMAIN)
WAHA_PUBLIC_URL=https://$(PRIMARY_DOMAIN)

# ===================
# ===== LOGGING =====
# ===================
# Log format: JSON (for log management systems) or PRETTY (for development)
WAHA_LOG_FORMAT=JSON

# Log level: info, debug, error, warn
WAHA_LOG_LEVEL=info

# Don't print QR codes in logs
WAHA_PRINT_QR=False

# =========================
# ===== MEDIA STORAGE =====
# =========================
# Local storage (default)
WAHA_MEDIA_STORAGE=LOCAL
WHATSAPP_FILES_LIFETIME=0
WHATSAPP_FILES_FOLDER=/app/.media
```

### App - Storage

Go to the **Storage** tab and add a **Volume Mount**:

![Storage mount](14-service-waha-storage-mount.png)

Create **two volumes**:
1. **Sessions**
- Name: `sessions`
- Mount path: `/app/.sessions`

2. **Media**
- Name: `media`
- Mount path: `/app/.media`


![Storage path](15-service-waha-storage-mount-app-sessions.png)

This is what volumes should look like in the end:

![Storage list](16-service-waha-storage-mount-list.png)

{{< callout context="tip" title="Host Path" icon="outline/server" >}}
On the server, you can find the files later in these folders:
- `/etc/easypanel/projects/myproject/waha/volumes/sessions`
- `/etc/easypanel/projects/myproject/waha/volumes/media`

The pattern is `/etc/easypanel/projects/[project]/[service]/volumes/[volume]`
{{< /callout >}}

### App - Advanced

Go to the **Advanced** tab and **disable** **Zero Downtime** deployment.

![Advanced settings](17-service-waha-advanced-zero-downtime-off.png)


### App - Deploy
Go to the **Deployments** tab and click **Deploy**.

![Deploy](19-service-waha-deployments-deploy.png)

When it finishes, click the **Open** icon to open WAHA.

![Open WAHA](20-service-waha-deployments-open-waha.png)

### Check WAHA

Use `admin` as **Username** and your generated `WAHA_DASHBOARD_PASSWORD` to log in:

<div class="text-center">

![Swagger login](21-swagger-login.png)

</div>

You'll see **Swagger** documentation. Now click **Dashboard**:

![Open dashboard](22-swagger-click-dashboard.png)

Enter your `WAHA_API_KEY` to connect:

![Dashboard API key](31-waha-dashboard-key.png)

Now you can **Create & Start** a new session:

![Create session](32-waha-dashboard-create-session.png)

**Scan the QR code** using your WhatsApp app:

![Scan QR](33-waha-dashboard-session-start-qr.png)


## Update

When you want to update the image, trigger a **Force Build** on the **Deployments** tab:

![Force rebuild](40-waha-update-force-rebuild.png)

## What's next?

{{< include file="content/docs/overview/quick-start/links.md" >}}
