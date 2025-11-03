---
title: "WhatsApp + ChatWoot - Installation Guide"
description: "Install WAHA and ChatWoot on your own server with Docker. Step-by-step tasks for requirements, env files, and downloading images."
excerpt: "Install WAHA and ChatWoot on your own server with Docker. Step-by-step tasks for requirements, env files, and downloading images."
date: 2025-07-07T08:48:45+00:00
draft: false
images: [ "cover.png" ]
categories: [ "ChatWoot", "Apps" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: apps-chatwoot-install
---

## Overview
Complete guide to install and set up production-ready **WAHA** and **Chatwoot** instances on your own infrastructure!

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}

After completing the installation guide, you'll have:
- **WAHA** on [**http://localhost:3000**](http://localhost:3000)
- **ChatWoot** on [**http://localhost:3009**](http://localhost:3009)

{{< include file="content/docs/apps/chatwoot/-disclaimer.md" >}}

## Requirements
- **Hardware**: VM, VPS, or laptop with minimum **2 CPU** and **4GB RAM**
- **Operating System**: **Debian** or **Ubuntu** based distributions.

{{< include file="content/blog/apps-chatwoot-1-install/-ssh-port-forwarding.md" >}}

## Steps to Deploy
### Step 0: Add DNS Aliases
First, we need to add **DNS Aliases** so everything works as inside docker containers.

👉 **Run the below commands on YOUR LAPTOP/PC**, NOT on the **VPS or VM**:

{{< tabs "dns-aliases" >}}
{{< tab "MacOS" >}}
```bash { title="Add DNS Aliases (MacOS)" }
# Add
echo "127.0.0.1 chatwoot" | sudo tee -a /etc/hosts
echo "127.0.0.1 waha" | sudo tee -a /etc/hosts

# Check it worked - you must see the line like:
# 64 bytes from localhost (127.0.0.1): ...
ping chatwoot
ping waha
```
{{< /tab >}}

{{< tab "Linux" >}}
```bash { title="Add DNS Aliases (Linux)" }
# Add
echo "127.0.0.1 chatwoot" | sudo tee -a /etc/hosts
echo "127.0.0.1 waha" | sudo tee -a /etc/hosts

# Check it worked - you must see the line like:
# 64 bytes from localhost (127.0.0.1): ...
ping chatwoot
ping waha
```
{{< /tab >}}
{{< tab "Windows" >}}
Run **PowerShell as Admin** and execute:
```bash { title="Add DNS Aliases (Windows, PowerShell as Admin)" }
Add-Content -Path "$env:SystemRoot\System32\drivers\etc\hosts" -Value "`n127.0.0.1 chatwoot"
Add-Content -Path "$env:SystemRoot\System32\drivers\etc\hosts" -Value "`n127.0.0.1 waha"

ping chatwoot
ping waha
```
{{< /tab >}}
{{< /tabs >}}

### Step 1: Install Docker
```bash { title="Install Docker" }
# example in ubuntu
apt-get update
apt-get upgrade
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
apt install docker-compose-plugin
```

### Step 2: Download the Required Files
```bash { title="Download files" }
# Download the env files
wget -O .waha.env https://raw.githubusercontent.com/devlikeapro/waha/refs/heads/core/docker-compose/chatwoot/.waha.env
wget -O .chatwoot.env https://raw.githubusercontent.com/devlikeapro/waha/refs/heads/core/docker-compose/chatwoot/.chatwoot.env
# Download docker-compose
wget -O docker-compose.yaml https://raw.githubusercontent.com/devlikeapro/waha/refs/heads/core/docker-compose/chatwoot/docker-compose.yaml
```

### Step 3: Init WAHA

Generate a `.waha.env` file that we'll use in the next step for credentials:

```bash {title="Init WAHA"}
docker compose run --no-deps -v "$(pwd)":/app/env waha init-waha /app/env .waha.env .waha.env --force
```

{{< include file="content/docs/how-to/install/-init-waha-output.md" >}}


Remember these values (you can always check the `.env` file if you forget them):
- **Username / Password**: `admin / 11...11` - use them to access the Dashboard and Swagger UI
- **Api Key**: `00...00` - use it to connect to your server

👉 You can change variables to any values, but use **long random strings** (like **UUIDv4**)

### Step 4: Configure Environment Variables
Now you can tweak `.waha.env`, `.chatwoot.env` and `docker-compose.yaml`  according to your preferences.

{{< callout context="danger" title="Do Not Use Weak API Keys or Passwords!" icon="outline/shield-check" >}}

Even if you're running WAHA on a private server and think the IP is unknown - it's
straightforward for attackers to find and exploit it to send spam or abuse your WhatsApp sessions.

Always set strong, random values (see a guide below) for:
- `WAHA_API_KEY`
- `WAHA_DASHBOARD_PASSWORD`
- `WHATSAPP_SWAGGER_PASSWORD` - you can the same as for `WAHA_DASHBOARD_PASSWORD`

```bash
uuidgen | tr -d '-'
> 2e1005a40ef74edda01ffb1ade877fd3
```

{{< /callout >}}

### Step 5: Pull Docker Images
{{< tabs "download-docker-image" >}}

{{< tab "➕ WAHA Plus" >}}
If you got the
[➕ WAHA Plus]({{< relref "/docs/how-to/waha-plus" >}})
, use the following commands:

```bash { title="Pull Docker Images: WAHA Plus" }
docker login -u devlikeapro -p {KEY}
docker compose pull
docker logout
```

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right version.
{{< /tab >}}

{{< tab "WAHA Core" >}}
1. In `docker-compose.yaml` change `image: devlikeapro/waha-plus` to `image: devlikeapro/waha`
2. Run the command:
```bash { title="Pull Docker Images: WAHA Core" }
docker compose pull
```

{{< /tab >}}

{{< tab "WAHA (ARM)" >}}
If you're using **ARM CPU** (like Apple M1/M2, Raspberry Pi etc.).

If you got the
[➕ WAHA Plus]({{< relref "/docs/how-to/waha-plus" >}}):
1. In `docker-compose.yaml` change `image: devlikeapro/waha-plus` to `image: devlikeapro/waha-plus:arm`
2. Run the commands:

```bash { title="Pull Docker Images: WAHA Plus (ARM)" }
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus:arm
docker logout
```

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right version.

---

If you want to run **WAHA Core**:
1. In `docker-compose.yaml` change `image: devlikeapro/waha-plus` to `image: devlikeapro/waha:arm`
2. Run the commands:
```bash { title="Pull Docker Images: WAHA Core (ARM)" }
docker compose pull
```
{{< /tab >}}

{{< /tabs >}}

### Step 6: Prepare ChatWoot Database
```bash { title="Prepare ChatWoot Database" }
docker compose run --rm chatwoot bundle exec rails db:chatwoot_prepare
```


### Step 7: Start the Services
```bash { title="Start Services" }
docker compose up -d
```

### Step 8: Access Your WAHA
**Open** [**http://localhost:3000/dashboard**](http://localhost:3000/dashboard) with credentials:
- User: `admin`
- Password: `11111111111111111111111111111111`

**Add Api Key** to your worker:
- Api-Key: `00000000000000000000000000000000`

![](waha-dashboard-key.png)


### Step 9: Access Your ChatWoot
**Open** and **finish** the onboarding guide on [**http://localhost:3009/**](http://localhost:3009/)

![](chatwoot-onboarding.png)


## What is next?

👉 Connect **WhatsApp** to **ChatWoot** in
[**WhatsApp + ChatWoot - Configuration Guide**]({{< relref "/blog/apps-chatwoot-2-config" >}})

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}
