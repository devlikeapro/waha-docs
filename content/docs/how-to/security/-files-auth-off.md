<div></div>
{{< callout context="tip" icon="outline/info-circle" >}}
You can disable **media authentication** by setting the `WHATSAPP_API_KEY_EXCLUDE_PATH` environment variable.

File names include a random value (for example, `3EBAA9796B6AAF7AE90AAA.mp4`), so they are hard to guess and there is no "list of files" API available.

```bash {title=".env"}
WHATSAPP_API_KEY_EXCLUDE_PATH=api/files/(.*)

# Use commas to specify multiple paths
WHATSAPP_API_KEY_EXCLUDE_PATH=api/files/(.*),ping,health
```
{{< /callout >}}
