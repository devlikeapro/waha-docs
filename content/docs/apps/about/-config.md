<div></div>

To use 
[**🧩 Apps**]({{< relref "/docs/apps/about" >}})
, you need to configure the following environment variables in addition to the standard 
[**⚙️ Configuration**]({{< relref "/docs/how-to/config" >}}):

**Apps**:

- `WAHA_APPS_ENABLED=True` - Enables the [**🧩 Apps**]({{< relref "/docs/apps/about" >}}) functionality
- `REDIS_URL=redis://:redis@redis:6379` - Specifies the Redis URL required for processing background jobs
- `WHATSAPP_DEFAULT_ENGINE=GOWS` - Sets the recommended engine for reliable **WhatsApp** automation

**Jobs**: 

You can configure a background worker [http://localhost:3000/jobs](http://localhost:3000/jobs)

- `WAHA_APPS_JOBS_CONCURRENCY=50` - Maximum number of jobs processed concurrently
- `WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_AGE=259200` - Remove completed jobs after 3 days (in seconds)
- `WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_COUNT=1000` - Maximum number of completed jobs to keep
- `WAHA_APPS_JOBS_REMOVE_ON_FAIL_AGE=2678400` - Remove failed jobs after 31 days (in seconds)
- `WAHA_APPS_JOBS_REMOVE_ON_FAIL_COUNT=1000` - Maximum number of failed jobs to keep

Note: `*_AGE` parameters are specified in **seconds** by default.

Under the hood it uses [bullmq](https://docs.bullmq.io/).
