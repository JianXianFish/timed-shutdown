import { app, BrowserWindow, ipcMain, screen } from "electron";
import { exec } from "child_process";
import path from "path";

let mainWindow: BrowserWindow | null = null;

// 自定义窗口移动类
class CustomWindowMove {
  isOpen: boolean;
  win: BrowserWindow | null;
  winStartPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  startPosition: {
    x: number;
    y: number;
  };

  constructor() {
    this.isOpen = false;
    this.win = null;
    this.winStartPosition = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    this.startPosition = {
      x: 0,
      y: 0,
    };
  }

  init(win: BrowserWindow) {
    this.win = win;
  }

  start() {
    if (!this.win) return;

    this.isOpen = true;
    // 获取当前窗口偏移[x, y]
    const winPosition = this.win.getPosition();
    // 获取当前缩放[width, height]
    const winSize = this.win.getSize();
    this.winStartPosition.x = winPosition[0];
    this.winStartPosition.y = winPosition[1];
    this.winStartPosition.width = winSize[0];
    this.winStartPosition.height = winSize[1];
    // 获取鼠标绝对位置
    const mouseStartPosition = screen.getCursorScreenPoint();
    this.startPosition.x = mouseStartPosition.x;
    this.startPosition.y = mouseStartPosition.y;
    // 开启刷新
    this.move();
  }

  move() {
    if (!this.isOpen || !this.win) {
      return;
    }

    // 如果窗口已销毁
    if (this.win.isDestroyed()) {
      this.end();
      return;
    }
    // 判断窗口是否聚焦
    if (!this.win.isFocused()) {
      this.end();
      return;
    }

    const cursorPosition = screen.getCursorScreenPoint();
    const x = this.winStartPosition.x + cursorPosition.x - this.startPosition.x;
    const y = this.winStartPosition.y + cursorPosition.y - this.startPosition.y;

    // 更新位置的同时设置窗口原大小，防止缩放问题
    this.win.setBounds({
      x: x,
      y: y,
      width: this.winStartPosition.width,
      height: this.winStartPosition.height,
    });

    setTimeout(() => {
      this.move();
    }, 20);
  }

  end() {
    this.isOpen = false;
  }
}

// 创建自定义窗口移动实例
const customWindowMove = new CustomWindowMove();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
    skipTaskbar: false,
    titleBarStyle: "hidden",
    movable: true,
  });

  // 初始化自定义窗口移动
  customWindowMove.init(mainWindow);

  // 开发环境加载本地服务器
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    // 生产环境加载打包后的文件
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 处理关机命令
ipcMain.handle("shutdown", async () => {
  try {
    // 使用 macOS 的 shutdown 命令
    exec("sudo shutdown -h now", (error, stdout, stderr) => {
      if (error) {
        console.error("关机命令执行失败:", error);
        // 如果 sudo 失败，尝试使用 osascript
        exec(
          'osascript -e "tell application \\"System Events\\" to shut down"',
          (error2) => {
            if (error2) {
              console.error("备用关机命令也失败:", error2);
            }
          }
        );
      }
    });
    return { success: true };
  } catch (error) {
    console.error("关机操作失败:", error);
    return { success: false, error: (error as Error).message };
  }
});

// 通信监听 - 使用 on 而不是 handle
ipcMain.on("Main_Window_Operate", (event, info) => {
  const operateEvent = info.event || "";
  switch (operateEvent) {
    // 拖拽窗口-开始
    case "homeDragWindowStart":
      {
        /*
          如果别的窗口也想复用这个自定义拖拽方法可以这么用;
          const webContents = event.sender;
          const win = BrowserWindow.fromWebContents(webContents);
          customWindowMove.init(win);
          customWindowMove.start();
        */
        customWindowMove.start();
      }
      break;
    // 拖拽窗口-结束
    case "homeDragWindowEnd":
      {
        customWindowMove.end();
      }
      break;
    default:
      break;
  }
});
