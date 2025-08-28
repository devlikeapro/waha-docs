<div></div>
{{< callout context="note" title="Image File Format" icon="outline/file" >}}
WhatsApp works best when images are sent in **JPEG** format.

- There is **no convert flag** for images in WAHA (unlike Voice/Video). You must convert to JPEG before sending.
- In your request, set `file.mimetype` to `image/jpeg` and use a `.jpg`/`.jpeg` filename.

Convert with ffmpeg:
```bash
# Convert PNG/WebP/etc. to JPEG
ffmpeg -i input.png -q:v 2 output.jpg
```
Tip: If the source image has transparency (alpha), JPEG will drop it. Consider adding a background before converting (e.g., in your image editor) if needed.
{{< /callout >}}
