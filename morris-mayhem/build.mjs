// Copies the game into www/ (used by the web page, the Android app and the Windows app).
// The game is plain JavaScript, so there is nothing to compile.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
rmSync('www', { recursive: true, force: true });
mkdirSync('www', { recursive: true });
cpSync('src', 'www', { recursive: true });
console.log('Built www/');
