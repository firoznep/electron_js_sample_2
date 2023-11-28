const {
  app,
  BrowserWindow,
  webContents,
  desktopCapturer,
  ipcMain,
} = require("electron");
const fs = require("node:fs");
const path = require("node:path");

let data = { name: "Khan", age: 12 };

let win, childWin, welcomeMessage;

const createMainWindow = () => {
  win = new BrowserWindow({
    icon: "./public/main_logo.ico",
    width: 900,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();

  childWin = new BrowserWindow({
    parent: win,
    modal: true,
    width: 500,
    height: 300,
    icon: "./public/car_logo.ico",
    show: false,
    resizable: false,
    roundedCorners: true,
  });

  welcomeMessage = new BrowserWindow({
    width: 600,
    height: 80,
    parent: win,
    modal: true,
    show: false,
    resizable: false,
    titleBarStyle: "hidden",
  });

  win.setBackgroundColor("#8a8a8a");

  win.loadFile("./public/index.html");

  childWin.loadFile("./public/child_index.html");
  childWin.removeMenu();

  welcomeMessage.loadFile("./public/welcome.html");
  welcomeMessage.removeMenu();
};

app.whenReady().then((val) => {
  createMainWindow();

  ipcMain.handle("data", () => data);

  // const fileName = "test.md";
  // fs.writeFileSync(fileName, "hello Electron...", () => {
  //   app.addRecentDocument(path.join(__dirname, fileName));
  //   console.log("file created...");
  // });

  // console.log(webContents.getFocusedWebContents());

  win.on("closed", () => {
    win = null;
  });

  childWin.on("closed", () => {
    childWin = null;
  });

  welcomeMessage.on("closed", () => {
    welcomeMessage = null;
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
