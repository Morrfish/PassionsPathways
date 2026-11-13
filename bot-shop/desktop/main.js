// Desktop shell for Bot Assembly Shop: opens the game in its own window.
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1366, height: 860, minWidth: 900, minHeight: 600, backgroundColor: '#12161c', title: 'Bot Assembly Shop',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  Menu.setApplicationMenu(null);
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));          // the game never needs another window
  win.webContents.on('will-navigate', e => e.preventDefault());              // and never leaves its own page
  win.webContents.on('before-input-event', (e, input) => { if (input.type === 'keyDown' && input.key === 'F11') win.setFullScreen(!win.isFullScreen()); });
  win.loadFile(path.join(__dirname, 'game', 'index.html'));
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
