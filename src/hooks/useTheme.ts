import { useState, useEffect, useCallback } from "react";
import { themeManager, Theme } from "../utils/themeUtils";

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(themeManager.getTheme());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 等待主题管理器初始化
    const checkInitialization = () => {
      if (themeManager.isInitialized()) {
        setThemeState(themeManager.getTheme());
        setIsInitialized(true);
      } else {
        // 如果还没初始化，等待一下再检查
        setTimeout(checkInitialization, 100);
      }
    };

    checkInitialization();

    // 监听主题变化
    const removeListener = themeManager.addListener((newTheme) => {
      setThemeState(newTheme);
    });

    // 清理监听器
    return () => {
      removeListener();
    };
  }, []);

  const toggleTheme = useCallback(async () => {
    await themeManager.toggleTheme();
  }, []);

  const setTheme = useCallback(async (newTheme: Theme) => {
    await themeManager.setTheme(newTheme);
  }, []);

  return {
    theme,
    isDarkTheme: theme === "dark",
    toggleTheme,
    setTheme,
    isInitialized,
  };
};
