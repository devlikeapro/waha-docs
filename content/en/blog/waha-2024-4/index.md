---
title: "WAHA 2024.4 - Dashboard to manage your sessions!"
description: "WAHA 2024.4 - Dashboard to manage your sessions in easy way without additional tools!"
excerpt: "WAHA 2024.4 - Dashboard to manage your sessions in easy way without additional tools!"
date: 2024-04-01T08:48:45+00:00
draft: false
weight: 50
images: ["WAHA 2024.4.png"]
categories: ["Releases"]
tags: []
contributors: ["devlikeapro"]
pinned: false
homepage: false
---

<video autoplay loop muted playsinline controls='noremoteplayback' width="100%" poster='/images/waha-dashboard.png'>
  <source src="/videos/waha-dashboard-overview.webm" type="video/webm" />
  Download the <a href="/videos/waha-dashboard-overview.webm">Dashboard Overview video</a> .
</video>

We are thrilled to introduce the latest addition to WAHA - 
[the brand new **Dashboard**]({{< relref "/docs/how-to/waha-dashboard" >}}),
exclusively available in 
[**WAHA Plus**]({{< relref "/docs/how-to/plus-version" >}}) version!

🌟 Dashboard allows you to do:

1. **Monitor Sessions**: The Dashboard displays the total number of sessions on the server along with their statuses. It conveniently highlights sessions that require actions, allowing you to address any issues promptly.
2. **Session Management**: Take full control of your sessions with the Dashboard. Start a new session, view session information, generate QR codes, adjust settings, and stop/start or log out from sessions with ease.
3. **Secure Server Connection**: Easily connect to a server using your API key, ensuring a secure and seamless interaction with WAHA.
4. **Version Comparison**: Keep track of the latest project version and compare it to your current version. The Dashboard makes it easy to see when updates are available, empowering you to stay up-to-date with the latest features and improvements.

🔍 Accessing the Dashboard is as simple as running (remember to update it before!) the project and opening http://localhost:3000/dashboard (or a similar URL with /dashboard appended)I.

🔑 **Default username and password**: `waha / waha`

If you’re using API Key, remember to set up the key in the dashboard:
![API Key](dashboard-key.png)

⚙️ Environment Variables:

- `WAHA_DASHBOARD_ENABLED=true`: Toggle to enable or disable the dashboard (default is true; set to false to disable).
- `WAHA_DASHBOARD_USERNAME=waha`: Default username for login (default: waha).
- `WAHA_DASHBOARD_PASSWORD=waha`: Default password for login (default: waha). 

ℹ️ If you encounter any issues or wish to request a new feature, please head over to our GitHub repository and create an issue at: 
🔗 [WAHA GitHub Issues](https://github.com/devlikeapro/waha/issues)


Thank you for your continued support and enthusiasm for the project! We appreciate each and every one of our patrons! 🙏

If you don't have access to 
[WAHA Plus]({{< relref "/docs/how-to/plus-version" >}}) - subscribe to one of our tiers on
the platforms  and get the key to get WAHA Plus on
our portal! [https://portal.devlike.pro/](https://portal.devlike.pro/)

You can find all changes for the WAHA 2024.4 in [Changelog]({{< relref "/docs/overview/changelog" >}})
