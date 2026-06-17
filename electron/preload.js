const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),
});

/* -------------------------
   CONFIG API
--------------------------*/

contextBridge.exposeInMainWorld("api", {
  saveConfig: (config) => ipcRenderer.invoke("save-config", config),
  getConfig: () => ipcRenderer.invoke("get-config"),
});

/* -------------------------
   ENV
--------------------------*/

contextBridge.exposeInMainWorld("env", {
  platform: process.platform,
});
