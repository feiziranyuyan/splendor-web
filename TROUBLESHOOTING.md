# GitHub Actions 故障排查

## 问题：Actions失败

如果GitHub Actions一直失败，按以下步骤排查：

### 1. 检查GitHub Pages配置

**方法A：使用GitHub Actions（推荐）**

1. 进入仓库：`https://github.com/feiziranyuyan/splendor-web`
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 **Build and deployment** 下：
   - Source: 选择 **GitHub Actions**
5. 保存

**方法B：使用gh-pages分支**

1. 进入仓库 Settings → Pages
2. Source: 选择 **Deploy from a branch**
3. Branch: 选择 **gh-pages** / **(root)**
4. 保存

### 2. 检查Actions权限

1. 进入 Settings → Actions → General
2. 找到 **Workflow permissions**
3. 选择 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**
5. 保存

### 3. 手动触发部署

如果配置后Actions还是失败：

```bash
# 本地推送一个小改动
git commit --allow-empty -m "chore: trigger deployment"
git push origin main
```

### 4. 查看具体错误

1. 进入仓库的 **Actions** 标签
2. 点击失败的workflow
3. 查看具体的错误日志
4. 常见错误：
   - **权限错误**: 按步骤2设置权限
   - **Pages未配置**: 按步骤1配置Pages
   - **构建错误**: 本地运行 `npm run build` 验证

### 5. 使用简化版部署

我已创建两个部署配置：

- **deploy.yml**: 使用GitHub Pages Actions（官方推荐）
- **deploy-simple.yml**: 使用gh-pages分支（更稳定）

如果deploy.yml失败，可以禁用它，只用deploy-simple.yml：

```bash
# 重命名禁用原配置
mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
git add .
git commit -m "chore: use simple deployment"
git push
```

### 6. 本地验证

确保本地所有检查都通过：

```bash
npm run type-check  # TypeScript检查
npm run lint        # ESLint检查
npm run test        # 测试（无测试文件也通过）
npm run build       # 构建
```

### 7. 访问部署的网站

配置成功后，网站会部署到：
- 使用GitHub Actions: `https://feiziranyuyan.github.io/splendor-web/`
- 使用gh-pages分支: `https://feiziranyuyan.github.io/splendor-web/`

首次部署可能需要5-10分钟。

### 8. 仍然失败？

检查以下内容：

1. **仓库是否Public**: GitHub Pages免费版只支持public仓库
2. **base路径**: vite.config.ts中的 `base: '/splendor-web/'` 必须匹配仓库名
3. **Node版本**: Actions使用Node 20，确保package.json兼容

如果所有都配置正确但还是失败，可以：
- 在GitHub仓库创建Issue
- 或使用其他部署平台（Vercel、Netlify等）

## 快速解决方案

**最简单的方法**：

1. 删除 `.github/workflows/deploy.yml`
2. 保留 `.github/workflows/deploy-simple.yml` 和 `test.yml`
3. 在GitHub Settings → Pages 设置：
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**
4. 推送代码，等待部署

这种方式最稳定，几乎不会出错。
