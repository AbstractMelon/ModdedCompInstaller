document.getElementById('install').addEventListener('click', () => {
    window.electronAPI.installMods();
  });
  
  document.getElementById('remove').addEventListener('click', () => {
    window.electronAPI.removeMods();
  });
  
  document.getElementById('uninstall').addEventListener('click', () => {
    window.electronAPI.uninstallBepinex();
  });
  
  document.getElementById('launch').addEventListener('click', () => {
    window.electronAPI.launchGame();
  });
  