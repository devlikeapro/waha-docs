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
On this page, you're going to install and run WAHA,
authenticate the client using a QR code,
and send **your first message** to WhatsApp using the API!

We will guide you through the necessary steps to successfully send your first text message using the WhatsApp API.

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

WAHA works on top of **Docker**, that's the only thing you'll need!
<div class="text-center">
   <img src='/logos/docker.svg' title='WhatsApp API' alt='logo' style='border-radius: 50%; width: 8rem'/>
</div>

👉 Please follow the
<a href="https://docs.docker.com/engine/install/" target="_blank">
    <b>Docker official guides to install it on Linux, Windows, and macOS</b>
</a>

{{< details "Why Docker?" >}}
Docker makes it easy to ship an **all-in-one solution** with the runtime and dependencies. 
You don't have to worry about language-specific libraries or Chrome installation.

Also, Docker makes installation and update processes so simple, just one command!
{{< /details >}}

## Step 1. Download image

Assuming you have installed [Docker](https://docs.docker.com/get-docker/), let's download the image!
Follow the instructions below:

{{< include file="content/docs/how-to/install/download-image.md" >}}

## Step 2. Run WAHA

Run WhatsApp HTTP API:

```bash
docker run -it -v $(pwd)/sessions:/app/.sessions --rm -p 3000:3000 --name waha devlikeapro/waha

# It prints logs and the last line must be
# WhatsApp API is running on: http://[::1]:3000
```

{{< callout context="danger" title="Not a Production-Ready Installation!" icon="outline/shield-check" >}}
☝️ The above command is meant only for **initial testing**, not for production use.

Please follow the [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) guide to set up a secure WAHA instance
after you finish the quick start guide.

{{< /callout >}}

👉 Now, open the [📊 Dashboard]({{< relref "/docs/how-to/dashboard" >}}) at
<a href="http://localhost:3000/dashboard" target="_blank">
<b>http://localhost:3000/dashboard</b>
</a>

You'll see the WAHA Dashboard:

![Dashboard](dashboard.png)

## Step 3. Start a new session

To start a new session, you should have your mobile phone with the **WhatsApp application** installed close to you.

Here is the 
<a href="https://faq.whatsapp.com/381777293328336/?helpref=hc_fnav" target="_blank">
official instruction on WhatsApp site
</a>
on how to log in.

Now you can start the **default** session (current status should be `STOPPED`).

You can leave all configuration parameters as default:
![alt](dashboard-start-session.png)

## Step 4. Get and scan QR

Wait until the session status is `SCAN_QR` and click on the "camera" icon:
<br>
![alt](dashboard-qr.png)
👉 If instead of the QR you see **Click to reload QR** - **stop** the session and **start** it again.

<br>

You'll see the QR code from the WhatsApp Web app. Now get **your phone** with the WhatsApp application installed and **scan the QR**:
![alt](whatsapp-link-devices.jpeg)

The session status will move to `WORKING` status:
![alt](dashboard-working.png)

## Step 5. Send a text message

Now we're ready to send the first messages to WhatsApp via the API!

Replace `123123` with **your phone number without +**, but keep the `@c.us` part:
{{< tabs "send-text-message" >}}

{{< tab "curl" >}}
```sh
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
{{< /tab >}}

{{< tab "JavaScript" >}}
```js
fetch('http://localhost:3000/api/sendText', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    chatId: "123123@c.us",
    text: "Hi there!",
    session: "default"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/sendText"
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
data = {
    "chatId": "123123@c.us",
    "text": "Hi there!",
    "session": "default"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< /tabs >}}

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

{{< include file="content/docs/how-to/install/-the-hosting.md" >}}

{{< callout context="tip" icon="outline/robot" title="Build Fast" >}}
Ask [**🤖 WAHA GPT**]({{< relref "/gpt" >}}) to help you build **{python|js|php}** code!
{{< /callout >}}

{{< include file="content/docs/overview/quick-start/links.md" >}}
