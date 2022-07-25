// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


const {ipcRenderer, ipcMain} = require('electron')

document.addEventListener('DOMContentLoaded', function() {
  //alert(texto);
  $('#bemvindo').modal('show');
}, false);

/*
function git(){
  ipcRenderer.send('asynchronous-message', 'git')
  
}*/

function offline(){ //desligar um computador
  ipcRenderer.send('asynchronous-message', 'offline')
}



function mail(){
  ipcRenderer.send('asynchronous-message', 'mail')
}

function scannow(){
  ipcRenderer.send('asynchronous-message', 'scannow')
}

function installsiger(){
  ipcRenderer.send('asynchronous-message', 'installsiger')
}


function planilhapedidos(){
  ipcRenderer.send('asynchronous-message', 'planilhapedidos')
}

function spooler(){
  ipcRenderer.send('asynchronous-message', 'spooler')
}

function outlooktravado(){
  ipcRenderer.send('asynchronous-message', 'outlooktravado')
}

function sigertravado(){
  ipcRenderer.send('asynchronous-message', 'sigertravado')
}


this.setInterval(pingando,500000)


function pingando() {
  ipcRenderer.send('asynchronous-message', 'pingserver')
} 