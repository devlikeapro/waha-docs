---
title: "📅 Event Message"
description: "Event Message"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 293
slug: event-message
images: [ "whatsapp-event-message.jpg"]
---
You can **send Event Message** and **receive responses** in WhatsApp using API .

Remind clients about their appointments natively:
<div style="width: 500px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="whatsapp-event-message.jpg" alt="WhatsApp Event Message" >}}
</div>


## Features
Here's the list of features that are available by [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}):

{{< include file="content/docs/how-to/event-message/features.md" >}}
{{< include file="content/docs/how-to/event-message/features-events.md" >}}

## API

### Send Event Message
```http request
POST /api/{SESSION}/events
```

```jsonc { title="Body" }
{
  "chatId": "123123@c.us",
  "reply_to": null,
  "event": {
    "name": "John's Nail Appointment 💅",
    "description": "It's time for your nail care session! 🌟\\n\\nYou'll be getting a *classic gel manicure* – clean, polished, and long-lasting. 💖\\n\\n📍 *Location:* Luxe Nail Studio\\nWe're on the *2nd floor of the Plaza Mall*, next to the flower shop. Look for the *pink neon sign*!\\n\\nFeel free to arrive *5–10 mins early* so we can get started on time 😊",
    "startTime": 2063137000,
    "endTime": null,
    "location": {
      "name": "Luxe Nail Studio 💅"
    },
    "extraGuestsAllowed": false
  }
}
```

Fields:
- `chatId` - The WhatsApp ID of the chat where you want to send the event message (e.g., "123123@c.us")
- `event` - Object containing event details:
  - `name` - The title of the event
  - `description` - Detailed description of the event (supports formatting with \n for newlines and * for bold text)
  - `startTime` - Event start time in Unix timestamp format (**seconds** since epoch)
  - `endTime` - Event end time in Unix timestamp format (optional, can be null)
  - `location` - (Optional) Object containing location details 
    - `name` - Name of the location
  - `extraGuestsAllowed` - indicating whether additional guests are allowed (true/false)
- `reply_to` - Message ID to reply to (optional, can be null)


## Events
Receive responses for your event using events!

{{< include file="content/docs/how-to/event-message/features-events.md" >}}

<div style="width: 500px; max-width: 100%; margin: 0 auto;">
{{< img lqip="21x webp q20" src="whatsapp-event-response.jpg" alt="WhatsApp Event Message" >}}
</div>


### event.response

{{< include file="content/docs/how-to/event-message/events-event-response.md" >}}

### event.response.failed

{{< include file="content/docs/how-to/event-message/events-event-response-failed.md" >}}
