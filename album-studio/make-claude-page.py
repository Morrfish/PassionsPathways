"""Turn album-studio/index.html into the page that gets published inside Claude.

Claude pages are wrapped in their own <html>/<head>/<body>, so this keeps only
the title, the styles and the body content.

    python3 make-claude-page.py index.html out.html
"""
import re
import sys

src, out = sys.argv[1], sys.argv[2]
html = open(src, encoding="utf-8").read()
title = re.search(r"<title>.*?</title>", html, re.S).group(0)
style = re.search(r"<style>.*?</style>", html, re.S).group(0)
body = re.search(r"<body>(.*)</body>", html, re.S).group(1)
open(out, "w", encoding="utf-8").write(
    title + '\n<meta name="claude:viewport-fit-sides" content="cover">\n' + style + body
)
