# Agent 协作指南

本文档提供了使用多个Agent协作开发璀璨宝石项目的指南。

## 协作模式

### 团队结构

我们使用Team模式进行协作，团队成员包括：
- **Team Lead**: 项目负责人，负责任务分配和协调
- **Backend Engineer**: 负责游戏逻辑引擎、AI系统
- **Frontend Engineer**: 负责UI组件、动画效果
- **QA Engineer**: 负责测试、质量保证

### 任务分配原则

1. **独立性**: 尽量分配独立的任务，减少依赖
2. **并行性**: 可以并行执行的任务同时进行
3. **专业性**: 根据Agent特长分配任务
4. **责任制**: 每个任务有明确的负责人

## 工作流程

### 1. 项目初始化阶段

**Team Lead**:
- 创建团队和任务列表
- 设置Git仓库
- 创建项目文档
- 初始化项目脚手架

### 2. 核心开发阶段

**Backend Engineer**:
- 定义数据模型（types/）
- 实现游戏引擎（game/core/）
- 实现AI系统（game/ai/）
- 编写单元测试

**Frontend Engineer**:
- 开发UI组件（components/UI/）
- 实现游戏界面（components/Game/）
- 添加动画效果
- 实现响应式设计

**Team Lead**:
- 实现状态管理（store/）
- 集成后端和前端
- 配置CI/CD

### 3. 测试和优化阶段

**QA Engineer**:
- 编写集成测试
- 执行功能测试
- 性能测试
- 浏览器兼容性测试

**Team Lead**:
- 代码审查
- 修复bug
- 性能优化
- 文档完善

## 任务依赖关系

```
初始化Git仓库 (Task #1)
    ↓
创建项目文档 (Task #2)
    ↓
初始化Vite项目 (Task #3)
    ↓
    ├─→ 配置CI/CD (Task #4)
    ├─→ 实现数据模型 (Task #5)
    │       ↓
    │   创建游戏常量 (Task #6)
    │       ↓
    │   实现游戏引擎 (Task #7)
    │       ↓
    │   实现AI (Task #8)
    │       ↓
    └───────┴─→ 实现状态管理 (Task #9)
                    ↓
            开发UI组件 (Task #10)
                    ↓
            集成测试 (Task #11)
```

## 通信协议

### 消息类型

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

4. **问题报告**
```
Issue found in {component/file}
Description: {issue_description}
Severity: [Low/Medium/High/Critical]
```

### 沟通最佳实践

1. **明确性**: 消息清晰、具体，包含必要的上下文
2. **及时性**: 遇到阻塞或问题立即报告
3. **建设性**: 提出问题时建议解决方案
4. **文档化**: 重要决策记录在文档中

## 代码协作规范

### Git分支策略

```
main (生产分支)
  ↑
develop (开发分支)
  ↑
feature/* (功能分支)
  ├─ feature/game-engine
  ├─ feature/ui-components
  └─ feature/ai-system
```

### Commit规范

使用约定式提交：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type类型**:
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档
- `style`: 格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

**示例**:
```
feat(game-engine): implement card purchase logic

- Add purchaseCard function
- Validate gem costs with bonuses
- Handle gold gem as wildcard
- Update player state after purchase

Closes #5
```

### 代码审查清单

- [ ] 代码符合TypeScript类型规范
- [ ] 遵循项目代码风格（ESLint + Prettier）
- [ ] 有必要的注释和文档
- [ ] 有对应的单元测试
- [ ] 测试覆盖率达标（>80%）
- [ ] 无明显的性能问题
- [ ] 无安全漏洞（XSS、注入等）

## 任务认领流程

### 1. 查看可用任务

```
Use TaskList to see all pending tasks
```

### 2. 选择任务

选择符合以下条件的任务：
- `status: pending`
- `owner: null`（无人认领）
- `blockedBy: []`（无依赖）

### 3. 认领任务

```
Use TaskUpdate to set owner and status
{
  "taskId": "5",
  "owner": "backend-engineer",
  "status": "in_progress"
}
```

### 4. 执行任务

按照任务描述完成工作，及时更新进度。

### 5. 完成任务

```
Use TaskUpdate to mark as completed
{
  "taskId": "5",
  "status": "completed"
}
```

### 6. 通知团队

完成后通知team lead或相关成员。

## 冲突解决

### 代码冲突

1. 及时pull最新代码
2. 使用rebase而非merge保持历史清晰
3. 冲突时与相关开发者沟通
4. 测试通过后再推送

### 设计冲突

1. 在任务开始前确认设计
2. 有疑问及时在团队中讨论
3. 重大决策需team lead确认
4. 记录决策理由

### 优先级冲突

1. 关键路径任务优先
2. 阻塞他人的任务优先
3. 有疑问找team lead协调

## 质量保证

### 自测清单

开发完成后，自行检查：

- [ ] 功能正常工作
- [ ] 边界情况处理
- [ ] 错误处理完善
- [ ] 性能可接受
- [ ] 代码风格一致
- [ ] 注释清晰
- [ ] 测试通过

### 集成测试

QA Engineer执行：

- [ ] 功能测试
- [ ] 回归测试
- [ ] 性能测试
- [ ] 兼容性测试
- [ ] 可访问性测试

## 工具和环境

### 必需工具

- Node.js >= 18.0.0
- Git
- Code Editor (推荐VSCode)

### 推荐扩展（VSCode）

- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- GitLens

### 环境配置

确保本地环境配置正确：

```bash
# 检查Node版本
node --version  # >= 18.0.0

# 检查npm版本
npm --version   # >= 9.0.0

# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 运行测试
npm run test
```

## 常见问题

### Q1: 我的任务被阻塞了怎么办？

A: 
1. 在TaskList中标记blockedBy
2. 通知相关的负责人
3. 找其他可以执行的任务
4. 或协助解决阻塞任务

### Q2: 发现其他人的代码有问题怎么办？

A:
1. 确认是否真的是问题
2. 通过SendMessage通知负责人
3. 如果是紧急问题，通知team lead
4. 创建Issue记录问题

### Q3: 需要修改其他人负责的代码怎么办？

A:
1. 先和负责人沟通
2. 确认修改方案
3. 获得同意后进行
4. 修改后通知相关人员

### Q4: 任务估时不准确怎么办？

A:
1. 及时更新任务进度
2. 如果发现严重延迟，立即通知team lead
3. 说明原因和新的预计完成时间
4. 必要时寻求帮助

### Q5: 与团队成员意见不一致怎么办？

A:
1. 理性讨论各自观点
2. 基于技术和项目目标做决策
3. 如果无法达成一致，请team lead裁决
4. 尊重最终决定并执行

## 最佳实践总结

1. **主动沟通**: 不要等问题严重才报告
2. **文档优先**: 重要信息记录在文档中
3. **测试驱动**: 先写测试，再写代码
4. **小步快跑**: 频繁提交，小步迭代
5. **代码审查**: 认真审查，虚心接受
6. **持续学习**: 学习新技术，提升能力
7. **团队协作**: 互相帮助，共同进步

## 参考资源

- [TypeScript官方文档](https://www.typescriptlang.org/)
- [React官方文档](https://react.dev/)
- [Vite官方文档](https://vitejs.dev/)
- [Tailwind CSS文档](https://tailwindcss.com/)
- [约定式提交规范](https://www.conventionalcommits.org/)

---

让我们一起打造出色的璀璨宝石网页版！💎✨
