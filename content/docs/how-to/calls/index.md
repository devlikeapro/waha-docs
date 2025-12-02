---
title: "📞 Calls"
description: "Calls"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 293
slug: calls
images: [ "whatsapp-phone-call.png" ]
---
You can receive events about calls in WhatsApp using API!

<div style="width: 300px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="whatsapp-calls.png" alt="WhatsApp Calls" >}}
</div>

## Features
Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/calls/features-api.md" >}}

{{< include file="content/docs/how-to/calls/features-events.md" >}}

## API

### Reject Call
Decline an incoming call using its **call id** and **chat id** from the [`call.received`](#callreceived) event.

```http request
POST /api/{session}/calls/reject
```

```jsonc { title="Body" }
{
  "from": "22222222222@c.us",
  "id": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
}
```

👉 Available on **WEBJS, GOWS, NOWEB**

WAHA emits [`call.rejected`](#callrejected) after the call is declined.

## Events
Read more about 
[**🔄 Events**]({{< relref "/docs/how-to/events" >}}).

### call.received

{{< include file="content/docs/how-to/calls/webhooks-call-received.md" >}}

### call.accepted

{{< include file="content/docs/how-to/calls/webhooks-call-accepted.md" >}}

### call.rejected

{{< include file="content/docs/how-to/calls/webhooks-call-rejected.md" >}}
