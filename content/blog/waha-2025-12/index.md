---
title: "WAHA 2025.12 - Custom Device Names, Calls Automation"
description: "Custom device names for Linked Devices, the Calls app for auto-reject and auto-reply, and a smoother calls API flow in WAHA 2025.12."
excerpt: "Set custom device names, automate call handling with the Calls app, and control call rejections through the API in WAHA 2025.12."
date: 2025-12-29T08:48:45+00:00
draft: false
images: [ "waha-2025-12.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2025-12
---

## 🏷️ Custom Device Name
You can now label a session so it shows up with a friendly name under **WhatsApp → Linked Devices**. Configure the `deviceName` once and keep your fleet easy to identify.

<div class="text-center">

![](device-name.png)

</div>

See the full setup flow in [**🖥️ Sessions – Device name**]({{< relref "/docs/how-to/sessions#device-name" >}}). Custom names apply to the QR flow, so keep pairing codes reserved for default names.

## 📞 Calls App – Auto Reject + Auto Reply
Enable the built-in [**📞 Calls App**]({{< relref "/docs/apps/calls" >}}) to automatically reject incoming calls and reply with a clear message that guides users to text or voice.

<div class="text-center">

![](calls.png)

</div>

## 🧪 Calls API – Reject Programmatically
If you want full control, the Calls API lets you reject calls on demand. Use the `call.received` event to grab the IDs, then respond with:

```http request
POST /api/{session}/calls/reject
```

Details and events are in [**📞 Calls**]({{< relref "/docs/how-to/calls#reject-call" >}}).

## 🛠️ Other Fixes + Read More
As always, December ships with stability updates across engines and small quality-of-life improvements.

Read every change with issue links in the [**🆕 WAHA 2025.12 Changelog**]({{< relref "/docs/overview/changelog#202512" >}}).
