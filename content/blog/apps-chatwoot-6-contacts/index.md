---
title: "WhatsApp + ChatWoot - Contacts"
description: "Run the WAHA contacts pull job from ChatWoot to import WhatsApp profiles, avatars, and attributes without overwriting data on the phone."
excerpt: "Launch the ChatWoot `contacts pull` command, fine-tune filters for groups and LIDs, control avatars and custom attributes, and monitor the BullMQ job until it completes."
date: 2025-10-29T08:48:45+00:00
draft: false
images: [ "cover.png" ]
categories: [ "ChatWoot", "Apps" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: apps-chatwoot-contacts
---

{{< include file="content/docs/apps/chatwoot/-disclaimer.md" >}}

{{< include file="content/docs/apps/chatwoot/-chatwoot-articles.md" >}}

## Overview
By default, when a new message comes from **WhatsApp** to **ChatWoot**, it creates a new contact if there isn't one yet.

![**ChatWoot** contact](contact-info.png)

Sometimes you want to have all your contacts in **ChatWoot** right away or pull new customers to run a campaign.
This is where `wa/contacts` commands come in handy!

## Contacts Actions
Three actions are available:

- `wa/contacts help` prints the full list of options.
- `wa/contacts status` shows the latest counters for the running or last finished job.
- `wa/contacts pull` starts a new import with default settings.

{{< include file="content/docs/apps/chatwoot/-command-prefix.md" >}}

## Contacts Sync

Use the `wa/contacts pull` command to **sync contacts from WhatsApp to ChatWoot**. It copies your **WhatsApp** contact list into a chosen **ChatWoot** inbox so agents see fresh names, avatars, and identifiers.

- It **only reads** from **WhatsApp**, so nothing changes on the phone and it **pull**s contacts rather than **sync**ing them.
- Each run updates existing profiles in **ChatWoot** and adds contacts you have not imported yet.


Open the **WhatsApp Integration** conversation inside **ChatWoot** (the same thread you use for other WAHA commands).

```bash
wa/contacts help
```

![ChatWoot help](commands-help.png)

Then run a simple contacts pull like this:

```bash
wa/contacts pull
```

**ChatWoot** replies that the job is queued and processes the contact list in the background.

<div class="text-center">
   <img src='cw-contacts-pull.png' alt="ChatWoot - contacts pull"/>
</div>


{{< callout context="caution" title="One pull per WAHA session" icon="outline/shield-check" >}}
Run a new `wa/contacts pull` only after the previous job for the same WAHA session has finished.
Other sessions can sync their own contacts at the same time, but overlapping pulls within one session cancel each other out.

Check the current status with `wa/contacts status`.
{{< /callout >}}

👇 Check [**Examples**](#examples) below for common use cases and advanced options.


## Use Canned Responses

{{< include file="content/docs/apps/chatwoot/-canned-responses.md" >}}


## Examples
### Refresh contact basics
Keep the defaults and let WAHA import everyone with missing profiles:

```bash
wa/contacts pull
```

### Update avatar
Ideal when you want the profile photos in **ChatWoot**:

```bash
wa/contacts pull --avatar
```

By default, it uses the `--avatar if-missing` option, so it only pulls avatars for contacts without photos in **ChatWoot**.

You can update avatars for all contacts by specifying the `--avatar update` flag:
```bash
wa/contacts pull --avatar update
```


{{< callout context="note" title="Keep an eye on avatars" icon="outline/info-circle" >}}
Refreshing avatars can trigger some backoff mechanisms on the WhatsApp side, especially if you have many contacts with profile photos.

The `--avatar if-missing` setting is the safest option to avoid issues.

{{< /callout >}}

### Include groups and hidden numbers
Bring in **WhatsApp** groups and LID contacts (users who hide their phone number) in the same run:

```bash
wa/contacts pull --groups --lids --avatar
```

### Full options
This command shows every available flag, but use `wa/contacts help` to explore all latest options.

Adjust the numbers to match your environment:

```bash
wa/contacts pull
  --avatar if-missing
  --groups
  --lids
  --no-attributes
  --batch 50
  --progress 50
  --delay-contact 250ms
  --delay-batch 2s
  --attempts 8
  --timeout 15m
```

---

```bash
wa/contacts pull --help
```

👤 Run `contacts pull` to launch a sync or `contacts status` to inspect progress.

Send a command to the conversation in the format:
**contacts \[options\]**

**Arguments:**

-   **action** `start` to launch a contact pull or `status` to inspect the active job. (choices: “pull”, “status”, “help”)

**Options:**

-   `-a, --avatar <mode>` Choose how to pull avatars for contacts. (choices: “if-missing”, “update”)
-   `-g, --groups` Include WhatsApp group contacts in the sync.
-   `-l, --lids` Include WhatsApp LID contacts (anonymous contacts) in the sync.
-   `--na, --no-attributes` Do not pull contact attributes if contact already exists (it speeds up the process).
-   `-b, --batch <number>` Number of contacts to pull in each batch. (default: 100)
-   `-p, --progress [number]` Report progress every N contacts. Set to 0 to disable progress reports. (default: 100)
-   `--at, --attempts <number>` Number of times to retry the job before marking it as failed. (default: 6)
-   `-t, --timeout <duration>` Maximum time the job is allowed to run before it is retried (supports values like `30s`, `5m`, `1h`). (default: 600000)
-   `--dc, --delay-contact <duration>` Delay between syncing each contact to avoid rate limiting in pulling avatars. (default: 0.1s)
-   `--db, --delay-batch <duration>` Delay between batches of contacts. (default: 1s)
-   `-h, --help` display help for command


---
