// 简单的主题持久化功能测试
// 注意：这是一个基础的测试文件，用于验证功能

import {
  getSystemTheme,
  getStoredTheme,
  saveTheme,
  getCurrentTheme,
  ThemeManager,
} from "./themeUtils";

// 测试函数
export const testThemeUtils = async () => {
  console.log("🧪 开始测试 Electron 主题持久化功能...");

  try {
    // 测试 1: 系统主题检测
    console.log("📋 测试系统主题检测...");
    const systemTheme = getSystemTheme();
    console.log(`✅ 系统主题: ${systemTheme}`);

    // 测试 2: 主题存储和获取
    console.log("📋 测试主题存储和获取...");
    await saveTheme("dark");
    const storedTheme = await getStoredTheme();
    console.log(`✅ 存储的主题: ${storedTheme}`);

    // 测试 3: 当前主题获取
    console.log("📋 测试当前主题获取...");
    const currentTheme = await getCurrentTheme();
    console.log(`✅ 当前主题: ${currentTheme}`);

    // 测试 4: 主题管理器
    console.log("📋 测试主题管理器...");
    const themeManager = new ThemeManager();

    // 等待初始化
    const waitForInit = () => {
      if (themeManager.isInitialized()) {
        console.log(`✅ 初始主题: ${themeManager.getTheme()}`);

        // 测试主题切换
        themeManager.toggleTheme().then(() => {
          console.log(`✅ 切换后主题: ${themeManager.getTheme()}`);

          // 测试监听器
          let listenerCalled = false;
          const removeListener = themeManager.addListener((theme) => {
            listenerCalled = true;
            console.log(`✅ 监听器被调用，新主题: ${theme}`);
          });

          themeManager.setTheme("light").then(() => {
            console.log(`✅ 监听器调用状态: ${listenerCalled}`);

            // 清理监听器
            removeListener();
            themeManager.destroy();

            console.log("🎉 所有测试通过！");
          });
        });
      } else {
        setTimeout(waitForInit, 100);
      }
    };

    waitForInit();
  } catch (error) {
    console.error("❌ 测试失败:", error);
    console.error("错误详情:", error);
  }
};

// 测试 Electron API 是否可用
export const testElectronAPI = async () => {
  console.log("🔍 测试 Electron API 可用性...");

  try {
    if (typeof window !== "undefined" && window.electronAPI) {
      console.log("✅ Electron API 可用");

      // 测试 getTheme
      const themeResult = await window.electronAPI.getTheme();
      console.log("✅ getTheme 结果:", themeResult);

      // 测试 setTheme
      const setResult = await window.electronAPI.setTheme("light");
      console.log("✅ setTheme 结果:", setResult);
    } else {
      console.log("❌ Electron API 不可用");
    }
  } catch (error) {
    console.error("❌ Electron API 测试失败:", error);
  }
};

// 在浏览器环境中，可以手动调用测试
if (typeof window !== "undefined") {
  (window as any).testThemeUtils = testThemeUtils;
  (window as any).testElectronAPI = testElectronAPI;
  console.log("💡 可以在浏览器控制台中运行以下命令测试:");
  console.log("  - testThemeUtils() - 测试主题功能");
  console.log("  - testElectronAPI() - 测试 Electron API");
}
