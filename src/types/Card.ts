import { GemCost, RegularGemType } from './Gem'

/**
 * 卡牌等级
 */
export enum CardLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
}

/**
 * 卡牌接口
 */
export interface Card {
  /** 卡牌唯一ID */
  id: string
  /** 卡牌等级 (1-3) */
  level: CardLevel
  /** 声望点数 (0-5) */
  points: number
  /** 提供的宝石加成（购买后永久生效） */
  bonus: RegularGemType
  /** 购买所需的宝石成本 */
  cost: GemCost
}

/**
 * 卡牌堆接口
 * 表示某个等级的所有卡牌
 */
export interface CardDeck {
  /** 等级 */
  level: CardLevel
  /** 卡牌列表 */
  cards: Card[]
}
