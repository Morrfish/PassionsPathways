// Copies the game files next to the desktop shell before packaging.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..'), out = path.join(__dirname, 'game');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'js'), { recursive: true });
fs.copyFileSync(path.join(src, 'index.html'), path.join(out, 'index.html'));
for (const f of fs.readdirSync(path.join(src, 'js'))) fs.copyFileSync(path.join(src, 'js', f), path.join(out, 'js', f));
console.log('game copied');
