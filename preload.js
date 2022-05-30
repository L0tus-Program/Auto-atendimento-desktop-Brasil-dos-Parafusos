// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


const {ipcRenderer, ipcMain} = require('electron')


function git(){
  ipcRenderer.send('asynchronous-message', 'git')
  
}

function offline(){ //desligar um computador
  ipcRenderer.send('asynchronous-message', 'offline')
}

function restart(){
  ipcRenderer.send('asynchronous-message', 'restart')
}

function outlook(){
  ipcRenderer.send('asynchronous-message', 'outlook')
}

function mail(){
  ipcRenderer.send('asynchronous-message', 'mail')
}

