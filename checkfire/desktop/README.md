# Checkfire desktop (Windows .exe)

Electron wrapper around `../index.html`. Builds a portable 64-bit `Checkfire.exe` on Linux (no wine needed).

```bash
cd checkfire/desktop
cp ../index.html .
npm install --no-audit --no-fund electron@31.7.7 electron-builder@24.13.3 resedit@2.0.3 --save-dev
npx electron-builder --win portable --x64        # -> dist/Checkfire.exe (~73 MB)
zip -9 "Checkfire (Windows).zip" dist/Checkfire.exe
```
- Saves/credits live in `%APPDATA%\Checkfire`, so they survive moving or renaming the exe.
- F11 toggles full screen. Windows SmartScreen: "More info" → "Run anyway" (the exe isn't code-signed).
- Ship the `.zip` (school filters often block raw `.exe` downloads) plus `index.html` for Chromebooks.
