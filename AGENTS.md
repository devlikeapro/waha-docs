# Agent Playbook

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

7. **Validate locally**
   - Run `hugo serve` and confirm the listing card shows the expected emoji cover without clipping or halos.

> Tip: Keep the output filename lowercase (`cover.png`) so section listings can use a simple `{{ index .Params.images 0 }}` lookup.
