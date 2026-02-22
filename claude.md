## 项目概述

《璀璨宝石》(Splendor) 桌游网页版，使用 React + TypeScript 实现。

**目标**：实现完整的游戏功能，包括本地多人游戏、AI 对手、响应式 UI。

**当前阶段**：核心功能开发中，基础游戏逻辑已完成，正在进行功能完善。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式方案**: Tailwind CSS 3
- **状态管理**: Zustand
- **动画**: Framer Motion
- **测试**: Vitest + React Testing Library

## 代码规范

- TypeScript 严格模式
- ESLint + Prettier 代码格式化
- 约定式提交 (Conventional Commits)

### 目录结构

```
src/
├── components/     # React 组件
│   ├── Game/      # 游戏相关组件
│   ├── Board/     # 游戏板面组件
│   ├── Card/      # 卡牌组件
│   ├── Player/    # 玩家面板组件
│   └── UI/        # 通用 UI 组件
├── game/          # 游戏逻辑层
│   ├── core/      # 核心规则引擎
│   └── ai/        # AI 对手逻辑
├── store/         # Zustand 状态管理
├── types/         # TypeScript 类型定义
├── utils/         # 工具函数
├── hooks/         # 自定义 Hooks
└── constants/     # 游戏常量
```

## /ship 自动化工作流

使用 `/ship` skill 完成完整的开发流程：

```
开发完成 → /ship → 自动执行：
  1. 质量检查 (lint, type-check, test, build)
  2. Self-review
  3. 创建规范的 commit
  4. Push 并创建 PR
  5. 监控 CI
  6. 自动 merge
```

**详细文档**：`.claude/skills/ship/SKILL.md`

## Agent 协作

复杂任务可使用 Team 模式进行多 Agent 并行开发。

**团队成员**：
- Team Lead: 任务分配和协调
- Backend Engineer: 游戏逻辑引擎、AI 系统
- Frontend Engineer: UI 组件、动画效果
- QA Engineer: 测试、质量保证

**任务分配原则**：
1. 独立性 - 减少任务间依赖
2. 并行性 - 可并行任务同时进行
3. 专业性 - 按 Agent 特长分配
4. 责任制 - 明确任务负责人

**Commit 规范**：

```
<type>(<scope>): <subject>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

Type: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore`

## 重要文件

| 文件 | 说明 |
|------|------|
| `GAME_RULES.md` | 游戏规则详细说明 |
| `TODO.md` | 待办事项和开发计划 |
| `.claude/skills/` | Skill 文档目录 |

## 代码审查清单

- [ ] TypeScript 类型正确
- [ ] ESLint + Prettier 格式规范
- [ ] 必要的注释和文档
- [ ] 单元测试覆盖
- [ ] 无明显性能问题
- [ ] 无安全漏洞
