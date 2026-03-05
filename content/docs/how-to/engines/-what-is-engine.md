<div></div>
{{< callout context="tip" title="What is Engine?" icon="outline/article" >}}
**WAHA** is a Node.js application that acts as a unified "glue layer" on top of multiple community-driven WhatsApp engines.

Under the hood, each engine is an independent open-source library that handles the actual WhatsApp communication:
- **WEBJS** and **WPP** use a **real browser** (Chromium or Chrome) via Puppeteer
- **NOWEB** communicates directly over **WebSocket** using a **Node.js/TypeScript** 
- **GOWS** communicates directly over **WebSocket** using a **Golang** library

WAHA wraps all of them behind **one consistent REST API and webhook interface**, so you can switch engines with a single environment variable change and minimal code adjustments on your side.

If something doesn't work in one engine — just try another one!

{{< /callout >}}

{{< callout context="caution" icon="outline/info-circle" >}}
**API responses** and **webhook payloads** may differ significantly, **test your system before changing the engine**!
{{< /callout >}}



