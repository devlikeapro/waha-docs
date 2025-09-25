<div></div>

To use 
[**🧩 Apps**]({{< relref "/docs/apps/about" >}})
, you need to configure the following environment variables in addition to the standard 
[**⚙️ Configuration**]({{< relref "/docs/how-to/config" >}}):

**Apps**:

- `WAHA_APPS_ENABLED=True` - Enables the [**🧩 Apps**]({{< relref "/docs/apps/about" >}}) functionality
- `WAHA_PUBLIC_URL=https://w.example.com` — the publicly available link to the dashboard (use this if `WAHA_BASE_URL` is set to an internal address for Docker).
- `REDIS_URL=redis://:redis@redis:6379` - Specifies the Redis URL required for processing background jobs
- `WHATSAPP_DEFAULT_ENGINE=GOWS` - Sets the recommended engine for reliable **WhatsApp** automation
- `WAHA_API_KEY_PLAIN=0000000000000000` - plain password **required** for Apps in environment variables
  - It's a quick solution, we're working on removing it so you can use `sha512` version as in `WAHA_API_KEY`

**ChatWoot App**:

- `WAHA_APPS_CHATWOOT_LANGUAGES_FOLDER=/app/.languages` - folder for additional languages (if language exists it'll override templates in the original templates)
- `RACK_TIMEOUT_SERVICE_TIMEOUT=60` — increases the default Rack timeout to 60s (default is 15s).


**Jobs**: 

You can configure a background worker [http://localhost:3000/jobs](http://localhost:3000/jobs)

- `WAHA_APPS_JOBS_CONCURRENCY=50` - Maximum number of jobs processed concurrently
- `WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_AGE=259200` - Remove completed jobs after 3 days (in seconds)
- `WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_COUNT=1000` - Maximum number of completed jobs to keep
- `WAHA_APPS_JOBS_REMOVE_ON_FAIL_AGE=2678400` - Remove failed jobs after 31 days (in seconds)
- `WAHA_APPS_JOBS_REMOVE_ON_FAIL_COUNT=1000` - Maximum number of failed jobs to keep

Note: `*_AGE` parameters are specified in **seconds** by default.

Under the hood it uses [bullmq](https://docs.bullmq.io/).
