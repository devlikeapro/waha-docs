---
title: "WAHA 2024.5 - Swagger White Label and stability improvements"
description: "WAHA 2024.5 has been released with Swagger White Label and stability improvements!"
excerpt: "WAHA 2024.5 has been released with Swagger White Label and stability improvements!"
date: 2024-05-30T08:48:45+00:00
draft: false
weight: 50
images: ["WAHA 2024.5.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
---

We are excited to announce the release of **WAHA 2024.5**! 
This version introduces the [Swagger White Label]({{< relref "/docs/how-to/swagger#white-label" >}})
feature and includes several stability improvements.

Check the [Changelog]({{< relref "/docs/overview/changelog#20245" >}}) for a full list of changes.

# 🌟 NEW - Swagger White Label

👉 Swagger White Label is available in [**WAHA Plus**]({{< relref "plus-version#plus" >}}) version only.

If you're running SaaS or want to show your brand in the Swagger documentation,
you can now customize the Swagger documentation with your own brand!

![Swagger White Label](swagger-white-label.png)

Use the following environment variables to customize the Swagger documentation:
- `WHATSAPP_SWAGGER_TITLE` - the title of the Swagger documentation and some other places.
- `WHATSAPP_SWAGGER_DESCRIPTION` - Markdown formatted description of your API.
- `WHATSAPP_SWAGGER_EXTERNAL_DOC_URL` - URL to the external documentation.

**Example** (consider using [docker-compose](https://github.com/devlikeapro/waha/blob/core/docker-compose.yaml#L15-L38) or other methods to store these settings):
```bash
docker run -it -p 3000:3000 -e WHATSAPP_SWAGGER_TITLE="AwesomeCRM" -e 'WHATSAPP_SWAGGER_DESCRIPTION=<p>FantasticFindz - Discover unique treasures from around the world at unbelievable prices!<br/> <a href='https://google.com'>Read more about us!</a></p>' -e "WHATSAPP_SWAGGER_EXTERNAL_DOC_URL=https://google.com" devlikeapro/waha-plus
```

# 🛠️ Stability Improvements
We've made several stability improvements to WEBJS and NOWEB engines, check the 
[Changelog]({{< relref "/docs/overview/changelog#20245" >}}) for more details.

# Thank you for your support!
We appreciate your [continued support](/pricing) and enthusiasm for the project!
