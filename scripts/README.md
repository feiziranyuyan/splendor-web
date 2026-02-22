# 开发脚本

本目录包含用于简化开发工作流的脚本。

## 🚀 快速开始

### 创建新分支

```bash
./scripts/new-branch.sh <type> <name>
```

**分支类型**：
- `feature` - 新功能
- `fix` - Bug修复
- `docs` - 文档更新
- `refactor` - 代码重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建/配置

**示例**：
```bash
# 创建新功能分支
./scripts/new-branch.sh feature add-player-controls

# 创建修复分支
./scripts/new-branch.sh fix card-display-bug

# 创建文档分支
./scripts/new-branch.sh docs update-api-docs
```

### 创建 Pull Request

完成开发后：

```bash
# 提交更改
git add .
git commit -m "feat: 添加玩家控制功能"

# 创建PR
./scripts/create-pr.sh
```

脚本会：
1. 自动推送分支到远程
2. 根据分支类型生成PR标题
3. 提供PR创建链接

## 📋 完整工作流

```bash
# 1. 创建新分支
./scripts/new-branch.sh feature my-awesome-feature

# 2. 开发...
# 编辑代码

# 3. 运行检查
npm run lint          # 代码检查
npm run type-check    # 类型检查
npm run test          # 运行测试
npm run build         # 验证构建

# 4. 提交更改
git add .
git commit -m "feat(game): 添加新功能"

# 5. 创建PR
./scripts/create-pr.sh

# 6. 在GitHub上完成PR
# - 填写PR描述
# - 等待CI通过
# - 获得Review
# - Rebase合并
```

## 🤖 自动化功能

### GitHub Actions

项目配置了以下自动化流程：

1. **CI测试** (`.github/workflows/test.yml`)
   - 在PR时自动运行
   - 类型检查、Lint、测试、构建

2. **自动部署** (`.github/workflows/deploy.yml`)
   - 合并到main后自动触发
   - 构建并部署到GitHub Pages

3. **自动标签** (`.github/workflows/auto-label.yml`)
   - 根据分支名称和文件变更自动打标签
   - 类型标签：feature, fix, docs等
   - 区域标签：ui, game-logic, ai等

### PR模板

创建PR时会自动加载模板（`.github/pull_request_template.md`），包含：
- 变更说明
- 变更类型选择
- 测试说明
- 检查清单

## 💡 最佳实践

### 提交信息

遵循约定式提交：

```bash
# 新功能
git commit -m "feat(game): 添加暂停功能"

# Bug修复
git commit -m "fix(ai): 修复决策死循环"

# 文档
git commit -m "docs: 更新README安装步骤"

# 重构
git commit -m "refactor(store): 简化状态更新逻辑"
```

### 分支命名

```
feature/add-player-controls
fix/card-display-bug
docs/update-contributing
refactor/simplify-ai-logic
perf/optimize-rendering
test/add-game-engine-tests
chore/update-dependencies
```

### PR大小

- 保持PR小而聚焦（建议 <500行变更）
- 一个PR只做一件事
- 大功能拆分为多个PR

## 🔧 故障排查

### 脚本权限问题

```bash
# 赋予执行权限
chmod +x scripts/*.sh
```

### Git冲突

```bash
# 更新并rebase
git fetch origin
git rebase origin/main

# 解决冲突后
git rebase --continue
git push -f origin <branch-name>
```

### CI失败

```bash
# 本地运行所有检查
npm run lint
npm run type-check
npm run test
npm run build

# 修复问题后重新提交
git add .
git commit --amend --no-edit
git push -f origin <branch-name>
```

## 📚 相关文档

- [贡献指南](../CONTRIBUTING.md)
- [开发文档](../claude.md)
- [GitHub Actions配置](../.github/workflows/)
