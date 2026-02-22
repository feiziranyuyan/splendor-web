/**
 * 宝石类型枚举
 * 游戏中有6种宝石：5种普通宝石和1种万能黄金
 */
export enum GemType {
  /** 钻石 - 白色 */
  DIAMOND = 'diamond',
  /** 蓝宝石 - 蓝色 */
  SAPPHIRE = 'sapphire',
  /** 祖母绿 - 绿色 */
  EMERALD = 'emerald',
  /** 红宝石 - 红色 */
  RUBY = 'ruby',
  /** 黑玛瑙 - 黑色 */
  ONYX = 'onyx',
  /** 黄金 - 金色（万能宝石） */
  GOLD = 'gold',
}

/**
 * 普通宝石类型（不包括黄金）
 */
export type RegularGemType = Exclude<GemType, GemType.GOLD>

/**
 * 宝石成本类型
 * 表示购买卡牌或其他操作需要的宝石数量
 */
export type GemCost = Partial<Record<GemType, number>>

/**
 * 宝石加成类型
 * 表示卡牌提供的永久宝石折扣
 */
export type GemBonus = Partial<Record<RegularGemType, number>>

/**
 * 宝石筹码类型
 * 表示玩家拥有的宝石筹码数量
 */
export type GemTokens = Partial<Record<GemType, number>>
