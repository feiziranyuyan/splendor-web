# Self-Review 检查清单

本文档定义了代码 self-review 的检查清单，确保代码质量符合项目标准。

## Review 流程

1. **读取所有改动的文件**：
   ```bash
   git diff --cached --name-only
   ```

2. **对每个文件进行检查**：
   - 逐项对照检查清单
   - 发现问题立即记录

3. **修复问题**：
   - 按优先级修复（安全 > 类型 > 质量 > 风格）
   - 每次修复后重新运行 quality checks

4. **重新 review**：
   - 确认所有问题已修复
   - 检查修复是否引入新问题

## 检查清单

### 1. 类型安全 ✅

#### 1.1 所有变量有明确类型

**检查**：
- 函数参数有类型标注
- 函数返回值有类型标注
- 变量声明有类型（或可推断）

**示例**：

❌ **不好**：
```typescript
function purchaseCard(playerId, cardId) {
  // ...
}

const result = someFunction();
```

✅ **好**：
```typescript
function purchaseCard(
  playerId: string,
  cardId: string
): GameState {
  // ...
}

const result: GameState = someFunction();
```

#### 1.2 避免使用 any 类型

**检查**：
- 搜索代码中的 `any` 关键字
- 确保每个 `any` 都有充分理由

**示例**：

❌ **不好**：
```typescript
function processData(data: any) {
  return data.value;
}
```

✅ **好**：
```typescript
interface DataInput {
  value: number;
}

function processData(data: DataInput) {
  return data.value;
}

// 或使用泛型
function processData<T extends { value: number }>(data: T) {
  return data.value;
}
```

**例外**：
- 第三方库返回 any（添加类型断言）
- 极度动态的数据（使用 unknown）

#### 1.3 类型断言使用正确

**检查**：
- 类型断言有充分依据
- 优先使用类型守卫而不是断言

**示例**：

❌ **不好**：
```typescript
const card = cards[0] as Card; // 可能是 undefined
```

✅ **好**：
```typescript
const card = cards[0];
if (!card) {
  throw new Error('No cards available');
}
// TypeScript 自动推断 card 是 Card 类型
```

### 2. 错误处理 ✅

#### 2.1 边界条件处理

**检查**：
- 数组访问前检查长度
- 对象属性访问前检查存在性
- 除法运算检查除数不为零
- 循环边界正确

**示例**：

❌ **不好**：
```typescript
function getFirstCard(cards: Card[]) {
  return cards[0]; // 可能 undefined
}

function divide(a: number, b: number) {
  return a / b; // b 可能为 0
}
```

✅ **好**：
```typescript
function getFirstCard(cards: Card[]): Card | null {
  return cards.length > 0 ? cards[0] : null;
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}
```

#### 2.2 用户输入验证

**检查**：
- 所有用户输入都经过验证
- 验证失败返回清晰的错误信息
- 不信任任何外部数据

**示例**：

❌ **不好**：
```typescript
function takeGems(state: GameState, gems: GemColor[]) {
  // 直接使用 gems，未验证
  gems.forEach(color => {
    state.gemPool[color]--;
  });
}
```

✅ **好**：
```typescript
function takeGems(
  state: GameState,
  gems: GemColor[]
): Result<GameState> {
  // 验证输入
  if (gems.length === 0) {
    return { success: false, error: '必须选择至少一个宝石' };
  }

  if (gems.length > 3) {
    return { success: false, error: '最多只能拿取 3 个宝石' };
  }

  // 验证宝石池是否有足够宝石
  for (const color of gems) {
    if (!state.gemPool[color] || state.gemPool[color] <= 0) {
      return { success: false, error: `${color} 宝石不足` };
    }
  }

  // 执行操作
  // ...
}
```

#### 2.3 返回清晰的错误信息

**检查**：
- 错误信息描述具体问题
- 错误信息对用户友好
- 包含足够的上下文

**示例**：

❌ **不好**：
```typescript
if (invalid) {
  return { success: false, error: 'Invalid' };
}
```

✅ **好**：
```typescript
if (totalGems > 10) {
  return {
    success: false,
    error: `拿取后筹码总数将超过 10 个限制（当前 ${currentGems}，拿取 ${gems.length}）`
  };
}
```

### 3. 代码质量 ✅

#### 3.1 函数单一职责

**检查**：
- 每个函数只做一件事
- 函数名准确描述其功能
- 函数长度合理（< 50 行）

**示例**：

❌ **不好**：
```typescript
function processPlayerAction(state: GameState, action: Action) {
  // 验证
  if (!isValidAction(action)) return null;

  // 执行动作
  if (action.type === 'takeGems') {
    // 50 行代码...
  } else if (action.type === 'purchaseCard') {
    // 50 行代码...
  } else if (action.type === 'reserveCard') {
    // 50 行代码...
  }

  // 更新状态
  // 20 行代码...

  // 检查游戏结束
  // 10 行代码...

  return newState;
}
```

✅ **好**：
```typescript
function processPlayerAction(state: GameState, action: Action): Result<GameState> {
  if (!isValidAction(state, action)) {
    return { success: false, error: 'Invalid action' };
  }

  const newState = executeAction(state, action);
  const updatedState = updateGameState(newState);

  if (isGameOver(updatedState)) {
    return { success: true, data: finalizeGame(updatedState) };
  }

  return { success: true, data: updatedState };
}

// 每个辅助函数职责单一
function executeAction(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'takeGems':
      return executeTakeGems(state, action.gems);
    case 'purchaseCard':
      return executePurchaseCard(state, action.cardId);
    case 'reserveCard':
      return executeReserveCard(state, action.cardId);
    default:
      return state;
  }
}
```

#### 3.2 变量命名清晰

**检查**：
- 变量名描述其含义
- 布尔变量用 is/has/can 等前缀
- 避免缩写（除非是通用缩写）
- 避免单字母变量（除了循环 i, j, k）

**示例**：

❌ **不好**：
```typescript
const c = cards[0];
const f = isValid && hasEnough;
const temp = calculateSomething();
```

✅ **好**：
```typescript
const firstCard = cards[0];
const canPurchase = isValidCard && hasEnoughGems;
const totalDiscount = calculateTotalDiscount();
```

#### 3.3 避免重复代码

**检查**：
- 相似代码提取为函数
- 魔法数字定义为常量
- 相似逻辑考虑使用泛型

**示例**：

❌ **不好**：
```typescript
// 重复的验证逻辑
if (state.gemPool.red < 0 || state.gemPool.red > 7) {
  return false;
}
if (state.gemPool.blue < 0 || state.gemPool.blue > 7) {
  return false;
}
if (state.gemPool.green < 0 || state.gemPool.green > 7) {
  return false;
}
```

✅ **好**：
```typescript
const MAX_GEMS_PER_COLOR = 7;

function isValidGemCount(count: number): boolean {
  return count >= 0 && count <= MAX_GEMS_PER_COLOR;
}

const colors: GemColor[] = ['red', 'blue', 'green', 'white', 'black'];
for (const color of colors) {
  if (!isValidGemCount(state.gemPool[color])) {
    return false;
  }
}
```

#### 3.4 符合项目代码风格

**检查**：
- 缩进使用空格（2 空格）
- 使用单引号（字符串）
- 行尾无分号（如果项目配置如此）
- 对象/数组最后一个元素有尾随逗号

**注**：这些应该由 Prettier 自动处理，但要确保代码已格式化。

### 4. 性能 ⚡

#### 4.1 避免明显的性能问题

**检查**：
- 避免 O(n²) 循环（除非 n 很小）
- 避免不必要的重复计算
- 大数组操作考虑缓存

**示例**：

❌ **不好**：
```typescript
// O(n²) 查找
function findDuplicates(cards: Card[]) {
  const duplicates = [];
  for (const card1 of cards) {
    for (const card2 of cards) {
      if (card1 !== card2 && card1.id === card2.id) {
        duplicates.push(card1);
      }
    }
  }
  return duplicates;
}
```

✅ **好**：
```typescript
// O(n) 查找
function findDuplicates(cards: Card[]) {
  const seen = new Set<string>();
  const duplicates: Card[] = [];

  for (const card of cards) {
    if (seen.has(card.id)) {
      duplicates.push(card);
    } else {
      seen.add(card.id);
    }
  }

  return duplicates;
}
```

#### 4.2 合理使用缓存

**检查**：
- 昂贵计算考虑缓存
- 纯函数结果可以缓存
- React 组件使用 useMemo/useCallback

**示例**：

```typescript
// 缓存计算结果
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// 缓存回调函数
const handleClick = useCallback(() => {
  doSomething(a);
}, [a]);
```

### 5. 安全 🔒

#### 5.1 防止常见安全漏洞

**检查**：
- 无 XSS 风险（React 默认转义，但注意 dangerouslySetInnerHTML）
- 无 SQL 注入风险（使用参数化查询）
- 敏感信息不硬编码（API keys, passwords）
- 用户输入经过清理

**示例**：

❌ **不好**：
```typescript
// XSS 风险
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// 硬编码敏感信息
const API_KEY = 'sk-1234567890abcdef';
```

✅ **好**：
```typescript
// 安全的渲染
<div>{userInput}</div>

// 使用环境变量
const API_KEY = process.env.REACT_APP_API_KEY;
```

#### 5.2 合理的权限检查

**检查**：
- 操作前验证权限
- 不信任客户端数据
- 敏感操作需要额外验证

### 6. 测试 ✅

#### 6.1 核心逻辑有单元测试

**检查**：
- 新增功能有对应测试
- 修复 bug 有回归测试
- 测试覆盖核心路径

**示例**：

```typescript
describe('purchaseCard', () => {
  it('应该成功购买卡牌', () => {
    // 测试正常流程
  });

  it('宝石不足时应该返回错误', () => {
    // 测试边界条件
  });

  it('应该正确计算折扣', () => {
    // 测试特定逻辑
  });

  it('购买后应该自动检测贵族', () => {
    // 测试关联功能
  });
});
```

#### 6.2 测试覆盖边界情况

**检查**：
- 空数组/对象
- null/undefined
- 边界值（0, -1, MAX_VALUE）
- 错误情况

### 7. 文档更新 📚

#### 7.0 项目文档结构

本项目的文档文件：

```
├── README.md      # 项目主文档（功能、安装、使用、开发）
├── CLAUDE.md      # AI 开发指南（工具使用、协作规范）
├── GAME_RULES.md  # 游戏规则详细说明
├── TODO.md        # 待办事项和任务追踪
├── CHANGELOG.md   # 版本更新日志
└── .claude/skills/# Claude Code skills（开发工具）
```

**文档说明**：
- `README.md` - 项目入口文档，包含功能列表、安装步骤、使用说明、开发指南
- `CLAUDE.md` - AI 开发工具使用指南，包含 Claude Code 使用、Agent 协作规范
- `GAME_RULES.md` - 璀璨宝石游戏的完整规则说明
- `TODO.md` - 开发任务列表，用于追踪待完成和已完成的任务
- `CHANGELOG.md` - 记录项目的重要变更和版本历史

**注意**：`claude.md` 和 `agent.md` 是 `CLAUDE.md` 的旧文件名/软链接，不需要单独更新。

#### 7.1 检查是否需要更新文档

**检查原则**：
任何对外部可见的改动都应该更新相应文档。

**需要更新文档的情况**：

1. **新增功能**：
   - README.md 的功能列表
   - GAME_RULES.md（游戏规则相关）
   - TODO.md（标记完成的任务）

2. **修改游戏逻辑**：
   - GAME_RULES.md
   - README.md（如果影响核心玩法）

3. **修改配置**：
   - README.md（环境变量、安装步骤）
   - CLAUDE.md（如果影响 AI 开发流程）

4. **修改开发流程/工具**：
   - CLAUDE.md（开发指南、工具使用）
   - README.md（开发相关章节）

5. **修复重要 Bug**：
   - CHANGELOG.md
   - TODO.md（标记已修复的问题）

6. **性能优化**：
   - README.md（性能相关说明）
   - CHANGELOG.md（记录优化）

**示例**：

❌ **不好**（只改代码，不更新文档）：
```typescript
// 新增了 reserveCard 功能
function reserveCard(state: GameState, cardId: string) {
  // 实现...
}

// ❌ 但 README.md 中没有说明这个功能
```

✅ **好**（同步更新文档）：
```typescript
// 新增了 reserveCard 功能
function reserveCard(state: GameState, cardId: string) {
  // 实现...
}

// ✅ 同时更新 README.md
## 功能
- ✅ 拿取宝石
- ✅ 购买卡牌
- ✅ 保留卡牌（新增！）
```

#### 7.2 文档检查清单

**步骤 1：识别改动类型**

分析 git diff，确定改动类型：
```bash
git diff --cached --stat
git diff --cached
```

**步骤 2：确定需要更新的文档**

根据改动类型，列出可能需要更新的文档：

| 改动类型 | 需要检查的文档 |
|---------|---------------|
| 新增游戏功能 | README.md, GAME_RULES.md, TODO.md |
| 修改游戏规则 | GAME_RULES.md, README.md |
| 新增 AI 功能 | README.md, CLAUDE.md, TODO.md |
| 修改配置 | README.md（环境变量说明） |
| 修改开发流程 | CLAUDE.md, README.md |
| 新增依赖 | README.md（安装步骤） |
| 修改部署 | README.md（部署章节） |
| 修复 Bug | CHANGELOG.md, TODO.md |
| 性能优化 | CHANGELOG.md, README.md |

**步骤 3：检查文档是否已更新**

对每个相关文档：
1. 读取文档内容
2. 检查是否提到新功能/改动
3. 检查描述是否准确

**步骤 4：自动更新文档**

如果发现文档缺失或过时：
1. 分析需要补充的内容
2. 找到合适的插入位置
3. 更新文档
4. 暂存更新：`git add <doc-file>`

#### 7.3 常见文档更新场景

**场景 1：新增游戏功能**

```bash
# 改动：添加 AI 对手功能
git diff --cached src/game/ai/

# 需要更新：
# 1. README.md - 功能列表
# 2. GAME_RULES.md - AI 规则说明
# 3. TODO.md - 标记 AI 功能已完成
# 4. CLAUDE.md - AI 开发指南（如果影响开发流程）
```

更新示例：
```markdown
// README.md

## ✨ 功能特性

- ✅ 完整的游戏规则实现
- ✅ 单人游戏（对战 AI）  ← 新增
- ✅ 精美的 UI 设计
```

**场景 2：修改游戏规则**

```bash
# 改动：修改宝石拿取规则，允许拿取黄金宝石
git diff --cached src/game/actions/takeGems.ts

# 需要更新：
# 1. GAME_RULES.md - 宝石拿取规则说明
# 2. README.md - 功能说明（如果影响核心玩法）
```

更新示例：
```markdown
// GAME_RULES.md

## 宝石拿取规则

玩家可以选择以下方式之一拿取宝石：

1. 拿取 3 个不同颜色的宝石
2. 拿取 2 个相同颜色的宝石（该颜色至少有 4 个）
3. 保留卡牌并获得 1 个黄金宝石  ← 更新说明
```

**场景 3：修改配置**

```bash
# 改动：添加新的环境变量
git diff --cached .env.example

# 需要更新：
# 1. README.md - 环境变量说明
# 2. 配置文档
# 3. 部署文档
```

更新示例：
```markdown
// README.md

## ⚙️ 配置

创建 `.env` 文件：

\`\`\`bash
VITE_API_URL=http://localhost:3000
VITE_ENABLE_AI=true                 ← 新增
VITE_AI_DIFFICULTY=medium           ← 新增
\`\`\`
```

**场景 4：修改开发流程**

```bash
# 改动：新增 /ship skill，移除 scripts/
git diff --cached scripts/ .claude/skills/

# 需要更新：
# 1. CLAUDE.md - 开发流程和工具使用说明
# 2. README.md - 开发相关章节
```

更新示例：
```markdown
// CLAUDE.md

## 开发工作流

使用 `/ship` skill 自动化完成开发任务：

\`\`\`bash
# 完成开发后
/ship

# 自动完成：commit → review → PR → CI → merge
\`\`\`
```

**场景 5：完成 TODO 任务**

```bash
# 改动：实现了待办清单中的 AI 对手功能
git diff --cached src/game/ai/

# 需要更新：
# 1. TODO.md - 标记任务为已完成
# 2. README.md - 更新功能列表
# 3. GAME_RULES.md - 添加 AI 规则说明
```

更新示例：
```markdown
// TODO.md

### 2.1 AI 对手
- ✅ 实现简单 AI（随机策略）    ← 更新状态
- ✅ 实现中等 AI（评分策略）    ← 更新状态
- ⏳ 实现困难 AI（蒙特卡洛树搜索）
```

**场景 6：修复重要 Bug**

```bash
# 改动：修复保留卡牌时筹码超限的 bug
git diff --cached src/game/actions/reserveCard.ts

# 需要更新：
# 1. CHANGELOG.md - 记录 bug 修复
# 2. TODO.md - 标记 bug 任务为已完成（如果有）
```

更新示例：
```markdown
// CHANGELOG.md

## [Unreleased]

### Fixed
- 修复保留卡牌时筹码总数可能超过 10 个的问题  ← 新增
```

**场景 7：重构/优化（不影响外部接口）**

```bash
# 改动：重构内部实现，不改变 API
git diff --cached src/game/core/GameEngine.ts

# 通常不需要更新文档（除非有性能提升等值得说明的改进）
# 如果有显著性能提升，可以更新 CHANGELOG.md
```

#### 7.4 自动文档检查流程

```
1. 读取所有改动的文件列表
   git diff --cached --name-only

2. 分析改动类型
   - src/game/** → 游戏逻辑改动
   - src/components/** → UI 组件改动
   - src/types/** → 类型定义改动
   - scripts/** → 工具脚本改动
   - .github/** → CI/CD 改动

3. 确定需要检查的文档
   根据改动类型和上述映射表

4. 对每个文档进行检查
   - 读取文档内容
   - 搜索相关关键词
   - 判断是否已包含新改动的说明

5. 生成检查报告
   ✅ README.md - 已更新功能列表
   ⚠️  GAME_RULES.md - 未找到 reserveCard 的说明
   ❌ CLAUDE.md - 仍然提到已删除的 scripts/

6. 自动更新缺失的文档
   - 根据改动内容生成文档更新
   - 找到合适的插入位置
   - 更新文档

7. 暂存文档改动
   git add README.md GAME_RULES.md CLAUDE.md
```

#### 7.5 文档更新示例

**完整示例：新增 AI 功能**

```
改动分析：
- 新增文件：src/game/ai/AIPlayer.ts
- 新增文件：src/game/ai/strategies/
- 修改文件：src/game/core/GameEngine.ts（集成 AI）

文档检查：
1. ✅ README.md
   - 已在功能列表中添加 "AI 对手"
   - 已在使用指南中添加 AI 难度选择说明

2. ❌ GAME_RULES.md
   - 未说明 AI 的行为规则
   - 建议添加：AI 如何选择动作、AI 的难度等级

3. ⚠️  CLAUDE.md
   - 提到了 AI 但没有详细说明
   - 建议补充：AI 系统架构、如何实现新 AI 策略

4. ✅ TODO.md
   - 已标记 "实现 AI 对手" 任务为完成

自动更新：
1. 更新 GAME_RULES.md
   [在 "游戏流程" 章节后添加 "AI 对手" 章节]

2. 更新 CLAUDE.md
   [在 "AI 开发" 章节中补充 AI 系统说明]

更新完成后：
git add GAME_RULES.md CLAUDE.md
```

#### 7.6 文档更新优先级

**必须更新**（阻塞提交）：
- README.md 中的核心功能列表（新增/删除功能）
- GAME_RULES.md 中的游戏规则（规则变更）
- 破坏性变更的说明（API 不兼容）
- 环境变量说明（新增必需配置）

**应该更新**（警告但不阻塞）：
- TODO.md 的任务状态（完成待办任务）
- CHANGELOG.md 的变更记录（重要 bug 修复、新功能）
- CLAUDE.md 的开发流程（工具或流程变更）
- README.md 的开发说明（依赖变更、构建步骤变更）

**可选更新**：
- 内部实现细节
- 性能优化说明（如果提升显著则应更新 CHANGELOG）
- 代码示例和最佳实践

### 8. 代码注释 📝

#### 7.1 必要的注释

**需要注释的情况**：
- 复杂算法的解释
- 非显而易见的业务逻辑
- 临时解决方案（TODO, FIXME）
- 公共 API 的文档注释

**不需要注释的情况**：
- 显而易见的代码
- 注释重复代码内容

**示例**：

❌ **不好**：
```typescript
// 循环遍历卡牌数组
for (const card of cards) {
  // 打印卡牌
  console.log(card);
}
```

✅ **好**：
```typescript
/**
 * 根据玩家已有卡牌计算购买折扣
 *
 * 算法：统计玩家每种颜色的卡牌数量，每张卡牌提供 1 个对应颜色的折扣
 * 例如：玩家有 2 张红色卡牌，购买需要 3 个红宝石的卡牌时，只需 1 个红宝石
 */
function calculateDiscount(
  playerCards: Card[],
  cost: GemCost
): GemCost {
  // 实现...
}
```

## Review 报告格式

Review 完成后，生成报告：

```
Self-Review 报告：

✅ 类型安全：通过
   - 所有函数有明确类型标注
   - 无不必要的 any 类型

✅ 错误处理：通过
   - 边界条件已处理
   - 用户输入已验证
   - 错误信息清晰

✅ 代码质量：通过
   - 函数职责单一
   - 无重复代码
   - 命名规范

✅ 性能：通过
   - 无明显性能问题

✅ 安全：通过
   - 无安全漏洞

✅ 测试：通过
   - 核心逻辑有单元测试
   - 测试覆盖率 85%

✅ 文档更新：通过
   - README.md 已更新功能列表
   - API 文档已同步
   - 示例代码已更新

总结：代码质量良好，文档完整，可以提交。
```

或者如果有问题：

```
Self-Review 报告：

✅ 类型安全：通过

❌ 错误处理：发现问题
   - purchaseCard 未处理宝石不足的情况
   - takeGems 未验证筹码总数限制

✅ 代码质量：通过

⚠️  测试：警告
   - 缺少边界条件测试

⚠️  文档更新：警告
   - README.md 未提及新增的 reserveCard 功能
   - docs/API.md 缺少 reserveCard 的 API 说明

修复计划：
1. 添加宝石不足的验证和错误返回
2. 添加筹码总数限制验证
3. 补充边界条件测试用例
4. 更新 README.md 功能列表
5. 补充 API 文档

[自动修复...]
```

## 自动化 Review

在 `/ship` workflow 中，review 过程自动化：

1. 读取所有改动的文件
2. 对每个文件运行检查清单（类型、错误处理、代码质量等）
3. 运行文档检查：
   - 分析改动类型
   - 确定需要更新的文档
   - 检查文档是否已更新
   - 自动更新缺失或过时的文档
4. 发现问题时尝试自动修复
5. 无法自动修复的问题记录并报告
6. 所有问题修复后重新运行 quality checks
7. 生成 review 报告（包含文档检查结果）

## 参考资源

- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [React Best Practices](https://react.dev/learn/thinking-in-react)