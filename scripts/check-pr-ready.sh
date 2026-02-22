#!/bin/bash
# 检查PR是否准备好合并

set -e

echo "🔍 检查代码质量..."
echo ""

# 运行所有检查
echo "📝 运行Lint检查..."
npm run lint

echo ""
echo "🔍 运行类型检查..."
npm run type-check

echo ""
echo "🧪 运行测试..."
npm run test

echo ""
echo "🏗️  验证构建..."
npm run build

echo ""
echo "✅ 所有检查通过！"
echo ""
echo "📋 PR清单:"
echo "   ✅ Lint检查通过"
echo "   ✅ 类型检查通过"
echo "   ✅ 测试通过"
echo "   ✅ 构建成功"
echo ""
echo "💡 现在可以创建PR或推送更改了！"
