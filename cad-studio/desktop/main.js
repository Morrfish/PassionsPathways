// Desktop shell for Pathway CAD: opens the app in its own window.
// Files are served from a private pcad:// address so the modeling engine
// (a WebAssembly file run in a background worker) can load offline.
const { app, BrowserWindow, Menu, protocol, net, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

protocol.registerSchemesAsPrivileged([
  { scheme: 'pcad', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
]);

const ROOT = path.join(__dirname, 'app');
let mainWin = null;
let pending = null; // a .pcad/.pasm file to open once the page is ready
let pageReady = false;

const fileArg = (argv) => argv.slice(1).find((a) => /\.(pcad|pasm)$/i.test(a) && fs.existsSync(a));
function sendFile(file) {
  if (!file) return;
  if (!pageReady || !mainWin) { pending = file; return; }
  try { mainWin.webContents.send('open-file', path.basename(file), fs.readFileSync(file, 'utf8')); } catch (e) { dialog.showErrorBox('Could not open file', String(e.message || e)); }
}

// One window only: opening another file sends it to the running app.
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();
app.on('second-instance', (_e, argv) => {
  if (mainWin) { if (mainWin.isMinimized()) mainWin.restore(); mainWin.focus(); }
  sendFile(fileArg(argv));
});
ipcMain.on('renderer-ready', () => { pageReady = true; if (pending) { const f = pending; pending = null; sendFile(f); } });

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 980, minHeight: 620, backgroundColor: '#eef1f4', title: 'Pathway CAD', icon: path.join(ROOT, 'assets', 'icon-256.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'preload.js') },
  });
  Menu.setApplicationMenu(null);
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (e) => e.preventDefault());
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') win.setFullScreen(!win.isFullScreen());
    if (input.key === 'F12') win.webContents.toggleDevTools();
  });
  // Ask where to save exports and part files (instead of a silent download).
  win.webContents.session.on('will-download', (e, item) => {
    const p = dialog.showSaveDialogSync(win, { defaultPath: item.getFilename() });
    if (p) item.setSavePath(p); else item.cancel();
  });
  // Warn before closing so unsaved work is not lost by accident.
  win.on('close', (e) => {
    const choice = dialog.showMessageBoxSync(win, { type: 'question', buttons: ['Close', 'Cancel'], defaultId: 1, cancelId: 1, message: 'Close Pathway CAD?', detail: 'Your part is kept on this computer and opens again next time. Use File > Save to keep a copy you can move or hand in.' });
    if (choice === 1) e.preventDefault();
  });
  win.loadURL('pcad://app/index.html');
  mainWin = win;
}

app.whenReady().then(() => {
  if (!gotLock) return;
  protocol.handle('pcad', (req) => {
    const u = new URL(req.url);
    let rel = decodeURIComponent(u.pathname);
    if (!rel || rel === '/') rel = '/index.html';
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT)) return new Response('Not found', { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });
  pending = fileArg(process.argv) || null;
  createWindow();
});
app.on('window-all-closed', () => app.quit());
