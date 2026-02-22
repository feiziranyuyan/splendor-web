#!/bin/bash
# 创建 Pull Request 的脚本

set -e

# 获取当前分支
CURRENT_BRANCH=$(git branch --show-current)

# 检查是否在main分支
if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "❌ 不能从main分支创建PR"
    exit 1
fi

# 获取分支类型和名称
BRANCH_TYPE=$(echo $CURRENT_BRANCH | cut -d'/' -f1)
BRANCH_NAME=$(echo $CURRENT_BRANCH | cut -d'/' -f2-)

# 根据分支类型确定PR标题前缀
case $BRANCH_TYPE in
    feature)
        PREFIX="[Feature]"
        ;;
    fix)
        PREFIX="[Fix]"
        ;;
    docs)
        PREFIX="[Docs]"
        ;;
    refactor)
        PREFIX="[Refactor]"
        ;;
    perf)
        PREFIX="[Perf]"
        ;;
    test)
        PREFIX="[Test]"
        ;;
    chore)
        PREFIX="[Chore]"
        ;;
    *)
        PREFIX="[Other]"
        ;;
esac

# 格式化分支名称为标题
TITLE="$PREFIX $(echo $BRANCH_NAME | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g')"

echo "📝 准备创建 PR..."
echo "   分支: $CURRENT_BRANCH"
echo "   标题: $TITLE"
echo ""

# 推送当前分支
echo "🚀 推送分支到远程..."
git push -u origin $CURRENT_BRANCH

echo ""
echo "✅ 分支已推送！"
echo ""
echo "🌐 请在浏览器中完成 PR 创建："
echo "   https://github.com/feiziranyuyan/splendor-web/compare/main...$CURRENT_BRANCH"
echo ""
echo "💡 或使用 GitHub CLI (需要先认证):"
echo "   gh auth login"
echo "   gh pr create --title \"$TITLE\" --fill"
