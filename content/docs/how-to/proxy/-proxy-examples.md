<div></div>

- `server` - proxy server address in `host:port` format
- `scheme` - `http` (default), `https` or `socks5`
- `username` and `password` - set this if the proxy requires authentication

**No authentication**

```json
{
  "name": "default",
  "config": {
    "proxy": {
      "server": "localhost:3128"
    }
  }
}
```

**Proxy with authentication**

```json
{
  "name": "default",
  "config": {
    "proxy": {
      "server": "localhost:3128",
      "username": "username",
      "password": "P@ssw0rd"
    }
  }
}
```

**SOCKS5 proxy**

```json
{
  "name": "default",
  "config": {
    "proxy": {
      "scheme": "socks5",
      "server": "localhost:1080"
    }
  }
}
```

{{< callout context="caution" title="WEBJS, WPP - SOCKS5 with authentication is not supported" icon="outline/alert-triangle" >}}
**WEBJS** and **WPP** ignore `username` and `password` for `socks5` (Chrome/Chromium has no SOCKS authentication).
{{< /callout >}}

**Full URL in `server`**

`server` also accepts a full URL - `scheme://username:password@host:port`.
`scheme`, `username` and `password` fields, when set, overwrite the parts of the URL in `server`.

```json
{
  "name": "default",
  "config": {
    "proxy": {
      "server": "socks5://user:p%40ss@localhost:1080"
    }
  }
}
```

{{< callout context="caution" title="If your username or password has special symbols (@, :, /, %, etc)" icon="outline/alert-triangle" >}}
The URL is parsed as is, so credentials inside it **must be percent-encoded**:

```bash
USERNAME_OR_PASSWORD='p@ss'
node -p 'encodeURIComponent(process.argv[1])' "$USERNAME_OR_PASSWORD"
# p%40ss
```
{{< /callout >}}
