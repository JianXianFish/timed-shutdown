import { contextBridge, ipcRenderer } from "electron";

// 定义 electronAPI 的类型
declare global {
  interface Window {
    electronAPI: {
      shutdown: () => Promise<{ success: boolean; error?: string }>;
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
