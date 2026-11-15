#!/usr/bin/env python3
"""Build Brinehollow into one self-contained HTML file.

Inlines Three.js r128, its GLTF loader and the Blender models into game.src.html so the game works offline or from a USB drive.

Usage:
    npm pack three@0.128.0 && tar xzf three-0.128.0.tgz
    python3 build.py package
"""
import pathlib
import sys

here = pathlib.Path(__file__).resolve().parent
pkg = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else here / "vendor" / "three")

parts = [pkg / "build/three.min.js", pkg / "examples/js/loaders/GLTFLoader.js"]
lib = "\n;\n".join(q.read_text(encoding="utf-8") for q in parts).replace("</script", "<\\/script")
src = (here / "game.src.html").read_text(encoding="utf-8")
marker = "<script>/*THREE*/</script>"
assert marker in src, "marker missing"
out = src.replace(marker, "<script>\n" + lib + "\n</script>")
# Blender models (assets/*.glb, built by blender/models.py) embedded as base64 so the game stays one file
import base64, json
glb = {q.stem: base64.b64encode(q.read_bytes()).decode() for q in sorted((here / "assets").glob("*.glb"))}
assert "<script>/*GLB*/</script>" in out, "GLB marker missing"
out = out.replace("<script>/*GLB*/</script>", "<script>window.__GLB=" + json.dumps(glb) + ";</script>")
(here / "index.html").write_text(out, encoding="utf-8")
print(f"built index.html ({len(out)//1024} KB)")
