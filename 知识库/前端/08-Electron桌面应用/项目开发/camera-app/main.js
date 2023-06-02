const { app, BrowserWindow } = require("electron");

const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,

    show: true,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    frame: false,
    ...(process.platform === "linux" ? { icon } : {}),

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  console.log("window-all-closed");
  if (process.platform !== "darwin") app.quit();
});
