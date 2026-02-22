# 璀璨宝石 - 功能待办清单

本文档记录项目的功能规划和开发进度。

## 图例

- ✅ 已完成
- 🚧 进行中
- ⏳ 待开始
- ⏸️ 暂停/推迟
- ❌ 已取消

---

## 阶段 0: 项目基础设施 (v0.1.0)

### 0.1 Git仓库设置
- ⏳ 初始化Git仓库
- ⏳ 配置Git用户信息
- ⏳ 验证SSH密钥配置
- ⏳ 创建.gitignore文件

### 0.2 项目文档
- ⏳ README.md - 项目说明
- ⏳ GAME_RULES.md - 游戏规则
- ⏳ agent.md - Agent协作指南
- ⏳ claude.md - Claude Code使用说明
- ⏳ TODO.md - 功能待办（本文档）
- ⏳ CHANGELOG.md - 版本历史
- ⏳ LICENSE - MIT协议

### 0.3 项目脚手架
- ⏳ 使用Vite创建React+TypeScript项目
- ⏳ 安装核心依赖（tailwindcss、zustand、framer-motion）
- ⏳ 安装开发依赖（vitest、testing-library等）
- ⏳ 配置Tailwind CSS
- ⏳ 配置TypeScript（严格模式）
- ⏳ 配置ESLint + Prettier
- ⏳ 配置Vitest测试框架
- ⏳ 创建项目目录结构

### 0.4 CI/CD配置
- ⏳ 创建.github/workflows/deploy.yml（部署到GitHub Pages）
- ⏳ 创建.github/workflows/test.yml（自动测试）
- ⏳ 配置GitHub Pages设置
- ⏳ 验证自动部署流程

---

## 阶段 1: 核心游戏逻辑 (v0.1.0)

### 1.1 数据模型定义 (src/types/)
- ⏳ Gem.ts - 宝石类型枚举
- ⏳ Card.ts - 卡牌接口
- ⏳ Noble.ts - 贵族接口
- ⏳ Player.ts - 玩家状态接口
- ⏳ GameState.ts - 游戏状态接口
- ⏳ Action.ts - 玩家动作类型

### 1.2 游戏常量 (src/constants/)
- ⏳ gems.ts - 宝石筹码配置（2-4人）
- ⏳ cards.ts - 简化卡牌数据（60张）
  - ⏳ 等级1卡牌（20张）
  - ⏳ 等级2卡牌（20张）
  - ⏳ 等级3卡牌（20张）
- ⏳ nobles.ts - 贵族数据（10张）

### 1.3 核心规则引擎 (src/game/core/)
- ⏳ GameEngine.ts - 游戏主引擎
  - ⏳ initGame() - 初始化游戏
  - ⏳ executeAction() - 执行动作
  - ⏳ validateAction() - 验证动作
  - ⏳ checkGameEnd() - 检查游戏结束
  - ⏳ determineWinner() - 计算获胜者
- ⏳ actions.ts - 动作处理器
  - ⏳ takeGems() - 拿取宝石
  - ⏳ reserveCard() - 保留卡牌
  - ⏳ purchaseCard() - 购买卡牌
- ⏳ validation.ts - 规则验证
  - ⏳ 验证拿取宝石规则
  - ⏳ 验证购买条件
  - ⏳ 验证筹码上限
- ⏳ nobles.ts - 贵族逻辑
  - ⏳ checkNobleVisit() - 检查贵族访问
  - ⏳ assignNoble() - 分配贵族

### 1.4 单元测试
- ⏳ GameEngine.test.ts
- ⏳ actions.test.ts
- ⏳ validation.test.ts
- ⏳ nobles.test.ts
- ⏳ 测试覆盖率 >80%

---

## 阶段 2: AI对手系统 (v0.1.0)

### 2.1 AI基础架构 (src/game/ai/)
- ⏳ AIPlayer.ts - AI玩家基类
- ⏳ strategies/EasyAI.ts - 简单AI
  - ⏳ 随机选择合法动作
  - ⏳ 优先购买有点数的卡牌
  - ⏳ 决策时间 <500ms

### 2.2 AI测试
- ⏳ AIPlayer.test.ts
- ⏳ 模拟100场AI对局测试

### 2.3 中等AI (v0.2.0) ⏸️
- ⏸️ strategies/MediumAI.ts
  - ⏸️ 评分系统
  - ⏸️ 贪心策略
  - ⏸️ 贵族目标考虑

### 2.4 困难AI (v0.2.0) ⏸️
- ⏸️ strategies/HardAI.ts
  - ⏸️ 前瞻搜索（2-3步）
  - ⏸️ 动态策略调整
  - ⏸️ 对手阻断

---

## 阶段 3: UI界面开发 (v0.1.0)

### 3.1 通用UI组件 (src/components/UI/)
- ⏳ Button.tsx - 按钮组件
- ⏳ Modal.tsx - 模态框
- ⏳ Card.tsx - 卡牌组件（带动画）
- ⏳ GemToken.tsx - 宝石筹码组件
- ⏳ PlayerBadge.tsx - 玩家标识

### 3.2 游戏主界面 (src/components/Game/)
- ⏳ GameSetup.tsx - 游戏设置页
  - ⏳ 选择玩家人数（2-4）
  - ⏳ 选择AI难度
  - ⏳ 开始游戏
- ⏳ GameBoard.tsx - 游戏主面板
  - ⏳ 公开卡牌区域（3行×4列）
  - ⏳ 宝石筹码池
  - ⏳ 贵族牌区域
- ⏳ PlayerPanel.tsx - 玩家信息面板
  - ⏳ 显示点数
  - ⏳ 显示宝石筹码
  - ⏳ 显示卡牌加成
  - ⏳ 显示保留卡牌
- ⏳ ActionBar.tsx - 操作栏
  - ⏳ 动作提示
  - ⏳ 确认/取消按钮
- ⏳ GameOver.tsx - 游戏结束页
  - ⏳ 显示获胜者
  - ⏳ 显示最终得分
  - ⏳ 重新开始按钮

### 3.3 动画效果
- ⏳ 卡牌翻转动画
- ⏳ 卡牌移动动画
- ⏳ 宝石拾取动画
- ⏳ 贵族访问动画
- ⏳ 回合切换动画

### 3.4 响应式设计
- ⏳ 桌面布局（1280px+）
- ⏳ 平板布局（768px-1279px）
- ⏳ 移动布局（<768px）
- ⏳ 触摸优化（最小44x44px）

### 3.5 状态管理 (src/store/)
- ⏳ gameStore.ts - Zustand状态管理
  - ⏳ 游戏状态
  - ⏳ 当前玩家
  - ⏳ 可用动作
  - ⏳ UI状态

---

## 阶段 4: 回放系统 (v0.4.0) ⏸️

### 4.1 回放数据结构 (src/game/replay/)
- ⏸️ ReplayRecorder.ts - 录制器
- ⏸️ ReplayPlayer.ts - 播放器
- ⏸️ 数据存储（localStorage）

### 4.2 回放UI (src/components/Replay/)
- ⏸️ ReplayList.tsx - 历史游戏列表
- ⏸️ ReplayViewer.tsx - 回放播放器
- ⏸️ ReplayStats.tsx - 统计分析

---

## 阶段 5: 优化与完善 (v0.5.0) ⏸️

### 5.1 性能优化
- ⏸️ React.memo优化
- ⏸️ 虚拟滚动
- ⏸️ 图片资源优化
- ⏸️ 代码分割

### 5.2 用户体验
- ⏸️ 音效系统（可选）
- ⏸️ 撤销功能
- ⏸️ 规则提示
- ⏸️ 快捷键支持

### 5.3 可访问性
- ⏸️ 键盘导航
- ⏸️ ARIA标签
- ⏸️ 高对比度模式

### 5.4 国际化
- ⏸️ 中英文切换
- ⏸️ i18next集成

---

## 待修复的Bug

*（发现bug时在此记录）*

---

## 技术债务

*（需要后续改进的技术问题）*

- [ ] 考虑使用Web Workers运行AI计算
- [ ] 考虑使用IndexedDB替代localStorage
- [ ] 考虑使用Canvas绘制卡牌
- [ ] 考虑PWA支持

---

## 功能建议

*（用户反馈或新想法）*

---

## v0.1.0 目标清单

第一个可发布版本需要完成：

- ✅ 阶段0: 项目基础设施
- ✅ 阶段1: 核心游戏逻辑
- ✅ 阶段2: 简单AI对手
- ✅ 阶段3: 基础UI界面
- ✅ 响应式设计
- ✅ 自动部署到GitHub Pages

**验收标准**:
- [ ] 可以完整进行一局2-4人游戏
- [ ] AI对手能做出合理决策
- [ ] UI流畅，无明显卡顿
- [ ] 在桌面和移动端都能正常使用
- [ ] 测试覆盖率 >80%
- [ ] 成功部署到GitHub Pages

---

## 后续版本规划

### v0.2.0 - 增强AI
- 中等AI和困难AI
- AI性能优化
- AI对战统计

### v0.3.0 - 完整卡牌数据
- 补全官方90张卡牌数据
- 卡牌搜索功能
- 卡牌详情页

### v0.4.0 - 回放系统
- 游戏录制
- 回放播放
- 统计分析

### v0.5.0 - 优化完善
- 性能优化
- 用户体验增强
- 可访问性改进

### v0.6.0+ - 在线多人
- 在线对战（需要后端）
- 房间系统
- 好友系统
- 排行榜

---

## 更新日志

### 2026-02-22
- 创建TODO.md文档
- 规划v0.1.0开发任务

---

*本文档持续更新，记录项目进展*
