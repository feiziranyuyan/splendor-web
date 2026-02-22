import {
  GameState,
  GameAction,
  ActionType,
  TakeThreeDifferentAction,
  TakeTwoSameAction,
  ReserveCardAction,
  PurchaseCardAction,
  GemType,
  Card,
} from '@/types'
import { assignNobleToPlayer } from './nobles'

/**
 * 执行拿取3个不同颜色宝石的动作
 */
export function executeTakeThreeDifferent(
  action: TakeThreeDifferentAction,
  gameState: GameState
): void {
  const player = gameState.players.find(p => p.id === action.playerId)!

  // 从公共区域移除宝石并添加到玩家
  for (const gem of action.gems) {
    gameState.availableGems[gem] = (gameState.availableGems[gem] || 0) - 1
    player.gems[gem] = (player.gems[gem] || 0) + 1
  }
}

/**
 * 执行拿取2个相同颜色宝石的动作
 */
export function executeTakeTwoSame(action: TakeTwoSameAction, gameState: GameState): void {
  const player = gameState.players.find(p => p.id === action.playerId)!

  // 从公共区域移除2个宝石并添加到玩家
  gameState.availableGems[action.gem] = (gameState.availableGems[action.gem] || 0) - 2
  player.gems[action.gem] = (player.gems[action.gem] || 0) + 2
}

/**
 * 执行保留卡牌的动作
 */
export function executeReserveCard(action: ReserveCardAction, gameState: GameState): void {
  const player = gameState.players.find(p => p.id === action.playerId)!
  let card: Card

  if (action.fromDeck) {
    // 从牌堆顶保留
    const deckKey = `level${action.card.level}` as keyof typeof gameState.decks
    const deck = gameState.decks[deckKey]
    card = deck.shift()! // 移除牌堆顶的卡牌
  } else {
    // 从公开卡牌保留
    const levelKey = `level${action.card.level}` as keyof typeof gameState.visibleCards
    const visibleCards = gameState.visibleCards[levelKey]
    const cardIndex = visibleCards.findIndex(c => c.id === action.card.id)
    card = visibleCards.splice(cardIndex, 1)[0]

    // 从对应牌堆补充新卡
    const deckKey = `level${action.card.level}` as keyof typeof gameState.decks
    const deck = gameState.decks[deckKey]
    if (deck.length > 0) {
      visibleCards.push(deck.shift()!)
    }
  }

  // 添加到玩家的保留卡
  player.reservedCards.push(card)

  // 给予黄金宝石（如果还有）
  const availableGold = gameState.availableGems[GemType.GOLD] || 0
  if (availableGold > 0) {
    gameState.availableGems[GemType.GOLD] = availableGold - 1
    player.gems[GemType.GOLD] = (player.gems[GemType.GOLD] || 0) + 1
  }
}

/**
 * 执行购买卡牌的动作
 */
export function executePurchaseCard(action: PurchaseCardAction, gameState: GameState): void {
  const player = gameState.players.find(p => p.id === action.playerId)!
  const { card, fromReserved, payment } = action

  // 扣除玩家的宝石筹码
  for (const [gemType, amount] of Object.entries(payment)) {
    const gem = gemType as GemType
    player.gems[gem] = (player.gems[gem] || 0) - amount
    gameState.availableGems[gem] = (gameState.availableGems[gem] || 0) + amount
  }

  // 移除卡牌并添加到玩家的拥有卡牌
  if (fromReserved) {
    // 从保留卡购买
    const cardIndex = player.reservedCards.findIndex(c => c.id === card.id)
    player.reservedCards.splice(cardIndex, 1)
  } else {
    // 从公开卡牌购买
    const levelKey = `level${card.level}` as keyof typeof gameState.visibleCards
    const visibleCards = gameState.visibleCards[levelKey]
    const cardIndex = visibleCards.findIndex(c => c.id === card.id)
    visibleCards.splice(cardIndex, 1)

    // 从对应牌堆补充新卡
    const deckKey = `level${card.level}` as keyof typeof gameState.decks
    const deck = gameState.decks[deckKey]
    if (deck.length > 0) {
      visibleCards.push(deck.shift()!)
    }
  }

  // 添加卡牌到玩家
  player.cards.push(card)
  player.points += card.points
}

/**
 * 执行游戏动作
 */
export function executeAction(action: GameAction, gameState: GameState): void {
  switch (action.type) {
    case ActionType.TAKE_THREE_DIFFERENT:
      executeTakeThreeDifferent(action, gameState)
      break
    case ActionType.TAKE_TWO_SAME:
      executeTakeTwoSame(action, gameState)
      break
    case ActionType.RESERVE_CARD:
      executeReserveCard(action, gameState)
      break
    case ActionType.PURCHASE_CARD:
      executePurchaseCard(action, gameState)
      break
  }

  // 添加到历史记录
  gameState.history.push(action)
}

/**
 * 回合结束处理：检查贵族访问
 */
export function processTurnEnd(gameState: GameState): void {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex]

  // 检查并分配贵族
  const assignedNoble = assignNobleToPlayer(currentPlayer, gameState.availableNobles)
  if (assignedNoble) {
    // 移除贵族从可用列表
    const nobleIndex = gameState.availableNobles.findIndex(n => n.id === assignedNoble.id)
    gameState.availableNobles.splice(nobleIndex, 1)

    // 添加到玩家
    currentPlayer.nobles.push(assignedNoble)
    currentPlayer.points += assignedNoble.points
  }

  // 移动到下一个玩家
  gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length
  gameState.turnCount++
}
