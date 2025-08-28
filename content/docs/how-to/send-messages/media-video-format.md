<div></div>
{{< callout context="note" title="Video File Format" icon="outline/file" >}}
WhatsApp accepts only a file in **mp4 using libx264** format.

If you have a file in a different format (like **avi**) you can use one of the options:

1. **Set convert: true** in the body when calling API:
```jsonc { title="Body" }
{
  ...,
  "convert": true
}
```

2. **Convert file before sending** by calling [**🖼️ Media - Convert Video**](#media---convert-video)

3. **Run ffmpeg**:
```bash
ffmpeg -i input_video.mp4 -c:v libx264 -map 0 -movflags +faststart output_video.mp4
```
`-map 0 -movflags +faststart` options required for thumbnail generation.
{{< /callout >}}

{{< callout context="tip" title="WEBJS - use :chrome image" icon="outline/browser" >}}
If you're using **WEBJS** (default engine) - make sure to use `devlikeapro/waha-plus:chrome` docker image.

Read more about [**Docker images and engines →**]({{< relref "/docs/how-to/engines" >}}).
{{< /callout >}}

