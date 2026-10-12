#!/usr/bin/env bash
# Renders og/og.html to public/og.jpg (1200×630), the image shown when a link is shared.
# Uses a local Chrome in headless mode and macOS `sips`; set CHROME to override Chrome's path.
# Run after editing og/og.html: `make og`, then commit public/og.jpg.
set -euo pipefail

cd "$(dirname "$0")/.."
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
dir="$(mktemp -d)"
trap 'rm -rf "$dir"' EXIT

# Rendered at 2× then scaled down: sharper edges than a 1× capture. Chrome writes the
# screenshot but does not always exit on macOS: wait for the file, then stop it.
"$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1200,630 --virtual-time-budget=3000 \
  --user-data-dir="$dir/profile" --screenshot="$dir/og.png" \
  "file://$PWD/og/og.html" >/dev/null 2>&1 &
pid=$!

size=-1
for _ in $(seq 120); do
  sleep 0.5
  [ -s "$dir/og.png" ] || continue
  now=$(stat -f %z "$dir/og.png")
  [ "$now" = "$size" ] && break
  size=$now
done
kill "$pid" 2>/dev/null || true
[ -s "$dir/og.png" ] || { echo "Chrome did not produce a screenshot" >&2; exit 1; }

sips -z 630 1200 -s format jpeg -s formatOptions 88 "$dir/og.png" --out public/og.jpg >/dev/null
echo "public/og.jpg written"
