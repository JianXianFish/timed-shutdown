// 主题类型定义
export type Theme = "light" | "dark";

// 获取系统主题偏好
export const getSystemTheme = (): Theme => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

// 从 Electron store 获取主题
export const getStoredTheme = async (): Promise<Theme | null> => {
  if (typeof window === "undefined") return null;

  try {
    const result = await window.electronAPI?.getTheme();
    if (
      result?.success &&
      (result.theme === "dark" || result.theme === "light")
    ) {
      return result.theme as Theme;
    }
    return null;
  } catch (error) {
    console.warn("Failed to read theme from electron-store:", error);
    return null;
  }
};

// 保存主题到 Electron store
export const saveTheme = async (theme: Theme): Promise<void> => {
  if (typeof window === "undefined") return;

  try {
    await window.electronAPI?.setTheme(theme);
  } catch (error) {
    console.warn("Failed to save theme to electron-store:", error);
  }
};

// 获取当前主题（优先使用存储的主题，否则使用系统主题）
export const getCurrentTheme = async (): Promise<Theme> => {
  const storedTheme = await getStoredTheme();
  return storedTheme || getSystemTheme();
};

// 主题管理器类
export class ThemeManager {
  private currentTheme: Theme;
  private listeners: Set<(theme: Theme) => void> = new Set();
  private initialized = false;

  constructor() {
    this.currentTheme = getSystemTheme();
    this.init();
  }

  // 初始化主题管理器
  private async init() {
    try {
      const storedTheme = await getStoredTheme();
      if (storedTheme) {
        this.currentTheme = storedTheme;
      }
      this.applyTheme(this.currentTheme);
      this.initialized = true;
    } catch (error) {
      console.warn("Failed to initialize theme manager:", error);
      this.initialized = true;
    }
  }

  // 获取当前主题
  getTheme(): Theme {
    return this.currentTheme;
  }

  // 切换主题
  async toggleTheme(): Promise<void> {
    const newTheme: Theme = this.currentTheme === "light" ? "dark" : "light";
    await this.setTheme(newTheme);
  }

  // 设置主题
  async setTheme(theme: Theme): Promise<void> {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.applyTheme(theme);
      await saveTheme(theme);
      this.notifyListeners();
    }
  }

  // 应用主题到DOM
  private applyTheme(theme: Theme): void {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }

  // 添加主题变化监听器
  addListener(listener: (theme: Theme) => void): () => void {
    this.listeners.add(listener);
    // 返回移除监听器的函数
    return () => {
      this.listeners.delete(listener);
    };
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentTheme);
      } catch (error) {
        console.warn("Theme listener error:", error);
      }
    });
  }

  // 清理监听器
  destroy(): void {
    this.listeners.clear();
  }

  // 检查是否已初始化
  isInitialized(): boolean {
    return this.initialized;
  }
}

// 创建全局主题管理器实例
export const themeManager = new ThemeManager();

// 导出便捷函数
export const useTheme = () => {
  return {
    theme: themeManager.getTheme(),
    toggleTheme: () => themeManager.toggleTheme(),
    setTheme: (theme: Theme) => themeManager.setTheme(theme),
  };
};
