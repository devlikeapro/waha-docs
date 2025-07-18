<div></div>

To use 
[**🧩 Apps**]({{< relref "/docs/apps/about" >}})
, you need to configure the following environment variables in addition to the standard 
[**⚙️ Configuration**]({{< relref "/docs/how-to/config" >}}):

- `WAHA_APPS_ENABLED=True` - Enables the [**🧩 Apps**]({{< relref "/docs/apps/about" >}}) functionality
- `REDIS_URL=redis://:redis@redis:6379` - Specifies the Redis URL required for processing background jobs
- `WHATSAPP_DEFAULT_ENGINE=GOWS` - Sets the recommended engine for reliable **WhatsApp** automation
