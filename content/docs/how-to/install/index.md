---
title : "🔧 Install & Update"
description: "How to install and update WAHA"
lead: "How to install and update WAHA"
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 201
slug: install
images: ["install.jpg"]
aliases:
  - /docs/how-to/install-update
---


{{< callout context="note" icon="outline/info-circle" >}}
If you wish to follow a **Step-By-Step guide** which shows you how to send your first message via HTTP API,
please go to [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}).
{{< /callout >}}


You probably already have run the docker run command during
[**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}) guide:
```bash
docker run -it --rm -p 3000:3000/tcp --name waha devlikeapro/waha
```

☝️ The above command is good **for testing and development purposes**, but **not for production**.

To make it **production-ready**, you need to configure a few more parameters to make it secure, reliable, and easy to manage.



## Requirements
### System Requirements
You can use any operating system for host system (**Linux**, **Windows** or **macOS**)
as long as you have Docker installed, and it can run **Linux** containers.

💡 We recommend using **Linux** with **Debian** or **Ubuntu** based distributions.

We strongly recommend using VPS or servers with minimum **2CPU and 2GB RAM** configuration for the project 
even for a single session.
If you want to host more sessions - please check the numbers in 
[**FAQ**]({{< relref "/docs/overview/faq#system-requirements" >}}).

{{< details "<b>Linux</b>" >}}
👉 We suggest using **Debian** or **Ubuntu** based distributions.
{{< /details >}}

{{< details "<b>Windows</b>" >}}
👉 For **Windows** we kindly suggest using **Hyper-V** backend for
[Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)!

It might not work with **WSL2** backend properly.
{{< /details >}}

### Pre-requisites
Before proceeding, make sure you have the latest version of `docker` and `docker compose` installed.

We recommend using Docker version equal to or higher than the following:

```bash
$ docker --version
Docker version 26.1.3, build b72abbb
$ docker compose version
Docker Compose version v2.27.0
```

{{< details "Why Docker?" >}}
**Docker** makes it easy to ship **all-in-one solution** with the runtime and dependencies.
You don't have to worry about language-specific libraries or chrome installation.

Also, Docker makes installation and update processes so simple, just one command!
{{< /details >}}

{{< details "Why Docker Compose?" >}}
**Docker Compose** is a tool for defining and running Docker applications.
With Compose, you use a YAML file to configure your application's services.
Then, with a single command, you create and start all the services from your configuration.
{{< /details >}}

### Get docker image

Follow the instructions below:
{{< include file="content/docs/how-to/install/download-image.md" >}}

## Install

1. Install Docker on your VM
```bash
# example in ubuntu
apt-get update
apt-get upgrade
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
apt install docker-compose-plugin
```

2. Download the required files
```bash
# Download the env file template
wget -O .env https://raw.githubusercontent.com/devlikeapro/waha/refs/heads/core/.env.example
# Download the Docker compose template
wget -O docker-compose.yaml https://raw.githubusercontent.com/devlikeapro/waha/refs/heads/core/docker-compose.yaml
```

3. Tweak the `.env` and `docker-compose.yaml` according to your preferences. 
Refer to the available environment variables in [**⚙️ Configuration**]({{< relref "/docs/how-to/config" >}}).

Some important values you **MUST** change before running it:

- API Key for secure API access. Read more [**🔒 Security**]({{< relref "/docs/how-to/security" >}})
   - `WHATSAPP_API_KEY=admin`
- Username, password for [**📊 Dashboard**]({{< relref "/docs/how-to/dashboard" >}}):
   - `WAHA_DASHBOARD_USERNAME=admin`
   - `WAHA_DASHBOARD_PASSWORD=admin`
- Username, password for [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}):
   - `WHATSAPP_SWAGGER_USERNAME=admin`
   - `WHATSAPP_SWAGGER_PASSWORD=admin`

{{< callout context="caution" title="Use long API Key" >}}
Use at **least 64 symbols random string** as `WHATSAPP_API_KEY` string that contains letters (a-z, A-Z) and numbers (1-9)
{{< /callout >}}

```bash
# update .env file with your values
nano .env
# update docker-compose.yaml - like image
# Remove "mongodb" and "minio" services if you don't need them
# Leave "waha" service as it is
nano docker-compose.yaml
```

4. Get the service up and running.
```bash
docker compose up -d
```

5. Your WAHA installation is complete. 
Please note that the **containers are not exposed to the internet**, and they only bind to the localhost. 
Setup something like Nginx or any other proxy server to proxy the requests to the container.

6. Now, open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) and login with the credentials you've set
   (`admin/admin` by default).

For temporary external access, you can change the port binding from `127.0.0.1:3000:3000` to `3000:3000` in the compose file. This will make your instance accessible at `http://<your-external-ip>:3000`.
However, for production use, we recommend reverting this change and using Nginx or another proxy server as a frontend.

### Additional Steps
#### Configure Nginx and Let's Encrypt 
👉 Replace **<YOURDOMAIN.COM>** with your domain name in the following steps (use lowercase).

1. Configure Nginx to serve as a frontend proxy.
```bash
sudo apt-get install nginx
cd /etc/nginx/sites-enabled

nano <YOURDOMAIN.COM>.conf
```

2. Use the following Nginx config and **replace** the `<YOURDOMAIN.COM>` in `server_name`.
```nginx
server {
  server_name <YOURDOMAIN.COM>;

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

3. Verify and reload your Nginx config by running the following command.
```bash
nginx -t
systemctl reload nginx
```

4. Run Let's Encrypt to configure SSL certificate. (replace **<YOURDOMAIN.COM>**!)
```bash
apt install certbot
apt-get install python3-certbot-nginx
mkdir -p /var/www/ssl-proof/waha/.well-known

certbot --webroot -w /var/www/ssl-proof/waha/ -d <YOURDOMAIN.COM> -i nginx
```

5. Your WAHA installation should be accessible from the https://yourdomain.com now.
6. Change `WAHA_BASE_URL=https://<YOURDOMAIN.COM>` in the `.env` file and restart the WAHA service
```bash
# Change the WAHA_BASE_URL in .env
nano .env
# Restart the WAHA service
docker compose up -d
docker compose restart
```

## Update
When there's a new version of WAHA, you can update it with these simple commands:

[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) image:
```bash
# Login if you're using WAHA Plus
docker login -u devlikeapro -p {KEY}
docker compose pull
docker logout

docker compose up -d
```

👉 If you specified exact version in `docker-compose.yml`, like
```yaml
image: devlikeapro/waha-plus:latest-2024.7.8
```

remember to change it to `latest-{YEAR}.{MONTH}.{BUILD}` to get the latest version.


**WAHA Core** image:
```bash
docker compose pull
docker compose up -d
```

## Get logs, restart, stop
```bash
# Stop all containers
docker compose down
# Start all containers, apply new configuration
docker compose up -d
# Restart all containers
docker compose restart
# Show logs in real time
docker compose logs -f
# Show logs - since interval
docker compose logs --since 1h  
```

## What's next?

{{< include file="content/docs/overview/quick-start/links.md" >}}
