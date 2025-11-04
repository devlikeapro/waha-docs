#!/usr/bin/env bash
set -euo pipefail

VERSION=""
OUTPUT=""
GRADIENT="#0b1120-#0f766e"
LOGO="images/logo.png"
FONT="DejaVu-Sans-Bold"

usage() {
  cat <<USAGE
Usage: $0 --version VERSION --output PATH [--gradient "#start-#end"] [--logo PATH]

Generates a WAHA release cover image with the standard layout.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --version)
      VERSION="$2"
      shift 2
      ;;
    --output)
      OUTPUT="$2"
      shift 2
      ;;
    --gradient)
      GRADIENT="$2"
      shift 2
      ;;
    --logo)
      LOGO="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$VERSION" || -z "$OUTPUT" ]]; then
  echo "Error: --version and --output are required." >&2
  usage
  exit 1
fi

if ! command -v convert >/dev/null 2>&1; then
  echo "Error: ImageMagick 'convert' command not found." >&2
  exit 1
fi

if [[ ! -f "$LOGO" ]]; then
  echo "Error: Logo file '$LOGO' not found." >&2
  exit 1
fi

BG=$(mktemp /tmp/waha_bg.XXXXXX.png)
STAGE=$(mktemp /tmp/waha_stage.XXXXXX.png)
PILL=$(mktemp /tmp/waha_pill.XXXXXX.png)
PILL_TXT=$(mktemp /tmp/waha_pill_text.XXXXXX.png)
PILL_READY=$(mktemp /tmp/waha_pill_ready.XXXXXX.png)
LOGO_TMP=$(mktemp /tmp/waha_logo.XXXXXX.png)

cleanup() {
  rm -f "$BG" "$STAGE" "$PILL" "$PILL_TXT" "$PILL_READY" "$LOGO_TMP"
}
trap cleanup EXIT

convert -size 600x1200 gradient:"$GRADIENT" -rotate 90 "$BG"
convert "$BG" \
  -gravity center -font "$FONT" -pointsize 210 -fill white \
  -annotate +0-80 'WAHA' "$STAGE"
convert -size 870x170 xc:none \
  -draw "fill white roundrectangle 0,0 869,169 85,85" "$PILL"
convert "$PILL" \
  -gravity West -font "$FONT" -pointsize 105 -fill '#10991e' \
  -annotate +150+0 "$VERSION" "$PILL_TXT"
convert "$LOGO" -resize 140x140 "$LOGO_TMP"
convert "$PILL_TXT" "$LOGO_TMP" -gravity West -geometry +680+0 -composite "$PILL_READY"
convert "$STAGE" "$PILL_READY" -gravity center -geometry +0+130 -composite "$OUTPUT"

printf "Cover generated: %s\n" "$OUTPUT"
