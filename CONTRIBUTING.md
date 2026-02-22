# 贡献指南

感谢您对璀璨宝石项目的关注！本文档说明如何为项目做出贡献。

## 🚀 快速开始

### 1. Fork 和 Clone

```bash
# Fork 项目到你的账户，然后 clone
git clone git@github.com:your-username/splendor-web.git
cd splendor-web

# 添加上游仓库
git remote add upstream git@github.com:feiziranyuyan/splendor-web.git
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

## 📝 开发流程

### 分支策略

- `main` - 生产分支，受保护，只能通过 PR 合并
- `develop` - 开发分支（未来可能使用）
- `feature/*` - 功能分支
- `fix/*` - 修复分支
- `refactor/*` - 重构分支
- `docs/*` - 文档分支

### 创建新分支

```bash
# 同步主分支
git checkout main
git pull upstream main

# 创建功能分支
git checkout -b feature/your-feature-name

# 或修复分支
git checkout -b fix/issue-description
```

### 提交规范

使用 [约定式提交](https://www.conventionalcommits.org/zh-hans/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型**：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构（不增加功能也不修复 bug）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI 配置文件和脚本的变动

**示例**：
```bash
git commit -m "feat(game): 添加游戏暂停功能"
git commit -m "fix(ai): 修复AI决策时的空指针错误"
git commit -m "docs: 更新安装说明"
```

## 🔄 Pull Request 流程

### 1. 推送分支

```bash
git push origin feature/your-feature-name
```

### 2. 创建 Pull Request

1. 访问 GitHub 仓库页面
2. 点击 "Compare & pull request"
3. 填写 PR 标题和描述

**PR 标题格式**：
```
[Feature] 添加游戏暂停功能
[Fix] 修复AI决策错误
[Docs] 更新贡献指南
```

**PR 描述模板**：
```markdown
## 变更说明
简要描述这个 PR 做了什么

## 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他

## 测试
说明如何测试这些变更

## 截图（如果适用）
添加截图帮助理解变更

## 相关 Issue
Closes #issue_number
```

### 3. 等待 CI 通过

PR 创建后会自动触发 CI 测试：
- ✅ TypeScript 类型检查
- ✅ ESLint 代码检查
- ✅ 单元测试
- ✅ 构建验证

**只有 CI 全部通过才能合并！**

### 4. Code Review

- 至少需要 1 个 approving review
- 解决所有 review comments
- 保持 PR 小而聚焦（建议 <500 行变更）

### 5. 合并方式

**必须使用 Rebase 方式合并！**

合并前确保：
```bash
# 更新你的分支
git checkout feature/your-feature-name
git fetch upstream
git rebase upstream/main

# 解决冲突（如果有）
# 然后强制推送
git push -f origin feature/your-feature-name
```

在 GitHub 上合并时选择：
- ✅ **Rebase and merge** （必须）
- ❌ ~~Create a merge commit~~
- ❌ ~~Squash and merge~~

## ✅ 代码质量要求

### 运行检查

提交前务必运行：

```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 自动修复代码风格
npm run lint:fix

# 运行测试
npm run test

# 构建验证
npm run build
```

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 所有函数和复杂逻辑需要注释
- 组件使用 JSDoc 注释说明 props

### 测试要求

- 核心逻辑必须有单元测试
- 测试覆盖率 >80%
- 测试应该清晰、可维护

## 📋 常见任务

### 添加新功能

1. 在 `TODO.md` 中规划功能
2. 创建 `feature/*` 分支
3. 实现功能 + 测试
4. 更新文档
5. 提交 PR

### 修复 Bug

1. 在 GitHub Issues 创建 bug 报告
2. 创建 `fix/*` 分支
3. 修复 + 添加测试防止回归
4. 提交 PR，引用 issue

### 更新文档

1. 创建 `docs/*` 分支
2. 更新相关文档
3. 提交 PR

## 🎯 开发建议

### 保持小步前进

- 每个 PR 聚焦一个功能或修复
- 避免大规模重构和功能混合
- 频繁提交，清晰的提交信息

### 积极沟通

- 不确定时先创建 Issue 讨论
- 大功能前先提交设计文档
- 及时回复 review comments

### 测试驱动

- 先写测试，再写实现
- 保证测试覆盖率
- 测试应该快速、稳定

## 🐛 报告问题

### Bug 报告

使用 [Bug Report 模板](https://github.com/feiziranyuyan/splendor-web/issues/new)

必须包含：
- 问题描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息（浏览器、OS 等）
- 截图或视频

### 功能请求

使用 [Feature Request 模板](https://github.com/feiziranyuyan/splendor-web/issues/new)

必须包含：
- 功能描述
- 使用场景
- 期望效果
- 可选的实现建议

## 📚 资源

- [项目文档](./README.md)
- [游戏规则](./GAME_RULES.md)
- [开发指南](./claude.md)
- [待办事项](./TODO.md)
- [更新日志](./CHANGELOG.md)

## 🙏 致谢

感谢所有贡献者让这个项目变得更好！

---

**有问题？** 在 [Discussions](https://github.com/feiziranyuyan/splendor-web/discussions) 中提问！
