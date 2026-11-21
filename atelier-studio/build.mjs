// Builds the web app into this folder: index.html, app.js, style.css, sw.js, manifest.webmanifest
import * as esbuild from 'esbuild';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';

await esbuild.build({ entryPoints: ['src/app.js'], outfile: 'app.js', bundle: true, format: 'esm', target: 'es2020', minify: true, legalComments: 'eof', logLevel: 'info',
  // jsPDF's HTML and SVG-image helpers are not used; leave their libraries out.
  external: ['html2canvas', 'dompurify', 'canvg'] });
copyFileSync('src/style.css', 'style.css');
copyFileSync('src/index.html', 'index.html');
copyFileSync('src/manifest.webmanifest', 'manifest.webmanifest');
// The offline cache name changes with every build so updates reach people.
const stamp = Date.now().toString(36);
writeFileSync('sw.js', readFileSync('src/sw.js', 'utf8').replace('__BUILD__', stamp));
console.log('Built Atelier Studio.');
