---
title: "Deploy WAHA on Coolify"
description: "Deploy WAHA on Coolify."
excerpt: "Deploy WAHA on Coolify."
date: 2026-01-13T01:01:01+00:00
draft: false
images: ["cover.png"]
categories: ["Install"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: waha-on-coolify
toc: true
---

## Overview

With WAHA on [Coolify](https://coolify.io/), you get:
- Free Self-hosted Coolify 
- UI for deployments, env vars, and storage
- Automatic HTTPS with a built-in proxy

![Coolify overview](0000-coolify-overview.png)

{{< callout context="note" title="Requirements" icon="outline/server" >}}
- Clean **Ubuntu** or any **Linux-based** OS
- Minimum **2 CPU** and **2 GB RAM**
- **Public IP** address assigned to the server
- (Recommended) **DNS** address assigned to the server for HTTPS - `waha.example.com`
{{< /callout >}}

## Install
### Install Coolify

For self-hosted Coolify, run:

```bash {title="Install Coolify"}
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Finish the web setup in your browser.

### Create Project
Create a new project:

![Add project](00-add-project.png)

Name it `myproject`:

![Project name](00-add-project-my-project.png)

### Create an App
Open `myproject`, and **Add Resource**:

![Add resource](10-add-resource.png)

Select **Docker Image**:

![Docker image resource](11-add-resource-docker-image.png)

Set the **Docker Image**:

{{< tabs "docker-image" "waha" >}}
{{< tab "➕ WAHA Plus" >}}
For
[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}})
, you need first login to docker registry.

Open server console via ssh and run:
```bash {title="Login to Docker Registry"}
docker login -u devlikeapro -p dckr_pat_{YOURKEY}
docker pull devlikeapro/waha-plus:latest
# DO NOT RUN logout for Coolify!
# docker logout 
```

👉🏻 You can find your key in [portal.devlike.pro](https://portal.devlike.pro/)

Then set:
- **Image Name:** `devlikeapro/waha-plus`
{{< /tab >}}

{{< tab "WAHA Core" >}}

- **Image Name:** `devlikeapro/waha`
{{< /tab >}}

{{< /tabs >}}

![App name and image](12-add-resource-docker-image-image-name.png)

### App - General
Open **General**:

- Change **Name** to `waha`
- Add a domain for WAHA in **Domains**, like `http://abc.{yourip}.sslip.io,https://waha.example.com` (optional, you can still use auto generated domain name)
- Click **Save**

![Domain settings](13-project-name-domain.png)


### App - Advanced

Open **Advanced**, in **Container Names** section enable **Consistent Container Names**:

![Advanced container name](14-project-advanced-container-name.png)

### App - Environment Variables
Go to **Environment Variables**, click **Developer view** and use values below:

![Environment variables view](14-project-env-variable-dev-view.png)

{{< callout context="caution" title="Change Secrets" icon="outline/shield-check" >}}
In the example below, we use `44..44` for some environment variables.

You must generate your own using this command:
```bash {title="Generate Secrets"}
uuidgen | tr -d '-'
```
{{< /callout >}}

{{< callout context="note" title="Change WAHA_BASE_URL and WAHA_PUBLIC_URL" icon="outline/info-circle" >}}
Change `WAHA_BASE_URL` and `WAHA_PUBLIC_URL` to your domain, like `https://waha.example.com`
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

# Base URL for the API (used for webhooks, file URLs, etc.)
WAHA_BASE_URL=https://waha.example.com
WAHA_PUBLIC_URL=https://waha.example.com


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

![Environment variables list](15-project-env-variable-variables.png)

### App - Storage
Open **Persistent Storage**, add a **Volume Mount**

![Add volume](16-project-storage-add-volume.png)

Create **2 volumes**:
1. **Sessions**
- Name: `sessions`
- Destination path: `/app/.sessions`

2. **Media**
- Name: `media`
- Destination path: `/app/.media`

![Volume fields](17-project-storage-add-volume-fields.png)

Click on **Persistent Storage** again to see all volumes:

![Volumes list](17-project-storage-add-volume-volumes.png)

### App - Healthcheck
Open **Healthcheck**, set **Path** as `ping`, click **Enable Healthcheck**

![Healthcheck](18-project-healthcheck.png)

### App - Deployments
Open **Deployments**, click **Deploy** to pull the image and start the app:

![Deployments](19-project-deployments.png)

When it finishes, click **Links** and open any link to open WAHA:

![App links](20-project-links.png)

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
When there's a new version, click **Redeploy** to pull the latest image.

![Redeploy](44-app-update.png)

## What's next?

{{< include file="content/docs/overview/quick-start/links.md" >}}
