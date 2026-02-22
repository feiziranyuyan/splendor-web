# Claude Code 使用指南

本文档介绍如何使用Claude Code开发璀璨宝石项目。

## 什么是Claude Code？

Claude Code是Anthropic提供的官方CLI工具，可以帮助你通过自然语言与Claude AI交互，完成各种开发任务。

## 安装和配置

### 安装Claude Code

```bash
# 使用npm安装（推荐）
npm install -g @anthropic-ai/claude-code

# 或使用homebrew（macOS）
brew install claude-code
```

### 配置API Key

```bash
# 设置环境变量
export ANTHROPIC_API_KEY="your-api-key"

# 或在配置文件中设置
claude-code config set apiKey "your-api-key"
```

### 验证安装

```bash
claude-code --version
```

## 基本用法

### 启动交互式会话

```bash
# 在项目目录下启动
cd /Users/hj/workspace/yjw
claude-code
```

### 常用命令

```bash
# 查看帮助
/help

# 清除对话历史
/clear

# 查看当前任务
/tasks

# 退出
/exit
```

## 项目开发工作流

### 1. 项目初始化

```
User: 帮我初始化一个React + TypeScript + Vite项目
```

Claude会：
- 创建项目结构
- 安装依赖
- 配置开发环境
- 生成初始代码

### 2. 功能开发

```
User: 实现游戏引擎的卡牌购买功能
```

Claude会：
- 分析需求
- 查看相关代码
- 实现功能
- 编写测试
- 更新文档

### 3. Bug修复

```
User: 修复保留卡牌时筹码超过10个的bug
```

Claude会：
- 定位问题
- 分析根因
- 提出修复方案
- 实施修复
- 验证修复

### 4. 代码审查

```
User: 审查src/game/core/GameEngine.ts的代码质量
```

Claude会：
- 检查代码规范
- 发现潜在问题
- 提出改进建议
- 可选：自动修复

### 5. 测试

```
User: 为GameEngine类编写单元测试
```

Claude会：
- 分析代码逻辑
- 设计测试用例
- 编写测试代码
- 运行测试验证

## 高级特性

### 使用Plan模式

对于复杂任务，可以让Claude先制定计划：

```
User: /plan 实现完整的AI对手系统
```

Claude会：
1. 分析需求
2. 制定详细计划
3. 列出关键步骤
4. 识别风险点
5. 等待你确认后执行

### 使用Team模式

对于大型任务，可以使用多Agent协作：

```
User: 创建一个开发团队，并行开发游戏引擎和UI
```

Claude会：
- 创建团队
- 分配任务
- 协调多个Agent
- 整合结果

### 使用技能（Skills）

项目支持的技能：

```bash
# 创建Git提交
/commit

# 审查PR
/review-pr

# 生成PDF文档
/pdf
```

### Context管理

Claude Code会自动管理上下文：

- **自动摘要**: 长对话自动摘要，保持上下文连贯
- **文件缓存**: 频繁访问的文件会被缓存
- **智能读取**: 只读取相关文件，节省token

## 项目特定用法

### 游戏规则查询

```
User: 璀璨宝石中，拿取宝石的规则是什么？
```

Claude会查阅GAME_RULES.md并回答。

### 代码生成

```
User: 生成一个宝石筹码的React组件，支持点击选中效果
```

Claude会：
- 根据项目技术栈（React + TypeScript + Tailwind）
- 遵循项目代码风格
- 生成符合规范的代码

### 重构

```
User: 重构GameEngine类，提取验证逻辑到独立模块
```

Claude会：
- 分析现有代码
- 设计重构方案
- 执行重构
- 保证功能不变
- 运行测试验证

### 文档生成

```
User: 为AI模块生成API文档
```

Claude会：
- 分析代码接口
- 生成详细文档
- 包含示例代码
- 符合JSDoc规范

## 最佳实践

### 1. 清晰的需求描述

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

### 2. 提供上下文

```
我正在开发璀璨宝石游戏的AI系统。
当前已经实现了简单AI（随机策略），
现在需要实现中等AI，使用评分系统选择最优动作。
评分应考虑：卡牌点数、贵族目标、资源效率。
```

### 3. 指定约束条件

```
实现拿取宝石功能，需要注意：
- 不能拿取黄金宝石
- 拿取2个相同颜色时，该颜色至少要有4个
- 拿取后筹码总数不能超过10个
- 要返回详细的验证错误信息
```

### 4. 迭代改进

```
User: 这个AI决策太慢了，能优化吗？

Claude: [分析性能瓶颈，提出优化方案]

User: 好的，优化后测试一下性能

Claude: [实施优化，运行性能测试，报告结果]
```

### 5. 利用已有代码

```
User: 参考Card.tsx的实现方式，创建Noble.tsx组件
```

Claude会：
- 读取Card.tsx
- 理解其设计模式
- 创建风格一致的Noble.tsx

## 常见场景

### 场景1: 快速原型

```
User: 创建一个简单的游戏主界面，包含卡牌区、宝石池、玩家面板
```

Claude会快速生成原型代码，你可以迭代改进。

### 场景2: 学习代码

```
User: 解释GameEngine.executeAction方法的实现逻辑
```

Claude会详细解释代码逻辑，帮助理解。

### 场景3: 排查问题

```
User: 游戏结束判定有bug，有时候没有正确触发，帮我找找问题
```

Claude会：
- 读取相关代码
- 分析逻辑
- 找出bug
- 提供修复

### 场景4: 性能优化

```
User: 游戏在移动端卡顿，帮我优化性能
```

Claude会：
- 分析性能瓶颈
- 优化渲染逻辑
- 添加React.memo
- 优化状态更新

### 场景5: 添加功能

```
User: 添加游戏音效，点击卡牌、购买成功、贵族访问时播放声音
```

Claude会：
- 设计音效系统
- 实现播放逻辑
- 添加静音开关
- 集成到现有代码

## 注意事项

### 1. 网络问题

当前环境网络受限，某些操作可能失败：
- 安装npm包
- 访问外部API
- 下载资源文件

**解决方案**: 
- 使用本地资源
- 手动下载后放置
- 使用国内镜像

### 2. 文件权限

确保Claude Code有读写项目文件的权限：

```bash
# 检查权限
ls -la

# 修改权限（如需要）
chmod -R u+rw .
```

### 3. Git配置

确保Git配置正确：

```bash
# 查看配置
git config --list

# 设置用户信息
git config user.name "feiziranyuyan"
git config user.email "yujingwen_tj@163.com"
```

### 4. Token限制

Claude Code有上下文token限制：
- 单次对话token有限
- 长时间会话会自动摘要
- 大文件分段读取

**建议**:
- 任务拆分为小步骤
- 定期/clear清理上下文
- 避免一次读取太多文件

### 5. 自动化程度

Claude Code很强大，但：
- 复杂决策仍需人工确认
- 关键代码需要审查
- 测试需要验证
- 部署需要人工触发

## 调试技巧

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

## 生产力提示

### 使用快捷命令

创建自定义别名：

```bash
# 在.bashrc或.zshrc中
alias cc="claude-code"
alias ccdev="claude-code"
```

### 保存常用prompt

创建templates文件：

```markdown
# templates/component.md
创建一个React组件{ComponentName}：
- 使用TypeScript
- 使用Tailwind CSS
- 支持{features}
- 包含单元测试
```

### 批量任务

```
User: 依次完成以下任务：
1. 实现数据模型
2. 实现游戏引擎
3. 编写测试
4. 更新文档
```

## 故障排除

### Claude Code无法启动

```bash
# 检查安装
which claude-code

# 重新安装
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

### API Key问题

```bash
# 验证API Key
echo $ANTHROPIC_API_KEY

# 测试连接
claude-code --test
```

### 性能问题

```bash
# 清理缓存
claude-code cache clear

# 减少上下文大小
/clear
```

## 参考资源

- [Claude Code官方文档](https://docs.anthropic.com/claude-code)
- [Claude API文档](https://docs.anthropic.com/claude/reference)
- [GitHub仓库](https://github.com/anthropics/claude-code)
- [社区论坛](https://community.anthropic.com/)

## 获取帮助

遇到问题时：

1. 查看`/help`命令输出
2. 阅读官方文档
3. 搜索已知问题
4. 在GitHub提issue
5. 在社区论坛提问

---

Happy Coding with Claude! 🚀
