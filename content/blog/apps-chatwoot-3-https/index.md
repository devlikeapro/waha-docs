---
title: "WAHA + ChatWoot - HTTPS Guide"
description: "WAHA + ChatWoot - HTTPS Guide"
excerpt: "WAHA + ChatWoot - HTTPS Guide"
date: 2025-07-07T08:48:45+00:00
draft: false
images: [ "waha-chatwoot.png" ]
categories: [ "Apps", "ChatWoot" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: apps-chatwoot-3-https
---

## Overview
Complete guide to install and set up production-ready **WAHA** and **Chatwoot** instances on your own infrastructure!

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}

After completing the configuration guide, you'll have:
- **WAHA** on `https://waha.{yourdomain}`
- **ChatWoot** on `https://chatwoot.{yourdomain}`

{{< include file="content/docs/apps/chatwoot/-disclaimer.md" >}}

## Requirements
At this point you should have:
- **WAHA** on [**http://localhost:3000**](http://localhost:3000)
- **ChatWoot** on [**http://localhost:3009**](http://localhost:3009)
- **WhatsApp** connected to [**ChatWoot Inbox**](https://www.chatwoot.com/hc/user-guide/articles/1677492191-adding-inboxes) using **WAHA** [**🧩 ChatWoot App**]({{< relref "/docs/apps/chatwoot" >}})!

If you don't have it - kindly follow **the previous guides in the series above ☝️**.

{{< include file="content/blog/apps-chatwoot-1-install/-ssh-port-forwarding.md" >}}

Now you're ready to publish your **ChatWoot** and **WAHA** instances on the internet!

### Configure DNS 
If you have VPS with a Public IP address, you need to configure DNS - add **A** records to point those domains:
1. `waha.<yourdomain.com>` => `YOUR_VPS_IP_ADDRESS`
2. `chatwoot.<yourdomain.com>` => `YOUR_VPS_IP_ADDRESS`

## Configure HTTPS for ChatWoot
### 1. Install Nginx
```bash { title="Install Nginx" }
sudo apt-get install nginx
```
### 2. Add Nginx config
```bash { title="Add Nginx config" }
cd /etc/nginx/sites-enabled
nano chatwoot.<yourdomain.com>.conf
```

```yaml { title="chatwoot.<yourdomain.com>.conf" }
server {
  server_name chatwoot.<yourdomain.com>;

  # Point upstream to Chatwoot App Server
  set $upstream 127.0.0.1:3009;

  # Nginx strips out underscore in headers by default
  # Chatwoot relies on underscore in headers for API
  # Make sure that the config is set to on.
  underscores_in_headers on;
  location /.well-known {
    alias /var/www/ssl-proof/chatwoot/.well-known;
  }

  location / {
    proxy_pass_header Authorization;
    proxy_pass http://$upstream;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Ssl on; # Optional

    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_http_version 1.1;
    proxy_buffering off;

    client_max_body_size 0;
    proxy_read_timeout 36000s;
    proxy_redirect off;
  }
  listen 80;
}
```
### 3. Verify and reload Nginx config
```bash { title="Verify and reload Nginx config" }
nginx -t
systemctl reload nginx
```

### 4. Run Let’s Encrypt to configure SSL certificate
```bash { title="Run Let’s Encrypt to configure SSL certificate" }
apt install certbot
apt-get install python3-certbot-nginx
mkdir -p /var/www/ssl-proof/chatwoot/.well-known
certbot --webroot -w /var/www/ssl-proof/chatwoot/ -d chatwoot.<yourdomain.com> -i nginx
```

### 5. Update env variables
Update `FRONTEND_URL` in `.chatwoot.env`
```bash
nano .chatwoot.env
``` 

```env { title=".chatwoot.env" }
FRONTEND_URL=https://chatwoot.<yourdomain.com>
```

Apply the changes:
```bash
docker compose up -d
``` 

### 6. Access your installation
- Open `https://chatwoot.<yourdomain.com>`
- Make sure it's working

### 7. Update ChatWoot URL in WAHA
- Open **WAHA** [http://localhost:3000](http://localhost:3000)
- Open **Apps** and **Edit App**
- Update **ChatWoot URL** from `http://chatwoot:3009` to `https://chatwoot.<yourdomain.com>`
- Hit **Save**
- Open **ChatWoot** `https://chatwoot.<yourdomain.com>`
- Send `status` message to **WhatsApp Integration (WAHA)** conversation to test **WAHA <=> ChatWoot** connection

## Configure HTTPS for WAHA
It's **optional** step - follow it if you need access to 
[**📊 Dashboard**]({{< relref "dashboard" >}}) from the internet.

Otherwise - use ssh port forwarding to manage WAHA, it's usually enough.

{{< include file="content/blog/apps-chatwoot-1-install/-ssh-port-forwarding.md" >}}

### 1. Install Nginx
```bash { title="Install Nginx" }
sudo apt-get install nginx
```

### 2. Add Nginx config
```bash { title="Add Nginx config" }
cd /etc/nginx/sites-enabled
nano waha.<yourdomain.com>.conf
```

```yaml { title="waha.<yourdomain.com>.conf" }
server {
  server_name waha.<yourdomain.com>;

  # Point upstream to WAHA Server
  set $upstream 127.0.0.1:3000;

  location /.well-known {
    alias /var/www/ssl-proof/waha/.well-known;
  }

  location / {
    proxy_pass_header Authorization;
    proxy_pass http://$upstream;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Ssl on; # Optional

    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_http_version 1.1;
    proxy_buffering off;

    client_max_body_size 0;
    proxy_read_timeout 36000s;
    proxy_redirect off;
  }
  listen 80;
}
```
### 3. Verify and reload Nginx config
```bash { title="Verify and reload Nginx config" }
nginx -t
systemctl reload nginx
```

### 4. Run Let’s Encrypt to configure SSL certificate
```bash { title="Run Let’s Encrypt to configure SSL certificate" }
apt install certbot
apt-get install python3-certbot-nginx
mkdir -p /var/www/ssl-proof/waha/.well-known
certbot --webroot -w /var/www/ssl-proof/waha/ -d waha.<yourdomain.com> -i nginx
```

### 5. Update env variables
Update `FRONTEND_URL` in `.chatwoot.env`
```bash
nano .waha.env
``` 

```env { title=".waha.env" }
WAHA_BASE_URL=https://waha.<yourdomain.com>
```

Apply the changes:
```bash
docker compose up -d
``` 

### 6. Access your installation
- Open `https://waha.<yourdomain.com>`
- Make sure it's working

### 7. Update Webhook URL in ChatWoot
- Open **ChatWoot** `http://localhost:3009`
- Go to **Settings → Inboxes → {Inbox}**
- Update **Webhook URL** from `http://waha:3000/{WEBHOOKURL}` to `https://waha.<yourdomain.com>/{WEBHOOKURL}`
- Click **Save**
- Send `status` message to **WhatsApp Integration (WAHA)** conversation to test **WAHA <=> ChatWoot** connection


## What is next?

[**🧩 ChatWoot App**]({{< relref "/docs/apps/chatwoot" >}})
to see features available for **WhatsApp ChatWoot** integration using **WAHA**.

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}
