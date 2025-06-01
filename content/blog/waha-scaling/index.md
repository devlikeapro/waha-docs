---
title: "WAHA Scaling - How To Handle 500+ Sessions"
description: "WAHA Scaling - how to scale WAHA for >500 sessions with Vertical and Horizontal scaling"
excerpt: "WAHA Scaling - how to scale WAHA for >500 sessions with Vertical and Horizontal scaling"
date: 2024-08-14T08:48:45+00:00
draft: false
weight: 50
images: [ "horizontal-vs-vertical-scaling.png" ]
categories: [ "Tips" ]
tags: [ ]
contributors: [ "devlikeapro" ]
pinned: false
homepage: false
---

## Overview

The article is for people who want to scale their WhatsApp API for customers, like CRM, SaaS, or other services and
who needs to handle a lot (**>100**) of [**🖥️ Sessions**]({{< relref "/docs/how-to/sessions" >}}) (WhatsApp Accounts)

If you're using WAHA for **1-10** sessions - just make sure to follow
[**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) guide.
It handles all the necessary steps to make it work. 🚀

There are two ways to scale WAHA:

1. [**Vertical Scaling**](#vertical-scaling) - adding more resources (CPU, RAM) to **the single server** to
   handle more sessions. That's a good way to go if you need to handle up to **50** sessions (**WEBJS**) or **500**
   sessions (**NOWEB**).
2. [**Horizontal Scaling**](#horizontal-scaling---sharding) - adding more servers to handle more sessions.
   Requires a bit of more work to set up, but it's the best way to go if you need to handle more than **500** sessions.

## Vertical Scaling

![alt](waha-scaling-up.drawio.png)

**Vertical Scaling** is the process of adding more resources (CPU, RAM) to the single server to handle more sessions.

Assuming you've followed the guide [**🔧 Install & Update**]({{< relref "/docs/how-to/install" >}}) and
you got something like this architecture:

{{< imgo src="/images/waha/scaling/waha-vertical-scaling.drawio.png" >}}

**How many sessions you can run adding more resources (CPU and RAM) to the single WAHA server?**

Here's 
[approximate example how many session you can run on a single server]({{< relref "/docs/overview/faq#system-requirements" >}})
using **Vertical Scaling** approach:

| [**🏭 Engine**]({{< relref "/docs/how-to/engines" >}}) | Sessions | CPU   | Memory |
|:-------------------------------------------------------|----------|-------|--------|
| **WEBJS**                                              | 10       | 270%  | 2.5GB  |
| **WEBJS**                                              | 50       | 1500% | 20GB   |
| **NOWEB**                                              | 50       | 150%  | 4GB    |
| **NOWEB**                                              | 500      | 300%  | 30GB   |

👉 The benchmark may differ from case to case, it depends on usage pattern - how many messages you get,
how many send, etc.

So if you need to run up to **50** session on **WEBJS** engine or up to **500** sessions on **NOWEB** - you
can just keep adding more resources (CPU and RAM) to the single server!
Fast to scale, easy to manage.🎉

If you want to run more sessions - you need to consider **Horizontal Scaling**.
It's not safe to run more than the above numbers on a single server!

## Horizontal Scaling - Sharding

![alt](waha-scaling-hor.drawio.png)

**Horizontal Scaling** is the process of adding **more servers** to handle more sessions.

Right now the only way to do it is to run multiple WAHA instances and distribute the sessions between them in
**Your Application** logic using **Sharding** technique:

{{< imgo src="/images/waha/scaling/waha-horizontal-scaling.drawio.png" >}}

Here's key points how to set up **Horizontal Scaling** using **Sharding** technique:

1. You run **multiple WAHA** instances listening different **hostnames** 
(`http://waha1.example.com`, `http://waha2.example.com`, etc) or **ports**
(`http://waha.example.com:3001`, `http://waha.example.com:3002`, etc).
2. You save the list of `url`, `api-key`, `capacity` to **Your Application Database** - 
[**Entities Schema**](#entities-schema)
3. When a new user asks to run a new session - you follow [**Where to run a new session?**](#where-to-run-a-new-session)
   logic to find a suitable WAHA instance and save `user <-> session <-> server` association to **Your Application Database**.
4. When you need to send a request to WhatsApp API - you follow
   [**Where to find the session?**](#where-to-find-the-session) logic to find the WAHA instance to send the request.
5. All webhooks come to **Your Application** directly from the WAHA instance, so you don't need to worry about it.

We'll guide you through the process of setting up **Horizontal Scaling**
using **Sharding** technique in the next sections.

👉 Please note that each **WAHA Worker** must have its own database or `WAHA_WORKER_ID=waha{N}` environment variable set
either **File Storage** or **MongoDB** URL (not a database). 

### Entities Schema

In order to save WAHA instances and sessions associations you
need to have the following entities in **Your Application Database**:
![alt](entities-schema.png)

#### Worker

**Worker** represents a single WAHA instance that can handle sessions.

- `id` - unique identifier
- `url` - URL of the WAHA instance, `http://waha1.example.com`, `http://waha2.example.com`, etc
- `api_key` - API Key to authorize requests
- `capacity` - how many sessions can be run on the WAHA instance (for simplicity, we're using a single field,
  but it can be a new model **AvailableSession** or similar).

By setting `capacity` you can manage the WAHA Worker usage and prevent overloading.

#### User

**User** is a user of **Your Application** that can run sessions.

- `id` - unique identifier

👉 You can use either **User** or **Tenant** or **Organization** it completely depends on your application logic
and business model.
We'll use **User** for simplicity with a single field:

#### WAHASession

**WAHASession** represents a single session that is running on the WAHA **Worker** associated with the **User**.

- `id` - unique identifier
- `name` - WAHA session `name`
- `user_id` - reference to the **User**
- `worker_id` - reference to the **Worker**

### Where to run a new session?

When a new user asks to **run a new session** - you need to find a suitable WAHA instance to run it.
You can simply get a list of session with `capacity>0` and pick the one with the highest `capacity`.
{{< imgo src="/images/waha/scaling/waha-run-session.png" >}}

It's just an example with simple logic. You can adjust it and distribute WhatsApp session based on **country**, **proxy
settings**,
customer level, etc.

### Where to find the session?

When you need to **send a request** to WhatsApp API - you need to find the WAHA instance to send the request.
You can simply get the `worker_id` from the **WAHASession** and send the request to the WAHA instance using
the `url` and `api_key`.
{{< imgo src="/images/waha/scaling/waha-send-request.png" >}}

### Why this way?

**WAHA** is not stateless application, it has **a runtime state** (not technically a state as in database, but still a
state) - **the connection to WhatsApp** (either browser or websocket connection) which can not be moved automatically, 
so all HTTP requests MUST be **"sticky"**, meaning it **MUST** go only to the certain "worker" - **one with "running" session**.

This is why we can simply run more containers using Kubernetes Deployment/AWS ECS 
(tho you can use [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) for k8s)
, we need to care about WHERE we run the session and WHERE we send the request.

and few more reasons:

- **Simple** - you don't need to worry about the load balancer, k8s, docker, etc.
- **Independent** - you can run WAHA instances on different servers, different cloud providers, bare-metal, etc.
- **No single point of failure** - if one WAHA instance goes down - the others are still working.
- **Flexible** - you can configure HOW you distribute sessions across different servers based on your business logic.
- **Frees our hands** - we can focus on building the best WhatsApp API and adding new features,
  and you can focus on building the best application. 😊

### Single Dashboard - Multiple Servers
If you're running multiple servers
you can run a dedicated WAHA [**📊 Dashboard**]({{< relref "/docs/how-to/dashboard" >}}) just to have a single place where from you can manage all servers:

{{< imgo src="/images/waha/dashboard/waha-dashboard-servers.drawio.png" >}}

After that you can connect all server to the single dashboard:

{{< imgo src="/images/waha/dashboard/waha-single-dashboard-multiple-servers.png" >}}

## Horizontal Scaling - Auto-Scaling

🚧🔨⏳ Auto-Scaling **IS NOT AVAILABLE** out-of-the-box in WAHA yet! ⏳🔨🚧

We're working on it, but it's not ready yet, so we're just giving you a future vision how it will work.

The idea is to build **WAHA Hub** that will handle all API requests and distribute them to the **WAHA Workers**
based on information where each session is running.

It'll also control (using underlying k8s or docker infrastructure) the number of workers based on the load.

{{< imgo src="/images/waha/scaling/waha-hub.png" >}}

Kindly [**support the project**]({{< relref "/support-us" >}}) on **PRO** tier if you wish to
use the feature in the future! 🙏

For now, [**Vertical Scaling**](#vertical-scaling) and 
[**Horizontal Scaling - Sharding**](#horizontal-scaling---sharding)
are the ways to go.
