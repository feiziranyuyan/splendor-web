# 璀璨宝石 (Splendor) - 网页版

一个使用React + TypeScript实现的《璀璨宝石》桌游网页版。

## 游戏简介

《璀璨宝石》是一款策略性的宝石收集和卡牌购买游戏。玩家扮演文艺复兴时期的宝石商人，通过收集宝石筹码购买发展卡牌，积累财富和声望，吸引贵族光临，最终成为最成功的商人。

## 特性

- ✅ 完整的游戏规则实现
- ✅ 支持2-4人游戏
- ✅ AI对手系统（简单难度）
- ✅ 响应式设计（支持桌面端和移动端）
- ✅ 流畅的动画效果
- ✅ 现代化的UI设计

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式方案**: Tailwind CSS 3
- **状态管理**: Zustand
- **动画**: Framer Motion
- **测试**: Vitest + React Testing Library

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm run test
```

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run type-check
```

## 项目结构

```
yjw/
├── .github/workflows/    # GitHub Actions CI/CD
├── public/              # 静态资源
├── src/
│   ├── components/      # React组件
│   │   ├── Game/       # 游戏相关组件
│   │   ├── Board/      # 游戏板面组件
│   │   ├── Card/       # 卡牌组件
│   │   ├── Player/     # 玩家面板组件
│   │   └── UI/         # 通用UI组件
│   ├── game/           # 游戏逻辑层
│   │   ├── core/       # 核心规则引擎
│   │   └── ai/         # AI对手逻辑
│   ├── store/          # Zustand状态管理
│   ├── types/          # TypeScript类型定义
│   ├── utils/          # 工具函数
│   ├── hooks/          # 自定义Hooks
│   ├── constants/      # 游戏常量
│   ├── App.tsx
│   └── main.tsx
├── tests/              # 测试文件
└── docs/               # 文档
```

## 游戏规则

详细游戏规则请查看 [GAME_RULES.md](./GAME_RULES.md)

## 开发指南

### Git提交规范

我们使用约定式提交（Conventional Commits）规范：

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式（不影响逻辑）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链配置

示例：
```bash
git commit -m "feat: 添加游戏结束判定逻辑"
git commit -m "fix: 修复保留卡牌时黄金宝石不足的bug"
```

### 使用Claude Code

本项目支持使用Claude Code进行开发，详见 [claude.md](./claude.md)

### Agent协作

如果需要使用多个Agent协作开发，请参考 [agent.md](./agent.md)

## 待办事项

查看 [TODO.md](./TODO.md) 了解当前的开发计划和待实现功能。

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新历史。

## 部署

本项目使用GitHub Actions自动部署到GitHub Pages。

每次推送到 `main` 分支时，会自动触发构建和部署流程。

访问地址：https://feiziranyuyan.github.io/yjw/

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 作者

- **feiziranyuyan** - [GitHub](https://github.com/feiziranyuyan)

## 致谢

- 游戏规则基于桌游《璀璨宝石》（Splendor）
- 感谢所有贡献者

## 联系方式

如有问题或建议，请通过以下方式联系：

- 邮箱：yujingwen_tj@163.com
- GitHub Issues: https://github.com/feiziranyuyan/yjw/issues

---

Made with ❤️ by feiziranyuyan
