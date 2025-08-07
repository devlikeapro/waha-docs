---
title: "📚 Swagger (OpenAPI)"
description: "Swagger (OpenAPI) documentation"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 203
images: ["swagger.png"]
slug: swagger
---

## Overview

The project provides HTTP API (REST), which is documented with OpenAPI specification and Swagger UI.

<video autoplay loop muted playsinline controls='noremoteplayback' width="100%" poster='/images/swagger.png'>
  <source src="/videos/swagger-overview.webm" type="video/webm" />
  Download the <a href="/videos/swagger-overview.webm">Swagger Overview video</a> .
</video>

You can see all available endpoints, request/response examples, and even execute them directly from the Swagger UI.

Find the latest versions:

- [Swagger documentation ->](/swagger)
- [Postman ->](https://www.postman.com/devlikeapro/workspace/waha/collection/35390377-42210829-5a92-45c5-a001-6a453c5d764a?action=share&creator=35390377)
- [OpenAPI specification ->](/swagger/openapi.json)

You can find Swagger documentation on the following url after you
[install and started]( {{< relref "/docs/how-to/install" >}}) it:

- Swagger: [http://localhost:3000](http://localhost:3000).
- OpenAPI: [http://localhost:3000/-json](http://localhost:3000/-json).

## Configuration

- `WHATSAPP_SWAGGER_CONFIG_ADVANCED=true` - enables advanced configuration options for Swagger documentation - you can customize host, port and base URL for the requests.
  Disabled by default.
- `WHATSAPP_SWAGGER_ENABLED=false` - disables Swagger documentation. Enabled by default. Available in **WAHA Plus** only.
- `WHATSAPP_SWAGGER_USERNAME=admin` and `WHATSAPP_SWAGGER_PASSWORD=admin` - these variables can be used to protect the Swagger panel
  with `admin / admin` credentials. This does not affect API access. Available in **WAHA Plus** only.

Read more about security settings for Swagger and API on [**Security page** ->]({{< relref "/docs/how-to/security" >}}).

### White label

You can show your own brand in the Swagger documentation.

<img src="swagger-white-label.png" onclick="window.open(this.src)" style="cursor: pointer;">
<br/>
<br/>

👉 Swagger White Label is available in [**WAHA Plus**]({{< relref "waha-plus#plus" >}}) version only.

Use the following environment variables to customize the Swagger documentation:

- `WHATSAPP_SWAGGER_TITLE` - the title of the Swagger documentation and some other places.
- `WHATSAPP_SWAGGER_DESCRIPTION` - Markdown formatted description of your API.
- `WHATSAPP_SWAGGER_EXTERNAL_DOC_URL` - URL to the external documentation.
- `WHATSAPP_SWAGGER_VIDEO_EXAMPLE_URL` - link to the video example `https://github.com/devlikeapro/waha/raw/core/examples/video.mp4`
- `WHATSAPP_SWAGGER_OPUS_EXAMPLE_URL` - link to the opus example `https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.opus`
- `WHATSAPP_SWAGGER_JPG_EXAMPLE_URL` - link to the jpg example `https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg`

**Example** (consider using [docker-compose](https://github.com/devlikeapro/waha/blob/core/docker-compose.yaml#L15-L38) or other methods to store these settings):

```bash
docker run -it -p 3000:3000 -e WHATSAPP_SWAGGER_TITLE="AwesomeCRM" -e 'WHATSAPP_SWAGGER_DESCRIPTION=<p>FantasticFindz - Discover unique treasures from around the world at unbelievable prices!<br/> <a href='https://google.com'>Read more about us!</a></p>' -e "WHATSAPP_SWAGGER_EXTERNAL_DOC_URL=https://google.com" devlikeapro/waha-plus
```
