import { Player, Noble, GemType } from '@/types'

/**
 * 检查玩家是否满足贵族访问条件
 */
export function checkNobleRequirements(player: Player, noble: Noble): boolean {
  // 计算玩家的卡牌加成
  const bonuses: Partial<Record<GemType, number>> = {}
  for (const card of player.cards) {
    bonuses[card.bonus] = (bonuses[card.bonus] || 0) + 1
  }

  // 检查是否满足所有条件
  for (const [gemType, required] of Object.entries(noble.requirements)) {
    const gem = gemType as GemType
    const owned = bonuses[gem] || 0
    if (owned < required) {
      return false
    }
  }

  return true
}

/**
 * 获取玩家可以访问的贵族列表
 */
export function getEligibleNobles(player: Player, availableNobles: Noble[]): Noble[] {
  return availableNobles.filter(noble => checkNobleRequirements(player, noble))
}

/**
 * 自动分配贵族给玩家（回合结束时调用）
 * @returns 被分配的贵族，如果没有则返回null
 */
export function assignNobleToPlayer(player: Player, availableNobles: Noble[]): Noble | null {
  const eligible = getEligibleNobles(player, availableNobles)

  if (eligible.length === 0) {
    return null
  }

  // 如果有多个符合条件的贵族，选择第一个（实际游戏中玩家可以选择）
  // 在AI或自动模式下，简单选择第一个
  return eligible[0]
}

/**
 * 计算玩家当前的宝石加成
 */
export function calculatePlayerBonuses(player: Player): Record<GemType, number> {
  const bonuses: Record<GemType, number> = {
    [GemType.DIAMOND]: 0,
    [GemType.SAPPHIRE]: 0,
    [GemType.EMERALD]: 0,
    [GemType.RUBY]: 0,
    [GemType.ONYX]: 0,
    [GemType.GOLD]: 0,
  }

  for (const card of player.cards) {
    bonuses[card.bonus] = (bonuses[card.bonus] || 0) + 1
  }

  return bonuses
}
