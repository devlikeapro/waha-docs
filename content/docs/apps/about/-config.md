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

**ChatWoot App (WAHA)**:
- `WAHA_APPS_CHATWOOT_LANGUAGES_FOLDER=/app/.languages` - folder for additional languages (if language exists it'll override templates in the original templates)
- `WAHA_CHATWOOT_COMMAND_PREFIX` - `wa/{command}` - prefix for commands sent from ChatWoot to WAHA (default: `wa/`)
- `WAHA_CHATWOOT_MESSAGE_CALENDAR_THRESHOLD_SECONDS=600` - threshold in seconds to show the calendar icon

  **ChatWoot App (ChatWoot)**:
- `RACK_TIMEOUT_SERVICE_TIMEOUT=60` — increases the default Rack timeout to 60s (default is 15s).
- `CONVERSATION_MESSAGE_PER_MINUTE_LIMIT=3000` - **important** to increase if you're using `wa/messages pull`
- `RACK_ATTACK_LIMIT=30000` - **important** to increase if you're using `wa/messages pull`
- **or** `RACK_ATTACK_ALLOWED_IPS={your.waha.ip.address1}` 


**Jobs**: 

You can configure a background worker [http://localhost:3000/jobs](http://localhost:3000/jobs)

- `WAHA_APPS_JOBS_CONCURRENCY=50` - Maximum number of jobs processed concurrently
- `WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_AGE=259200` - Remove completed jobs after 3 days (in seconds)
- `WAHA_APPS_JOBS_REMOVE_ON_COMPLETE_COUNT=1000` - Maximum number of completed jobs to keep
- `WAHA_APPS_JOBS_REMOVE_ON_FAIL_AGE=2678400` - Remove failed jobs after 31 days (in seconds)
- `WAHA_APPS_JOBS_REMOVE_ON_FAIL_COUNT=1000` - Maximum number of failed jobs to keep

Note: `*_AGE` parameters are specified in **seconds** by default.

Under the hood it uses [bullmq](https://docs.bullmq.io/).
