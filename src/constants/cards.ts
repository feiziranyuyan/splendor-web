import { Card, CardLevel } from '../types/Card'
import { GemType } from '../types/Gem'

/**
 * 等级1卡牌（20张）
 * 特点：成本低（3-5个宝石），点数0-1分
 */
const LEVEL_1_CARDS: Card[] = [
  // 钻石加成卡（4张）
  { id: 'l1_d1', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.DIAMOND, cost: { [GemType.SAPPHIRE]: 3 } },
  { id: 'l1_d2', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.DIAMOND, cost: { [GemType.SAPPHIRE]: 2, [GemType.EMERALD]: 1 } },
  { id: 'l1_d3', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.DIAMOND, cost: { [GemType.EMERALD]: 3 } },
  { id: 'l1_d4', level: CardLevel.LEVEL_1, points: 1, bonus: GemType.DIAMOND, cost: { [GemType.RUBY]: 4 } },
  
  // 蓝宝石加成卡（4张）
  { id: 'l1_s1', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.SAPPHIRE, cost: { [GemType.DIAMOND]: 3 } },
  { id: 'l1_s2', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.SAPPHIRE, cost: { [GemType.RUBY]: 2, [GemType.ONYX]: 1 } },
  { id: 'l1_s3', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.SAPPHIRE, cost: { [GemType.ONYX]: 3 } },
  { id: 'l1_s4', level: CardLevel.LEVEL_1, points: 1, bonus: GemType.SAPPHIRE, cost: { [GemType.EMERALD]: 4 } },
  
  // 祖母绿加成卡（4张）
  { id: 'l1_e1', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.EMERALD, cost: { [GemType.RUBY]: 3 } },
  { id: 'l1_e2', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.EMERALD, cost: { [GemType.DIAMOND]: 2, [GemType.SAPPHIRE]: 1 } },
  { id: 'l1_e3', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.EMERALD, cost: { [GemType.ONYX]: 2, [GemType.DIAMOND]: 1 } },
  { id: 'l1_e4', level: CardLevel.LEVEL_1, points: 1, bonus: GemType.EMERALD, cost: { [GemType.SAPPHIRE]: 4 } },
  
  // 红宝石加成卡（4张）
  { id: 'l1_r1', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.RUBY, cost: { [GemType.EMERALD]: 3 } },
  { id: 'l1_r2', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.RUBY, cost: { [GemType.SAPPHIRE]: 2, [GemType.RUBY]: 1 } },
  { id: 'l1_r3', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.RUBY, cost: { [GemType.DIAMOND]: 3 } },
  { id: 'l1_r4', level: CardLevel.LEVEL_1, points: 1, bonus: GemType.RUBY, cost: { [GemType.ONYX]: 4 } },
  
  // 黑玛瑙加成卡（4张）
  { id: 'l1_o1', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.ONYX, cost: { [GemType.DIAMOND]: 3 } },
  { id: 'l1_o2', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.ONYX, cost: { [GemType.EMERALD]: 2, [GemType.RUBY]: 1 } },
  { id: 'l1_o3', level: CardLevel.LEVEL_1, points: 0, bonus: GemType.ONYX, cost: { [GemType.SAPPHIRE]: 3 } },
  { id: 'l1_o4', level: CardLevel.LEVEL_1, points: 1, bonus: GemType.ONYX, cost: { [GemType.DIAMOND]: 4 } },
]

/**
 * 等级2卡牌（20张）
 * 特点：成本中等（5-7个宝石），点数1-3分
 */
const LEVEL_2_CARDS: Card[] = [
  // 钻石加成卡（4张）
  { id: 'l2_d1', level: CardLevel.LEVEL_2, points: 1, bonus: GemType.DIAMOND, cost: { [GemType.SAPPHIRE]: 3, [GemType.EMERALD]: 2, [GemType.RUBY]: 2 } },
  { id: 'l2_d2', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.DIAMOND, cost: { [GemType.SAPPHIRE]: 5 } },
  { id: 'l2_d3', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.DIAMOND, cost: { [GemType.EMERALD]: 5, [GemType.ONYX]: 3 } },
  { id: 'l2_d4', level: CardLevel.LEVEL_2, points: 3, bonus: GemType.DIAMOND, cost: { [GemType.RUBY]: 6 } },
  
  // 蓝宝石加成卡（4张）
  { id: 'l2_s1', level: CardLevel.LEVEL_2, points: 1, bonus: GemType.SAPPHIRE, cost: { [GemType.DIAMOND]: 3, [GemType.EMERALD]: 2, [GemType.ONYX]: 2 } },
  { id: 'l2_s2', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.SAPPHIRE, cost: { [GemType.RUBY]: 5 } },
  { id: 'l2_s3', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.SAPPHIRE, cost: { [GemType.DIAMOND]: 5, [GemType.EMERALD]: 3 } },
  { id: 'l2_s4', level: CardLevel.LEVEL_2, points: 3, bonus: GemType.SAPPHIRE, cost: { [GemType.ONYX]: 6 } },
  
  // 祖母绿加成卡（4张）
  { id: 'l2_e1', level: CardLevel.LEVEL_2, points: 1, bonus: GemType.EMERALD, cost: { [GemType.SAPPHIRE]: 3, [GemType.RUBY]: 2, [GemType.ONYX]: 2 } },
  { id: 'l2_e2', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.EMERALD, cost: { [GemType.DIAMOND]: 5 } },
  { id: 'l2_e3', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.EMERALD, cost: { [GemType.SAPPHIRE]: 5, [GemType.RUBY]: 3 } },
  { id: 'l2_e4', level: CardLevel.LEVEL_2, points: 3, bonus: GemType.EMERALD, cost: { [GemType.DIAMOND]: 6 } },
  
  // 红宝石加成卡（4张）
  { id: 'l2_r1', level: CardLevel.LEVEL_2, points: 1, bonus: GemType.RUBY, cost: { [GemType.DIAMOND]: 3, [GemType.EMERALD]: 2, [GemType.SAPPHIRE]: 2 } },
  { id: 'l2_r2', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.RUBY, cost: { [GemType.ONYX]: 5 } },
  { id: 'l2_r3', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.RUBY, cost: { [GemType.SAPPHIRE]: 5, [GemType.DIAMOND]: 3 } },
  { id: 'l2_r4', level: CardLevel.LEVEL_2, points: 3, bonus: GemType.RUBY, cost: { [GemType.EMERALD]: 6 } },
  
  // 黑玛瑙加成卡（4张）
  { id: 'l2_o1', level: CardLevel.LEVEL_2, points: 1, bonus: GemType.ONYX, cost: { [GemType.DIAMOND]: 3, [GemType.RUBY]: 2, [GemType.EMERALD]: 2 } },
  { id: 'l2_o2', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.ONYX, cost: { [GemType.EMERALD]: 5 } },
  { id: 'l2_o3', level: CardLevel.LEVEL_2, points: 2, bonus: GemType.ONYX, cost: { [GemType.RUBY]: 5, [GemType.SAPPHIRE]: 3 } },
  { id: 'l2_o4', level: CardLevel.LEVEL_2, points: 3, bonus: GemType.ONYX, cost: { [GemType.SAPPHIRE]: 6 } },
]

/**
 * 等级3卡牌（20张）
 * 特点：成本高（7-10个宝石），点数3-5分
 */
const LEVEL_3_CARDS: Card[] = [
  // 钻石加成卡（4张）
  { id: 'l3_d1', level: CardLevel.LEVEL_3, points: 3, bonus: GemType.DIAMOND, cost: { [GemType.SAPPHIRE]: 7 } },
  { id: 'l3_d2', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.DIAMOND, cost: { [GemType.EMERALD]: 7, [GemType.ONYX]: 3 } },
  { id: 'l3_d3', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.DIAMOND, cost: { [GemType.RUBY]: 6, [GemType.SAPPHIRE]: 3 } },
  { id: 'l3_d4', level: CardLevel.LEVEL_3, points: 5, bonus: GemType.DIAMOND, cost: { [GemType.ONYX]: 7, [GemType.RUBY]: 3 } },
  
  // 蓝宝石加成卡（4张）
  { id: 'l3_s1', level: CardLevel.LEVEL_3, points: 3, bonus: GemType.SAPPHIRE, cost: { [GemType.EMERALD]: 7 } },
  { id: 'l3_s2', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.SAPPHIRE, cost: { [GemType.RUBY]: 7, [GemType.DIAMOND]: 3 } },
  { id: 'l3_s3', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.SAPPHIRE, cost: { [GemType.ONYX]: 6, [GemType.EMERALD]: 3 } },
  { id: 'l3_s4', level: CardLevel.LEVEL_3, points: 5, bonus: GemType.SAPPHIRE, cost: { [GemType.DIAMOND]: 7, [GemType.ONYX]: 3 } },
  
  // 祖母绿加成卡（4张）
  { id: 'l3_e1', level: CardLevel.LEVEL_3, points: 3, bonus: GemType.EMERALD, cost: { [GemType.RUBY]: 7 } },
  { id: 'l3_e2', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.EMERALD, cost: { [GemType.ONYX]: 7, [GemType.SAPPHIRE]: 3 } },
  { id: 'l3_e3', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.EMERALD, cost: { [GemType.DIAMOND]: 6, [GemType.RUBY]: 3 } },
  { id: 'l3_e4', level: CardLevel.LEVEL_3, points: 5, bonus: GemType.EMERALD, cost: { [GemType.SAPPHIRE]: 7, [GemType.DIAMOND]: 3 } },
  
  // 红宝石加成卡（4张）
  { id: 'l3_r1', level: CardLevel.LEVEL_3, points: 3, bonus: GemType.RUBY, cost: { [GemType.ONYX]: 7 } },
  { id: 'l3_r2', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.RUBY, cost: { [GemType.DIAMOND]: 7, [GemType.EMERALD]: 3 } },
  { id: 'l3_r3', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.RUBY, cost: { [GemType.SAPPHIRE]: 6, [GemType.ONYX]: 3 } },
  { id: 'l3_r4', level: CardLevel.LEVEL_3, points: 5, bonus: GemType.RUBY, cost: { [GemType.EMERALD]: 7, [GemType.SAPPHIRE]: 3 } },
  
  // 黑玛瑙加成卡（4张）
  { id: 'l3_o1', level: CardLevel.LEVEL_3, points: 3, bonus: GemType.ONYX, cost: { [GemType.DIAMOND]: 7 } },
  { id: 'l3_o2', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.ONYX, cost: { [GemType.SAPPHIRE]: 7, [GemType.RUBY]: 3 } },
  { id: 'l3_o3', level: CardLevel.LEVEL_3, points: 4, bonus: GemType.ONYX, cost: { [GemType.EMERALD]: 6, [GemType.DIAMOND]: 3 } },
  { id: 'l3_o4', level: CardLevel.LEVEL_3, points: 5, bonus: GemType.ONYX, cost: { [GemType.RUBY]: 7, [GemType.EMERALD]: 3 } },
]

/**
 * 所有卡牌数据
 */
export const ALL_CARDS: Card[] = [...LEVEL_1_CARDS, ...LEVEL_2_CARDS, ...LEVEL_3_CARDS]

/**
 * 按等级分组的卡牌
 */
export const CARDS_BY_LEVEL = {
  [CardLevel.LEVEL_1]: LEVEL_1_CARDS,
  [CardLevel.LEVEL_2]: LEVEL_2_CARDS,
  [CardLevel.LEVEL_3]: LEVEL_3_CARDS,
}

/**
 * 获取指定等级的卡牌
 */
export function getCardsByLevel(level: CardLevel): Card[] {
  return CARDS_BY_LEVEL[level]
}
