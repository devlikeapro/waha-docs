<div></div>
{{< callout context="note" title="Each Engine Has Its Own Namespace" icon="outline/article" >}}
**WAHA** uses [**🗄️ Storage Namespace**]({{< relref "/docs/how-to/storages/#namespace" >}}) to isolate [**🏭 Engines**]({{< relref "/docs/how-to/engines" >}}) data.

There are two environment variables that control namespaces:
- `WAHA_NAMESPACE` — controls the **main storage** (apps, API keys, shared config). Defaults to the current engine name.
- `WAHA_SESSION_NAMESPACE` — controls **session-specific storage** (auth data, session files). Defaults to the current engine name.

👉🏻 Set **WAHA_NAMESPACE=all** to share apps, API keys, and common config across engines while switching between them:
```bash {title=".env"}
WAHA_NAMESPACE=all

# To share session authentication between WEBJS/WPP engines
# WAHA_SESSION_NAMESPACE=webjs
```

⚠️ Keep `WAHA_SESSION_NAMESPACE` **unset** in most cases.
Changing it is an advanced setup and is **not backward compatible** with existing session data.
{{< /callout >}}


