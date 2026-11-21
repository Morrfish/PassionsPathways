// Lets the page receive design files opened from Windows (double-click or "Open with")
// and finish saving before the window closes.
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('atelierDesktop', {
  onOpenFile: (cb) => ipcRenderer.on('open-file', (_e, name, text) => cb(name, text)),
  onFlush: (cb) => ipcRenderer.on('flush-save', () => cb()),
  flushed: () => ipcRenderer.send('flushed'),
  ready: () => ipcRenderer.send('renderer-ready'),
});
