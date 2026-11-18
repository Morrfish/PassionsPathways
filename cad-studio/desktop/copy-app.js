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
// Installer resources: icon and the license shown during install.
fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
fs.copyFileSync(path.join(src, 'assets', 'icon.ico'), path.join(__dirname, 'build', 'icon.ico'));
fs.writeFileSync(path.join(__dirname, 'build', 'license.txt'),
  'Pathway CAD - a student 3D part modeler by Passions Pathways.\r\n\r\n' +
  'Pathway CAD includes these open-source parts:\r\n' +
  ' - OpenCascade (through replicad-opencascadejs), GNU LGPL 2.1\r\n - replicad, MIT License\r\n - three.js, MIT License\r\n - Electron, MIT License\r\n\r\n' +
  'Their full license texts are installed with the app (licenses folder).\r\n\r\n' +
  'Your parts are kept on this computer. Use File > Save to keep a copy you can move or hand in.\r\n');
console.log('app copied');
