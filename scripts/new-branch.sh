#!/bin/bash
# 创建新分支的脚本

set -e

# 检查参数
if [ $# -lt 2 ]; then
    echo "使用方法: ./scripts/new-branch.sh <type> <name>"
    echo ""
    echo "分支类型:"
    echo "  feature  - 新功能"
    echo "  fix      - Bug修复"
    echo "  docs     - 文档更新"
    echo "  refactor - 代码重构"
    echo "  perf     - 性能优化"
    echo "  test     - 测试相关"
    echo "  chore    - 构建/配置"
    echo ""
    echo "示例: ./scripts/new-branch.sh feature add-player-controls"
    exit 1
fi

TYPE=$1
NAME=$2
BRANCH_NAME="$TYPE/$NAME"

# 验证分支类型
case $TYPE in
    feature|fix|docs|refactor|perf|test|chore)
        ;;
    *)
        echo "❌ 无效的分支类型: $TYPE"
        echo "   必须是: feature, fix, docs, refactor, perf, test, chore 之一"
        exit 1
        ;;
esac

# 更新main分支
echo "📥 更新main分支..."
git checkout main
git pull origin main

# 创建新分支
echo "🌿 创建新分支: $BRANCH_NAME"
git checkout -b $BRANCH_NAME

echo ""
echo "✅ 分支创建成功！"
echo ""
echo "📝 下一步:"
echo "   1. 进行开发"
echo "   2. 提交更改: git add . && git commit -m '...'"
echo "   3. 创建PR: ./scripts/create-pr.sh"
