import { spawn } from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
const isMacOS = process.platform === "darwin";

let backendProcess;

function startBackend() {
  const serverPath = app.isPackaged
    ? path.join(process.resourcesPath, "backend/server.js")
    : path.join(__dirname, "../backend/server.js");

  console.log("🚀 BACKEND PATH:", serverPath);

  backendProcess = spawn("node", [serverPath], {
    stdio: "pipe",
    shell: true,
  });

  backendProcess.stdout.on("data", (d) => {
    console.log("[BACKEND]", d.toString());
  });

  backendProcess.stderr.on("data", (d) => {
    console.log("[BACKEND ERROR]", d.toString());
  });

  backendProcess.on("error", (err) => {
    console.log("❌ SPAWN ERROR:", err);
  });

  backendProcess.on("close", (code) => {
    console.log("❌ BACKEND CHIUSO:", code);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    frame: isMacOS ? true : false,
    autoHideMenuBar: true,
    minHeight: 800,
    minWidth: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist/index.html"));
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("window-minimize", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.on("window-maximize", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on("window-close", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

let machineConfig = null;

ipcMain.handle("save-config", async (_, config) => {
  machineConfig = config;
  return true;
});

ipcMain.handle("get-config", async () => {
  return machineConfig;
});

app.on("before-quit", () => {
  if (backendProcess) backendProcess.kill();
});
