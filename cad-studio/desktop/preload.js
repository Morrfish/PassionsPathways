// Lets the page receive part/assembly files opened from Windows (double-click or "Open with").
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('pathwayDesktop', {
  onOpenFile: (cb) => ipcRenderer.on('open-file', (_e, name, text) => cb(name, text)),
  ready: () => ipcRenderer.send('renderer-ready'),
});
