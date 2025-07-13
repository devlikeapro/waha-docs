---
title: "WAHA 2025.3"
description: "WAHA 2025.3 - GOWS 1.0, NOWEB stability, and More!"
excerpt: "WAHA 2025.3 - GOWS 1.0, NOWEB stability, and More!"
date: 2025-03-26T08:48:45+00:00
draft: false
images: [ "waha-2025-3.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2025-3
---

We’re excited to roll out [**WAHA 2025.3**]({{< relref "/docs/overview/changelog#202503" >}})!

## GOWS 1.0 

[**GOWS Engine**]({{< relref "/docs/how-to/engines#gows" >}}) just got its **1.0** moment!

Here’s what’s new:
- Enable Link Previews - {{< issue 763 >}}
- Delete Status Message - {{< issue 754  >}}
- Delete Message - {{< issue 796  >}}
- Edit Message - {{< issue 797  >}}
- Reply To Message - {{< issue 799  >}}
- Add `filename` on `/api/sendFile` - {{< issue 853 >}}
- Extract `replyTo` - {{< issue 876 >}}

## NOWEB Stability
If you faced any issues with the NOWEB engine, like
{{< issue 821 >}}, {{< issue 860 >}}, {{< issue 869 >}}
we have fixed them in this release!

No more container restarts due to Out of Memory errors and sessions restarts!

## Status to 50K Contacts

You can now send [**WhatsApp Status updates to up to 50,000 contacts**]({{< relref "/docs/how-to/status" >}}) at once!

Need more control?

👉 Use the guide: [**Send Status to 10K Contacts Manually**]({{< relref "/docs/how-to/status#send-status-to-10k-contacts-manually" >}})

## Disappearing Messages

Under the hood, WAHA now supports for WhatsApp! {{< issue 736 >}}


## Full Changelog

Catch all the updates and minor releases in the [**🆕 2025.3 Changelog**]({{< relref "/docs/overview/changelog#202503" >}})

---

Thanks for being part of WAHA community! 🙌