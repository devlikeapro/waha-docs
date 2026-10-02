---
title: "WAHA 2026.9 - Extend WAHA, Phone Numbers Apps"
description: "WAHA 2026.9 - Extend WAHA, Phone Numbers Apps and more!"
excerpt: "WAHA 2026.9 - Extend WAHA, Phone Numbers Apps and more!"
date: 2026-10-02T00:00:00+00:00
draft: false
images: [ "waha-2026-9.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-9
---

## 🛠️ Extend WAHA

Need something **WAHA** doesn't do out of the box - an integration, a country-specific quirk, a metric,
a tweak in how messages flow? You don't need to fork it.

**WAHA** has four extension layers - pick the **highest one that fits**, and your change stays small and easy to review:

- [**🧩 Apps**]({{< relref "/docs/how-to/development#-apps" >}}) - new functionality attached **per session**, with its own config, API and tables - like [**🧩 ChatWoot**]({{< relref "/docs/apps/chatwoot" >}}).
- [**📦 Modules**]({{< relref "/docs/how-to/development#-modules" >}}) - a **product-wide** capability switched on by env variables - like Prometheus metrics.
- [**🔌 Plugins**]({{< relref "/docs/how-to/development#-plugins" >}}) - a low-level hook into a session's events and requests - a few lines of code.
- [**🏭 Engines**]({{< relref "/docs/how-to/development#-engines" >}}) - the last resort - core WhatsApp features and engine fixes.

The guide walks through the same tiny **Message Logger** feature at every layer - real code, folder structure,
where to register it, how to add the Dashboard form - and lists existing apps and modules to copy from, simplest first.

Keep your changes inside an app, a module or a plugin, send a PR - it gets reviewed fast and is likely to be accepted.

Read more: [**🛠️ Development**]({{< relref "/docs/how-to/development#extending-waha" >}})

## 🧩 Apps: Phone Numbers

Here's what an app looks like in practice.

WhatsApp may know a number in a **different form** than the one you send to -
a mobile prefix that's required or not (🇦🇷 `54...` vs `549...`, 🇲🇽 `52...` vs `521...`), an extra digit (🇧🇷 the 9th one) -
and the message goes nowhere.

The new **Phone Numbers** app resolves the number to the chat id WhatsApp knows **before sending** - for **any country**.
For numbers that may exist in more than one form, add **regexp rules** right in the app config - no code:

```http request
POST /api/apps
```

```jsonc { title="Body" }
{
  "app": "phone-numbers",
  "session": "default",
  "config": {
    "rules": [
      // Mexico - accounts registered before 2019 still have the "1" after the country code
      { "regexp": "^52([2-9]\\d{9})$", "replace": "521$1" },
      { "regexp": "^521(\\d{10})$", "replace": "52$1" }
    ]
  }
}
```

The first matching rule wins, no rules - every number is resolved.
Resolutions are cached in memory and in the database, and there's a cache API to inspect and purge them.

Don't want to write rules? There are ready-made apps with the country logic included:
- [**🇧🇷 Phone Numbers: Brazil**]({{< relref "/docs/apps/brazilian-phone-numbers" >}})
- [**🇦🇷 Phone Numbers: Argentina**]({{< relref "/docs/apps/argentine-phone-numbers" >}}) - thanks to [ropu](https://github.com/ropu)! — [#2260](https://github.com/devlikeapro/waha/pull/2260)
- [**🇲🇽 Phone Numbers: Mexico**]({{< relref "/docs/apps/mexican-phone-numbers" >}})

Each one is the **Phone Numbers** app plus its rules - a few dozen lines on top of the base app.
If your country has the same problem - that's the template to copy.

Read more: [**📱 Phone Numbers**]({{< relref "/docs/apps/phone-numbers" >}})

## 🆕 Changelog

Check out the full list of updates in the [**🆕 WAHA 2026.9 Changelog**]({{< relref "/docs/overview/changelog#20269" >}}) and stay tuned for more!
