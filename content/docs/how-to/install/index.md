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

You probably already have run the docker run command during
[**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}) guide:
```bash
docker run ... devlikeapro/waha
```

{{< callout context="caution" icon="outline/alert-triangle" >}}
☝️ The above command is good **for development purposes**, but **not for production**.
{{< /callout >}}

To make it **production-ready**, you need to configure a few more parameters to make it secure, reliable, and easy to manage.


{{< callout context="note" icon="outline/info-circle" >}}
If you wish to follow a **Step-By-Step guide** which shows you **how to send your first message** via HTTP API,
please go to [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}).
{{< /callout >}}

{{< callout context="tip" icon="outline/info-circle" title="WAHA Apps">}}

If you want to use
[**🧩 Apps**]({{< relref "/docs/apps/about" >}}), such as
[**ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}),
please follow the specific installation and configuration guides provided for each app:

- [**WhatsApp + ChatWoot - Installation Guide**]({{< relref "/blog/apps-chatwoot-1-install" >}})

{{< /callout >}}


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

{{< include file="content/docs/how-to/install/-the-hosting.md" >}}


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

## Install

### Docker

1. Install Docker on your VM
```bash
# example in ubuntu
apt-get update
apt-get upgrade
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
apt install docker-compose-plugin
```

### Pull Image

Follow the instructions below:
{{< include file="content/docs/how-to/install/download-image.md" >}}

### WAHA
2. Download the required files
```bash
# Download the Docker compose template
wget -O docker-compose.yaml https://raw.githubusercontent.com/devlikeapro/waha/refs/heads/core/docker-compose.yaml
# Create empty .env file
touch .env
```

3. Generate a `.env` file that we'll use in the next step for credentials:

```bash {title="Init WAHA"}
docker compose run --no-deps -v "$(pwd)":/app/env waha init-waha /app/env
```

{{< include file="content/docs/how-to/install/-init-waha-output.md" >}}

Remember these values (you can always check the `.env` file if you forget them):
- **Username / Password**: `admin / 11...11` - use them to access the Dashboard and Swagger UI
- **Api Key**: `00...00` - use it to connect to your server

👉 You can change variables to any values, but use **long random strings** (like **UUIDv4**)

4. Tweak the `.env` and `docker-compose.yaml` according to your preferences. 
Refer to the available environment variables in [**⚙️ Configuration**]({{< relref "/docs/how-to/config" >}}).

```bash
# update docker-compose.yaml if required
# set "image: devlikeapro/waha" if you don't have waha-plus access
nano docker-compose.yaml
```

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


4. Get the service up and running.
```bash
docker compose up -d
```

5. Your WAHA installation is complete. 
Please note that the **containers are not exposed to the internet**, and they only bind to the **localhost**. 
Set up something like Nginx or any other proxy server to proxy the requests to the container.

{{< callout context="" title="How to export port from remote server?" icon="outline/info-circle" >}}
If you're using a remote server (like VPS or Virtual Machine on your laptop) you need to allow access for your browser. 
Use one of the options available.

6. **SSH tunneling**

If you're connecting to ssh, you can forward port 3000 on your laptop like
```bash
ssh -L 3000:localhost:3000 user@you.address.here
```

7. **Bind port to all ips**

For **temporary external access**, you can change the port binding from `127.0.0.1:3000:3000` to `3000:3000` in the `docker-compose.yaml` file. 
```yaml { title="docker-compose.yaml" }
services:
  waha:
    image: devlikeapro/waha-plus
    ports:
      - "3000:3000"
```
```bash
docker compose up -d
```

This makes your instance accessible at `http://<your-external-ip>:3000`.
{{< /callout >}}

8. Now, open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) and log in with the credentials you have in `.env` file:

- **Dashboard** - `WAHA_DASHBOARD_USERNAME / WAHA_DASHBOARD_PASSWORD`
- **Swagger**: `WHATSAPP_SWAGGER_USERNAME / WHATSAPP_SWAGGER_PASSWORD`
- **Api Key**: `WAHA_API_KEY`

![Dashboard Api Key](waha-dashboard-key.png)

### Nginx

👉 Replace **<YOUR_DOMAIN_OR_IP>** with your domain name in the following steps (use lowercase).

1. Configure Nginx to serve as a frontend proxy.
```bash
sudo apt-get install nginx
cd /etc/nginx/sites-enabled

nano <YOUR_DOMAIN_OR_IP>.conf
```

2. Use the following Nginx config and **replace** the `<YOUR_DOMAIN_OR_IP>` in `server_name`.
```nginx
server {
  server_name <YOUR_DOMAIN_OR_IP>;

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

Here are two scenarios for setting up HTTPS:

### HTTPS - Let's Encrypt

If you have a domain name (e.g., **yourdomain.com**) that points to your server's IP address, you can use Let's Encrypt to get free, trusted SSL certificates:

1. Run Let's Encrypt to configure SSL certificate. (replace **<YOURDOMAIN.COM>**!)
```bash
apt install certbot
apt-get install python3-certbot-nginx

mkdir -p /var/www/ssl-proof/waha/.well-known
certbot --webroot -w /var/www/ssl-proof/waha/ -d <YOURDOMAIN.COM> -i nginx
```

2. Your WAHA installation should be accessible from the https://yourdomain.com now.
3. Change `WAHA_BASE_URL=https://<YOURDOMAIN.COM>` in the `.env` file and restart the WAHA service
```bash
# Change the WAHA_BASE_URL in .env
nano .env
# Restart the WAHA service
docker compose up -d
docker compose restart
```

### HTTPS - Self-Signed Certificate

We recommend using **Let's Encrypt** free certificate if you have public IP and DNS name.

However, if you don't have **a domain name** or 
are using a **private IP address**, you can create a self-signed certificate for IP-based access,
expand the details below:

{{< details "**HTTPS - Setup Self-Signed Certificate**" >}}

1. Create a directory for your SSL certificates:
```bash
mkdir -p /etc/nginx/ssl
cd /etc/nginx/ssl
```

2. Create a configuration file for the self-signed certificate:
```bash
cat > ip-cert.cnf << 'EOL'
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
x509_extensions = v3_ca

[dn]
C=US
ST=State
L=City
O=Organization
OU=Department
CN=<YOUR_IP_ADDRESS>

[v3_ca]
subjectAltName = @alt_names

[alt_names]
IP.1 = <YOUR_IP_ADDRESS>
EOL
```

3. Generate a self-signed certificate valid for 10 years (3650 days):
```bash
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout ip-cert.key -out ip-cert.crt -config ip-cert.cnf
```

4. Update your Nginx configuration to use the self-signed certificate:
```bash
cd /etc/nginx/sites-enabled
nano <YOUR_DOMAIN_OR_IP>.conf
```

5. Modify your Nginx configuration to include SSL settings:
```nginx
server {
    listen 80;
    server_name <YOUR_IP_ADDRESS>;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name <YOUR_IP_ADDRESS>;

    ssl_certificate /etc/nginx/ssl/ip-cert.crt;
    ssl_certificate_key /etc/nginx/ssl/ip-cert.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # Point upstream to WAHA Server
    set $upstream 127.0.0.1:3000;

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
}
```

6. Verify and reload your Nginx config:
```bash
nginx -t
systemctl reload nginx
```

7. Update your WAHA configuration to use HTTPS:
```bash
# Change the WAHA_BASE_URL in .env to use https
nano .env
# Add or modify: WAHA_BASE_URL=https://<YOUR_IP_ADDRESS>
# Restart the WAHA service
docker compose up -d
docker compose restart
```

8. When accessing your WAHA instance, you'll need to accept the self-signed certificate warning in your browser.

{{< /details >}}

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
