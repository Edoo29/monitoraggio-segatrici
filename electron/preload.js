const { contextBridge, ipcRenderer } = require("electron");
// const Store = require("electron-store");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),
});

contextBridge.exposeInMainWorld("env", {
  platform: process.platform,
});

// const store = new Store();
// contextBridge.exposeInMainWorld("store", {
//   set: (key, value) => store.set(key, value),
//   get: (key) => store.get(key),
// });
