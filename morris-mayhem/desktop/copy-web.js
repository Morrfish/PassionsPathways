// Copies the built game (../www) and the icon next to the desktop shell before packaging.
const fs = require('fs'), path = require('path');
const out = path.join(__dirname, 'web');
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.join(__dirname, '..', 'www'), out, { recursive: true });
fs.copyFileSync(path.join(__dirname, '..', 'assets', 'icon-only.png'), path.join(__dirname, 'icon.png'));
console.log('game copied');
