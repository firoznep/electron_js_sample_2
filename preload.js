const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("datas", {
  data: () => ipcRenderer.invoke("data"),
});
