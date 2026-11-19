#!/bin/sh
# Creates small (1200px, JPEG) copies of project cover photos for link previews
# on WhatsApp, Instagram, Facebook etc. Run on a Mac after adding or changing a
# cover:  sh scripts/make-share-images.sh /assets/xl-apt/850_3754aaa.jpg ...
# With no arguments it regenerates every file listed in scripts/share-images.txt.
set -e
cd "$(dirname "$0")/.."
[ "$#" -gt 0 ] || set -- $(cat scripts/share-images.txt)
for src in "$@"; do
  rel="${src#/assets/}"
  out="public/assets/share/${rel%.*}.jpg"
  mkdir -p "$(dirname "$out")"
  sips -s format jpeg -s formatOptions 60 -Z 1200 "public$src" --out "$out" >/dev/null
  echo "$out $(stat -f%z "$out") bytes"
done
