const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 175,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('install-mods', async () => {
  const gameDir = path.join(__dirname, 'assets', 'game');
  const pluginsDir = path.join(gameDir, 'BepInEx', 'plugins');
  const modsDir = path.join(__dirname, 'assets', 'mods');

  if (!fs.existsSync(pluginsDir)) {
    fs.mkdirSync(pluginsDir, { recursive: true });
  }

  fs.readdirSync(modsDir).forEach(file => {
    fs.copyFileSync(path.join(modsDir, file), path.join(pluginsDir, file));
  });

  fs.copyFileSync(path.join(__dirname, 'assets', 'bepinex'), path.join(gameDir, 'BepInEx.zip'));
});

ipcMain.handle('remove-mods', async () => {
  const gameDir = path.join(__dirname, 'assets', 'game');
  const pluginsDir = path.join(gameDir, 'BepInEx', 'plugins');
  const backupDir = path.join(__dirname, 'assets', 'backup');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  fs.readdirSync(pluginsDir).forEach(file => {
    fs.renameSync(path.join(pluginsDir, file), path.join(backupDir, file));
  });
});

ipcMain.handle('uninstall-bepinex', async () => {
  const gameDir = path.join(__dirname, 'assets', 'game');
  const bepinexDir = path.join(gameDir, 'BepInEx');

  fs.rmdirSync(bepinexDir, { recursive: true });
});

ipcMain.handle('launch-game', async () => {
  const gameDir = path.join(__dirname, 'assets', 'game');
  const gameExecutable = path.join(gameDir, 'BoplBattle.exe');

  require('child_process').execFile(gameExecutable);
});
