---
title: "⚡ Quick Start"
description: "One page summary of how to start WhatsApp API."
lead: "Step-by-Step guide to send your first message via WhatsApp API."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false

parent: "overview"
weight: 102
toc: true
---

{{< imgo src="waha-first-message.jpg" full="false" >}}

## Step-by-Step guide
On this page you're going to install and run WAHA,
authenticate the client using QR code,
and send **your first message** to WhatsApp using API!

We will guide you through the necessary steps to successfully send your first text message using WhatsApp API.

<div class='article-card'>
  <b class='h4'>Are you a visual learner?</b>

We've got you covered! <br/>
Watch the video tutorial below to see how to send your first message using <b>WAHA</b>

  <div class="d-flex justify-content-center my-4">
    <iframe
      width="100%" 
      height="315"
      src="https://www.youtube.com/embed/RFerMyAUPRg"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</div>


## Step 0. Requirements

WAHA works on top of **Docker**, that's the only think you'll need!
<div class="text-center">
   <img src='/logos/docker.svg' title='WhatsApp API' alt='logo' style='border-radius: 50%; width: 8rem'/>
</div>

👉 Please follow the
<a href="https://docs.docker.com/engine/install/" target="_blank">
    <b>Docker official guides to install it on Linux, Windows, and macOS</b>
</a>

{{< details "Why Docker?" >}}
Docker makes it easy to ship **all-in-one solution** with the runtime and dependencies. 
You don't have to worry about language-specific libraries or chrome installation.

Also, Docker makes installation and update processes so simple, just one command!
{{< /details >}}

## Step 1. Download image

Assuming you have installed [Docker](https://docs.docker.com/get-docker/), let's download the image.

Run the command below:

```bash
docker pull devlikeapro/waha
```

If you got the
[➕ WAHA Plus]({{< relref "/docs/how-to/waha-plus" >}})
, use the following commands:

```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus
docker logout
```

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right version.

#### ARM processors

If you're using ARM (like Apple M1/M2, Raspberry Pi etc.) - use following commands to download the image:
```bash
# Download the image
docker pull devlikeapro/waha:arm
# Rename it, so you can use devlikeapro/waha image in other place
docker tag devlikeapro/waha:arm devlikeapro/waha
```

If you got the
[➕ WAHA Plus]({{< relref "/docs/how-to/waha-plus" >}})
, use the following commands:

```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus:arm
docker logout

# Rename it, so you can use devlikeapro/waha image in other place
docker tag devlikeapro/waha-plus:arm devlikeapro/waha-plus
```

## Step 2. Run WAHA

Run WhatsApp HTTP API:

```bash
docker run -it --rm -p 3000:3000/tcp --name waha devlikeapro/waha

# It prints logs and the last line must be
# WhatsApp API is running on: http://[::1]:3000
```

👉 Now, open [📊 Dashboard]({{< relref "/docs/how-to/dashboard" >}}) at
<a href="http://localhost:3000/dashboard" target="_blank">
<b>http://localhost:3000/dashboard</b>
</a>

You'll see WAHA Dashboard:

![Dashboard](dashboard.png)

## Step 3. Start a new session

To start a new session you should have your mobile phone with installed **WhatsApp application** close to you.

Here is the 
<a href="https://faq.whatsapp.com/381777293328336/?helpref=hc_fnav" target="_blank">
official instruction on WhatsApp site
</a>
on how to log in.

Now you start **default** session (current status should be `STOPPED`).

You can leave all configuration parameters by default:
![alt](dashboard-start-session.png)

## Step 4. Get and scan QR

Wait until the session status is `SCAN_QR` and click on "camera" icon:
<br>
![alt](dashboard-qr.png)
👉 If instead of QR you see **Click to reload QR** - **stop** the session and **start** it again.

<br>

You'll see QR code from WhatsApp Web app, now get **your phone** with installed WhatsApp application and **scan the QR**:
![alt](whatsapp-link-devices.jpeg)

The session status will move to `WORKING` status:
![alt](dashboard-working.png)

## Step 5. Send a text message

Now we're ready to send first messages to WhatsApp via API!

Replace `123123` with **your phone number without +**, but keep `@c.us` part:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/sendText' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "chatId": "123123@c.us",
  "text": "Hi there!",
  "session": "default"
}'
```

As alternative to `curl`, you can use [**📚 Swagger**]({{< relref "/docs/how-to/swagger" >}}) for that.

Open Swagger at
<a href="http://localhost:3000/#/chatting" target="_blank">
<b>http://localhost:3000/#/chatting</b>
</a>, scroll down to **chatting** section.

- Find `POST /api/sendText` endpoint and expand it
- Click **Try it out**
- Replace `123123@c.us` with **your phone number without +**, but keep `@c.us` part
- Click **Execute**

![alt](swagger-send-text.png)

## What's next?

{{< include file="content/docs/overview/quick-start/links.md" >}}
