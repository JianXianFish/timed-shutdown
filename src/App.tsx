import React, { useState } from "react";
import Timer from "./components/Timer";
import TimeInput from "./components/TimeInput";
import { useTheme } from "./hooks/useTheme";

interface TimerState {
  isRunning: boolean;
  remainingTime: number;
  totalTime: number;
}

function App() {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    remainingTime: 0,
    totalTime: 0,
  });

  const { isDarkTheme, toggleTheme } = useTheme();

  const startTimer = (minutes: number) => {
    const totalSeconds = minutes * 60;
    setTimerState({
      isRunning: true,
      remainingTime: totalSeconds,
      totalTime: totalSeconds,
    });
  };

  const stopTimer = () => {
    // 通知主进程停止Tray倒计时
    window.electronAPI?.stopCountdown();
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      remainingTime: 0,
    }));
  };

  // 窗口拖动功能 - 只在头部区域
  const handleHeaderMouseDown = (_e: React.MouseEvent) => {
    // 通知开始拖动
    (window as any).customAPI.publishMainWindowOperateMessage({
      event: "homeDragWindowStart",
      data: {},
    });

    // 鼠标抬起
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      document.onselectstart = null;
      // 通知结束拖动
      (window as any).customAPI.publishMainWindowOperateMessage({
        event: "homeDragWindowEnd",
        data: {},
      });
    };
  };

  return (
    <div
      className={`fixed inset-0 flex flex-col ${
        isDarkTheme
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      {/* 自定义头部 */}
      <div
        className={`h-7 flex items-center justify-between px-4 ${
          isDarkTheme
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-white/20 backdrop-blur-sm border-b border-white/30"
        }`}
        onMouseDown={handleHeaderMouseDown}
      >
        {/* 左侧标题 */}
        <div className="flex items-center space-x-2"></div>

        {/* 右侧主题切换按钮 */}
        <button
          onClick={toggleTheme}
          className={`p-1 rounded-lg transition-all duration-200 hover:scale-105 ${
            isDarkTheme
              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
              : "bg-white/30 hover:bg-white/50 text-gray-700"
          }`}
        >
          {isDarkTheme ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* 简约背景装饰 - 根据主题调整 */}
        <div className="absolute inset-0">
          {/* 主要装饰元素 */}
          <div
            className={`absolute top-20 left-20 w-32 h-32 rounded-full blur-xl animate-float ${
              isDarkTheme ? "bg-blue-400/20" : "bg-blue-200/30"
            }`}
          ></div>
          <div
            className={`absolute bottom-20 right-20 w-40 h-40 rounded-full blur-xl animate-float-slow delay-1000 ${
              isDarkTheme ? "bg-purple-400/20" : "bg-purple-200/30"
            }`}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-lg animate-scale-gentle ${
              isDarkTheme ? "bg-cyan-400/15" : "bg-cyan-200/20"
            }`}
          ></div>

          {/* 次要装饰元素 */}
          <div
            className={`absolute top-1/4 right-1/4 w-20 h-20 rounded-full blur-lg animate-pulse-gentle delay-300 ${
              isDarkTheme ? "bg-pink-400/15" : "bg-pink-200/20"
            }`}
          ></div>
          <div
            className={`absolute bottom-1/4 left-1/4 w-28 h-28 rounded-full blur-lg animate-float delay-700 ${
              isDarkTheme ? "bg-green-400/15" : "bg-green-200/20"
            }`}
          ></div>
          <div
            className={`absolute top-3/4 left-1/3 w-16 h-16 rounded-full blur-md animate-float-slow delay-1500 ${
              isDarkTheme ? "bg-yellow-400/15" : "bg-yellow-200/20"
            }`}
          ></div>

          {/* 额外的动态元素 */}
          <div
            className={`absolute top-1/3 left-1/6 w-12 h-12 rounded-full blur-md animate-pulse-gentle delay-500 ${
              isDarkTheme ? "bg-indigo-400/10" : "bg-indigo-200/15"
            }`}
          ></div>
          <div
            className={`absolute bottom-1/3 right-1/6 w-18 h-18 rounded-full blur-md animate-float delay-1200 ${
              isDarkTheme ? "bg-orange-400/10" : "bg-orange-200/15"
            }`}
          ></div>
          <div
            className={`absolute top-2/3 right-1/3 w-14 h-14 rounded-full blur-md animate-scale-gentle delay-800 ${
              isDarkTheme ? "bg-teal-400/10" : "bg-teal-200/15"
            }`}
          ></div>
        </div>

        {/* 主容器 - 根据主题调整 */}
        <div
          className={`relative z-10 w-100 rounded-2xl border shadow-xl ${
            isDarkTheme
              ? "bg-gray-800/50 backdrop-blur-md border-gray-700"
              : "bg-white/20 backdrop-blur-md border-white/30"
          }`}
        >
          <div className="p-4">
            <div className="text-center">
              {/* 标题 */}
              <div className="mb-8">
                <h1
                  className={`text-3xl font-light mb-2 ${
                    isDarkTheme ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Mac 关机定时器
                </h1>
                <div
                  className={`w-16 h-0.5 rounded-full mx-auto ${
                    isDarkTheme ? "bg-gray-600" : "bg-gray-300"
                  }`}
                ></div>
              </div>

              {/* 内容区域 - 固定高度 */}
              <div
                className={`rounded-xl py-4 px-5 h-96 flex items-center justify-center`}
              >
                {!timerState.isRunning ? (
                  <TimeInput onStart={startTimer} isDarkTheme={isDarkTheme} />
                ) : (
                  <Timer
                    remainingTime={timerState.remainingTime}
                    totalTime={timerState.totalTime}
                    onStop={stopTimer}
                    isDarkTheme={isDarkTheme}
                  />
                )}
              </div>

              {/* 简约装饰 */}
              <div className="mt-6 flex justify-center space-x-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isDarkTheme ? "bg-gray-500" : "bg-gray-400"
                  }`}
                ></div>
                <div
                  className={`w-1.5 h-1.5 rounded-full animate-pulse delay-300 ${
                    isDarkTheme ? "bg-gray-500" : "bg-gray-400"
                  }`}
                ></div>
                <div
                  className={`w-1.5 h-1.5 rounded-full animate-pulse delay-600 ${
                    isDarkTheme ? "bg-gray-500" : "bg-gray-400"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
