---
title: "WhatsApp + ChatWoot - Messages"
description: "Pull WhatsApp history into ChatWoot with WAHA: control duration windows, pause queues, and auto-resolve conversations."
excerpt: "Pull WhatsApp history into ChatWoot with WAHA, manage duration windows, pause queues, and auto-resolve conversations."
date: 2025-10-30T08:48:45+00:00
draft: false
images: [ "cover.png" ]
categories: [ "ChatWoot", "Apps" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: apps-chatwoot-messages
---

{{< include file="content/docs/apps/chatwoot/-disclaimer.md" >}}

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}
## Overview

ChatWoot automatically creates conversations when new WhatsApp messages arrive.
![text messages](text.png)

WAHA adds the `wa/messages` commands so you can **import older history**.
Use them to copy past chats, check imports, or fix sync issues without leaving the integration inbox.

{{< callout context="caution" title="ChatWoot Rate Limit Configuration" icon="outline/bolt" >}}
By default, **ChatWoot** set API and new message rate limits that are **too low for history imports**.

Set these variables in your **ChatWoot** deployment (for example in `.env`, Docker Compose, or Helm values) so WAHA can send
many messages without hitting rate limits:

```bash {title=".chatwoot.env"}
CONVERSATION_MESSAGE_PER_MINUTE_LIMIT=3000
RACK_ATTACK_LIMIT=30000
# OR
RACK_ATTACK_ALLOWED_IPS={your.waha.ip.address1}
```

👉 Without them, large history pulls often return ChatWoot API rate-limit errors (check [**FAQ**](#faq) section for details).
{{< /callout >}}

## Messages Actions

Three actions are available:

- `wa/messages help` prints the full list of options.
- `wa/messages status` reports the progress of the active or last finished pull job.
- `wa/messages pull` starts a new history import.

{{< include file="content/docs/apps/chatwoot/-command-prefix.md" >}}

## Pull WhatsApp Messages

Run in the **WhatsApp Integration** conversation or **Customer Conversation** to copy messages from WhatsApp into your ChatWoot
inbox.

```bash {title="Command Help"}
wa/messages help
```

```bash {title="Start Pull"}
wa/messages pull
```

- Each pull reads from **WhatsApp** and stores the messages in **ChatWoot**.
- You control how far back WAHA looks by adding optional **duration** arguments.

The logic for message pull depends on **conversation** in ChatWoot:
- If it's **WhatsApp Integration** conversation, WAHA pulls messages for **all contacts** in the selected inbox.
- If it's a **Customer Conversation**, WAHA pulls messages only for **the contact linked to that**

You can start playing with **Customer Conversations** to backfill history for specific users without affecting others.

```bash {title="Pull 1 Day With Media"}
wa/messages pull 1d --force --media
```

Use `wa/messages status` to check that the pull is running, review counters, and read any warnings returned by WhatsApp.

## Duration Explained
```bash {title="Duration Syntax"}
wa/messages pull [start] [end]
```

The commands accept simple relative values such as `1d`, `12h`, or `30m`.

WAHA sorts the two numbers so the earliest value becomes the start of the window and the latest value becomes the end.

![Duration explained](duration-explained.png)

- `wa/messages pull` (or `wa/messages pull 1d 0d`) uses the default **1d | 0d** window. In the example above, we ran the
  command on **31 Oct at 14:00**, so WAHA pulled everything from **30 Oct 14:00** up to the command time.
```bash {title="Default Window"}
wa/messages pull 
# The same as 
wa/messages pull 1d
# The same as 
wa/messages pull 1d 0d
```

- `wa/messages pull 10d 0d` collects the last **10 days** while keeping the end at “now”.
```bash {title="Ten Day Window"}
wa/messages pull 10d
# The same as 
wa/messages pull 10d 0d
```
- `wa/messages pull 20d 10d` covers the range between **20 and 10 days ago**, so you can restore older history in batches.
```bash {title="Batch Pull Sequence"}
#
# Send below commands ONE BY ONE
#
wa/messages pull 30d 20d
wa/messages pull 20d 10d
wa/messages pull 10d 0d # You can omit the last 0d
```

You can mix units (`7d`, `6h`, `15m`) and WAHA converts them to milliseconds automatically.

⚠️ `6m` means **6 minutes**, not **6 months**. Use `180d` for approximately 6 months.

## Use Canned Responses

{{< include file="content/docs/apps/chatwoot/-canned-responses.md" >}}

## Examples

### Pull the last 24 hours

Keep the defaults to backfill the recent timeline:

```bash {title="Default Pull"}
wa/messages pull
```

if you wanna rebuild the whole 1 days conversation **in the chat** you can do:

```bash {title="Force 1 Day"}
wa/messages pull 1d --force
```

or include **media files** as well

```bash {title="Force 1 Day With Media"}
wa/messages pull 1d --force --media
```

### Rebuild the last 10 days

Grab a broader range while still ending at the current moment:

```bash {title="Ten Day Pull"}
wa/messages pull 10d # --force
```

### Import an older slice only

Backfill past interactions without rewriting newer chats:

```bash {title="Segmented Pull Sequence"}
#
# Send below commands ONE BY ONE
#
wa/messages pull 30d 20d
wa/messages pull 20d 10d
wa/messages pull 10d 0d
```

### Pause new messages while pulling history

When you import **big history chunks**, and a new message arrives, WAHA creates it immediately in **ChatWoot**,
so you can end up with **mixed old and new messages** in the same conversation.

For **import big history** case (especially for **the first new inbox import**), 
you can stop the queues before starting the pull and restart them after it finishes.

{{< callout context="danger" title="Queue Pause Affects All Sessions" icon="outline/shield-check" >}}

- Pausing the queues affects **ALL WhatsApp sessions** connected to the same **WAHA** worker instance
  and **ChatWoot** inbox (to be precise, all **WAHA** connected to the same **Redis**)
- If `messages pull ... --pause` **fails**, you **must manually restart the queues** with `wa/queue start`. You can check the
  current status with `wa/queue status`.

{{< /callout >}}

```bash {title="Manual Pause Example"}
#
# Send below commands ONE BY ONE
#
wa/queue stop
wa/queue status

wa/messages pull 1y --rc

wa/queue start
wa/queue status
```

The same pause can be automated in one step with:

```bash {title="Auto Pause"}
wa/messages pull 1y --rc --pause
```

`--pause` adds the pull to the queue in a paused state and resumes the queues automatically after it completes.


### Resolve conversations after import

Close conversations once their history is restored so agents can focus on new tickets:

```bash {title="Auto Resolve"}
wa/messages pull --resolve-conversations
```

`--rc` is a shorthand for the same option.

### Include Media
By default, WAHA only pulls text messages to speed up the process.

You can include media attachments with `--media` flag:

```bash {title="Include Media"}
wa/messages pull --media
```

### Pull Other Chats
By default, WAHA only pulls messages from **direct chats (1:1)**.

You can include groups, channels, status replies, and broadcast lists with these flags:

```bash {title="Include Other Chats"}
wa/messages pull --groups --channels --status --broadcast
```

You can also exclude direct messages with `--no-dm` flag:

```bash {title="Groups Only"}
wa/messages pull --no-dm --groups
```

### Full options

Adjust the values to fit your environment and run `wa/messages help` to see current defaults from your build:

```bash {title="Full Options"}
wa/messages pull
  --chat all
  --force
  --no-dm
  --groups
  --channels
  --status
  --broadcast
  --media
  --pause
  --resolve-conversations
  --batch 100
  --progress 100
  --attempts 6
  --timeout 10m
  --timeout-media 30s
```

## FAQ

----

❓ Question: I'm getting "Too many messages" in the ChatWoot API response when pulling history

💬 Answer: Increase `CONVERSATION_MESSAGE_PER_MINUTE_LIMIT` to at least `3000` (or higher for very large imports) so ChatWoot
accepts the many messages WAHA sends during a pull.

----

❓ Question: I'm getting "HTTP 429 Too Many Requests" from the ChatWoot API

💬 Answer: Raise `RACK_ATTACK_LIMIT` to `30000` or add your WAHA servers to
`RACK_ATTACK_ALLOWED_IPS={your.waha.ip.address1},{your.waha.ip.address2}` to let the import traffic bypass rate
limiting.

----
