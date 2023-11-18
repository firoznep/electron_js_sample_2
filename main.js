const { app, BrowserWindow, webContents } = require("electron");

let win, childWin, welcomeMessage;

const createMainWindow = () => {
  win = new BrowserWindow({
    icon: "./public/main_logo.ico",
    width: 900,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
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

  win.setBackgroundColor("blueviolet");

  win.loadFile("./public/index.html");

  childWin.loadFile("./public/childindex.html");
  childWin.removeMenu();

  welcomeMessage.loadFile("./public/welcome.html");
  welcomeMessage.removeMenu();
};

app.whenReady().then((val) => {
  createMainWindow();
  // childWin.show();

  welcomeMessage.show();

  setTimeout(() => {
    welcomeMessage.hide();
    welcomeMessage = null;
  }, 5000);

  // console.log(webContents.getFocusedWebContents());

  win.on("blur", (e, param) => {
    childWin.minimize();
  });
  win.on("focus", (e, param) => {
    childWin.hide();
  });
});

app.on("window-all-closed", () => {
  win = null;
});
