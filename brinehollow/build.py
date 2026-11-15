#!/usr/bin/env python3
"""Build Brinehollow into one self-contained HTML file.

Inlines Three.js r128 into game.src.html so the game works offline or from a USB drive.

Usage:
    npm pack three@0.128.0 && tar xzf three-0.128.0.tgz
    python3 build.py package
"""
import pathlib
import sys

here = pathlib.Path(__file__).resolve().parent
pkg = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else here / "vendor" / "three")

lib = (pkg / "build/three.min.js").read_text(encoding="utf-8").replace("</script", "<\\/script")
src = (here / "game.src.html").read_text(encoding="utf-8")
marker = "<script>/*THREE*/</script>"
assert marker in src, "marker missing"
out = src.replace(marker, "<script>\n" + lib + "\n</script>")
(here / "index.html").write_text(out, encoding="utf-8")
print(f"built index.html ({len(out)//1024} KB)")
