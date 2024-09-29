---
title : "🔧 Install & Update"
description: "How to install and update WAHA"
lead: "On the page you'll find answers on how to install and update WAHA."
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
images: []
weight: 201
---

👉 If you wish to follow a Step-By-Step guide which show you how to send you first message via HTTP API
please go to [**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}).

## Requirements
### Operating System
You can use any operating system for host system (Linux, Windows or macOS)
as long as you have Docker installed, and it can run **Linux** containers.

**Linux** is the most recommended operating system for running Docker containers.

💡 We recommend using **Linux** with **Debian** or **Ubuntu** based distributions.

{{< details "<b>Linux</b>" >}}
👉 We suggest using **Debian** or **Ubuntu** based distributions.
{{< /details >}}

{{< details "<b>Windows</b>" >}}
👉 For **Windows** we kindly suggest using **Hyper-V** backend for 
[Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)!

It might not work with **WSL2** backend properly.
{{< /details >}}

{{< details "<b>macOS (Apple Silicon)</b>" >}}
👉 If you're using **Apple Silicon** (like Apple M1) - you need to use the `:arm` tag for the image.

Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right image.
{{< /details >}}

{{< details "<b>Raspberry Pi</b>" >}}
👉 If you're using **Raspberry Pi** - you need to use the `:arm` tag for the image (depends on your CPU arch tho)

Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right image.
{{< /details >}}


### Pre-requisites
Before proceeding, make sure you have the latest version of `docker` and `docker compose` installed.

As of now *at the time of writing this doc*, we recommend a version equal to or higher than the following.

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
We'll use
[**➕ WAHA Plus**]({{< relref "/docs/how-to/plus-version" >}}) docker image in the guide:

```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus
docker logout
```

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the latest version and your key!

If you're using the **ARM** processor (like **Apple Silicon M1/M2**, **Raspberry Pi**, etc.) - add `:arm` tag at the end of the image name in the above commands.
```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus:arm
docker logout

# Rename it, so you can use devlikeapro/waha image in other place
docker tag devlikeapro/waha-plus:arm devlikeapro/waha-plus
```

For WAHA Core - use `devlikeapro/waha` image instead of `devlikeapro/waha-plus`.

### Choose the installation method
You probably already have run the docker run command during
[**⚡ Quick Start**]({{< relref "/docs/overview/quick-start" >}}) guide:
```bash
docker run -it --rm -p 3000:3000/tcp --name waha devlikeapro/waha
```

☝️ The above command is good **for testing and development purposes**, but **not for production**.

To make it **production-ready**, you need to configure few more parameters to make it secure, reliable, and easy to manage.

Please choose the installation method you prefer:
- [**Docker Compose**]({{< relref "#docker-compose" >}}) - recommended
- [**Docker**]({{< relref "#docker" >}}) - for advanced users


## Docker Compose
### Install
Here's ready to go 
[`docker-compose.yml`](https://github.com/devlikeapro/waha/blob/core/docker-compose.yaml).

Some important values you **MUST** change before running it:
- `WHATSAPP_API_KEY` - your key for secure API access. Read more [**🔒 Security**]({{< relref "/docs/how-to/security" >}})
- `WAHA_DASHBOARD_USERNAME` - your username for [**📊 Dashboard**]({{< relref "/docs/how-to/waha-dashboard" >}})
- `WAHA_DASHBOARD_PASSWORD` - your password for [**📊 Dashboard**]({{< relref "/docs/how-to/waha-dashboard" >}})
- `WHATSAPP_SWAGGER_USERNAME` - your username for [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}})
- `WHATSAPP_SWAGGER_PASSWORD` - your password for [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}})

```bash
mkdir ~/waha
cd ~/waha
wget https://raw.githubusercontent.com/devlikeapro/waha/core/docker-compose.yaml

# Change the values in the file
# nano docker-compose.yaml
# vim docker-compose.yaml

docker compose up -d
```

Now, open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) and login with the credentials you've set.

#### What is next?
The docker compose doesn't have few thing you might need:
- [HTTPS]({{< relref "/docs/how-to/security#https" >}}) - 👉 follow [**Step-by-step guide on how to set up HTTPS for WAHA**]({{< relref "/blog/waha-https" >}})
- *Optional* - configure **S3** for media (files) and **MongoDB** for sessions - [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}}) 

### Update
When there's a new version of WAHA, you can update it with a single commands:
```bash
# Login if you're using WAHA Plus
docker login -u devlikeapro -p {KEY}
docker compose pull
docker logout

# Just pull if you're using WAHA Core
# docker compose pull

docker compose up -d
```

👉 If you specified exact version in `docker-compose.yml`, like 
```yaml
image: devlikeapro/waha-plus:latest-2024.7.8
```
remember to change it to `latest-{YEAR}.{MONTH}.{BUILD}` to get the latest version.

### Maintenance
```bash
# Stop all containers
docker compose down
# Start all containers
docker compose up -d
# Restart all containers
docker compose restart
# Show logs in real time
docker compose logs -f
# Show logs - since interval
docker compose logs --since 1h  
```

## Docker
### Install
The simple way to run WAHA is to use the `docker run` command.

Some important values you **MUST** change before running it:
- `WHATSAPP_API_KEY` - your key for secure API access. Read more [**🔒 Security**]({{< relref "/docs/how-to/security" >}})
- `WAHA_DASHBOARD_USERNAME` - your username for [**📊 Dashboard**]({{< relref "/docs/how-to/waha-dashboard" >}})
- `WAHA_DASHBOARD_PASSWORD` - your password for [**📊 Dashboard**]({{< relref "/docs/how-to/waha-dashboard" >}})
- `WHATSAPP_SWAGGER_USERNAME` - your username for [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}})
- `WHATSAPP_SWAGGER_PASSWORD` - your password for [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}})

```bash
docker run -d \
    --restart=always \
    --name waha \
    -p 3000:3000/tcp \
    -v ./.sessions:/app/.sessions \
    -v ./.media:/app/.media \
    --env WHATSAPP_API_KEY=321 \
    --env WAHA_DASHBOARD_USERNAME=waha \
    --env WAHA_DASHBOARD_PASSWORD=waha \
    --env WAHA_LOG_FORMAT=JSON \
    --env WAHA_LOG_LEVEL=info \
    --env WHATSAPP_DEFAULT_ENGINE=WEBJS \
    --env WHATSAPP_RESTART_ALL_SESSIONS=True \
    --env WAHA_PRINT_QR=False \
    --env WHATSAPP_FILES_LIFETIME=0 \
    --env WHATSAPP_FILES_FOLDER=/app/.media \
    devlikeapro/waha-plus:latest
````
👉 To make it easy to manage, here's the scripts:
```bash
mkdir ~/waha
cd ~/waha
wget https://raw.githubusercontent.com/devlikeapro/waha/core/scripts/waha-run.sh
chmod +x waha-run.sh
wget https://raw.githubusercontent.com/devlikeapro/waha/core/scripts/waha-update.sh
cd +x waha-update.sh

# Change the values in run script
# nano waha-run.sh
# vim waha-run.sh

# Run the script - it'll download the latest version and start it
./waha-update.sh
# Insert your password from Patron Portal - https://portal.devlike.pro/
```

Now, open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) and login with the credentials you've set.

#### What is next?
The docker run command doesn't have few thing you might need:
- [HTTPS]({{< relref "/docs/how-to/security#https" >}}) - 👉 follow [**Step-by-step guide on how to set up HTTPS for WAHA**]({{< relref "/blog/waha-https" >}})
- *Optional* - configure **S3** for media (files) and **MongoDB** for sessions - [**🗄️ Storages**]({{< relref "/docs/how-to/storages" >}}) 

### Update
```bash
# Login if you're using WAHA Plus
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus
docker logout

# Just pull if you're using WAHA Core
# docker pull devlikeapro/waha

docker stop waha
docker rm waha
docker run -d \
    ... \ <==== Use the same lines as in the installation command
    devlikeapro/waha-plus:latest
```

**OR** using the scripts:
```bash
mkdir ~/waha
cd ~/waha
wget https://raw.githubusercontent.com/devlikeapro/waha/core/scripts/waha-run.sh
chmod +x waha-run.sh
wget https://raw.githubusercontent.com/devlikeapro/waha/core/scripts/waha-update.sh
cd +x waha-update.sh

./waha-update.sh
```

### Maintenance
```bash
# Stop the container
docker stop waha
# Start the container
docker start waha
# Restart the container
docker restart waha
# Show logs in real time
docker logs -f waha
# Show logs - since interval
docker logs --since 1h waha
```
