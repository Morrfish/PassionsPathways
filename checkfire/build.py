#!/usr/bin/env python3
"""Build Checkfire into one self-contained HTML file.

Inlines Three.js r128 and its bloom post-processing scripts into game.src.html
so the game works offline, inside an iframe, or from a USB drive.

Usage:
    python3 build.py <path-to-three-package>    # e.g. the unpacked `npm pack three@0.128.0`
Outputs index.html (works on GitHub Pages, offline, or renamed to .txt for the Game Closet).
"""
import pathlib
import sys

here = pathlib.Path(__file__).resolve().parent
pkg = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else here / "vendor" / "three")

parts = [
    pkg / "build/three.min.js",
    pkg / "examples/js/shaders/CopyShader.js",
    pkg / "examples/js/shaders/LuminosityHighPassShader.js",
    pkg / "examples/js/postprocessing/EffectComposer.js",
    pkg / "examples/js/postprocessing/RenderPass.js",
    pkg / "examples/js/postprocessing/ShaderPass.js",
    pkg / "examples/js/postprocessing/UnrealBloomPass.js",
    pkg / "examples/js/loaders/GLTFLoader.js",
]
lib = "\n;\n".join(p.read_text(encoding="utf-8") for p in parts).replace("</script", "<\\/script")
src = (here / "game.src.html").read_text(encoding="utf-8")
marker = "<script>/*THREE*/</script>"
assert marker in src, "marker missing"
out = src.replace(marker, "<script>\n" + lib + "\n</script>")
# Blender models (assets/*.glb, built by blender/*.py) embedded as base64 so the game stays one file
import base64, json
glb = {p.stem: base64.b64encode(p.read_bytes()).decode() for p in sorted((here / "assets").glob("*.glb"))}
assert "<script>/*GLB*/</script>" in out, "GLB marker missing"
# room picture cards (assets/thumbs/*.jpg, made by tools/make_thumbs.js)
from PIL import Image
import io
thumbs = {}
for p in sorted((here / "assets" / "thumbs").glob("*.jpg")):
    im = Image.open(p).convert("RGB"); im.thumbnail((400, 225)); buf = io.BytesIO(); im.save(buf, "JPEG", quality=70)
    thumbs[p.stem] = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
out = out.replace("<script>/*GLB*/</script>", "<script>window.__GLB=" + json.dumps(glb) + ";window.__THUMBS=" + json.dumps(thumbs) + ";</script>")
(here / "index.html").write_text(out, encoding="utf-8")

print(f"built index.html ({len(out)//1024} KB)")
