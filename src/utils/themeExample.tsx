import React from "react";
import { useTheme } from "../hooks/useTheme";

// 示例组件：展示如何使用 Electron 主题功能
export const ThemeExample: React.FC = () => {
  const { theme, isDarkTheme, toggleTheme, setTheme, isInitialized } =
    useTheme();

  if (!isInitialized) {
    return (
      <div className="p-6 rounded-lg border bg-gray-100 text-gray-600">
        <p>正在初始化主题...</p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-lg border ${
        isDarkTheme
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Electron 主题功能示例</h2>

      <div className="space-y-4">
        {/* 当前主题显示 */}
        <div>
          <p className="mb-2">
            当前主题: <span className="font-mono">{theme}</span>
          </p>
          <p className="text-sm opacity-75">
            {isDarkTheme ? "深色主题已启用" : "浅色主题已启用"}
          </p>
        </div>

        {/* 主题切换按钮 */}
        <div className="space-y-2">
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkTheme
                ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            {isDarkTheme ? "🌞 切换到浅色主题" : "🌙 切换到深色主题"}
          </button>
        </div>

        {/* 直接设置主题按钮 */}
        <div className="space-y-2">
          <p className="text-sm opacity-75">直接设置主题:</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setTheme("light")}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                theme === "light"
                  ? "bg-blue-500 text-white"
                  : isDarkTheme
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              浅色
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                theme === "dark"
                  ? "bg-blue-500 text-white"
                  : isDarkTheme
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              深色
            </button>
          </div>
        </div>

        {/* 功能说明 */}
        <div
          className={`mt-6 p-4 rounded-lg text-sm ${
            isDarkTheme
              ? "bg-gray-700/50 border border-gray-600"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <h3 className="font-semibold mb-2">Electron 特性:</h3>
          <ul className="space-y-1 text-xs">
            <li>✅ 使用 electron-store 进行持久化存储</li>
            <li>✅ 通过 IPC 通信与主进程交互</li>
            <li>✅ 自动保存主题选择到应用配置</li>
            <li>✅ 首次使用时检测系统主题偏好</li>
            <li>✅ 实时响应主题变化</li>
            <li>✅ 完整的 TypeScript 类型支持</li>
            <li>✅ 错误处理和容错机制</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 导出默认组件
export default ThemeExample;
