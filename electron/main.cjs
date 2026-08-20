const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#07111f",
    title: "Tormoz sinovi",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, "..", "src", "index.html"));
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
}

ipcMain.handle("window-action", (event, action) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) return false;

  if (action === "toggle-fullscreen") {
    window.setFullScreen(!window.isFullScreen());
    return window.isFullScreen();
  }
  if (action === "quit") {
    window.close();
    return true;
  }
  if (action === "minimize") {
    window.minimize();
    return true;
  }
  return false;
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
