# Claude Code 使用与 Agent 协作指南

本文档提供Claude Code开发工具的使用指南，以及多Agent协作开发的最佳实践。

---

## 第一部分：Claude Code 基础

### 什么是Claude Code？

Claude Code是Anthropic提供的官方CLI工具，可以帮助你通过自然语言与Claude AI交互，完成各种开发任务。

### 安装和配置

#### 安装Claude Code

```bash
# 使用npm安装（推荐）
npm install -g @anthropic-ai/claude-code

# 或使用homebrew（macOS）
brew install claude-code
```

#### 配置API Key

```bash
# 设置环境变量
export ANTHROPIC_API_KEY="your-api-key"

# 或在配置文件中设置
claude-code config set apiKey "your-api-key"
```

#### 验证安装

```bash
claude-code --version
```

### 常用命令

```bash
# 启动交互式会话
claude-code

# 查看帮助
/help

# 查看当前任务
/tasks

# 清除对话历史
/clear

# 退出
/exit
```

---

## 第二部分：项目开发工作流

### 基础开发场景

#### 1. 快速原型开发

```
User: 创建一个简单的游戏主界面，包含卡牌区、宝石池、玩家面板
```

Claude会快速生成原型代码，你可以迭代改进。

#### 2. 功能开发

```
User: 实现游戏引擎的卡牌购买功能
```

Claude会：
- 分析需求
- 查看相关代码
- 实现功能
- 编写测试
- 更新文档

#### 3. Bug修复

```
User: 修复保留卡牌时筹码超过10个的bug
```

Claude会：
- 定位问题
- 分析根因
- 提出修复方案
- 实施修复
- 验证修复

#### 4. 代码审查

```
User: 审查src/game/core/GameEngine.ts的代码质量
```

Claude会检查代码规范、发现潜在问题、提出改进建议。

### 高级特性

#### 使用Plan模式

对于复杂任务，让Claude先制定计划：

```
User: /plan 实现完整的AI对手系统
```

Claude会制定详细计划、列出关键步骤、识别风险点，等待你确认后执行。

#### 使用Team模式（多Agent协作）

对于大型任务，可以使用多Agent协作：

```
User: 创建一个开发团队，并行开发游戏引擎和UI
```

Claude会创建团队、分配任务、协调多个Agent、整合结果。

---

## 第三部分：多Agent协作模式

### 团队结构

本项目使用Team模式进行协作，团队成员包括：
- **Team Lead**: 项目负责人，负责任务分配和协调
- **Backend Engineer**: 负责游戏逻辑引擎、AI系统
- **Frontend Engineer**: 负责UI组件、动画效果
- **QA Engineer**: 负责测试、质量保证

### 任务分配原则

1. **独立性**: 尽量分配独立的任务，减少依赖
2. **并行性**: 可以并行执行的任务同时进行
3. **专业性**: 根据Agent特长分配任务
4. **责任制**: 每个任务有明确的负责人

### Agent工作流程

#### 1. 任务认领

```
# 查看可用任务
Use TaskList

# 认领任务
Use TaskUpdate to set owner and status
```

#### 2. 执行任务

按照任务描述完成工作，及时更新进度。

#### 3. 完成任务

```
Use TaskUpdate to mark as completed
```

#### 4. 通知团队

完成后通知team lead或相关成员。

### 通信协议

#### 消息类型

1. **任务完成通知**
```
Task #{id} completed: {task_name}
Details: {completion_details}
Next action: {suggested_next_step}
```

2. **需要帮助**
```
Need help with Task #{id}: {task_name}
Issue: {problem_description}
Blocking: {blocking_reason}
```

3. **阻塞通知**
```
Task #{id} blocked by Task #{blocker_id}
Waiting for: {dependency_description}
```

### 代码协作规范

#### Git分支策略

```
main (生产分支)
  ↑
develop (开发分支)
  ↑
feature/* (功能分支)
```

#### Commit规范

使用约定式提交：

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

**Type类型**:
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档
- `style`: 格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

#### 代码审查清单

- [ ] 代码符合TypeScript类型规范
- [ ] 遵循项目代码风格（ESLint + Prettier）
- [ ] 有必要的注释和文档
- [ ] 有对应的单元测试
- [ ] 测试覆盖率达标（>80%）
- [ ] 无明显的性能问题
- [ ] 无安全漏洞（XSS、注入等）

---

## 第四部分：最佳实践

### 清晰的需求描述

**好的示例**:
```
实现一个函数purchaseCard，接收玩家ID和卡牌ID，
验证购买条件（宝石是否足够），执行购买逻辑
（扣除宝石、添加卡牌、更新点数），返回更新后的游戏状态
```

**不好的示例**:
```
写个购买卡牌的函数
```

### 提供上下文

```
我正在开发璀璨宝石游戏的AI系统。
当前已经实现了简单AI（随机策略），
现在需要实现中等AI，使用评分系统选择最优动作。
评分应考虑：卡牌点数、贵族目标、资源效率。
```

### 指定约束条件

```
实现拿取宝石功能，需要注意：
- 不能拿取黄金宝石
- 拿取2个相同颜色时，该颜色至少要有4个
- 拿取后筹码总数不能超过10个
- 要返回详细的验证错误信息
```

### 迭代改进

```
User: 这个AI决策太慢了，能优化吗？

Claude: [分析性能瓶颈，提出优化方案]

User: 好的，优化后测试一下性能

Claude: [实施优化，运行性能测试，报告结果]
```

---

## 第五部分：项目特定用法

### 游戏规则查询

```
User: 璀璨宝石中，拿取宝石的规则是什么？
```

Claude会查阅GAME_RULES.md并回答。

### 代码生成

```
User: 生成一个宝石筹码的React组件，支持点击选中效果
```

Claude会根据项目技术栈（React + TypeScript + Tailwind）生成符合规范的代码。

### 重构

```
User: 重构GameEngine类，提取验证逻辑到独立模块
```

Claude会分析现有代码、设计重构方案、执行重构、保证功能不变、运行测试验证。

---

## 第六部分：注意事项

### 网络限制

当前环境网络受限，某些操作可能失败：
- 安装npm包
- 访问外部API
- 下载资源文件

**解决方案**: 
- 使用本地资源
- 手动下载后放置
- 使用国内镜像

### Token限制

Claude Code有上下文token限制：
- 单次对话token有限
- 长时间会话会自动摘要
- 大文件分段读取

**建议**:
- 任务拆分为小步骤
- 定期/clear清理上下文
- 避免一次读取太多文件

### 自动化程度

Claude Code很强大，但：
- 复杂决策仍需人工确认
- 关键代码需要审查
- 测试需要验证
- 部署需要人工触发

---

## 第七部分：调试技巧

### 查看Claude的思考过程

```
User: 详细解释你的实现思路
```

### 验证生成的代码

```bash
# 运行类型检查
npm run type-check

# 运行测试
npm run test

# 运行linter
npm run lint
```

### 回滚错误修改

```bash
# 查看修改
git diff

# 撤销修改
git checkout -- <file>

# 或使用Claude
User: 刚才的修改有问题，撤销它
```

---

## 第八部分：常见问题

### Q1: Claude Code无法启动

```bash
# 检查安装
which claude-code

# 重新安装
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

### Q2: API Key问题

```bash
# 验证API Key
echo $ANTHROPIC_API_KEY

# 测试连接
claude-code --test
```

### Q3: 我的任务被阻塞了怎么办？

- 在TaskList中标记blockedBy
- 通知相关的负责人
- 找其他可以执行的任务
- 或协助解决阻塞任务

### Q4: 发现其他人的代码有问题怎么办？

- 确认是否真的是问题
- 通过SendMessage通知负责人
- 如果是紧急问题，通知team lead
- 创建Issue记录问题

---

## 第九部分：参考资源

- [Claude Code官方文档](https://docs.anthropic.com/claude-code)
- [Claude API文档](https://docs.anthropic.com/claude/reference)
- [GitHub仓库](https://github.com/anthropics/claude-code)
- [TypeScript官方文档](https://www.typescriptlang.org/)
- [React官方文档](https://react.dev/)
- [约定式提交规范](https://www.conventionalcommits.org/)

---

## 获取帮助

遇到问题时：

1. 查看`/help`命令输出
2. 阅读官方文档
3. 搜索已知问题
4. 在GitHub提issue
5. 在社区论坛提问

---

**让我们一起打造出色的璀璨宝石网页版！** 💎✨

*Happy Coding with Claude!* 🚀
