// Desktop shell for Atelier Studio: opens the app in its own window.
// Files are served from a private atelier:// address so the app works offline
// and can use the camera for snapshots.
const { app, BrowserWindow, Menu, protocol, net, dialog, ipcMain, session } = require('electron');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

protocol.registerSchemesAsPrivileged([
  { scheme: 'atelier', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
]);

const ROOT = path.join(__dirname, 'app');
let mainWin = null;
let pending = null; // a .atelier file to open once the page is ready
let pageReady = false;
let allowClose = false;

const fileArg = (argv) => argv.slice(1).find((a) => /\.atelier$/i.test(a) && fs.existsSync(a));
function sendFile(file) {
  if (!file) return;
  if (!pageReady || !mainWin) { pending = file; return; }
  try { mainWin.webContents.send('open-file', path.basename(file), fs.readFileSync(file, 'utf8')); } catch (e) { dialog.showErrorBox('Could not open file', String(e.message || e)); }
}

// One window only: opening another design file sends it to the running app.
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();
app.on('second-instance', (_e, argv) => {
  if (mainWin) { if (mainWin.isMinimized()) mainWin.restore(); mainWin.focus(); }
  sendFile(fileArg(argv));
});
ipcMain.on('renderer-ready', () => { pageReady = true; if (pending) { const f = pending; pending = null; sendFile(f); } });
ipcMain.on('flushed', () => { allowClose = true; if (mainWin) mainWin.close(); });

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 900, minHeight: 600, backgroundColor: '#f4eee7', title: 'Atelier Studio', icon: path.join(ROOT, 'assets', 'icon-256.png'),
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
  // Ask where to save exports and design files (instead of a silent download).
  win.webContents.session.on('will-download', (e, item) => {
    const p = dialog.showSaveDialogSync(win, { defaultPath: item.getFilename() });
    if (p) item.setSavePath(p); else item.cancel();
  });
  // Let the page finish saving the current design before the window closes.
  win.on('close', (e) => {
    if (allowClose || !pageReady) return;
    e.preventDefault();
    win.webContents.send('flush-save');
    setTimeout(() => { allowClose = true; if (!win.isDestroyed()) win.close(); }, 4000);
  });
  win.loadURL('atelier://app/index.html');
  mainWin = win;
}

app.whenReady().then(() => {
  if (!gotLock) return;
  // Camera access is only for the Snapshot button.
  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => cb(permission === 'media' || permission === 'clipboard-read'));
  protocol.handle('atelier', (req) => {
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
