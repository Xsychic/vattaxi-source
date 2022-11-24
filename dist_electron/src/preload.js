const { contextBridge, ipcRenderer } = require('electron');

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        maximise: () => ipcRenderer.send("app/maximise"),
        minimise: () => ipcRenderer.send("app/minimise")
    }
}

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', API);