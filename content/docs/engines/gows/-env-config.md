<div></div>

- `GODEBUG=netdns=cgo` - by default, GOWS uses libc DNS resolver, but if you're experiencing DNS issues,
try to switch to the Go resolver by setting this environment variable - `GODEBUG=netdns=go`.

```yaml {title="docker-compose.yaml"}
services:
  waha:
    env:
      - GODEBUG=netdns=go
    dns:
      - 8.8.8.8
      - 1.1.1.1
```
