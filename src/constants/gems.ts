import { GemType, GemTokens } from '../types/Gem'

/**
 * 根据玩家人数获取宝石筹码配置
 * @param playerCount 玩家人数 (2-4)
 * @returns 各种宝石的初始数量
 */
export function getGemConfig(playerCount: number): GemTokens {
  // 黄金宝石数量固定为5个
  const goldCount = 5

  // 普通宝石数量根据玩家人数变化
  let regularGemCount: number
  switch (playerCount) {
    case 2:
      regularGemCount = 4
      break
    case 3:
      regularGemCount = 5
      break
    case 4:
      regularGemCount = 7
      break
    default:
      throw new Error(`Invalid player count: ${playerCount}. Must be 2-4.`)
  }

  return {
    [GemType.DIAMOND]: regularGemCount,
    [GemType.SAPPHIRE]: regularGemCount,
    [GemType.EMERALD]: regularGemCount,
    [GemType.RUBY]: regularGemCount,
    [GemType.ONYX]: regularGemCount,
    [GemType.GOLD]: goldCount,
  }
}

/**
 * 玩家最大筹码持有数量
 */
export const MAX_GEM_TOKENS = 10

/**
 * 玩家最大保留卡牌数量
 */
export const MAX_RESERVED_CARDS = 3

/**
 * 拿取2个相同颜色宝石时，该颜色最少需要的数量
 */
export const MIN_GEMS_FOR_TAKE_TWO = 4

/**
 * 每行公开卡牌的数量
 */
export const VISIBLE_CARDS_PER_LEVEL = 4

/**
 * 游戏胜利所需的点数
 */
export const WINNING_POINTS = 15
