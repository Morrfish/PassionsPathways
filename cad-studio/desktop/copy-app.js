// Copies the built web app next to the desktop shell before packaging.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..'), out = path.join(__dirname, 'app');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const f of ['index.html', 'app.js', 'worker.js', 'style.css', 'replicad_single.wasm']) {
  if (!fs.existsSync(path.join(src, f))) throw new Error(`Missing ${f}: run "npm run build" in cad-studio first`);
  fs.copyFileSync(path.join(src, f), path.join(out, f));
}
fs.cpSync(path.join(src, 'assets'), path.join(out, 'assets'), { recursive: true });
fs.cpSync(path.join(src, 'licenses'), path.join(__dirname, 'licenses'), { recursive: true });
console.log('app copied');
