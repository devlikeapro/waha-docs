---
title: "🚨 WAHA Security Alert"
description: "🚨 WAHA Security Alert - check your API Key if your API is public!"
excerpt: "🚨 WAHA Security Alert - check your API Key if your API is public!"
date: 2025-04-29T08:48:45+00:00
draft: false
weight: 50
images: ["security-alert.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
slug: security-alert
---------------

## 🚨 WAHA Security Alert

We’ve recently seen a disturbing trend: users running WAHA with the **API publicly exposed** and **without any form of protection**. 

Unfortunately, a few of them learned the hard way — their sessions were compromised, and their accounts got hacked.

---

### ❗ What Happened?

Some WAHA users deployed the API and made it accessible over the internet — **but forgot to secure it**. No API keys. No reverse proxies. Just a raw, open API ready-to-take commands from anyone who knew the endpoint.

It didn’t take long for bots and malicious actors to find those ports. Once they did — they used sessions, hijacked WhatsApp accounts, sent spam messages.
<div style="width: 600px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="whatsapp-spam.png" alt="WhatsApp Spam" >}}
</div>
<br/>

⚠️ **This IS NOT just a theoretical risk**. We had multiple cases this month alone. If your API is open, **you are exposed**.


### 👥 Who Is Affected?

This vulnerability affects **anyone who is running WAHA or WAHA Plus** and:

* Exposes the `/api` port directly to the internet,
* Has **no API key** set in the `.env` or Docker environment,
* Don’t use HTTPS or any firewall/reverse proxy to restrict access.

This includes Docker deployments, VPS installs, even cloud setups that skip security steps.


### 🛠️ How to Fix It

{{< callout context="caution" title="Do not expose WhatsApp API on public networks!" icon="outline/shield-check" >}}
- Use at **least 64 symbols random string** as `WHATSAPP_API_KEY` string that contains letters (a-z, A-Z) and numbers (1-9)
- Read more [**🔒 Security**]({{< relref "/docs/how-to/security" >}})
{{< /callout >}}

Here's how you can immediately protect your setup:

1. **Use API Key Authentication**
   WAHA requires an `api_key` for all endpoints. Make sure you set and enforce it in your environment:

```bash
WHATSAPP_API_KEY=your_strong_key_here
```

2. **Don’t expose your API directly to the internet!**
   Keep it behind:

    * A VPN
    * A reverse proxy with authentication
    * A firewall that limits access to trusted IPs

3. **Enable HTTPS**
   Use Let's Encrypt or self-signed certificates to ensure traffic is encrypted.


### ❓ FAQ

#### 🔒 Changing ports will not save you!

Obscuring your API behind a “random” port like `39823`? Doesn’t matter. Bots scan all ports. If it’s open and unprotected — they’ll find it.

#### 🧱 I don't have WAHA Plus, how can I still be secure?

You still have options:

* **Do not expose the API port to the internet**
  Only bind the container to `localhost` or your internal network.

* **Use third-party software to protect your API**
  Tools like [Ngrok](/blog/waha-ngrok) can tunnel securely, and you can wrap requests with basic auth or tokens.

* **Use a firewall to restrict access**
  Restrict incoming traffic to your trusted IPs only. Tools like `ufw` or `iptables` can help with that.


### 🚨 Final Word

Leaving your API exposed is like leaving your house door wide open with a sign saying “not using locks.” WAHA gives you the tools to be secure. **Use them**.


----

**Stay safe 🛡️**
