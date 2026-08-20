const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopAPI", {
  windowAction: (action) => ipcRenderer.invoke("window-action", action)
});
