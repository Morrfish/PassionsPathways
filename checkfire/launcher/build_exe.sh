#!/bin/sh
# Builds Checkfire.exe (64-bit Windows) from the current ../index.html. Needs Go 1.21+.
# Usage: ./build_exe.sh [output folder]   (default: ../dist)
set -e
cd "$(dirname "$0")"
OUT="${1:-../dist}"
mkdir -p "$OUT"
cp ../index.html index.html
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags "-H windowsgui -s -w" -o "$OUT/Checkfire.exe" .
rm -f index.html
ls -la "$OUT/Checkfire.exe"
