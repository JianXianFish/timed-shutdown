import React, { useEffect, useState } from "react";
import { formatTime, formatProgress } from "../utils/timeUtils";

interface TimerProps {
  remainingTime: number;
  totalTime: number;
  onStop: () => void;
  isDarkTheme?: boolean;
}

const Timer: React.FC<TimerProps> = ({
  remainingTime,
  totalTime,
  onStop,
  isDarkTheme = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      // 执行关机操作
      window.electronAPI?.shutdown();
      return;
    }

    if (!isPaused) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // 执行关机操作
            window.electronAPI?.shutdown();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isPaused]);

  const progress = formatProgress(timeLeft, totalTime);
  const isWarning = timeLeft <= 60; // 最后1分钟显示警告

  return (
    <div className="w-full space-y-6">
      {/* 倒计时显示 */}
      <div className="text-center">
        <div className="mb-6">
          <div
            className={`text-sm font-medium mb-2 ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`}
          >
            剩余时间
          </div>
          <div
            className={`text-5xl font-light mb-4 transition-all duration-300 ${
              isWarning
                ? "text-red-500"
                : isDarkTheme
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* 进度条 */}
        <div className="space-y-3">
          <div
            className={`flex justify-between text-sm ${
              isDarkTheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <span>进度</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            className={`w-full h-2 rounded-full overflow-hidden ${
              isDarkTheme ? "bg-gray-600" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isWarning ? "bg-red-400" : "bg-blue-400"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`py-3 px-4 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 ${
            isPaused
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isPaused ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
            <span>{isPaused ? "继续" : "暂停"}</span>
          </span>
        </button>

        <button
          onClick={onStop}
          className="py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 active:scale-95"
        >
          <span className="flex items-center justify-center space-x-2">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>取消定时</span>
          </span>
        </button>
      </div>

      {/* 警告信息 */}
      {isWarning && (
        <div className="text-center">
          <div
            className={`border rounded-lg p-4 ${
              isDarkTheme
                ? "bg-red-900/50 border-red-700"
                : "bg-red-100 border-red-200"
            }`}
          >
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span className="text-sm font-medium">即将关机！</span>
            </div>
            <div className="text-red-500 text-xs mt-1">请及时保存工作</div>
          </div>
        </div>
      )}

      {/* 状态指示器 - 光韵呼吸灯效果 */}
      <div className="flex justify-center space-x-2 items-center">
        <div className="relative">
          {/* 外层光晕 */}
          <div
            className={`absolute inset-0 rounded-full ${
              isPaused
                ? "bg-yellow-400 opacity-10"
                : "bg-green-400 animate-breathing-glow-green"
            }`}
          ></div>
          {/* 内层核心 */}
          <div
            className={`relative w-2 h-2 rounded-full ${
              isPaused
                ? "bg-yellow-400 opacity-60"
                : "bg-green-400 animate-breathing-light-green"
            }`}
          ></div>
        </div>
        <div
          className={`text-xs ${
            isDarkTheme ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {isPaused ? "已暂停" : "运行中"}
        </div>
      </div>
    </div>
  );
};

export default Timer;
