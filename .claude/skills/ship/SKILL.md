---
name: ship
description: Automated workflow - commit, review, PR, CI, merge
disable-model-invocation: false
argument-hint: [task-description]
allowed-tools:
  - Bash(git *)
  - Bash(gh *)
  - Bash(npm run *)
  - Read
  - Edit
  - Write
  - Grep
  - Glob
---

# /ship - 自动化提交、Review、PR、Merge 完整流程

这是一个完全自动化的工作流，用于在开发任务完成后，自动完成从代码提交到 PR 合并的全流程。

## 工作流程

### 1. 检查当前状态

首先检查 git 状态和改动：

```bash
git status
git diff --stat
git diff origin/main...HEAD --stat
```

如果有未提交的改动，继续流程。如果没有改动，提示用户。

### 2. 暂存所有改动

```bash
git add -A
```

### 3. 运行质量检查

按顺序运行所有检查，如果任何一个失败则停止：

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

**如果检查失败**：
- 分析错误信息
- 自动修复问题（如果可以）
- 重新暂存并重新运行检查
- 循环直到所有检查通过

### 4. Self-Review 代码

使用 `review.md` 中的检查清单审查代码：
- 读取所有改动的文件
- 对照检查清单逐项检查
- 发现问题则自动修复

**文档检查**：
- 分析代码改动是否需要更新文档
- 检查相关 MD 文件是否已更新
- 如果发现文档缺失或过时，自动更新

**Review 循环**：
```
while (发现问题):
    修复代码/更新文档
    git add -A
    重新运行 quality checks
    重新 review
```

### 5. 创建规范 Commit

使用 `commit.md` 中的规范创建 commit：

```bash
# 分析改动内容
git diff --cached

# 生成符合约定式提交的 commit message
# 格式：<type>(<scope>): <subject>
#
# <body>
#
# Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

git commit -m "$(cat <<'EOF'
<generated-commit-message>
EOF
)"
```

**Commit Message 生成逻辑**：
- 分析 git diff 确定改动类型（feat/fix/docs/refactor 等）
- 识别改动范围（scope）
- 生成简洁准确的描述（subject）
- 在 body 中列出关键改动点
- 自动添加 Co-Authored-By

### 6. Squash 所有 Commits 为一个

如果当前分支有多个 commit，squash 成一个：

```bash
COMMIT_COUNT=$(git rev-list --count origin/main..HEAD)
if [ $COMMIT_COUNT -gt 1 ]; then
    # 获取第一个 commit message 作为最终 message
    FIRST_MSG=$(git log --format=%B origin/main..HEAD | tail -n +1)

    # Soft reset 到 main
    git reset --soft origin/main

    # 重新 commit
    git commit -m "$FIRST_MSG"
fi
```

### 7. Push 并创建 PR

```bash
# 获取当前分支名
BRANCH=$(git branch --show-current)

# Push 到远程
git push -u origin $BRANCH

# 创建 PR（如果不存在）
if ! gh pr view &>/dev/null; then
    # 生成 PR 标题和描述
    # 标题：commit message 的第一行
    # 描述：使用 PR 模板，填充改动信息

    gh pr create \
        --title "$(git log -1 --pretty=%s)" \
        --body "$(generate_pr_body)"
fi
```

**PR Body 生成逻辑**：
- 使用 `.github/pull_request_template.md` 作为模板
- 填充 Summary（基于 commit message）
- 列出改动的文件和关键点
- 添加测试说明

### 8. 监控 CI

```bash
# 等待 CI 开始运行
sleep 5

# 监控 CI 状态
gh pr checks --watch
```

**如果 CI 失败**：
1. 获取失败日志：`gh pr checks --web`
2. 分析失败原因（参考 `ci.md`）
3. 本地修复并验证
4. Amend commit：`git commit --amend --no-edit`
5. Force push：`git push -f`
6. 重新监控 CI

### 9. 自动 Merge

CI 通过后自动 merge：

```bash
# Rebase 并删除分支
gh pr merge --rebase --delete-branch --auto
```

### 10. 清理

```bash
# 切回 main
git checkout main

# Pull 最新代码
git pull

# 删除本地分支（如果还存在）
git branch -d $BRANCH 2>/dev/null || true
```

## 错误处理

### Quality Checks 失败

- **Lint 错误**：运行 `npm run lint -- --fix` 自动修复
- **Type 错误**：分析错误信息，手动修复类型问题
- **Test 失败**：分析失败用例，修复逻辑或测试
- **Build 失败**：分析构建错误，修复问题

### CI 失败

参考 `ci.md` 进行诊断和修复。

### PR 冲突

```bash
# 更新 main
git fetch origin main

# Rebase
git rebase origin/main

# 解决冲突后
git add -A
git rebase --continue

# Force push
git push -f
```

## 使用示例

### 基本用法

```
User: 我完成了卡牌购买功能的开发

Claude: [运行 /ship]
1. ✅ 检查改动：发现 3 个文件修改
2. ✅ 质量检查：lint, type-check, test, build 全部通过
3. ✅ Self-review：无问题
4. ✅ 创建 commit：feat(game): 实现卡牌购买功能
5. ✅ Push 并创建 PR：PR #123
6. ✅ 监控 CI：等待检查完成...
7. ✅ CI 通过
8. ✅ 自动 Merge：已合并并删除分支
9. ✅ 清理：回到 main 分支
```

### 带修复的用法

```
User: /ship

Claude:
1. ✅ 检查改动：发现 5 个文件修改
2. ❌ Lint 失败：发现 3 个格式问题
   - 自动修复：运行 npm run lint -- --fix
   - ✅ 重新检查：通过
3. ✅ Type-check 通过
4. ❌ Test 失败：purchaseCard 测试用例失败
   - 分析：边界条件处理不当
   - 修复：添加筹码数量验证
   - ✅ 重新测试：通过
5. ✅ Build 通过
6. ⚠️  Self-review：发现问题
   - 代码质量：发现一处命名不规范
     → 修复：重命名变量
   - 文档检查：README.md 未提及新功能
     → 修复：更新 README.md 功能列表
     → 修复：补充 API 文档说明
   - ✅ 重新检查：通过
7. ✅ 创建 commit：feat(game): 实现卡牌购买功能
8. ✅ Push 并创建 PR：PR #124
9. ✅ 监控 CI：等待检查完成...
10. ✅ CI 通过
11. ✅ 自动 Merge：已合并并删除分支
12. ✅ 清理：回到 main 分支
```

## 注意事项

1. **完全自动化**：整个流程无需用户交互
2. **Self-review 很重要**：确保代码质量和文档完整性
3. **文档同步更新**：代码改动必须同步更新相关文档
4. **一个 PR 一个 Commit**：保持 git history 清晰
5. **CI 必须通过**：不会 merge 失败的 PR
6. **自动清理**：merge 后自动删除分支

## 依赖文件

- `commit.md` - Commit 规范说明
- `review.md` - Self-review 检查清单（包含文档检查）
- `ci.md` - CI 失败处理指南
- `.github/pull_request_template.md` - PR 模板

## 项目文档结构

```
├── README.md      # 项目主文档（功能、安装、使用、开发）
├── CLAUDE.md      # AI 开发指南（工具使用、协作规范）
├── GAME_RULES.md  # 游戏规则详细说明
├── TODO.md        # 待办事项和任务追踪
└── CHANGELOG.md   # 版本更新日志
```

## 文档更新映射

代码改动与文档的对应关系（详见 `review.md`）：

| 代码改动 | 需要检查的文档 |
|---------|---------------|
| 新增游戏功能 | README.md, GAME_RULES.md, TODO.md |
| 修改游戏规则 | GAME_RULES.md, README.md |
| 新增 AI 功能 | README.md, CLAUDE.md, TODO.md |
| 修改配置 | README.md（环境变量） |
| 修改开发流程 | CLAUDE.md, README.md |
| 新增依赖 | README.md（安装步骤） |
| 修改部署 | README.md（部署章节） |
| 修复 Bug | CHANGELOG.md, TODO.md |
| 性能优化 | CHANGELOG.md, README.md |

**文档检查优先级**：
- 🔴 **必须更新**（阻塞）：README.md 核心功能、GAME_RULES.md 规则变更、破坏性变更
- 🟡 **应该更新**（警告）：TODO.md 任务状态、CHANGELOG.md 变更记录、CLAUDE.md 开发流程
- 🟢 **可选更新**：内部实现、性能优化、代码示例

## 相关命令

- `git status` - 查看状态
- `git diff` - 查看改动
- `git add` - 暂存改动
- `git commit` - 创建提交
- `npm run lint` - 代码检查
- `npm run type-check` - 类型检查
- `npm run test` - 运行测试
- `npm run build` - 构建项目
- `gh pr create` - 创建 PR
- `gh pr checks` - 查看 CI 状态
- `gh pr merge` - 合并 PR