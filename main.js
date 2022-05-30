// Modules to control application life and create native browser window
const {app, BrowserWindow, nativeImage} = require('electron')
const path = require('path')
const { shell } = require('electron') // testando shell
const {ipcMain} = require('electron') // testando ipcmain
//import { PowerShell } from 'node-powershell';
const {PowerShell} =  require ('node-powershell')
const mail = require ("./sendmail") //função para envio de e-mail
const os = require('os')


function createWindow () {
  // Create the browser window.
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icone.ico`)
  if (app.dock) {
    app.dock.setIcon(icon)
  }
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    autoHideMenuBar: true,
    icon: icon,
    webPreferences: {
   
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false, // está bloqueando meu jquery -> Devo importar manualmente no func.js ?
      enableRemoteModule: true,
      
    }
    
  })
  

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// auto atualizar programa
require('update-electron-app')()   




ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)

  // Event emitter for sending asynchronous messages
  event.sender.send('asynchronous-reply', 'async pong abrindo github')
  if (arg == "git"){
    shell.openExternal('https://github.com')
  }
  if (arg == "git"){
    shell.openExternal('https://github.com')
  }
  if (arg == "restart"){
    PowerShell.$`start chrome`;  
  }
  if (arg == "outlook"){
    PowerShell.$`start outlook`;  
  }  
  if (arg == "mail"){  
    mail.email(os.hostname()) // enviar como parametro o nome do computador
  }
})

