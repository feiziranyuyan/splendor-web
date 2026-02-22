import {
  GameState,
  GameAction,
  ActionType,
  TakeThreeDifferentAction,
  TakeTwoSameAction,
  ReserveCardAction,
  PurchaseCardAction,
  ActionValidationResult,
  GemType,
  Player,
} from '@/types'
import {
  MAX_GEM_TOKENS,
  MAX_RESERVED_CARDS,
  MIN_GEMS_FOR_TAKE_TWO,
} from '@/constants'

/**
 * 验证游戏动作是否合法
 */
export function validateAction(
  action: GameAction,
  gameState: GameState
): ActionValidationResult {
  const player = gameState.players.find(p => p.id === action.playerId)
  if (!player) {
    return { valid: false, error: 'Player not found' }
  }

  switch (action.type) {
    case ActionType.TAKE_THREE_DIFFERENT:
      return validateTakeThreeDifferent(action, gameState, player)
    case ActionType.TAKE_TWO_SAME:
      return validateTakeTwoSame(action, gameState, player)
    case ActionType.RESERVE_CARD:
      return validateReserveCard(action, gameState, player)
    case ActionType.PURCHASE_CARD:
      return validatePurchaseCard(action, gameState, player)
    default:
      return { valid: false, error: 'Unknown action type' }
  }
}

/**
 * 验证拿取3个不同颜色宝石
 */
function validateTakeThreeDifferent(
  action: TakeThreeDifferentAction,
  gameState: GameState,
  player: Player
): ActionValidationResult {
  const { gems } = action

  // 检查数量（1-3个）
  if (gems.length < 1 || gems.length > 3) {
    return { valid: false, error: 'Must take 1-3 different gems' }
  }

  // 检查是否包含黄金
  if (gems.includes(GemType.GOLD)) {
    return { valid: false, error: 'Cannot take gold gems directly' }
  }

  // 检查是否都是不同颜色
  const uniqueGems = new Set(gems)
  if (uniqueGems.size !== gems.length) {
    return { valid: false, error: 'Gems must be different colors' }
  }

  // 检查公共区域是否有足够的宝石
  for (const gem of gems) {
    const available = gameState.availableGems[gem] || 0
    if (available < 1) {
      return { valid: false, error: `Not enough ${gem} gems available` }
    }
  }

  // 检查拿取后是否超过上限
  const currentTotal = Object.values(player.gems).reduce((sum, count) => sum + count, 0)
  if (currentTotal + gems.length > MAX_GEM_TOKENS) {
    return { valid: false, error: `Would exceed maximum ${MAX_GEM_TOKENS} gems` }
  }

  return { valid: true }
}

/**
 * 验证拿取2个相同颜色宝石
 */
function validateTakeTwoSame(
  action: TakeTwoSameAction,
  gameState: GameState,
  player: Player
): ActionValidationResult {
  const { gem } = action

  // 检查是否是黄金
  if (gem === GemType.GOLD) {
    return { valid: false, error: 'Cannot take gold gems directly' }
  }

  // 检查公共区域是否至少有4个
  const available = gameState.availableGems[gem] || 0
  if (available < MIN_GEMS_FOR_TAKE_TWO) {
    return {
      valid: false,
      error: `Need at least ${MIN_GEMS_FOR_TAKE_TWO} ${gem} gems to take 2`,
    }
  }

  // 检查拿取后是否超过上限
  const currentTotal = Object.values(player.gems).reduce((sum, count) => sum + count, 0)
  if (currentTotal + 2 > MAX_GEM_TOKENS) {
    return { valid: false, error: `Would exceed maximum ${MAX_GEM_TOKENS} gems` }
  }

  return { valid: true }
}

/**
 * 验证保留卡牌
 */
function validateReserveCard(
  action: ReserveCardAction,
  gameState: GameState,
  player: Player
): ActionValidationResult {
  // 检查保留卡牌数量上限
  if (player.reservedCards.length >= MAX_RESERVED_CARDS) {
    return { valid: false, error: `Already have ${MAX_RESERVED_CARDS} reserved cards` }
  }

  // 如果从公开卡牌保留，检查卡牌是否存在
  if (!action.fromDeck) {
    const cardExists = [
      ...gameState.visibleCards.level1,
      ...gameState.visibleCards.level2,
      ...gameState.visibleCards.level3,
    ].some(card => card.id === action.card.id)

    if (!cardExists) {
      return { valid: false, error: 'Card not found in visible cards' }
    }
  } else {
    // 从牌堆保留，检查牌堆是否有卡
    const deck = gameState.decks[`level${action.card.level}` as keyof typeof gameState.decks]
    if (deck.length === 0) {
      return { valid: false, error: `No cards left in level ${action.card.level} deck` }
    }
  }

  // 检查黄金宝石后是否超过上限（如果还有黄金）
  const hasGold = (gameState.availableGems[GemType.GOLD] || 0) > 0
  if (hasGold) {
    const currentTotal = Object.values(player.gems).reduce((sum, count) => sum + count, 0)
    if (currentTotal + 1 > MAX_GEM_TOKENS) {
      return { valid: false, error: `Would exceed maximum ${MAX_GEM_TOKENS} gems with gold` }
    }
  }

  return { valid: true }
}

/**
 * 验证购买卡牌
 */
function validatePurchaseCard(
  action: PurchaseCardAction,
  gameState: GameState,
  player: Player
): ActionValidationResult {
  const { card, fromReserved, payment } = action

  // 检查卡牌是否可购买
  if (fromReserved) {
    // 从保留卡购买
    const hasCard = player.reservedCards.some(c => c.id === card.id)
    if (!hasCard) {
      return { valid: false, error: 'Card not in reserved cards' }
    }
  } else {
    // 从公开卡牌购买
    const cardExists = [
      ...gameState.visibleCards.level1,
      ...gameState.visibleCards.level2,
      ...gameState.visibleCards.level3,
    ].some(c => c.id === card.id)

    if (!cardExists) {
      return { valid: false, error: 'Card not found in visible cards' }
    }
  }

  // 计算玩家的宝石加成
  const bonuses: Partial<Record<GemType, number>> = {}
  for (const ownedCard of player.cards) {
    bonuses[ownedCard.bonus] = (bonuses[ownedCard.bonus] || 0) + 1
  }

  // 验证支付是否足够
  for (const [gemType, cost] of Object.entries(card.cost)) {
    const gem = gemType as GemType
    const bonus = bonuses[gem] || 0
    const remainingCost = Math.max(0, cost - bonus)

    // 检查支付的宝石数量
    const paid = payment[gem] || 0
    if (paid < remainingCost) {
      return {
        valid: false,
        error: `Insufficient payment for ${gem}: need ${remainingCost}, paid ${paid}`,
      }
    }
  }

  // 检查玩家是否有足够的宝石筹码
  for (const [gemType, amount] of Object.entries(payment)) {
    const gem = gemType as GemType
    const owned = player.gems[gem] || 0
    if (amount > owned) {
      return { valid: false, error: `Not enough ${gem} gems: have ${owned}, need ${amount}` }
    }
  }

  // 检查是否过度支付（包括黄金使用）
  const totalPaid = Object.values(payment).reduce((sum, amount) => sum + amount, 0)
  const totalCostAfterBonus = Object.entries(card.cost).reduce((sum, [gemType, cost]) => {
    const bonus = bonuses[gemType as GemType] || 0
    return sum + Math.max(0, cost - bonus)
  }, 0)

  if (totalPaid !== totalCostAfterBonus) {
    return { valid: false, error: 'Payment does not match card cost' }
  }

  return { valid: true }
}

/**
 * 检查玩家宝石是否超过上限（回合结束时调用）
 */
export function checkGemLimit(player: Player): boolean {
  const total = Object.values(player.gems).reduce((sum, count) => sum + count, 0)
  return total <= MAX_GEM_TOKENS
}

/**
 * 计算玩家需要归还的宝石数量
 */
export function getExcessGemCount(player: Player): number {
  const total = Object.values(player.gems).reduce((sum, count) => sum + count, 0)
  return Math.max(0, total - MAX_GEM_TOKENS)
}
