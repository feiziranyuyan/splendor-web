import {
  GameState,
  GameAction,
  Player,
  ActionType,
  TakeThreeDifferentAction,
  TakeTwoSameAction,
  ReserveCardAction,
  PurchaseCardAction,
  GemType,
  Card,
  RegularGemType,
} from '@/types'
import { MAX_GEM_TOKENS, MIN_GEMS_FOR_TAKE_TWO } from '@/constants'

/**
 * AI玩家基类
 * 定义AI决策的接口和通用辅助方法
 */
export abstract class AIPlayer {
  /**
   * 选择下一个动作
   * @param gameState 当前游戏状态
   * @param player 当前AI玩家
   * @returns 选择的动作
   */
  abstract selectAction(gameState: GameState, player: Player): GameAction

  /**
   * 获取所有合法的拿取宝石动作
   */
  protected getAvailableTakeGemActions(
    gameState: GameState,
    player: Player
  ): GameAction[] {
    const actions: GameAction[] = []
    const currentGemCount = this.getTotalGemCount(player)

    // 拿取3个不同颜色的宝石
    const regularGems = [
      GemType.DIAMOND,
      GemType.SAPPHIRE,
      GemType.EMERALD,
      GemType.RUBY,
      GemType.ONYX,
    ]

    const availableGems = regularGems.filter(
      gem => (gameState.availableGems[gem] || 0) > 0
    )

    // 生成所有可能的3个不同宝石组合
    for (let i = 0; i < availableGems.length; i++) {
      for (let j = i + 1; j < availableGems.length; j++) {
        for (let k = j + 1; k < availableGems.length; k++) {
          const gems = [availableGems[i], availableGems[j], availableGems[k]]
          if (currentGemCount + 3 <= MAX_GEM_TOKENS) {
            actions.push({
              type: ActionType.TAKE_THREE_DIFFERENT,
              playerId: player.id,
              gems,
            } as TakeThreeDifferentAction)
          }
        }
      }
    }

    // 也可以拿2个或1个
    for (let i = 0; i < availableGems.length; i++) {
      for (let j = i + 1; j < availableGems.length; j++) {
        const gems = [availableGems[i], availableGems[j]]
        if (currentGemCount + 2 <= MAX_GEM_TOKENS) {
          actions.push({
            type: ActionType.TAKE_THREE_DIFFERENT,
            playerId: player.id,
            gems,
          } as TakeThreeDifferentAction)
        }
      }
    }

    // 拿取2个相同颜色的宝石
    for (const gem of regularGems) {
      const available = gameState.availableGems[gem] || 0
      if (available >= MIN_GEMS_FOR_TAKE_TWO && currentGemCount + 2 <= MAX_GEM_TOKENS) {
        actions.push({
          type: ActionType.TAKE_TWO_SAME,
          playerId: player.id,
          gem,
        } as TakeTwoSameAction)
      }
    }

    return actions
  }

  /**
   * 获取所有可购买的卡牌动作
   */
  protected getAvailablePurchaseActions(
    gameState: GameState,
    player: Player
  ): GameAction[] {
    const actions: GameAction[] = []
    
    // 所有可见卡牌
    const visibleCards = [
      ...gameState.visibleCards.level1,
      ...gameState.visibleCards.level2,
      ...gameState.visibleCards.level3,
    ]

    // 检查每张卡牌是否可购买
    for (const card of visibleCards) {
      const payment = this.calculatePayment(card, player)
      if (payment) {
        actions.push({
          type: ActionType.PURCHASE_CARD,
          playerId: player.id,
          card,
          fromReserved: false,
          payment,
        } as PurchaseCardAction)
      }
    }

    // 检查保留卡牌是否可购买
    for (const card of player.reservedCards) {
      const payment = this.calculatePayment(card, player)
      if (payment) {
        actions.push({
          type: ActionType.PURCHASE_CARD,
          playerId: player.id,
          card,
          fromReserved: true,
          payment,
        } as PurchaseCardAction)
      }
    }

    return actions
  }

  /**
   * 获取所有可保留的卡牌动作
   */
  protected getAvailableReserveActions(
    gameState: GameState,
    player: Player
  ): GameAction[] {
    const actions: GameAction[] = []

    // 检查是否已达保留上限
    if (player.reservedCards.length >= 3) {
      return actions
    }

    // 所有可见卡牌
    const visibleCards = [
      ...gameState.visibleCards.level1,
      ...gameState.visibleCards.level2,
      ...gameState.visibleCards.level3,
    ]

    for (const card of visibleCards) {
      actions.push({
        type: ActionType.RESERVE_CARD,
        playerId: player.id,
        card,
        fromDeck: false,
      } as ReserveCardAction)
    }

    return actions
  }

  /**
   * 计算购买卡牌所需的支付
   * @returns 支付方案，如果无法购买则返回null
   */
  protected calculatePayment(
    card: Card,
    player: Player
  ): Partial<Record<GemType, number>> | null {
    // 计算玩家的加成
    const bonuses: Partial<Record<GemType, number>> = {}
    for (const ownedCard of player.cards) {
      bonuses[ownedCard.bonus] = (bonuses[ownedCard.bonus] || 0) + 1
    }

    const payment: Partial<Record<GemType, number>> = {}
    let goldNeeded = 0

    // 计算每种宝石的需求
    for (const [gemType, cost] of Object.entries(card.cost)) {
      const gem = gemType as GemType
      const bonus = bonuses[gem] || 0
      const remainingCost = Math.max(0, cost - bonus)

      if (remainingCost > 0) {
        const owned = player.gems[gem] || 0
        if (owned >= remainingCost) {
          payment[gem] = remainingCost
        } else {
          payment[gem] = owned
          goldNeeded += remainingCost - owned
        }
      }
    }

    // 检查黄金是否足够
    const ownedGold = player.gems[GemType.GOLD] || 0
    if (goldNeeded > ownedGold) {
      return null // 无法购买
    }

    if (goldNeeded > 0) {
      payment[GemType.GOLD] = goldNeeded
    }

    return payment
  }

  /**
   * 获取玩家当前拥有的宝石总数
   */
  protected getTotalGemCount(player: Player): number {
    return Object.values(player.gems).reduce((sum, count) => sum + count, 0)
  }

  /**
   * 计算玩家的宝石加成
   */
  protected calculateBonuses(player: Player): Record<RegularGemType, number> {
    const bonuses: Record<RegularGemType, number> = {
      [GemType.DIAMOND]: 0,
      [GemType.SAPPHIRE]: 0,
      [GemType.EMERALD]: 0,
      [GemType.RUBY]: 0,
      [GemType.ONYX]: 0,
    }

    for (const card of player.cards) {
      bonuses[card.bonus] = (bonuses[card.bonus] || 0) + 1
    }

    return bonuses
  }
}
