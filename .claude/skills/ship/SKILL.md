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

# /ship - 自动化提交与 PR 流程

开发完成后自动执行：质量检查 → Self-review → 提交 → 创建 PR → 监控 CI → 等待人工确认。

## 流程概览

```
检查改动 → 质量检查 → Self-review → Commit → Push → 创建 PR → 监控 CI → Preview 部署 → 等待人工合并
```

## 详细步骤

### 1. 检查改动

```bash
git status
git diff --stat
```

### 2. 质量检查

按顺序运行，失败则自动修复后重试：

```bash
npm run lint        # 失败时运行 npm run lint -- --fix
npm run type-check
npm run test
npm run build
```

### 3. Self-Review

对照 `review.md` 检查清单审查代码，发现问题则修复后重新检查。

### 4. Squash & Commit

多个 commit 合并为一个，生成规范的 commit message：

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>
```

### 5. Push & 创建 PR

```bash
git push -u origin <branch>
gh pr create --title "<commit-title>" --body "<pr-body>"
```

### 6. 监控 CI

```bash
gh pr checks --watch
```

CI 失败时：分析日志 → 本地修复 → amend → force push → 重新监控。

### 7. Preview 部署

CI 通过后自动部署 Preview：

```
https://<owner>.github.io/<repo>/pr-<number>/
```

Preview URL 会自动添加到 PR 评论。

### 8. 等待人工合并

流程到此结束。用户需要：
1. 查看 Preview 确认效果
2. 在 GitHub PR 页面手动合并
3. 合并时选择删除分支（GitHub 自动处理）

## 错误处理

| 错误类型 | 处理方式 |
|---------|---------|
| Lint | `npm run lint -- --fix` |
| Type | 分析错误手动修复 |
| Test | 分析失败用例修复 |
| Build | 分析构建错误修复 |
| CI 失败 | 参考 `ci.md` 诊断 |
| PR 冲突 | `git rebase origin/main` |

## 依赖文件

- `commit.md` - Commit 规范
- `review.md` - Review 检查清单
- `ci.md` - CI 失败处理

## 相关命令

```bash
git status && git diff --stat        # 查看改动
npm run lint && npm run test         # 本地检查
gh pr create                         # 创建 PR
gh pr checks --watch                 # 监控 CI
gh pr view --web                     # 打开 PR 页面
```
