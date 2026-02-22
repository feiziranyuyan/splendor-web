# Commit 规范说明

本文档定义了项目的 Git commit 规范，基于约定式提交（Conventional Commits）。

## 基本格式

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## Type 类型

### 主要类型

- **feat**: 新功能（feature）
  - 例：`feat(game): 实现卡牌购买功能`

- **fix**: Bug 修复
  - 例：`fix(ui): 修复保留卡牌时筹码计数错误`

- **docs**: 文档更新
  - 例：`docs: 添加游戏规则说明`

- **refactor**: 代码重构（既不是新功能也不是 bug 修复）
  - 例：`refactor(engine): 提取验证逻辑到独立模块`

### 辅助类型

- **perf**: 性能优化
  - 例：`perf(ai): 优化 AI 决策算法，减少计算时间`

- **test**: 测试相关（添加测试、修复测试）
  - 例：`test(game): 添加卡牌购买边界条件测试`

- **chore**: 构建过程或辅助工具的变动
  - 例：`chore: 更新依赖包版本`

- **style**: 代码格式（不影响代码运行的变动）
  - 例：`style: 格式化代码符合 ESLint 规则`

- **ci**: CI 配置文件和脚本的变动
  - 例：`ci: 添加自动部署 workflow`

## Scope 范围

Scope 表示改动影响的模块或组件，应该简洁明确：

### 常用 Scope

- **game**: 游戏核心逻辑（GameEngine, GameState 等）
- **ui**: UI 组件（GameBoard, Card, GemPool 等）
- **ai**: AI 系统（AIPlayer, 决策算法等）
- **types**: 类型定义
- **utils**: 工具函数
- **docs**: 文档
- **config**: 配置文件
- **test**: 测试文件

### Scope 示例

```
feat(game): 实现宝石拿取功能
fix(ui): 修复卡牌点击事件冒泡
refactor(ai): 重构评分系统
docs(readme): 更新安装说明
```

可以省略 scope 当改动是全局性的：
```
chore: 升级所有依赖到最新版本
docs: 添加快速开始指南
```

## Subject 主题

Subject 是对改动的简短描述：

### 规则

1. **使用祈使句**："添加"而不是"添加了"或"已添加"
2. **首字母小写**（中文除外）
3. **不超过 50 个字符**
4. **结尾不加句号**
5. **清晰准确**：让人一眼看出改动内容

### 好的示例

✅ `feat(game): 实现卡牌购买功能`
✅ `fix(ui): 修复保留卡牌按钮禁用状态`
✅ `refactor(engine): 提取验证逻辑到 Validator 类`
✅ `docs: 添加 AI 系统设计文档`

### 不好的示例

❌ `feat(game): Added card purchase function.` （过去式，有句号）
❌ `fix: bug修复` （不清晰）
❌ `update: 更新了一些代码和修复了几个bug并且添加了新功能` （太长，混合多个改动）
❌ `游戏功能完成` （缺少 type 和格式）

## Body 正文

Body 是可选的，用于详细说明改动内容：

### 何时需要 Body

- 改动较复杂，需要解释"为什么"和"如何"
- 涉及多个文件或模块
- 有重要的技术决策
- 有破坏性变更（BREAKING CHANGE）

### Body 格式

- 每行不超过 72 个字符
- 使用要点列表（bullet points）
- 说明改动的原因和影响
- 与 subject 之间空一行

### Body 示例

```
feat(game): 实现卡牌购买功能

添加 purchaseCard 方法，支持：
- 宝石验证：检查玩家是否有足够宝石
- 折扣计算：根据玩家已有卡牌计算折扣
- 贵族检测：购买后自动检测是否满足贵族条件
- 状态更新：扣除宝石，添加卡牌到玩家手牌

实现了完整的边界条件处理和错误信息返回。

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

```
fix(ui): 修复保留卡牌时筹码超过10个的bug

问题：玩家保留卡牌时，如果原有筹码 + 黄金宝石 > 10，
会导致筹码数量超限。

修复：在 reserveCard 方法中添加筹码数量验证，
如果超限则阻止保留并返回错误信息。

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## 完整示例

### 示例 1：新功能

```
feat(ai): 实现中等难度 AI 决策系统

添加基于评分的 AI 决策算法：
- 卡牌评分：考虑点数、贵族目标、资源效率
- 动作评分：评估拿取宝石、购买卡牌、保留卡牌的价值
- 策略选择：选择评分最高的动作

实现了 3 种评分策略，可通过配置切换。
性能测试显示决策时间 < 100ms。

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### 示例 2：Bug 修复

```
fix(game): 修复贵族检测逻辑错误

问题：玩家购买卡牌后，贵族检测未考虑折扣卡牌，
导致某些情况下无法正确触发贵族拜访。

修复：更新 checkNobles 方法，统计所有已拥有的卡牌
（包括用于折扣的卡牌），正确计算是否满足贵族条件。

添加了 5 个测试用例覆盖边界情况。

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### 示例 3：重构

```
refactor(engine): 提取验证逻辑到独立模块

将 GameEngine 中的所有验证逻辑提取到 Validator 类：
- canTakeGems: 验证拿取宝石规则
- canPurchaseCard: 验证购买卡牌条件
- canReserveCard: 验证保留卡牌条件

优点：
- 单一职责：GameEngine 专注游戏流程
- 易于测试：验证逻辑独立测试
- 复用性：其他模块可复用验证逻辑

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### 示例 4：简单改动

```
docs: 添加快速开始指南

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

```
style: 格式化代码符合 Prettier 规则

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## 自动生成 Commit Message

在 `/ship` workflow 中，Commit message 会自动生成：

### 生成步骤

1. **分析 git diff**：
   ```bash
   git diff --cached --stat
   git diff --cached
   ```

2. **确定 type**：
   - 新增文件/功能 → feat
   - 修改现有功能 → fix 或 refactor
   - 文档改动 → docs
   - 测试改动 → test
   - 配置/工具 → chore

3. **确定 scope**：
   - 分析主要改动的目录/模块
   - 如 src/game/ → game
   - 如 src/components/ → ui

4. **生成 subject**：
   - 总结主要改动内容
   - 保持简洁（< 50 字符）
   - 使用祈使句

5. **生成 body**（如果需要）：
   - 列出关键改动点
   - 说明重要的技术决策
   - 提及测试覆盖情况

6. **添加 Co-Authored-By**

### 生成示例

假设 git diff 显示：
- 新增 `src/game/actions/purchaseCard.ts`
- 修改 `src/game/core/GameEngine.ts`（添加 purchaseCard 方法）
- 新增 `src/game/actions/__tests__/purchaseCard.test.ts`

自动生成的 commit message：
```
feat(game): 实现卡牌购买功能

添加 purchaseCard 动作：
- 验证购买条件（宝石是否足够）
- 计算折扣（基于已有卡牌）
- 执行购买（扣除宝石，添加卡牌）
- 自动检测贵族条件

包含完整的单元测试（覆盖率 95%）。

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## 注意事项

1. **一个 commit 做一件事**：不要在一个 commit 中混合多个不相关的改动
2. **Commit message 要准确**：让人看 message 就知道改了什么
3. **保持一致**：遵循项目约定，保持风格统一
4. **有意义的 commit**：避免 "fix", "update" 这样的无意义 message

## 参考资源

- [约定式提交规范](https://www.conventionalcommits.org/)
- [如何写好 Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)