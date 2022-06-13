// Modules to control application life and create native browser window
const {app, BrowserWindow, nativeImage} = require('electron')
const path = require('path')
const { shell } = require('electron') // comandos com o SO necessitam do módulo shell, me da acesso total ao computador
const {ipcMain} = require('electron') // testando ipcmain responsável pela comunicação back-front
//import { PowerShell } from 'node-powershell';
const {PowerShell} =  require ('node-powershell')
const mail = require ("./sendmail") //função para envio de e-mail
const os = require('os')





// auto atualizar programa
//require('update-electron-app')()   
// inicio forçando update   https://github.com/electron/update-electron-app

/*require('update-electron-app')({
  repo: 'https://github.com/L0tus-Program/Auto-atendimento-desktop-Brasil-dos-Parafusos',
  updateInterval: '5 minutes',
  logger: require('electron-log')
})*/
// fim forçando update


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
  
  if (process.platform !== 'darwin')app.quit()

  //app.hide();    

  
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.




// conexão assincrona com o front
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)

  // Event emitter for sending asynchronous messages
  event.sender.send('asynchronous-reply', 'async comando recebido')
 
  /* exemplo usando lib shell do próprio Electron
  if (arg == "git"){
    shell.openExternal('https://github.com')
  } */
  
  if (arg == "mail"){  
    mail.email(os.hostname()) // enviar como parametro o nome do computador  
  }


  if (arg == "scannow"){
    PowerShell.$`start bats/sfcscannow.bat`
  }
  if (arg == "installsiger"){
    PowerShell.$`start bats/siger.bat`
  }  
  if (arg == "planilhapedidos"){
    shell.openExternal("https://docs.google.com/spreadsheets/d/13-U161yVldPp4D5pjdCQ8EOVb6nAn8Jd/edit?usp=sharing&ouid=109175798814250508218&rtpof=true&sd=true")
  }
  if (arg == "spooler"){
    PowerShell.$`start bats/spooler.bat`
  }
  if (arg == "outlooktravado"){
    PowerShell.$`start bats/outlooktravado.bat`
  }  
  if (arg == "sigertravado"){
    PowerShell.$`start bats/sigertravado.bat`
  }  
  if (arg == "pingserver"){
    pingando()
    
  } 
})


async function pingando () {
  console.log("pingando")
  let ping = await PowerShell.$`ping server`
  if (ping.raw[0]=="A"){ // "A" é a primeira letra do RAW de erro no retorno do comando
      console.log("Servidor não existe")
      mail.email(os.hostname())

  }
  else{
      console.log("Servidor existe")
  }
  
}