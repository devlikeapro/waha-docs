---
title : "➕ WAHA Plus"
description: "WAHA Plus is now part of WAHA Core - all features are free and available for everyone."
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 900
images: [ "patron-portal.png"]
slug: waha-plus
aliases:
  - /docs/how-to/plus-version
---

{{< callout context="tip" icon="outline/info-circle" >}}
**WAHA Plus is now part of WAHA Core.**

Starting from version **2026.5.2**, all features that used to be in **WAHA Plus**
(unlimited sessions, multimedia messages, all storages, built-in security, and more)
are available in **WAHA Core** - 100% free and open source, for everyone.

There's no separate Plus image anymore - just use `devlikeapro/waha`.

👉 See [**🎁 Support Us**](/support-us) if you'd like to support the project.
{{< /callout >}}

## Support the project

**WAHA** is free, but building and maintaining it takes a lot of time and effort.
If **WAHA** helps you, please consider supporting it on the
[**🎁 Support Us**](/support-us) page.

There's a single **Community** tier - nothing extra in return, everything is **FREE**
and available for everyone. This tier offers no perks, just a way to support the work.
It's the **community** that made this project possible in the first place, and your
contribution is what keeps it alive and growing 🌱 🫶🏻

## History

{{< details "**WAHA Core vs WAHA Plus (before 2026.5.2)**" >}}

Previously **WAHA** was distributed in two versions:

1. **WAHA Core** - the basic version that meet almost 80% people’s needs. 100% free and open source.
2. **WAHA Plus** - the version with advanced messages, security, and reliability features,
   available through donations.

Since version **2026.5.2** this split is gone - everything is part of **WAHA Core**.

Patrons used to download the Plus image from the **Patron Portal**:

```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus
docker logout
```

This is no longer needed - just pull the public `devlikeapro/waha` image.

{{< /details >}}
