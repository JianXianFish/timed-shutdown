# Mac 关机定时器

一个基于 Electron + React + TailwindCSS 开发的 Mac 关机定时器应用。

## 功能特性

- ⏰ 设置关机倒计时时间
- 🎨 现代化的毛玻璃界面设计
- 🎭 丰富的动画效果
- 🖱️ 可拖拽的窗口
- ⏸️ 支持暂停/继续倒计时
- ❌ 可随时取消定时
- 🔄 自动执行关机操作
- 📱 适配 macOS 系统

## 技术栈

- **Electron**: 跨平台桌面应用框架
- **React 18**: 用户界面库
- **TypeScript**: 类型安全的 JavaScript
- **TailwindCSS**: 实用优先的 CSS 框架
- **Vite**: 快速的前端构建工具

## 开发环境

### 系统要求

- macOS 10.14 或更高版本
- Node.js 16 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

这将启动开发服务器和 Electron 应用。

### 构建应用

```bash
# 构建生产版本
npm run build

# 构建并打包为 macOS 应用
npm run dist
```

## 使用说明

1. **启动应用**: 运行 `npm run dev` 启动开发模式
2. **设置时间**: 在界面中输入小时和分钟，或选择预设时间
3. **开始倒计时**: 点击"开始倒计时"按钮
4. **暂停/继续**: 在倒计时过程中可以暂停或继续
5. **取消定时**: 点击"取消定时"按钮停止倒计时
6. **拖拽窗口**: 可以拖拽窗口到任意位置

## 项目结构

```
├── src/
│   ├── components/     # React 组件
│   │   ├── Timer.tsx      # 倒计时组件
│   │   └── TimeInput.tsx  # 时间输入组件
│   ├── utils/         # 工具函数
│   │   └── timeUtils.ts   # 时间格式化工具
│   ├── App.tsx        # 主应用组件
│   ├── main.tsx       # React 入口
│   ├── main.ts        # Electron 主进程
│   ├── preload.ts     # 预加载脚本
│   └── index.css      # 全局样式
├── public/            # 静态资源
├── assets/            # 应用资源
└── dist/              # 构建输出
```

## 安全说明

- 应用使用 Electron 的 contextIsolation 确保安全性
- 关机操作通过 IPC 通信进行，避免直接暴露系统 API
- 使用 macOS 内置的关机命令，无需额外权限

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
