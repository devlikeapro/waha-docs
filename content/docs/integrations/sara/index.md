---
title: "SARA"
description: "SARA WhatsApp AI Agent Integration"
lead: "SARA WhatsApp AI Agent Integration"
date: 2026-08-13T00:00:00+00:00
draft: false
weight: 920
toc: true
---

## What is SARA?

**SARA** (Smart Automated Response Agent) is an open-source, self-hosted WhatsApp AI agent licensed under **AGPL-3.0**.
It provides multi-tenant conversational AI over WhatsApp, with support for:

- **20+ industry verticals** (hospitality, retail, real estate, legal, medical, and more)
- **Multi-session management** — each tenant gets an isolated WhatsApp session
- **Tool calling / function dispatch** — 30+ built-in handlers (appointments, orders, FAQs, lead capture, etc.)
- **White-label support** — custom branding per tenant
- **Multi-language responses** — automatic language detection and reply
- **Dream Cycle** — background knowledge consolidation loop

Source code and full documentation: [https://github.com/Alessandro114/sara](https://github.com/Alessandro114/sara)

---

## How SARA integrates with WAHA

SARA uses **WAHA** as its WhatsApp transport layer.
All inbound and outbound messages are routed through the WAHA HTTP API, which means SARA never manages the WhatsApp connection directly — WAHA does.

Key integration points:

| Component | Role |
|-----------|------|
| **WAHA (GOWS engine)** | WhatsApp session management, message send/receive |
| **SARA API** | AI response generation, tool dispatch, session context |
| **waha-bridge** | Webhook receiver that relays WAHA events to SARA API |

SARA relies on the **GOWS engine** (`devlikeapro/waha:gows`) for its production deployments because GOWS provides stable, long-lived sessions with low resource overhead — important for multi-tenant setups where dozens of WhatsApp numbers may be active simultaneously.

Multi-session support is handled through WAHA's session API: SARA creates one WAHA session per tenant (named `solo-{userId}`) and maintains session state independently for each.

---

## Quick Setup

### Prerequisites

- Docker and Docker Compose
- A server reachable from the internet (for WAHA webhooks)
- An Ollama or cloud AI provider API key (Groq, Cerebras, SambaNova, or Mistral)

### 1. Clone the repository

```bash
git clone https://github.com/Alessandro114/sara.git
cd sara
```

### 2. Configure environment variables

Copy the example environment file and edit it:

```bash
cp .env.example .env
```

Set at minimum the following variables:

```dotenv
# WAHA connection
WAHA_BASE_URL=http://localhost:3004
WAHA_API_KEY=your_waha_api_key

# AI provider (choose one)
GROQ_API_KEY=your_groq_api_key

# Database
DATABASE_URL=postgresql://sara:password@localhost:5432/sara

# Application
PORT=3006
BASE_URL=https://your-public-domain.com
```

### 3. Start WAHA with the GOWS engine

```bash
docker run -d \
  --name waha \
  -p 3004:3000 \
  -e WHATSAPP_DEFAULT_ENGINE=GOWS \
  -e WAHA_API_KEY=your_waha_api_key \
  devlikeapro/waha:gows
```

### 4. Start SARA

```bash
docker compose up -d
```

This starts:
- **sara-api** — the AI agent backend (port 3006)
- **waha-bridge** — the WAHA webhook relay (port 3008)
- **PostgreSQL** — session and conversation storage

### 5. Configure the WAHA webhook

Point WAHA's webhook at the SARA bridge:

```bash
curl -X POST http://localhost:3004/api/settings \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: your_waha_api_key" \
  -d '{
    "webhooks": [{
      "url": "http://your-public-domain.com:3008/webhook",
      "events": ["message", "session.status"]
    }]
  }'
```

### 6. Scan the QR code

Start a session and scan the QR code with WhatsApp:

```bash
# Start session
curl -X POST http://localhost:3004/api/sessions \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: your_waha_api_key" \
  -d '{"name": "solo-1", "start": true}'

# Get QR code
curl http://localhost:3004/api/sessions/solo-1/auth/qr \
  -H "X-Api-Key: your_waha_api_key"
```

Once scanned, SARA will begin responding to incoming WhatsApp messages automatically.

---

## Architecture overview

```
WhatsApp
   |
   v
 WAHA (GOWS engine, :3004)
   |  webhook events
   v
waha-bridge (:3008)
   |  HTTP POST /message
   v
sara-api (:3006)
   |  AI inference + tool dispatch
   v
AI Provider (Groq / Cerebras / Mistral / SambaNova)
```

---

## Links

- GitHub: [https://github.com/Alessandro114/sara](https://github.com/Alessandro114/sara)
- License: AGPL-3.0
- WAHA Quick Start: [Quick Start]({{< relref "/docs/overview/quick-start" >}})
- WAHA GOWS Engine: [GOWS Engine]({{< relref "/docs/engines/gows" >}})
