# CI 监控和失败处理

本文档说明如何监控 CI 状态以及处理 CI 失败的情况。

## CI 监控

### 查看 CI 状态

创建 PR 后，使用 `gh pr checks` 查看 CI 状态：

```bash
# 查看当前 PR 的所有 checks
gh pr checks

# 持续监控 CI 状态（实时更新）
gh pr checks --watch

# 在浏览器中打开 CI 详情
gh pr checks --web
```

### CI 状态说明

- **pending** ⏳：CI 正在运行
- **success** ✅：所有检查通过
- **failure** ❌：至少一个检查失败
- **cancelled** ⚠️：检查被取消

### 监控流程

在 `/ship` workflow 中：

1. **创建 PR 后等待 CI 启动**：
   ```bash
   sleep 5  # 给 CI 一些启动时间
   ```

2. **开始监控**：
   ```bash
   gh pr checks --watch
   ```

3. **等待完成**：
   - 如果所有检查通过 → 继续自动 merge
   - 如果有检查失败 → 进入失败处理流程
   - 如果超时（例如 10 分钟）→ 报告异常

## CI 失败处理

### 1. 获取失败信息

```bash
# 查看失败的 check
gh pr checks

# 在浏览器中查看详细日志
gh pr checks --web

# 或使用 API 获取详细信息
gh api repos/:owner/:repo/commits/:sha/check-runs
```

### 2. 分析失败原因

#### 常见失败类型

**Lint 失败**：
```
Error: ESLint found issues:
  src/game/GameEngine.ts:42:5 - Unexpected console statement
  src/components/Card.tsx:18:1 - Missing trailing comma
```

**解决方案**：
```bash
# 运行 lint 自动修复
npm run lint -- --fix

# 检查修复结果
git diff

# 暂存修复
git add -A
```

**Type-check 失败**：
```
Error: TypeScript compilation failed:
  src/game/GameEngine.ts:42:5 - Type 'string' is not assignable to type 'number'
  src/types/index.ts:18:12 - Property 'id' is missing in type
```

**解决方案**：
- 分析类型错误
- 手动修复类型问题
- 运行 `npm run type-check` 验证

**Test 失败**：
```
Error: Tests failed:
  ✗ purchaseCard should handle insufficient gems (12ms)
    Expected: { success: false, error: '...' }
    Received: { success: true, data: ... }
```

**解决方案**：
- 分析测试失败原因
- 修复逻辑错误
- 运行 `npm test` 验证

**Build 失败**：
```
Error: Build failed:
  Module not found: Can't resolve './missing-file'
  or
  Out of memory
```

**解决方案**：
- 检查文件路径
- 检查依赖是否安装
- 检查构建配置

**Coverage 不足**：
```
Error: Coverage threshold not met:
  Statements: 78% < 80%
  Branches: 72% < 80%
```

**解决方案**：
- 添加缺失的测试用例
- 覆盖更多分支和边界条件

### 3. 本地修复和验证

修复问题后，必须在本地验证：

```bash
# 运行完整的 quality checks
npm run lint
npm run type-check
npm run test
npm run build

# 确保所有检查通过
```

### 4. 更新 PR

#### 方法 A：Amend Commit（推荐）

如果 PR 只有一个 commit，使用 amend：

```bash
# 暂存修复
git add -A

# Amend commit（不修改 message）
git commit --amend --no-edit

# Force push
git push -f
```

#### 方法 B：新 Commit

如果需要保留历史：

```bash
# 创建新 commit
git add -A
git commit -m "fix: 修复 CI 失败问题"

# Push
git push

# 注意：这会导致 PR 有多个 commit
# 稍后需要 squash（或者让 CI 通过后再 squash）
```

### 5. 重新监控 CI

```bash
# 等待 CI 重新运行
sleep 5

# 继续监控
gh pr checks --watch
```

### 6. 循环直到通过

如果修复后 CI 仍然失败：
- 重复步骤 1-5
- 直到所有检查通过

## CI 配置参考

### 本项目的 CI Workflows

检查 `.github/workflows/` 目录下的配置文件：

```bash
ls -la .github/workflows/
```

常见的 workflow：
- `ci.yml` - 主 CI 流程（lint, type-check, test, build）
- `deploy.yml` - 部署流程
- `release.yml` - 发布流程

### 查看 Workflow 配置

```bash
# 查看 CI workflow
cat .github/workflows/ci.yml
```

了解 CI 运行的步骤：
1. Setup (安装依赖)
2. Lint
3. Type-check
4. Test
5. Build
6. Coverage

### 本地模拟 CI

在本地运行与 CI 相同的命令：

```bash
# 安装依赖
npm ci

# 运行所有检查（与 CI 一致）
npm run lint
npm run type-check
npm run test -- --coverage
npm run build
```

## 自动修复策略

在 `/ship` workflow 中，自动修复 CI 失败：

### 可自动修复的问题

1. **Lint 错误**：
   ```bash
   npm run lint -- --fix
   git add -A
   ```

2. **格式问题**：
   ```bash
   npm run format  # 如果有 format script
   git add -A
   ```

### 需要手动修复的问题

1. **Type 错误**：需要理解代码逻辑
2. **Test 失败**：需要分析失败原因
3. **Build 错误**：需要分析依赖和配置

### 修复流程

```
while (CI 失败):
    获取失败信息
    if 可自动修复:
        自动修复
        暂存修复
        本地验证
    else:
        分析问题
        手动修复
        本地验证

    amend commit
    force push
    重新监控 CI
```

## 超时处理

如果 CI 运行时间过长：

```bash
# 设置超时（例如 10 分钟）
timeout 600 gh pr checks --watch

# 超时后检查状态
gh pr checks
```

超时处理策略：
- 检查 CI 是否卡住
- 考虑取消并重新触发：
  ```bash
  # 重新触发 CI（通过空 commit）
  git commit --allow-empty -m "chore: retrigger CI"
  git push
  ```

## PR Merge

CI 通过后自动 merge：

```bash
# 使用 rebase 合并（保持线性历史）
gh pr merge --rebase --delete-branch --auto
```

**Merge 选项**：
- `--rebase`：rebase 到 main（推荐，保持线性历史）
- `--squash`：squash 所有 commit 为一个
- `--merge`：创建 merge commit
- `--delete-branch`：merge 后删除分支
- `--auto`：CI 通过后自动 merge

## 常见问题

### Q1: CI 一直 pending 怎么办？

**可能原因**：
- GitHub Actions runner 队列繁忙
- Workflow 配置有问题
- 依赖安装卡住

**解决方案**：
```bash
# 查看 workflow 运行状态
gh run list

# 查看特定 run 的详情
gh run view <run-id>

# 如果确定卡住，取消并重新触发
gh run cancel <run-id>
git commit --allow-empty -m "chore: retrigger CI"
git push
```

### Q2: CI 失败但本地测试通过？

**可能原因**：
- 环境变量不同
- 依赖版本不同（lock file 不一致）
- Node.js 版本不同

**解决方案**：
```bash
# 确保使用与 CI 相同的 Node.js 版本
# 检查 .github/workflows/ci.yml 中的 node-version

# 重新安装依赖（使用 ci 而不是 install）
npm ci

# 清理缓存
rm -rf node_modules package-lock.json
npm install
```

### Q3: Coverage 不足怎么办？

**解决方案**：
```bash
# 查看 coverage 报告
npm run test -- --coverage

# 在浏览器中查看详细报告
open coverage/lcov-report/index.html

# 找到未覆盖的代码
# 添加测试用例
# 重新运行测试验证
```

### Q4: 多个 PR 的 CI 冲突？

**可能原因**：
- 同时有多个 PR 修改相同文件
- CI 测试不隔离

**解决方案**：
```bash
# 确保测试是隔离的（不依赖全局状态）
# 使用 beforeEach/afterEach 清理状态

# 如果 main 已更新，rebase
git fetch origin main
git rebase origin/main
git push -f
```

## 监控示例

### 成功的 CI 监控

```
$ gh pr checks --watch

✓ Lint           https://github.com/.../runs/123   12s
✓ Type-check     https://github.com/.../runs/124   8s
✓ Test           https://github.com/.../runs/125   45s
✓ Build          https://github.com/.../runs/126   32s

All checks passed! ✅
```

### 失败的 CI 监控

```
$ gh pr checks --watch

✓ Lint           https://github.com/.../runs/123   12s
✗ Type-check     https://github.com/.../runs/124   8s
  Error: Type 'string' is not assignable to type 'number'

⏳ Test           pending
⏳ Build          pending

[自动开始修复流程...]

1. 分析 Type-check 失败：
   src/game/GameEngine.ts:42 - playerId 应该是 string 但传入了 number

2. 修复类型错误：
   - 更新函数签名
   - 修复调用处

3. 本地验证：
   ✓ npm run type-check 通过

4. 更新 PR：
   ✓ git commit --amend --no-edit
   ✓ git push -f

5. 重新监控 CI...

$ gh pr checks --watch

✓ Lint           https://github.com/.../runs/127   10s
✓ Type-check     https://github.com/.../runs/128   8s
✓ Test           https://github.com/.../runs/129   42s
✓ Build          https://github.com/.../runs/130   30s

All checks passed! ✅
```

## 总结

CI 失败处理的关键：
1. **快速定位**：使用 `gh pr checks` 快速查看失败原因
2. **自动修复**：能自动修复的尽量自动（lint, format）
3. **本地验证**：修复后必须在本地验证
4. **循环处理**：直到所有检查通过
5. **保持简洁**：使用 amend + force push 保持单一 commit

## 参考资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [gh CLI 文档](https://cli.github.com/manual/)
- [CI/CD 最佳实践](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)