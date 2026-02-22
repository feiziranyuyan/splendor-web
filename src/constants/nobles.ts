import { Noble } from '../types/Noble'
import { GemType } from '../types/Gem'

/**
 * 所有贵族数据（10张）
 * 每个贵族需要特定数量的卡牌加成，提供3点声望
 */
export const ALL_NOBLES: Noble[] = [
  // 贵族1: 需要4个钻石 + 4个蓝宝石
  {
    id: 'noble_1',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 4,
      [GemType.SAPPHIRE]: 4,
      [GemType.EMERALD]: 0,
      [GemType.RUBY]: 0,
      [GemType.ONYX]: 0,
    },
  },
  
  // 贵族2: 需要4个钻石 + 4个祖母绿
  {
    id: 'noble_2',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 4,
      [GemType.SAPPHIRE]: 0,
      [GemType.EMERALD]: 4,
      [GemType.RUBY]: 0,
      [GemType.ONYX]: 0,
    },
  },
  
  // 贵族3: 需要4个蓝宝石 + 4个祖母绿
  {
    id: 'noble_3',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 0,
      [GemType.SAPPHIRE]: 4,
      [GemType.EMERALD]: 4,
      [GemType.RUBY]: 0,
      [GemType.ONYX]: 0,
    },
  },
  
  // 贵族4: 需要4个祖母绿 + 4个红宝石
  {
    id: 'noble_4',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 0,
      [GemType.SAPPHIRE]: 0,
      [GemType.EMERALD]: 4,
      [GemType.RUBY]: 4,
      [GemType.ONYX]: 0,
    },
  },
  
  // 贵族5: 需要4个红宝石 + 4个黑玛瑙
  {
    id: 'noble_5',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 0,
      [GemType.SAPPHIRE]: 0,
      [GemType.EMERALD]: 0,
      [GemType.RUBY]: 4,
      [GemType.ONYX]: 4,
    },
  },
  
  // 贵族6: 需要4个蓝宝石 + 4个黑玛瑙
  {
    id: 'noble_6',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 0,
      [GemType.SAPPHIRE]: 4,
      [GemType.EMERALD]: 0,
      [GemType.RUBY]: 0,
      [GemType.ONYX]: 4,
    },
  },
  
  // 贵族7: 需要3个钻石 + 3个蓝宝石 + 3个祖母绿
  {
    id: 'noble_7',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 3,
      [GemType.SAPPHIRE]: 3,
      [GemType.EMERALD]: 3,
      [GemType.RUBY]: 0,
      [GemType.ONYX]: 0,
    },
  },
  
  // 贵族8: 需要3个祖母绿 + 3个红宝石 + 3个黑玛瑙
  {
    id: 'noble_8',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 0,
      [GemType.SAPPHIRE]: 0,
      [GemType.EMERALD]: 3,
      [GemType.RUBY]: 3,
      [GemType.ONYX]: 3,
    },
  },
  
  // 贵族9: 需要3个钻石 + 3个红宝石 + 3个黑玛瑙
  {
    id: 'noble_9',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 3,
      [GemType.SAPPHIRE]: 0,
      [GemType.EMERALD]: 0,
      [GemType.RUBY]: 3,
      [GemType.ONYX]: 3,
    },
  },
  
  // 贵族10: 需要3个蓝宝石 + 3个祖母绿 + 3个红宝石
  {
    id: 'noble_10',
    points: 3,
    requirements: {
      [GemType.DIAMOND]: 0,
      [GemType.SAPPHIRE]: 3,
      [GemType.EMERALD]: 3,
      [GemType.RUBY]: 3,
      [GemType.ONYX]: 0,
    },
  },
]

/**
 * 根据玩家人数获取贵族数量
 */
export function getNobleCount(playerCount: number): number {
  // 贵族数量 = 玩家人数 + 1
  return playerCount + 1
}
