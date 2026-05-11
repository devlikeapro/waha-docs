---
title: "WAHA 2026.4 - MCP Server, API Key Scopes, Query Auth"
description: "WAHA becomes an MCP server for AI agents, API keys get granular action scopes, and you can now pass the key as a ?x-api-key query parameter."
excerpt: "WAHA 2026.4 ships an MCP server for AI agents, per-scope API key restrictions, ?x-api-key query auth, and a round of engine fixes."
date: 2026-04-30T00:00:00+00:00
draft: false
images: [ "waha-2026-4.png" ]
categories: [ "Releases" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
slug: waha-2026-4
---

## 🤖 MCP Server

WAHA now ships a built-in [Model Context Protocol](https://modelcontextprotocol.io/) server.
Any MCP-compatible AI agent — Claude, Goose, and others — can send messages, read chats, and manage contacts through your own self-hosted instance.

You create one **MCP App** per WhatsApp session. Each app gets its own scoped API key so you decide exactly what the agent is allowed to do — `send` only, `read` only, or any combination. — [#1925](https://github.com/devlikeapro/waha/issues/1925)

Check the [**🧩 MCP docs**]({{< relref "/docs/apps/mcp" >}}) for the full setup guide.

## 🔒 API Key Session Scopes

Session API keys now support an `actions` field that limits what the key can do within its session.
Previously all session keys had the same set of permissions. Now you can create a read-only key for a dashboard, a send-only key for a bot, or a media-only key for embedding images — without granting any extra access.

Available scopes:

| Scope     | Default | Description                                      |
|-----------|---------|--------------------------------------------------|
| `read`    | true    | Read messages, contacts, chats, groups, etc.     |
| `send`    | true    | Send messages and manage session entities        |
| `control` | true    | Start, stop, restart, logout, authenticate       |
| `setting` | true    | Update session settings                          |
| `app`     | true    | Manage apps                                      |
| `delete`  | false   | Delete the session                               |

```http request
POST /api/keys
```

```jsonc { title="Body — read-only session key" }
{
  "isAdmin": false,
  "session": "default",
  "isActive": true,
  "actions": {
    "read": true,
    "send": false,
    "control": false,
    "setting": false,
    "app": false,
    "delete": false
  }
}
```

See [**🔒 Session Key Scopes**]({{< relref "/docs/how-to/security#session-key-scopes" >}}) for the full reference. — [#2035](https://github.com/devlikeapro/waha/issues/2035)

## 🔑 x-api-key Query Parameter

You can now pass the API key as a URL query parameter:

```http request
GET /api/files/true_11111111111@c.us_AAA.jpg?x-api-key=your-key
```

This is useful when you cannot set headers — for example, putting a media URL directly into an `<img>` tag in a browser.

⚠️ Never embed your admin or full-session key in a URL. Create a **dedicated session key** with only the scopes the consumer actually needs (for media-only access you can set all action scopes to `false`).

See [**🔒 Use x-api-key query parameter**]({{< relref "/docs/how-to/security#use-x-api-key-query-parameter" >}}) for details.

## 🛠️ Other Fixes

**GOWS**
- Sessions taking a long time to start after server restart — fixed. — [#2012](https://github.com/devlikeapro/waha/issues/2012)
- 403 on some media downloads — fixed with re-upload request from the phone. — [#2049](https://github.com/devlikeapro/waha/issues/2049)
- `GET /api/messages` not returning messages sent via `POST /api/sendFile`. — [#1998](https://github.com/devlikeapro/waha/issues/1998)
- `/chats/overview` "no such column: jid" error. — [#2009](https://github.com/devlikeapro/waha/issues/2009)

**NOWEB**
- Missing Facebook and Instagram Ads messages. — [#1922](https://github.com/devlikeapro/waha/issues/1922)
- MongoDB `GET /api/messages` timestamp range filter (`gte` + `lte` combined) not respected. — [#2011](https://github.com/devlikeapro/waha/issues/2011)
- 0-byte audio/voice files on media download — now uses stream mode. — [#1996](https://github.com/devlikeapro/waha/issues/1996)

**WEBJS**
- `window is undefined` error. — [#1990](https://github.com/devlikeapro/waha/issues/1990)
- `call.received` event broken. — [#2014](https://github.com/devlikeapro/waha/issues/2014)
- Loading messages fix. — [#2005](https://github.com/devlikeapro/waha/issues/2005), [#2013](https://github.com/devlikeapro/waha/issues/2013)

**Other**
- `WHATSAPP_FILES_LIFETIME` 32-bit `setTimeout` overflow causing immediate file deletion. — [#2018](https://github.com/devlikeapro/waha/issues/2018), [#2019](https://github.com/devlikeapro/waha/issues/2019)

## ⚙️ Full Changelog
All versions, issue links, and engine bumps are in the [**🆕 WAHA 2026.4 Changelog**]({{< relref "/docs/overview/changelog#20264" >}}).
