<div></div>
{{< callout context="note" title="Sticker File Format" icon="outline/file" >}}
`POST /api/sendSticker` is a **dumb** endpoint: it accepts an **already-prepared WebP** and sends it as a sticker.
There is **no server-side conversion** (jpg/png/gif/mp4 → WebP) and **no EXIF pack/author injection**.

WhatsApp sticker rules (chat stickers):

| Rule | Static | Animated |
| --- | --- | --- |
| Format | WebP (`image/webp`) | Animated WebP (`ANMF` / `ANIM`) |
| Dimensions | Exactly **512 × 512** px | Same |
| Max size | **≤ 100 KB** | **≤ 500 KB** |
| Duration | — | **≤ 10 s**, frame duration **≥ 8 ms**, no audio |

Convert on the client (e.g. sharp / FFmpeg) before calling the API:

```bash
# Static image → WebP 512x512
ffmpeg -i input.png \
  -vf "scale=512:512:force_original_aspect_ratio=decrease,format=yuva420p,pad=512:512:(ow-iw)/2:(oh-ih)/2:black@0" \
  -c:v libwebp -q:v 80 \
  out.webp
```
{{< /callout >}}
