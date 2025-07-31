import React, { useState } from "react";

interface TimeInputProps {
  onStart: (minutes: number) => void;
  isDarkTheme?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
  onStart,
  isDarkTheme = false,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);

  const handleStart = () => {
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes > 0) {
      onStart(totalMinutes);
    }
  };

  const quickPresets = [15, 30, 60, 90, 120, 180];

  return (
    <div className="w-full space-y-2">
      <div className="text-center">
        <div
          className={`text-lg font-medium mb-2 ${
            isDarkTheme ? "text-gray-200" : "text-gray-700"
          }`}
        >
          设置关机时间
        </div>
      </div>

      {/* 时间输入区域 */}
      <div
        className={`rounded-lg p-6 border ${
          isDarkTheme
            ? "bg-gray-600/20 backdrop-blur-sm border-gray-600"
            : "bg-white/20 backdrop-blur-sm border-white/40"
        }`}
      >
        <div className="flex items-center justify-center space-x-6">
          <div className="flex flex-col items-center">
            <label
              className={`text-sm mb-3 font-medium ${
                isDarkTheme ? "text-gray-300" : "text-gray-600"
              }`}
            >
              小时
            </label>
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              className={`w-16 h-12 text-center border rounded-lg text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 ${
                isDarkTheme
                  ? "bg-gray-600/50 border-gray-600 text-gray-200"
                  : "bg-white/50 border-gray-200 text-gray-800"
              }`}
            />
          </div>

          <div
            className={`text-2xl font-light ${
              isDarkTheme ? "text-gray-400" : "text-gray-400"
            }`}
          >
            :
          </div>

          <div className="flex flex-col items-center">
            <label
              className={`text-sm mb-3 font-medium ${
                isDarkTheme ? "text-gray-300" : "text-gray-600"
              }`}
            >
              分钟
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              className={`w-16 h-12 text-center border rounded-lg text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 ${
                isDarkTheme
                  ? "bg-gray-600/50 border-gray-600 text-gray-200"
                  : "bg-white/50 border-gray-200 text-gray-800"
              }`}
            />
          </div>
        </div>
      </div>

      {/* 快捷预设 */}
      <div className="space-y-3">
        <div
          className={`text-sm font-medium text-center ${
            isDarkTheme ? "text-gray-300" : "text-gray-600"
          }`}
        >
          快捷设置
        </div>
        <div className="grid grid-cols-3 gap-3">
          {quickPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setHours(Math.floor(preset / 60));
                setMinutes(preset % 60);
              }}
              className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                isDarkTheme
                  ? "bg-gray-600/40 hover:bg-gray-600/60 border-gray-600 text-gray-300"
                  : "bg-white/40 hover:bg-white/60 border-gray-200 text-gray-700"
              }`}
            >
              {preset}分钟
            </button>
          ))}
        </div>
      </div>

      {/* 开始按钮 */}
      <button
        onClick={handleStart}
        disabled={hours === 0 && minutes === 0}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-lg rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
      >
        <span className="flex items-center justify-center space-x-2">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>开始倒计时</span>
        </span>
      </button>
    </div>
  );
};

export default TimeInput;
