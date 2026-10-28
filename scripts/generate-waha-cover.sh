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
# Pill width adapts to the version label: left pad + text + gap + logo + right pad
TEXT_WIDTH=$(convert -font "$FONT" -pointsize 105 label:"$VERSION" -format "%w" info:)
PILL_PAD=150
PILL_GAP=60
LOGO_SIZE=140
PILL_WIDTH=$((PILL_PAD + TEXT_WIDTH + PILL_GAP + LOGO_SIZE + PILL_PAD - 100))
LOGO_OFFSET=$((PILL_PAD + TEXT_WIDTH + PILL_GAP))
convert -size "${PILL_WIDTH}x170" xc:none \
  -draw "fill white roundrectangle 0,0 $((PILL_WIDTH - 1)),169 85,85" "$PILL"
convert "$PILL" \
  -gravity West -font "$FONT" -pointsize 105 -fill '#10991e' \
  -annotate +${PILL_PAD}+0 "$VERSION" "$PILL_TXT"
convert "$LOGO" -resize "${LOGO_SIZE}x${LOGO_SIZE}" "$LOGO_TMP"
convert "$PILL_TXT" "$LOGO_TMP" -gravity West -geometry +${LOGO_OFFSET}+0 -composite "$PILL_READY"
convert "$STAGE" "$PILL_READY" -gravity center -geometry +0+130 -composite "$OUTPUT"

printf "Cover generated: %s\n" "$OUTPUT"
