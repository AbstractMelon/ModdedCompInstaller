const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  installMods: () => ipcRenderer.invoke('install-mods'),
  removeMods: () => ipcRenderer.invoke('remove-mods'),
  uninstallBepinex: () => ipcRenderer.invoke('uninstall-bepinex'),
  launchGame: () => ipcRenderer.invoke('launch-game'),
});
