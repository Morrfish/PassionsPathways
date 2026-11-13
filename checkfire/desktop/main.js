// Checkfire desktop wrapper (Electron). Loads the self-contained index.html.
const {app,BrowserWindow,Menu}=require('electron');
const path=require('path');
app.setPath('userData',path.join(app.getPath('appData'),'Checkfire'));   // saves + credits survive renames/moves
if(!app.requestSingleInstanceLock()){app.quit();}
let win=null;
app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.focus();}});
app.whenReady().then(()=>{
  Menu.setApplicationMenu(null);
  win=new BrowserWindow({width:1366,height:800,minWidth:960,minHeight:600,backgroundColor:'#f6ead6',title:'Checkfire',
    icon:path.join(__dirname,'icon.png'),autoHideMenuBar:true,webPreferences:{devTools:false,contextIsolation:true,sandbox:true}});
  win.removeMenu();
  win.loadFile(path.join(__dirname,'index.html'));
  win.webContents.on('before-input-event',(e,input)=>{if(input.key==='F11'&&input.type==='keyDown'){win.setFullScreen(!win.isFullScreen());e.preventDefault();}});
});
app.on('window-all-closed',()=>app.quit());
