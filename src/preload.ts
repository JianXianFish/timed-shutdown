import { contextBridge, ipcRenderer } from "electron";

// 定义 electronAPI 的类型
declare global {
  interface Window {
    electronAPI: {
      shutdown: () => Promise<{ success: boolean; error?: string }>;
      startCountdown: (
        seconds: number
      ) => Promise<{ success: boolean; error?: string }>;
      stopCountdown: () => Promise<{ success: boolean; error?: string }>;
      updateTrayTitle: (
        seconds: number
      ) => Promise<{ success: boolean; error?: string }>;
      getTheme: () => Promise<{
        success: boolean;
        theme: string;
        error?: string;
      }>;
      setTheme: (
        theme: string
      ) => Promise<{ success: boolean; error?: string }>;
    };
    customAPI: {
      publishMainWindowOperateMessage: (info: {
        event: string;
        data: any;
      }) => void;
    };
  }
}

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld("electronAPI", {
  shutdown: () => ipcRenderer.invoke("shutdown"),
  startCountdown: (seconds: number) =>
    ipcRenderer.invoke("startCountdown", seconds),
  stopCountdown: () => ipcRenderer.invoke("stopCountdown"),
  updateTrayTitle: (seconds: number) =>
    ipcRenderer.invoke("updateTrayTitle", seconds),
  getTheme: () => ipcRenderer.invoke("getTheme"),
  setTheme: (theme: string) => ipcRenderer.invoke("setTheme", theme),
});

contextBridge.exposeInMainWorld("customAPI", {
  /**
   * 发布main窗口操作消息
   * @param info {event: 操作类型, data: 参数}
   */
  publishMainWindowOperateMessage: (info: { event: string; data: any }) => {
    ipcRenderer.send("Main_Window_Operate", info);
  },
});
