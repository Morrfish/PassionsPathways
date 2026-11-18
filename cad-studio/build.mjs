// Builds the app into this folder: index.html, app.js, worker.js, style.css, replicad_single.wasm
import * as esbuild from 'esbuild';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';

const common = { bundle: true, format: 'esm', target: 'es2020', minify: true, legalComments: 'eof', logLevel: 'info' };
await esbuild.build({ ...common, entryPoints: ['src/app.js'], outfile: 'app.js' });
await esbuild.build({ ...common, entryPoints: ['src/worker.js'], outfile: 'worker.js', platform: 'browser', external: ['fs', 'path', 'crypto', 'url', 'module', 'worker_threads', 'node:*'] });
copyFileSync('node_modules/replicad-opencascadejs/dist/replicad_single.wasm', 'replicad_single.wasm');
copyFileSync('src/style.css', 'style.css');
writeFileSync('index.html', readFileSync('src/index.html', 'utf8'));
console.log('Built Pathway CAD.');
