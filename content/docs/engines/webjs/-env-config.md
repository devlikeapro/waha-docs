<div></div>

You can use the following environment variables to configure the global behavior of the [**WEBJS**]({{< relref "/docs/how-to/engines#webjs" >}}) engine:
- `WAHA_WEBJS_CACHE_TYPE=local` - enable cache (aka use the latest version) for the **web page** in the browser. By default, it's `none` (no cache)
- `WAHA_WEBJS_WEB_VERSION=2.3000.XXXX` - set the version of the WhatsApp Web to use. By default, we're using the latest compatible version. Only works with `local` cache type.
- `WAHA_WEBJS_PUPPETER_ARGS=--single-process` - Add custom puppeter arguments so you can test it affects without waiting a new release (use it with cation)
