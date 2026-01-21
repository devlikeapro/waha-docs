# Agent Playbook

## Related Source Code
You can check the listed folders to get more context if you need
- WAHA - `../whatsapp-http-api`

## API Documentation
- Before creating API documentation - check the current style for some API.
- Document body and response with title and `jsonc`
- Use `http request` for API methods

```http request
POST /api/...
```

```jsonc { title="Body" }
{
}
```

## 🧩 Image Tools

Agents can use local CLI tools for image manipulation:

- **ImageMagick** (`magick`, `convert`, `mogrify`, `composite`, `montage`)
- **GraphicsMagick** (`gm`)
- **libvips** (`vips`)
- **ffmpeg** (`ffmpeg`)

If none are available, Agent will request installation on the host system.



## Emoji Asset Library

- All emojis referenced in `content/` now have Twemoji SVG+PNG pairs stored under `images/emoji/` using the `<emoji> - <slug>.svg|png` naming convention.
- The manifest at `scripts/emoji-manifest.json` (generated from `scripts/emoji-codes.txt`) lists every emoji currently in use.
- Run `node scripts/download-emoji.js` to refresh the cached SVGs in bulk; the script handles variation selectors and writes files into `images/emoji/` automatically.
- If you need a new emoji, add its code to `scripts/emoji-codes.txt` and rerun the script, or `curl` the Twemoji SVG straight into `images/emoji/<emoji> - <slug>.svg` and generate a matching PNG with the ImageMagick recipe below.
- Cached assets let you composite covers without repeatedly downloading the same glyphs.

## How to Generate an Emoji Cover Image

Follow this checklist whenever you need to create a square PNG cover that features a single emoji on a transparent background.

1. **Pick the emoji and find its code point**
   - Use an online emoji database (e.g. https://emojipedia.org) to confirm the hexadecimal code point.
   - Example: ⚡ (high voltage) → `26a1`.

2. **Download the Twemoji SVG**
   ```bash
   curl -fsSL -o /tmp/twemoji.svg "https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/svg/<code>.svg"
   ```
   - Replace `<code>` with the lowercase code point from step 1.
   - Keep the SVG in `/tmp` so we do not litter the repo.

3. **Render a high-resolution PNG with ImageMagick**
   ```bash
   convert -background none -density 2048 /tmp/twemoji.svg -resize 380x380 /tmp/emoji.png
   ```
   - The high density flag keeps edges crisp.
   - Adjust the target size if you need a different footprint.

4. **Place the emoji on a 512×512 transparent canvas**
   ```bash
   convert -size 512x512 xc:none -gravity center /tmp/emoji.png -compose over -composite content/docs/overview/<slug>/cover.png
   ```
   - Swap the destination path for the page you are updating.
   - If you want a colored disk behind the emoji, create it first with `convert -size 512x512 xc:none -draw "fill #96dd78 circle 256,256 256,0" /tmp/bg.png` and composite the emoji onto `/tmp/bg.png` before writing the final file.

5. **Reference the cover from front matter and listings**
   - Update the page front matter inside the same bundle: `images: ["cover.png"]`.
   - Hugo listings normally read `index .Params.images 0`; if a category card shows a wrong alt text, confirm the layout uses `.Title` for the `alt` attribute (see `layouts/docs/list.html`).

6. **Clean temporary files**
   ```bash
   rm -f /tmp/twemoji.svg /tmp/emoji.png /tmp/bg.png
   ```

> Tip: Keep the output filename lowercase (`cover.png`) so section listings can use a simple `{{ index .Params.images 0 }}` lookup.


## ChatWoot Covers (logos + emoji)

The ChatWoot overview and app articles share the same WAHA + ChatWoot logo strip. Pair it with the page emoji while keeping the 3000×1024 canvas so listing cards align.

1. Restore the clean logos: `cp images/waha-chatwoot-original.png /tmp/waha-chatwoot.png`
2. Trim padding so we can position it consistently: `convert /tmp/waha-chatwoot.png -trim /tmp/logos.png`
3. Render the page emoji with the recipe above so you have `/tmp/emoji.png`, then resize it to 250px tall so it stays proportional on the 3000×1024 canvas.
   ```bash
   convert /tmp/emoji.png -resize x250 /tmp/emoji.png
   ```
   Pick the matching code point, e.g. `1f527` for 🔧.
4. Composite everything onto a 3000×1024 transparent canvas:
   ```bash
   convert -size 3000x1024 xc:none \
     /tmp/logos.png -gravity center -geometry -450+0 -composite \
     /tmp/emoji.png -gravity center -geometry +450+0 -composite \
     content/blog/apps-chatwoot-<slug>/cover.png
   ```
   Replace `<slug>` with the bundle directory (e.g. `apps-chatwoot-2-config`).
5. Remove `/tmp/logos.png`, `/tmp/waha-chatwoot.png`, and the emoji assets when you're done.

This keeps the branding centred with a comfortable gap and ensures every ChatWoot cover reuses the original artwork.

## WAHA Release Covers (logo + version)

Use this recipe for the monthly WAHA release blog covers. It keeps the "WAHA" headline centred, then places the version label and WAHA logo inside a rounded white pill underneath.

```bash
./scripts/generate-waha-cover.sh \
  --version 2025.10 \
  --gradient '#0b1120-#0f766e' \
  --output content/blog/waha-2025-10/waha-2025-10.png
```

Parameters:

- `--version` sets the label inside the pill; text renders in WAHA green `#10991e`.
- `--gradient` accepts any ImageMagick gradient string (e.g. `'#0f172a-#6d28d9'` for purple). Pick a fresh palette per release.
- `--output` is the target PNG path. The script overwrites the file if it exists.
- `--logo` is optional if you ever need to point at a different mark (defaults to `images/logo.png`).

Tweaks:

- Move the pill closer/further from the headline by editing the `-geometry +0+130` value in the script.
- Shift the version text or logo inside the pill by changing the `-annotate` and `-geometry` offsets in the script.
- Update the font by changing the `FONT` variable if DejaVu Sans is unavailable in a new environment.
