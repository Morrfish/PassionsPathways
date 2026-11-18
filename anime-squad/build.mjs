// Builds the app into www/ (used by the web page, the Android app and the desktop app).
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';

rmSync('www', { recursive: true, force: true });
mkdirSync('www', { recursive: true });

await build({
  entryPoints: ['src/app.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['chrome100', 'safari15'],
  outfile: 'www/app.js',
  logLevel: 'info',
});

cpSync('src/index.html', 'www/index.html');
cpSync('src/styles.css', 'www/styles.css');
cpSync('src/icon.png', 'www/icon.png');
cpSync('src/logo.webp', 'www/logo.webp');
console.log('Built www/');
