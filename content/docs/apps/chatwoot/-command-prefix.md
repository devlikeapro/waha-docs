<div></div>
{{< callout context="note" title="You can use 'wa/' prefix to execute commands in any chats" icon="outline/info-circle" >}}

You can run commands into 2 ways, depending on the conversation you're in:
1. **WhatsApp Integration** chat - use `command` or `wa/command`.
2. **Any other conversation** in the **Inbox** - use `wa/command` only.

```bash
# In WhatsApp Integration chat - use either with or without
help
wa/help

# In Any conversation for the Inbox - use wa/ prefix
wa/help 
```

👉 We use the `wa/` prefix in the guides, but you can **omit it** in the **WhatsApp Integration** chat:

⚙️ Override the prefix by setting the `WAHA_CHATWOOT_COMMAND_PREFIX=wa/` environment variable.

{{< /callout >}}
