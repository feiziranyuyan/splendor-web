# 🚀 快速开始指南

## 📋 当前状态

项目有 **2个PR** 等待合并：

### PR #1: 修复部署和建立规范
**分支**: `fix/deployment-whitepage`
**链接**: https://github.com/feiziranyuyan/splendor-web/pull/new/fix/deployment-whitepage

**内容**:
- ✅ 清理GitHub Actions配置
- ✅ 添加CONTRIBUTING.md贡献指南
- ✅ 添加PR模板
- ✅ 修复网页全白问题（添加.nojekyll和图标）

### PR #2: 自动化工具
**分支**: `feature/automation-tools`
**链接**: https://github.com/feiziranyuyan/splendor-web/pull/new/feature/automation-tools

**内容**:
- ✅ 开发脚本（新建分支、创建PR、检查就绪）
- ✅ 自动标签Action
- ✅ PR自动分配Action
- ✅ 完整文档

## 🎯 下一步操作

### 第1步：创建两个PR（2分钟）

```bash
# PR #1
open https://github.com/feiziranyuyan/splendor-web/pull/new/fix/deployment-whitepage

# PR #2
open https://github.com/feiziranyuyan/splendor-web/pull/new/feature/automation-tools
```

或者手动访问上面的链接。

### 第2步：等待CI通过（3-5分钟）

两个PR都会自动运行CI测试：
- ✅ TypeScript类型检查
- ✅ ESLint代码检查
- ✅ 测试
- ✅ 构建验证

### 第3步：合并PR（1分钟）

**重要：按顺序合并！**

1. **先合并** `fix/deployment-whitepage`
   - 点击 **Rebase and merge** 按钮
   - 这会修复部署问题

2. **再合并** `feature/automation-tools`
   - 点击 **Rebase and merge** 按钮
   - 这会添加自动化工具

### 第4步：删除旧分支（1分钟）

```bash
# 删除gh-pages分支（不再需要）
git push origin --delete gh-pages

# 更新本地main分支
git checkout main
git pull origin main
```

### 第5步：验证部署（5分钟）

等待GitHub Actions自动部署完成后，访问：
- https://feiziranyuyan.github.io/splendor-web/

应该能看到正常的游戏界面！

## 🛠️ 以后的开发流程

合并后，使用新的自动化工具：

```bash
# 1. 创建新功能分支
./scripts/new-branch.sh feature add-multiplayer

# 2. 开发...

# 3. 检查代码质量
./scripts/check-pr-ready.sh

# 4. 创建PR
./scripts/create-pr.sh

# 5. 在GitHub上合并（Rebase方式）
```

## 📚 重要文档

- **CONTRIBUTING.md** - 开发规范（必读！）
- **scripts/README.md** - 脚本使用文档
- **README.md** - 项目说明

## ⚡ 快捷命令

```bash
# 检查代码
npm run lint
npm run type-check
npm run test
npm run build

# 本地运行
npm run dev

# 创建分支
./scripts/new-branch.sh feature my-feature

# 检查PR就绪
./scripts/check-pr-ready.sh

# 创建PR
./scripts/create-pr.sh
```

## 🎉 完成后

恭喜！您的项目现在有：
- ✅ 完整的开发规范
- ✅ 自动化CI/CD流程
- ✅ PR模板和自动标签
- ✅ 便捷的开发脚本
- ✅ 正常工作的部署

开始享受高效的开发流程吧！🚀
