<div></div>
{{< callout context="note" title="Voice File Format" icon="outline/file" >}}
WhatsApp accept only file with **OPUS** encoding and packed in **OGG** container.

If you have a file in a different format (like **mp3**) you can use one of the options:

1. **Set convert: true** in the body when calling API:
```jsonc { title="Body" }
{
  ...,
  "convert": true
}
```

2. **Convert file before sending** by calling [**🖼️ Media - Convert Voice**](#media---convert-voice)

3. **Run ffmpeg**:
```bash
ffmpeg -i input.mp3 -c:a libopus -b:a 32k -ar 48000 -ac 1 output.opus
```
{{< /callout >}}
