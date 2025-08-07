<div></div>
{{< callout icon="outline/server" title="Using a VPS or VM via SSH?" >}}

You need to **forward ports** so you can access remote server ports from your laptop.

Connect to the server using the command:

```bash { title="Connect to server with port forwarding" }
ssh -L 3000:localhost:3000 -L 3009:localhost:3009 {user}@{server}
```

{{< /callout >}}
