// Copies the built web app next to the desktop shell before packaging.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..'), out = path.join(__dirname, 'app');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const f of ['index.html', 'app.js', 'style.css', 'manifest.webmanifest']) {
  if (!fs.existsSync(path.join(src, f))) throw new Error(`Missing ${f}: run "npm run build" in atelier-studio first`);
  fs.copyFileSync(path.join(src, f), path.join(out, f));
}
fs.cpSync(path.join(src, 'assets'), path.join(out, 'assets'), { recursive: true });
fs.cpSync(path.join(src, 'licenses'), path.join(__dirname, 'licenses'), { recursive: true });
// Installer resources: icon and the license shown during install.
fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
fs.copyFileSync(path.join(src, 'assets', 'icon.ico'), path.join(__dirname, 'build', 'icon.ico'));
fs.writeFileSync(path.join(__dirname, 'build', 'license.txt'),
  'Atelier Studio - sketch, color and see fashion designs in 3D. By Passions Pathways.\r\n\r\n' +
  'Atelier Studio includes these open-source parts:\r\n' +
  ' - three.js, MIT License\r\n - jsPDF, MIT License\r\n - fflate, MIT License\r\n - Gradio JavaScript client, ISC License\r\n - Electron, MIT License\r\n\r\n' +
  'Their full license texts are installed with the app (licenses folder).\r\n\r\n' +
  'Your designs are kept on this computer. Use "Save design file" to keep a copy you can move to another computer.\r\n');
console.log('app copied');
